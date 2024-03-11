import { useEffect, useRef, useState } from 'react';

export function useComponentVisible(initialIsVisible: boolean) {
  const ref = useRef<any>(null);
  const openerRef = useRef<any>(null);

  const [isComponentVisible, setIsComponentVisible] =
    useState(initialIsVisible);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (ref.current != null && openerRef.current != null) {
        if (
          !ref.current.contains(event.target) &&
          !openerRef.current.contains(event.target)
        ) {
          setIsComponentVisible(false);
        }
      } else if (ref.current != null) {
        if (!ref.current.contains(event.target)) {
          setIsComponentVisible(false);
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  return { ref, openerRef, isComponentVisible, setIsComponentVisible };
}
