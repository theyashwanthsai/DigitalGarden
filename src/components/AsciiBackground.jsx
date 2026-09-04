import { useEffect, useRef } from "react";

const CHARS = " .:-=+*#%@";

function readThemeColor() {
  const styles = getComputedStyle(document.documentElement);
  const dark = document.documentElement.classList.contains("dark");
  const token = dark ? "--link-primary" : "--heading-tertiary";
  return styles.getPropertyValue(token).trim() || "#38372f";
}

function AsciiBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let rafId = 0;
    let running = true;
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let cellW = 8;
    let cellH = 12;
    let color = readThemeColor();
    let A = 0.8;
    let B = 0.6;
    const mouse = { x: 0.5, y: 0.5 };

    const resize = () => {
      const parent = canvas.parentElement;
      const nextW = parent?.clientWidth || window.innerWidth;
      const nextH = parent?.clientHeight || window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = nextW;
      height = nextH;
      canvas.width = Math.floor(nextW * dpr);
      canvas.height = Math.floor(nextH * dpr);
      canvas.style.width = `${nextW}px`;
      canvas.style.height = `${nextH}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const fontSize = nextW < 700 ? 11 : 13;
      cellW = fontSize * 0.62;
      cellH = fontSize * 1.05;
      cols = Math.ceil(width / cellW);
      rows = Math.ceil(height / cellH);
      ctx.font = `${fontSize}px Iosevka, ui-monospace, monospace`;
      ctx.textBaseline = "top";
    };

    const onMouse = (event) => {
      mouse.x = event.clientX / window.innerWidth;
      mouse.y = event.clientY / window.innerHeight;
    };

    const onTheme = () => {
      color = readThemeColor();
    };

    const observer = new MutationObserver(onTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const renderTorus = (buffer, zbuf) => {
      const cx = Math.floor(cols * (width < 800 ? 0.54 : 0.78));
      const cy = Math.floor(rows * 0.44);
      const R1 = 1;
      const R2 = 2.05;
      const K2 = 5.2;
      const K1 = Math.min(cols, rows) * 0.72;

      const cosA = Math.cos(A);
      const sinA = Math.sin(A);
      const cosB = Math.cos(B);
      const sinB = Math.sin(B);

      for (let theta = 0; theta < Math.PI * 2; theta += 0.055) {
        const cost = Math.cos(theta);
        const sint = Math.sin(theta);
        for (let phi = 0; phi < Math.PI * 2; phi += 0.022) {
          const cosp = Math.cos(phi);
          const sinp = Math.sin(phi);
          const circlex = R2 + R1 * cost;
          const circley = R1 * sint;

          const x = circlex * (cosB * cosp + sinA * sinB * sinp) - circley * cosA * sinB;
          const y = circlex * (sinB * cosp - sinA * cosB * sinp) + circley * cosA * cosB;
          const z = K2 + cosA * circlex * sinp + circley * sinA;
          const ooz = 1 / z;
          const xp = Math.floor(cx + K1 * ooz * x);
          const yp = Math.floor(cy - K1 * ooz * y * 0.55);

          if (xp < 0 || yp < 0 || xp >= cols || yp >= rows) continue;

          const L =
            cosp * cost * sinB -
            cosA * cost * sinp -
            sinA * sint +
            cosB * (cosA * sint - cost * sinA * sinp);

          if (L <= 0) continue;

          const idx = yp * cols + xp;
          if (ooz <= zbuf[idx]) continue;

          zbuf[idx] = ooz;
          buffer[idx] = CHARS[Math.min(CHARS.length - 1, Math.floor(L * 8))];
        }
      }
    };

    const draw = (t) => {
      if (!running) return;

      const targetA = 0.8 + (mouse.y - 0.5) * 0.6;
      const targetB = 0.6 + (mouse.x - 0.5) * 0.8;
      A += (targetA - A) * 0.02 + 0.018;
      B += (targetB - B) * 0.02 + 0.009;

      const buffer = new Array(cols * rows).fill(" ");
      const zbuf = new Float32Array(cols * rows);

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const nx = x / cols;
          const ny = y / rows;
          const field =
            Math.sin(nx * 7 + t * 0.00035) * Math.cos(ny * 5 - t * 0.00025) +
            Math.sin((nx + ny) * 4 + t * 0.0002);
          if (field > 0.72) {
            buffer[y * cols + x] = field > 1.15 ? "." : (x + y) % 17 === 0 ? "`" : " ";
          }
        }
      }

      renderTorus(buffer, zbuf);

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color;

      for (let y = 0; y < rows; y++) {
        let line = "";
        for (let x = 0; x < cols; x++) line += buffer[y * cols + x];
        ctx.fillText(line, 0, y * cellH);
      }

      if (!reduceMotion) rafId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse, { passive: true });
    rafId = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="ascii-bg"
      aria-hidden="true"
    />
  );
}

export default AsciiBackground;
