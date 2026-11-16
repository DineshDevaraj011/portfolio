import { useEffect, useRef, useState } from 'react';
import { AsciiRenderer, DEFAULT_PARAMS } from '../utils/asciiRenderEngine';
import './ElectricGazeBackground.css';

export default function ElectricGazeBackground({
  sourceUrl = '/ascii-editor/demos/generated/ref-002.webp',
  customConfig = {},
  interactive = true,
  className = ''
}) {
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const animFrameRef = useRef(null);
  const [params, setParams] = useState({ ...DEFAULT_PARAMS, ...customConfig });
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new AsciiRenderer(canvas, params);
    rendererRef.current = renderer;

    // Load source photo
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      renderer.setSourceImage(img);
    };
    img.onerror = () => {
      // Fallback is automatically rendered by AsciiRenderer
      console.info('Electric Gaze using internal procedural raster generator.');
    };
    img.src = sourceUrl;

    const resize = () => {
      const parent = canvas.parentElement || window;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width || window.innerWidth;
      const h = rect.height || window.innerHeight;
      canvas.width = Math.floor(w);
      canvas.height = Math.floor(h);
    };

    resize();
    window.addEventListener('resize', resize);

    // Animation loop
    const loop = (t) => {
      renderer.render(t);
      animFrameRef.current = requestAnimationFrame(loop);
    };
    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', resize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [sourceUrl]);

  // Update renderer params whenever state changes
  useEffect(() => {
    if (rendererRef.current) {
      rendererRef.current.setParams(params);
    }
  }, [params]);

  const modes = [
    'dither',
    'characters',
    'matrix',
    'dots',
    'hexdump',
    'cross',
    'disco',
    'diamond',
    'rings',
    'voxel',
    'lego',
    'braille',
    'mosaic'
  ];

  return (
    <div className={`electric-gaze-wrapper ${className}`}>
      <canvas ref={canvasRef} className="electric-gaze-canvas" />

      {interactive && (
        <div className="electric-hud">
          <button
            type="button"
            className="hud-toggle"
            onClick={() => setShowControls(!showControls)}
            title="Toggle Electric Gaze HUD"
          >
            <span className="hud-pulse" />
            <span className="hud-label">⚡ Electric Gaze: {params.renderMode}</span>
          </button>

          {showControls && (
            <div className="hud-panel">
              <div className="hud-row">
                <span className="hud-title">Render Mode</span>
                <div className="hud-chips">
                  {modes.map((m) => (
                    <button
                      key={m}
                      type="button"
                      className={`hud-chip ${params.renderMode === m ? 'active' : ''}`}
                      onClick={() => setParams((p) => ({ ...p, renderMode: m }))}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div className="hud-row">
                <span className="hud-title">Animation Style</span>
                <div className="hud-chips">
                  {['shimmer', 'wave', 'pulse', 'ripple', 'flicker'].map((style) => (
                    <button
                      key={style}
                      type="button"
                      className={`hud-chip ${params.animStyle === style ? 'active' : ''}`}
                      onClick={() => setParams((p) => ({ ...p, animStyle: style }))}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              <div className="hud-row hud-sliders">
                <label>
                  Cell Size: {params.cellSize}px
                  <input
                    type="range"
                    min="4"
                    max="18"
                    value={params.cellSize}
                    onChange={(e) => setParams((p) => ({ ...p, cellSize: Number(e.target.value) }))}
                  />
                </label>

                <label>
                  Contrast: {params.contrast}
                  <input
                    type="range"
                    min="50"
                    max="220"
                    value={params.contrast}
                    onChange={(e) => setParams((p) => ({ ...p, contrast: Number(e.target.value) }))}
                  />
                </label>
              </div>

              <div className="hud-row hud-toggles">
                <label className="hud-check">
                  <input
                    type="checkbox"
                    checked={params.pfx.scanLines.enabled}
                    onChange={(e) =>
                      setParams((p) => ({
                        ...p,
                        pfx: { ...p.pfx, scanLines: { ...p.pfx.scanLines, enabled: e.target.checked } }
                      }))
                    }
                  />
                  Scanlines
                </label>

                <label className="hud-check">
                  <input
                    type="checkbox"
                    checked={params.pfx.vignette.enabled}
                    onChange={(e) =>
                      setParams((p) => ({
                        ...p,
                        pfx: { ...p.pfx, vignette: { ...p.pfx.vignette, enabled: e.target.checked } }
                      }))
                    }
                  />
                  Vignette
                </label>

                <label className="hud-check">
                  <input
                    type="checkbox"
                    checked={params.pfx.bloom.enabled}
                    onChange={(e) =>
                      setParams((p) => ({
                        ...p,
                        pfx: { ...p.pfx, bloom: { ...p.pfx.bloom, enabled: e.target.checked } }
                      }))
                    }
                  />
                  Bloom
                </label>

                <label className="hud-check">
                  <input
                    type="checkbox"
                    checked={params.pfx.glitch.enabled}
                    onChange={(e) =>
                      setParams((p) => ({
                        ...p,
                        pfx: { ...p.pfx, glitch: { ...p.pfx.glitch, enabled: e.target.checked } }
                      }))
                    }
                  />
                  Glitch
                </label>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

