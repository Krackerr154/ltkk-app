'use client';
import KaTeX from './KaTeX';

interface ReactionEquationProps {
  latex: string;
  label?: string;
}

export default function ReactionEquation({ latex, label }: ReactionEquationProps) {
  return (
    <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg overflow-x-auto">
      {label && <p className="text-xs font-semibold text-amber-700 mb-2 uppercase tracking-wide">{label}</p>}
      <KaTeX math={latex} display />
    </div>
  );
}
