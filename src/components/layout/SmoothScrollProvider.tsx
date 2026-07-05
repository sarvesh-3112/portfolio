"use client";
import { useEffect } from "react";

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let lenis: any;
    let ticker: any;

    const init = async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      gsap.registerPlugin(ScrollTrigger);

      lenis = new Lenis({
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      lenis.on("scroll", ScrollTrigger.update);

      ticker = gsap.ticker.add((time: number) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    };

    init();

    return () => {
      if (lenis) lenis.destroy();
      if (ticker) {
        import("gsap").then(({ gsap }) => gsap.ticker.remove(ticker));
      }
    };
  }, []);

  return <>{children}</>;
}
