/**
 * Electric Gaze ASCII & Procedural 2D Raster Engine
 * Recreates the 21st.dev ASCII-art effect pipeline using Canvas2D
 */

export const DEFAULT_PARAMS = {
  renderMode: "dither",
  bgMode: "none",
  bgBlur: 12,
  bgOpacity: 90,
  cellSize: 9,
  coverage: 100,
  invert: false,
  styleBlend: "source-over",
  charSet: "standard",
  customChars: "",
  brightness: 0,
  contrast: 158,
  edgeEmphasis: 0,
  density: 20,
  toneCurve: [
    { x: 0, y: 0 },
    { x: 1, y: 1 }
  ],
  tint: "#3ca6ff",
  tintOpacity: 0,
  overlayBlend: "multiply",
  saturation: 100,
  grayscale: 0,
  blurType: "off",
  blurAmount: 35,
  blurAngle: 0,
  directionalBothSides: false,
  tiltFocus: 35,
  tiltPosition: 50,
  tiltFeather: 15,
  lensFocus: 40,
  blurCenterX: 50,
  blurCenterY: 50,
  progressivePosition: 55,
  progressiveReverse: false,
  pfx: {
    vignette: { enabled: false, intensity: 38 },
    scanLines: { enabled: false, intensity: 40 },
    chromatic: { enabled: false, intensity: 15 },
    bloom: { enabled: false, intensity: 25 },
    filmGrain: { enabled: false, intensity: 30 },
    glitch: { enabled: false, intensity: 20 },
    pixelate: { enabled: false, intensity: 15 },
    halftone: { enabled: false, intensity: 20 },
    filmDust: { enabled: false, intensity: 20 }
  },
  animated: true,
  animStyle: "shimmer",
  animSpeed: { enabled: true, intensity: 100 },
  animIntensity: { enabled: true, intensity: 60 },
  lights: { enabled: false, points: [] },
  mask: {
    enabled: false,
    tool: "freehand",
    brushSize: 30,
    showOverlay: false,
    invert: false,
    dataUrl: null,
    shapes: []
  }
};

const CHAR_SETS = {
  standard: " .'`^\",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$",
  blocks: "  ░▒▓█",
  minimal: " .oO@",
  matrix: " ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ1234567890",
  braille: " ⠂⠅⠖⠦⠵⠷⠿"
};

// 4x4 Bayer Dither Matrix normalized to 0..255
const BAYER_4X4 = [
  [0, 128, 32, 160],
  [192, 64, 224, 96],
  [48, 176, 16, 144],
  [240, 112, 208, 80]
];

// Generates an Electric Gaze procedural portrait if external photo is absent
export function generateElectricGazeFallback(width = 640, height = 800) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Deep dark cyber background
  const bgGrad = ctx.createRadialGradient(width * 0.5, height * 0.45, 40, width * 0.5, height * 0.5, width * 0.8);
  bgGrad.addColorStop(0, '#121a2e');
  bgGrad.addColorStop(0.6, '#060a14');
  bgGrad.addColorStop(1, '#020308');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Soft silhouette / head shape
  ctx.save();
  ctx.fillStyle = '#1e243a';
  ctx.beginPath();
  ctx.ellipse(width * 0.5, height * 0.44, width * 0.28, height * 0.32, 0, 0, Math.PI * 2);
  ctx.fill();

  // Face highlight gradient
  const faceGrad = ctx.createRadialGradient(width * 0.5, height * 0.4, 30, width * 0.5, height * 0.45, width * 0.25);
  faceGrad.addColorStop(0, '#4a5b82');
  faceGrad.addColorStop(0.5, '#232b45');
  faceGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = faceGrad;
  ctx.fill();

  // Shoulders
  ctx.fillStyle = '#0f1424';
  ctx.beginPath();
  ctx.ellipse(width * 0.5, height * 0.9, width * 0.45, height * 0.25, 0, 0, Math.PI * 2);
  ctx.fill();

  // Electric Gaze: Eyes
  const leftEyeX = width * 0.41;
  const rightEyeX = width * 0.59;
  const eyeY = height * 0.42;

  // Eye sockets
  ctx.fillStyle = '#0c1020';
  ctx.beginPath();
  ctx.ellipse(leftEyeX, eyeY, 32, 16, -0.05, 0, Math.PI * 2);
  ctx.ellipse(rightEyeX, eyeY, 32, 16, 0.05, 0, Math.PI * 2);
  ctx.fill();

  // Intense Electric Cyan Irises
  [leftEyeX, rightEyeX].forEach((ex) => {
    // Glow behind eye
    const glow = ctx.createRadialGradient(ex, eyeY, 2, ex, eyeY, 45);
    glow.addColorStop(0, 'rgba(60, 210, 255, 0.95)');
    glow.addColorStop(0.3, 'rgba(40, 150, 255, 0.6)');
    glow.addColorStop(0.7, 'rgba(100, 70, 255, 0.2)');
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(ex, eyeY, 45, 0, Math.PI * 2);
    ctx.fill();

    // Sharp pupil & core
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(ex, eyeY, 6, 0, Math.PI * 2);
    ctx.fill();

    // Laser electric gaze beam lines
    ctx.strokeStyle = 'rgba(100, 230, 255, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(ex, eyeY);
    ctx.lineTo(ex + (ex - width * 0.5) * 1.5, eyeY + 180);
    ctx.stroke();
  });

  // Nose bridge & lips shadow
  ctx.fillStyle = '#151c2e';
  ctx.beginPath();
  ctx.ellipse(width * 0.5, height * 0.56, 28, 8, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
  return canvas;
}

