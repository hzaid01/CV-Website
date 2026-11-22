import Lenis from "lenis";

// Single smooth-scroll instance shared by the navbar and the intro FX.
export const lenis = new Lenis({
  duration: 1.2,
  smoothWheel: true,
});
