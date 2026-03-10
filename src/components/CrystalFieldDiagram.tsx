'use client';
import React, { useState, useEffect } from 'react';
import KaTeX from './KaTeX';

interface CrystalFieldDiagramProps {
  delta?: number | null;
  highlightLigand?: string;
}

export default function CrystalFieldDiagram({ delta, highlightLigand }: CrystalFieldDiagramProps) {
  const [isExcited, setIsExcited] = useState(false);
  const [photonType, setPhotonType] = useState<'none' | 'absorb' | 'emit'>('none');

  // Auto-reset the photon animation after it finishes playing
  useEffect(() => {
    if (photonType !== 'none') {
      const timer = setTimeout(() => {
        setPhotonType('none');
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [photonType]);

  const handleExcite = () => {
    if (isExcited) return;
    setPhotonType('absorb');
    setTimeout(() => {
      setIsExcited(true);
    }, 400); // electron jumps as photon hits
  };

  const handleDeexcite = () => {
    if (!isExcited) return;
    setIsExcited(false);
    setTimeout(() => {
      setPhotonType('emit');
    }, 500); // photon emitted as electron lands
  };

  return (
    <div className="p-4 sm:p-5 bg-white border border-gray-200 rounded-xl shadow-sm">
      <div className="flex flex-col gap-3 mb-4">
        <p className="text-sm font-bold text-gray-800">Pemisahan Medan Kristal Oktahedral — Cr³⁺ (d³)</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleExcite}
            disabled={isExcited || photonType !== 'none'}
            className={`px-3 py-2 text-xs font-semibold rounded-md transition-all ${
              isExcited || photonType !== 'none'
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-amber-100 text-amber-700 hover:bg-amber-200 active:scale-95'
            }`}
          >
            ⚡ Eksitasi (Serap Energi)
          </button>
          <button
            onClick={handleDeexcite}
            disabled={!isExcited || photonType !== 'none'}
            className={`px-3 py-2 text-xs font-semibold rounded-md transition-all ${
              !isExcited || photonType !== 'none'
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 active:scale-95'
            }`}
          >
            🔻 Relaksasi (Emisi Foton)
          </button>
        </div>
      </div>

      <div className="relative overflow-x-auto">
        <svg viewBox="0 0 520 340" className="w-full min-w-[320px] mx-auto overflow-visible" xmlns="http://www.w3.org/2000/svg">
          {/* Background */}
          <rect width="520" height="340" fill="#f8fafc" rx="12" />

          {/* ===== LEFT SIDE: Free Ion ===== */}
          <text x="80" y="30" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#475569">Ion Bebas</text>
          
          {/* 5 degenerate orbital dashes */}
          {[36, 52, 68, 84, 100].map((x, i) => (
            <g key={`deg-${i}`}>
              <line x1={x - 6} y1="180" x2={x + 6} y2="180" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
              {i < 3 && (
                <>
                  <line x1={x} y1="176" x2={x} y2="156" stroke="#1e40af" strokeWidth="2" strokeLinecap="round" />
                  <polygon points={`${x},153 ${x - 4},160 ${x + 4},160`} fill="#1e40af" />
                </>
              )}
            </g>
          ))}
          <text x="80" y="205" textAnchor="middle" fontSize="11" fill="#64748b">5 orbital d</text>
          <text x="80" y="220" textAnchor="middle" fontSize="11" fill="#64748b">terdegenerasi</text>

          {/* ===== SPLITTING CONNECTORS ===== */}
          <path d="M 135 180 L 170 180 L 215 90" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4,4" />
          <path d="M 170 180 L 215 250" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4,4" />

          {/* ===== CENTER LABEL ===== */}
          <text x="310" y="30" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f766e">
            Medan Oktahedral
          </text>

          {/* ===== RIGHT SIDE: eg level ===== */}
          {/* dz² */}
          <line x1="262" y1="90" x2="298" y2="90" stroke="#ef4444" strokeWidth="3.5" strokeLinecap="round" />
          {/* dx²-y² */}
          <line x1="332" y1="90" x2="368" y2="90" stroke="#ef4444" strokeWidth="3.5" strokeLinecap="round" />
          
          <text x="280" y="75" textAnchor="middle" fontSize="11" fill="#64748b" fontWeight="500">dz²</text>
          <text x="350" y="75" textAnchor="middle" fontSize="11" fill="#64748b" fontWeight="500">dx²−y²</text>
          
          <text x="315" y="60" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#ef4444">
            e<tspan fontSize="11" dy="3">g</tspan>
          </text>
          
          <text x="440" y="95" textAnchor="start" fontSize="11" fill="#64748b" fontWeight="600">
            +0.6Δ<tspan fontSize="8" dy="3">0</tspan>
          </text>

          {/* --- Barycenter --- */}
          <line x1="220" y1="180" x2="430" y2="180" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="6,4" />
          <text x="445" y="184" textAnchor="start" fontSize="10" fill="#94a3b8">Barycenter</text>

          {/* ===== RIGHT SIDE: t2g level ===== */}
          {/* dxy, dxz, dyz */}
          <line x1="244" y1="250" x2="280" y2="250" stroke="#3b82f6" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="297" y1="250" x2="333" y2="250" stroke="#3b82f6" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="350" y1="250" x2="386" y2="250" stroke="#3b82f6" strokeWidth="3.5" strokeLinecap="round" />

          <text x="262" y="270" textAnchor="middle" fontSize="11" fill="#64748b" fontWeight="500">dxy</text>
          <text x="315" y="270" textAnchor="middle" fontSize="11" fill="#64748b" fontWeight="500">dxz</text>
          <text x="368" y="270" textAnchor="middle" fontSize="11" fill="#64748b" fontWeight="500">dyz</text>

          <text x="315" y="295" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#3b82f6">
            t<tspan fontSize="11" dy="4">2g</tspan>
          </text>
          
          <text x="440" y="255" textAnchor="start" fontSize="11" fill="#64748b" fontWeight="600">
            −0.4Δ<tspan fontSize="8" dy="3">0</tspan>
          </text>

          {/* ===== Δ₀ BRACKET ===== */}
          <line x1="490" y1="90" x2="490" y2="250" stroke="#0f766e" strokeWidth="2.5" />
          <line x1="484" y1="90" x2="496" y2="90" stroke="#0f766e" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="484" y1="250" x2="496" y2="250" stroke="#0f766e" strokeWidth="2.5" strokeLinecap="round" />
          <text x="502" y="175" textAnchor="start" fontSize="18" fontWeight="bold" fill="#0f766e">
            Δ<tspan fontSize="12" dy="5">0</tspan>
          </text>

          {/* ===== ELECTRONS IN ORBITALS ===== */}
          {/* Electron 2 (dxz) - Static */}
          <g>
            <line x1="315" y1="246" x2="315" y2="226" stroke="#1e40af" strokeWidth="2.5" strokeLinecap="round" />
            <polygon points="315,222 311,229 319,229" fill="#1e40af" />
          </g>

          {/* Electron 3 (dyz) - Static */}
          <g>
            <line x1="368" y1="246" x2="368" y2="226" stroke="#1e40af" strokeWidth="2.5" strokeLinecap="round" />
            <polygon points="368,222 364,229 372,229" fill="#1e40af" />
          </g>

          {/* Electron 1 (dxy -> dz²) - Animated! */}
          <g style={{
              transform: isExcited ? 'translate(18px, -160px)' : 'translate(0px, 0px)',
              transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}>
            <line x1="262" y1="246" x2="262" y2="226" stroke="#1e40af" strokeWidth="3" strokeLinecap="round" />
            <polygon points="262,221 257,229 267,229" fill="#1e40af" />
          </g>

          {/* ===== PHOTON ANIMATION ===== */}
          {/* Incoming photon (Excitation) - Absorbed! */}
          {photonType === 'absorb' && (
            <g style={{ animation: 'photonIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards' }}>
              <path d="M 180 236 Q 190 220 200 236 T 220 236" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
              <polygon points="225,236 218,231 218,241" fill="#f59e0b" />
              <text x="200" y="215" fontSize="13" fill="#d97706" fontWeight="bold">hν</text>
            </g>
          )}

          {/* Outgoing photon (De-Excitation) - Emitted! */}
          {photonType === 'emit' && (
            <g style={{ animation: 'photonOut 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards' }}>
              <path d="M 285 180 Q 295 165 305 180 T 325 180 T 345 180" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
              <polygon points="350,180 343,175 343,185" fill="#10b981" />
              <text x="315" y="160" fontSize="13" fill="#059669" fontWeight="bold">hν</text>
            </g>
          )}

          {/* ===== BOTTOM INFO ===== */}
          <text x="260" y="325" textAnchor="middle" fontSize="12" fill="#475569">
            Cr³⁺ (d³): 3 elektron tidak berpasangan → paramagnetik
          </text>
          
          {highlightLigand && (
            <text x="260" y="345" textAnchor="middle" fontSize="11" fill="#0f766e">
              Ligan: {highlightLigand}
            </text>
          )}
        </svg>

        {/* Global Keyframes within component scope */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes photonIn {
            0% { transform: translateX(-50px); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateX(10px); opacity: 0; }
          }
          @keyframes photonOut {
            0% { transform: translateX(-20px); opacity: 0; }
            30% { opacity: 1; }
            100% { transform: translateX(60px); opacity: 0; }
          }
        `}} />
      </div>
      
      {delta && (
        <div className="mt-4 pt-3 border-t border-gray-100 text-center">
          <span className="text-sm font-medium text-gray-600">Terhitung </span>
          <KaTeX math={`\\Delta_0 = ${delta.toFixed(2)}`} />
          <span className="text-sm font-medium text-gray-600"> kJ/mol</span>
        </div>
      )}
    </div>
  );
}