export class AsciiRenderer {
  constructor(canvas, params = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.params = { ...DEFAULT_PARAMS, ...params };
    this.offscreen = document.createElement('canvas');
    this.offCtx = this.offscreen.getContext('2d', { willReadFrequently: true });
    this.sourceImg = null;
    this.fallbackImg = null;
    this.time = 0;
    this.matrixColumns = [];
    this.dustParticles = [];
    this.initDust();
  }

  setParams(newParams) {
    this.params = { ...this.params, ...newParams };
    if (newParams.pfx) {
      this.params.pfx = { ...this.params.pfx, ...newParams.pfx };
    }
  }

  initDust() {
    this.dustParticles = Array.from({ length: 25 }, () => ({
      x: Math.random(),
      y: Math.random(),
      len: Math.random() * 8 + 2,
      opacity: Math.random() * 0.7 + 0.3
    }));
  }

  setSourceImage(img) {
    this.sourceImg = img;
  }

  // Prepares matrix rain columns when matrix renderMode is active
  updateMatrixRain(cols, rows) {
    if (this.matrixColumns.length !== cols) {
      this.matrixColumns = Array.from({ length: cols }, () => ({
        y: Math.floor(Math.random() * rows),
        speed: Math.random() * 0.5 + 0.2
      }));
    }
    this.matrixColumns.forEach((c) => {
      c.y += c.speed;
      if (c.y > rows) c.y = 0;
    });
  }

  // Step 1: Draw source photo and handle bgMode
  drawBackground(w, h) {
    const { bgMode, bgBlur, bgOpacity, tint } = this.params;
    const ctx = this.ctx;

    if (bgMode === 'none') {
      ctx.clearRect(0, 0, w, h);
    } else if (bgMode === 'solid') {
      ctx.fillStyle = tint || '#000000';
      ctx.fillRect(0, 0, w, h);
    } else if (bgMode === 'original' || bgMode === 'blur') {
      ctx.save();
      ctx.globalAlpha = (bgOpacity ?? 90) / 100;
      if (bgMode === 'blur') {
        ctx.filter = `blur(${bgBlur || 12}px)`;
      }
      const img = this.sourceImg || this.fallbackImg;
      if (img) {
        ctx.drawImage(img, 0, 0, w, h);
      }
      ctx.restore();
    }
  }

