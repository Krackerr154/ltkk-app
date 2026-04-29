'use client';
import React, { useState, useMemo } from 'react';
import SectionCard from '@/components/SectionCard';
import CrystalFieldDiagram from '@/components/CrystalFieldDiagram';
import TermSymbolD3 from '@/components/TermSymbolD3';
import TanabeSuganoDiagram from '@/components/TanabeSuganoDiagram';
import SpectrochemicalSeries from '@/components/SpectrochemicalSeries';
import WavelengthColor from '@/components/WavelengthColor';
import ThinkReveal from '@/components/ThinkReveal';
import KaTeX from '@/components/KaTeX';
import InteractiveColorWheel from '@/components/InteractiveColorWheel';
import SelectionRulesExplorer from '@/components/SelectionRulesExplorer';

interface ComplexData {
  name: string;
  formula: string;
  ligand: string;
  lambdaMax: number;
  color: string;
}

const defaultComplexes: ComplexData[] = [
  {
    name: 'K₃[Cr(ox)₃]·3H₂O',
    formula: 'K_3[Cr(C_2O_4)_3] \\cdot 3H_2O',
    ligand: 'Oksalat (C₂O₄²⁻)',
    lambdaMax: 570,
    color: '#2d8c7f',
  },
  {
    name: '[Cr(ur)₆]Cl₃·3H₂O',
    formula: '[Cr(\\text{ur})_6]Cl_3 \\cdot 3H_2O',
    ligand: 'Urea',
    lambdaMax: 592,
    color: '#4a8c3f',
  },
  {
    name: '[Cr(acac)₃]',
    formula: '[Cr(acac)_3]',
    ligand: 'Asetilasetonato (acac⁻)',
    lambdaMax: 545,
    color: '#6b2137',
  },
];

function calcDelta(lambdaNm: number): number {
  if (!lambdaNm || lambdaNm <= 0) return 0;
  // Δ₀ = (1 × 10⁷ × 0.01196) / λ(nm) = 119600 / λ  [kJ/mol]
  return (10 * 0.01196 * 1e6) / lambdaNm;
}

