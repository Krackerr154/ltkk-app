'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import KaTeX from './KaTeX';

function OrbitalBoxes({ config }: { config: ('up' | 'down' | 'paired' | 'empty')[] }) {
  return (
    <svg viewBox="0 0 130 50" className="w-full max-w-[130px]">
      {config.map((type, i) => {
        const x = i * 40 + 5;
        return (
          <g key={i}>
            <rect x={x} y="2" width="30" height="42" rx="4" fill="white" stroke="#94a3b8" strokeWidth="1.5" />
            {(type === 'up' || type === 'paired') && (
              <>
                <line x1={x + 12} y1="36" x2={x + 12} y2="12" stroke="#1e40af" strokeWidth="2.5" strokeLinecap="round" />
                <polygon points={`${x + 12},8 ${x + 9},14 ${x + 15},14`} fill="#1e40af" />
              </>
            )}
            {(type === 'down' || type === 'paired') && (
              <>
                <line x1={x + 20} y1="10" x2={x + 20} y2="36" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />
                <polygon points={`${x + 20},40 ${x + 17},34 ${x + 23},34`} fill="#dc2626" />
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export default function SpinOrbitCouplingViz() {
  const [step, setStep] = useState(0);

  const nextStep = () => setStep(s => Math.min(s + 1, 2));
  const prevStep = () => setStep(s => Math.max(s - 1, 0));

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-sm space-y-4">
      <h5 className="text-sm font-bold text-gray-800 flex items-center gap-2">🌀 Visualisasi Spin-Orbit Coupling</h5>

      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2">
        {[0, 1, 2].map(i => (
          <button
            key={i}
            onClick={() => setStep(i)}
            className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${
              step === i
                ? 'bg-violet-500 text-white scale-110 shadow-md'
                : 'bg-gray-100 text-gray-500 hover:bg-violet-100'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* State boxes — stacks vertically on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {/* Ground State */}
        <div className="p-4 rounded-xl bg-sky-50 border border-sky-200">
          <h4 className="text-xs font-bold text-sky-700 uppercase tracking-wider mb-1">Keadaan Dasar</h4>
          <p className="text-base font-bold text-sky-900 mb-3">
            <KaTeX math="^4A_{2g}" /> <span className="text-sm font-normal text-sky-600">(S = 3/2)</span>
          </p>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 font-medium">t₂g:</span>
            <OrbitalBoxes config={['up', 'up', 'up']} />
          </div>
          <p className="text-[11px] text-sky-600 mt-2">e_g: kosong</p>
          <p className="text-xs text-sky-700 font-semibold mt-1">3 elektron ↑↑↑ semua paralel</p>
        </div>

        {/* Excited State */}
        <div
          className={`p-4 rounded-xl border transition-colors duration-500 ${
            step >= 2
              ? 'bg-violet-50 border-violet-200'
              : 'bg-red-50 border-red-200'
          }`}
        >
          <h4 className={`text-xs font-bold uppercase tracking-wider mb-1 transition-colors ${
            step >= 2 ? 'text-violet-700' : 'text-red-700'
          }`}>
            Keadaan Tereksitasi
          </h4>
          <p className={`text-base font-bold mb-3 transition-colors ${
            step >= 2 ? 'text-violet-900' : 'text-red-900'
          }`}>
            <KaTeX math="^2E_g" /> <span className={`text-sm font-normal ${step >= 2 ? 'text-violet-600' : 'text-red-600'}`}>(S = 1/2)</span>
          </p>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 font-medium">t₂g:</span>
            <OrbitalBoxes config={['paired', 'up', 'empty']} />
          </div>
          <p className="text-[11px] text-gray-500 mt-2">e_g: kosong</p>
          <p className={`text-xs font-semibold mt-1 transition-colors ${
            step >= 2 ? 'text-violet-700' : 'text-red-700'
          }`}>
            {step >= 2 ? '↑↓↑ + sedikit karakter ↑↑↑' : '↑↓ + ↑ (ada spin berlawanan!)'}
          </p>
        </div>
      </div>

      {/* Transition indicator between states */}
      {step >= 1 && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center"
          >
            {step === 1 ? (
              <div className="px-4 py-2.5 bg-red-50 border border-red-200 rounded-xl text-center max-w-md">
                <p className="text-sm font-bold text-red-700">❌ Transisi DILARANG — Aturan Spin</p>
                <p className="text-xs text-red-600 mt-1">
                  <KaTeX math="\Delta S = |3/2 - 1/2| = 1 \neq 0" /> → spin harus berubah → integral = 0
                </p>
              </div>
            ) : (
              <div className="px-4 py-2.5 bg-violet-50 border border-violet-200 rounded-xl text-center max-w-md">
                <p className="text-sm font-bold text-violet-700">🌀 Spin-Orbit Coupling AKTIF</p>
                <p className="text-xs text-violet-600 mt-1">
                  Momentum orbit (L) berinteraksi dengan spin (S) → state tercampur
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Step 2: SOC explanation panels */}
      {step >= 2 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-4"
        >
          <div className="p-4 bg-violet-50/50 rounded-xl border border-violet-100">
            <h5 className="text-sm font-bold text-violet-800 mb-3 text-center">
              Mengapa momentum orbit (L) berinteraksi dengan spin (S)?
            </h5>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Panel 1: Orbital motion */}
              <div className="bg-white rounded-xl border border-violet-100 p-4">
                <p className="text-xs font-bold text-sky-700 mb-2">① Elektron mengorbit inti</p>
                <div className="flex justify-center mb-2">
                  <svg viewBox="0 0 160 120" className="w-full max-w-[160px]">
                    {/* Nucleus */}
                    <circle cx="80" cy="60" r="10" fill="#1e40af" stroke="#1e3a8a" strokeWidth="1.5" />
                    <text x="80" y="64" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">+</text>
                    {/* Orbit */}
                    <ellipse cx="80" cy="60" rx="55" ry="30" fill="none" stroke="#93c5fd" strokeWidth="1.5" strokeDasharray="3,2" />
                    {/* Orbiting electron */}
                    <g>
                      <circle r="7" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1" />
                      <text y="3" textAnchor="middle" fontSize="6" fill="white" fontWeight="bold">e⁻</text>
                      <animateMotion dur="2.5s" repeatCount="indefinite" path="M 135,60 A 55,30 0 0,1 25,60 A 55,30 0 0,1 135,60" />
                    </g>
                    {/* μ_L arrow */}
                    <line x1="80" y1="30" x2="80" y2="14" stroke="#0ea5e9" strokeWidth="2.5" strokeLinecap="round" />
                    <polygon points="80,11 77,17 83,17" fill="#0ea5e9" />
                    <text x="95" y="18" fontSize="9" fontWeight="bold" fill="#0ea5e9">μ_L</text>
                    {/* Field lines */}
                    <path d="M 65 24 Q 80 32 95 24" fill="none" stroke="#93c5fd" strokeWidth="1" strokeDasharray="2,2">
                      <animate attributeName="stroke-dashoffset" from="0" to="-8" dur="1s" repeatCount="indefinite" />
                    </path>
                  </svg>
                </div>
                <p className="text-[11px] text-gray-600 text-center">Gerakan orbit → medan magnet (B_L)</p>
              </div>

              {/* Panel 2: Spin motion */}
              <div className="bg-white rounded-xl border border-violet-100 p-4">
                <p className="text-xs font-bold text-red-700 mb-2">② Elektron berputar (spin)</p>
                <div className="flex justify-center mb-2">
                  <svg viewBox="0 0 140 140" className="w-full max-w-[140px]">
                    {/* Spin axis (vertical dashed line) */}
                    <line x1="70" y1="12" x2="70" y2="128" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="4,3" />

                    {/* Electron sphere */}
                    <circle cx="70" cy="72" r="22" fill="#fecaca" stroke="#ef4444" strokeWidth="2" />
                    <circle cx="63" cy="65" r="4" fill="white" fillOpacity="0.4" />
                    <text x="70" y="77" textAnchor="middle" fontSize="13" fill="#dc2626" fontWeight="bold">e⁻</text>

                    {/* Rotation ring (tilted ellipse around electron — gives 3D spin feel) */}
                    <ellipse cx="70" cy="72" rx="30" ry="10" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="6,4" transform="rotate(-15 70 72)">
                      <animate attributeName="stroke-dashoffset" from="0" to="-40" dur="0.8s" repeatCount="indefinite" />
                    </ellipse>

                    {/* Curved spin-direction arrow (wrapping around top) */}
                    <path d="M 52 55 A 22 14 -15 0 1 88 55" fill="none" stroke="#ef4444" strokeWidth="2" />
                    <polygon points="88,55 83,50 82,58" fill="#ef4444" />

                    {/* μ_S arrow pointing up from axis */}
                    <line x1="70" y1="40" x2="70" y2="18" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
                    <polygon points="70,14 66,22 74,22" fill="#ef4444" />
                    <text x="86" y="20" fontSize="10" fontWeight="bold" fill="#ef4444">μ_S</text>

                    {/* Axis labels */}
                    <text x="70" y="138" textAnchor="middle" fontSize="8" fill="#94a3b8">sumbu spin</text>
                  </svg>
                </div>
                <p className="text-[11px] text-gray-600 text-center">Putaran spin → medan magnet (B_S)</p>
              </div>
            </div>

            {/* Coupling indicator — styled connectors */}
            <div className="flex items-center justify-center gap-2 my-3">
              <div className="flex items-center gap-1.5 px-2 py-1 bg-sky-100 rounded-lg">
                <span className="text-xs font-bold text-sky-700">μ_L</span>
                <svg viewBox="0 0 8 8" className="w-2 h-2"><circle cx="4" cy="4" r="3" fill="#0ea5e9" /></svg>
              </div>
              <div className="flex items-center gap-1">
                <svg viewBox="0 0 60 12" className="w-12 h-3">
                  <line x1="0" y1="6" x2="60" y2="6" stroke="#a855f7" strokeWidth="2" strokeDasharray="4,3">
                    <animate attributeName="stroke-dashoffset" from="0" to="-14" dur="1s" repeatCount="indefinite" />
                  </line>
                  <polygon points="56,6 50,3 50,9" fill="#a855f7" />
                  <polygon points="4,6 10,3 10,9" fill="#a855f7" />
                </svg>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 bg-red-100 rounded-lg">
                <svg viewBox="0 0 8 8" className="w-2 h-2"><circle cx="4" cy="4" r="3" fill="#ef4444" /></svg>
                <span className="text-xs font-bold text-red-700">μ_S</span>
              </div>
            </div>
            <p className="text-center text-xs font-semibold text-violet-700 -mt-1 mb-2">Kedua medan magnet saling berinteraksi!</p>

            {/* Summary */}
            <div className="p-3 sm:p-4 bg-violet-100/70 rounded-xl border border-violet-200">
              <p className="text-xs font-bold text-violet-800 mb-1">
                Hasil: Kedua medan magnet saling berinteraksi (<KaTeX math="\xi \cdot L \cdot S" />)
              </p>
              <p className="text-xs text-violet-700">
                Akibatnya, keadaan spin &quot;murni&quot; (S=1/2) tercampur dengan karakter S=3/2
              </p>
              <p className="text-xs font-bold text-violet-800 mt-1">
                → Integral overlap spin ≠ 0 → transisi sangat lemah tapi teramati
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Intensity bar */}
      <div className="space-y-1">
        <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
          <div
            className={`h-full rounded-full transition-all duration-800 ${
              step >= 2 ? 'bg-violet-400 w-[5%]' : 'w-0'
            }`}
          />
        </div>
        <p className="text-xs text-gray-500 text-center">
          {step >= 2
            ? 'ε ≈ 0.01–1 L mol⁻¹cm⁻¹ (sangat lemah, tapi teramati!)'
            : step >= 1
              ? 'ε = 0 (dilarang total)'
              : 'Klik langkah untuk mulai'}
        </p>
        <p className="text-[11px] text-gray-400 text-center">
          {step === 0
            ? 'Langkah 1: Amati konfigurasi elektron kedua keadaan'
            : step === 1
              ? 'Langkah 2: Transisi dilarang karena ΔS ≠ 0'
              : 'Langkah 3: SOC mencampur keadaan → transisi sangat lemah terjadi'}
        </p>
      </div>

      {/* Navigation */}
      <div className="flex justify-center gap-3">
        <button
          onClick={prevStep}
          disabled={step === 0}
          className="px-4 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          ← Sebelumnya
        </button>
        <button
          onClick={nextStep}
          disabled={step === 2}
          className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-violet-500 text-white hover:bg-violet-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
        >
          Selanjutnya →
        </button>
      </div>
    </div>
  );
}
