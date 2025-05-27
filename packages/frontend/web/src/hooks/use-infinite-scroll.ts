import { useEffect } from 'react';

export default function useInfiniteScroll(
  trigger: React.RefObject<null>,
  onTrigger: (observers: IntersectionObserverEntry[]) => Promise<void>,
) {
  useEffect(() => {
    let infiniteScrollObserver: IntersectionObserver;
    if (trigger.current) {
      infiniteScrollObserver = new IntersectionObserver(onTrigger);
      infiniteScrollObserver.observe(trigger.current);
    }

    return () => {
      if (trigger.current) {
        infiniteScrollObserver.unobserve(trigger.current);
      }
    };
  }, [trigger]);
}
