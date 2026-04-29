'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import KaTeX from './KaTeX';

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

function SpinOrbitCouplingViz() {
  const [step, setStep] = useState(0); // 0=intro, 1=show-problem, 2=soc-active

  const nextStep = () => setStep(s => Math.min(s + 1, 2));
  const prevStep = () => setStep(s => Math.max(s - 1, 0));

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-4">
      <h5 className="text-sm font-bold text-gray-800 flex items-center gap-2">🌀 Visualisasi Spin-Orbit Coupling</h5>

      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2">
        {[0, 1, 2].map(i => (
          <button key={i} onClick={() => setStep(i)} className={`w-7 h-7 rounded-full text-xs font-bold transition-all ${step === i ? 'bg-violet-500 text-white scale-110 shadow-md' : 'bg-gray-100 text-gray-500 hover:bg-violet-100'}`}>{i + 1}</button>
        ))}
      </div>

      <div className="flex justify-center">
        {/* Dynamic heights: step 0 = orbital boxes only, step 1 = +forbidden banner, step 2 = full L·S viz */}
        <svg
          viewBox={`0 0 460 ${step === 0 ? 180 : step === 1 ? 240 : 455}`}
          className="w-full max-w-[460px]"
          xmlns="http://www.w3.org/2000/svg"
          style={{ transition: 'all 0.4s ease' }}
        >

          {/* ── GROUND STATE: ⁴A₂g (left side) ── */}
          <text x="110" y="18" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0369a1">Keadaan Dasar</text>
          <rect x="20" y="25" width="180" height="100" rx="10" fill="#f0f9ff" stroke="#0ea5e9" strokeWidth="1.5" />
          <text x="110" y="45" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0369a1">⁴A₂g (S = 3/2)</text>

          {/* t2g orbital boxes */}
          <text x="40" y="65" fontSize="9" fill="#64748b">t₂g:</text>
          {[65, 100, 135].map((x, i) => (
            <g key={`gs-${i}`}>
              <rect x={x} y="55" width="28" height="36" rx="3" fill="white" stroke="#94a3b8" strokeWidth="1" />
              {/* Single up arrow in each */}
              <line x1={x + 14} y1="82" x2={x + 14} y2="63" stroke="#1e40af" strokeWidth="2.5" strokeLinecap="round" />
              <polygon points={`${x + 14},60 ${x + 11},66 ${x + 17},66`} fill="#1e40af" />
            </g>
          ))}
          <text x="40" y="105" fontSize="8" fill="#64748b">e_g: kosong</text>
          <text x="110" y="118" textAnchor="middle" fontSize="9" fill="#0ea5e9" fontWeight="600">3 elektron ↑↑↑ semua paralel</text>

          {/* ── EXCITED STATE: ²Eg (right side) ── */}
          <text x="350" y="18" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#be123c">Keadaan Tereksitasi</text>
          <rect x="260" y="25" width="180" height="100" rx="10" fill={step >= 2 ? '#faf5ff' : '#fff1f2'} stroke={step >= 2 ? '#a855f7' : '#f43f5e'} strokeWidth="1.5" style={{ transition: 'all 0.5s ease' }} />
          <text x="350" y="45" textAnchor="middle" fontSize="14" fontWeight="bold" fill={step >= 2 ? '#7c3aed' : '#be123c'}>²Eg (S = 1/2)</text>

          {/* t2g orbital boxes — one has paired electrons */}
          <text x="280" y="65" fontSize="9" fill="#64748b">t₂g:</text>
          {/* Box 1: paired (up + down) */}
          <rect x="305" y="55" width="28" height="36" rx="3" fill="white" stroke="#94a3b8" strokeWidth="1" />
          <line x1="315" y1="82" x2="315" y2="63" stroke="#1e40af" strokeWidth="2" strokeLinecap="round" />
          <polygon points="315,60 312,66 318,66" fill="#1e40af" />
          <line x1="322" y1="63" x2="322" y2="82" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
          <polygon points="322,85 319,79 325,79" fill="#dc2626" />
          {/* Box 2: single up */}
          <rect x="340" y="55" width="28" height="36" rx="3" fill="white" stroke="#94a3b8" strokeWidth="1" />
          <line x1="354" y1="82" x2="354" y2="63" stroke="#1e40af" strokeWidth="2" strokeLinecap="round" />
          <polygon points="354,60 351,66 357,66" fill="#1e40af" />
          {/* Box 3: empty */}
          <rect x="375" y="55" width="28" height="36" rx="3" fill="white" stroke="#94a3b8" strokeWidth="1" />

          <text x="350" y="118" textAnchor="middle" fontSize="9" fill={step >= 2 ? '#7c3aed' : '#e11d48'} fontWeight="600" style={{ transition: 'fill 0.5s' }}>
            {step >= 2 ? '↑↓↑ + sedikit karakter ↑↑↑' : '↑↓ + ↑ (ada spin berlawanan!)'}
          </text>
          <text x="350" y="105" fontSize="8" fill="#64748b">e_g: kosong</text>

          {/* ── STEP 1: Show the problem ── */}
          {step >= 1 && (
            <g>
              {/* Transition arrow */}
              <line x1="200" y1="85" x2="255" y2="85" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,3">
                {step === 1 && <animate attributeName="stroke-dashoffset" from="0" to="-14" dur="1s" repeatCount="indefinite" />}
              </line>
              <polygon points="257,85 249,80 249,90" fill="#ef4444" />

              {/* Forbidden sign */}
              <circle cx="228" cy="75" r="10" fill="#fecaca" stroke="#ef4444" strokeWidth="1.5" />
              <text x="228" y="79" textAnchor="middle" fontSize="12" fill="#dc2626" fontWeight="bold">✗</text>

              {/* Explanation box */}
              <rect x="60" y="140" width="340" height="45" rx="8" fill="#fff1f2" stroke="#fecaca" strokeWidth="1.5" />
              <text x="230" y="157" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#be123c">❌ Transisi DILARANG — Aturan Spin</text>
              <text x="230" y="173" textAnchor="middle" fontSize="9" fill="#9f1239">ΔS = |3/2 − 1/2| = 1 ≠ 0 → spin harus berubah → integral = 0</text>
            </g>
          )}

          {/* ── STEP 2: SOC active — mixing ── */}
          {step >= 2 && (
            <g>
              {/* Override forbidden with weak allowed */}
              <rect x="60" y="140" width="340" height="45" rx="8" fill="#f5f3ff" stroke="#c4b5fd" strokeWidth="1.5" />
              <text x="230" y="157" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#6d28d9">🌀 Spin-Orbit Coupling AKTIF</text>
              <text x="230" y="173" textAnchor="middle" fontSize="9" fill="#7c3aed">Momentum orbit (L) berinteraksi dengan spin (S) → state tercampur</text>

              {/* SOC mixing arrow between states */}
              <g>
                <path d="M 200 60 Q 230 30 260 60" fill="none" stroke="#a855f7" strokeWidth="2" strokeDasharray="5,3">
                  <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1.2s" repeatCount="indefinite" />
                </path>
                <text x="230" y="38" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#7c3aed">SOC mixing</text>
              </g>

              {/* Transition arrow becomes weakly allowed */}
              <line x1="200" y1="85" x2="255" y2="85" stroke="#a855f7" strokeWidth="2.5" strokeDasharray="6,4">
                <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="1s" repeatCount="indefinite" />
              </line>
              <polygon points="257,85 249,80 249,90" fill="#a855f7" />

              {/* Weak checkmark */}
              <circle cx="228" cy="75" r="10" fill="#ede9fe" stroke="#a855f7" strokeWidth="1.5">
                <animate attributeName="r" values="10;12;10" dur="1.5s" repeatCount="indefinite" />
              </circle>
              <text x="228" y="79" textAnchor="middle" fontSize="9" fill="#7c3aed" fontWeight="bold">~</text>

              {/* Physical explanation — WHY L interacts with S */}
              <rect x="10" y="195" width="440" height="195" rx="10" fill="#faf5ff" stroke="#ddd6fe" strokeWidth="1.5" />
              <text x="230" y="213" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#5b21b6">Mengapa momentum orbit (L) berinteraksi dengan spin (S)?</text>

              {/* ── Panel 1: Orbiting electron generates B field ── */}
              <rect x="22" y="222" width="200" height="105" rx="8" fill="white" stroke="#c4b5fd" strokeWidth="1" />
              <text x="122" y="237" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#0369a1">① Elektron mengorbit inti</text>

              {/* Nucleus */}
              <circle cx="122" cy="285" r="10" fill="#1e40af" stroke="#1e3a8a" strokeWidth="1.5" />
              <text x="122" y="289" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">+</text>

              {/* Orbital path (ellipse) */}
              <ellipse cx="122" cy="285" rx="55" ry="30" fill="none" stroke="#93c5fd" strokeWidth="1.5" strokeDasharray="3,2" />

              {/* Orbiting electron — group follows the full ellipse path */}
              <g>
                <circle r="6" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1" />
                <text y="3" textAnchor="middle" fontSize="6" fill="white" fontWeight="bold">e⁻</text>
                <animateMotion
                  dur="2.5s"
                  repeatCount="indefinite"
                  path="M 177,285 A 55,30 0 0,1 67,285 A 55,30 0 0,1 177,285"
                />
              </g>

              {/* Magnetic field arrow (μ_L) — blue, pointing up from orbit */}
              <line x1="122" y1="260" x2="122" y2="244" stroke="#0ea5e9" strokeWidth="2.5" strokeLinecap="round" />
              <polygon points="122,241 119,247 125,247" fill="#0ea5e9" />
              <text x="137" y="248" fontSize="7.5" fontWeight="bold" fill="#0ea5e9">μ_L</text>

              {/* Curved field lines */}
              <path d="M 107 254 Q 122 262 137 254" fill="none" stroke="#93c5fd" strokeWidth="1" strokeDasharray="2,2">
                <animate attributeName="stroke-dashoffset" from="0" to="-8" dur="1s" repeatCount="indefinite" />
              </path>
              <path d="M 102 258 Q 122 268 142 258" fill="none" stroke="#93c5fd" strokeWidth="0.8" strokeDasharray="2,2">
                <animate attributeName="stroke-dashoffset" from="0" to="-8" dur="1.3s" repeatCount="indefinite" />
              </path>

              <text x="122" y="320" textAnchor="middle" fontSize="7" fill="#64748b">Gerakan orbit → medan magnet (B_L)</text>

              {/* ── Panel 2: Spinning electron generates μ_S ── */}
              <rect x="238" y="222" width="200" height="105" rx="8" fill="white" stroke="#c4b5fd" strokeWidth="1" />
              <text x="338" y="237" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#be123c">② Elektron berputar (spin)</text>

              {/* Spinning electron representation */}
              <circle cx="330" cy="280" r="16" fill="#fecaca" stroke="#ef4444" strokeWidth="1.5" />
              <text x="330" y="284" textAnchor="middle" fontSize="9" fill="#dc2626" fontWeight="bold">e⁻</text>

              {/* Spin rotation arrows around electron */}
              <path d="M 314 280 A 16 16 0 0 1 346 280" fill="none" stroke="#f87171" strokeWidth="1.5">
                <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="0.8s" repeatCount="indefinite" />
              </path>
              <path d="M 346 280 A 16 16 0 0 1 314 280" fill="none" stroke="#f87171" strokeWidth="1.5" strokeDasharray="3,3">
                <animate attributeName="stroke-dashoffset" from="0" to="20" dur="0.8s" repeatCount="indefinite" />
              </path>

              {/* Spin arrow curving over the top */}
              <path d="M 318 268 A 14 8 0 0 1 342 268" fill="none" stroke="#ef4444" strokeWidth="1.5" />
              <polygon points="342,268 337,264 337,272" fill="#ef4444" />

              {/* μ_S arrow */}
              <line x1="330" y1="260" x2="330" y2="244" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
              <polygon points="330,241 327,247 333,247" fill="#ef4444" />
              <text x="348" y="248" fontSize="7.5" fontWeight="bold" fill="#ef4444">μ_S</text>

              {/* Magnetic field lines from spin */}
              <path d="M 315 254 Q 330 262 345 254" fill="none" stroke="#fca5a5" strokeWidth="1" strokeDasharray="2,2">
                <animate attributeName="stroke-dashoffset" from="0" to="-8" dur="1s" repeatCount="indefinite" />
              </path>
              <path d="M 310 258 Q 330 268 350 258" fill="none" stroke="#fca5a5" strokeWidth="0.8" strokeDasharray="2,2">
                <animate attributeName="stroke-dashoffset" from="0" to="-8" dur="1.3s" repeatCount="indefinite" />
              </path>

              <text x="338" y="320" textAnchor="middle" fontSize="7" fill="#64748b">Putaran spin → medan magnet (B_S)</text>

              {/* ── Coupling arrow between the two panels ── */}
              <path d="M 222 275 L 238 275" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrowPurple)" />
              <path d="M 238 275 L 222 275" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrowPurple)" />
              <text x="230" y="270" textAnchor="middle" fontSize="16" fill="#a855f7" fontWeight="bold">⇌</text>
              <text x="230" y="290" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#7c3aed">B_L ↔ B_S</text>
              <text x="230" y="300" textAnchor="middle" fontSize="6.5" fill="#7c3aed">saling</text>
              <text x="230" y="309" textAnchor="middle" fontSize="6.5" fill="#7c3aed">berinteraksi!</text>

              {/* ── Bottom summary ── */}
              <rect x="30" y="332" width="400" height="52" rx="8" fill="#ede9fe" stroke="#c4b5fd" strokeWidth="1" />
              <text x="230" y="348" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#5b21b6">Hasil: Kedua medan magnet saling berinteraksi (ξ · L · S)</text>
              <text x="230" y="361" textAnchor="middle" fontSize="7.5" fill="#4c1d95">Akibatnya, keadaan spin &quot;murni&quot; (S=1/2) tercampur dengan karakter S=3/2</text>
              <text x="230" y="374" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#6d28d9">→ Integral overlap spin ≠ 0 → transisi sangat lemah tapi teramati</text>
            </g>
          )}

          {/* Intensity bar — position adapts to step */}
          {(() => {
            const barY = step === 0 ? 140 : step === 1 ? 200 : 400;
            const labelY = step === 0 ? 170 : step === 1 ? 230 : 440;
            return (
              <>
                <rect x="20" y={barY} width="420" height="18" rx="5" fill="#f1f5f9" stroke="#e2e8f0" />
                <rect x="20" y={barY} width={step >= 2 ? '20' : '0'} height="18" rx="5" fill={step >= 2 ? '#c084fc' : '#ef4444'} style={{ transition: 'width 0.8s ease' }} />
                <text x="230" y={barY + 13} textAnchor="middle" fontSize="8" fill="#64748b">
                  Intensitas: {step >= 2 ? 'ε ≈ 0.01–1 L mol⁻¹cm⁻¹ (sangat lemah, tapi teramati!)' : step >= 1 ? 'ε = 0 (dilarang total)' : 'Klik langkah untuk mulai'}
                </text>
                <text x="230" y={labelY} textAnchor="middle" fontSize="9" fill="#94a3b8">
                  {step === 0 ? 'Langkah 1: Amati konfigurasi elektron kedua keadaan' : step === 1 ? 'Langkah 2: Transisi dilarang karena ΔS ≠ 0' : 'Langkah 3: SOC mencampur keadaan → transisi sangat lemah terjadi'}
                </text>
              </>
            );
          })()}
        </svg>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-center gap-3">
        <button onClick={prevStep} disabled={step === 0} className="px-4 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
          ← Sebelumnya
        </button>
        <button onClick={nextStep} disabled={step === 2} className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-violet-500 text-white hover:bg-violet-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm">
          Selanjutnya →
        </button>
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
