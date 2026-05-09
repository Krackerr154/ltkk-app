'use client';

import React, { useState } from 'react';
import { FiChevronLeft as ChevronLeft, FiChevronRight as ChevronRight, FiDroplet as Droplet } from 'react-icons/fi';
import { FaThermometerHalf as Thermometer } from 'react-icons/fa';

const steps = [
  {
    title: 'Pelarutan CrCl₃',
    description: 'Timbang 5 g CrCl₃·6H₂O dan masukkan ke cawan penguapan. Larutkan dalam 5 mL air sambil diaduk.',
    visualState: 'prep'
  },
  {
    title: 'Penambahan HCl & Urea',
    description: 'Tambahkan 6–8 tetes HCl 0,5 M dan 7 g urea ke dalam larutan, aduk perlahan hingga larut.',
    visualState: 'addReagents'
  },
  {
    title: 'Penguapan',
    description: 'Uapkan campuran di atas penangas minyak sambil diaduk hingga terbentuk pasta padat.',
    visualState: 'evaporate'
  },
  {
    title: 'Penyaringan Panas',
    description: 'Larutkan pasta dalam 8 mL air hangat (50 °C), lalu saring dengan corong Buchner yang sudah dipanaskan.',
    note: 'Jangan bilas residu!',
    visualState: 'hotFilter'
  },
  {
    title: 'Kristalisasi',
    description: 'Pindahkan filtrat ke gelas kimia, diamkan 30 menit. Goreskan dinding gelas jika perlu, lalu rendam dalam penangas es 30 menit.',
    visualState: 'crystallize'
  },
  {
    title: 'Penyaringan Akhir',
    description: 'Saring kristal dengan corong Buchner. Jangan bilas dengan air dingin. Keringkan di udara dan timbang rendemennya.',
    note: 'Jangan bilas kristal!',
    visualState: 'finalFilter'
  }
];

