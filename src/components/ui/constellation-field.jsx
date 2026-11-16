import React, { useEffect, useRef } from "react";

/**
 * Constellation Field by Meng To (@mengto / ThreeUI)
 * Fulfills `npx shadcn@latest add "https://21st.dev/r/mengto/constellation-field"`
 *
 * An animated canvas background of drifting, pointer-reactive particle nodes
 * connected by fading constellation lines, used behind hero/landing sections.
 */
export function ConstellationField({
  variant = "constellation",
  mode = "dark",
  speed = 1.0,
  size = 1.0,
  strokeWidth = 1.0,
  length = 1.0,
  density = 1.0,
  opacity = 1.0,
  hue = 0,
  saturation = 1.0,
  brightness = 1.0,
  interactive = true,
  className = "",
  style = {},
}) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false, radius: 180 });
  const animFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const isDark = mode === "dark";

    // Color computation with hue / saturation / brightness
    const baseColor = isDark
      ? { r: 108, g: 99, b: 255 } // Electric purple-indigo
      : { r: 60, g: 140, b: 240 };
    const accentColor = isDark
      ? { r: 60, g: 200, b: 255 } // Cyan
      : { r: 255, g: 101, b: 132 };

    const getHsl = (hOffset, lFactor = 1.0, alpha = 1.0) => {
      const finalHue = (235 + hue + hOffset) % 360;
      const finalSat = Math.max(0, Math.min(100, 75 * saturation));
      const finalLight = Math.max(
        0,
        Math.min(100, (isDark ? 65 : 45) * brightness * lFactor)
      );
      return `hsla(${finalHue}, ${finalSat}%, ${finalLight}%, ${alpha * opacity})`;
    };

    // Calculate node count based on screen area & density
    const area = width * height;
    const baseCount = Math.floor((area / 11000) * Math.max(0.2, density));
    const count = Math.min(160, Math.max(35, baseCount));

    // Particle nodes definition
    const particles = Array.from({ length: count }, () => {
      const angle = Math.random() * Math.PI * 2;
      const velocity = (Math.random() * 0.4 + 0.15) * speed;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        baseRadius: (Math.random() * 1.8 + 0.8) * size,
        radius: (Math.random() * 1.8 + 0.8) * size,
        pulseOffset: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.03 + 0.015,
        alpha: Math.random() * 0.6 + 0.3,
        colorOffset: Math.random() * 40 - 20,
        connections: [],
      };
    });

    // Connection threshold
    const maxDist = 140 * length * (width < 768 ? 0.75 : 1.0);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener("resize", onResize);

    const onMouseMove = (e) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const onMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    let time = 0;

    const render = () => {
      time += 0.015 * speed;
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;

      // Update positions & draw connections
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Variant physics
        if (variant === "gateway-flow") {
          // Flow direction: upward drift with gentle sine wave
          p.y -= 0.6 * speed;
          p.x += Math.sin(time + p.pulseOffset) * 0.3 * speed;
          if (p.y < -10) p.y = height + 10;
        } else if (variant === "topo-field") {
          // Topographic undulating motion
          p.x += Math.cos(p.y * 0.01 + time) * 0.4 * speed;
          p.y += Math.sin(p.x * 0.01 + time) * 0.3 * speed;
        } else {
          // Classic constellation & particle-network drift
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x = width;
          else if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          else if (p.y > height) p.y = 0;
        }

        // Pointer reaction: gentle magnetic attraction or repulsion
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius && dist > 1) {
            const force = (1 - dist / mouse.radius) * 1.5;
            p.x -= (dx / dist) * force * 1.8;
            p.y -= (dy / dist) * force * 1.8;
          }
        }

        // Pulse size
        p.radius = p.baseRadius + Math.sin(time * 3 + p.pulseOffset) * 0.4;
      }

      // Draw constellation lines
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.35 * opacity;

            ctx.beginPath();
            ctx.strokeStyle = getHsl(p1.colorOffset, 1.0, lineAlpha);
            ctx.lineWidth = Math.max(0.5, (1 - dist / maxDist) * 1.6 * strokeWidth);
            ctx.moveTo(p1.x, p1.y);

            if (variant === "connectivity-graph" && Math.sin(time * 2 + i) > 0.8) {
              // Signal packet travel animation along edges
              const progress = (time * 1.5) % 1;
              const packetX = p1.x + (p2.x - p1.x) * progress;
              const packetY = p1.y + (p2.y - p1.y) * progress;
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();

              ctx.beginPath();
              ctx.arc(packetX, packetY, 1.8 * size, 0, Math.PI * 2);
              ctx.fillStyle = getHsl(40, 1.4, 0.9);
              ctx.fill();
            } else {
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }

        // Pointer constellation line
        if (mouse.active) {
          const mdx = mouse.x - p1.x;
          const mdy = mouse.y - p1.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < mouse.radius) {
            const mLineAlpha = (1 - mdist / mouse.radius) * 0.6 * opacity;
            ctx.beginPath();
            ctx.strokeStyle = getHsl(60, 1.3, mLineAlpha);
            ctx.lineWidth = 1.2 * strokeWidth;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      // Draw particle star nodes & glowing halos
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Outer glow halo
        const haloGrad = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.radius * 4.5
        );
        haloGrad.addColorStop(0, getHsl(p.colorOffset, 1.2, 0.45));
        haloGrad.addColorStop(1, "transparent");
        ctx.fillStyle = haloGrad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 4.5, 0, Math.PI * 2);
        ctx.fill();

        // Core star node
        ctx.fillStyle = getHsl(p.colorOffset, 1.4, p.alpha);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [
    variant,
    mode,
    speed,
    size,
    strokeWidth,
    length,
    density,
    opacity,
    hue,
    saturation,
    brightness,
    interactive,
  ]);

  return (
    <div
      className={`constellation-field-root ${className}`}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        pointerEvents: interactive ? "auto" : "none",
        zIndex: 1,
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
    </div>
  );
}

export default ConstellationField;

