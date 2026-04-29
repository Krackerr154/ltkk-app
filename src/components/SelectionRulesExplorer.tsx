'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import KaTeX from './KaTeX';
import SpinOrbitCouplingViz from './SpinOrbitCouplingViz';

type Phase = 'visual' | 'interactive' | 'math';

export default function SelectionRulesExplorer() {
  const [activePhase, setActivePhase] = useState<Phase>('visual');

  return (
    <div className="space-y-6">
      {/* Tabs Navigation */}
      <div className="flex justify-center p-1 bg-gray-100/80 backdrop-blur-sm rounded-xl max-w-fit mx-auto shadow-inner border border-gray-200/60">
        <button
          onClick={() => setActivePhase('visual')}
          className={`px-4 sm:px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
            activePhase === 'visual'
              ? 'bg-white text-rose-600 shadow-sm ring-1 ring-black/5'
              : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
          }`}
        >
          👁️ Visualisasi
        </button>
        <button
          onClick={() => setActivePhase('interactive')}
          className={`px-4 sm:px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
            activePhase === 'interactive'
              ? 'bg-white text-rose-600 shadow-sm ring-1 ring-black/5'
              : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
          }`}
        >
          🎮 Interaktif
        </button>
        <button
          onClick={() => setActivePhase('math')}
          className={`px-4 sm:px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
            activePhase === 'math'
              ? 'bg-white text-rose-600 shadow-sm ring-1 ring-black/5'
              : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
          }`}
        >
          📋 Detail
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activePhase === 'visual' && <Phase1Visualizer key="visual" />}
        {activePhase === 'interactive' && <Phase2Sandbox key="interactive" />}
        {activePhase === 'math' && <Phase3MathDive key="math" />}
      </AnimatePresence>
    </div>
  );
}