  // Color adjustment helper
  adjustColor(r, g, b) {
    const { brightness, contrast, saturation, grayscale } = this.params;

    // 1. Brightness (-100 to 100)
    let br = r + (brightness * 2.55);
    let bg = g + (brightness * 2.55);
    let bb = b + (brightness * 2.55);

    // 2. Contrast (-100 to 200, default 158)
    const cFactor = (259 * (contrast + 255)) / (255 * (259 - contrast) || 1);
    br = cFactor * (br - 128) + 128;
    bg = cFactor * (bg - 128) + 128;
    bb = cFactor * (bb - 128) + 128;

    // 3. Luminance (ITU-R BT.601)
    const lum = Math.max(0, Math.min(255, 0.299 * br + 0.587 * bg + 0.114 * bb));

    // 4. Saturation (0 to 200)
    const sat = saturation / 100;
    br = lum + (br - lum) * sat;
    bg = lum + (bg - lum) * sat;
    bb = lum + (bb - lum) * sat;

    // 5. Grayscale (0 to 100)
    const gray = grayscale / 100;
    br = br * (1 - gray) + lum * gray;
    bg = bg * (1 - gray) + lum * gray;
    bb = bb * (1 - gray) + lum * gray;

    return {
      r: Math.max(0, Math.min(255, Math.round(br))),
      g: Math.max(0, Math.min(255, Math.round(bg))),
      b: Math.max(0, Math.min(255, Math.round(bb))),
      lum: Math.max(0, Math.min(255, Math.round(lum)))
    };
  }

  // Step 8: Animation modulation factor
  getAnimationModulation(gx, gy, x, y, w, h) {
    const { animated, animStyle, animSpeed, animIntensity } = this.params;
    if (!animated) return 1.0;

    const speed = (animSpeed?.intensity ?? 100) / 100;
    const intensity = (animIntensity?.intensity ?? 60) / 100;
    const t = this.time * 0.003 * speed;

    switch (animStyle) {
      case 'shimmer': {
        // High-frequency subtle electric scintillation
        const hash = Math.sin(gx * 12.9898 + gy * 78.233 + t * 4) * 43758.5453;
        const noise = (hash - Math.floor(hash)) * 2 - 1;
        return 1.0 + noise * (0.35 * intensity);
      }
      case 'wave': {
        const wave = Math.sin(x * 0.02 + y * 0.015 + t * 3);
        return 1.0 + wave * (0.4 * intensity);
      }
      case 'pulse': {
        const pulse = Math.sin(t * 3);
        return 1.0 + pulse * (0.35 * intensity);
      }
      case 'ripple': {
        const dx = x - w * 0.5;
        const dy = y - h * 0.45;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const rip = Math.sin(dist * 0.05 - t * 5);
        return 1.0 + rip * (0.45 * intensity);
      }
      case 'flicker': {
        const flick = Math.random() > 0.92 ? (Math.random() - 0.5) * 0.8 : 0;
        return 1.0 + flick * intensity;
      }
      default:
        return 1.0;
    }
  }

