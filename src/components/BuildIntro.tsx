import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Button } from "@astryxdesign/core/Button";
import "./styles/BuildIntro.css";
import { CURSORS, CURSOR_SPEED } from "./utils/cursors";

/*
 * "Multiplayer build" intro: on every load a swarm of collaborator cursors
 * flies in, drags wireframe boxes over the real page elements, then the dark
 * canvas fades away and the finished site is revealed underneath.
 */

type Target = { selector: string; label: string };

const TARGETS: Target[] = [
  { selector: ".header", label: "Navbar" },
  { selector: ".landing-intro h2", label: "Greeting" },
  { selector: ".landing-intro h1", label: "Heading / Name" },
  { selector: ".hero-photo", label: "Photo" },
  { selector: ".hero-word", label: "Display Text" },
  { selector: ".landing-info", label: "Role" },
  { selector: ".icons-section", label: "Socials" },
];


type Box = { x: number; y: number; w: number; h: number; label: string };

const shouldPlay = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

const rand = (min: number, max: number) => min + Math.random() * (max - min);

const offscreen = (vw: number, vh: number) => {
  const side = Math.floor(Math.random() * 4);
  if (side === 0) return { x: rand(0, vw), y: -60 };
  if (side === 1) return { x: vw + 60, y: rand(0, vh) };
  if (side === 2) return { x: rand(0, vw), y: vh + 60 };
  return { x: -60, y: rand(0, vh) };
};

const measureBoxes = (): Box[] => {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const boxes: Box[] = [];
  for (const t of TARGETS) {
    const el = document.querySelector(t.selector);
    if (!el) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 8 || r.height < 8) continue;
    // Clamp to the viewport so off-screen parts don't create huge boxes.
    const x = Math.max(4, r.left);
    const y = Math.max(4, r.top);
    const w = Math.min(vw - 4, r.right) - x;
    const h = Math.min(vh - 4, r.bottom) - y;
    if (w < 8 || h < 8) continue;
    boxes.push({ x, y, w, h, label: t.label });
  }
  return boxes;
};

