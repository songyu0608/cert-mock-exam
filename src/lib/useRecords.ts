import { useEffect, useState, useSyncExternalStore } from 'react';
import { CHANGED_EVENT } from './storage.ts';
import { getStatus, subscribe } from './sync.ts';

/** 기록이 바뀔 때(다른 기기에서 받은 기록 포함)마다 올라가는 값. 화면이 기록을 다시 읽게 한다. */
export function useRecordsVersion(examId?: string): number {
  const [v, setV] = useState(0);
  useEffect(() => {
    const on = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (!examId || id === examId) setV((n) => n + 1);
    };
    window.addEventListener(CHANGED_EVENT, on);
    return () => window.removeEventListener(CHANGED_EVENT, on);
  }, [examId]);
  return v;
}

export function useSyncStatus() {
  return useSyncExternalStore(subscribe, getStatus);
}