  // Draw primitive shape per cell based on renderMode
  drawCellShape(ctx, mode, cx, cy, size, lum, normLum, r, g, b, gx, gy) {
    const { charSet, customChars, density } = this.params;
    const half = size * 0.5;
    const denScale = Math.max(0.2, (density || 20) / 20);

    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.strokeStyle = `rgb(${r},${g},${b})`;

    switch (mode) {
      case 'dither': {
        // 4x4 Bayer threshold dither
        const threshold = BAYER_4X4[gy % 4][gx % 4];
        if (lum > threshold) {
          const dotRadius = Math.max(1, (half - 0.5) * normLum * denScale);
          ctx.beginPath();
          ctx.arc(cx, cy, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
        break;
      }

      case 'characters': {
        let set = CHAR_SETS[charSet] || CHAR_SETS.standard;
        if (customChars && customChars.length > 0) set = customChars;
        const idx = Math.min(set.length - 1, Math.floor(normLum * set.length));
        const ch = set[idx];
        ctx.font = `${Math.round(size * denScale)}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(ch, cx, cy);
        break;
      }

      case 'mosaic': {
        ctx.fillRect(cx - half, cy - half, size, size);
        break;
      }

      case 'pixel': {
        ctx.fillRect(cx - half + 0.5, cy - half + 0.5, size - 1, size - 1);
        break;
      }

      case 'dots': {
        const rad = Math.max(0.5, half * normLum * denScale);
        ctx.beginPath();
        ctx.arc(cx, cy, rad, 0, Math.PI * 2);
        ctx.fill();
        break;
      }

      case 'cross': {
        const len = half * normLum * denScale;
        ctx.lineWidth = Math.max(1, 2 * normLum);
        ctx.beginPath();
        ctx.moveTo(cx - len, cy); ctx.lineTo(cx + len, cy);
        ctx.moveTo(cx, cy - len); ctx.lineTo(cx, cy + len);
        ctx.stroke();
        break;
      }

      case 'diamond': {
        const d = half * normLum * denScale;
        ctx.beginPath();
        ctx.moveTo(cx, cy - d);
        ctx.lineTo(cx + d, cy);
        ctx.lineTo(cx, cy + d);
        ctx.lineTo(cx - d, cy);
        ctx.closePath();
        ctx.fill();
        break;
      }

      case 'voxel': {
        // 3D shaded isometric cube
        const s = half * normLum * denScale;
        // Top
        ctx.fillStyle = `rgb(${Math.min(255, r + 40)},${Math.min(255, g + 40)},${Math.min(255, b + 40)})`;
        ctx.beginPath();
        ctx.moveTo(cx, cy - s);
        ctx.lineTo(cx + s * 0.86, cy - s * 0.5);
        ctx.lineTo(cx, cy);
        ctx.lineTo(cx - s * 0.86, cy - s * 0.5);
        ctx.closePath();
        ctx.fill();
        // Left
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.beginPath();
        ctx.moveTo(cx - s * 0.86, cy - s * 0.5);
        ctx.lineTo(cx, cy);
        ctx.lineTo(cx, cy + s);
        ctx.lineTo(cx - s * 0.86, cy + s * 0.5);
        ctx.closePath();
        ctx.fill();
        // Right
        ctx.fillStyle = `rgb(${Math.max(0, r - 40)},${Math.max(0, g - 40)},${Math.max(0, b - 40)})`;
        ctx.beginPath();
        ctx.moveTo(cx + s * 0.86, cy - s * 0.5);
        ctx.lineTo(cx, cy);
        ctx.lineTo(cx, cy + s);
        ctx.lineTo(cx + s * 0.86, cy + s * 0.5);
        ctx.closePath();
        ctx.fill();
        break;
      }

      case 'lego': {
        const w = size - 1;
        ctx.fillRect(cx - half + 0.5, cy - half + 0.5, w, w);
        // Lego round stud on top
        ctx.fillStyle = `rgba(255,255,255,0.4)`;
        ctx.beginPath();
        ctx.arc(cx, cy, half * 0.45, 0, Math.PI * 2);
        ctx.fill();
        break;
      }

      case 'mixed': {
        if (normLum < 0.3) {
          ctx.beginPath();
          ctx.arc(cx, cy, Math.max(1, half * normLum), 0, Math.PI * 2);
          ctx.fill();
        } else if (normLum < 0.65) {
          const l = half * 0.8;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(cx - l, cy); ctx.lineTo(cx + l, cy);
          ctx.moveTo(cx, cy - l); ctx.lineTo(cx, cy + l);
          ctx.stroke();
        } else {
          ctx.font = `${Math.round(size)}px monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('#', cx, cy);
        }
        break;
      }

      case 'lines': {
        const th = Math.max(1, (size - 1) * normLum * denScale);
        ctx.fillRect(cx - half, cy - th * 0.5, size, th);
        break;
      }

      case 'diagonal': {
        ctx.lineWidth = Math.max(1, 3 * normLum * denScale);
        ctx.beginPath();
        ctx.moveTo(cx - half, cy + half);
        ctx.lineTo(cx + half, cy - half);
        ctx.stroke();
        break;
      }

      case 'braille': {
        const brailleChars = CHAR_SETS.braille;
        const bIdx = Math.min(brailleChars.length - 1, Math.floor(normLum * brailleChars.length));
        ctx.font = `${Math.round(size * 1.1)}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(brailleChars[bIdx], cx, cy);
        break;
      }

      case 'disco': {
        ctx.shadowColor = `rgb(${r},${g},${b})`;
        ctx.shadowBlur = 8 * normLum;
        ctx.fillRect(cx - half + 1, cy - half + 1, size - 2, size - 2);
        ctx.shadowBlur = 0;
        break;
      }

      case 'hexdump': {
        const hex = ((Math.floor(r + g + b) % 16).toString(16)).toUpperCase();
        ctx.font = `${Math.round(size * 0.9)}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(hex, cx, cy);
        break;
      }

      case 'matrix': {
        const chars = CHAR_SETS.matrix;
        const ch = chars[(gx + gy + Math.floor(this.time * 0.01)) % chars.length];
        const isLeading = this.matrixColumns[gx] && Math.abs(this.matrixColumns[gx].y - gy) < 1.2;
        ctx.fillStyle = isLeading ? '#ffffff' : `rgba(60, 255, 120, ${Math.max(0.2, normLum)})`;
        ctx.font = `${Math.round(size)}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(ch, cx, cy);
        break;
      }

      case 'rings': {
        const numRings = Math.max(1, Math.floor(normLum * 4));
        ctx.lineWidth = 1;
        for (let ri = 1; ri <= numRings; ri++) {
          ctx.beginPath();
          ctx.arc(cx, cy, (half / numRings) * ri, 0, Math.PI * 2);
          ctx.stroke();
        }
        break;
      }

      case 'hearts': {
        const hs = half * normLum * denScale * 0.9;
        if (hs > 1) {
          ctx.beginPath();
          ctx.moveTo(cx, cy + hs * 0.7);
          ctx.bezierCurveTo(cx - hs, cy + hs * 0.2, cx - hs, cy - hs * 0.7, cx, cy - hs * 0.4);
          ctx.bezierCurveTo(cx + hs, cy - hs * 0.7, cx + hs, cy + hs * 0.2, cx, cy + hs * 0.7);
          ctx.fill();
        }
        break;
      }

      case 'stars': {
        const sp = 5;
        const oR = half * normLum * denScale;
        const iR = oR * 0.45;
        if (oR > 1) {
          ctx.beginPath();
          for (let i = 0; i < sp * 2; i++) {
            const rad = (i * Math.PI) / sp - Math.PI / 2;
            const rLen = i % 2 === 0 ? oR : iR;
            const px = cx + Math.cos(rad) * rLen;
            const py = cy + Math.sin(rad) * rLen;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.fill();
        }
        break;
      }

      case 'hexagons': {
        const hr = half * normLum * denScale;
        if (hr > 1) {
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const a = (i * Math.PI) / 3;
            const px = cx + hr * Math.cos(a);
            const py = cy + hr * Math.sin(a);
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.fill();
        }
        break;
      }

      case 'triangles': {
        const tr = half * normLum * denScale;
        const flip = (gx + gy) % 2 === 0 ? 1 : -1;
        ctx.beginPath();
        ctx.moveTo(cx, cy - tr * flip);
        ctx.lineTo(cx + tr, cy + tr * flip);
        ctx.lineTo(cx - tr, cy + tr * flip);
        ctx.closePath();
        ctx.fill();
        break;
      }

      case 'bubbles': {
        const br = half * normLum * denScale;
        if (br > 1) {
          ctx.beginPath();
          ctx.arc(cx, cy, br, 0, Math.PI * 2);
          ctx.fill();
          // Specular highlight
          ctx.fillStyle = 'rgba(255,255,255,0.7)';
          ctx.beginPath();
          ctx.arc(cx - br * 0.35, cy - br * 0.35, br * 0.25, 0, Math.PI * 2);
          ctx.fill();
        }
        break;
      }

      case 'hatch': {
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx - half, cy - half);
        ctx.lineTo(cx + half, cy + half);
        if (normLum > 0.5) {
          ctx.moveTo(cx + half, cy - half);
          ctx.lineTo(cx - half, cy + half);
        }
        ctx.stroke();
        break;
      }

      case 'contour': {
        const band = Math.floor(normLum * 6);
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(cx, cy, (half * (band + 1)) / 6, 0, Math.PI * 2);
        ctx.stroke();
        break;
      }

      case 'halfblocks': {
        ctx.font = `${Math.round(size)}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(normLum > 0.5 ? '▀' : '▄', cx, cy);
        break;
      }

      default: {
        ctx.beginPath();
        ctx.arc(cx, cy, Math.max(1, half * normLum), 0, Math.PI * 2);
        ctx.fill();
        break;
      }
    }
  }

  // Step 5: Post-effects layering (PFX)
  applyPostEffects(w, h) {
    const { pfx } = this.params;
    if (!pfx) return;
    const ctx = this.ctx;

    // Scanlines
    if (pfx.scanLines?.enabled) {
      const intensity = (pfx.scanLines.intensity || 40) / 100;
      ctx.save();
      ctx.fillStyle = `rgba(0, 0, 0, ${0.45 * intensity})`;
      for (let y = 0; y < h; y += 3) {
        ctx.fillRect(0, y, w, 1);
      }
      ctx.restore();
    }

    // Vignette
    if (pfx.vignette?.enabled) {
      const intensity = (pfx.vignette.intensity || 38) / 100;
      ctx.save();
      const vig = ctx.createRadialGradient(w * 0.5, h * 0.5, Math.min(w, h) * 0.35, w * 0.5, h * 0.5, Math.max(w, h) * 0.75);
      vig.addColorStop(0, 'rgba(0,0,0,0)');
      vig.addColorStop(1, `rgba(0,0,0,${0.9 * intensity})`);
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();
    }

    // Chromatic aberration (RGB shift)
    if (pfx.chromatic?.enabled) {
      const shift = Math.round((pfx.chromatic.intensity || 15) * 0.2);
      if (shift > 0) {
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.drawImage(this.canvas, -shift, 0, w, h);
        ctx.drawImage(this.canvas, shift, 0, w, h);
        ctx.restore();
      }
    }

    // Bloom
    if (pfx.bloom?.enabled) {
      const intensity = (pfx.bloom.intensity || 25) / 100;
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.filter = `blur(10px)`;
      ctx.globalAlpha = 0.5 * intensity;
      ctx.drawImage(this.canvas, 0, 0, w, h);
      ctx.restore();
    }

    // Film Grain
    if (pfx.filmGrain?.enabled) {
      const intensity = (pfx.filmGrain.intensity || 30) / 100;
      ctx.save();
      const count = Math.floor(w * h * 0.002 * intensity);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      for (let i = 0; i < count; i++) {
        ctx.fillRect(Math.random() * w, Math.random() * h, 1.2, 1.2);
      }
      ctx.restore();
    }

    // Glitch (horizontal displacement slices)
    if (pfx.glitch?.enabled) {
      const intensity = (pfx.glitch.intensity || 20) / 100;
      if (Math.random() < 0.35) {
        ctx.save();
        const numSlices = Math.floor(Math.random() * 4 * intensity) + 1;
        for (let i = 0; i < numSlices; i++) {
          const sy = Math.random() * h;
          const sh = Math.random() * 24 + 4;
          const offset = (Math.random() - 0.5) * 30 * intensity;
          ctx.drawImage(this.canvas, 0, sy, w, sh, offset, sy, w, sh);
        }
        ctx.restore();
      }
    }

    // Halftone
    if (pfx.halftone?.enabled) {
      const intensity = (pfx.halftone.intensity || 20) / 100;
      ctx.save();
      ctx.fillStyle = `rgba(0,0,0,${0.3 * intensity})`;
      for (let x = 0; x < w; x += 6) {
        for (let y = 0; y < h; y += 6) {
          ctx.beginPath();
          ctx.arc(x, y, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();
    }

    // Film Dust / Scratches
    if (pfx.filmDust?.enabled) {
      ctx.save();
      ctx.strokeStyle = 'rgba(240, 240, 255, 0.4)';
      ctx.lineWidth = 1;
      this.dustParticles.forEach((d) => {
        if (Math.random() < 0.2) {
          d.x = Math.random();
          d.y = Math.random();
        }
        ctx.beginPath();
        ctx.moveTo(d.x * w, d.y * h);
        ctx.lineTo(d.x * w + (Math.random() - 0.5) * 2, d.y * h + d.len);
        ctx.stroke();
      });
      ctx.restore();
    }
  }

  // Step 6: Glow lights
  applyLights(w, h) {
    const { lights } = this.params;
    if (!lights?.enabled || !lights.points || lights.points.length === 0) return;
    const ctx = this.ctx;
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    lights.points.forEach((pt) => {
      const lx = pt.x * w;
      const ly = pt.y * h;
      const lr = (pt.radius || 100);
      const intensity = (pt.intensity || 50) / 100;
      const grad = ctx.createRadialGradient(lx, ly, 0, lx, ly, lr);
      grad.addColorStop(0, `rgba(60, 166, 255, ${0.8 * intensity})`);
      grad.addColorStop(0.5, `rgba(108, 99, 255, ${0.3 * intensity})`);
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(lx, ly, lr, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();
  }

  // Main Render Call
  render(timestamp = performance.now()) {
    this.time = timestamp;
    const { canvas, ctx, offscreen, offCtx } = this;
    const w = canvas.width;
    const h = canvas.height;
    if (w === 0 || h === 0) return;

    if (offscreen.width !== w || offscreen.height !== h) {
      offscreen.width = w;
      offscreen.height = h;
    }

    const {
      renderMode,
      cellSize,
      coverage,
      invert,
      styleBlend,
      tint,
      tintOpacity,
      overlayBlend,
      edgeEmphasis
    } = this.params;

    // Draw source into offscreen canvas with aspect ratio covering target
    offCtx.clearRect(0, 0, w, h);
    let img = this.sourceImg;
    if (!img) {
      if (!this.fallbackImg) {
        this.fallbackImg = generateElectricGazeFallback(640, 800);
      }
      img = this.fallbackImg;
    }

    if (img) {
      const imgAspect = (img.width || 640) / (img.height || 800);
      const canvasAspect = w / h;
      let drawW, drawH, drawX, drawY;
      if (canvasAspect > imgAspect) {
        drawW = w;
        drawH = w / imgAspect;
        drawX = 0;
        drawY = (h - drawH) * 0.5;
      } else {
        drawH = h;
        drawW = h * imgAspect;
        drawX = (w - drawW) * 0.5;
        drawY = 0;
      }
      offCtx.drawImage(img, drawX, drawY, drawW, drawH);
    }

    // Step 1: Draw Background
    this.drawBackground(w, h);

    // Step 2 & 3: Sample Grid & Render Shapes
    const cSize = Math.max(3, cellSize || 9);
    const cols = Math.ceil(w / cSize);
    const rows = Math.ceil(h / cSize);

    if (renderMode === 'matrix') {
      this.updateMatrixRain(cols, rows);
    }

    let imgData;
    try {
      imgData = offCtx.getImageData(0, 0, w, h);
    } catch {
      return;
    }
    const data = imgData.data;

    ctx.save();
    ctx.globalCompositeOperation = styleBlend || 'source-over';

    const covRatio = (coverage ?? 100) / 100;

    for (let gy = 0; gy < rows; gy++) {
      for (let gx = 0; gx < cols; gx++) {
        // Coverage check
        if (covRatio < 1.0) {
          const rand = Math.sin(gx * 374761393 + gy * 668265263) * 0.5 + 0.5;
          if (rand > covRatio) continue;
        }

        const startX = gx * cSize;
        const startY = gy * cSize;
        const cx = startX + cSize * 0.5;
        const cy = startY + cSize * 0.5;

        // Sample center & average color of cell
        const px = Math.min(w - 1, Math.floor(cx));
        const py = Math.min(h - 1, Math.floor(cy));
        const pIdx = (py * w + px) * 4;

        let r = data[pIdx];
        let g = data[pIdx + 1];
        let b = data[pIdx + 2];

        // Edge emphasis: compare against neighbor
        if (edgeEmphasis > 0 && gx < cols - 1 && gy < rows - 1) {
          const nextIdx = (py * w + Math.min(w - 1, px + cSize)) * 4;
          const diff = Math.abs(r - data[nextIdx]) + Math.abs(g - data[nextIdx + 1]) + Math.abs(b - data[nextIdx + 2]);
          const edgeBoost = (diff / 765) * (edgeEmphasis / 50);
          r = Math.min(255, r + edgeBoost * 100);
          g = Math.min(255, g + edgeBoost * 100);
          b = Math.min(255, b + edgeBoost * 100);
        }

        // Color adjustments
        const adj = this.adjustColor(r, g, b);
        let lum = adj.lum;

        if (invert) {
          lum = 255 - lum;
          adj.r = 255 - adj.r;
          adj.g = 255 - adj.g;
          adj.b = 255 - adj.b;
        }

        // Animation modulation
        const animMod = this.getAnimationModulation(gx, gy, cx, cy, w, h);
        lum = Math.max(0, Math.min(255, lum * animMod));
        const normLum = lum / 255;

        // Skip completely dark cells in dither / characters unless inverted
        if (normLum < 0.04 && !invert && renderMode !== 'mosaic') {
          continue;
        }

        this.drawCellShape(ctx, renderMode, cx, cy, cSize, lum, normLum, adj.r, adj.g, adj.b, gx, gy);
      }
    }
    ctx.restore();

    // Step 4: Tint overlay
    if (tintOpacity > 0 && tint) {
      ctx.save();
      ctx.globalCompositeOperation = overlayBlend || 'multiply';
      ctx.globalAlpha = tintOpacity / 100;
      ctx.fillStyle = tint;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();
    }

    // Step 5: Post-effects
    this.applyPostEffects(w, h);

    // Step 6: Lights
    this.applyLights(w, h);
  }
}
