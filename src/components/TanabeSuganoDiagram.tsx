'use client';
import React, { useState, useCallback, useRef, useEffect } from 'react';

/* ======================================================================
   Tanabe-Sugano Diagram for d³ (e.g. Cr³⁺) — SVG-based, interactive
   ====================================================================== */

// ---------- data: each line is a set of (Δ/B, E/B) points ----------
// Approximated from the classic d³ Tanabe-Sugano diagram

interface TSLine {
  label: string;
  superscript: string; // spin multiplicity
  subscript: string;   // symmetry label
  freeIonTerm: string; // label at Δ/B = 0 side
  points: [number, number][]; // [Δ/B, E/B]
  color: string;
  dashed?: boolean;
}

const lines: TSLine[] = [
  // --- Ground state: ⁴A₂ (from ⁴F) along x-axis ---
  {
    label: '⁴A₂',
    superscript: '4',
    subscript: 'A₂',
    freeIonTerm: '⁴F',
    points: [[0, 0], [0.5, 0], [1, 0], [1.5, 0], [2, 0], [2.5, 0], [3, 0], [3.5, 0], [4, 0]],
    color: '#1a1a1a',
  },
  // --- ⁴T₂ (from ⁴F) ---
  {
    label: '⁴T₂',
    superscript: '4',
    subscript: 'T₂',
    freeIonTerm: '⁴F',
    points: [[0, 0], [0.5, 5.5], [1, 11], [1.5, 16.5], [2, 22], [2.5, 27.5], [3, 33], [3.5, 38.5], [4, 42]],
    color: '#1a1a1a',
  },
  // --- ⁴T₁(F) (from ⁴F) ---
  {
    label: '⁴T₁',
    superscript: '4',
    subscript: 'T₁',
    freeIonTerm: '⁴F',
    points: [[0, 0], [0.5, 9], [1, 17.5], [1.5, 25], [2, 32], [2.5, 39], [3, 46], [3.5, 52], [4, 57]],
    color: '#1a1a1a',
  },
  // --- ⁴T₁(P) (from ⁴P) — starts higher ---
  {
    label: '⁴T₁',
    superscript: '4',
    subscript: 'T₁',
    freeIonTerm: '⁴P',
    points: [[0, 15], [0.5, 19], [1, 24], [1.5, 30], [2, 37], [2.5, 44.5], [3, 53], [3.5, 63], [4, 72]],
    color: '#1a1a1a',
  },
  // --- ²E (from ²G) ---
  {
    label: '²E',
    superscript: '2',
    subscript: 'E',
    freeIonTerm: '²G',
    points: [[0, 17], [0.5, 18.5], [1, 20], [1.5, 21], [2, 21.5], [2.5, 22], [3, 22.5], [3.5, 23], [4, 23.5]],
    color: '#555555',
    dashed: true,
  },
  // --- ²T₁ (from ²G) ---
  {
    label: '²T₁',
    superscript: '2',
    subscript: 'T₁',
    freeIonTerm: '²G',
    points: [[0, 17], [0.5, 18], [1, 20], [1.5, 21.5], [2, 22.5], [2.5, 23.5], [3, 24], [3.5, 24.5], [4, 25]],
    color: '#555555',
    dashed: true,
  },
  // --- ²T₂ (from ²G → ²H area) ---
  {
    label: '²T₂',
    superscript: '2',
    subscript: 'T₂',
    freeIonTerm: '²G',
    points: [[0, 17], [0.5, 19.5], [1, 23], [1.5, 26], [2, 28.5], [2.5, 30.5], [3, 32], [3.5, 33.5], [4, 35]],
    color: '#555555',
    dashed: true,
  },
  // --- ²A₁ (from ²G) ---
  {
    label: '²A₁',
    superscript: '2',
    subscript: 'A₁',
    freeIonTerm: '²G',
    points: [[0, 17], [0.5, 22], [1, 28], [1.5, 34], [2, 40], [2.5, 46], [3, 51], [3.5, 56], [4, 58]],
    color: '#555555',
    dashed: true,
  },
  // --- ²A₂ (from ²F) ---
  {
    label: '²A₂',
    superscript: '2',
    subscript: 'A₂',
    freeIonTerm: '²F',
    points: [[0, 34], [0.5, 38], [1, 43], [1.5, 49], [2, 55], [2.5, 61], [3, 67], [3.5, 72], [4, 77]],
    color: '#555555',
    dashed: true,
  },
];

