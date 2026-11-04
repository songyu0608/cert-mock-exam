import { useEffect, useMemo, useState } from 'react';
import { loadQuestions } from '../data/exams.ts';
import type { Question } from '../data/schema.ts';
import { flattenAll, type Item } from './items.ts';

export interface Loaded {
  questions: Question[];
  items: Item[];
  itemsByKey: Map<string, Item>;
}

export function useQuestions(examId: string): { data?: Loaded; error?: string } {
  const [questions, setQuestions] = useState<Question[]>();
  const [error, setError] = useState<string>();
  useEffect(() => {
    let alive = true;
    loadQuestions(examId).then(
      (q) => alive && setQuestions(q),
      (e: unknown) => alive && setError(e instanceof Error ? e.message : String(e)),
    );
    return () => {
      alive = false;
    };
  }, [examId]);
  const data = useMemo(() => {
    if (!questions) return undefined;
    const items = flattenAll(questions);
    return { questions, items, itemsByKey: new Map(items.map((i) => [i.key, i])) };
  }, [questions]);
  return { data, error };
}
