-- 하나씩 지운 결과 id. 이 id의 결과는 다시 받지 않고, 기기들도 받아서 지운다.
-- (기록 전체 초기화는 resets 테이블이 맡는다.)
CREATE TABLE removed (
  owner TEXT NOT NULL,
  exam_id TEXT NOT NULL,
  id TEXT NOT NULL,
  at INTEGER NOT NULL,
  PRIMARY KEY (owner, id)
);
