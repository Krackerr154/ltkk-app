'use client';
import React, { useState } from 'react';

interface ColorWedge {
  name: string;
  absorbedNm: string;
  color: string;
  compColor: string;
  compName: string;
  startAngle: number;
  endAngle: number;
}

// 8 wedges
const wedges: ColorWedge[] = [
  { name: 'Merah', absorbedNm: '650–780 nm', color: '#ff0000', compColor: '#00ff00', compName: 'Hijau', startAngle: 247.5, endAngle: 292.5 },
  { name: 'Oranye', absorbedNm: '595–650 nm', color: '#ffa500', compColor: '#008080', compName: 'Biru-hijau', startAngle: 292.5, endAngle: 337.5 },
  { name: 'Kuning', absorbedNm: '580–595 nm', color: '#ffff00', compColor: '#0000ff', compName: 'Biru', startAngle: 337.5, endAngle: 22.5 },
  { name: 'Kuning-hijau', absorbedNm: '560–580 nm', color: '#9ACD32', compColor: '#8A2BE2', compName: 'Violet', startAngle: 22.5, endAngle: 67.5 },
  { name: 'Hijau', absorbedNm: '500–560 nm', color: '#00ff00', compColor: '#C71585', compName: 'Merah-ungu', startAngle: 67.5, endAngle: 112.5 },
  { name: 'Biru-hijau', absorbedNm: '480–500 nm', color: '#008080', compColor: '#FF4500', compName: 'Oranye/Oranye-merah', startAngle: 112.5, endAngle: 157.5 },
  { name: 'Biru', absorbedNm: '435–480 nm', color: '#0000ff', compColor: '#FFA500', compName: 'Kuning-oranye', startAngle: 157.5, endAngle: 202.5 },
  { name: 'Violet', absorbedNm: '400–435 nm', color: '#8A2BE2', compColor: '#9ACD32', compName: 'Kuning-hijau', startAngle: 202.5, endAngle: 247.5 },
];

export default function InteractiveColorWheel() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tappedIndex, setTappedIndex] = useState<number | null>(null);

  // On mobile, use tap; on desktop, use hover
  const activeIndex = tappedIndex ?? hoveredIndex;

  const handleTap = (i: number) => {
    setTappedIndex(prev => prev === i ? null : i);
  };

  // Calculate SVG paths (Arc)
  const createWedge = (start: number, end: number, radius: number) => {
    const x1 = 150 + radius * Math.cos((Math.PI * start) / 180);
    const y1 = 150 + radius * Math.sin((Math.PI * start) / 180);
    const x2 = 150 + radius * Math.cos((Math.PI * end) / 180);
    const y2 = 150 + radius * Math.sin((Math.PI * end) / 180);

    const largeArcFlag = end - start <= 180 ? '0' : '1';

    return `M 150 150 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-6 md:flex-row md:gap-8">
      <div className="relative w-full max-w-[280px] sm:max-w-[300px]">
        <svg viewBox="0 0 300 300" className="w-full h-auto">
          {wedges.map((w, i) => {
            const isHovered = activeIndex === i;
            // The complement wedge index: it's opposite, so +4 mod 8
            const compIndex = (i + 4) % 8;
            const isComplement = activeIndex === compIndex;
            
            let radius = 130;
            if (isHovered) radius = 145;
            if (isComplement) radius = 140;

            const opacity = activeIndex === null ? 1 : (isHovered || isComplement ? 1 : 0.3);

            return (
              <path
                key={i}
                d={createWedge(w.startAngle, w.endAngle, radius)}
                fill={w.color}
                stroke="#fff"
                strokeWidth="2"
                style={{
                  transition: 'all 0.3s ease',
                  opacity,
                  cursor: 'pointer'
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleTap(i)}
              />
            );
          })}
          {/* Inner white circle */}
          <circle cx="150" cy="150" r="40" fill="white" />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-center">
          {activeIndex !== null ? (
            <div className="w-16">
              <span className="block text-xl font-bold">↔</span>
            </div>
          ) : (
            <div className="text-gray-400 text-xs font-medium px-2">
              <span className="hidden sm:inline">Arahkan ke<br/>warna</span>
              <span className="sm:hidden">Ketuk<br/>warna</span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 w-full sm:min-w-[240px] sm:w-auto min-h-[140px] sm:h-[160px] flex flex-col justify-center">
        {activeIndex !== null ? (
          <div>
            <div className="mb-3">
              <span className="text-xs uppercase font-semibold text-gray-500">Warna Diserap</span>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full border border-gray-300 shadow-sm flex-shrink-0" style={{ backgroundColor: wedges[activeIndex].color }}></div>
                <span className="font-bold text-gray-800">{wedges[activeIndex].name}</span>
              </div>
              <p className="text-xs text-gray-600 mt-1">Sinar masuk: <span className="font-mono bg-white px-1 border rounded">{wedges[activeIndex].absorbedNm}</span></p>
            </div>
            
            <div>
              <span className="text-xs uppercase font-semibold text-gray-500">Warna Tampak (Komplementer)</span>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full border border-gray-300 shadow-sm flex-shrink-0" style={{ backgroundColor: wedges[(activeIndex + 4) % 8].color }}></div>
                <span className="font-bold text-gray-800 text-sm mt-0.5">{wedges[(activeIndex + 4) % 8].name}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 text-sm">
            <span className="hidden sm:inline">Arahkan kursor ke roda warna untuk melihat hubungan warna yang diserap dan warna yang tampak.</span>
            <span className="sm:hidden">Ketuk warna pada roda untuk melihat hubungan warna yang diserap dan warna yang tampak.</span>
          </div>
        )}
      </div>
    </div>
  );
}
