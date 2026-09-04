import { useEffect, useRef } from "react";

const NODE_CHARS = "oO@";
const LAYERS = [5, 8, 8, 5];

function readThemeColor() {
  const styles = getComputedStyle(document.documentElement);
  const dark = document.documentElement.classList.contains("dark");
  const token = dark ? "--link-primary" : "--heading-tertiary";
  return styles.getPropertyValue(token).trim() || "#38372f";
}

function buildNetwork() {
  const nodes = [];
  const edges = [];
  const starts = [];
  let cursor = 0;

  LAYERS.forEach((count, layer) => {
    starts[layer] = cursor;
    for (let i = 0; i < count; i++) {
      nodes.push({
        layer,
        i,
        x: (layer - (LAYERS.length - 1) / 2) * 1.95,
        y: (i - (count - 1) / 2) * 0.62,
        z: Math.sin(i * 0.8 + layer * 0.5) * 0.1,
      });
    }
    cursor += count;
  });

  for (let layer = 0; layer < LAYERS.length - 1; layer++) {
    const aCount = LAYERS[layer];
    const bCount = LAYERS[layer + 1];
    for (let i = 0; i < aCount; i++) {
      const t = aCount === 1 ? 0.5 : i / (aCount - 1);
      const mid = t * (bCount - 1);
      const targets = new Set([
        Math.round(mid),
        Math.max(0, Math.round(mid) - 1),
        Math.min(bCount - 1, Math.round(mid) + 1),
      ]);
      if (i % 2 === 0) targets.add((i * 3 + layer) % bCount);
      if (i === 0) targets.add(0);
      if (i === aCount - 1) targets.add(bCount - 1);

      targets.forEach((j) => {
        edges.push({
          a: starts[layer] + i,
          b: starts[layer + 1] + j,
        });
      });
    }
  }

  return { nodes, edges };
}

function plot(buffer, zbuf, cols, rows, x, y, z, ch, force) {
  if (x < 0 || y < 0 || x >= cols || y >= rows) return;
  const idx = y * cols + x;
  if (!force && z <= zbuf[idx]) return;
  zbuf[idx] = z;
  buffer[idx] = ch;
}

function slopeChar(x0, y0, x1, y1, heat) {
  const dx = x1 - x0;
  const dy = y1 - y0;
  const ax = Math.abs(dx);
  const ay = Math.abs(dy);
  if (heat > 0.82) return "*";
  if (ay < ax * 0.35) return heat > 0.5 ? "=" : "-";
  if (ax < ay * 0.35) return "|";
  return (dx > 0) === (dy > 0) ? "\\" : "/";
}

function drawLine(buffer, zbuf, cols, rows, x0, y0, z0, x1, y1, z1, heat) {
  const ch = slopeChar(x0, y0, x1, y1, heat);
  let dx = Math.abs(x1 - x0);
  let dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;
  const steps = Math.max(dx, dy, 1);
  let step = 0;

  while (true) {
    const t = step / steps;
    plot(buffer, zbuf, cols, rows, x0, y0, z0 * (1 - t) + z1 * t, ch, false);
    if (x0 === x1 && y0 === y1) break;
    const e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x0 += sx;
    }
    if (e2 < dx) {
      err += dx;
      y0 += sy;
    }
    step += 1;
    if (step > 400) break;
  }
}

function AsciiBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const { nodes, edges } = buildNetwork();

    let rafId = 0;
    let running = true;
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let cellW = 8;
    let cellH = 12;
    let color = readThemeColor();
    let rotY = 0.12;
    let rotX = 0.06;
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

    const observer = new MutationObserver(() => {
      color = readThemeColor();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const project = (x, y, z) => {
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const x1 = x * cosY + z * sinY;
      let z1 = -x * sinY + z * cosY;
      const y1 = y * cosX - z1 * sinX;
      z1 = y * sinX + z1 * cosX;

      const depth = z1 + 5.2;
      const scale = (Math.min(cols, rows) * 0.78) / depth;
      const ox = cols * (width < 800 ? 0.5 : 0.74);
      const oy = rows * 0.45;

      return {
        px: Math.round(ox + x1 * scale),
        py: Math.round(oy + y1 * scale * 0.72),
        ooz: 1 / depth,
      };
    };

    const draw = (t) => {
      if (!running) return;

      const targetY = 0.1 + (mouse.x - 0.5) * 0.35;
      const targetX = 0.05 + (mouse.y - 0.5) * 0.2;
      rotY += (targetY - rotY) * 0.04 + (reduceMotion ? 0 : 0.0018);
      rotX += (targetX - rotX) * 0.04;

      const buffer = new Array(cols * rows).fill(" ");
      const zbuf = new Float32Array(cols * rows);
      const wave = reduceMotion ? 1.4 : (t * 0.00038) % (LAYERS.length + 1.2);

      const activations = nodes.map((node, idx) => {
        const along = Math.exp(-((node.layer - wave) ** 2) * 1.6);
        const shimmer = 0.5 + 0.5 * Math.sin(t * 0.0024 + idx * 0.9);
        return Math.min(1, along * 0.9 + shimmer * 0.18);
      });

      edges.forEach((edge) => {
        const a = nodes[edge.a];
        const b = nodes[edge.b];
        const pa = project(a.x, a.y, a.z);
        const pb = project(b.x, b.y, b.z);
        const heat = Math.max(activations[edge.a], activations[edge.b]);
        const mid = (a.layer + b.layer) / 2;
        const pulse = Math.exp(-((mid - wave) ** 2) * 2.4);
        const strength = Math.min(1, heat * 0.45 + pulse * 0.8);
        drawLine(buffer, zbuf, cols, rows, pa.px, pa.py, pa.ooz, pb.px, pb.py, pb.ooz, strength);
      });

      nodes.forEach((node, idx) => {
        const p = project(node.x, node.y, node.z);
        const act = activations[idx];
        const ch = NODE_CHARS[Math.min(NODE_CHARS.length - 1, Math.floor(act * 2.2))];
        plot(buffer, zbuf, cols, rows, p.px, p.py, p.ooz + 0.03, ch, true);
        plot(buffer, zbuf, cols, rows, p.px - 1, p.py, p.ooz + 0.01, act > 0.55 ? "(" : ".", false);
        plot(buffer, zbuf, cols, rows, p.px + 1, p.py, p.ooz + 0.01, act > 0.55 ? ")" : ".", false);
      });

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
