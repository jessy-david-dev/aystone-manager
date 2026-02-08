"use client";
import { useEffect, useRef } from "react";

interface RedstoneParticlesProps {
  className?: string;
  density?: number;
  maxRadius?: number;
}

class Star {
  context: CanvasRenderingContext2D;
  areaWidth: number;
  areaHeight: number;
  position: { x: number; y: number };
  speed: { x: number; y: number };
  radius: number;
  alpha: number;
  alphaSpeed: number;
  rgb: string[];
  selectedColor: number;
  color: string;

  constructor(args: {
    context: CanvasRenderingContext2D;
    areaWidth: number;
    areaHeight: number;
    x?: number;
    y?: number;
    speedX?: number;
    speedY?: number;
    radius: number;
    alpha?: number;
    alphaSpeed?: number;
  }) {
    this.context = args.context;
    this.areaWidth = args.areaWidth;
    this.areaHeight = args.areaHeight;
    this.position = {
      x: args.x ?? Math.random() * this.areaWidth,
      y: args.y ?? Math.random() * this.areaHeight,
    };
    this.speed = {
      x: args.speedX ?? Math.random() * 0.003 - 0.0015,
      y: args.speedY ?? Math.random() * 0.003 - 0.0015,
    };
    this.radius = Math.ceil(Math.random() * args.radius) || 2;
    this.alpha = args.alpha ?? Math.random() * 0.5 + 0.5;
    this.alphaSpeed = args.alphaSpeed ?? (Math.random() * 0.04 - 0.02);
    this.rgb = ["255,0,0", "255,50,50", "200,0,0", "255,80,80"];
    this.selectedColor = Math.floor(Math.random() * this.rgb.length);
    this.color = `rgba(${this.rgb[this.selectedColor]},${this.alpha})`;
  }

  draw() {
    this.updateCoords();
    this.updateAlpha();
    this.context.beginPath();
    this.context.fillStyle = this.color;
    this.context.rect(this.position.x, this.position.y, this.radius, this.radius);
    this.context.fill();
    this.context.closePath();
  }

  updateCoords() {
    this.position.x += this.speed.x;
    this.position.y -= this.speed.y;
    if (this.position.x > this.areaWidth + this.radius) this.position.x = 0 - this.radius;
    if (this.position.y > this.areaHeight + this.radius) this.position.y = 0 - this.radius;
    if (this.position.x < 0 - this.radius) this.position.x = this.areaWidth + this.radius;
    if (this.position.y < 0 - this.radius) this.position.y = this.areaHeight + this.radius;
  }

  updateAlpha() {
    this.alpha += this.alphaSpeed;
    if (this.alpha >= 1 || this.alpha <= 0) this.alphaSpeed = -this.alphaSpeed;
    this.color = `rgba(${this.rgb[this.selectedColor]},${this.alpha})`;
  }
}

class Starfield {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  stars: Star[];
  totalStars: number;
  maxRadius: number;

  constructor(canvas: HTMLCanvasElement, totalStars = 100, maxRadius = 3) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.width = 0;
    this.height = 0;
    this.stars = [];
    this.totalStars = totalStars;
    this.maxRadius = maxRadius;
    this.resize();
    this.setStars();
  }

  resize() {
    this.width = this.canvas.clientWidth;
    this.height = this.canvas.clientHeight;
    this.canvas.width = this.width * window.devicePixelRatio;
    this.canvas.height = this.height * window.devicePixelRatio;
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  setStars() {
    this.stars = [];
    for (let i = 0; i < this.totalStars; i++) {
      this.stars.push(
        new Star({
          context: this.ctx,
          areaWidth: this.width,
          areaHeight: this.height,
          radius: this.maxRadius,
        })
      );
    }
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.stars.forEach((star) => star.draw());
  }
}

export default function RedstoneParticles({ className = "", density = 60, maxRadius = 2 }: RedstoneParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starfieldRef = useRef<Starfield | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    starfieldRef.current = new Starfield(canvasRef.current, density, maxRadius);

    const handleResize = () => {
      starfieldRef.current?.resize();
      starfieldRef.current?.setStars();
    };
    window.addEventListener("resize", handleResize);

    const animate = () => {
      starfieldRef.current?.render();
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [density, maxRadius]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
