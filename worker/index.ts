// /api/* 요청만 처리하는 Worker. 나머지 주소는 wrangler.jsonc의 assets(정적 파일)가 처리한다.
// 등록된 비밀키(해시가 SYNC_KEY_HASHES에 있는 키)만 기록을 읽고 쓸 수 있다.

// D1과 assets 바인딩 중 여기서 쓰는 부분만 적는다.
interface D1Result<T> {
  results: T[];
}
interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  all<T>(): Promise<D1Result<T>>;
  run(): Promise<unknown>;
}
interface D1Database {
  prepare(sql: string): D1PreparedStatement;
  batch(statements: D1PreparedStatement[]): Promise<unknown[]>;
}
export interface Env {
  DB: D1Database;
  ASSETS: { fetch(req: Request): Promise<Response> };
  /** 등록 코드(키의 SHA-256 16진수)를 쉼표로 구분해 나열한 값 */
  SYNC_KEY_HASHES?: string;
}

const PAGE = 100;
const MAX_BATCH = 50;
const MAX_BODY_CHARS = 2_000_000;
const ID = /^[A-Za-z0-9_-]{1,64}$/;

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });

async function sha256Hex(text: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/** 요청의 키가 등록돼 있으면 그 해시(기록 주인)를, 아니면 null을 돌려준다. */
async function owner(req: Request, env: Env): Promise<string | null> {
  const m = /^Bearer (\S{8,128})$/.exec(req.headers.get('Authorization') ?? '');
  if (!m) return null;
  const hash = await sha256Hex(m[1]!);
  const allowed = (env.SYNC_KEY_HASHES ?? '')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return allowed.includes(hash) ? hash : null;
}

interface AttemptIn {
  examId: string;
  id: string;
  finishedAt: number;
  scores: Record<string, number>;
  body: unknown;
}

function isScores(v: unknown): v is Record<string, number> {
  return (
    !!v &&
    typeof v === 'object' &&
    !Array.isArray(v) &&
    Object.values(v).every((n) => typeof n === 'number' && n >= 0 && n <= 1)
  );
}

function parseAttempt(v: unknown): AttemptIn | null {
  if (!v || typeof v !== 'object') return null;
  const a = v as Record<string, unknown>;
  if (typeof a.examId !== 'string' || !ID.test(a.examId)) return null;
  if (typeof a.id !== 'string' || !ID.test(a.id)) return null;
  if (typeof a.finishedAt !== 'number' || !Number.isFinite(a.finishedAt)) return null;
  if (!isScores(a.scores)) return null;
  if (a.body !== null && (typeof a.body !== 'object' || Array.isArray(a.body))) return null;
  return {
    examId: a.examId,
    id: a.id,
    finishedAt: a.finishedAt,
    scores: a.scores,
    body: a.body,
  };
}

async function readJson(req: Request): Promise<unknown> {
  const text = await req.text();
  if (text.length > MAX_BODY_CHARS) throw new Error('too large');
  return JSON.parse(text);
}

interface Row {
  seq: number;
  exam_id: string;
  id: string;
  finished_at: number;
  scores: string;
  body: string | null;
}

async function pull(env: Env, who: string, since: number) {
  const { results } = await env.DB.prepare(
    'SELECT seq, exam_id, id, finished_at, scores, body FROM attempts WHERE owner = ? AND seq > ? ORDER BY seq LIMIT ?',
  )
    .bind(who, since, PAGE + 1)
    .all<Row>();
  const page = results.slice(0, PAGE);
  const resets = await env.DB.prepare('SELECT exam_id, at FROM resets WHERE owner = ?')
    .bind(who)
    .all<{ exam_id: string; at: number }>();
  return {
    attempts: page.map((r) => ({
      seq: r.seq,
      examId: r.exam_id,
      id: r.id,
      finishedAt: r.finished_at,
      scores: JSON.parse(r.scores) as unknown,
      body: r.body ? (JSON.parse(r.body) as unknown) : null,
    })),
    resets: resets.results.map((r) => ({ examId: r.exam_id, at: r.at })),
    cursor: page.at(-1)?.seq ?? since,
    more: results.length > PAGE,
  };
}

export async function handleApi(req: Request, env: Env): Promise<Response> {
  const url = new URL(req.url);
  const who = await owner(req, env);
  if (!who) return json({ error: 'unauthorized' }, 401);

  try {
    if (url.pathname === '/api/sync' && req.method === 'GET') {
      const since = Number(url.searchParams.get('since') ?? '0');
      if (!Number.isSafeInteger(since) || since < 0) return json({ error: 'bad since' }, 400);
      return json(await pull(env, who, since));
    }

    if (url.pathname === '/api/attempts' && req.method === 'POST') {
      const data = (await readJson(req)) as { attempts?: unknown };
      const list = Array.isArray(data.attempts) ? data.attempts : null;
      if (!list || list.length > MAX_BATCH) return json({ error: 'bad attempts' }, 400);
      const parsed = list.map(parseAttempt);
      if (parsed.some((a) => !a)) return json({ error: 'bad attempt' }, 400);
      const stmts = (parsed as AttemptIn[]).map((a) =>
        env.DB.prepare(
          'INSERT OR IGNORE INTO attempts (owner, exam_id, id, finished_at, scores, body) VALUES (?, ?, ?, ?, ?, ?)',
        ).bind(
          who,
          a.examId,
          a.id,
          a.finishedAt,
          JSON.stringify(a.scores),
          a.body === null ? null : JSON.stringify(a.body),
        ),
      );
      if (stmts.length) await env.DB.batch(stmts);
      return json({ ok: true, count: stmts.length });
    }

    if (url.pathname === '/api/reset' && req.method === 'POST') {
      const data = (await readJson(req)) as { examId?: unknown; at?: unknown };
      if (typeof data.examId !== 'string' || !ID.test(data.examId)) {
        return json({ error: 'bad examId' }, 400);
      }
      if (typeof data.at !== 'number' || !Number.isFinite(data.at)) {
        return json({ error: 'bad at' }, 400);
      }
      await env.DB.prepare(
        'INSERT INTO resets (owner, exam_id, at) VALUES (?, ?, ?) ON CONFLICT (owner, exam_id) DO UPDATE SET at = max(at, excluded.at)',
      )
        .bind(who, data.examId, data.at)
        .run();
      return json({ ok: true });
    }
  } catch (e) {
    if (e instanceof SyntaxError || (e instanceof Error && e.message === 'too large')) {
      return json({ error: 'bad request' }, 400);
    }
    throw e;
  }
  return json({ error: 'not found' }, 404);
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    if (new URL(req.url).pathname.startsWith('/api/')) return handleApi(req, env);
    return env.ASSETS.fetch(req);
  },
};