// Free-ion terms displayed on the left y-axis
const freeIonTerms: { label: string; E: number }[] = [
  { label: '⁴F', E: 0 },
  { label: '⁴P', E: 15 },
  { label: '²G', E: 17 },
  { label: '²H', E: 22.5 },
  { label: '²P', E: 24 },
  { label: '²D', E: 26 },
  { label: '²F', E: 34 },
  { label: '²D', E: 63 },
];

// -------- chart geometry constants --------
const MARGIN = { top: 40, right: 80, bottom: 55, left: 70 };
const WIDTH = 600;
const HEIGHT = 520;
const PLOT_W = WIDTH - MARGIN.left - MARGIN.right;
const PLOT_H = HEIGHT - MARGIN.top - MARGIN.bottom;

const X_MIN = 0;
const X_MAX = 4;
const Y_MIN = 0;
const Y_MAX = 80;

function xScale(v: number) {
  return MARGIN.left + ((v - X_MIN) / (X_MAX - X_MIN)) * PLOT_W;
}
function yScale(v: number) {
  return MARGIN.top + PLOT_H - ((v - Y_MIN) / (Y_MAX - Y_MIN)) * PLOT_H;
}
function xInverse(px: number) {
  return X_MIN + ((px - MARGIN.left) / PLOT_W) * (X_MAX - X_MIN);
}

// Interpolate E/B at a given Δ/B along a polyline
function interpolateE(pts: [number, number][], deltaB: number): number | null {
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[i + 1];
    if (deltaB >= x0 && deltaB <= x1) {
      const t = (deltaB - x0) / (x1 - x0);
      return y0 + t * (y1 - y0);
    }
  }
  return null;
}

