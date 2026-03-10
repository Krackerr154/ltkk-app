'use client';

const ligands = [
  { symbol: 'I⁻', strength: 1 },
  { symbol: 'Br⁻', strength: 2 },
  { symbol: 'Cl⁻', strength: 3 },
  { symbol: 'F⁻', strength: 4 },
  { symbol: 'OH⁻', strength: 5 },
  { symbol: 'C₂O₄²⁻', strength: 6, highlight: true, label: 'oxalate' },
  { symbol: 'H₂O', strength: 7 },
  { symbol: 'urea', strength: 6.5, highlight: true, label: 'urea' },
  { symbol: 'NCS⁻', strength: 8 },
  { symbol: 'py', strength: 9 },
  { symbol: 'NH₃', strength: 10 },
  { symbol: 'en', strength: 11 },
  { symbol: 'phen', strength: 12 },
  { symbol: 'acac⁻', strength: 8.5, highlight: true, label: 'acetylacetonate' },
  { symbol: 'NO₂⁻', strength: 13 },
  { symbol: 'CN⁻', strength: 14 },
  { symbol: 'CO', strength: 15 },
];

// Sort by strength for proper ordering
const sortedLigands = [...ligands].sort((a, b) => a.strength - b.strength);

export default function SpectrochemicalSeries() {
  return (
    <div className="p-3 sm:p-4 bg-white border border-gray-200 rounded-lg">
      <p className="text-sm font-semibold text-gray-700 mb-1">Spectrochemical Series</p>
      <p className="text-xs text-gray-500 mb-4">Weak field → Strong field (left to right). <span className="text-teal-600 font-medium">Highlighted</span> = ligands used in this practicum.</p>
      
      <div className="relative">
        {/* Gradient bar */}
        <div className="h-2.5 sm:h-3 rounded-full bg-gradient-to-r from-red-400 via-yellow-400 to-blue-500 mb-4" />
        
        {/* Arrow */}
        <div className="flex justify-between text-[10px] sm:text-xs text-gray-400 mb-3 sm:mb-4 -mt-1">
          <span>← Weak field</span>
          <span>Strong field →</span>
        </div>

        {/* Ligand pills */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
          {sortedLigands.map((l) => (
            <span
              key={l.symbol}
              className={`px-2.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                l.highlight
                  ? 'bg-teal-100 text-teal-800 border-2 border-teal-400 shadow-sm ring-2 ring-teal-200'
                  : 'bg-gray-100 text-gray-600 border border-gray-200'
              }`}
              title={l.highlight ? l.label : undefined}
            >
              {l.symbol}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
