import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

type SmoothScrollProps = {
  children: ReactNode;
};

const SmoothScroll = ({ children }: SmoothScrollProps) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.82,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      syncTouch: true,
      syncTouchLerp: 0.075,
      touchInertiaExponent: 1.7,
      touchMultiplier: 1,
      anchors: true,
    });

    let animationFrame = 0;

    const animate = (time: number) => {
      lenis.raf(time);
      animationFrame = requestAnimationFrame(animate);
    };

    const handleScrollLock = (event: Event) => {
      const shouldLock = (event as CustomEvent<boolean>).detail;
      if (shouldLock) {
        lenis.stop();
      } else {
        lenis.start();
      }
    };

    window.addEventListener("portfolio:scroll-lock", handleScrollLock);
    animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("portfolio:scroll-lock", handleScrollLock);
      cancelAnimationFrame(animationFrame);
      lenis.destroy();
    };
  }, []);

  return children;
};

export default SmoothScroll;
