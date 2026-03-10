interface ColorSwatchProps {
  color: string;
  label: string;
  formula: string;
  hexCode: string;
}

export default function ColorSwatch({ color, label, formula, hexCode }: ColorSwatchProps) {
  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
      <div
        className="w-12 h-12 rounded-full border-2 border-white shadow-md flex-shrink-0"
        style={{ backgroundColor: color }}
        title={hexCode}
      />
      <div>
        <p className="font-medium text-gray-800 text-sm">{label}</p>
        <p className="text-xs text-gray-500">{formula}</p>
        <p className="text-xs text-gray-400">{hexCode}</p>
      </div>
    </div>
  );
}
