'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import KaTeX from './KaTeX';

type Phase = 'overview' | 'detail' | 'comparison';

export default function TransitionTypesExplorer() {
  const [activePhase, setActivePhase] = useState<Phase>('overview');

  return (
    <div className="space-y-6">
      {/* Tabs Navigation */}
      <div className="flex flex-wrap justify-center p-1 bg-gray-100/80 backdrop-blur-sm rounded-xl max-w-fit mx-auto shadow-inner border border-gray-200/60">
        <button
          onClick={() => setActivePhase('overview')}
          className={`px-3 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
            activePhase === 'overview'
              ? 'bg-white text-sky-600 shadow-sm ring-1 ring-black/5'
              : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
          }`}
        >
          🔍 Ringkasan
        </button>
        <button
          onClick={() => setActivePhase('detail')}
          className={`px-3 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
            activePhase === 'detail'
              ? 'bg-white text-sky-600 shadow-sm ring-1 ring-black/5'
              : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
          }`}
        >
          🎯 Detail per Transisi
        </button>
        <button
          onClick={() => setActivePhase('comparison')}
          className={`px-3 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
            activePhase === 'comparison'
              ? 'bg-white text-sky-600 shadow-sm ring-1 ring-black/5'
              : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
          }`}
        >
          📊 Perbandingan
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activePhase === 'overview' && <Phase1Overview key="overview" />}
        {activePhase === 'detail' && <Phase2Detail key="detail" />}
        {activePhase === 'comparison' && <Phase3Comparison key="comparison" />}
      </AnimatePresence>
    </div>
  );
}