function Phase1Visualizer() {
  const [showSpinRule, setShowSpinRule] = useState(false);
  const [showLaporteRule, setShowLaporteRule] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6"
    >
      <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 lg:p-8 shadow-sm">
        <p className="text-sm text-gray-600 mb-6 text-center max-w-2xl mx-auto leading-relaxed">
          <strong>Tahap 1: Intuisi Visual.</strong> Amati diagram energi <KaTeX math="d^3" /> di bawah ini. Transisi elektronik dilarang atau diperbolehkan berdasarkan <strong>Aturan Spin</strong> dan <strong>Aturan Laporte</strong>.
        </p>

        {/* Controls */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
            <input 
              type="checkbox" 
              checked={showSpinRule} 
              onChange={(e) => setShowSpinRule(e.target.checked)}
              className="w-4 h-4 text-rose-500 rounded border-gray-300 focus:ring-rose-500"
            />
            <span className="text-sm font-medium text-gray-700">Terapkan Aturan Spin (<KaTeX math="\Delta S = 0" />)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
            <input 
              type="checkbox" 
              checked={showLaporteRule} 
              onChange={(e) => setShowLaporteRule(e.target.checked)}
              className="w-4 h-4 text-rose-500 rounded border-gray-300 focus:ring-rose-500"
            />
            <span className="text-sm font-medium text-gray-700">Terapkan Aturan Laporte (<KaTeX math="g \leftrightarrow u" />)</span>
          </label>
        </div>

        {/* Diagram SVG */}
        <div className="relative overflow-x-auto bg-slate-50/50 rounded-xl border border-slate-100 p-4">
          <svg viewBox="0 0 600 400" className="w-full min-w-[500px] mx-auto overflow-visible font-sans" xmlns="http://www.w3.org/2000/svg">
            {/* Ground State */}
            <line x1="100" y1="350" x2="500" y2="350" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
            <text x="80" y="355" textAnchor="end" fontSize="14" fontWeight="bold" fill="#1e293b">⁴A₂g</text>
            <text x="520" y="355" textAnchor="start" fontSize="12" fill="#64748b">Ground State</text>
            {showLaporteRule && <text x="120" y="340" fontSize="12" fill="#ef4444" fontWeight="bold">g</text>}

            {/* Spin-Allowed Excited States */}
            <g className={showSpinRule ? "" : ""}>
              <line x1="100" y1="280" x2="500" y2="280" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />
              <text x="80" y="285" textAnchor="end" fontSize="14" fontWeight="bold" fill="#0ea5e9">⁴T₂g</text>
              {showLaporteRule && <text x="120" y="270" fontSize="12" fill="#ef4444" fontWeight="bold">g</text>}
              
              <line x1="100" y1="200" x2="500" y2="200" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />
              <text x="80" y="205" textAnchor="end" fontSize="14" fontWeight="bold" fill="#0ea5e9">⁴T₁g(F)</text>
              {showLaporteRule && <text x="120" y="190" fontSize="12" fill="#ef4444" fontWeight="bold">g</text>}
              
              <line x1="100" y1="120" x2="500" y2="120" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />
              <text x="80" y="125" textAnchor="end" fontSize="14" fontWeight="bold" fill="#0ea5e9">⁴T₁g(P)</text>
              {showLaporteRule && <text x="120" y="110" fontSize="12" fill="#ef4444" fontWeight="bold">g</text>}
            </g>

            {/* Spin-Forbidden Excited States */}
            <g style={{ opacity: showSpinRule ? 0.3 : 1, transition: 'opacity 0.5s ease' }}>
              <line x1="100" y1="250" x2="500" y2="250" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4,4" strokeLinecap="round" />
              <text x="80" y="255" textAnchor="end" fontSize="14" fontWeight="bold" fill="#f43f5e">²Eg</text>
              {showLaporteRule && <text x="120" y="240" fontSize="12" fill="#ef4444" fontWeight="bold">g</text>}
              {showSpinRule && <text x="520" y="255" fontSize="12" fill="#f43f5e">Spin-Forbidden</text>}
              
              <line x1="100" y1="160" x2="500" y2="160" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4,4" strokeLinecap="round" />
              <text x="80" y="165" textAnchor="end" fontSize="14" fontWeight="bold" fill="#f43f5e">²T₁g</text>
              {showLaporteRule && <text x="120" y="150" fontSize="12" fill="#ef4444" fontWeight="bold">g</text>}
              {showSpinRule && <text x="520" y="165" fontSize="12" fill="#f43f5e">Spin-Forbidden</text>}
            </g>

            {/* Transition Arrows */}
            {/* To 4T2g */}
            <g>
              <line x1="200" y1="350" x2="200" y2="285" stroke={showLaporteRule ? "#f59e0b" : "#10b981"} strokeWidth="4" strokeDasharray={showLaporteRule ? "6,4" : "none"} />
              <polygon points="200,280 195,290 205,290" fill={showLaporteRule ? "#f59e0b" : "#10b981"} />
            </g>
            
            {/* To 4T1g(F) */}
            <g>
              <line x1="250" y1="350" x2="250" y2="205" stroke={showLaporteRule ? "#f59e0b" : "#10b981"} strokeWidth="4" strokeDasharray={showLaporteRule ? "6,4" : "none"} />
              <polygon points="250,200 245,210 255,210" fill={showLaporteRule ? "#f59e0b" : "#10b981"} />
            </g>

            {/* To 4T1g(P) */}
            <g>
              <line x1="300" y1="350" x2="300" y2="125" stroke={showLaporteRule ? "#f59e0b" : "#10b981"} strokeWidth="4" strokeDasharray={showLaporteRule ? "6,4" : "none"} />
              <polygon points="300,120 295,130 305,130" fill={showLaporteRule ? "#f59e0b" : "#10b981"} />
            </g>

            {/* To 2Eg (Spin Forbidden) */}
            <g style={{ opacity: showSpinRule ? 0.3 : 1, transition: 'opacity 0.5s ease' }}>
              <line x1="350" y1="350" x2="350" y2="255" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4,4" />
              <polygon points="350,250 346,260 354,260" fill="#f43f5e" />
            </g>

            {/* Labels dynamically changing based on rules */}
            <g className="transition-opacity duration-300">
              {showLaporteRule && !showSpinRule && (
                <text x="300" y="60" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#f59e0b">Semua transisi d-d dilarang secara Laporte (g → g)</text>
              )}
              {showSpinRule && !showLaporteRule && (
                <text x="300" y="60" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0ea5e9">Transisi ke state doublet (Spin = 1/2) dilarang</text>
              )}
              {showLaporteRule && showSpinRule && (
                <text x="300" y="60" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#f43f5e">Transisi g→g dilarang (Laporte) & ΔS≠0 dilarang (Spin)</text>
              )}
              {!showLaporteRule && !showSpinRule && (
                <text x="300" y="60" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#64748b">Klik tombol di atas untuk menerapkan aturan</text>
              )}
            </g>

            {/* Exception Note if Laporte is checked */}
            {showLaporteRule && (
              <g style={{ animation: 'fadeIn 0.5s ease-in' }}>
                <rect x="150" y="370" width="300" height="26" rx="6" fill="#fef3c7" stroke="#fcd34d" />
                <text x="300" y="387" textAnchor="middle" fontSize="11" fill="#b45309" fontWeight="600">Pengecualian: Vibronic coupling melemahkan larangan Laporte</text>
              </g>
            )}
          </svg>
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
          `}} />
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================================
   TRANSITION DATABASE — d³ Cr³⁺ (Octahedral)
   ============================================================ */
interface TransitionData {
  id: string;
  label: string;
  mult: number;       // spin multiplicity
  parity: 'g';        // all d-orbitals in Oh are gerade
  energy: number;     // relative position for SVG (0=ground)
  color: string;      // display color
}

const STATES: TransitionData[] = [
  { id: 'A2g',    label: '⁴A₂g',     mult: 4, parity: 'g', energy: 0,   color: '#1e293b' },
  { id: 'T2g',    label: '⁴T₂g',     mult: 4, parity: 'g', energy: 1,   color: '#0ea5e9' },
  { id: '2Eg',    label: '²Eg',       mult: 2, parity: 'g', energy: 1.5, color: '#f43f5e' },
  { id: 'T1gF',   label: '⁴T₁g(F)',  mult: 4, parity: 'g', energy: 2.5, color: '#0ea5e9' },
  { id: '2T1g',   label: '²T₁g',     mult: 2, parity: 'g', energy: 3,   color: '#f43f5e' },
  { id: 'T1gP',   label: '⁴T₁g(P)',  mult: 4, parity: 'g', energy: 4,   color: '#0ea5e9' },
];

interface TransitionResult {
  spinAllowed: boolean;
  laporteAllowed: boolean;
  intensity: number;       // 0–100 scale
  epsilon: string;         // typical ε range
  mechanism: string;
  example?: string;
}

function evaluateTransition(from: TransitionData, to: TransitionData): TransitionResult {
  const spinAllowed = from.mult === to.mult;
  const laporteAllowed = false; // all d-d transitions in Oh are g→g = forbidden

  if (spinAllowed) {
    return {
      spinAllowed: true,
      laporteAllowed: false,
      intensity: 60,
      epsilon: '10–200',
      mechanism: 'Vibronic coupling (kopling vibronik) merusak simetri pusat inversi secara temporer, sehingga transisi d-d yang dilarang Laporte menjadi "lemah diperbolehkan".',
      example: '[Cr(H₂O)₆]³⁺ — warna violet muda (ε ≈ 15)',
    };
  } else {
    return {
      spinAllowed: false,
      laporteAllowed: false,
      intensity: 5,
      epsilon: '< 1',
      mechanism: 'Spin-orbit coupling (kopling spin-orbit) mencampurkan keadaan spin yang berbeda, memungkinkan transisi sangat lemah. Larangan Laporte juga berlaku.',
      example: '[Mn(H₂O)₆]²⁺ (d⁵) — warna merah muda sangat pucat (ε ≈ 0.04)',
    };
  }
}

function Phase2Sandbox() {
  const [fromId, setFromId] = useState<string>('A2g');
  const [toId, setToId] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const fromState = STATES.find(s => s.id === fromId)!;
  const toState = toId ? STATES.find(s => s.id === toId) : null;

  const handleSelectTo = (id: string) => {
    if (id === fromId) return;
    setToId(id);
    setShowResult(false);
    setTimeout(() => setShowResult(true), 100);
  };

  const result = (fromState && toState) ? evaluateTransition(fromState, toState) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6"
    >
      <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 lg:p-8 shadow-sm">
        <p className="text-sm text-gray-600 mb-6 text-center max-w-2xl mx-auto leading-relaxed">
          <strong>Tahap 2: Sandbox Interaktif.</strong> Pilih keadaan <strong>awal</strong> dan <strong>akhir</strong> untuk mengevaluasi apakah transisi tersebut diperbolehkan atau dilarang.
        </p>

        {/* State Pickers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* FROM picker */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-gray-700 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold border border-emerald-200">1</span>
              Keadaan Awal
            </h4>
            <div className="space-y-2">
              {STATES.map(s => (
                <button
                  key={s.id}
                  onClick={() => { setFromId(s.id); setToId(null); setShowResult(false); }}
                  disabled={s.id === toId}
                  className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all duration-200 text-sm font-semibold flex items-center justify-between group
                    ${fromId === s.id
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-500/20'
                      : s.id === toId
                        ? 'border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-emerald-300 hover:bg-emerald-50/50'
                    }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color, opacity: s.id === toId ? 0.3 : 1 }} />
                    {s.label}
                  </span>
                  <span className="text-xs text-gray-400 font-normal">S = {(s.mult - 1) / 2}</span>
                </button>
              ))}
            </div>
          </div>

          {/* TO picker */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-gray-700 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold border border-amber-200">2</span>
              Keadaan Akhir
            </h4>
            <div className="space-y-2">
              {STATES.map(s => (
                <button
                  key={s.id}
                  onClick={() => handleSelectTo(s.id)}
                  disabled={s.id === fromId}
                  className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all duration-200 text-sm font-semibold flex items-center justify-between group
                    ${toId === s.id
                      ? 'border-amber-500 bg-amber-50 text-amber-800 ring-2 ring-amber-500/20'
                      : s.id === fromId
                        ? 'border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-amber-300 hover:bg-amber-50/50'
                    }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color, opacity: s.id === fromId ? 0.3 : 1 }} />
                    {s.label}
                  </span>
                  <span className="text-xs text-gray-400 font-normal">S = {(s.mult - 1) / 2}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Transition Arrow Visualization */}
        {fromState && toState && (
          <div className="flex justify-center mb-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 bg-gray-50 px-5 py-3 rounded-xl border border-gray-200"
            >
              <span className="text-lg font-serif font-bold" style={{ color: fromState.color }}>{fromState.label}</span>
              <svg width="40" height="20" viewBox="0 0 40 20">
                <line x1="0" y1="10" x2="32" y2="10" stroke={result?.spinAllowed ? '#10b981' : '#f43f5e'} strokeWidth="3" strokeDasharray={result?.spinAllowed ? '' : '4,3'} />
                <polygon points="34,10 26,5 26,15" fill={result?.spinAllowed ? '#10b981' : '#f43f5e'} />
              </svg>
              <span className="text-lg font-serif font-bold" style={{ color: toState.color }}>{toState.label}</span>
            </motion.div>
          </div>
        )}

        {/* Verdict Panel */}
        <AnimatePresence mode="wait">
          {showResult && result && toState && (
            <motion.div
              key={`${fromId}-${toId}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="space-y-4"
            >
              {/* Rule Checks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Spin Rule */}
                <div className={`p-4 rounded-xl border-2 ${result.spinAllowed ? 'border-emerald-200 bg-emerald-50' : 'border-rose-200 bg-rose-50'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{result.spinAllowed ? '✅' : '❌'}</span>
                    <h5 className="text-sm font-bold text-gray-800">Aturan Spin</h5>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    <KaTeX math={`\\Delta S = |S_f - S_i| = |${(toState.mult - 1) / 2} - ${(fromState.mult - 1) / 2}| = ${Math.abs((toState.mult - fromState.mult) / 2)}`} />
                  </p>
                  <p className={`text-xs font-bold mt-2 ${result.spinAllowed ? 'text-emerald-700' : 'text-rose-700'}`}>
                    {result.spinAllowed
                      ? 'ΔS = 0 → DIPERBOLEHKAN'
                      : 'ΔS ≠ 0 → DILARANG'}
                  </p>
                </div>

                {/* Laporte Rule */}
                <div className="p-4 rounded-xl border-2 border-amber-200 bg-amber-50">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">⚠️</span>
                    <h5 className="text-sm font-bold text-gray-800">Aturan Laporte</h5>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Paritas: <strong>{fromState.parity}</strong> → <strong>{toState.parity}</strong> (transisi <KaTeX math="g \rightarrow g" />)
                  </p>
                  <p className="text-xs font-bold mt-2 text-amber-700">
                    g → g → DILARANG (tetapi terjadi via vibronic coupling)
                  </p>
                </div>
              </div>

              {/* Intensity Bar */}
              <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="text-sm font-bold text-gray-700">Intensitas Relatif</h5>
                  <span className="text-xs font-medium text-gray-500">ε ≈ {result.epsilon} L mol⁻¹ cm⁻¹</span>
                </div>
                <div className="w-full h-5 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${result.intensity}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                    className={`h-full rounded-full ${result.spinAllowed ? 'bg-gradient-to-r from-emerald-400 to-teal-500' : 'bg-gradient-to-r from-rose-300 to-rose-400'}`}
                  />
                </div>
                <div className="flex justify-between mt-1 text-[10px] text-gray-400">
                  <span>Sangat lemah</span>
                  <span>Kuat (CT)</span>
                </div>
              </div>

              {/* Mechanism Explanation */}
              <div className="p-5 bg-indigo-50 rounded-xl border border-indigo-200">
                <h5 className="text-sm font-bold text-indigo-800 mb-2 flex items-center gap-2">
                  <span>🔬</span> Mengapa Transisi Ini Tetap Terjadi?
                </h5>
                <p className="text-sm text-indigo-700 leading-relaxed mb-3">{result.mechanism}</p>
                {result.example && (
                  <div className="text-xs text-indigo-600 bg-white/60 px-3 py-2 rounded-lg border border-indigo-100">
                    <strong>Contoh:</strong> {result.example}
                  </div>
                )}
              </div>

              {/* Comparison Table for context */}
              <div className="p-5 bg-white rounded-xl border border-gray-200">
                <h5 className="text-sm font-bold text-gray-700 mb-3">📊 Perbandingan Intensitas Transisi</h5>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 pr-3 font-semibold text-gray-700">Jenis Transisi</th>
                        <th className="text-left py-2 pr-3 font-semibold text-gray-700">Aturan Dilanggar</th>
                        <th className="text-left py-2 pr-3 font-semibold text-gray-700">ε (L mol⁻¹ cm⁻¹)</th>
                        <th className="text-left py-2 font-semibold text-gray-700">Contoh</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600">
                      <tr className="border-b border-gray-100">
                        <td className="py-2 font-medium text-emerald-700">Charge Transfer (CT)</td>
                        <td className="py-2">Tidak ada</td>
                        <td className="py-2 font-bold">1000–50000</td>
                        <td className="py-2">MnO₄⁻ (ungu pekat)</td>
                      </tr>
                      <tr className={`border-b border-gray-100 ${result.spinAllowed ? 'bg-emerald-50/50' : ''}`}>
                        <td className="py-2 font-medium text-amber-700">d-d Spin-allowed</td>
                        <td className="py-2">Laporte saja</td>
                        <td className="py-2 font-bold">10–200</td>
                        <td className="py-2">[Cr(H₂O)₆]³⁺</td>
                      </tr>
                      <tr className={`border-b border-gray-100 ${!result.spinAllowed ? 'bg-rose-50/50' : ''}`}>
                        <td className="py-2 font-medium text-rose-700">d-d Spin-forbidden</td>
                        <td className="py-2">Spin + Laporte</td>
                        <td className="py-2 font-bold">&lt; 1</td>
                        <td className="py-2">[Mn(H₂O)₆]²⁺</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Prompt when no target selected */}
        {!toId && (
          <div className="text-center p-8 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
            <p className="text-sm text-gray-400">
              Pilih keadaan akhir di kolom kanan untuk melihat evaluasi transisi
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ============================================================
   PHASE 3 — MATH DEEP DIVE + COUPLING VISUALIZATIONS
   ============================================================ */
function MathCard({ title, icon, accent, children }: { title: string; icon: string; accent: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border-2 rounded-xl overflow-hidden transition-all ${accent}`}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-4 sm:p-5 hover:bg-gray-50/50 transition-colors">
        <h4 className="text-sm sm:text-base font-bold text-gray-800 flex items-center gap-2">
          <span>{icon}</span> {title}
        </h4>
        <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 bg-gray-100 ${open ? 'rotate-180' : ''}`}>
          <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
            <div className="px-4 sm:px-5 pb-5 space-y-4 text-sm text-gray-700 leading-relaxed">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function VibronicCouplingViz() {
  const [vibrating, setVibrating] = useState(false);

  /* T₁u asymmetric stretch: each ligand oscillates along its bond axis.
     tx/ty = max displacement from equilibrium; dur = period (staggered for realism). */
  const ligands = [
    { cx: 150, cy: 40,  tx: 0,   ty: -12, dur: '0.7s'  },
    { cx: 150, cy: 220, tx: 0,   ty: 12,  dur: '0.7s'  },
    { cx: 60,  cy: 130, tx: -14, ty: 0,   dur: '0.85s' },
    { cx: 240, cy: 130, tx: 14,  ty: 0,   dur: '0.85s' },
    { cx: 90,  cy: 70,  tx: -8,  ty: -8,  dur: '1.0s'  },
    { cx: 210, cy: 190, tx: 8,   ty: 8,   dur: '1.0s'  },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <h5 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">🔄 Visualisasi Vibronic Coupling</h5>
      <p className="text-xs text-gray-600 mb-4">Getaran asimetris (<KaTeX math="T_{1u}" />) pada kompleks oktahedral merusak pusat inversi secara temporer, sehingga transisi d-d yang dilarang Laporte menjadi &quot;lemah diperbolehkan&quot;.</p>
      <div className="flex justify-center mb-4">
        <button onClick={() => setVibrating(!vibrating)} className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${vibrating ? 'bg-amber-500 text-white shadow-md' : 'bg-amber-100 text-amber-700 hover:bg-amber-200'}`}>
          {vibrating ? '⏸ Hentikan Getaran' : '▶ Mulai Getaran Asimetris'}
        </button>
      </div>
      <div className="flex justify-center">
        <svg viewBox="0 0 300 280" className="w-full max-w-[300px]" xmlns="http://www.w3.org/2000/svg">
          {/* Center metal */}
          <circle cx="150" cy="130" r="18" fill="#7c3aed" stroke="#5b21b6" strokeWidth="2" />
          <text x="150" y="135" textAnchor="middle" fontSize="11" fill="white" fontWeight="bold">M</text>

          {/* Ligands — each bond+ligand pair wrapped in <g> with animateTransform */}
          {ligands.map((l, i) => (
            <g key={i}>
              <line x1="150" y1="130" x2={l.cx} y2={l.cy} stroke="#94a3b8" strokeWidth="2" />
              <circle cx={l.cx} cy={l.cy} r="12" fill={vibrating ? '#f59e0b' : '#0ea5e9'} stroke={vibrating ? '#d97706' : '#0284c7'} strokeWidth="1.5" style={{ transition: 'fill 0.3s, stroke 0.3s' }} />
              <text x={l.cx} y={l.cy + 4} textAnchor="middle" fontSize="9" fill="white" fontWeight="bold">L</text>
              {vibrating && (
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values={`0,0; ${l.tx},${l.ty}; 0,0; ${-l.tx * 0.5},${-l.ty * 0.5}; 0,0`}
                  dur={l.dur}
                  repeatCount="indefinite"
                />
              )}
            </g>
          ))}

          {/* Center of inversion indicator */}
          {!vibrating && (
            <g>
              <circle cx="150" cy="130" r="28" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4,3" />
              <text x="150" y="170" textAnchor="middle" fontSize="10" fill="#10b981" fontWeight="600">Pusat inversi (i) ✓</text>
            </g>
          )}
          {vibrating && (
            <g>
              <circle cx="150" cy="130" r="28" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,3" opacity="0.5">
                <animate attributeName="r" values="28;32;26;30;28" dur="0.8s" repeatCount="indefinite" />
              </circle>
              <text x="150" y="170" textAnchor="middle" fontSize="10" fill="#ef4444" fontWeight="600">Pusat inversi hilang ✗</text>
            </g>
          )}

          {/* Result label */}
          <rect x="50" y="248" width="200" height="24" rx="6" fill={vibrating ? '#fef3c7' : '#f0fdf4'} stroke={vibrating ? '#fcd34d' : '#86efac'} />
          <text x="150" y="264" textAnchor="middle" fontSize="10" fill={vibrating ? '#92400e' : '#166534'} fontWeight="600">
            {vibrating ? 'Transisi d-d lemah diperbolehkan!' : 'Transisi d-d dilarang (Laporte)'}
          </text>
        </svg>
      </div>
    </div>
  );
}