export default function UreaSynthesisProcedure() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };
  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const activeStep = steps[currentStep];

  return (
    <div className="bg-white border border-teal-100 rounded-xl overflow-hidden shadow-sm my-6">
      <div className="bg-teal-50 px-4 py-3 border-b border-teal-100 flex items-center justify-between">
        <h3 className="font-semibold text-teal-800 text-sm flex items-center gap-2">
          <Droplet className="w-4 h-4" />
          Metode Praktikum
        </h3>
        <span className="text-xs font-medium text-teal-600 bg-teal-100 px-2 py-1 rounded-full">
          Langkah {currentStep + 1} / {steps.length}
        </span>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Visualization Area */}
        <div className="md:w-1/2 p-3 sm:p-6 flex items-center justify-center bg-gray-50/50 border-b md:border-b-0 md:border-r border-gray-100 min-h-[250px] md:min-h-[300px] overflow-hidden">
          <ProcedureVisual visualState={activeStep.visualState} />
        </div>

        {/* Content Area */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <h4 className="text-lg font-bold text-gray-800 mb-2">{activeStep.title}</h4>
            <p className="text-sm text-gray-600 leading-relaxed">{activeStep.description}</p>
            {/* @ts-ignore */}
            {activeStep.note && (
              <div className="mt-4 inline-flex items-center px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium shadow-sm">
                <span className="mr-2 text-sm">⚠️</span> {activeStep.note}
              </div>
            )}
          </div>

          <div className="mt-8 flex items-center justify-between pt-4 border-t border-gray-100">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className={`flex items-center gap-1 px-2 sm:px-3 py-1.5 text-sm font-medium rounded-lg transition-colors shrink-0 ${currentStep === 0
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-teal-700 hover:bg-teal-50'
                }`}
            >
              <ChevronLeft className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">Sebelumnya</span>
            </button>

            <div className="flex gap-1.5 flex-wrap justify-center px-2">
              {steps.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentStep(idx)}
                  className={`h-2 rounded-full transition-all shrink-0 ${idx === currentStep ? 'bg-teal-500 w-4' : 'bg-gray-200 hover:bg-teal-200 w-2'
                    }`}
                  aria-label={`Go to step ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={currentStep === steps.length - 1}
              className={`flex items-center gap-1 px-2 sm:px-3 py-1.5 text-sm font-medium rounded-lg transition-colors shrink-0 ${currentStep === steps.length - 1
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-white bg-teal-600 hover:bg-teal-700 shadow-sm'
                }`}
            >
              <span className="hidden sm:inline">Selanjutnya</span>
              <ChevronRight className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Visual component ── */
function ProcedureVisual({ visualState }: { visualState: string }) {

  /* Evaporating dish SVG helper */
  const EvaporatingDish = ({ children, showStirRod = false, stirRodAnimClass = '', className = '' }: { children?: React.ReactNode, showStirRod?: boolean, stirRodAnimClass?: string, className?: string }) => (
    <svg viewBox="0 0 120 76" className={`w-32 sm:w-40 ${className}`} fill="none">
      <defs>
        {/* Clip path for liquid volume to match inner bowl */}
        <clipPath id="bowl-inner">
          <path d="M 7 30 C 7 73, 113 73, 113 30 Z" />
        </clipPath>
        {/* Glass rod gradient */}
        <linearGradient id="glass-rod" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="40%" stopColor="#f8fafc" />
          <stop offset="60%" stopColor="#f1f5f9" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>
      </defs>

      {/* Spout */}
      <path d="M 5 30 Q -2 22 10 21" fill="#f9fafb" stroke="#9ca3af" strokeWidth="2" strokeLinejoin="round" />

      {/* Outer bowl body */}
      <path d="M 5 30 C 5 75, 115 75, 115 30 Z" fill="#fcfcfc" stroke="#9ca3af" strokeWidth="2" />

      {/* Inner bowl opening */}
      <ellipse cx="60" cy="30" rx="55" ry="15" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="2" />
      <ellipse cx="60" cy="30" rx="53" ry="13" fill="#f3f4f6" stroke="none" />

      {/* Submerged part of stir rod (behind liquid, tip at bottom of bowl) */}
      {showStirRod && (
        <g className={stirRodAnimClass} style={{ transformOrigin: '68px 36px' }}>
          <line x1="45" y1="65" x2="68" y2="36" stroke="url(#glass-rod)" strokeWidth="5" strokeLinecap="round" opacity="0.5" />
        </g>
      )}

      {/* Liquid layers go here */}
      <g clipPath="url(#bowl-inner)">
        {children}
      </g>

      {/* Exposed part of stir rod (above liquid, leaning over the right rim) */}
      {showStirRod && (
        <g className={stirRodAnimClass} style={{ transformOrigin: '68px 36px' }}>
          <line x1="68" y1="36" x2="98" y2="8" stroke="url(#glass-rod)" strokeWidth="5" strokeLinecap="round" />
          <line x1="68" y1="36" x2="98" y2="8" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
        </g>
      )}
    </svg>
  );

  let content: React.ReactNode = null;

  switch (visualState) {
    case 'prep':
      content = (
        <div className="flex flex-col items-center relative scale-[0.9] sm:scale-100 origin-bottom">
          {/* Label */}
          <div className="inset-x-0 flex justify-center mb-2 opacity-0 animate-[ureafadeIn_1s_0.5s_forwards]">
            <div className="text-[10px] sm:text-xs bg-white px-2 sm:px-3 py-1 rounded shadow-sm border border-gray-100 text-gray-700 font-medium text-center">
              CrCl₃·6H₂O (5 g) + Air (5 mL)
            </div>
          </div>

          {/* Powder falling into dish */}
          <div className="relative w-12 h-16 flex flex-wrap justify-center gap-1 opacity-0 animate-[ureadropPowder_2s_1s_forwards] z-10">
            <div className="w-2.5 h-2.5 bg-emerald-700/90 rounded-sm rotate-12"></div>
            <div className="w-2 h-2 bg-teal-800/90 rounded-sm -rotate-6"></div>
            <div className="w-3 h-2.5 bg-emerald-600/90 rounded-sm rotate-45 mt-1"></div>
            <div className="w-2 h-2 bg-emerald-800/90 rounded-sm rotate-12"></div>
            <div className="w-2.5 h-3 bg-teal-700/90 rounded-sm -rotate-12 mt-1"></div>
          </div>

          {/* Water drops */}
          <div className="absolute top-12 left-1/2 -translate-x-4 w-6 flex flex-col items-center opacity-0 animate-[ureadropLiquid_1.5s_2.5s_forwards] z-10">
            <div className="w-1.5 h-4 bg-cyan-200/80 rounded-full"></div>
            <div className="w-1 h-2 bg-cyan-300/80 rounded-full mt-1"></div>
            <div className="w-1.5 h-3 bg-cyan-200/80 rounded-full mt-2"></div>
          </div>

          {/* Evaporating dish with solution forming */}
          <div className="relative mt-2">
            <EvaporatingDish
              showStirRod={true}
              stirRodAnimClass="opacity-0 animate-[ureastirRodPrepSVG_3s_3.5s_forwards]"
            >
              {/* Resting solids (powder) - larger */}
              <g className="opacity-0 animate-[ureafadeIn_0.5s_2.2s_forwards]">
                <ellipse cx="60" cy="65" rx="28" ry="10" fill="#047857" />
                <ellipse cx="45" cy="62" rx="18" ry="6" fill="#065f46" />
                <ellipse cx="75" cy="66" rx="20" ry="8" fill="#059669" />
                <ellipse cx="62" cy="58" rx="16" ry="5" fill="#064e3b" />
              </g>

              {/* Cloudy water filling */}
              <g className="animate-[ureafillCloudy_2s_3s_forwards]" opacity="0">
                <rect x="0" y="45" width="120" height="40" fill="#6ee7b7" opacity="0.75" />
                <ellipse cx="60" cy="45" rx="44" ry="12" fill="#34d399" opacity="0.85" />
              </g>
            </EvaporatingDish>
          </div>

          {/* Label: cloudy slurry */}
          <div className="mt-3 opacity-0 animate-[ureafadeIn_1s_4.5s_forwards]">
            <p className="text-[10px] text-gray-500 font-medium">Campuran keruh (slurry)</p>
          </div>
        </div>
      );
      break;

    case 'addReagents':
      content = (
        <div className="flex flex-col items-center relative scale-[0.9] sm:scale-100 origin-bottom">
          {/* HCl label */}
          <div className="inset-x-0 flex justify-center mb-1 opacity-0 animate-[ureafadeInOut_2.5s_0.5s_forwards]">
            <div className="text-[10px] sm:text-xs bg-yellow-50 px-2 sm:px-3 py-1 rounded shadow-sm border border-yellow-200 text-yellow-800 font-medium text-center">
              <Droplet className="w-3 h-3 inline mr-1" />HCl 0,5 M (6–8 tetes)
            </div>
          </div>
          {/* Urea label */}
          <div className="inset-x-0 flex justify-center mb-1 opacity-0 animate-[ureafadeInOut_3s_3.5s_forwards]">
            <div className="text-[10px] sm:text-xs bg-white px-2 sm:px-3 py-1 rounded shadow-sm border border-gray-200 text-gray-700 font-medium text-center">
              Urea CO(NH₂)₂ (7 g)
            </div>
          </div>

          {/* HCl drops */}
          <div className="relative h-10 w-6 z-10">
            <div className="absolute w-1.5 h-2 bg-yellow-400/80 rounded-full opacity-0"
              style={{ animation: 'ureadropLiquid 0.6s ease-in 0.5s 3 forwards' }}></div>
            {/* Urea powder */}
            <div className="absolute w-8 -left-1 h-8 flex flex-wrap justify-center gap-0.5 opacity-0 animate-[ureadropPowder_1.5s_3.5s_forwards]">
              <div className="w-2 h-2 bg-white border border-gray-300 rounded-sm"></div>
              <div className="w-1.5 h-1.5 bg-white border border-gray-300 rounded-sm"></div>
              <div className="w-2 h-2 bg-white border border-gray-300 rounded-sm"></div>
            </div>
          </div>

          {/* Dish with solution */}
          <div className="relative mt-2">
            <EvaporatingDish
              showStirRod={true}
              stirRodAnimClass="animate-[ureastirRodSVG_3s_0s_infinite]"
            >
              {/* Resting solids dissolving */}
              <g className="animate-[ureaFadeOut_2s_1.5s_forwards]">
                <ellipse cx="60" cy="65" rx="28" ry="10" fill="#047857" />
                <ellipse cx="45" cy="62" rx="18" ry="6" fill="#065f46" />
                <ellipse cx="75" cy="66" rx="20" ry="8" fill="#059669" />
                <ellipse cx="62" cy="58" rx="16" ry="5" fill="#064e3b" />
              </g>

              {/* Cloudy water fading out */}
              <g className="animate-[ureaFadeOut_2s_1.5s_forwards]">
                <rect x="0" y="45" width="120" height="40" fill="#6ee7b7" opacity="0.75" />
                <ellipse cx="60" cy="45" rx="44" ry="12" fill="#34d399" opacity="0.85" />
              </g>

              {/* Dark green solution fading in */}
              <g className="opacity-0 animate-[ureafadeIn_2s_1.5s_forwards]">
                <rect x="0" y="45" width="120" height="40" fill="#166534" opacity="0.9" />
                <ellipse cx="60" cy="45" rx="44" ry="12" fill="#14532d" opacity="0.9" />
              </g>
            </EvaporatingDish>
          </div>

          <div className="mt-3 opacity-0 animate-[ureafadeIn_1s_5.5s_forwards]">
            <p className="text-[10px] text-gray-500 font-medium">Aduk hingga larut sempurna</p>
          </div>
        </div>
      );
      break;

    case 'evaporate':
      content = (
        <div className="flex flex-col items-center mt-4 h-56 justify-end relative scale-[0.9] sm:scale-100 origin-bottom">
          {/* Labels */}
          <div className="absolute top-0 inset-x-0 flex justify-center z-50">
            <div className="text-[10px] sm:text-xs bg-white px-2 sm:px-3 py-1 rounded shadow-sm border border-gray-100 text-gray-700 font-medium text-center opacity-0 animate-[ureafadeInOut_5s_0.5s_forwards]">
              Uapkan sambil diaduk
            </div>
          </div>
          <div className="absolute top-0 inset-x-0 flex justify-center z-50">
            <div className="text-[10px] sm:text-xs bg-amber-50 px-2 sm:px-3 py-1 rounded shadow-sm border border-amber-200 text-amber-800 font-medium text-center opacity-0 animate-[ureafadeIn_1s_6s_forwards]">
              Pasta padat terbentuk ✓
            </div>
          </div>

          {/* Steam particles */}
          <div className="absolute top-8 w-20 flex justify-center gap-2 z-20">
            <div className="w-1.5 h-1.5 bg-gray-200 rounded-full opacity-0" style={{ animation: 'ureaSteam 2s ease-out 1s infinite' }}></div>
            <div className="w-2 h-2 bg-gray-200 rounded-full opacity-0" style={{ animation: 'ureaSteam 2s ease-out 1.5s infinite' }}></div>
            <div className="w-1.5 h-1.5 bg-gray-200 rounded-full opacity-0" style={{ animation: 'ureaSteam 2s ease-out 2s infinite' }}></div>
          </div>

          {/* Oil bath beaker with dish inside */}
          <div className="relative flex flex-col items-center z-10">
            <div className="relative w-36 sm:w-44 h-20 border-2 border-t-0 border-gray-300 rounded-b-xl bg-gray-50 shadow-inner flex items-end justify-center">
              {/* Oil */}
              <div className="w-full h-8 bg-amber-100/60 absolute bottom-0 rounded-b-[10px] border-t border-amber-200"></div>
              {/* Dish inside oil bath */}
              <div className="absolute -bottom-4 z-10 flex justify-center">
                <EvaporatingDish className="w-24 sm:w-28 drop-shadow-sm"
                  showStirRod={true}
                  stirRodAnimClass="animate-[ureastirRodSVG_3s_0s_infinite]"
                >
                  <g className="animate-[ureaEvapToPasteGroup_7s_forwards]">
                    <rect x="0" y="45" width="120" height="40" fill="currentColor" />
                    <ellipse cx="60" cy="45" rx="44" ry="12" fill="currentColor" style={{ filter: 'brightness(0.8)' }} />
                  </g>
                </EvaporatingDish>
              </div>
            </div>
            {/* Hotplate */}
            <div className="w-36 sm:w-44 h-6 sm:h-8 bg-gray-200 rounded-lg border-b-4 border-gray-300 flex items-center justify-around px-4 shadow-sm -mt-px">
              <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.7)]"></div>
              <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-green-400"></div>
            </div>
          </div>
        </div>
      );
      break;

    case 'hotFilter':
      content = (
        <div className="flex flex-col items-center mt-4 h-64 justify-end relative scale-[0.9] sm:scale-100 origin-bottom">
          {/* Labels */}
          <div className="absolute top-0 inset-x-0 flex justify-center z-50 opacity-0 animate-[ureafadeInOut_3s_0.5s_forwards]">
            <div className="text-[10px] sm:text-xs bg-blue-50 px-2 sm:px-3 py-1 rounded shadow-sm border border-blue-200 text-blue-800 font-medium text-center">
              Tambahkan 10 mL air hangat
            </div>
          </div>
          <div className="absolute top-0 inset-x-0 flex justify-center z-50 opacity-0 animate-[ureafadeInOut_3s_3.5s_forwards]">
            <div className="text-[10px] sm:text-xs bg-gray-50 px-2 sm:px-3 py-1 rounded shadow-sm border border-gray-200 text-gray-700 font-medium text-center">
              Aduk hingga larut
            </div>
          </div>
          <div className="absolute top-0 inset-x-0 flex justify-center z-50 opacity-0 animate-[ureafadeIn_1s_7s_forwards]">
            <div className="text-[10px] sm:text-xs bg-orange-50 px-2 sm:px-3 py-1 rounded shadow-sm border border-orange-200 text-orange-800 font-medium text-center">
              Saring selagi hangat (Corong Buchner 70°C)
            </div>
          </div>

          <div className="relative w-full flex justify-center items-end" style={{ height: '220px' }}>

            {/* Phase 1: Dissolving the Paste */}
            <div className="absolute inset-x-0 bottom-4 flex justify-center opacity-100 animate-[ureaFadeOut_1s_6s_forwards]">
              <div className="relative">
                <EvaporatingDish className="w-28 sm:w-36 drop-shadow-sm"
                  showStirRod={true}
                  stirRodAnimClass="opacity-0 animate-[ureastirRodPrepSVG_3s_3s_forwards]"
                >
                  {/* The Paste */}
                  <g className="animate-[ureaFadeOut_2s_3.5s_forwards]">
                    <rect x="0" y="45" width="120" height="40" fill="#14532d" />
                    <ellipse cx="60" cy="45" rx="44" ry="12" fill="#14532d" style={{ filter: 'brightness(0.8)' }} />
                  </g>

                  {/* Warm water filling */}
                  <g className="opacity-0 animate-[ureafillCloudy_2s_1.5s_forwards]">
                    <rect x="0" y="45" width="120" height="40" fill="#38bdf8" opacity="0.3" />
                    <ellipse cx="60" cy="45" rx="44" ry="12" fill="#38bdf8" opacity="0.4" />
                  </g>

                  {/* Dissolved Solution */}
                  <g className="opacity-0 animate-[ureafadeIn_2s_3.5s_forwards]">
                    <rect x="0" y="45" width="120" height="40" fill="#166534" opacity="0.9" />
                    <ellipse cx="60" cy="45" rx="44" ry="12" fill="#14532d" opacity="0.9" />
                  </g>
                </EvaporatingDish>
                <style>{`
                  @keyframes ureaPourFlaskRight {
                    0% { opacity: 0; transform: translate(-20px, -20px) rotate(0deg); }
                    10% { opacity: 1; transform: translate(0, 0) rotate(45deg); }
                    80% { opacity: 1; transform: translate(0, 0) rotate(45deg); }
                    100% { opacity: 0; transform: translate(-20px, -20px) rotate(0deg); }
                  }
                `}</style>
                {/* Warm water pouring from a flask */}
                <div className="absolute top-[-40px] left-[-20px] sm:left-[-30px] z-40 opacity-0 origin-bottom-right" style={{ animation: 'ureaPourFlaskRight 3s ease-out 1s forwards' }}>
                  <svg viewBox="0 0 40 55" className="w-8 sm:w-10 h-12 sm:h-14">
                    <path d="M12 16 L8 42 Q8 48 14 48 L26 48 Q32 48 32 42 L28 16" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
                    <line x1="14" y1="4" x2="26" y2="4" stroke="#94a3b8" strokeWidth="1.5" />
                    <path d="M14 4 L14 16 M26 4 L26 16" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
                    <path d="M10 30 L8 42 Q8 48 14 48 L26 48 Q32 48 32 42 L30 30 Z" fill="#38bdf8" opacity="0.4" />
                  </svg>
                </div>
                {/* Water Stream */}
                <div className="absolute top-[0px] left-[30px] sm:left-[40px] w-1.5 h-[50px] bg-sky-300/50 z-30 opacity-0 animate-[ureaLiquidStream_3s_1.5s_forwards] origin-top"></div>
              </div>
            </div>

            {/* Phase 2: Buchner Funnel */}
            <div className="absolute inset-x-0 bottom-0 flex justify-center opacity-0 animate-[ureafadeIn_1s_7s_forwards]">
              <div className="relative">
                {/* Pouring dark green solution into Buchner */}
                <div className="absolute top-[-40px] right-[-30px] sm:right-[-40px] z-40 opacity-0 animate-[ureaPourFlask_5s_8s_forwards] origin-bottom-left">
                  <svg viewBox="0 0 40 55" className="w-10 sm:w-12 h-14 sm:h-16">
                    <path d="M12 16 L8 42 Q8 48 14 48 L26 48 Q32 48 32 42 L28 16" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
                    <line x1="14" y1="4" x2="26" y2="4" stroke="#94a3b8" strokeWidth="1.5" />
                    <path d="M14 4 L14 16 M26 4 L26 16" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
                    <path d="M10 30 L8 42 Q8 48 14 48 L26 48 Q32 48 32 42 L30 30 Z" fill="#166534" opacity="0.9" />
                  </svg>
                </div>
                {/* Liquid stream (Dark green) */}
                <div className="absolute top-[10px] right-[5px] sm:right-[10px] w-1.5 h-[50px] bg-green-800/80 z-30 opacity-0 animate-[ureaLiquidStream_4s_8.5s_forwards] origin-top"></div>

                {/* Buchner funnel assembly */}
                <svg viewBox="0 0 140 190" className="w-28 sm:w-36 h-[160px] sm:h-[190px]" style={{ overflow: 'visible' }}>
                  {/* Heat glow around funnel */}
                  <ellipse cx="70" cy="30" rx="55" ry="16" fill="#fef3c7" opacity="0" className="animate-[ureaHeatGlow_10s_forwards]" />
                  {/* Funnel bowl */}
                  <path d="M20 10 L15 38 L125 38 L120 10 Z" fill="white" stroke="#9ca3af" strokeWidth="2" />
                  <line x1="15" y1="38" x2="125" y2="38" stroke="#9ca3af" strokeWidth="2" />
                  {/* Filter paper */}
                  <rect x="22" y="32" width="96" height="3" fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="0.5" rx="1" />
                  {/* Filtrate pooling (Dark green) */}
                  <rect x="18" y="28" width="104" height="8" fill="#166534" opacity="0" rx="1" className="animate-[ureaFillDrain_4s_9s_forwards]" />
                  {/* Funnel stem */}
                  <rect x="62" y="38" width="16" height="18" fill="white" stroke="#9ca3af" strokeWidth="2" />
                  {/* Drips (Dark green) */}
                  <circle cx="70" cy="46" r="2" fill="#15803d" opacity="0" className="animate-[ureaStemDrip_0.8s_9.5s_5_forwards]" />
                  {/* Rubber adapter */}
                  <rect x="58" y="55" width="24" height="5" fill="#374151" rx="2" />
                  {/* Filter flask */}
                  <rect x="60" y="59" width="20" height="16" fill="white" stroke="#94a3b8" strokeWidth="2" />
                  <path d="M60 75 L34 150 Q30 160 42 160 L98 160 Q110 160 106 150 L80 75" fill="white" stroke="#94a3b8" strokeWidth="2" />
                  {/* Side arm */}
                  <path d="M80 67 L108 58" fill="none" stroke="#94a3b8" strokeWidth="2" />
                  <path d="M108 58 L122 58" fill="none" stroke="#94a3b8" strokeWidth="2" />
                  <circle cx="125" cy="58" r="3" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
                  {/* Filtrate collecting (Dark green) */}
                  <path d="M40 142 L34 150 Q30 160 42 160 L98 160 Q110 160 106 150 L100 142 Z" fill="#166534" opacity="0" className="animate-[ureaFiltrateCollect_4s_10s_forwards]" />
                  <text x="122" y="52" fill="#9ca3af" fontSize="7" fontFamily="sans-serif">vakum</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      );
      break;

    case 'crystallize':
      content = (
        <div className="flex flex-col items-center mt-4 h-56 justify-end relative scale-[0.9] sm:scale-100 origin-bottom">
          {/* Labels */}
          <div className="absolute top-0 inset-x-0 z-50">
            <div className="text-[10px] sm:text-xs bg-white px-2 sm:px-3 py-1 rounded shadow-sm border border-gray-100 text-gray-700 font-medium absolute top-0 left-1/2 -translate-x-1/2 text-center opacity-0 animate-[ureafadeInOut_6s_0.5s_forwards]">
              Diamkan 30 menit
            </div>
            <div className="text-[10px] sm:text-xs bg-gray-50 px-2 sm:px-3 py-1 rounded shadow-sm border border-gray-200 text-gray-700 font-medium absolute top-0 left-1/2 -translate-x-1/2 text-center opacity-0 animate-[ureafadeInOut_4s_7s_forwards]">
              Goreskan dinding gelas
            </div>
            <div className="text-[10px] sm:text-xs bg-cyan-50 px-2 sm:px-3 py-1 rounded shadow-sm border border-cyan-200 text-cyan-800 font-medium absolute top-0 left-1/2 -translate-x-1/2 text-center opacity-0 animate-[ureafadeIn_1s_12s_forwards]">
              Penangas es 30 menit
            </div>
          </div>

          <div className="relative flex justify-center items-end w-full" style={{ height: '200px' }}>
            {/* Ice bath slides in */}
            <div className="absolute bottom-0 left-1/2 -translate-x-12 sm:-translate-x-14 w-36 sm:w-44 h-16 sm:h-20 border-2 border-t-0 border-cyan-200 rounded-b-2xl bg-cyan-100/40 shadow-inner opacity-0 animate-[ureaIceBath_18s_forwards]">
              <div className="absolute inset-0 opacity-50 overflow-hidden rounded-b-2xl">
                <div className="absolute bottom-1 left-4 w-5 h-5 bg-white border border-cyan-100 rounded rotate-12"></div>
                <div className="absolute bottom-2 right-5 w-6 h-6 bg-white border border-cyan-100 rounded -rotate-6"></div>
                <div className="absolute bottom-1 left-14 w-4 h-4 bg-white border border-cyan-100 rounded rotate-45"></div>
              </div>
            </div>

            {/* Beaker */}
            <div className="absolute bottom-0 left-1/2 -translate-x-12 sm:-translate-x-14 z-20 animate-[ureaBeakerLift_18s_forwards]">
              <div className="relative">
                {/* Glass rod scratching */}
                <div className="absolute -top-6 -right-2 w-0.5 h-14 bg-gray-400 rounded-full z-30 opacity-0 animate-[ureaScratch_4s_7.5s_forwards] origin-bottom"></div>
                {/* Beaker body */}
                <div className="relative w-20 sm:w-24 h-24 sm:h-28 border-2 border-t-0 border-gray-300 rounded-b-lg bg-white/60 shadow-inner">
                  {/* Solution */}
                  <div className="w-full h-12 sm:h-14 absolute bottom-0 rounded-b-md border-t border-green-200 bg-green-100/70 animate-[ureaCrystSolution_18s_forwards]"></div>
                  {/* Crystals growing */}
                  <div className="absolute bottom-1 inset-x-0 flex flex-wrap justify-center gap-0.5 px-2 opacity-0 animate-[ureafadeIn_3s_9s_forwards]">
                    <div className="w-2 h-2 bg-green-600/80 rotate-12"></div>
                    <div className="w-2.5 h-2.5 bg-green-700/70 -rotate-6"></div>
                    <div className="w-2 h-2.5 bg-green-500/80 rotate-45"></div>
                    <div className="w-2.5 h-2 bg-green-600/70 rotate-12"></div>
                  </div>
                  {/* More crystals after ice bath */}
                  <div className="absolute bottom-1 inset-x-0 flex flex-wrap justify-center gap-0.5 px-1 opacity-0 animate-[ureafadeIn_3s_14s_forwards]">
                    <div className="w-1.5 h-1.5 bg-green-700/80 -rotate-12"></div>
                    <div className="w-2 h-2 bg-green-600/70 rotate-30"></div>
                    <div className="w-2 h-2 bg-green-500/80 rotate-12"></div>
                    <div className="w-2.5 h-2.5 bg-green-700/80 -rotate-6"></div>
                    <div className="w-1.5 h-2 bg-green-600/70 rotate-45"></div>
                    <div className="w-2 h-1.5 bg-green-500/80 -rotate-12"></div>
                  </div>
                  {/* Spout */}
                  <div className="absolute top-0 left-0 w-3 h-1 bg-gray-300 rounded-br"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="w-40 sm:w-52 h-2 bg-slate-200 rounded-full shadow-sm"></div>
        </div>
      );
      break;

    case 'finalFilter':
      content = (
        <div className="flex flex-col items-center mt-4 h-56 justify-end relative scale-[0.9] sm:scale-100 origin-bottom">
          {/* Labels */}
          <div className="absolute top-0 inset-x-0 z-50">
            <div className="text-[10px] sm:text-xs bg-white px-2 sm:px-3 py-1 rounded shadow-sm border border-gray-100 text-gray-700 font-medium absolute top-0 left-1/2 -translate-x-1/2 text-center opacity-0 animate-[ureafadeInOut_5s_0.5s_forwards]">
              Saring dengan corong Buchner
            </div>
            <div className="text-[10px] sm:text-xs bg-green-50 px-2 sm:px-3 py-1 rounded shadow-sm border border-green-200 text-green-800 font-medium absolute top-0 left-1/2 -translate-x-1/2 text-center opacity-0 animate-[ureafadeIn_1s_6s_forwards]">
              Keringkan di udara terbuka
            </div>
          </div>

          <div className="relative flex justify-center items-end" style={{ height: '190px' }}>
            {/* Pouring beaker */}
            <div className="absolute left-4 sm:left-6 top-0 z-40 opacity-0 animate-[ureaPourFlask_7s_1s_forwards] origin-bottom-right">
              <svg viewBox="0 0 40 50" className="w-8 sm:w-10 h-10 sm:h-12">
                <path d="M8 10 L8 40 Q8 46 14 46 L26 46 Q32 46 32 40 L32 10" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
                <path d="M10 28 L8 40 Q8 46 14 46 L26 46 Q32 46 32 40 L30 28 Z" fill="#dcfce7" opacity="0.6" />
                <rect x="12" y="40" width="4" height="3" fill="#16a34a" opacity="0.7" rx="0.5" transform="rotate(15 14 41)" />
                <rect x="20" y="41" width="3" height="3" fill="#15803d" opacity="0.7" rx="0.5" transform="rotate(-10 21 42)" />
              </svg>
            </div>
            <div className="absolute left-12 sm:left-[60px] top-8 w-0.5 h-5 bg-green-200/50 z-30 opacity-0 animate-[ureaLiquidStream_7s_1s_forwards] origin-top"></div>

            {/* Buchner funnel */}
            <svg viewBox="0 0 140 190" className="w-28 sm:w-36 h-[160px] sm:h-[190px]" style={{ overflow: 'visible' }}>
              {/* Funnel bowl */}
              <path d="M20 10 L15 38 L125 38 L120 10 Z" fill="white" stroke="#9ca3af" strokeWidth="2" />
              <line x1="15" y1="38" x2="125" y2="38" stroke="#9ca3af" strokeWidth="2" />
              <rect x="22" y="32" width="96" height="3" fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="0.5" rx="1" />
              {/* Crystals on filter */}
              <g className="opacity-0 animate-[ureafadeIn_3s_4s_forwards]">
                <rect x="38" y="27" width="5" height="4" fill="#16a34a" opacity="0.8" rx="0.5" transform="rotate(15 40 29)" />
                <rect x="50" y="26" width="6" height="5" fill="#15803d" opacity="0.7" rx="0.5" transform="rotate(-8 53 28)" />
                <rect x="62" y="27" width="5" height="5" fill="#16a34a" opacity="0.8" rx="0.5" transform="rotate(30 64 29)" />
                <rect x="74" y="26" width="5" height="4" fill="#166534" opacity="0.7" rx="0.5" transform="rotate(-15 76 28)" />
                <rect x="86" y="27" width="4" height="5" fill="#15803d" opacity="0.8" rx="0.5" transform="rotate(40 88 29)" />
              </g>
              {/* Liquid pooling */}
              <rect x="18" y="28" width="104" height="8" fill="#dcfce7" opacity="0" rx="1" className="animate-[ureaFillDrain_6s_2s_forwards]" />
              {/* Stem */}
              <rect x="62" y="38" width="16" height="18" fill="white" stroke="#9ca3af" strokeWidth="2" />
              <circle cx="70" cy="46" r="2" fill="#86efac" opacity="0" className="animate-[ureaStemDrip_0.8s_3s_6_forwards]" />
              {/* Adapter */}
              <rect x="58" y="55" width="24" height="5" fill="#374151" rx="2" />
              {/* Flask */}
              <rect x="60" y="59" width="20" height="16" fill="white" stroke="#94a3b8" strokeWidth="2" />
              <path d="M60 75 L34 150 Q30 160 42 160 L98 160 Q110 160 106 150 L80 75" fill="white" stroke="#94a3b8" strokeWidth="2" />
              <path d="M80 67 L108 58" fill="none" stroke="#94a3b8" strokeWidth="2" />
              <path d="M108 58 L122 58" fill="none" stroke="#94a3b8" strokeWidth="2" />
              <circle cx="125" cy="58" r="3" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
              <path d="M40 142 L34 150 Q30 160 42 160 L98 160 Q110 160 106 150 L100 142 Z" fill="#dcfce7" opacity="0" className="animate-[ureaFiltrateCollect_6s_3.5s_forwards]" />
              <text x="122" y="52" fill="#9ca3af" fontSize="7" fontFamily="sans-serif">vakum</text>
            </svg>
          </div>
        </div>
      );
      break;

    default:
      content = null;
  }

  return (
    <>
      <style jsx>{`
        @keyframes ureafadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes ureafadeInOut {
          0% { opacity: 0; transform: translateY(8px); }
          15%, 85% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-8px); }
        }
        @keyframes ureadropPowder {
          0% { opacity: 0; transform: translateY(-8px); }
          20% { opacity: 0.9; }
          80% { opacity: 0.9; transform: translateY(20px); }
          100% { opacity: 0; transform: translateY(28px); }
        }
        @keyframes ureadropLiquid {
          0% { opacity: 0; transform: translateY(0) scale(0.5); }
          10% { opacity: 1; transform: translateY(6px) scale(1); }
          80% { opacity: 1; transform: translateY(50px) scale(0.8); }
          100% { opacity: 0; transform: translateY(60px) scale(0); }
        }
        @keyframes ureaRestingPowder {
          0% { opacity: 0; }
          10% { opacity: 1; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes ureafillCloudy {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes ureafillSolution {
          0% { opacity: 0; }
          100% { opacity: 0.9; }
        }
        @keyframes ureaFadeOut {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes ureastirRodSVG {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(15deg); }
        }
        @keyframes ureastirRodPrepSVG {
          0% { opacity: 0; transform: rotate(0deg); }
          10% { opacity: 1; transform: rotate(0deg); }
          50% { opacity: 1; transform: rotate(15deg); }
          100% { opacity: 1; transform: rotate(0deg); }
        }
        @keyframes ureaSteam {
          0% { opacity: 0; transform: translateY(0) scale(0.5); }
          30% { opacity: 0.6; transform: translateY(-10px) scale(1); }
          100% { opacity: 0; transform: translateY(-30px) scale(1.5); }
        }
        @keyframes ureaEvapToPasteGroup {
          0%, 30% { color: #166534; transform: translateY(0) scale(1); opacity: 0.9; }
          60% { color: #15803d; transform: translateY(10px) scale(0.95); opacity: 0.95; }
          100% { color: #4d7c0f; transform: translateY(20px) scale(0.9); opacity: 1; }
        }
        @keyframes ureaHeatGlow {
          0% { opacity: 0; }
          20%, 80% { opacity: 0.35; }
          100% { opacity: 0; }
        }
        @keyframes ureaPourFlask {
          0% { opacity: 0; transform: translateX(-10px) rotate(0deg); }
          15% { opacity: 1; transform: translateX(0) rotate(0deg); }
          25%, 75% { transform: translateX(0) rotate(30deg); opacity: 1; }
          90% { transform: translateX(0) rotate(0deg); opacity: 0.5; }
          100% { transform: translateX(-10px) rotate(0deg); opacity: 0; }
        }
        @keyframes ureaLiquidStream {
          0%, 20% { opacity: 0; transform: scaleY(0); }
          25% { opacity: 0.7; transform: scaleY(1); }
          75% { opacity: 0.7; transform: scaleY(1); }
          85%, 100% { opacity: 0; transform: scaleY(0); }
        }
        @keyframes ureaFillDrain {
          0% { opacity: 0; height: 0; }
          20% { opacity: 0.5; height: 16px; }
          50% { opacity: 0.3; height: 10px; }
          80% { opacity: 0.15; height: 4px; }
          100% { opacity: 0; height: 0; }
        }
        @keyframes ureaStemDrip {
          0% { opacity: 0; transform: translateY(0); }
          15% { opacity: 1; }
          100% { opacity: 0; transform: translateY(24px); }
        }
        @keyframes ureaFiltrateCollect {
          0% { opacity: 0; }
          30% { opacity: 0.15; }
          60% { opacity: 0.3; }
          100% { opacity: 0.5; }
        }
        @keyframes ureaIceBath {
          0%, 60% { transform: translateX(calc(-50% - 100px)); opacity: 0; }
          64% { opacity: 1; }
          68% { transform: translateX(-50%); opacity: 1; }
          100% { transform: translateX(-50%); opacity: 1; }
        }
        @keyframes ureaBeakerLift {
          0%, 8% { transform: translateX(-50%) translateY(0); }
          55% { transform: translateX(-50%) translateY(0); }
          60% { transform: translateX(-50%) translateY(-40px); }
          65% { transform: translateX(-50%) translateY(-40px); }
          70% { transform: translateX(-50%) translateY(0); }
          100% { transform: translateX(-50%) translateY(0); }
        }
        @keyframes ureaScratch {
          0% { opacity: 0; transform: rotate(-15deg); }
          10% { opacity: 1; transform: rotate(-15deg); }
          25% { transform: rotate(-25deg); }
          50% { transform: rotate(-10deg); }
          75% { transform: rotate(-25deg); }
          90% { opacity: 1; transform: rotate(-15deg); }
          100% { opacity: 0; transform: rotate(-15deg); }
        }
        @keyframes ureaCrystSolution {
          0%, 60% { background-color: rgba(220,252,231,0.7); }
          100% { background-color: rgba(220,252,231,0.4); }
        }
      `}</style>
      {content}
    </>
  );
}