function Phase1Overview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6"
    >
      <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 lg:p-8 shadow-sm">
        <p className="text-sm text-gray-600 mb-6 text-center max-w-2xl mx-auto leading-relaxed">
          Secara umum, terdapat empat jenis transisi elektronik utama pada kompleks logam transisi.
          Intensitas warna suatu kompleks sangat bergantung pada jenis transisi yang terjadi.
        </p>

        {/* Overview SVG Diagram */}
        <div className="relative overflow-x-auto bg-slate-50/50 rounded-xl border border-slate-100 p-4">
          <svg viewBox="0 0 880 420" className="w-full min-w-[600px] mx-auto font-sans" xmlns="http://www.w3.org/2000/svg">
            {/* Title */}
            <text x="440" y="28" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#1e293b">Diagram Energi Relatif — Jenis Transisi Elektronik</text>

            {/* Vertical energy axis */}
            <line x1="45" y1="355" x2="45" y2="55" stroke="#cbd5e1" strokeWidth="1.5" />
            <polygon points="45,50 40,60 50,60" fill="#cbd5e1" />
            <text x="38" y="200" fontSize="11" fill="#94a3b8" textAnchor="middle" transform="rotate(-90 38,200)">Energi</text>

            {/* Horizontal baseline */}
            <line x1="60" y1="355" x2="840" y2="355" stroke="#e2e8f0" strokeWidth="1.5" />

            {/* Faint grid lines */}
            <line x1="60" y1="265" x2="840" y2="265" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4,4" />
            <line x1="60" y1="175" x2="840" y2="175" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4,4" />
            <line x1="60" y1="85" x2="840" y2="85" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4,4" />

            {/* Column separators */}
            <line x1="265" y1="50" x2="265" y2="365" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="465" y1="50" x2="465" y2="365" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="665" y1="50" x2="665" y2="365" stroke="#f1f5f9" strokeWidth="1" />

            {/* --- 1. d-d Transition (x=160) --- */}
            <g transform="translate(160, 0)">
              {/* Label pill */}
              <rect x="-35" y="370" width="70" height="22" rx="11" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1" />
              <text x="0" y="385" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#2563eb">d-d</text>

              {/* t2g level */}
              <line x1="-25" y1="290" x2="25" y2="290" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
              <text x="35" y="294" fontSize="11" fill="#64748b">t₂g</text>

              {/* eg level */}
              <line x1="-25" y1="210" x2="25" y2="210" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
              <text x="35" y="214" fontSize="11" fill="#64748b">eg</text>

              {/* Arrow */}
              <path d="M 0 285 Q -22 248 0 215" fill="none" stroke="#2563eb" strokeWidth="2.5" markerEnd="url(#arrowBlue)" />

              {/* Intensity label */}
              <rect x="-40" y="240" width="35" height="16" rx="3" fill="#dbeafe" />
              <text x="-23" y="251" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1d4ed8">Lemah</text>
            </g>

            {/* --- 2. LMCT (x=360) --- */}
            <g transform="translate(360, 0)">
              <rect x="-35" y="370" width="70" height="22" rx="11" fill="#fffbeb" stroke="#fde68a" strokeWidth="1" />
              <text x="0" y="385" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#d97706">LMCT</text>

              {/* Ligand orbital */}
              <line x1="-25" y1="325" x2="25" y2="325" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
              <text x="35" y="329" fontSize="11" fill="#92400e">L (π/σ)</text>

              {/* Metal orbital */}
              <line x1="-25" y1="145" x2="25" y2="145" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
              <text x="35" y="149" fontSize="11" fill="#64748b">M (d)</text>

              {/* Arrow */}
              <path d="M 0 320 Q -35 235 0 150" fill="none" stroke="#d97706" strokeWidth="2.5" markerEnd="url(#arrowAmber)" />

              {/* Intensity label */}
              <rect x="-65" y="228" width="55" height="16" rx="3" fill="#fef3c7" />
              <text x="-38" y="239" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#92400e">Sangat Kuat</text>
            </g>

            {/* --- 3. MLCT (x=560) --- */}
            <g transform="translate(560, 0)">
              <rect x="-35" y="370" width="70" height="22" rx="11" fill="#f5f3ff" stroke="#ddd6fe" strokeWidth="1" />
              <text x="0" y="385" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#7c3aed">MLCT</text>

              {/* Metal orbital */}
              <line x1="-25" y1="260" x2="25" y2="260" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
              <text x="35" y="264" fontSize="11" fill="#64748b">M (d)</text>

              {/* Ligand π* */}
              <line x1="-25" y1="110" x2="25" y2="110" stroke="#8b5cf6" strokeWidth="4" strokeLinecap="round" />
              <text x="35" y="114" fontSize="11" fill="#64748b">L (π*)</text>

              {/* Arrow */}
              <path d="M 0 255 Q -35 185 0 115" fill="none" stroke="#7c3aed" strokeWidth="2.5" markerEnd="url(#arrowPurple)" />

              {/* Intensity label */}
              <rect x="-65" y="178" width="55" height="16" rx="3" fill="#ede9fe" />
              <text x="-38" y="189" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#5b21b6">Sangat Kuat</text>
            </g>

            {/* --- 4. Intraligand (x=760) --- */}
            <g transform="translate(760, 0)">
              <rect x="-45" y="370" width="90" height="22" rx="11" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="1" />
              <text x="0" y="385" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#059669">Intraligand</text>

              {/* Filled ligand orbital */}
              <line x1="-25" y1="310" x2="25" y2="310" stroke="#10b981" strokeWidth="4" strokeLinecap="round" />
              <text x="35" y="314" fontSize="11" fill="#64748b">L (π/n)</text>

              {/* Empty ligand orbital */}
              <line x1="-25" y1="75" x2="25" y2="75" stroke="#10b981" strokeWidth="4" strokeLinecap="round" />
              <text x="35" y="79" fontSize="11" fill="#64748b">L (π*)</text>

              {/* Arrow */}
              <path d="M 0 305 Q -40 192 0 80" fill="none" stroke="#059669" strokeWidth="2.5" markerEnd="url(#arrowEmerald)" />

              {/* Intensity label */}
              <rect x="-55" y="185" width="45" height="16" rx="3" fill="#d1fae5" />
              <text x="-33" y="196" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#065f46">Kuat (UV)</text>
            </g>

            {/* Arrowhead definitions */}
            <defs>
              <marker id="arrowBlue" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#2563eb" />
              </marker>
              <marker id="arrowAmber" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#d97706" />
              </marker>
              <marker id="arrowPurple" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#7c3aed" />
              </marker>
              <marker id="arrowEmerald" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#059669" />
              </marker>
            </defs>
          </svg>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex flex-col">
            <h4 className="font-bold text-blue-800 text-sm mb-1.5">1. d-d (Ligand Field)</h4>
            <p className="text-xs text-blue-700 leading-relaxed flex-1">Elektron berpindah antar orbital d logam yang terbelah oleh medan ligan. Memberi warna pucat pada kompleks oktahedral.</p>
            <span className="mt-2 text-[10px] font-mono text-blue-500">ε ≈ 1 – 200</span>
          </div>
          <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl flex flex-col">
            <h4 className="font-bold text-amber-800 text-sm mb-1.5">2. LMCT</h4>
            <p className="text-xs text-amber-700 leading-relaxed flex-1">Ligand-to-Metal Charge Transfer. Elektron pindah dari orbital ligan ke logam. Warna sangat pekat (cth: KMnO₄).</p>
            <span className="mt-2 text-[10px] font-mono text-amber-500">ε ≈ 10³ – 5×10⁴</span>
          </div>
          <div className="p-4 bg-violet-50 border border-violet-100 rounded-xl flex flex-col">
            <h4 className="font-bold text-violet-800 text-sm mb-1.5">3. MLCT</h4>
            <p className="text-xs text-violet-700 leading-relaxed flex-1">Metal-to-Ligand Charge Transfer. Elektron pindah dari logam ke orbital π* ligan kosong. Intensitas warna juga pekat.</p>
            <span className="mt-2 text-[10px] font-mono text-violet-500">ε ≈ 10³ – 5×10⁴</span>
          </div>
          <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex flex-col">
            <h4 className="font-bold text-emerald-800 text-sm mb-1.5">4. Intraligand</h4>
            <p className="text-xs text-emerald-700 leading-relaxed flex-1">Transisi terjadi di dalam ligan itu sendiri (π → π* atau n → π*). Biasanya menyerap di daerah UV.</p>
            <span className="mt-2 text-[10px] font-mono text-emerald-500">ε ≈ 10³ – 10⁵+</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Phase 2 Detail
