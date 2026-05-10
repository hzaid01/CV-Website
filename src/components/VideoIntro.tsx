import { useEffect, useState, useRef } from "react";
import "./styles/VideoIntro.css";

interface VideoIntroProps {
  onComplete: () => void;
}

const VideoIntro = ({ onComplete }: VideoIntroProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canSkip, setCanSkip] = useState(false);
  const [isSkipped, setIsSkipped] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const frameRef = useRef(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const isMobile = window.innerWidth <= 768;
  const totalFrames = 800; // Both videos have 800 frames at 50 FPS
  const fps = 50;
  const frameDelay = 1000 / fps; // 20ms per frame

  useEffect(() => {
    // Preload all frames
    const images: HTMLImageElement[] = [];
    const frameFolder = isMobile ? "/mobile_intro_frames" : "/intro_frames";
    let loadedCount = 0;
    
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const idx = i.toString().padStart(3, "0");
      img.src = `${frameFolder}/frame-${idx}.jpg`;
      
      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
        
        // Start playing when enough frames are loaded (at least 50%)
        if (loadedCount === Math.ceil(totalFrames * 0.5) && isLoading) {
          setIsLoading(false);
          const canvas = canvasRef.current;
          if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            const ctx = canvas.getContext("2d");
            if (ctx && images[0]) {
              drawImageCover(ctx, images[0], canvas.width, canvas.height);
              setTimeout(() => setCanSkip(true), 1000);
              playFrames();
            }
          }
        }
      };
      
      images.push(img);
    }
    imagesRef.current = images;

    // Handle window resize
    const handleResize = () => {
      if (canvasRef.current && imagesRef.current[frameRef.current]) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) {
          drawImageCover(
            ctx,
            imagesRef.current[frameRef.current],
            canvasRef.current.width,
            canvasRef.current.height
          );
        }
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const drawImageCover = (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    width: number,
    height: number
  ) => {
    if (!img.complete || !img.naturalWidth) return;
    
    const imgRatio = img.naturalWidth / img.naturalHeight;
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
    
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  const playFrames = () => {
    let lastFrameTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - lastFrameTime;

      if (elapsed >= frameDelay) {
        frameRef.current += 1;
        lastFrameTime = currentTime;

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

        // Check if we've reached the end
        if (frameRef.current >= totalFrames - 1) {
          setTimeout(() => {
            onComplete();
          }, 500);
          return;
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  const handleSkip = () => {
    if (canSkip && !isSkipped) {
      setIsSkipped(true);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      onComplete();
    }
  };

  return (
    <div className="video-intro-container">
      {isLoading && (
        <div className="intro-loading">
          <div className="intro-loading-spinner"></div>
          <div className="intro-loading-text">Loading Experience... {loadProgress}%</div>
        </div>
      )}
      <canvas 
        ref={canvasRef} 
        className="video-intro-canvas" 
        style={{ opacity: isLoading ? 0 : 1 }}
      />
      {canSkip && !isSkipped && !isLoading && (
        <button className="skip-intro-btn" onClick={handleSkip}>
          Skip Intro →
        </button>
      )}
    </div>
  );
};

export default VideoIntro;
