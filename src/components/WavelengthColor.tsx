'use client';

/**
 * Maps a wavelength (nm) to its approximate visible color,
 * and returns the *complementary* color (what the solution appears as).
 */
function wavelengthToRGB(wavelength: number): string {
  let r = 0, g = 0, b = 0;

  if (wavelength >= 380 && wavelength < 440) {
    r = -(wavelength - 440) / (440 - 380);
    b = 1.0;
  } else if (wavelength >= 440 && wavelength < 490) {
    g = (wavelength - 440) / (490 - 440);
    b = 1.0;
  } else if (wavelength >= 490 && wavelength < 510) {
    g = 1.0;
    b = -(wavelength - 510) / (510 - 490);
  } else if (wavelength >= 510 && wavelength < 580) {
    r = (wavelength - 510) / (580 - 510);
    g = 1.0;
  } else if (wavelength >= 580 && wavelength < 645) {
    r = 1.0;
    g = -(wavelength - 645) / (645 - 580);
  } else if (wavelength >= 645 && wavelength <= 780) {
    r = 1.0;
  }

  // Intensity factor for edges of visible spectrum
  let factor = 0.0;
  if (wavelength >= 380 && wavelength < 420) {
    factor = 0.3 + 0.7 * (wavelength - 380) / (420 - 380);
  } else if (wavelength >= 420 && wavelength <= 700) {
    factor = 1.0;
  } else if (wavelength > 700 && wavelength <= 780) {
    factor = 0.3 + 0.7 * (780 - wavelength) / (780 - 700);
  }

  r = Math.round(255 * r * factor);
  g = Math.round(255 * g * factor);
  b = Math.round(255 * b * factor);

  return `rgb(${r}, ${g}, ${b})`;
}

function complementaryRGB(wavelength: number): string {
  // Approximate complementary wavelength mapping
  const compMap: [number, number][] = [
    [400, 580], [420, 590], [440, 600], [460, 610],
    [480, 630], [500, 650], [520, 700],
    [560, 420], [580, 430], [600, 450], [620, 470],
    [640, 490], [660, 500], [700, 520],
  ];

  // Interpolate
  let compWl = 550;
  for (let i = 0; i < compMap.length - 1; i++) {
    if (wavelength >= compMap[i][0] && wavelength <= compMap[i + 1][0]) {
      const t = (wavelength - compMap[i][0]) / (compMap[i + 1][0] - compMap[i][0]);
      compWl = compMap[i][1] + t * (compMap[i + 1][1] - compMap[i][1]);
      break;
    }
  }

  return wavelengthToRGB(compWl);
}

function getAbsorbedColorName(wavelength: number): string {
  if (wavelength < 380) return 'UV (not visible)';
  if (wavelength < 440) return 'Violet';
  if (wavelength < 490) return 'Blue';
  if (wavelength < 510) return 'Blue-green';
  if (wavelength < 530) return 'Green';
  if (wavelength < 570) return 'Yellow-green';
  if (wavelength < 590) return 'Yellow';
  if (wavelength < 620) return 'Orange';
  if (wavelength < 700) return 'Red';
  return 'IR (not visible)';
}

function getApparentColorName(wavelength: number): string {
  if (wavelength < 440) return 'Yellow-green';
  if (wavelength < 490) return 'Orange-red';
  if (wavelength < 510) return 'Red';
  if (wavelength < 530) return 'Red-violet';
  if (wavelength < 570) return 'Violet';
  if (wavelength < 590) return 'Blue-violet';
  if (wavelength < 620) return 'Blue';
  if (wavelength < 700) return 'Blue-green';
  return 'Green';
}

interface WavelengthColorProps {
  wavelength: number;
}

export default function WavelengthColor({ wavelength }: WavelengthColorProps) {
  const absorbedColor = wavelengthToRGB(wavelength);
  const apparentColor = complementaryRGB(wavelength);
  const absName = getAbsorbedColorName(wavelength);
  const appName = getApparentColorName(wavelength);

  return (
    <div className="flex gap-3 sm:gap-4 items-center p-3 bg-gray-50 rounded-lg">
      <div className="text-center flex-1 min-w-0">
        <div
          className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border-2 border-white shadow-md mx-auto"
          style={{ backgroundColor: absorbedColor }}
        />
        <p className="text-xs text-gray-500 mt-1">Absorbed</p>
        <p className="text-xs font-medium text-gray-700 truncate">{absName}</p>
        <p className="text-xs text-gray-400">{wavelength} nm</p>
      </div>
      <div className="text-gray-300 text-lg sm:text-xl flex-shrink-0">→</div>
      <div className="text-center flex-1 min-w-0">
        <div
          className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border-2 border-white shadow-md mx-auto"
          style={{ backgroundColor: apparentColor }}
        />
        <p className="text-xs text-gray-500 mt-1">Appears as</p>
        <p className="text-xs font-medium text-gray-700 truncate">{appName}</p>
      </div>
    </div>
  );
}
