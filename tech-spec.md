# Tech Spec — Kira Chen Fitness Landing Page

## Dependencies

### Runtime
| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.0.0 | UI framework |
| react-dom | ^19.0.0 | React DOM renderer |
| gsap | ^3.12.7 | Animation engine (ScrollTrigger, SplitText plugins) |
| lenis | ^1.2.3 | Smooth momentum scrolling |
| three | ^0.172.0 | 3D scroll image grid effect |
| @fontsource/dancing-script | ^5.0.0 | Accent handwritten font |

### Dev / Build
| Package | Version | Purpose |
|---------|---------|---------|
| vite | ^6.3.5 | Build tool |
| @vitejs/plugin-react | ^4.4.1 | React support for Vite |
| tailwindcss | ^4.1.7 | Utility-first CSS |
| @tailwindcss/vite | ^4.1.7 | Tailwind Vite plugin |
| typescript | ^5.8.3 | Type checking |
| @types/react | ^19.1.4 | React type definitions |
| @types/react-dom | ^19.1.5 | ReactDOM type definitions |
| @types/three | ^0.172.0 | Three.js type definitions |

> **Note:** GSAP plugins (ScrollTrigger, SplitText, TextPlugin) are free as of 2025 and ship with the `gsap` package. Register them via `gsap.registerPlugin(...)` before use.

---

## Component Inventory

### Layout
| Component | Source | Notes |
|-----------|--------|-------|
| Navigation | Custom | Sticky, glassmorphic pill bar with scroll-aware background transition. Transparent → frosted glass on scroll. |
| Footer | Custom | Large watermark logo, social pill buttons, QR placeholder. |

### Sections
| Component | Source | Notes |
|-----------|--------|-------|
| HeroSection | Custom | Fullscreen video background, cutout trainer image, glassmorphic stats card, cyan CTA with pulse. |
| PhilosophySection | Custom | Asymmetric split layout. Editorial portrait + tilted glassmorphic text card (`rotate(-2deg)`). |
| TransformationGrid | Custom | **Complex.** Full-width scroll-driven section with pinned text stack + 3D image columns. Uses GSAP ScrollTrigger + custom CSS properties. |
| PricingSection | Custom | Three glassmorphic pricing cards in a row. Center card is elevated (`scale(1.05)`) with cyan border accent. |
| CommunityMarquee | Custom | **Complex.** Dark background section with bouncy kinetic text (GSAP + custom spring ease) + infinite CSS marquee of 3D icons behind. |
| ContactSection | Custom | Centered glassmorphic form card. Minimalist bottom-border inputs with cyan focus glow. |

### Reusable Components
| Component | Source | Used By |
|-----------|--------|---------|
| GlassCard | Custom | All sections — shared frosted glass container with `backdrop-filter`, border, shadow. |
| PillButton | Custom | Nav, Hero, Pricing, Contact — pill-shaped button with magnetic hover effect. |
| SectionHeading | Custom | Philosophy, Pricing — gradient pink display heading. |

### Hooks
| Hook | Purpose |
|------|---------|
| useSmoothScroll | Lenis initialization + GSAP ScrollTrigger integration. |
| useMagneticButton | GSAP-powered magnetic pull effect on button hover. |

---

## Animation Implementation

| Animation | Library | Implementation Approach | Complexity |
|-----------|---------|------------------------|------------|
| Smooth scrolling (global) | Lenis + GSAP ScrollTrigger | Lenis instance synced to GSAP ticker via `lenis.on('scroll', ScrollTrigger.update)` | Low |
| Hero CTA pulse | CSS `@keyframes` | Scale + opacity pulse animation on the pink gradient circle behind the CTA | Low |
| Navigation scroll transition | GSAP ScrollTrigger | `onUpdate` callback toggles glassmorphic class when scroll > threshold | Low |
| Button magnetic hover | GSAP | `useMagneticButton` hook — `gsap.to` button toward mouse position on mousemove, spring back on mouseleave | Medium |
| Card 3D tilt hover | Vanilla JS + CSS | Track mouse position relative to card, apply `rotateX`/`rotateY` via CSS `transform`. Increase `backdrop-filter` blur on hover. | Medium |
| **Transformation Grid (scroll-driven pinned text + image scrub)** | **GSAP ScrollTrigger + CSS custom properties** | **High.** Two synced timelines: (1) text elements animate from alternating X offsets to centered stack with CSS custom properties (`--y-*`, `--x-*`, `--s-*`) updated on every tick; (2) image columns slide in from opposite Y directions. Final phase: outer texts fade out, middle text scrambles via SplitText/TextPlugin. | **High 🔒** |
| **Community bouncy text** | **GSAP + custom spring ease** | **High.** Split text into individual `.char` spans. On scroll enter, animate from alternating left/right X/Y offsets with custom `createBouncyEase()` spring function (simulates mass/stiffness/damping physics). Stagger `0.05` for ripple wave effect. | **High 🔒** |
| Infinite icon marquee (Community) | CSS `@keyframes` | Pure CSS `translateX` animation, `animation: marquee 20s linear infinite`. Duplicate icon set for seamless loop. | Low |
| Philosophy section scroll reveal | GSAP ScrollTrigger | Fade + translateY entrance for text card and portrait image on scroll into view | Low |
| Pricing cards stagger entrance | GSAP ScrollTrigger | `gsap.from` with stagger for the three cards | Low |
| Contact form entrance | GSAP ScrollTrigger | Fade + scale entrance for the glass card | Low |
| Hero content entrance | GSAP timeline | Sequenced entrance: headline words → trainer image → stats card → CTA | Low |