// Build SVG path from points
function buildPath(pts: [number, number][]): string {
  return pts
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${xScale(x).toFixed(1)} ${yScale(y).toFixed(1)}`)
    .join(' ');
}

export default function TanabeSuganoDiagram() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [deltaB, setDeltaB] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<SVGSVGElement>) => {
      if (!isDragging && e.buttons === 0) return;
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const svgX = ((e.clientX - rect.left) / rect.width) * WIDTH;
      const val = xInverse(svgX);
      if (val >= X_MIN && val <= X_MAX) {
        setDeltaB(Math.round(val * 100) / 100);
      }
    },
    [isDragging],
  );

  const handlePointerDown = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    setIsDragging(true);
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * WIDTH;
    const val = xInverse(svgX);
    if (val >= X_MIN && val <= X_MAX) {
      setDeltaB(Math.round(val * 100) / 100);
    }
    (e.target as Element).setPointerCapture?.(e.pointerId);
  }, []);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch support for mobile
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
    };
    svg.addEventListener('touchmove', onTouchMove, { passive: false });
    return () => svg.removeEventListener('touchmove', onTouchMove);
  }, []);

  // Compute intersections at current Δ/B
  const intersections = deltaB !== null
    ? lines
        .map((line) => {
          const eVal = interpolateE(line.points, deltaB);
          return eVal !== null ? { ...line, eVal } : null;
        })
        .filter(Boolean) as (TSLine & { eVal: number })[]
    : [];

  // X-axis ticks
  const xTicks = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4];
  // Y-axis ticks
  const yTicks = [0, 10, 20, 30, 40, 50, 60, 70, 80];

  return (
    <div className="p-4 sm:p-5 bg-white border border-gray-200 rounded-xl shadow-sm">
      <p className="text-sm font-bold text-gray-800 mb-1">
        Diagram Tanabe-Sugano — d³ (Cr³⁺)
      </p>
      <p className="text-xs text-gray-500 mb-3">
        Klik atau geser pada diagram untuk memilih nilai Δ/B dan melihat energi setiap keadaan.
      </p>

      <div className="relative overflow-x-auto">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="w-full min-w-[360px] mx-auto select-none cursor-crosshair"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          {/* Background */}
          <rect width={WIDTH} height={HEIGHT} fill="#fafbfc" rx="10" />

          {/* Plot area background */}
          <rect
            x={MARGIN.left}
            y={MARGIN.top}
            width={PLOT_W}
            height={PLOT_H}
            fill="#ffffff"
            stroke="#e2e8f0"
          />

          {/* Grid lines */}
          {xTicks.map((t) => (
            <line
              key={`gx-${t}`}
              x1={xScale(t)}
              y1={MARGIN.top}
              x2={xScale(t)}
              y2={MARGIN.top + PLOT_H}
              stroke="#f1f5f9"
              strokeWidth={t === 0 ? 0 : 1}
            />
          ))}
          {yTicks.map((t) => (
            <line
              key={`gy-${t}`}
              x1={MARGIN.left}
              y1={yScale(t)}
              x2={MARGIN.left + PLOT_W}
              y2={yScale(t)}
              stroke="#f1f5f9"
              strokeWidth={t === 0 ? 0 : 1}
            />
          ))}

          {/* X-axis ticks & labels */}
          {xTicks.map((t) => (
            <g key={`xt-${t}`}>
              <line
                x1={xScale(t)}
                y1={MARGIN.top + PLOT_H}
                x2={xScale(t)}
                y2={MARGIN.top + PLOT_H + 5}
                stroke="#94a3b8"
              />
              <text
                x={xScale(t)}
                y={MARGIN.top + PLOT_H + 20}
                textAnchor="middle"
                fontSize="11"
                fill="#64748b"
              >
                {t}
              </text>
            </g>
          ))}

          {/* Y-axis ticks & labels */}
          {yTicks.map((t) => (
            <g key={`yt-${t}`}>
              <line
                x1={MARGIN.left - 5}
                y1={yScale(t)}
                x2={MARGIN.left}
                y2={yScale(t)}
                stroke="#94a3b8"
              />
              <text
                x={MARGIN.left - 10}
                y={yScale(t) + 4}
                textAnchor="end"
                fontSize="11"
                fill="#64748b"
              >
                {t}
              </text>
            </g>
          ))}

          {/* Axis labels */}
          <text
            x={MARGIN.left + PLOT_W / 2}
            y={HEIGHT - 8}
            textAnchor="middle"
            fontSize="14"
            fontWeight="bold"
            fill="#334155"
          >
            Δ/B
          </text>
          <text
            x={16}
            y={MARGIN.top + PLOT_H / 2}
            textAnchor="middle"
            fontSize="14"
            fontWeight="bold"
            fill="#334155"
            transform={`rotate(-90, 16, ${MARGIN.top + PLOT_H / 2})`}
          >
            E/B
          </text>

          {/* Free-ion term labels on the left */}
          {freeIonTerms.map((term, i) => (
            <text
              key={`ft-${i}`}
              x={MARGIN.left - 15}
              y={yScale(term.E) + 4}
              textAnchor="end"
              fontSize="11"
              fontWeight="600"
              fill="#0f766e"
            >
              {term.label}
            </text>
          ))}

          {/* === Term lines === */}
          {lines.map((line, i) => (
            <path
              key={i}
              d={buildPath(line.points)}
              fill="none"
              stroke={line.color}
              strokeWidth={line.dashed ? 1.5 : 2.2}
              strokeDasharray={line.dashed ? '6,3' : undefined}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}

          {/* End labels for each line (right side) */}
          {lines.map((line, i) => {
            const lastPt = line.points[line.points.length - 1];
            const lx = xScale(lastPt[0]) + 6;
            const ly = yScale(lastPt[1]) + 4;
            return (
              <text
                key={`lbl-${i}`}
                x={lx}
                y={ly}
                fontSize="11"
                fontWeight="600"
                fill={line.dashed ? '#6b7280' : '#1a1a1a'}
              >
                {line.label}
              </text>
            );
          })}

          {/* === Interactive crosshair === */}
          {deltaB !== null && (
            <>
              {/* Vertical line */}
              <line
                x1={xScale(deltaB)}
                y1={MARGIN.top}
                x2={xScale(deltaB)}
                y2={MARGIN.top + PLOT_H}
                stroke="#0d9488"
                strokeWidth={1.5}
                strokeDasharray="4,3"
                opacity={0.8}
              />

              {/* Δ/B value label */}
              <rect
                x={xScale(deltaB) - 28}
                y={MARGIN.top - 18}
                width={56}
                height={18}
                rx={4}
                fill="#0d9488"
              />
              <text
                x={xScale(deltaB)}
                y={MARGIN.top - 6}
                textAnchor="middle"
                fontSize="10"
                fontWeight="bold"
                fill="white"
              >
                Δ/B = {deltaB.toFixed(2)}
              </text>

              {/* Intersection dots */}
              {intersections.map((item, i) => (
                <g key={`dot-${i}`}>
                  <circle
                    cx={xScale(deltaB)}
                    cy={yScale(item.eVal)}
                    r={4}
                    fill={item.dashed ? '#6b7280' : '#0d9488'}
                    stroke="white"
                    strokeWidth={1.5}
                  />
                  {/* Label next to dot */}
                  <rect
                    x={xScale(deltaB) + 8}
                    y={yScale(item.eVal) - 8}
                    width={72}
                    height={16}
                    rx={3}
                    fill="white"
                    stroke={item.dashed ? '#d1d5db' : '#0d9488'}
                    strokeWidth={0.8}
                    opacity={0.92}
                  />
                  <text
                    x={xScale(deltaB) + 12}
                    y={yScale(item.eVal) + 3}
                    fontSize="9"
                    fontWeight="600"
                    fill={item.dashed ? '#6b7280' : '#0f766e'}
                  >
                    {item.label} = {item.eVal.toFixed(1)}
                  </text>
                </g>
              ))}
            </>
          )}
        </svg>
      </div>

      {/* Legend / info panel below the chart */}
      {deltaB !== null && (
        <div className="mt-4 p-3 bg-teal-50 border border-teal-200 rounded-lg">
          <p className="text-xs font-semibold text-teal-800 mb-2">
            Nilai energi pada Δ/B = {deltaB.toFixed(2)}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {intersections
              .filter((it) => !it.dashed)
              .sort((a, b) => a.eVal - b.eVal)
              .map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 bg-white px-2 py-1.5 rounded border border-teal-100"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-gray-800 flex-shrink-0" />
                  <span className="text-xs font-semibold text-gray-700">{item.label}</span>
                  <span className="text-xs text-teal-700 ml-auto">{item.eVal.toFixed(1)}</span>
                </div>
              ))}
          </div>
          <p className="text-[10px] text-teal-600 mt-2">
            Garis putus-putus = keadaan doublet (²), garis solid = keadaan kuartet (⁴).
            Transisi spin-allowed: ⁴A₂ → ⁴T₂, ⁴A₂ → ⁴T₁(F), ⁴A₂ → ⁴T₁(P).
          </p>
        </div>
      )}

      {/* Brief legend */}
      <div className="mt-3 flex flex-wrap gap-3 text-[10px] text-gray-500">
        <div className="flex items-center gap-1">
          <svg width="20" height="4"><line x1="0" y1="2" x2="20" y2="2" stroke="#1a1a1a" strokeWidth="2" /></svg>
          <span>Kuartet (spin-allowed)</span>
        </div>
        <div className="flex items-center gap-1">
          <svg width="20" height="4"><line x1="0" y1="2" x2="20" y2="2" stroke="#555" strokeWidth="1.5" strokeDasharray="4,2" /></svg>
          <span>Doublet (spin-forbidden)</span>
        </div>
      </div>
    </div>
  );
}
