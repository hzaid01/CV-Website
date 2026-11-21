import { PropsWithChildren, useEffect, useRef } from "react";
import gsap from "gsap";
import { CURSORS, CURSOR_SPEED, cursorMarkup } from "./utils/cursors";
import "./styles/BuildIntro.css";

/*
 * A page section that gets "built" by collaborator cursors the first time it
 * scrolls into view: each [data-build] child gets a wireframe box dragged out
 * over it, then the real content fades into the box.
 */

type Props = PropsWithChildren<{
  id?: string;
  className?: string;
  cursors?: number;
}>;

const MAX_ITEMS = 10;

function runBuild(section: HTMLElement, cursorCount: number) {
  const items = Array.from(
    section.querySelectorAll<HTMLElement>("[data-build]")
  ).slice(0, MAX_ITEMS);
  const all = Array.from(section.querySelectorAll<HTMLElement>("[data-build]"));
  const sRect = section.getBoundingClientRect();
  const W = sRect.width;
  const visTop = Math.max(0, -sRect.top);
  const visBottom = Math.min(sRect.height, window.innerHeight - sRect.top);

  const layer = document.createElement("div");
  layer.className = "bs-layer";
  layer.setAttribute("aria-hidden", "true");
  section.appendChild(layer);

  const palette = [...CURSORS].sort(() => Math.random() - 0.5);
  const cursorEls = palette.slice(0, cursorCount).map((c) => {
    const el = document.createElement("div");
    el.className = "bi-cursor";
    el.style.setProperty("--bi-color", c.color);
    el.innerHTML = cursorMarkup(c.name);
    layer.appendChild(el);
    return el;
  });

  const boxes = items.map((el, i) => {
    const r = el.getBoundingClientRect();
    const b = { x: r.left - sRect.left, y: r.top - sRect.top, w: r.width, h: r.height };
    const node = document.createElement("div");
    node.className = "bi-box";
    node.style.cssText = `left:${b.x}px;top:${b.y}px;width:${b.w}px;height:${b.h}px`;
    node.style.setProperty("--bi-color", palette[i % cursorCount].color);
    node.innerHTML = `<div class="bi-box-fill"></div><span class="bi-box-label">${
      el.dataset.build || "Frame"
    }</span><i class="bi-handle bi-tl"></i><i class="bi-handle bi-tr"></i><i class="bi-handle bi-bl"></i><i class="bi-handle bi-br"></i>`;
    layer.appendChild(node);
    return { el, b, node };
  });

  const rand = (a: number, z: number) => a + Math.random() * (z - a);
  const edge = () => ({
    x: Math.random() < 0.5 ? -40 : W + 40,
    y: rand(visTop + 40, Math.max(visTop + 60, visBottom - 40)),
  });

  const tl = gsap.timeline({
    onComplete: () => {
      layer.remove();
      section.classList.remove("bs-pending");
      gsap.set(all, { clearProps: "opacity,transform" });
    },
  });
  tl.timeScale(CURSOR_SPEED);

  cursorEls.forEach((c, i) => {
    const from = edge();
    gsap.set(c, { x: from.x, y: from.y, opacity: 1 });
    const target = boxes[i] ? boxes[i].b : { x: rand(0, W), y: from.y, w: 0, h: 0 };
    tl.to(c, { x: target.x, y: target.y, duration: 0.5, ease: "power3.out" }, i * 0.06);
  });

  const step = 0.3;
  boxes.forEach(({ el, b, node }, i) => {
    const c = cursorEls[i % cursorEls.length];
    const at = 0.45 + i * step;
    tl.to(c, { x: b.x, y: b.y, duration: 0.25, ease: "power2.inOut" }, at);
    tl.set(node, { opacity: 1 }, at + 0.25);
    tl.fromTo(
      node,
      { clipPath: "inset(-22px 100% 100% -10px)" },
      { clipPath: "inset(-22px -10px -10px -10px)", duration: 0.4, ease: "power2.inOut" },
      at + 0.25
    );
    tl.to(
      c,
      { x: b.x + b.w, y: b.y + b.h, duration: 0.4, ease: "power2.inOut" },
      at + 0.25
    );
    tl.to(node.querySelector(".bi-box-fill"), { opacity: 1, duration: 0.2 }, at + 0.6);
    tl.fromTo(
      el,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
      at + 0.65
    );
    tl.to(node, { opacity: 0, duration: 0.35 }, at + 1.05);
  });

  // Anything past MAX_ITEMS just fades in with the last box.
  const rest = all.slice(MAX_ITEMS);
  const end = 0.45 + boxes.length * step + 0.7;
  if (rest.length) tl.to(rest, { opacity: 1, duration: 0.4, stagger: 0.05 }, end - 0.4);

  cursorEls.forEach((c, i) => {
    const to = edge();
    tl.to(c, { x: to.x, y: to.y, duration: 0.6, ease: "power3.in" }, end + i * 0.05);
  });

  return { tl, layer };
}

const BuildSection = ({ id, className = "", cursors = 4, children }: Props) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return;

    section.classList.add("bs-pending");
    let built: ReturnType<typeof runBuild> | null = null;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        built = runBuild(section, cursors);
      },
      { rootMargin: "0px 0px -30% 0px" }
    );
    io.observe(section);

    return () => {
      io.disconnect();
      built?.tl.kill();
      built?.layer.remove();
      section.classList.remove("bs-pending");
    };
  }, [cursors]);

  return (
    <section ref={ref} id={id} className={`bs ${className}`}>
      {children}
    </section>
  );
};

export default BuildSection;