---

## State & Logic Plan

### Lenis ↔ GSAP ScrollTrigger Bridge
Lenis must be initialized once at the app root and connected to GSAP's ticker. This is a singleton pattern: create the Lenis instance in `useSmoothScroll`, store it in a ref (not React state), and wire it to GSAP on mount:

```ts
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

The Lenis instance ref is passed via React context so any component can call `lenis.scrollTo()` for anchor navigation.

### Transformation Grid — Dual Timeline Sync
The Transformation Grid requires two GSAP timelines (`textsTimeline` and `imagesTimeline`) that must be scrubbed together via a single ScrollTrigger pin. Implementation:

1. Create a **master timeline** that contains both sub-timelines as nested timelines.
2. Attach one ScrollTrigger to the master timeline with `scrub: true` and `pin: true`.
3. The text timeline handles: (a) fly-in from alternating sides, (b) CSS custom property animation for the paint worklet, (c) final fade-out + text scramble.
4. The image timeline handles: vertical slide-in of before/after image columns, offset by `0.25s` relative to the text timeline.
5. Critical: the CSS custom properties (`--y-0` through `--y-24`, `--x-0` through `--x-24`, `--s-0` through `--s-24`) must be set on the DOM element's inline style every update tick. Use `Math.round(value * 100) / 100` to avoid excessive style recalcs.

### Community Bouncy Text — Custom Spring Ease
The bouncy text effect requires a custom easing function that simulates spring physics. This is a pure JS function (not a GSAP plugin) that takes mass/stiffness/damping parameters and returns a t→value function. GSAP uses it as the `ease` parameter directly.

Key parameters: `velocity=500`, `mass=1.5`, `stiffness=300`, `damping=20`. The function computes `w0`, `zeta`, and either an underdamped or overdamped solution. The resulting ease is applied to a `gsap.fromTo` on all `.char` spans with stagger `0.05`.

---

## Other Key Decisions

### No shadcn/ui Components
The design is entirely custom with glassmorphism, gradient text, and specific border radii (`32px+`, `999px`). Using shadcn's default primitives would require overriding nearly every style. All components are custom-built with Tailwind.

### Font Loading Strategy
- **Clash Display**: Load via `@font-face` from local/self-hosted woff2 files (or CDN). This is a commercial font; use a similar free alternative (e.g., `Space Grotesk` or `Syne`) if unavailable.
- **Inter**: Available via Tailwind's default font stack or `@fontsource/inter`.
- **Dancing Script**: Loaded via `@fontsource/dancing-script` for the handwritten accents.

### Hero Video
Use a `<video>` element with `autoPlay loop muted playsInline` attributes. The video source is a generated MP4 asset. Place a radial gradient overlay pseudo-element (`::after`) above the video but below text content using `z-index` layering: video (`z-0`) → gradient overlay (`z-10`) → content (`z-20`).

### Glassmorphism Fallback
For browsers without `backdrop-filter` support (some Firefox configs), provide a solid semi-transparent fallback: `background: rgba(255, 240, 245, 0.9)`. Detect support via `@supports not (backdrop-filter: blur(24px))`.

### Mobile Responsive Strategy
- Typography scales via `clamp()` and `text-[clamp(...)]` utilities.
- Transformation Grid: switch image columns to single full-width stack on screens < 768px.
- Pricing cards: stack vertically on mobile, center card remains slightly elevated.
- Navigation: collapse to hamburger menu on mobile.
- Community marquee: reduce font size and character stagger distance.
