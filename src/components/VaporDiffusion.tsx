'use client';
import React, { useState, useEffect } from 'react';

const VaporDiffusion = () => {
  const [isDiffusing, setIsDiffusing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only set mounted after first render
    const timeout = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timeout);
  }, []);

  const crystalScale = isDiffusing ? 1 : 0;

  return (
    <div className="w-full flex justify-center py-4 sm:py-6 bg-white overflow-hidden border border-slate-200 rounded-xl mt-6 relative shadow-sm">
      <div className="text-center w-full max-w-2xl px-3 sm:px-4 relative z-10">
        <h3 className="font-bold text-gray-800 mb-2 text-base sm:text-lg">Schematic of Vapor Diffusion Crystallization</h3>
        <p className="text-xs text-gray-500 mb-4 sm:mb-6">Klik &quot;Mulai Difusi Uap&quot; untuk melihat simulasi pergerakan uap (vapor) masuk ke dalam larutan sampel hingga terbentuk kristal.</p>
        
        <div className="relative inline-block w-full max-w-md mx-auto">
          <svg viewBox="-50 0 600 400" className="w-full h-auto drop-shadow-sm bg-transparent rounded-lg" style={{ overflow: 'visible' }}>
            <defs>
              <linearGradient id="antiSolvent2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#bee3f8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#90cdf4" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="sampleSol2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fc8181" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#e53e3e" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="lidGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#e2e8f0" />
                <stop offset="50%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#94a3b8" />
              </linearGradient>
              
              <marker id="arrowHeadRef2" markerWidth="8" markerHeight="8" refX="5" refY="4" orient="auto">
                <polygon points="0 0, 8 4, 0 8" fill="#475569" />
              </marker>
              <marker id="arrowHeadBlack" markerWidth="8" markerHeight="8" refX="5" refY="4" orient="auto">
                <polygon points="0 0, 8 4, 0 8" fill="#0f172a" />
              </marker>

              <style>
                {`
                  @keyframes vaporMoveLine {
                    0% { stroke-dashoffset: 200; opacity: 0.1; }
                    50% { opacity: 1; }
                    100% { stroke-dashoffset: 0; opacity: 0.1; }
                  }
                  @keyframes floatGas {
                    0% { transform: translateY(0px) translateX(0px); opacity: 0; }
                    20% { opacity: 0.8; }
                    80% { opacity: 0.8; }
                    100% { transform: translateY(-70px) translateX(10px); opacity: 0; }
                  }
                  .vapor-path-animated {
                    stroke-dasharray: 6 12;
                    animation: ${isDiffusing ? 'vaporMoveLine 2s linear infinite' : 'none'};
                    opacity: ${isDiffusing ? '1' : '0'};
                  }
                  @media (max-width: 639px) {
                    .svg-annotations { display: none; }
                  }
                `}
              </style>
            </defs>

            {/* Back inner wall */}
            <path d="M 120,360 Q 120,380 150,380 L 350,380 Q 380,380 380,360 L 380,120 Q 380,80 340,70 L 160,70 Q 120,80 120,120 Z" fill="#f8fafc" />

            {/* Anti-solvent Outer Pool */}
            <path d="M 120,300 L 380,300 L 380,360 Q 380,380 350,380 L 150,380 Q 120,380 120,360 Z" fill="url(#antiSolvent2)" />
            <ellipse cx="250" cy="300" rx="130" ry="6" fill="#e0f2fe" opacity="0.8"/>

            {/* Vapor Streams - Left side (Curved into jar) */}
            <path d="M 160,280 C 140,160 210,120 235,230" fill="none" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowHeadRef2)" className="vapor-path-animated" />
            <path d="M 190,280 C 180,150 230,130 245,230" fill="none" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrowHeadRef2)" className="vapor-path-animated" style={{ animationDelay: '0.8s' }} />
            
            {/* Vapor Streams - Right side (Curved into jar) */}
            <path d="M 340,280 C 360,160 290,120 265,230" fill="none" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowHeadRef2)" className="vapor-path-animated" style={{ animationDelay: '0.4s' }} />
            <path d="M 310,280 C 320,150 270,130 255,230" fill="none" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrowHeadRef2)" className="vapor-path-animated" style={{ animationDelay: '1.2s' }} />

            {/* Smaller inner vial bg */}
            <path d="M 215,240 L 215,370 Q 215,380 225,380 L 275,380 Q 285,380 285,370 L 285,240 Z" fill="#f1f5f9" opacity="0.8" />
            
            {/* Sample Solution Inner Pool */}
            <path d="M 215,290 L 285,290 L 285,370 Q 285,380 275,380 L 225,380 Q 215,380 215,370 Z" fill="url(#sampleSol2)" />
            <ellipse cx="250" cy="290" rx="35" ry="3" fill="#fed7d7" opacity="0.8"/>

             {/* Inner Vial threads/neck */}
            <ellipse cx="250" cy="240" rx="35" ry="3" fill="none" stroke="#cbd5e1" strokeWidth="2"/>
            <path d="M 220,246 L 280,246" stroke="#cbd5e1" strokeWidth="1.5" />
            <path d="M 218,250 L 282,250" stroke="#cbd5e1" strokeWidth="1.5" />
            <path d="M 218,254 L 282,254" stroke="#cbd5e1" strokeWidth="1.5" />

            {/* Crystals appearing staggered from within the solution */}
              <g>
                {[
                  { points: "225,375 230,370 235,375 230,380", fill: "#9b2c2c" },
                  { points: "238,372 242,368 248,370 240,376", fill: "#c53030" },
                  { points: "252,376 257,371 262,374 256,380", fill: "#9b2c2c" },
                  { points: "268,370 274,365 280,370 274,376", fill: "#c53030" },
                  { points: "230,365 235,360 240,365 236,368", fill: "#9b2c2c" },
                  { points: "248,360 252,355 258,360 254,365", fill: "#c53030" },
                  { points: "260,366 265,362 270,368 266,372", fill: "#9b2c2c" },
                  { points: "220,365 225,362 230,365 225,368", fill: "#c53030" },
                  { points: "221,350 225,347 230,352 225,355", fill: "#9b2c2c" },
                  { points: "222,335 226,332 231,336 225,340", fill: "#c53030" },
                  { points: "278,350 281,346 276,342 272,348", fill: "#c53030" },
                  { points: "279,330 282,326 277,322 273,328", fill: "#9b2c2c" }
                ].map((c, i) => {
                  // Calculate rough center for transform-origin
                  const pts = c.points.split(' ').map(p => p.split(',').map(Number));
                  const cx = (Math.min(...pts.map(p => p[0])) + Math.max(...pts.map(p => p[0]))) / 2;
                  const cy = (Math.min(...pts.map(p => p[1])) + Math.max(...pts.map(p => p[1]))) / 2;
                  return (
                    <polygon 
                      key={i} 
                      points={c.points} 
                      fill={c.fill} 
                      stroke="#742a2a" 
                      strokeWidth="1"
                      style={{
                        transform: `scale(${crystalScale})`,
                        opacity: crystalScale > 0 ? 1 : 0,
                        transition: `transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.3}s, opacity 0.8s ease-in ${i * 0.3}s`,
                        transformOrigin: `${cx}px ${cy}px`
                      }} 
                    />
                  );
                })}
              </g>

            {/* Inner vial outline */}
            <path d="M 215,240 L 215,370 Q 215,380 225,380 L 275,380 Q 285,380 285,370 L 285,240" fill="none" stroke="#cbd5e1" strokeWidth="2.5" />

            {/* Outer Jar Outline */}
            <path d="M 120,360 Q 120,380 150,380 L 350,380 Q 380,380 380,360 L 380,120 Q 380,80 340,70 L 160,70 Q 120,80 120,120 Z" fill="none" stroke="#64748b" strokeWidth="4" />

            {/* Jar Neck/Thread */}
            <rect x="150" y="55" width="200" height="15" fill="#f8fafc" stroke="#64748b" strokeWidth="3"/>
            <line x1="150" y1="62" x2="350" y2="62" stroke="#94a3b8" strokeWidth="2"/>
            
            {/* Jar Lid */}
            <rect x="140" y="35" width="220" height="20" rx="4" fill="url(#lidGrad2)" stroke="#475569" strokeWidth="3" />
            <rect x="145" y="30" width="210" height="5" rx="2" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />

            {/* Static Annotations / Labels */}
            <g className="svg-annotations text-[13px] font-bold fill-slate-800" textAnchor="start">
              {/* Left Label */}
              <text x="20" y="185">Vapor</text>
              <path d="M 70,180 L 120,180" stroke="#0f172a" strokeWidth="2" markerEnd="url(#arrowHeadBlack)" />
              
              {/* Right Label 1 */}
              <text x="410" y="195">Sample Solution</text>
              <text x="410" y="210" fontSize="11" fill="#475569" fontWeight="500">(in Good Solvent,</text>
              <text x="420" y="225" fontSize="11" fill="#475569" fontWeight="500" fontStyle="italic">e.g., Water)</text>
              <path d="M 405,200 L 280,310" stroke="#0f172a" strokeWidth="2" markerEnd="url(#arrowHeadBlack)" />
              
              {/* Right Label 2 */}
              <text x="410" y="290">Crystals Forming</text>
              <path d="M 405,285 L 275,340" stroke="#0f172a" strokeWidth="2" markerEnd="url(#arrowHeadBlack)" />
              <path d="M 405,285 L 275,365" stroke="#0f172a" strokeWidth="2" markerEnd="url(#arrowHeadBlack)" />

              {/* Right Label 3 */}
              <text x="410" y="340">Volatile Anti-solvent</text>
              <text x="410" y="355" fontSize="11" fill="#475569" fontWeight="500" fontStyle="italic">(e.g., Ethanol)</text>
              <path d="M 405,335 L 340,335" stroke="#0f172a" strokeWidth="2" markerEnd="url(#arrowHeadBlack)" />
            </g>

            {/* Random vapor dots (Only load if mounted to prevent hydration errors) */}
            {mounted && isDiffusing && [
              [140, 270], [170, 280], [150, 240], [180, 200], [130, 220],
              [360, 270], [330, 280], [350, 240], [320, 200], [370, 220],
              [160, 180], [340, 180], [250, 140], [220, 160], [280, 150]
            ].map(([x, y], i) => (
              <circle 
                key={i}
                cx={x} cy={y}
                r={2 + (i % 2)}
                fill="#64748b"
                style={{
                  animation: `floatGas ${2 + (i % 3)}s linear infinite`,
                  animationDelay: `${(i % 10) * 0.2}s`
                }}
              />
            ))}
          </svg>
        </div>

        {/* Mobile legend - shown below SVG on small screens */}
        <div className="sm:hidden mt-3 grid grid-cols-2 gap-2 text-left text-xs">
          <div className="flex items-start gap-2 p-2 bg-blue-50 rounded-lg">
            <span className="w-3 h-3 mt-0.5 rounded-full bg-blue-300 flex-shrink-0" />
            <div>
              <p className="font-semibold text-gray-700">Anti-solvent</p>
              <p className="text-gray-500">Volatile (e.g., Ethanol)</p>
            </div>
          </div>
          <div className="flex items-start gap-2 p-2 bg-red-50 rounded-lg">
            <span className="w-3 h-3 mt-0.5 rounded-full bg-red-400 flex-shrink-0" />
            <div>
              <p className="font-semibold text-gray-700">Sample Solution</p>
              <p className="text-gray-500">In good solvent (e.g., Water)</p>
            </div>
          </div>
          <div className="flex items-start gap-2 p-2 bg-gray-50 rounded-lg">
            <span className="w-3 h-3 mt-0.5 rounded-full bg-gray-400 flex-shrink-0" />
            <div>
              <p className="font-semibold text-gray-700">Vapor</p>
              <p className="text-gray-500">Diffuses into inner vial</p>
            </div>
          </div>
          <div className="flex items-start gap-2 p-2 bg-red-50 rounded-lg">
            <span className="w-3 h-3 mt-0.5 rounded-sm bg-red-800 flex-shrink-0" />
            <div>
              <p className="font-semibold text-gray-700">Crystals</p>
              <p className="text-gray-500">Forming inside sample</p>
            </div>
          </div>
        </div>

        <div className="mt-2 mb-6">
          <button
            onClick={() => setIsDiffusing(!isDiffusing)}
            className={`px-6 py-2.5 rounded-full font-bold shadow-md transition flex items-center justify-center mx-auto space-x-2 ${
              isDiffusing 
                ? 'bg-rose-100 text-rose-700 hover:bg-rose-200 border border-rose-300' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            <span>{isDiffusing ? 'Hentikan Difusi' : 'Mulai Difusi Uap'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VaporDiffusion;
