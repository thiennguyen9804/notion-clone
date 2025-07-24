
import { useCallback, useLayoutEffect, useRef, useState } from 'react';

export function useMeasure<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [bounds, setBounds] = useState<DOMRectReadOnly>();

  const setRef = useCallback((node: T | null) => {
    ref.current = node;
  }, []);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect) {
        setBounds(entry.contentRect);
      }
    });

    observer.observe(element);

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  return [setRef, bounds] as const;
}