export default function Modul6() {
  const [complexes, setComplexes] = useState(defaultComplexes);

  const updateLambda = (index: number, value: number) => {
    setComplexes((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], lambdaMax: value };
      return updated;
    });
  };

  // Calculate Δ₀ and rank
  const results = useMemo(() => {
    return complexes
      .map((c, i) => ({
        ...c,
        index: i,
        delta: calcDelta(c.lambdaMax),
      }))
      .sort((a, b) => a.delta - b.delta);
  }, [complexes]);

  return (
    <main className="min-h-screen p-3 sm:p-4 md:p-6">
      <div className="max-w-3xl mx-auto space-y-5 sm:space-y-6 pb-12">
        <header className="space-y-2 pt-4">
          <p className="text-sm text-teal-600 font-medium">Modul 6</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Pengukuran Spektrum UV-Vis dan Penentuan Nilai Δ₀
          </h1>
          <p className="text-gray-500 text-sm">
            Memahami teori medan kristal, menghitung energi pemisahan medan kristal, dan mengurutkan kekuatan ligan
          </p>
        </header>

        {/* 1. Crystal Field Theory */}
        <SectionCard title="Teori Medan Kristal" icon="📖" accent="border-teal-500">
          <div className="text-sm text-gray-700 space-y-3 leading-relaxed">
            <p>
              Dalam medan oktahedral, interaksi elektrostatik antara <strong>ion logam transisi</strong> dengan
              ligan menyebabkan orbital d terbelah menjadi dua tingkat energi:
            </p>
            <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
              <li>
                <KaTeX math="t_{2g}" /> (triplet) — energi lebih <strong>rendah</strong>: <KaTeX math="d_{xy}, d_{xz}, d_{yz}" />
              </li>
              <li>
                <KaTeX math="e_g" /> (doublet) — energi lebih <strong>tinggi</strong>: <KaTeX math="d_{z^2}, d_{x^2-y^2}" />
              </li>
            </ul>
            <p>
              Perbedaan energi antara <KaTeX math="e_g" /> dan <KaTeX math="t_{2g}" /> disebut{' '}
              <strong>energi pemisahan medan kristal</strong>{' '}
              <KaTeX math="\Delta_0" /> (atau 10 Dq).
            </p>
            <div className="p-3 bg-teal-50 rounded-lg border border-teal-200 text-xs text-teal-800">
              <p className="font-semibold mb-1">Faktor yang mempengaruhi Δ₀:</p>
              <ol className="list-decimal list-inside space-y-0.5">
                <li>Muatan ion logam (semakin tinggi → Δ₀ semakin besar)</li>
                <li>Ukuran ion logam (periode 2nd &gt; 1st → Δ₀ lebih besar)</li>
                <li>Jenis ligan (deret spektrokimia)</li>
              </ol>
            </div>
          </div>
        </SectionCard>

        {/* 2. Crystal Field Diagram & Electronic Transition */}
        <SectionCard title="Diagram Pemisahan Orbital d & Transisi Elektronik d³" icon="📊" accent="border-blue-500">
          <p className="text-sm text-gray-600 mb-3">
            Ion Cr³⁺ memiliki konfigurasi <KaTeX math="d^3" />. Dalam medan oktahedral,
            ketiga elektron menempati orbital <KaTeX math="t_{2g}" /> — masing-masing satu per orbital,
            tanpa berpasangan (sesuai aturan Hund).
          </p>
          <CrystalFieldDiagram />

          <div className="mt-5 pt-4 border-t border-gray-100 text-sm text-gray-700 space-y-3">
            <p>
              Dari diagram Tanabe-Sugano untuk ion <KaTeX math="d^3" />,{' '}
              <KaTeX math="^4A_{2g}" /> merupakan keadaan dasar (<em>ground state</em>). Transisi elektronik yang diamati pada Cr³⁺:
            </p>
            <ul className="list-disc list-inside text-xs text-gray-600 mb-3 ml-2 space-y-1">
              <li><KaTeX math="^4A_{2g} \rightarrow\, ^4T_{2g}" /> — puncak serapan pada <strong>λ terbesar</strong> (energi terendah) → digunakan untuk menghitung Δ₀</li>
              <li><KaTeX math="^4A_{2g} \rightarrow\, ^4T_{1g}(F)" /> — puncak serapan pada λ lebih kecil</li>
            </ul>

            <ThinkReveal question="Mengapa transisi yang diamati adalah ⁴A₂g → ⁴T₂g dan ⁴A₂g → ⁴T₁g(F)?">
              <p>
                Berdasarkan <strong>aturan seleksi spin</strong>, transisi yang diperbolehkan harus mempertahankan
                multiplisitas spin (ΔS = 0). Keadaan dasar <KaTeX math="^4A_{2g}" /> memiliki
                multiplisitas spin = 4, sehingga hanya transisi ke keadaan excited dengan multiplisitas
                spin = 4 yang diperbolehkan, yaitu <KaTeX math="^4T_{2g}" /> dan <KaTeX math="^4T_{1g}" />.
              </p>
              <p>
                Catatan: Berdasarkan <strong>aturan Laporte</strong>, transisi d-d sebenarnya dilarang karena
                simetri (g → g). Namun, transisi ini tetap terjadi (dengan intensitas rendah) karena
                vibrasi molekul sementara merusak simetri sempurna (<em>vibronic coupling</em>).
              </p>
            </ThinkReveal>
          </div>
        </SectionCard>

        {/* 2.5. Selection Rules */}
        <SectionCard title="Aturan Seleksi & Pengecualiannya" icon="⚡" accent="border-rose-500">
          <SelectionRulesExplorer />
        </SectionCard>

        {/* 3. Term Symbol Diagram */}
        <SectionCard title="Penentuan Simbol Term Keadaan Dasar (d³)" icon="🔤" accent="border-purple-500">
          <TermSymbolD3 />
        </SectionCard>

        {/* 4. Tanabe-Sugano Diagram */}
        <SectionCard title="Diagram Tanabe-Sugano (d³)" icon="📈" accent="border-violet-500">
          <p className="text-sm text-gray-600 mb-3">
            Diagram Tanabe-Sugano menggambarkan energi keadaan elektronik (E/B) sebagai fungsi
            dari kekuatan medan kristal (Δ/B). Untuk ion <KaTeX math="d^3" /> seperti Cr³⁺,
            keadaan dasar adalah <KaTeX math="^4A_{2g}" /> (dari suku <KaTeX math="^4F" />).
          </p>
          <TanabeSuganoDiagram />
        </SectionCard>

        {/* 4. Spectrochemical Series */}
        <SectionCard title="Deret Spektrokimia" icon="📏" accent="border-indigo-500">
          <p className="text-sm text-gray-600 mb-3">
            Kekuatan ligan menentukan besarnya <KaTeX math="\Delta_0" />. Ligan medan kuat menyebabkan pemisahan yang lebih besar, sedangkan ligan medan lemah menghasilkan pemisahan yang lebih kecil.
          </p>
          <SpectrochemicalSeries />
        </SectionCard>

        {/* 5. Δ₀ Calculator — all 3 complexes */}
        <SectionCard title="Kalkulator Δ₀" icon="🧮" accent="border-orange-500">
          <p className="text-sm text-gray-600 mb-2">
            Masukkan <KaTeX math="\lambda_{\max}" /> (nm) dari setiap spektrum UV-Vis
            untuk menghitung <KaTeX math="\Delta_0" />.
          </p>
          <div className="p-3 bg-gray-50 rounded-lg mb-4">
            <p className="text-xs text-gray-500 mb-1">Rumus:</p>
            <KaTeX
              math="\Delta_0 = \frac{1 \times 10 \times 0{,}01196}{\lambda\text{ (nm)}} \times 10^6 \quad \text{kJ mol}^{-1}"
              display
            />
          </div>

          <div className="space-y-4">
            {complexes.map((c, i) => (
              <div key={i} className="p-4 bg-white border border-gray-200 rounded-lg space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: c.color }} />
                  <p className="text-sm font-semibold text-gray-800">{c.name}</p>
                  <span className="text-xs text-gray-400">— {c.ligand}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      λ_max (nm)
                    </label>
                    <input
                      type="number"
                      className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:outline-none text-sm"
                      value={c.lambdaMax}
                      min={300}
                      max={800}
                      onChange={(e) => updateLambda(i, Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Δ₀ (kJ/mol)</label>
                    <div className="p-2.5 bg-teal-50 border border-teal-200 rounded-lg text-sm font-bold text-teal-800">
                      {calcDelta(c.lambdaMax).toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Color visualization */}
                <WavelengthColor wavelength={c.lambdaMax} />
              </div>
            ))}
          </div>

          {/* Ranking */}
          <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <p className="text-sm font-semibold text-orange-800 mb-2">Urutan Kekuatan Ligan (berdasarkan Δ₀):</p>
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              {results.map((r, i) => (
                <React.Fragment key={r.index}>
                  <div className="flex items-center gap-1 bg-white px-2 py-1.5 sm:px-2.5 rounded-lg border border-orange-200">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: r.color }} />
                    <span className="text-xs font-medium text-gray-700 whitespace-nowrap">{r.ligand}</span>
                    <span className="text-xs text-gray-400">({r.delta.toFixed(1)})</span>
                  </div>
                  {i < results.length - 1 && <span className="text-gray-400 text-xs">&lt;</span>}
                </React.Fragment>
              ))}
            </div>
            <p className="text-xs text-orange-600 mt-2">
              Ligan dengan Δ₀ lebih besar → medan lebih kuat → menyerap cahaya pada λ lebih kecil.
            </p>
          </div>
        </SectionCard>

        {/* 6. Color interpretation */}
        <SectionCard title="Warna dan Panjang Gelombang" icon="🌈" accent="border-pink-500">
          <div className="text-sm text-gray-700 space-y-3 leading-relaxed">
            <p>
              Warna suatu larutan kompleks merupakan warna <strong>komplementer</strong> dari
              cahaya yang diserap. Jika larutan menyerap cahaya pada daerah kuning-hijau (≈ 570 nm),
              maka larutan akan tampak berwarna <strong>biru-ungu</strong>.
            </p>

            <InteractiveColorWheel />

            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 pr-3 font-semibold text-gray-700">λ diserap (nm)</th>
                    <th className="text-left py-2 pr-3 font-semibold text-gray-700">Warna diserap</th>
                    <th className="text-left py-2 font-semibold text-gray-700">Warna tampak</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="border-b border-gray-100">
                    <td className="py-1.5">400–435</td>
                    <td className="py-1.5">Violet</td>
                    <td className="py-1.5">Kuning-hijau</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-1.5">435–480</td>
                    <td className="py-1.5">Biru</td>
                    <td className="py-1.5">Kuning-oranye</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-1.5">480–500</td>
                    <td className="py-1.5">Biru-hijau</td>
                    <td className="py-1.5">Oranye-merah</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-1.5">500–560</td>
                    <td className="py-1.5">Hijau</td>
                    <td className="py-1.5">Merah-ungu</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-1.5">560–580</td>
                    <td className="py-1.5">Kuning-hijau</td>
                    <td className="py-1.5">Violet</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-1.5">580–595</td>
                    <td className="py-1.5">Kuning</td>
                    <td className="py-1.5">Biru</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-1.5">595–650</td>
                    <td className="py-1.5">Oranye</td>
                    <td className="py-1.5">Biru-hijau</td>
                  </tr>
                  <tr>
                    <td className="py-1.5">650–780</td>
                    <td className="py-1.5">Merah</td>
                    <td className="py-1.5">Hijau</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </SectionCard>

        {/* 7. Explanation prompt */}
        <SectionCard title="Penjelasan Urutan Kekuatan Ligan" icon="💡" defaultOpen={false} accent="border-emerald-500">
          <ThinkReveal question="Mengapa urutan kekuatan ligan: urea < oksalat < asetilasetonato?">
            <p>
              Urutan ini berkaitan dengan kemampuan ligan untuk berinteraksi dengan orbital d dari ion logam:
            </p>
            <ul className="list-disc list-inside text-xs space-y-1 mt-2">
              <li>
                <strong>Urea</strong> — monodentat, berdonasi melalui atom O lone pair;
                kemampuan back-bonding rendah → Δ₀ paling kecil, menyerap di λ paling besar.
              </li>
              <li>
                <strong>Oksalat</strong> — bidentat, berdonasi melalui 2 atom O;
                efek kelat meningkatkan stabilitas tetapi kekuatan medannya masih moderat.
              </li>
              <li>
                <strong>Asetilasetonato</strong> — bidentat, memiliki sistem π terdelokalisasi;
                memungkinkan sebagian π-back-bonding → Δ₀ paling besar, menyerap di λ paling kecil.
              </li>
            </ul>
            <p className="mt-2">
              Nilai Δ₀ yang lebih besar berarti ligan tersebut berposisi lebih tinggi di deret spektrokimia.
            </p>
          </ThinkReveal>
        </SectionCard>
      </div>
    </main>
  );
}