const TRANSITION_DETAILS = [
  {
    id: 'dd',
    name: 'd-d (Ligand Field)',
    color: 'blue',
    icon: '🔵',
    description: 'Transisi elektron antara orbital d pada logam transisi yang terbelah akibat medan ligan. Transisi ini yang paling sering diamati pada kompleks Cr(III).',
    rules: 'Secara teoritis dilarang oleh Aturan Laporte (karena g → g), namun tetap terjadi berkat efek vibronic coupling.',
    epsilon: '1 – 200',
    intensityLabel: 'Lemah',
    example: '[Cr(H₂O)₆]³⁺ — violet-biru muda',
    diagram: (
      <svg viewBox="0 0 280 200" className="w-full">
        <rect width="280" height="200" fill="#f8fafc" rx="8" />
        {/* Energy axis */}
        <line x1="30" y1="175" x2="30" y2="25" stroke="#cbd5e1" strokeWidth="1" />
        <polygon points="30,22 27,30 33,30" fill="#cbd5e1" />
        <text x="18" y="100" fontSize="8" fill="#94a3b8" transform="rotate(-90 18,100)" textAnchor="middle">E</text>
        {/* t2g level */}
        <line x1="60" y1="150" x2="110" y2="150" stroke="#3b82f6" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="120" y1="150" x2="170" y2="150" stroke="#3b82f6" strokeWidth="3.5" strokeLinecap="round" />
        <text x="115" y="168" fontSize="10" fill="#3b82f6" textAnchor="middle" fontWeight="bold">t₂g</text>
        {/* eg level */}
        <line x1="60" y1="60" x2="110" y2="60" stroke="#ef4444" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="120" y1="60" x2="170" y2="60" stroke="#ef4444" strokeWidth="3.5" strokeLinecap="round" />
        <text x="115" y="50" fontSize="10" fill="#ef4444" textAnchor="middle" fontWeight="bold">eg</text>
        {/* Electrons */}
        <circle cx="85" cy="145" r="5" fill="#1e40af" />
        <circle cx="145" cy="145" r="5" fill="#1e40af" />
        {/* Jumping electron */}
        <circle cx="85" cy="55" r="5" fill="#1e40af" stroke="#93c5fd" strokeWidth="1.5" strokeDasharray="2,2" fillOpacity="0.4" />
        {/* Transition arrow */}
        <path d="M 85 138 Q 65 100 85 67" fill="none" stroke="#2563eb" strokeWidth="2" strokeDasharray="4,3" />
        <polygon points="85,63 81,71 89,71" fill="#2563eb" />
        {/* Photon wave */}
        <path d="M 200 130 Q 210 120 220 130 T 240 130 T 260 130" fill="none" stroke="#f59e0b" strokeWidth="2" />
        <text x="230" y="120" fontSize="9" fill="#d97706" textAnchor="middle" fontWeight="bold">hν</text>
        <polygon points="265,130 258,126 258,134" fill="#f59e0b" />
        {/* Delta bracket */}
        <line x1="190" y1="60" x2="190" y2="150" stroke="#0f766e" strokeWidth="1.5" />
        <line x1="186" y1="60" x2="194" y2="60" stroke="#0f766e" strokeWidth="1.5" />
        <line x1="186" y1="150" x2="194" y2="150" stroke="#0f766e" strokeWidth="1.5" />
        <text x="200" y="108" fontSize="11" fill="#0f766e" fontWeight="bold">Δ₀</text>
      </svg>
    )
  },
  {
    id: 'lmct',
    name: 'LMCT (Ligand → Metal CT)',
    color: 'amber',
    icon: '🟡',
    description: 'Perpindahan elektron dari orbital ligan yang terisi penuh ke orbital logam transisi yang kosong (biasanya pada tingkat oksidasi tinggi).',
    rules: 'Diperbolehkan oleh Aturan Laporte (p → d) maupun Aturan Spin, sehingga intensitasnya sangat kuat.',
    epsilon: '10³ – 5×10⁴',
    intensityLabel: 'Sangat Kuat',
    example: 'KMnO₄ — ungu sangat pekat',
    diagram: (
      <svg viewBox="0 0 280 200" className="w-full">
        <rect width="280" height="200" fill="#fffbeb" rx="8" />
        <line x1="30" y1="175" x2="30" y2="25" stroke="#fde68a" strokeWidth="1" />
        <polygon points="30,22 27,30 33,30" fill="#fde68a" />
        <text x="18" y="100" fontSize="8" fill="#d97706" transform="rotate(-90 18,100)" textAnchor="middle">E</text>
        {/* Ligand orbital */}
        <rect x="50" y="138" width="80" height="28" rx="6" fill="#fef3c7" stroke="#fcd34d" strokeWidth="1" />
        <line x1="60" y1="150" x2="120" y2="150" stroke="#f59e0b" strokeWidth="3.5" strokeLinecap="round" />
        <text x="90" y="172" fontSize="9" fill="#92400e" textAnchor="middle" fontWeight="600">Orbital Ligan (σ/π)</text>
        {/* Metal orbital */}
        <rect x="150" y="45" width="80" height="28" rx="6" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
        <line x1="160" y1="57" x2="220" y2="57" stroke="#3b82f6" strokeWidth="3.5" strokeLinecap="round" />
        <text x="190" y="38" fontSize="9" fill="#1d4ed8" textAnchor="middle" fontWeight="600">Orbital Logam (d)</text>
        {/* Electron pair in ligand */}
        <circle cx="80" cy="145" r="5" fill="#b45309" />
        <circle cx="100" cy="145" r="5" fill="#b45309" />
        {/* Ghost electron at metal */}
        <circle cx="190" cy="52" r="5" fill="#b45309" fillOpacity="0.3" stroke="#f59e0b" strokeDasharray="2,2" />
        {/* Big arrow */}
        <path d="M 95 135 Q 130 90 185 65" fill="none" stroke="#d97706" strokeWidth="2.5" />
        <polygon points="188,63 180,60 182,68" fill="#d97706" />
        {/* Photon */}
        <path d="M 45 100 Q 55 90 65 100 T 85 100" fill="none" stroke="#f59e0b" strokeWidth="2" />
        <text x="65" y="90" fontSize="9" fill="#d97706" fontWeight="bold">hν</text>
      </svg>
    )
  },
  {
    id: 'mlct',
    name: 'MLCT (Metal → Ligand CT)',
    color: 'violet',
    icon: '🟣',
    description: 'Perpindahan elektron dari orbital logam (biasanya tingkat oksidasi rendah, kaya elektron) ke orbital antibonding (π*) ligan yang kosong.',
    rules: 'Diperbolehkan penuh secara simetri dan spin, menghasilkan absorpsi yang sangat kuat.',
    epsilon: '10³ – 5×10⁴',
    intensityLabel: 'Sangat Kuat',
    example: '[Ru(bpy)₃]²⁺ — jingga/merah pekat',
    diagram: (
      <svg viewBox="0 0 280 200" className="w-full">
        <rect width="280" height="200" fill="#faf5ff" rx="8" />
        <line x1="30" y1="175" x2="30" y2="25" stroke="#ddd6fe" strokeWidth="1" />
        <polygon points="30,22 27,30 33,30" fill="#ddd6fe" />
        <text x="18" y="100" fontSize="8" fill="#7c3aed" transform="rotate(-90 18,100)" textAnchor="middle">E</text>
        {/* Metal orbital */}
        <rect x="50" y="128" width="80" height="28" rx="6" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
        <line x1="60" y1="140" x2="120" y2="140" stroke="#3b82f6" strokeWidth="3.5" strokeLinecap="round" />
        <text x="90" y="164" fontSize="9" fill="#1d4ed8" textAnchor="middle" fontWeight="600">Orbital Logam (d)</text>
        {/* Ligand π* orbital */}
        <rect x="150" y="45" width="80" height="28" rx="6" fill="#ede9fe" stroke="#c4b5fd" strokeWidth="1" />
        <line x1="160" y1="57" x2="220" y2="57" stroke="#8b5cf6" strokeWidth="3.5" strokeLinecap="round" />
        <text x="190" y="38" fontSize="9" fill="#6d28d9" textAnchor="middle" fontWeight="600">Orbital Ligan (π*)</text>
        {/* Electron in metal */}
        <circle cx="90" cy="135" r="5" fill="#5b21b6" />
        {/* Ghost at ligand */}
        <circle cx="190" cy="52" r="5" fill="#5b21b6" fillOpacity="0.3" stroke="#a78bfa" strokeDasharray="2,2" />
        {/* Arrow */}
        <path d="M 95 128 Q 130 85 185 65" fill="none" stroke="#7c3aed" strokeWidth="2.5" />
        <polygon points="188,63 180,60 182,68" fill="#7c3aed" />
        {/* Photon */}
        <path d="M 45 95 Q 55 85 65 95 T 85 95" fill="none" stroke="#a78bfa" strokeWidth="2" />
        <text x="65" y="85" fontSize="9" fill="#7c3aed" fontWeight="bold">hν</text>
      </svg>
    )
  },
  {
    id: 'intraligand',
    name: 'Intraligand (π→π* / n→π*)',
    color: 'emerald',
    icon: '🟢',
    description: 'Transisi ini terjadi seutuhnya di dalam ligan. Ligan organik sering kali memiliki absorpsi kuat di daerah UV.',
    rules: 'Mengikuti aturan pemilihan untuk molekul organik biasa. Umumnya diperbolehkan.',
    epsilon: '10³ – 10⁵+',
    intensityLabel: 'Kuat (UV)',
    example: 'Asetilaseton (acac⁻) menyerap di UV',
    diagram: (
      <svg viewBox="0 0 280 200" className="w-full">
        <rect width="280" height="200" fill="#ecfdf5" rx="8" />
        <line x1="30" y1="175" x2="30" y2="25" stroke="#a7f3d0" strokeWidth="1" />
        <polygon points="30,22 27,30 33,30" fill="#a7f3d0" />
        <text x="18" y="100" fontSize="8" fill="#059669" transform="rotate(-90 18,100)" textAnchor="middle">E</text>
        {/* Bonding orbital */}
        <rect x="80" y="128" width="120" height="28" rx="6" fill="#d1fae5" stroke="#6ee7b7" strokeWidth="1" />
        <line x1="100" y1="140" x2="180" y2="140" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" />
        <text x="140" y="164" fontSize="9" fill="#065f46" textAnchor="middle" fontWeight="600">Ligan (π atau n)</text>
        {/* Antibonding orbital */}
        <rect x="80" y="45" width="120" height="28" rx="6" fill="#d1fae5" stroke="#6ee7b7" strokeWidth="1" />
        <line x1="100" y1="57" x2="180" y2="57" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" />
        <text x="140" y="38" fontSize="9" fill="#065f46" textAnchor="middle" fontWeight="600">Ligan (π*)</text>
        {/* Electron pair */}
        <circle cx="130" cy="135" r="5" fill="#047857" />
        <circle cx="150" cy="135" r="5" fill="#047857" />
        {/* Ghost */}
        <circle cx="140" cy="52" r="5" fill="#047857" fillOpacity="0.3" stroke="#34d399" strokeDasharray="2,2" />
        {/* Arrow */}
        <path d="M 140 125 L 140 70" fill="none" stroke="#059669" strokeWidth="2.5" />
        <polygon points="140,66 136,74 144,74" fill="#059669" />
        {/* Photon */}
        <path d="M 210 120 Q 220 110 230 120 T 250 120" fill="none" stroke="#34d399" strokeWidth="2" />
        <text x="230" y="108" fontSize="9" fill="#059669" fontWeight="bold">hν (UV)</text>
      </svg>
    )
  }
];

