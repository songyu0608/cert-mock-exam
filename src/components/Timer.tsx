import { useEffect, useRef, useState } from 'react';

function formatClock(ms: number): string {
  const t = Math.max(0, Math.ceil(ms / 1000));
  const h = Math.floor(t / 3600);
  const m = Math.floor((t % 3600) / 60);
  const s = t % 60;
  const mm = String(m).padStart(2, '0');
  const ss = String(s).padStart(2, '0');
  return h ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

/** 실전 모드 남은 시간. hidden이면 숫자만 감추고(자리는 그대로) 시간은 계속 흐른다. */
export function Timer({
  deadline,
  onExpire,
  hidden = false,
  label = '남은 시간',
}: {
  deadline: number;
  onExpire: () => void;
  hidden?: boolean;
  label?: string;
}) {
  const [now, setNow] = useState(() => Date.now());
  const fired = useRef(false);
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const left = deadline - now;
  useEffect(() => {
    if (left <= 0 && !fired.current) {
      fired.current = true;
      onExpire();
    }
  }, [left, onExpire]);
  return (
    <span
      className={`timer${left < 5 * 60_000 ? ' low' : ''}${hidden ? ' off' : ''}`}
      role="timer"
      aria-label={label}
      aria-hidden={hidden || undefined}
    >
      {formatClock(left)}
    </span>
  );
}
