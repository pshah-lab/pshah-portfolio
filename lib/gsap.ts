let gsapPromise: Promise<{ gsap: any; ScrollTrigger: any }> | null = null;

export async function getGsap() {
  if (typeof window === "undefined") return null;
  if (!gsapPromise) {
    gsapPromise = Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]).then(([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);
      return { gsap, ScrollTrigger };
    });
  }
  return gsapPromise;
}
