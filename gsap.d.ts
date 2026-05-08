declare module 'gsap' {
  import { gsap } from 'gsap/types/index';
  export * from 'gsap/types/index';
  export default gsap;
}

declare module 'gsap/all' {
  export * from 'gsap/types/index';
}

declare module 'gsap/ScrollTrigger' {
  import { ScrollTrigger } from 'gsap/types/scroll-trigger';
  export * from 'gsap/types/scroll-trigger';
  export default ScrollTrigger;
}
