import { useEffect, useRef, useState } from 'react';

export default function useAnimatedUnmount(visible: boolean) {
  const [shouldRender, setShouldRender] = useState(visible);

  const animatedElementRef = useRef<any | null>(null);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
    }

    function handleAnimationEnd() {
      setShouldRender(false);
    }

    const elementRef = animatedElementRef.current as HTMLElement
    if (!visible && elementRef) {
      elementRef.addEventListener('animationend', handleAnimationEnd);
    }

    return () => {
      if (elementRef) {
        elementRef.removeEventListener('animationend', handleAnimationEnd);
      }
    };
  }, [visible]);

  return {
    shouldRender,
    animatedElementRef,
  };
}
