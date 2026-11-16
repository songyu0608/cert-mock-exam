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

/**
 * 실전 모드 남은 시간. hidden이면 숫자만 감추고(자리는 그대로) 시간은 계속 흐른다.
 * pausedAt이 있으면(일시정지 중) 그 시각에서 멈춘 남은 시간을 보여 주고 끝나지 않는다.
 */
export function Timer({
  deadline,
  onExpire,
  hidden = false,
  label = '남은 시간',
  pausedAt,
}: {
  deadline: number;
  onExpire: () => void;
  hidden?: boolean;
  label?: string;
  pausedAt?: number;
}) {
  const [now, setNow] = useState(() => Date.now());
  const fired = useRef(false);
  // 일시정지 중에는 멈추고, 재개하면 다음 1초를 기다리지 않고 바로 지금 시각으로 다시 센다.
  const paused = pausedAt !== undefined;
  useEffect(() => {
    if (paused) return;
    const tick = () => setNow(Date.now());
    const first = setTimeout(tick, 0);
    const t = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(t);
    };
  }, [paused]);
  const left = deadline - (pausedAt ?? now);
  useEffect(() => {
    if (!paused && left <= 0 && !fired.current) {
      fired.current = true;
      onExpire();
    }
  }, [left, onExpire, paused]);
  return (
    <span
      className={`timer${left < 5 * 60_000 ? ' low' : ''}${hidden ? ' off' : ''}${paused ? ' paused' : ''}`}
      role="timer"
      aria-label={label}
      aria-hidden={hidden || undefined}
    >
      {formatClock(left)}
    </span>
  );
}
