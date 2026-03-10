'use client';

interface LigandStructureProps {
  ligand: 'oxalate' | 'urea' | 'acac';
}

function OxalateSVG() {
  return (
    <svg viewBox="0 0 240 180" className="w-full max-w-[200px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg">
      <text x="120" y="20" alignmentBaseline="middle" dominantBaseline="middle" textAnchor="middle" fontSize="12" fill="#64748b" fontWeight="bold">Oxalate (C₂O₄²⁻)</text>
      
      {/* C-C bond */}
      <line x1="102" y1="80" x2="138" y2="80" stroke="#374151" strokeWidth="2.5" />
      <text x="90" y="80" alignmentBaseline="middle" dominantBaseline="middle" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#374151">C</text>
      <text x="150" y="80" alignmentBaseline="middle" dominantBaseline="middle" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#374151">C</text>
      
      {/* O atoms with double bonds */}
      <line x1="81" y1="67" x2="61" y2="47" stroke="#dc2626" strokeWidth="2.5" />
      <line x1="75" y1="73" x2="55" y2="53" stroke="#dc2626" strokeWidth="2.5" />
      <text x="50" y="40" alignmentBaseline="middle" dominantBaseline="middle" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#dc2626">O</text>
      
      {/* Bottom O⁻ */}
      <line x1="80" y1="90" x2="60" y2="110" stroke="#dc2626" strokeWidth="2.5" />
      <text x="50" y="120" alignmentBaseline="middle" dominantBaseline="middle" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#dc2626">O⁻</text>
      <circle cx="50" cy="120" r="14" fill="none" stroke="#0f766e" strokeWidth="1.5" strokeDasharray="4,3" />
      
      {/* Right O atoms with double bonds */}
      <line x1="159" y1="67" x2="179" y2="47" stroke="#dc2626" strokeWidth="2.5" />
      <line x1="165" y1="73" x2="185" y2="53" stroke="#dc2626" strokeWidth="2.5" />
      <text x="190" y="40" alignmentBaseline="middle" dominantBaseline="middle" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#dc2626">O</text>
      
      {/* Right Bottom O⁻ */}
      <line x1="160" y1="90" x2="180" y2="110" stroke="#dc2626" strokeWidth="2.5" />
      <text x="190" y="120" alignmentBaseline="middle" dominantBaseline="middle" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#dc2626">O⁻</text>
      <circle cx="190" cy="120" r="14" fill="none" stroke="#0f766e" strokeWidth="1.5" strokeDasharray="4,3" />
      
      {/* Donor atom labels */}
      <text x="120" y="165" alignmentBaseline="middle" dominantBaseline="middle" textAnchor="middle" fontSize="10" fill="#0f766e">Bidentate — 2 O donor atoms</text>
    </svg>
  );
}

function UreaSVG() {
  return (
    <svg viewBox="0 0 240 180" className="w-full max-w-[200px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg">
      <text x="120" y="20" alignmentBaseline="middle" dominantBaseline="middle" textAnchor="middle" fontSize="12" fill="#64748b" fontWeight="bold">Urea (CO(NH₂)₂)</text>
      
      {/* Central C */}
      <text x="120" y="90" alignmentBaseline="middle" dominantBaseline="middle" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#374151">C</text>
      
      {/* C=O bond (top) */}
      <line x1="116" y1="76" x2="116" y2="54" stroke="#dc2626" strokeWidth="2.5" />
      <line x1="124" y1="76" x2="124" y2="54" stroke="#dc2626" strokeWidth="2.5" />
      <text x="120" y="40" alignmentBaseline="middle" dominantBaseline="middle" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#dc2626">O</text>
      <circle cx="120" cy="40" r="14" fill="none" stroke="#0f766e" strokeWidth="1.5" strokeDasharray="4,3" />
      
      {/* C-NH₂ bonds */}
      <line x1="110" y1="98" x2="90" y2="114" stroke="#2563eb" strokeWidth="2.5" />
      <text x="70" y="125" alignmentBaseline="middle" dominantBaseline="middle" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#2563eb">NH₂</text>
      
      <line x1="130" y1="98" x2="150" y2="114" stroke="#2563eb" strokeWidth="2.5" />
      <text x="170" y="125" alignmentBaseline="middle" dominantBaseline="middle" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#2563eb">NH₂</text>
      
      {/* Donor atom label */}
      <text x="120" y="165" alignmentBaseline="middle" dominantBaseline="middle" textAnchor="middle" fontSize="10" fill="#0f766e">Monodentate — O donor atom</text>
    </svg>
  );
}

function AcacSVG() {
  return (
    <svg viewBox="0 0 280 180" className="w-full max-w-[240px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg">
      <text x="140" y="20" alignmentBaseline="middle" dominantBaseline="middle" textAnchor="middle" fontSize="12" fill="#64748b" fontWeight="bold">Acetylacetonate (acac⁻)</text>
      
      {/* Chain text */}
      <text x="40" y="90" alignmentBaseline="middle" dominantBaseline="middle" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#374151">CH₃</text>
      <text x="90" y="90" alignmentBaseline="middle" dominantBaseline="middle" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#374151">C</text>
      <text x="140" y="90" alignmentBaseline="middle" dominantBaseline="middle" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#374151">CH</text>
      <text x="190" y="90" alignmentBaseline="middle" dominantBaseline="middle" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#374151">C</text>
      <text x="240" y="90" alignmentBaseline="middle" dominantBaseline="middle" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#374151">CH₃</text>
      
      {/* Chain bonds */}
      <line x1="60" y1="90" x2="78" y2="90" stroke="#374151" strokeWidth="2.5" />
      <line x1="102" y1="90" x2="124" y2="90" stroke="#374151" strokeWidth="2.5" />
      <line x1="156" y1="90" x2="178" y2="90" stroke="#374151" strokeWidth="2.5" />
      <line x1="202" y1="90" x2="218" y2="90" stroke="#374151" strokeWidth="2.5" />
      
      {/* Left C=O */}
      <line x1="86" y1="76" x2="86" y2="54" stroke="#dc2626" strokeWidth="2.5" />
      <line x1="94" y1="76" x2="94" y2="54" stroke="#dc2626" strokeWidth="2.5" />
      <text x="90" y="40" alignmentBaseline="middle" dominantBaseline="middle" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#dc2626">O</text>
      <circle cx="90" cy="40" r="14" fill="none" stroke="#0f766e" strokeWidth="1.5" strokeDasharray="4,3" />
      
      {/* Right C=O */}
      <line x1="186" y1="76" x2="186" y2="54" stroke="#dc2626" strokeWidth="2.5" />
      <line x1="194" y1="76" x2="194" y2="54" stroke="#dc2626" strokeWidth="2.5" />
      <text x="190" y="40" alignmentBaseline="middle" dominantBaseline="middle" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#dc2626">O</text>
      <circle cx="190" cy="40" r="14" fill="none" stroke="#0f766e" strokeWidth="1.5" strokeDasharray="4,3" />
      
      {/* Donor atom label */}
      <text x="140" y="165" alignmentBaseline="middle" dominantBaseline="middle" textAnchor="middle" fontSize="10" fill="#0f766e">Bidentate — 2 O donor atoms</text>
    </svg>
  );
}

export default function LigandStructure({ ligand }: LigandStructureProps) {
  switch (ligand) {
    case 'oxalate':
      return <OxalateSVG />;
    case 'urea':
      return <UreaSVG />;
    case 'acac':
      return <AcacSVG />;
  }
}