function Phase2Detail() {
  const [activeId, setActiveId] = useState(TRANSITION_DETAILS[0].id);
  const activeDetail = TRANSITION_DETAILS.find(t => t.id === activeId)!;

  const btnStyles: Record<string, string> = {
    blue: 'border-blue-300 bg-blue-50 text-blue-800',
    amber: 'border-amber-300 bg-amber-50 text-amber-800',
    violet: 'border-violet-300 bg-violet-50 text-violet-800',
    emerald: 'border-emerald-300 bg-emerald-50 text-emerald-800',
  };
  const panelBg: Record<string, string> = {
    blue: 'bg-blue-50/60 border-blue-200',
    amber: 'bg-amber-50/60 border-amber-200',
    violet: 'bg-violet-50/60 border-violet-200',
    emerald: 'bg-emerald-50/60 border-emerald-200',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-5"
    >
      <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 shadow-sm">
        {/* Selector row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
          {TRANSITION_DETAILS.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveId(t.id)}
              className={`p-2.5 rounded-xl border-2 transition-all text-left ${
                activeId === t.id
                  ? `${btnStyles[t.color]} shadow-sm scale-[1.02]`
                  : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-200'
              }`}
            >
              <span className="text-sm">{t.icon}</span>
              <span className="text-xs font-bold ml-1.5">{t.name}</span>
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDetail.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={`rounded-2xl border-2 overflow-hidden ${panelBg[activeDetail.color]}`}
          >
            {/* Diagram — full width on top */}
            <div className="p-4 sm:p-6 flex justify-center">
              <div className="w-full max-w-sm">
                {activeDetail.diagram}
              </div>
            </div>

            {/* Info grid below */}
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 grid sm:grid-cols-2 gap-4">
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-wider opacity-60 mb-1">Deskripsi</h4>
                <p className="text-sm leading-relaxed">{activeDetail.description}</p>
              </div>
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-wider opacity-60 mb-1">Aturan Seleksi</h4>
                <p className="text-sm leading-relaxed">{activeDetail.rules}</p>
              </div>
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-wider opacity-60 mb-1">Intensitas (ε)</h4>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono bg-white/70 px-2 py-0.5 rounded border border-black/5">{activeDetail.epsilon}</span>
                  <span className="text-xs opacity-70">— {activeDetail.intensityLabel}</span>
                </div>
              </div>
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-wider opacity-60 mb-1">Contoh Khas</h4>
                <p className="text-sm italic">{activeDetail.example}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* IVCT Bonus */}
        <div className="mt-5 p-4 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <h5 className="text-xs font-bold text-gray-700 mb-1">💡 Bonus: IVCT (Intervalence Charge Transfer)</h5>
          <p className="text-xs text-gray-600 leading-relaxed">
            Perpindahan elektron antar dua pusat logam dengan tingkat oksidasi berbeda (misal: Fe²⁺ → Fe³⁺ pada <span className="italic">Prussian Blue</span>).
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function Phase3Comparison() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6"
    >
      <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 lg:p-8 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Perbandingan Spektrum & Intensitas</h3>
        <p className="text-sm text-gray-600 mb-6">
          Setiap jenis transisi elektronik cenderung muncul di daerah spektrum tertentu (UV vs Vis) dengan rentang intensitas (Absorptivitas Molar, ε) yang spesifik.
        </p>
        
        {/* Sketch of UV-Vis Spectrum */}
        <div className="mb-8 p-4 bg-gray-50 rounded-xl border border-gray-100 overflow-x-auto">
          <div className="min-w-[600px]">
            <h4 className="text-xs font-bold text-gray-500 mb-4 text-center uppercase tracking-wider">Ilustrasi Kasar Spektrum UV-Vis</h4>
            <svg viewBox="0 0 600 200" className="w-full">
              {/* Axes */}
              <line x1="40" y1="160" x2="560" y2="160" stroke="#94a3b8" strokeWidth="2" />
              <line x1="40" y1="20" x2="40" y2="160" stroke="#94a3b8" strokeWidth="2" />
              <text x="30" y="90" fontSize="12" fill="#64748b" transform="rotate(-90 30,90)" textAnchor="middle">Absorbansi (A)</text>
              <text x="300" y="190" fontSize="12" fill="#64748b" textAnchor="middle">Panjang Gelombang (λ, nm)</text>
              
              {/* Regions */}
              <rect x="40" y="20" width="200" height="140" fill="#f8fafc" />
              <rect x="240" y="20" width="320" height="140" fill="#fff" />
              <text x="140" y="15" fontSize="10" fill="#94a3b8" textAnchor="middle">UV (&lt; 400 nm)</text>
              <text x="400" y="15" fontSize="10" fill="#94a3b8" textAnchor="middle">Visible (400 - 800 nm)</text>
              
              <line x1="240" y1="20" x2="240" y2="160" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4,4" />
              
              {/* Peaks */}
              {/* Intraligand (High intensity, deep UV) */}
              <path d="M 50 160 Q 80 160 100 30 Q 120 160 150 160" fill="none" stroke="#10b981" strokeWidth="3" />
              <text x="100" y="20" fontSize="10" fill="#059669" textAnchor="middle" fontWeight="bold">Intraligand</text>
              
              {/* Charge Transfer (High intensity, UV/Vis border) */}
              <path d="M 120 160 Q 180 160 220 50 Q 260 160 320 160" fill="none" stroke="#d97706" strokeWidth="3" />
              <text x="220" y="40" fontSize="10" fill="#b45309" textAnchor="middle" fontWeight="bold">CT (LMCT/MLCT)</text>
              
              {/* d-d (Low intensity, Visible) */}
              <path d="M 300 160 Q 380 160 420 120 Q 460 160 540 160" fill="none" stroke="#3b82f6" strokeWidth="3" />
              <text x="420" y="110" fontSize="10" fill="#1d4ed8" textAnchor="middle" fontWeight="bold">d-d (Ligand Field)</text>
            </svg>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-3 px-4 text-left font-bold text-gray-700">Jenis Transisi</th>
                <th className="py-3 px-4 text-left font-bold text-gray-700">Keterangan</th>
                <th className="py-3 px-4 text-left font-bold text-gray-700">Intensitas (ε)</th>
                <th className="py-3 px-4 text-left font-bold text-gray-700">Daerah Khas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50/50">
                <td className="py-3 px-4 font-bold text-blue-700">d-d</td>
                <td className="py-3 px-4 text-gray-600">Terlarang Laporte, terjadi via vibronic coupling</td>
                <td className="py-3 px-4"><span className="px-2 py-1 bg-blue-100 text-blue-800 rounded font-mono text-xs">1 - 200</span></td>
                <td className="py-3 px-4 text-gray-600">Vis / Near-IR</td>
              </tr>
              <tr className="hover:bg-gray-50/50">
                <td className="py-3 px-4 font-bold text-amber-700">LMCT</td>
                <td className="py-3 px-4 text-gray-600">Diperbolehkan, ligan → logam</td>
                <td className="py-3 px-4"><span className="px-2 py-1 bg-amber-100 text-amber-800 rounded font-mono text-xs">10³ - 5×10⁴</span></td>
                <td className="py-3 px-4 text-gray-600">UV / Vis (Sangat Pekat)</td>
              </tr>
              <tr className="hover:bg-gray-50/50">
                <td className="py-3 px-4 font-bold text-violet-700">MLCT</td>
                <td className="py-3 px-4 text-gray-600">Diperbolehkan, logam → ligan (butuh ligan π-akseptor)</td>
                <td className="py-3 px-4"><span className="px-2 py-1 bg-violet-100 text-violet-800 rounded font-mono text-xs">10³ - 5×10⁴</span></td>
                <td className="py-3 px-4 text-gray-600">UV / Vis</td>
              </tr>
              <tr className="hover:bg-gray-50/50">
                <td className="py-3 px-4 font-bold text-emerald-700">Intraligand</td>
                <td className="py-3 px-4 text-gray-600">Diperbolehkan, dalam molekul ligan (π → π*)</td>
                <td className="py-3 px-4"><span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded font-mono text-xs">10³ - 10⁵+</span></td>
                <td className="py-3 px-4 text-gray-600">UV</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
