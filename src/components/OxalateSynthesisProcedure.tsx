'use client';

import React, { useState } from 'react';
import { FiChevronLeft as ChevronLeft, FiChevronRight as ChevronRight, FiDroplet as Droplet } from 'react-icons/fi';
import { FaThermometerHalf as Thermometer } from 'react-icons/fa';

const steps = [
  {
    title: 'Persiapan Pemanasan',
    description: 'Siapkan penangas minyak silicone dalam wadah logam (70-80 °C). Panaskan 50 mL aqua DM dalam gelas kimia 100 mL (40 °C).',
    note: 'Sudah disiapkan asisten praktikum',
    visualState: 'prep'
  },
  {
    title: 'Pelarutan Oksalat',
    description: 'Timbang 0,60 g K₂C₂O₄·H₂O dan 1,4 g H₂C₂O₄. Masukkan ke dalam labu Erlenmeyer 100 mL; tambahkan 6 mL aqua dm hangat (40 °C). Pastikan larut seluruhnya.',
    visualState: 'dissolve'
  },
  {
    title: 'Pemanasan Awal',
    description: 'Rendam larutan dalam penangas minyak (70-80°C) di atas penangas (hotplate).',
    visualState: 'heating'
  },
  {
    title: 'Reaksi Pembentukan Kompleks',
    description: 'Timbang 0,45 g padatan K₂Cr₂O₇, tambahkan perlahan ke larutan oksalat sambil diaduk dengan magnetic stirrer sampai larut. Amati perubahan warna.',
    visualState: 'reaction'
  },
  {
    title: 'Kristalisasi',
    description: 'Dinginkan pada suhu ruang, lalu masukkan penangas es dan teteskan etanol PA hingga terbentuk endapan.',
    visualState: 'cooling'
  },
  {
    title: 'Penyaringan',
    description: 'Saring kristal menggunakan corong Buchner. Cuci dengan air tetes demi tetes, keringkan di udara, dan timbang rendemennya.',
    visualState: 'filtration'
  }
];

const TemperatureCounter = ({ sequence }: { sequence: { temp: number, time: number }[] }) => {
  const [temp, setTemp] = React.useState(sequence[0].temp);
  const seqStr = JSON.stringify(sequence);

  React.useEffect(() => {
    const parsedSeq = JSON.parse(seqStr);
    let animationFrame: number;
    let startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;

      let currentIdx = 0;
      while (currentIdx < parsedSeq.length - 1 && elapsed >= parsedSeq[currentIdx + 1].time) {
        currentIdx++;
      }

      if (currentIdx >= parsedSeq.length - 1) {
        setTemp(parsedSeq[parsedSeq.length - 1].temp);
        return;
      }

      const startSegment = parsedSeq[currentIdx];
      const endSegment = parsedSeq[currentIdx + 1];
      const segmentDuration = endSegment.time - startSegment.time;
      const segmentElapsed = elapsed - startSegment.time;
      const progress = Math.min(1, segmentElapsed / segmentDuration);

      // Ease-out cubic for realistic cooling curve
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentTemp = Math.round(startSegment.temp + (endSegment.temp - startSegment.temp) * easeOut);
      setTemp(currentTemp);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(tick);
      }
    };

    animationFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrame);
  }, [seqStr]);

  return <span>{temp}</span>;
};