const BuildIntro = () => {
  const [active, setActive] = useState(shouldPlay);
  const [boxes, setBoxes] = useState<Box[] | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Measure real element positions once the page has laid out.
  useEffect(() => {
    if (!active) return;
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setBoxes(measureBoxes()));
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [active]);

  // Block page scrolling while the intro is on screen.
  useEffect(() => {
    if (!active) return;
    const el = rootRef.current;
    if (!el) return;
    const block = (e: Event) => e.preventDefault();
    el.addEventListener("wheel", block, { passive: false });
    el.addEventListener("touchmove", block, { passive: false });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      el.removeEventListener("wheel", block);
      el.removeEventListener("touchmove", block);
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const finish = () => {
    tlRef.current?.kill();
    const el = rootRef.current;
    if (!el) {
      setActive(false);
      return;
    }
    gsap.to(el, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => setActive(false),
    });
  };

  useLayoutEffect(() => {
    if (!active || !boxes || !rootRef.current) return;
    const root = rootRef.current;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const cursorEls = Array.from(
      root.querySelectorAll<HTMLElement>(".bi-cursor")
    );
    const boxEls = Array.from(root.querySelectorAll<HTMLElement>(".bi-box"));

    // Keep the intro on wall-clock time even if the main thread is busy;
    // GSAP's lag smoothing would otherwise stretch it on slow devices.
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: () => setActive(false) });
      tl.timeScale(CURSOR_SPEED);
      tlRef.current = tl;

      // 1. Cursors fly in from the edges.
      cursorEls.forEach((c, i) => {
        const from = offscreen(vw, vh);
        gsap.set(c, { x: from.x, y: from.y, opacity: 1 });
        tl.to(
          c,
          {
            x: rand(vw * 0.15, vw * 0.85),
            y: rand(vh * 0.2, vh * 0.8),
            duration: 0.7,
            ease: "power3.out",
          },
          i * 0.05
        );
      });

      tl.to(".bi-grid", { opacity: 1, duration: 0.6 }, 0.3);
      tl.to(".bi-frame", { opacity: 1, duration: 0.4 }, 0.5);

      // 2. Each builder drags out a wireframe over a real element.
      const start = 0.9;
      const step = 0.28;
      boxes.forEach((b, i) => {
        const c = cursorEls[i % cursorEls.length];
        const box = boxEls[i];
        const at = start + i * step;
        tl.to(c, { x: b.x, y: b.y, duration: 0.35, ease: "power2.inOut" }, at);
        tl.set(box, { opacity: 1 }, at + 0.35);
        tl.fromTo(
          box,
          { clipPath: "inset(-10px 100% 100% -10px)" },
          {
            clipPath: "inset(-10px -10px -10px -10px)",
            duration: 0.5,
            ease: "power2.inOut",
          },
          at + 0.35
        );
        tl.to(
          c,
          { x: b.x + b.w, y: b.y + b.h, duration: 0.5, ease: "power2.inOut" },
          at + 0.35
        );
        tl.to(
          box.querySelector(".bi-box-fill"),
          { opacity: 1, duration: 0.25 },
          at + 0.85
        );
      });

      // Idle cursors wander around while the boxes are built.
      const buildEnd = start + boxes.length * step + 0.9;
      cursorEls.slice(boxes.length).forEach((c) => {
        tl.to(
          c,
          {
            x: rand(vw * 0.1, vw * 0.9),
            y: rand(vh * 0.15, vh * 0.85),
            duration: buildEnd - start,
            ease: "sine.inOut",
          },
          start
        );
      });

      // 3. Reveal the real site underneath the wireframes.
      tl.to(".bi-backdrop", { opacity: 0, duration: 0.8, ease: "power2.out" }, buildEnd);
      tl.to(".bi-box-fill", { opacity: 0, duration: 0.6 }, buildEnd);
      tl.to(".bi-grid", { opacity: 0, duration: 0.6 }, buildEnd + 0.2);

      // 4. Wireframes dissolve and the cursors leave.
      tl.to(
        boxEls,
        { opacity: 0, duration: 0.4, stagger: 0.06 },
        buildEnd + 0.7
      );
      tl.to(".bi-frame", { opacity: 0, duration: 0.4 }, buildEnd + 0.7);
      cursorEls.forEach((c, i) => {
        const to = offscreen(vw, vh);
        tl.to(
          c,
          { x: to.x, y: to.y, duration: 0.7, ease: "power3.in" },
          buildEnd + 0.9 + i * 0.03
        );
      });
      tl.to(".bi-skip", { opacity: 0, duration: 0.3 }, buildEnd + 0.9);
    }, root);

    return () => {
      ctx.revert();
      gsap.ticker.lagSmoothing(500, 33);
    };
  }, [active, boxes]);

  if (!active) return null;

  const cursorCount = window.innerWidth < 768 ? 6 : CURSORS.length;

  return (
    <div
      className="bi-root"
      ref={rootRef}
      data-lenis-prevent
    >
      <div className="bi-backdrop" />
      <div className="bi-grid" />
      <div className="bi-frame">
        <span className="bi-frame-label">
          Portfolio — {window.innerWidth} × {window.innerHeight}
        </span>
      </div>

      {boxes?.map((b, i) => (
        <div
          key={b.label}
          className="bi-box"
          style={{
            left: b.x,
            top: b.y,
            width: b.w,
            height: b.h,
            ["--bi-color" as string]: CURSORS[i % CURSORS.length].color,
          }}
        >
          <div className="bi-box-fill" />
          <span className="bi-box-label">{b.label}</span>
          <span className="bi-box-size">
            {Math.round(b.w)} × {Math.round(b.h)}
          </span>
          <i className="bi-handle bi-tl" />
          <i className="bi-handle bi-tr" />
          <i className="bi-handle bi-bl" />
          <i className="bi-handle bi-br" />
        </div>
      ))}

      {CURSORS.slice(0, cursorCount).map((c) => (
        <div
          key={c.name}
          className="bi-cursor"
          style={{ ["--bi-color" as string]: c.color }}
        >
          <svg width="20" height="22" viewBox="0 0 20 22" aria-hidden="true">
            <path
              d="M1 1 L1 17.5 L5.6 13.4 L8.8 20.6 L12 19.2 L8.9 12.2 L15 12 Z"
              fill="var(--bi-color)"
              stroke="#15171c"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </svg>
          <span className="bi-cursor-name">{c.name}</span>
        </div>
      ))}

      <span className="bi-skip">
        <Button label="Skip intro" variant="secondary" size="sm" onClick={finish} />
      </span>
    </div>
  );
};

export default BuildIntro;
