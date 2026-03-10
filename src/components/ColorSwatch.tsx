interface ColorSwatchProps {
  color: string;
  label: string;
  formula: string;
  hexCode: string;
}

export default function ColorSwatch({ color, label, formula, hexCode }: ColorSwatchProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 p-3 bg-gray-50 rounded-lg text-center sm:text-left">
      <div
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white shadow-md flex-shrink-0"
        style={{ backgroundColor: color }}
        title={hexCode}
      />
      <div className="min-w-0">
        <p className="font-medium text-gray-800 text-xs sm:text-sm leading-tight">{label}</p>
        <p className="text-xs text-gray-500 truncate">{formula}</p>
        <p className="text-xs text-gray-400">{hexCode}</p>
      </div>
    </div>
  );
}