export default function OxalateSynthesisProcedure() {
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
      {/* Header / Progress */}
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
            <p className="text-sm text-gray-600 leading-relaxed">
              {activeStep.description}
            </p>
            {/* @ts-ignore */}
            {activeStep.note && (
              <div className="mt-4 inline-flex items-center px-3 py-1.5 rounded-lg bg-teal-50 border border-teal-100 text-teal-700 text-xs font-medium shadow-sm">
                <span className="mr-2 text-sm">💡</span> {activeStep.note}
              </div>
            )}
          </div>

          {/* Navigation Controls */}
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

function ProcedureVisual({ visualState }: { visualState: string }) {
  // Common CSS classes for drawing lab equipment
  const beakerClass = "relative w-24 h-28 border-2 border-t-0 border-blue-200 rounded-b-xl bg-white/40 shadow-inner flex items-end justify-center overflow-hidden";
  const erlenmeyerClass = "relative w-24 h-28 flex items-end justify-center";
  const ErlenmeyerFlask = ({ liquidComponent = null, className = "absolute inset-0 w-full h-full text-blue-200" }: { liquidComponent?: React.ReactNode, className?: string }) => (
    <svg className={className} viewBox="0 0 100 120" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round">
      {liquidComponent && <g stroke="none">{liquidComponent}</g>}
      <path d="M40 5 L40 30 L10 110 A 10 10 0 0 0 20 120 L80 120 A 10 10 0 0 0 90 110 L60 30 L60 5 Z" fill="rgba(255,255,255,0.4)" />
      {/* Rim */}
      <path d="M35 5 L65 5" />
    </svg>
  );

  const liquidPath = "M 21.25 80 L 10 110 A 10 10 0 0 0 20 120 L 80 120 A 10 10 0 0 0 90 110 L 78.75 80 Z";

  const hotplateClass = "w-40 h-8 bg-gray-200 rounded-lg border-b-4 border-gray-300 flex items-center justify-around px-4 shadow-sm relative z-0";
  const stirBarClass = "absolute bottom-1 w-6 h-2 bg-white rounded-full border border-gray-200 z-20 animate-[perspectiveSpin_0.2s_linear_infinite]";

  let content: React.ReactNode = null;

  switch (visualState) {
    case 'prep':
      content = (
        <div className="flex gap-3 sm:gap-6 items-end relative scale-[0.85] sm:scale-100 origin-bottom">
          {/* Oil Bath Setup */}
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center relative z-10">
              <div className={beakerClass}>
                <div className="w-full h-16 bg-amber-100/50 absolute bottom-0 border-t border-amber-200"></div>
                <div className="absolute top-4 text-[10px] font-mono text-gray-500">70°C</div>
                <Thermometer className="absolute w-4 h-12 text-red-400 left-2 bottom-2" />
              </div>
            </div>
            {/* Hotplate for Oil */}
            <div className="w-28 h-6 bg-gray-200 rounded-lg border-b-[3px] border-gray-300 flex items-center justify-around px-3 shadow-sm relative z-0">
              <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-gray-400"></div>
            </div>
            <p className="text-[10px] text-gray-500 mt-2 font-medium">Penangas Minyak</p>
          </div>

          {/* Water Bath Setup */}
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center relative z-10">
              <div className={beakerClass}>
                <div className="w-full h-12 bg-blue-50 absolute bottom-0 border-t border-blue-100"></div>
                <div className="absolute top-4 text-[10px] font-mono text-gray-500">40°C</div>
              </div>
            </div>
            {/* Hotplate for Water */}
            <div className="w-28 h-6 bg-gray-200 rounded-lg border-b-[3px] border-gray-300 flex items-center justify-around px-3 shadow-sm relative z-0">
              <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-gray-400"></div>
            </div>
            <p className="text-[10px] text-gray-500 mt-2 font-medium">Aqua DM</p>
          </div>
        </div>
      );
      break;

    case 'dissolve':
      content = (
        <div className="flex flex-col items-center relative mt-6 h-56">
          {/* Labels */}
          <div className="absolute -top-6 inset-x-0 flex justify-center opacity-0 animate-[fadeInOutCentered_2s_1s_forwards] z-20">
            <div className="text-[10px] sm:text-xs bg-white px-2 sm:px-3 py-1 rounded shadow-sm border border-gray-100 text-gray-700 font-medium text-center">
              K₂C₂O₄·H₂O (0,60 g) + H₂C₂O₄ (1,4 g)
            </div>
          </div>
          <div className="absolute -top-6 inset-x-0 flex justify-center opacity-0 animate-[fadeInOutCentered_2s_3s_forwards] z-20">
            <div className="text-[10px] sm:text-xs bg-blue-50 px-2 sm:px-3 py-1 rounded shadow-sm border border-blue-100 text-blue-700 font-medium flex items-center gap-1.5">
              <Droplet className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" /> Aqua DM hangat (6 mL)
            </div>
          </div>

          {/* Powders falling */}
          <div className="absolute top-8 w-8 h-16 flex justify-center flex-wrap gap-1 overflow-hidden z-10 opacity-0 animate-[dropPowder_2s_1s_forwards]">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-1.5 bg-gray-300 rounded-full"></div>
          </div>

          {/* Water falling */}
          <div className="absolute top-8 w-4 h-20 flex flex-col items-center overflow-hidden z-10 opacity-0 animate-[dropPowder_2s_3s_forwards]">
            <div className="w-1.5 h-5 bg-blue-200 rounded-full mb-1.5"></div>
            <div className="w-1.5 h-4 bg-blue-300 rounded-full mb-1.5"></div>
            <div className="w-1.5 h-3 bg-blue-200 rounded-full"></div>
          </div>

          <div className="relative w-32 h-40 flex items-end justify-center">
            <ErlenmeyerFlask liquidComponent={
              <>
                <path d="M 20 118 Q 50 85 80 118 Z" fill="#cbd5e1" className="opacity-0 animate-[appear_1s_1.5s_forwards]" />
                <path d={liquidPath} className="origin-bottom [transform-box:fill-box] opacity-0 animate-[fillOpaque_2s_3s_forwards]" />
              </>
            } />
            <div className="absolute bottom-3 w-7 h-2.5 bg-white rounded-full border border-gray-300 z-20 opacity-0 animate-[dropStirBar_1s_4.5s_forwards]"></div>
          </div>
        </div>
      );
      break;

    case 'heating':
      content = (
        <div className="flex flex-col items-center mt-6 h-56 justify-end">
          <div className="relative flex justify-center items-end z-10 mt-12">
            {/* Oil Bath Beaker */}
            <div className="relative w-44 h-28 border-2 border-t-0 border-gray-300 rounded-b-xl bg-gray-50 shadow-inner flex items-end justify-center">
              <div className="w-full h-10 bg-amber-100/60 absolute bottom-0 rounded-b-[10px] border-t border-amber-200 flex justify-center z-0"></div>

              {/* Erlenmeyer moving down */}
              <div className="absolute bottom-28 w-32 h-40 flex items-end justify-center z-10 animate-[dropFlask_1.5s_forwards]">
                <ErlenmeyerFlask className="absolute inset-0 w-full h-full text-blue-300" liquidComponent={
                  <>
                    <path d="M 20 118 Q 50 85 80 118 Z" fill="#cbd5e1" className="animate-[fadeOut_4s_2.5s_forwards]" />
                    <path d={liquidPath} className="animate-[clearUp_4s_2.5s_forwards]" fill="#e2e8f0" opacity="0.9" />
                  </>
                } />
                {/* Stir bar already inside */}
                <div className="absolute bottom-3 w-7 h-2.5 bg-white rounded-full border border-gray-300 z-20 animate-[perspectiveSpin_0.2s_linear_infinite]"></div>
              </div>
            </div>
          </div>
          <div className={hotplateClass}>
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
        </div>
      );
      break;

    case 'reaction':
      content = (
        <div className="flex flex-col items-center mt-6 h-56 justify-end relative">
          {/* Label */}
          <div className="absolute top-2 inset-x-0 flex justify-center opacity-0 animate-[fadeInOutCentered_9s_0.5s_forwards] z-50">
            <div className="text-[10px] sm:text-xs bg-white px-2 sm:px-3 py-1 rounded shadow-sm border border-gray-100 text-gray-700 font-medium text-center">
              Tambah perlahan K₂Cr₂O₇ (0,45 g)
            </div>
          </div>

          {/* Time Pop-up */}
          <div className="absolute top-28 inset-x-0 flex justify-center opacity-0 animate-[fadeInOutCentered_2.5s_9.5s_forwards] z-50">
            <div className="text-[10px] sm:text-xs bg-yellow-50 px-2 sm:px-3 py-1.5 rounded-full shadow-sm border border-yellow-200 text-yellow-800 font-medium flex items-center gap-1.5">
              ⏳ Sekitar 30 menit
            </div>
          </div>

          <div className="relative flex justify-center items-end z-10 mt-12">
            {/* Powder Drops */}
            <div className="absolute -top-12 w-8 flex justify-center z-30 opacity-0 animate-[dropDichromate_1.5s_1s_forwards]">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            </div>
            <div className="absolute -top-12 w-8 flex justify-center z-30 opacity-0 animate-[dropDichromate_1.5s_3s_forwards]">
              <div className="w-2.5 h-2 bg-orange-500 rounded-full ml-3"></div>
            </div>
            <div className="absolute -top-12 w-8 flex justify-center z-30 opacity-0 animate-[dropDichromate_1.5s_5s_forwards]">
              <div className="w-2 h-2.5 bg-orange-500 rounded-full mr-3"></div>
            </div>
            <div className="absolute -top-12 w-8 flex justify-center z-30 opacity-0 animate-[dropDichromate_1.5s_7s_forwards]">
              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
            </div>

            {/* Bubbles */}
            <div className="absolute top-[60px] w-12 flex justify-center gap-1.5 z-20 opacity-0 animate-[bubbleRise_1s_2.2s_forwards]">
              <div className="w-1.5 h-1.5 border border-white bg-white/40 rounded-full mt-1"></div>
              <div className="w-2 h-2 border border-white bg-white/40 rounded-full"></div>
              <div className="w-1 h-1 border border-white bg-white/40 rounded-full mt-0.5"></div>
            </div>
            <div className="absolute top-[60px] w-12 flex justify-center gap-1 z-20 opacity-0 animate-[bubbleRise_1s_4.2s_forwards]">
              <div className="w-2 h-2 border border-white bg-white/40 rounded-full ml-2"></div>
              <div className="w-1.5 h-1.5 border border-white bg-white/40 rounded-full mt-1"></div>
            </div>
            <div className="absolute top-[60px] w-12 flex justify-center gap-1.5 z-20 opacity-0 animate-[bubbleRise_1s_6.2s_forwards]">
              <div className="w-1 h-1 border border-white bg-white/40 rounded-full mt-0.5"></div>
              <div className="w-2 h-2 border border-white bg-white/40 rounded-full mr-2"></div>
              <div className="w-1.5 h-1.5 border border-white bg-white/40 rounded-full mt-1"></div>
            </div>
            <div className="absolute top-[60px] w-12 flex justify-center gap-1 z-20 opacity-0 animate-[bubbleRise_1s_8.2s_forwards]">
              <div className="w-2 h-2 border border-white bg-white/40 rounded-full"></div>
              <div className="w-1 h-1 border border-white bg-white/40 rounded-full mt-1"></div>
            </div>

            {/* Oil Bath Beaker */}
            <div className="relative w-44 h-28 border-2 border-t-0 border-gray-300 rounded-b-xl bg-gray-50 shadow-inner flex items-end justify-center">
              <div className="w-full h-10 bg-amber-100/60 absolute bottom-0 rounded-b-[10px] border-t border-amber-200 flex justify-center z-0"></div>

              {/* Erlenmeyer inside */}
              <div className="absolute bottom-0.5 w-32 h-40 flex items-end justify-center z-10">
                <ErlenmeyerFlask className="absolute inset-0 w-full h-full text-blue-300" liquidComponent={
                  <path d={liquidPath} className="animate-[complexFormation_9s_forwards]" fill="#eff6ff" opacity="0.8" />
                } />
                {/* Stir bar */}
                <div className="absolute bottom-3 w-7 h-2.5 bg-white rounded-full border border-gray-300 z-20 animate-[perspectiveSpin_0.2s_linear_60_forwards]"></div>
              </div>
            </div>
          </div>
          <div className={hotplateClass}>
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
        </div>
      );
      break;

    case 'cooling':
      content = (
        <div className="flex flex-col items-center mt-6 h-56 justify-end relative">
          {/* Action Labels */}
          <div className="absolute top-2 inset-x-0 z-50">
            <div className="text-[10px] sm:text-xs bg-white px-2 sm:px-3 py-1 rounded shadow-sm border border-gray-100 text-gray-700 font-medium absolute top-0 left-1/2 -translate-x-1/2 text-center opacity-0 animate-[fadeInOut_8s_0.5s_forwards]">
              Diamkan di suhu ruang
            </div>
            <div className="text-[10px] sm:text-xs bg-cyan-50 px-2 sm:px-3 py-1 rounded shadow-sm border border-cyan-200 text-cyan-800 font-medium absolute top-0 left-1/2 -translate-x-1/2 text-center opacity-0 animate-[fadeInOut_7s_8.5s_forwards]">
              Rendam dalam penangas es
            </div>
            <div className="text-[10px] sm:text-xs bg-purple-50 px-2 sm:px-3 py-1 rounded shadow-sm border border-purple-200 text-purple-800 font-medium absolute top-0 left-1/2 -translate-x-1/2 text-center opacity-0 animate-[appear_1s_19s_forwards]">
              Teteskan etanol PA
            </div>
          </div>

          {/* Container for flask + ice bath positioned above table */}
          <div className="relative flex justify-center items-end w-full" style={{ height: '200px' }}>

            {/* Ice Bath - slides in then slides out */}
            <div className="absolute bottom-0 left-1/2 w-40 sm:w-48 h-20 sm:h-24 border-2 border-t-0 border-cyan-200 rounded-b-2xl bg-cyan-100/40 shadow-inner opacity-0 animate-[iceBathLifeCycle_25s_forwards] -translate-x-12 sm:-translate-x-14">
              <div className="absolute inset-0 opacity-60 z-0 overflow-hidden rounded-b-2xl">
                <div className="absolute bottom-2 left-4 sm:left-6 w-6 sm:w-8 h-6 sm:h-8 bg-white border border-cyan-100 rounded rotate-12"></div>
                <div className="absolute bottom-3 sm:bottom-4 right-6 sm:right-8 w-8 sm:w-10 h-8 sm:h-10 bg-white border border-cyan-100 rounded -rotate-6"></div>
                <div className="absolute bottom-2 sm:bottom-3 left-12 sm:left-16 w-5 sm:w-7 h-5 sm:h-7 bg-white border border-cyan-100 rounded rotate-45"></div>
                <div className="absolute bottom-4 sm:bottom-5 right-12 sm:right-16 w-5 sm:w-6 h-5 sm:h-6 bg-white border border-cyan-100 rounded rotate-12"></div>
              </div>
            </div>

            {/* Flask group - moves independently */}
            <div className="absolute bottom-0 left-1/2 -translate-x-12 sm:-translate-x-14 flex justify-center items-end z-30 animate-[flaskLifeCycle_25s_forwards]">
              {/* Ethanol Pipette */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-0 animate-[dropPipette_6s_19s_forwards] z-30">
                <div className="w-2.5 h-12 bg-white/60 border border-gray-400 rounded-t-full rounded-b-sm flex justify-center items-end pb-0.5 overflow-hidden">
                  <div className="w-full bg-purple-300/80 rounded-b-sm origin-bottom" style={{ animation: 'pipetteEmpty 5.5s linear 19.5s forwards', height: '100%' }}></div>
                </div>
                <div className="w-0.5 h-2 bg-gray-400 mt-[1px]"></div>
                {/* Drops */}
                <div className="absolute -bottom-2 w-1.5 h-2 bg-purple-400/80 rounded-full opacity-0" style={{ animation: 'dropLiquid 1.2s ease-in 19.5s 5 forwards' }}></div>
              </div>

              {/* Erlenmeyer */}
              <div className="relative w-24 sm:w-32 h-32 sm:h-40 flex items-end justify-center z-10">
                <ErlenmeyerFlask liquidComponent={
                  <path d={liquidPath} fill="#294524" opacity="1" className="animate-[solutionColorChange_25s_forwards]" />
                } />
                {/* Crystals forming - bluish green */}
                <div className="absolute bottom-2 w-[70%] h-10 z-0 flex flex-wrap items-end justify-center pb-1 gap-1 opacity-0 animate-[appear_4s_21s_forwards]">
                  <div className="w-2.5 h-2.5 bg-teal-500/90 rotate-45"></div>
                  <div className="w-3 h-3 bg-cyan-700/80 rotate-12"></div>
                  <div className="w-2.5 h-3 bg-teal-600/90 rotate-180"></div>
                  <div className="w-3 h-2.5 bg-cyan-600/80 -rotate-12"></div>
                  <div className="w-2 h-2 bg-teal-400/90 rotate-45"></div>
                  <div className="w-3.5 h-3 bg-cyan-800/80 rotate-90"></div>
                </div>
                {/* Stir bar stopped */}
                <div className="absolute bottom-3 w-7 h-2.5 bg-white rounded-full border border-gray-300 z-20"></div>
              </div>
            </div>

            {/* Thermometer - stationary, independent of flask */}
            <div className="absolute bottom-2 right-2 sm:right-4 flex flex-col items-center opacity-0 animate-[appear_1s_2s_forwards] z-40">
              <div className="relative w-2.5 sm:w-3 h-12 sm:h-16 bg-white rounded-t-full border-2 border-b-0 border-gray-300 flex items-end p-[1px] z-10">
                <div className="w-full rounded-t-full origin-bottom animate-[coolDownBar_16s_forwards]" style={{ height: '90%' }}></div>
              </div>
              <div className="w-4 sm:w-5 h-4 sm:h-5 rounded-full border-2 border-gray-300 z-20 relative -mt-1 flex items-center justify-center animate-[coolDownColor_16s_forwards]">
                <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white rounded-full absolute top-0.5 right-0.5 opacity-40"></div>
              </div>

              {/* Thermometer Labels */}
              <div className="absolute top-2 sm:top-4 right-0 sm:right-auto sm:left-6 z-30">
                <div className="text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded shadow-sm border font-medium absolute top-0 right-0 sm:right-auto sm:left-0 animate-[coolDownText_16s_forwards]">
                  Suhu: ~<TemperatureCounter sequence={[
                    { temp: 70, time: 0 },
                    { temp: 70, time: 3000 },
                    { temp: 25, time: 7000 },
                    { temp: 25, time: 11000 },
                    { temp: 5, time: 16000 }
                  ]} />°C
                </div>
              </div>
            </div>
          </div>

          {/* Table Surface */}
          <div className="w-44 sm:w-56 h-2 bg-slate-200 rounded-full mt-1 shadow-sm relative z-0"></div>
        </div>
      );
      break;

    case 'filtration':
      content = (
        <div className="flex flex-col items-center mt-6 h-56 justify-end relative">
          {/* Action Labels */}
          <div className="absolute top-2 inset-x-0 z-50">
            <div className="text-[10px] sm:text-xs bg-white px-2 sm:px-3 py-1 rounded shadow-sm border border-gray-100 text-gray-700 font-medium absolute top-0 left-1/2 -translate-x-1/2 text-center opacity-0 animate-[fadeInOut_6s_0.5s_forwards]">
              Saring dengan corong Buchner
            </div>
            <div className="text-[10px] sm:text-xs bg-teal-50 px-2 sm:px-3 py-1 rounded shadow-sm border border-teal-200 text-teal-800 font-medium absolute top-0 left-1/2 -translate-x-1/2 text-center opacity-0 animate-[appear_1s_7s_forwards]">
              Cuci kristal &amp; keringkan
            </div>
          </div>

          <div className="relative flex justify-center items-end" style={{ height: '190px' }}>
            {/* Pouring Flask - tilts to pour */}
            <div className="absolute -left-2 -top-2 z-40 opacity-0 animate-[pourFlask_8s_1s_forwards] origin-bottom-right">
              <svg viewBox="0 0 50 70" className="w-12 h-16">
                <path d="M13 20 L7 52 Q7 60 16 60 L34 60 Q43 60 43 52 L37 20" fill="none" stroke="#94a3b8" strokeWidth="1.8" />
                <path d="M18 4 L18 20 M32 4 L32 20" fill="none" stroke="#94a3b8" strokeWidth="1.8" />
                <line x1="18" y1="4" x2="32" y2="4" stroke="#94a3b8" strokeWidth="1.8" />
                <path d="M9 40 L7 52 Q7 60 16 60 L34 60 Q43 60 43 52 L41 40 Z" fill="#f0e040" opacity="0.5" />
                <rect x="15" y="54" width="3" height="3" fill="#14b8a6" opacity="0.8" transform="rotate(20 16 55)" />
                <rect x="22" y="55" width="2.5" height="2.5" fill="#0891b2" opacity="0.8" transform="rotate(-10 23 56)" />
                <rect x="29" y="54" width="3" height="3" fill="#14b8a6" opacity="0.8" transform="rotate(35 30 55)" />
              </svg>
            </div>

            {/* Liquid stream from flask */}
            <div className="absolute left-12 top-6 w-0.5 h-8 bg-yellow-300/50 z-30 opacity-0 animate-[liquidStream_8s_1s_forwards] origin-top"></div>

            {/* Complete Buchner Funnel Assembly - single SVG */}
            <svg viewBox="0 0 160 200" className="w-32 sm:w-40 h-[160px] sm:h-[190px]" style={{ overflow: 'visible' }}>
              {/* === BUCHNER FUNNEL === */}
              {/* Funnel bowl */}
              <path d="M30 10 L25 40 L135 40 L130 10 Z" fill="white" stroke="#9ca3af" strokeWidth="2" />
              {/* Bottom of funnel */}
              <line x1="25" y1="40" x2="135" y2="40" stroke="#9ca3af" strokeWidth="2" />
              {/* Perforated plate */}
              <line x1="30" y1="35" x2="130" y2="35" stroke="#d1d5db" strokeWidth="1" strokeDasharray="3 3" />
              {/* Filter paper on plate */}
              <rect x="32" y="33" width="96" height="3" fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="0.5" rx="1" />

              {/* Crystals on filter - appear over time */}
              <g className="opacity-0 animate-[appear_4s_4s_forwards]">
                <rect x="48" y="28" width="5" height="5" fill="#14b8a6" opacity="0.85" rx="0.5" transform="rotate(20 50 30)" />
                <rect x="58" y="27" width="6" height="5" fill="#0891b2" opacity="0.8" rx="0.5" transform="rotate(-10 61 29)" />
                <rect x="68" y="28" width="5" height="6" fill="#14b8a6" opacity="0.85" rx="0.5" transform="rotate(35 70 31)" />
                <rect x="78" y="27" width="6" height="5" fill="#0e7490" opacity="0.8" rx="0.5" transform="rotate(-20 81 29)" />
                <rect x="88" y="28" width="5" height="5" fill="#14b8a6" opacity="0.85" rx="0.5" transform="rotate(45 90 30)" />
                <rect x="98" y="27" width="5" height="6" fill="#0891b2" opacity="0.8" rx="0.5" transform="rotate(10 100 30)" />
              </g>

              {/* Liquid pooling in funnel */}
              <rect x="28" y="30" width="104" height="8" fill="#fef08a" opacity="0" rx="1" className="animate-[fillDrain_8s_1.5s_forwards]" />

              {/* === FUNNEL STEM === */}
              <rect x="72" y="40" width="16" height="20" fill="white" stroke="#9ca3af" strokeWidth="2" />

              {/* Drip through stem */}
              <circle cx="80" cy="48" r="2" fill="#fde047" opacity="0" className="animate-[stemDrip_0.8s_2.5s_8_forwards]" />

              {/* === RUBBER ADAPTER === */}
              <rect x="68" y="58" width="24" height="5" fill="#374151" rx="2" />

              {/* === FILTER FLASK (Erlenmeyer with side arm) === */}
              {/* Flask neck */}
              <rect x="70" y="62" width="20" height="18" fill="white" stroke="#94a3b8" strokeWidth="2" />
              {/* Flask body */}
              <path d="M70 80 L38 160 Q34 170 48 170 L112 170 Q126 170 122 160 L90 80" fill="white" stroke="#94a3b8" strokeWidth="2" />

              {/* Side arm */}
              <path d="M90 72 L120 62" fill="none" stroke="#94a3b8" strokeWidth="2" />
              <path d="M120 62 L135 62" fill="none" stroke="#94a3b8" strokeWidth="2" />
              {/* Vacuum hose connector */}
              <circle cx="138" cy="62" r="4" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
              {/* Vacuum tube */}
              <path d="M142 62 Q150 62 150 70 Q150 78 155 78" fill="none" stroke="#6b7280" strokeWidth="2" opacity="0.4" />

              {/* Filtrate collecting at bottom */}
              <path d="M46 150 L38 160 Q34 170 48 170 L112 170 Q126 170 122 160 L114 150 Z" fill="#fef9c3" opacity="0" className="animate-[filtrateCollect_8s_3s_forwards]" />

              {/* Vacuum label */}
              <text x="144" y="56" fill="#9ca3af" fontSize="8" fontFamily="sans-serif">vakum</text>
            </svg>
          </div>

          {/* Table Surface */}
          <div className="w-44 sm:w-56 h-2 bg-slate-200 rounded-full mt-1 shadow-sm relative z-0"></div>
        </div>
      );
      break;
    default:
      content = null;
  }

  return (
    <>
      <style jsx>{`
        @keyframes complexFormation {
          0%, 24% { fill: #eff6ff; opacity: 0.8; }
          35% { fill: #fcd34d; opacity: 0.85; }
          55% { fill: #fb923c; opacity: 0.9; }
          75% { fill: #065f46; opacity: 0.95; }
          100% { fill: #294524; opacity: 1; }
        }
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(10px) translateX(-50%); }
          15%, 85% { opacity: 1; transform: translateY(0) translateX(-50%); }
          100% { opacity: 0; transform: translateY(-10px) translateX(-50%); }
        }
        @keyframes fadeInOutCentered {
          0% { opacity: 0; transform: translateY(10px); }
          15%, 85% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
        @keyframes dropPowder {
          0% { opacity: 0; transform: translateY(-10px); }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; transform: translateY(30px); }
          100% { opacity: 0; transform: translateY(40px); }
        }
        @keyframes appear {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes fillOpaque {
          0% { opacity: 0; transform: scaleY(0); fill: #e2e8f0; }
          100% { opacity: 0.9; transform: scaleY(1); fill: #e2e8f0; }
        }
        @keyframes clearUp {
          0% { fill: #e2e8f0; opacity: 0.9; }
          100% { fill: #eff6ff; opacity: 0.8; }
        }
        @keyframes fadeOut {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes dropStirBar {
          0% { opacity: 0; transform: translateY(-60px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes dropDichromate {
          0% { opacity: 0; transform: translateY(0); }
          20% { opacity: 1; }
          80% { opacity: 1; transform: translateY(110px); }
          100% { opacity: 0; transform: translateY(120px); }
        }
        @keyframes bubbleRise {
          0% { opacity: 0; transform: translateY(0) scale(0.5); }
          20% { opacity: 1; transform: translateY(-5px) scale(1); }
          100% { opacity: 0; transform: translateY(-25px) scale(1.2); }
        }
        @keyframes flaskLifeCycle {
          0% { transform: translateX(-50%) translateY(-50px); opacity: 0; }
          4% { opacity: 1; }
          8% { transform: translateX(-50%) translateY(0); }
          34% { transform: translateX(-50%) translateY(0); }
          38% { transform: translateX(-50%) translateY(-60px); }
          44% { transform: translateX(-50%) translateY(-60px); }
          48% { transform: translateX(-50%) translateY(0); }
          64% { transform: translateX(-50%) translateY(0); }
          68% { transform: translateX(-50%) translateY(-60px); }
          72% { transform: translateX(-50%) translateY(-60px); }
          76% { transform: translateX(-50%) translateY(0); }
          100% { transform: translateX(-50%) translateY(0); }
        }
        @keyframes iceBathLifeCycle {
          0%, 34% { transform: translateX(calc(-50% - 120px)); opacity: 0; }
          36% { opacity: 1; }
          40% { transform: translateX(-50%); opacity: 1; }
          66% { transform: translateX(-50%); opacity: 1; }
          70% { opacity: 1; }
          74% { transform: translateX(calc(-50% + 120px)); opacity: 0; }
          100% { transform: translateX(calc(-50% + 120px)); opacity: 0; }
        }
        @keyframes solutionColorChange {
          0%, 76% { fill: #294524; opacity: 1; }
          84% { fill: #3d6b3a; opacity: 0.95; }
          90% { fill: #8aad3a; opacity: 0.85; }
          96% { fill: #d4c926; opacity: 0.7; }
          100% { fill: #f0e040; opacity: 0.55; }
        }
        @keyframes fadeInFast {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes coolDownBar {
          0%, 18.75% { height: 90%; background-color: #ef4444; }
          43.75% { height: 35%; background-color: #3b82f6; }
          68.75% { height: 35%; background-color: #3b82f6; }
          100% { height: 10%; background-color: #06b6d4; }
        }
        @keyframes coolDownColor {
          0%, 18.75% { background-color: #ef4444; }
          43.75% { background-color: #3b82f6; }
          68.75% { background-color: #3b82f6; }
          100% { background-color: #06b6d4; }
        }
        @keyframes coolDownText {
          0%, 18.75% { background-color: #fef2f2; border-color: #fecaca; color: #b91c1c; }
          43.75% { background-color: #eff6ff; border-color: #bfdbfe; color: #1d4ed8; }
          68.75% { background-color: #eff6ff; border-color: #bfdbfe; color: #1d4ed8; }
          100% { background-color: #ecfeff; border-color: #a5f3fc; color: #0e7490; }
        }
        @keyframes dropPipette {
          0% { transform: translateY(-20px) translateX(-50%); opacity: 0; }
          8%, 92% { transform: translateY(10px) translateX(-50%); opacity: 1; }
          100% { transform: translateY(-20px) translateX(-50%); opacity: 0; }
        }
        @keyframes pipetteEmpty {
          0% { height: 100%; }
          100% { height: 0%; }
        }
        @keyframes dropLiquid {
          0% { transform: translateY(0) scale(0.5); opacity: 0; }
          10% { transform: translateY(10px) scale(1); opacity: 1; }
          80% { transform: translateY(90px) scale(0.8); opacity: 1; }
          100% { transform: translateY(100px) scale(0); opacity: 0; }
        }
        @keyframes perspectiveSpin {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
        @keyframes dropFlask {
          0% { transform: translateY(0); }
          100% { transform: translateY(110px); }
        }
        @keyframes pourFlask {
          0% { opacity: 0; transform: translateX(-20px) rotate(0deg); }
          15% { opacity: 1; transform: translateX(0) rotate(0deg); }
          25% { transform: translateX(0) rotate(35deg); }
          75% { transform: translateX(0) rotate(35deg); opacity: 1; }
          90% { transform: translateX(0) rotate(0deg); opacity: 0.5; }
          100% { transform: translateX(-20px) rotate(0deg); opacity: 0; }
        }
        @keyframes liquidStream {
          0%, 20% { opacity: 0; transform: scaleY(0); }
          25% { opacity: 1; transform: scaleY(1); }
          75% { opacity: 1; transform: scaleY(1); }
          85%, 100% { opacity: 0; transform: scaleY(0); }
        }
        @keyframes fillDrain {
          0% { opacity: 0; height: 0; }
          20% { opacity: 0.6; height: 20px; }
          50% { opacity: 0.4; height: 12px; }
          80% { opacity: 0.2; height: 4px; }
          100% { opacity: 0; height: 0; }
        }
        @keyframes stemDrip {
          0% { opacity: 0; transform: translateX(-50%) translateY(0); }
          15% { opacity: 1; }
          100% { opacity: 0; transform: translateX(-50%) translateY(28px); }
        }
        @keyframes filtrateCollect {
          0% { opacity: 0; }
          30% { opacity: 0.2; }
          60% { opacity: 0.4; }
          100% { opacity: 0.6; }
        }
      `}</style>
      {content}
    </>
  );
}
