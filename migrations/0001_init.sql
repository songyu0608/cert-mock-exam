-- 결과 기록. 한 번 들어온 기록은 바뀌지 않는다(같은 id는 무시).
-- seq는 받아 간 위치(커서)로 쓴다.
CREATE TABLE attempts (
  seq INTEGER PRIMARY KEY AUTOINCREMENT,
  owner TEXT NOT NULL,
  exam_id TEXT NOT NULL,
  id TEXT NOT NULL,
  finished_at INTEGER NOT NULL,
  scores TEXT NOT NULL,
  body TEXT,
  UNIQUE (owner, id)
);
CREATE INDEX attempts_owner_seq ON attempts (owner, seq);

-- 시험별로 기록을 지운 시각. 이 시각 이전에 끝난 기록은 기기에서 버린다.
CREATE TABLE resets (
  owner TEXT NOT NULL,
  exam_id TEXT NOT NULL,
  at INTEGER NOT NULL,
  PRIMARY KEY (owner, exam_id)
);
