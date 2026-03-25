import { useEffect, useState, useRef } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";

import Marquee from "react-fast-marquee";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Frame sequence states
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showScrollPrompt, setShowScrollPrompt] = useState(true);
  const playIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const frameRef = useRef(0);
  const sequencePlayedRef = useRef(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  if (percent >= 100 && !loaded) {
    setTimeout(() => {
      setLoaded(true);
      setTimeout(() => {
        setIsLoaded(true);
      }, 1000);
    }, 600);
  }

  // Preload frames and handle window resize
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    for (let i = 0; i <= 81; i++) {
      const img = new Image();
      const idx = i.toString().padStart(3, "0");
      img.src = `/frames/ezgif-frame-${idx}.jpg`;
      images.push(img);
    }
    imagesRef.current = images;

    images[0].onload = () => {
      const canvas = canvasRef.current;
      if (canvas && images[0]) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) drawImageCover(ctx, images[0], canvas.width, canvas.height);
      }
    };

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas && imagesRef.current[frameRef.current]) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const ctx = canvas.getContext("2d");
        if (ctx)
          drawImageCover(
            ctx,
            imagesRef.current[frameRef.current],
            canvas.width,
            canvas.height
          );
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const drawImageCover = (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    width: number,
    height: number
  ) => {
    if (!img.currentSrc && !img.src) return;
    const imgRatio = img.width / img.height || 16/9;
    const canvasRatio = width / height;
    let drawWidth = width;
    let drawHeight = height;
    let offsetX = 0;
    let offsetY = 0;

    if (imgRatio > canvasRatio) {
      drawWidth = height * imgRatio;
      offsetX = (width - drawWidth) / 2;
    } else {
      drawHeight = width / imgRatio;
      offsetY = (height - drawHeight) / 2;
    }
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  const playSequence = () => {
    if (sequencePlayedRef.current) return;
    sequencePlayedRef.current = true;
    setShowScrollPrompt(false);

    playIntervalRef.current = setInterval(() => {
      frameRef.current += 1;
      if (frameRef.current >= 81) {
        if (playIntervalRef.current) clearInterval(playIntervalRef.current);
        frameRef.current = 81;
      }

      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx && imagesRef.current[frameRef.current]) {
          drawImageCover(
            ctx,
            imagesRef.current[frameRef.current],
            canvas.width,
            canvas.height
          );
        }
      }
    }, 1000 / 45); // ~22ms for 45 FPS
  };

  useEffect(() => {
    const handleScroll = () => {
      playSequence();
    };
    window.addEventListener("wheel", handleScroll);
    window.addEventListener("touchmove", handleScroll);

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
      if (playIntervalRef.current) clearInterval(playIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    import("./utils/initialFX").then((module) => {
      if (isLoaded) {
        setClicked(true);
        setTimeout(() => {
          if (module.initialFX) {
            module.initialFX();
          }
          // Intentionally NOT setting isLoading(false) so the canvas stays as background
          // Or if we must, we'd have to move the canvas out of Loading.
          // Since the prompt asks for "the last frame will be the background of the loading screen",
          // leaving the canvas mounted inside this component that might stay or fade is fine.
          // Let's hide the UI instead or just let it finish.
          setIsLoading(false);
        }, 900);
      }
    });
  }, [isLoaded]);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  }

  return (
    <>
      <canvas ref={canvasRef} className="canvas-bg" />
      <div className={`scroll-down-btn ${!showScrollPrompt ? 'hidden' : ''}`}>
        Scroll Down ↓
      </div>
      <div className="loading-header">
        <a href="/#" className="loader-title" data-cursor="disable">
          <img src="/logo_portfolio.png" alt="Logo" className="loading-logo" />
        </a>
        <div className={`loaderGame ${clicked && "loader-out"}`}>
          <div className="loaderGame-container">
            <div className="loaderGame-in">
              {[...Array(27)].map((_, index) => (
                <div className="loaderGame-line" key={index}></div>
              ))}
            </div>
            <div className="loaderGame-ball"></div>
          </div>
        </div>
      </div>
      <div className="loading-screen">
        <div className="loading-marquee">
          <Marquee>
            <span> Full Stack Developer</span> <span>Software Engineer</span>
            <span> Full Stack Developer</span> <span>Software Engineer</span>
          </Marquee>
        </div>
        <div
          className={`loading-wrap ${clicked && "loading-clicked"}`}
          onMouseMove={(e) => handleMouseMove(e)}
        >
          <div className="loading-hover"></div>
          <div className={`loading-button ${loaded && "loading-complete"}`}>
            <div className="loading-container">
              <div className="loading-content">
                <div className="loading-content-in">
                  Loading <span>{percent}%</span>
                </div>
              </div>
              <div className="loading-box"></div>
            </div>
            <div className="loading-content2">
              <span>Welcome</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;

  let interval = setInterval(() => {
    if (percent <= 50) {
      let rand = Math.round(Math.random() * 5);
      percent = percent + rand;
      setLoading(percent);
    } else {
      clearInterval(interval);
      interval = setInterval(() => {
        percent = percent + Math.round(Math.random());
        setLoading(percent);
        if (percent > 91) {
          clearInterval(interval);
        }
      }, 2000);
    }
  }, 100);

  function clear() {
    clearInterval(interval);
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      clearInterval(interval);
      interval = setInterval(() => {
        if (percent < 100) {
          percent++;
          setLoading(percent);
        } else {
          resolve(percent);
          clearInterval(interval);
        }
      }, 2);
    });
  }
  return { loaded, percent, clear };
};
