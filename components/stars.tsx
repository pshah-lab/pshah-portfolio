"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/components/theme-provider";

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  angle: number;
  draw: (ctx: CanvasRenderingContext2D) => void;
  update: (canvas: HTMLCanvasElement) => void;
}

export default function Stars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const { theme } = useTheme();
  const starsArrayRef = useRef<Star[]>([]);

  useEffect(() => {
    if (theme !== "dark" || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let numStars: number;
    let starBrightness: number;

    // Determine number of stars and brightness based on screen size
    if (window.innerWidth <= 430) {
      numStars = 100;
      starBrightness = 0.3;
    } else if (window.innerWidth <= 480) {
      numStars = 150;
      starBrightness = 0.5;
    } else if (window.innerWidth <= 568) {
      numStars = 200;
      starBrightness = 0.5;
    } else {
      numStars = 300;
      starBrightness = 1;
    }

    // Resize canvas to fit screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    // Star class
    class StarClass implements Star {
      x: number;
      y: number;
      size: number;
      speed: number;
      opacity: number;
      angle: number;

      constructor(x: number, y: number, size: number, speed: number) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed;
        this.opacity = starBrightness;
        this.angle = Math.random() * 2 * Math.PI;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
        ctx.closePath();
      }

      update(canvas: HTMLCanvasElement) {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        // Reposition star when it goes off-screen
        if (
          this.x > canvas.width ||
          this.x < 0 ||
          this.y > canvas.height ||
          this.y < 0
        ) {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
        }
      }
    }

    // Create stars based on screen size
    const createStars = () => {
      starsArrayRef.current = [];
      for (let i = 0; i < numStars; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 2;
        const speed = Math.random() * 0.5 + 0.2;
        starsArrayRef.current.push(new StarClass(x, y, size, speed));
      }
    };

    // Animate stars
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      starsArrayRef.current.forEach((star) => {
        star.update(canvas);
        star.draw(ctx);
      });
      animationRef.current = requestAnimationFrame(animate);
    };

    // Initial star creation and animation start
    createStars();
    animate();

    // Recreate stars on window resize
    const handleResize = () => {
      resizeCanvas();
      numStars = window.innerWidth <= 430 ? 100 : 300;
      starBrightness = window.innerWidth <= 430 ? 0.3 : 1;
      createStars();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [theme]);

  // Don't render canvas if not in dark mode
  if (theme !== "dark") {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-20"
      style={{ position: "fixed", top: 0, left: 0 }}
    />
  );
}
