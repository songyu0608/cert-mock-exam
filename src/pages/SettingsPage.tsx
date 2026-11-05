import { useEffect, useState } from 'react';
import {
  forgetKey,
  generateKey,
  getKey,
  keyHash,
  lastSyncedAt,
  normalizeKey,
  setKey,
  syncNow,
  type SyncStatus,
} from '../lib/sync.ts';
import { useSyncStatus } from '../lib/useRecords.ts';
import { onLinkClick, paths } from '../router.ts';

const time = (at: number) => new Date(at).toLocaleString('ko-KR');

function statusText(s: SyncStatus): string {
  switch (s.state) {
    case 'running':
      return '동기화 중…';
    case 'ok':
      return `동기화 완료 · ${time(s.at)} · 받은 기록 ${s.pulled}개, 올린 기록 ${s.pushed}개`;
    case 'error':
      return s.unauthorized
        ? '등록되지 않은 비밀키입니다. 아래 등록 코드를 Worker 설정(SYNC_KEY_HASHES)에 넣고 배포해야 동기화됩니다.'
        : `동기화하지 못했습니다: ${s.message}`;
    default: {
      const last = lastSyncedAt();
      return last ? `마지막 동기화 · ${time(last)}` : '아직 동기화하지 않았습니다.';
    }
  }
}

async function copy(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export function SettingsPage() {
  const [key, setKeyState] = useState(getKey);
  const status = useSyncStatus();

  const connect = (k: string) => {
    setKey(k);
    setKeyState(k);
    void syncNow();
  };

  return (
    <main className="wrap stack">
      <nav className="crumb">
        <a href={paths.list()} onClick={onLinkClick}>
          ← 시험 목록
        </a>
      </nav>
      <header>
        <h1>기기 간 기록 동기화</h1>
        <p className="lede">
          같은 비밀키를 넣은 기기끼리 결과 기록과 오답 목록을 주고받습니다. 키가 없으면 기록은 이
          브라우저에만 남습니다. 풀던 세션(이어 풀기)은 기기마다 따로 둡니다.
        </p>
      </header>
      {key ? (
        <Connected
          keyText={key}
          status={status}
          onForget={() => {
            forgetKey();
            setKeyState(null);
          }}
        />
      ) : (
        <Disconnected onConnect={connect} />
      )}
    </main>
  );
}

function Connected({
  keyText,
  status,
  onForget,
}: {
  keyText: string;
  status: SyncStatus;
  onForget: () => void;
}) {
  const [hash, setHash] = useState('');
  const [shown, setShown] = useState(false);
  const [copied, setCopied] = useState('');
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    let live = true;
    void keyHash(keyText).then((h) => live && setHash(h));
    return () => {
      live = false;
    };
  }, [keyText]);

  const doCopy = async (what: string, text: string) =>
    setCopied(
      (await copy(text))
        ? `${what}를 복사했습니다.`
        : '복사하지 못했습니다. 직접 선택해 복사하세요.',
    );

  return (
    <>
      <section className="panel stack" aria-labelledby="sync-h">
        <h2 id="sync-h">동기화 상태</h2>
        <p
          className={status.state === 'error' ? 'note' : 'small'}
          role="status"
          style={{ margin: 0 }}
        >
          {statusText(status)}
        </p>
        <div className="row">
          <button
            type="button"
            className="btn primary"
            disabled={status.state === 'running'}
            onClick={() => void syncNow()}
          >
            지금 동기화
          </button>
        </div>
      </section>

      <section className="panel stack" aria-labelledby="key-h">
        <h2 id="key-h">이 기기의 비밀키</h2>
        <div className="row">
          <code className="key" aria-label="비밀키">
            {shown ? keyText : keyText.replace(/[A-Z0-9]/g, '•')}
          </code>
          <button type="button" className="btn sm" onClick={() => setShown((v) => !v)}>
            {shown ? '숨기기' : '보기'}
          </button>
          <button type="button" className="btn sm" onClick={() => void doCopy('비밀키', keyText)}>
            복사
          </button>
        </div>
        <p className="small muted" style={{ margin: 0 }}>
          다른 기기의 이 화면에서 「키 입력」에 붙여 넣으면 연결됩니다. 비밀키는 남에게 보내지
          마세요.
        </p>
        <h3>등록 코드</h3>
        <div className="row">
          <code className="key" aria-label="등록 코드">
            {hash || '계산 중…'}
          </code>
          <button
            type="button"
            className="btn sm"
            disabled={!hash}
            onClick={() => void doCopy('등록 코드', hash)}
          >
            복사
          </button>
        </div>
        <p className="small muted" style={{ margin: 0 }}>
          비밀키에서 계산한 값이라 보내도 키를 알아낼 수 없습니다. 이 코드가 Worker 설정에 등록돼
          있어야 동기화됩니다.
        </p>
        {copied && (
          <p className="small" role="status" style={{ margin: 0 }}>
            {copied}
          </p>
        )}
        <div className="row">
          {confirm ? (
            <>
              <span className="small">
                이 기기의 연결을 끊을까요? 이 기기의 기록은 남고, 서버 기록도 지워지지 않습니다.
              </span>
              <button type="button" className="btn sm danger" onClick={onForget}>
                연결 끊기
              </button>
              <button type="button" className="btn sm" onClick={() => setConfirm(false)}>
                취소
              </button>
            </>
          ) : (
            <button type="button" className="btn sm ghost" onClick={() => setConfirm(true)}>
              이 기기에서 연결 끊기
            </button>
          )}
        </div>
      </section>
    </>
  );
}

function Disconnected({ onConnect }: { onConnect: (key: string) => void }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  return (
    <>
      <section className="panel stack" aria-labelledby="new-h">
        <h2 id="new-h">처음 쓰는 경우: 새 비밀키 만들기</h2>
        <p className="small muted" style={{ margin: 0 }}>
          한 번만 만들고, 다른 기기에는 같은 키를 넣습니다. 만든 뒤 나오는 등록 코드를 Worker 설정에
          등록해야 동기화가 시작됩니다.
        </p>
        <div className="row">
          <button type="button" className="btn primary" onClick={() => onConnect(generateKey())}>
            새 비밀키 만들기
          </button>
        </div>
      </section>
      <section className="panel stack" aria-labelledby="enter-h">
        <h2 id="enter-h">다른 기기에서 만든 키 입력</h2>
        <form
          className="row"
          onSubmit={(e) => {
            e.preventDefault();
            const k = normalizeKey(input);
            if (!k) {
              setError('키 형식이 맞지 않습니다. cme-로 시작하는 키 전체를 붙여 넣으세요.');
              return;
            }
            onConnect(k);
          }}
        >
          <input
            aria-label="비밀키"
            placeholder="cme-XXXX-XXXX-…"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError('');
            }}
            autoComplete="off"
            spellCheck={false}
            style={{ flex: '1 1 260px', minWidth: 0 }}
          />
          <button type="submit" className="btn">
            연결
          </button>
        </form>
        {error && (
          <p className="note small" role="alert" style={{ margin: 0 }}>
            {error}
          </p>
        )}
      </section>
    </>
  );
}