function Phase3MathDive() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 lg:p-8 shadow-sm">
        <p className="text-sm text-gray-600 mb-6 text-center max-w-2xl mx-auto leading-relaxed">
          <strong>Tahap 3: Pemahaman Mendalam.</strong> Buka setiap kartu untuk mempelajari dasar matematis di balik aturan seleksi dan mekanisme pengecualiannya.
        </p>

        <div className="space-y-4">
          {/* Card 1: Spin Selection Rule */}
          <MathCard title="Aturan Seleksi Spin" icon="🔵" accent="border-sky-200">
            <p><strong>Pernyataan formal:</strong> Transisi elektronik hanya diperbolehkan jika <KaTeX math="\Delta S = 0" /> (multiplisitas spin tidak berubah).</p>
            <div className="p-4 bg-sky-50 rounded-lg border border-sky-200">
              <p className="text-xs font-semibold text-sky-800 mb-2">Dari integral momen transisi:</p>
              <KaTeX math="\langle \Psi_f \,|\, \hat{\mu} \,|\, \Psi_i \rangle \neq 0" display />
              <p className="text-xs text-gray-600 mt-2">Karena operator dipol listrik <KaTeX math="\hat{\mu}" /> tidak beroperasi pada koordinat spin, integral dapat dipisahkan:</p>
              <KaTeX math="\langle \Psi_f | \hat{\mu} | \Psi_i \rangle = \underbrace{\langle \phi_f | \hat{\mu} | \phi_i \rangle}_{\text{bagian spasial}} \cdot \underbrace{\langle \chi_f | \chi_i \rangle}_{\text{overlap spin}}" display />
              <p className="text-xs text-gray-600 mt-2">Integral overlap spin <KaTeX math="\langle \chi_f | \chi_i \rangle = 0" /> ketika <KaTeX math="S_i \neq S_f" /> karena ortogonalitas fungsi spin.</p>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs">
              <p className="font-semibold text-amber-800">Contoh untuk Cr³⁺ (d³):</p>
              <p className="text-gray-700 mt-1">Ground state <KaTeX math="^4A_{2g}" /> memiliki <KaTeX math="S = 3/2" />. Transisi ke <KaTeX math="^4T_{2g}" /> (<KaTeX math="S = 3/2" />) → <strong>diperbolehkan</strong>. Transisi ke <KaTeX math="^2E_g" /> (<KaTeX math="S = 1/2" />) → <strong>dilarang</strong>.</p>
            </div>
          </MathCard>

          {/* Card 2: Laporte Rule */}
          <MathCard title="Aturan Laporte (Paritas)" icon="🔴" accent="border-rose-200">
            <p><strong>Pernyataan formal:</strong> Dalam molekul dengan pusat inversi, transisi hanya diperbolehkan jika paritas berubah: <KaTeX math="g \leftrightarrow u" /> (gerade ↔ ungerade).</p>
            <div className="p-4 bg-rose-50 rounded-lg border border-rose-200">
              <p className="text-xs font-semibold text-rose-800 mb-2">Secara matematis:</p>
              <KaTeX math="\Delta l = \pm 1 \quad (\text{paritas harus berubah})" display />
              <p className="text-xs text-gray-600 mt-2">Untuk kompleks oktahedral (<KaTeX math="O_h" />), semua orbital d bersifat <strong>gerade (g)</strong>:</p>
              <KaTeX math="d \xrightarrow{?} d \;\Rightarrow\; g \rightarrow g \;\text{ (DILARANG)}" display />
              <p className="text-xs text-gray-600 mt-2">Integral momen transisi:</p>
              <KaTeX math="\langle d_f \,|\, \hat{r} \,|\, d_i \rangle = 0 \quad \text{karena } g \times u \times g = u \neq A_{1g}" display />
            </div>
          </MathCard>

          {/* Card 3: Vibronic Coupling Exception */}
          <MathCard title="Pengecualian: Vibronic Coupling" icon="🔄" accent="border-amber-200">
            <p>Getaran molekul asimetris (mode <KaTeX math="T_{1u}" />) sementara merusak pusat inversi pada kompleks oktahedral, menjadikan transisi d-d <strong>lemah diperbolehkan</strong>.</p>
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-xs font-semibold text-amber-800 mb-2">Integral Herzberg-Teller:</p>
              <KaTeX math="\langle \psi_{el,f} \,|\, \hat{\mu} \,|\, \psi_{el,i} \rangle \cdot \langle \chi_{vib,f} \,|\, Q_{T_{1u}} \,|\, \chi_{vib,i} \rangle \neq 0" display />
              <p className="text-xs text-gray-600 mt-2">Mode vibrasi <KaTeX math="T_{1u}" /> bersifat <strong>ungerade</strong>, sehingga:</p>
              <KaTeX math="g \times u \times g = u" display />
              <p className="text-xs text-gray-600 mt-1 text-center">→ mengandung komponen <KaTeX math="T_{1u}" /> → integral ≠ 0</p>
            </div>
            <VibronicCouplingViz />
            <div className="p-3 bg-gray-50 rounded-lg text-xs text-gray-600">
              <strong>Hasil praktis:</strong> Transisi d-d pada kompleks oktahedral memiliki ε ≈ 10–200 L mol⁻¹ cm⁻¹ (lemah dibanding charge transfer yang ε &gt; 1000).
            </div>
          </MathCard>

          {/* Card 4: Spin-Orbit Coupling Exception */}
          <MathCard title="Pengecualian: Spin-Orbit Coupling" icon="🌀" accent="border-violet-200">
            <p>Kopling spin-orbit mencampurkan (<em>mixing</em>) keadaan elektronik dengan multiplisitas spin berbeda, sehingga transisi spin-forbidden menjadi <strong>sangat lemah teramati</strong>.</p>
            <div className="p-4 bg-violet-50 rounded-lg border border-violet-200">
              <p className="text-xs font-semibold text-violet-800 mb-2">Hamiltonian spin-orbit:</p>
              <KaTeX math="\hat{H}_{SO} = \xi \sum_i \hat{l}_i \cdot \hat{s}_i" display />
              <p className="text-xs text-gray-600 mt-2">Operator ini mencampurkan keadaan spin sehingga keadaan &quot;murni&quot; menjadi campuran:</p>
              <KaTeX math="|{^2E_g}\rangle' = |{^2E_g}\rangle + \alpha |{^4A_{2g}}\rangle + \ldots" display />
              <p className="text-xs text-gray-600 mt-2">Koefisien pencampuran <KaTeX math="\alpha" /> sangat kecil, sehingga intensitas transisi sangat lemah (ε &lt; 1).</p>
            </div>
            <SpinOrbitCouplingViz />
            <div className="p-3 bg-gray-50 rounded-lg text-xs text-gray-600">
              <strong>Contoh klasik:</strong> [Mn(H₂O)₆]²⁺ (d⁵, high-spin) — semua transisi d-d bersifat spin-forbidden. Larutan berwarna merah muda sangat pucat (ε ≈ 0.04).
            </div>
          </MathCard>

          {/* Card 5: Intensity Summary */}
          <MathCard title="Ringkasan Intensitas Transisi" icon="📊" accent="border-gray-300">
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left py-2 pr-3 font-bold text-gray-800">Jenis</th>
                    <th className="text-left py-2 pr-3 font-bold text-gray-800">Aturan Dilanggar</th>
                    <th className="text-left py-2 pr-3 font-bold text-gray-800">ε (L mol⁻¹ cm⁻¹)</th>
                    <th className="text-left py-2 pr-3 font-bold text-gray-800">Mekanisme</th>
                    <th className="text-left py-2 font-bold text-gray-800">Contoh</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="border-b border-gray-100 bg-emerald-50/50">
                    <td className="py-2.5 font-semibold text-emerald-700">Charge Transfer</td>
                    <td className="py-2.5">Tidak ada</td>
                    <td className="py-2.5 font-bold">1000–50000</td>
                    <td className="py-2.5">Fully allowed</td>
                    <td className="py-2.5">MnO₄⁻</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-amber-50/50">
                    <td className="py-2.5 font-semibold text-amber-700">d-d Spin-allowed</td>
                    <td className="py-2.5">Laporte</td>
                    <td className="py-2.5 font-bold">10–200</td>
                    <td className="py-2.5">Vibronic coupling</td>
                    <td className="py-2.5">[Cr(H₂O)₆]³⁺</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-rose-50/50">
                    <td className="py-2.5 font-semibold text-rose-700">d-d Spin-forbidden</td>
                    <td className="py-2.5">Spin + Laporte</td>
                    <td className="py-2.5 font-bold">&lt; 1</td>
                    <td className="py-2.5">Spin-orbit coupling</td>
                    <td className="py-2.5">[Mn(H₂O)₆]²⁺</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </MathCard>
        </div>
      </div>
    </motion.div>
  );
}
