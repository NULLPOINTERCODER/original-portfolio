import { useEffect, useRef } from "react";

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    // Mouse properties for slight parallax shift
    let mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Breathtaking galaxy colors
    const starColors = [
      "rgba(255, 255, 255, ", // Bright white
      "rgba(200, 220, 255, ", // Cool blue
      "rgba(255, 200, 255, ", // Warm pinkish
      "rgba(139, 92, 246, "   // Neon purple tint
    ];

    class Star {
      x: number;
      y: number;
      size: number;
      baseColor: string;
      colorAlpha: number;
      twinkleSpeed: number;
      twinklePhase: number;
      z: number; // Depth factor (closest = faster parallax, biggest)
      isCore: boolean; // Is it part of the dense galactic core?

      constructor(isCore: boolean = false) {
        this.isCore = isCore;
        this.z = Math.random() * 3 + 0.1; 
        this.size = (Math.random() * 1.5 + 0.2) * this.z;
        this.baseColor = starColors[Math.floor(Math.random() * starColors.length)];
        this.colorAlpha = Math.random();
        
        // Distribution: Core stars cluster in the middle horizontally, spreading diagonally
        if (isCore) {
            // Box-Muller transform for normal distribution around center
            const u = 1 - Math.random(); 
            const v = Math.random();
            const zNorm = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
            
            // Core spans middle X, angles slightly from bottom-left to top-right
            this.x = canvas!.width / 2 + (zNorm * canvas!.width * 0.2);
            this.y = canvas!.height / 2 + (zNorm * canvas!.height * 0.3) + (Math.random() - 0.5) * canvas!.height * 0.4;
        } else {
            // Background scattered stars
            this.x = Math.random() * canvas!.width;
            this.y = Math.random() * canvas!.height;
        }

        // Twinkling
        this.twinkleSpeed = Math.random() * 0.03 + 0.005;
        this.twinklePhase = Math.random() * Math.PI * 2;
      }

      update(driftX: number, driftY: number) {
        // Parallax drift based on mouse
        this.x -= driftX * this.z * 0.02;
        this.y -= driftY * this.z * 0.02;
        
        // Slow natural rotation of the galaxy
        this.x += 0.05 * this.z;

        // Wrap around smoothly
        if (this.x > canvas!.width + 50) this.x = -50;
        if (this.x < -50) this.x = canvas!.width + 50;
        if (this.y > canvas!.height + 50) this.y = -50;
        if (this.y < -50) this.y = canvas!.height + 50;

        // Twinkle
        this.twinklePhase += this.twinkleSpeed;
        this.colorAlpha = Math.abs(Math.sin(this.twinklePhase)) * (this.isCore ? 0.8 : 1);
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `${this.baseColor}${this.colorAlpha})`;
        
        if (this.z > 2.5 && this.colorAlpha > 0.5) {
            ctx.shadowBlur = this.size * 4;
            ctx.shadowColor = `${this.baseColor}1)`;
        } else {
            ctx.shadowBlur = 0;
        }
        
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    class ShootingStar {
        x: number = 0;
        y: number = 0;
        length: number = 0;
        speed: number = 0;
        angle: number = 0;
        active: boolean = false;
        opacity: number = 0;

        spawn() {
            this.active = true;
            this.x = Math.random() * canvas!.width;
            this.y = Math.random() * (canvas!.height / 2); // Spawn in upper half
            this.length = Math.random() * 150 + 50;
            this.speed = Math.random() * 15 + 10;
            this.angle = (Math.PI / 4) + (Math.random() * 0.2 - 0.1); // Roughly 45 degrees down-right
            this.opacity = 1;
        }

        update() {
            if (!this.active) return;
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;
            this.opacity -= 0.015; // Fade out

            if (this.opacity <= 0 || this.x > canvas!.width || this.y > canvas!.height) {
                this.active = false;
            }
        }

        draw() {
            if (!this.active || !ctx) return;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(
                this.x - Math.cos(this.angle) * this.length,
                this.y - Math.sin(this.angle) * this.length
            );
            
            // Tapered glowing stroke
            const gradient = ctx.createLinearGradient(
                this.x, this.y,
                this.x - Math.cos(this.angle) * this.length,
                this.y - Math.sin(this.angle) * this.length
            );
            gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
            gradient.addColorStop(1, `rgba(139, 92, 246, 0)`);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 2;
            ctx.shadowBlur = 10;
            ctx.shadowColor = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.stroke();
            ctx.shadowBlur = 0;
        }
    }

    let stars: Star[] = [];
    let shootingStars: ShootingStar[] = [new ShootingStar(), new ShootingStar()];

    const initGalaxy = () => {
      stars = [];
      // Adjust count based on screen size for performance (Very dense)
      const numberOfStars = Math.floor((canvas.width * canvas.height) / 1000); 
      
      for (let i = 0; i < numberOfStars; i++) {
        // Make 60% of stars part of the dense "Milky Way" core
        stars.push(new Star(i < numberOfStars * 0.6));
      }
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initGalaxy();
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // The glowing nebula core
    const drawGalacticCore = (centerX: number, centerY: number) => {
        if (!ctx) return;
        const maxRadius = Math.max(canvas.width, canvas.height) * 0.8;
        
        const gradient = ctx.createRadialGradient(
            centerX, centerY, 0,
            centerX, centerY, maxRadius
        );
        
        // Deep space nebula colors
        gradient.addColorStop(0, 'rgba(139, 92, 246, 0.15)'); // Neon purple center
        gradient.addColorStop(0.3, 'rgba(59, 130, 246, 0.05)'); // Blue mid
        gradient.addColorStop(0.8, 'rgba(5, 5, 5, 0)'); // Fade to black
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      // Deep space black base
      ctx.fillStyle = '#020005';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const mouseDriftX = (mouse.x - centerX) * 0.05;
      const mouseDriftY = (mouse.y - centerY) * 0.05;

      // Draw the glowing core with slight inverse parallax counter to stars
      drawGalacticCore(centerX - (mouseDriftX * 0.5), centerY - (mouseDriftY * 0.5));

      // Draw all stars
      stars.forEach((star) => {
        star.update(mouseDriftX, mouseDriftY);
        star.draw();
      });

      // Handle shooting stars
      shootingStars.forEach((star) => {
          if (!star.active && Math.random() < 0.005) { // Rare spawn rate
              star.spawn();
          }
          star.update();
          star.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[0] overflow-hidden pointer-events-none bg-background">
      {/* Base deep space backdrop */}
      <div className="absolute inset-0 bg-[#020005] z-[-2]" />
      
      {/* The immense galaxy canvas */}
      <canvas 
        ref={canvasRef} 
        className="w-full h-full relative z-[0]"
      />
      
      {/* Dark overlay to lower contrast behind text sufficiently */}
      <div className="absolute inset-0 bg-background/40 z-[1]" />

      {/* Noise texture overlay for a raw astrophotography feel */}
      <div 
        className="absolute inset-0 z-[2] opacity-[0.06] mix-blend-overlay pointer-events-none" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
