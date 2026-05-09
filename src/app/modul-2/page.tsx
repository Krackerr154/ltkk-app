'use client';
import React from 'react';
import SectionCard from '@/components/SectionCard';
import ReactionEquation from '@/components/ReactionEquation';
import ColorSwatch from '@/components/ColorSwatch';
import LigandStructure from '@/components/LigandStructure';
import ThinkReveal from '@/components/ThinkReveal';
import KaTeX from '@/components/KaTeX';
import VaporDiffusion from '@/components/VaporDiffusion';
import OxalateSynthesisProcedure from '@/components/OxalateSynthesisProcedure';
import UreaSynthesisProcedure from '@/components/UreaSynthesisProcedure';

export default function Modul2() {
  return (
    <main className="min-h-screen p-4 sm:p-6">
      <div className="max-w-3xl mx-auto space-y-6 pb-12">
        <header className="space-y-2 pt-4">
          <p className="text-sm text-teal-600 font-medium">Modul 2</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Sintesis dan Rekristalisasi Kompleks Cr(III)
          </h1>
          <p className="text-gray-500 text-sm">
            Mempelajari sintesis tiga senyawa kompleks Cr(III) dengan ligan oksalat, urea, dan asetilasetonato
          </p>
        </header>

        {/* 1. Introduction / Theory */}
        <SectionCard title="Pendahuluan" icon="📖" accent="border-teal-500">
          <div className="text-sm text-gray-700 space-y-3 leading-relaxed">
            <p>
              Senyawa kompleks Cr(III) merupakan kompleks stabil dengan <strong>struktur oktahedral</strong> dan
              bersifat <strong>paramagnetik</strong> dengan momen magnet sebesar <strong>3,87 BM</strong>,
              sesuai dengan jumlah elektron tidak berpasangan pada konfigurasi{' '}
              <KaTeX math="3d^3" />.
            </p>
            <p>
              Jenis ligan (kuat atau lemah) <strong>tidak mempengaruhi sifat magnet</strong> dari kompleks Cr(III)
              karena ion Cr³⁺ memiliki 3 elektron d yang selalu menempati orbital{' '}
              <KaTeX math="t_{2g}" /> tanpa berpasangan, baik dalam medan lemah maupun kuat.
              Namun, jenis ligan berpengaruh terhadap <strong>transisi elektronik</strong> yang
              dapat diamati melalui spektrum serapan UV-Vis.
            </p>
            <div className="p-3 bg-teal-50 rounded-lg border border-teal-200">
              <p className="text-xs font-semibold text-teal-700 mb-1">Contoh Kompleks Cr(III):</p>
              <ul className="text-xs text-teal-800 space-y-0.5">
                <li>• <strong>Kationik:</strong> <KaTeX math="[Cr(bipy)_3]^{3+}" />, <KaTeX math="[Cr(phen)_3]^{3+}" />, <KaTeX math="[Cr(en)_3]^{3+}" /></li>
                <li>• <strong>Anionik:</strong> <KaTeX math="[Cr(ox)_3]^{3-}" /> (ox = oksalat)</li>
                <li>• <strong>Netral:</strong> <KaTeX math="[Cr(acac)_3]" /></li>
              </ul>
            </div>
          </div>
        </SectionCard>

        {/* 2. Ligand Structures */}
        <SectionCard title="Struktur Ligan" icon="🔬" accent="border-blue-500">
          <p className="text-sm text-gray-600 mb-4">
            Tiga ligan yang digunakan dalam sintesis kompleks Cr(III).
            Lingkaran hijau putus-putus menunjukkan <strong>atom donor</strong> yang berkoordinasi ke ion logam.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg flex flex-col items-center">
              <LigandStructure ligand="oxalate" />
            </div>
            <div className="bg-gray-50 p-3 rounded-lg flex flex-col items-center">
              <LigandStructure ligand="urea" />
            </div>
            <div className="bg-gray-50 p-3 rounded-lg flex flex-col items-center">
              <LigandStructure ligand="acac" />
            </div>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 text-xs text-blue-800">
            <p><strong>Bidentat</strong> = ligan yang mengikat melalui 2 atom donor (oksalat: O,O; acac: O,O).</p>
            <p><strong>Monodentat</strong> = ligan yang mengikat melalui 1 atom donor (urea: O). Untuk membentuk oktahedral, dibutuhkan 6 ligan urea.</p>
          </div>
        </SectionCard>

        {/* 3. Reaction Equations */}
        <SectionCard title="Sintesis Kompleks" icon="⚗️" accent="border-amber-500">
          <div className="space-y-5">
            {/* Complex 1 */}
            <div className="space-y-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">
                Kompleks 1: Kalium tris(oksalato)kromat(III)
              </p>
              
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col items-center">
                <p className="text-xs text-gray-500 mb-3 font-medium uppercase tracking-wider">Struktur Kompleks Tris(oksalato)kromat(III)</p>
                <img src="/images/complex-1.png" alt="Struktur K3[Cr(ox)3]" className="max-w-[200px] h-auto object-contain" />
              </div>

              <ReactionEquation
                label="Reduksi Cr(VI) → Cr(III) dengan asam oksalat"
                latex="\mathrm{K_2Cr_2O_7} + 7\mathrm{H_2C_2O_4} + 2\mathrm{K_2C_2O_4} \rightarrow 2\mathrm{K_3[Cr(C_2O_4)_3]} \cdot 3\mathrm{H_2O} + 6\mathrm{CO_2} \uparrow + \mathrm{H_2O}"
              />
              <div className="p-3 bg-gray-50 rounded-lg text-xs text-gray-600 space-y-2">
                  <p className="font-semibold text-gray-700">Fungsi reagen:</p>
                  <ul className="list-disc pl-4 space-y-1 text-gray-700">
                  <li><strong>K₂Cr₂O₇:</strong> Sumber ion Cr dan K⁺.</li>
                  <li><strong>H₂C₂O₄:</strong> Reduktor Cr(VI) → Cr(III) sekaligus sumber ligan oksalat.</li>
                  <li><strong>K₂C₂O₄·H₂O:</strong> Sumber K⁺ tambahan dan oksalat tambahan untuk memastikan semua Cr(III) membentuk kompleks.</li>
                  <li><strong>Etanol (saat pencucian):</strong> Pelarut untuk mencuci kristal karena kompleks kurang larut dalam etanol dingin dibandingkan air.</li>
                </ul>
              </div>
              <ThinkReveal question="Mengapa menggunakan K₂Cr₂O₇ (Cr(VI)) dan bukan garam Cr(III)?">
                <p>
                  Garam Cr(III) seperti CrCl₃·6H₂O menghasilkan ion akuo <KaTeX math="[Cr(H_2O)_6]^{3+}" /> yang sangat stabil dan lambat bereaksi (substitusi ligan yang lambat karena sifat <em>inert</em> dari ion d³).
                </p>
                <p>
                  Dengan menggunakan K₂Cr₂O₇, asam oksalat bertindak ganda: sebagai <strong>reduktor</strong> (mereduksi Cr(VI) → Cr(III)) sekaligus sebagai <strong>ligan</strong> yang langsung berkoordinasi saat ion Cr(III) terbentuk in situ. Ini menghindari kebutuhan untuk menggantikan ligan akuo yang sudah terikat kuat.
                </p>
              </ThinkReveal>

              {/* Practicum Procedure */}
              <OxalateSynthesisProcedure />
            </div>

            {/* Complex 2 */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <p className="text-sm font-semibold text-gray-700 mb-2">
                Kompleks 2: Heksaureakromium(III) klorida trihidrat
              </p>

              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col items-center">
                <p className="text-xs text-gray-500 mb-3 font-medium uppercase tracking-wider">Struktur Kompleks Heksaureakromium(III)</p>
                <img src="/images/complex-2.png" alt="Struktur [Cr(ur)6]3+" className="max-w-[200px] h-auto object-contain mix-blend-multiply" />
              </div>

              <ReactionEquation
                label="Substitusi ligan langsung"
                latex="\mathrm{CrCl_3} \cdot 6\mathrm{H_2O} + 6\mathrm{CO(NH_2)_2} \xrightarrow{\text{HCl, panas}} \mathrm{[Cr(CO(NH_2)_2)_6]Cl_3} \cdot 3\mathrm{H_2O} + 3\mathrm{H_2O}"
              />
              <div className="p-3 bg-gray-50 rounded-lg text-xs text-gray-600 space-y-2">
                  <p className="font-semibold text-gray-700">Fungsi reagen:</p>
                  <ul className="list-disc pl-4 space-y-1 text-gray-700">
                  <li><strong>CrCl₃·6H₂O:</strong> Menyediakan sumber ion Cr(III) awal yang akan disubstitusi ligannya.</li>
                  <li><strong>Urea [CO(NH₂)₂]:</strong> Ligan monodentat yang akan mendesak ligan H₂O (dibutuhkan 6 molekul urea untuk membentuk geometri oktahedral).</li>
                  <li><strong>HCl:</strong> Menjaga pH tetap asam agar ion Cr³⁺ tetap larut (mencegah pembentukan endapan Cr(OH)₃) selama proses pemanasan.</li>
                </ul>
              </div>

              {/* Practicum Procedure */}
              <UreaSynthesisProcedure />
            </div>

            {/* Complex 3 */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <p className="text-sm font-semibold text-gray-700 mb-2">
                Kompleks 3: Tris(asetilasetonato)kromium(III)
              </p>

              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col items-center">
                <p className="text-xs text-gray-500 mb-3 font-medium uppercase tracking-wider">Struktur Kompleks Tris(asetilasetonato)kromium(III)</p>
                <img src="/images/complex-3.png" alt="Struktur [Cr(acac)3]" className="max-w-[200px] h-auto object-contain" />
              </div>

              <ReactionEquation
                label="Substitusi ligan dengan bantuan urea sebagai basa"
                latex="\begin{aligned} \mathrm{CO(NH_2)_2} + \mathrm{H_2O} &\xrightarrow{\text{panas}} 2\mathrm{NH_3} + \mathrm{CO_2} \uparrow \\ \mathrm{C_5H_8O_2} + \mathrm{NH_3} &\rightleftharpoons \mathrm{C_5H_7O_2^-} + \mathrm{NH_4^+} \\ \mathrm{Cr^{3+}} + 3\mathrm{C_5H_7O_2^-} &\rightarrow \mathrm{[Cr(C_5H_7O_2)_3]} \downarrow \end{aligned}"
              />
              <div className="p-3 bg-gray-50 rounded-lg text-xs text-gray-600 space-y-2">
                  <p className="font-semibold text-gray-700">Fungsi reagen:</p>
                  <ul className="list-disc pl-4 space-y-1 text-gray-700">
                  <li><strong>CrCl₃·6H₂O:</strong> Sumber ion Cr(III).</li>
                  <li><strong>Urea [CO(NH₂)₂]:</strong> Bertindak sebagai <strong>basa tak langsung</strong>, karena saat dipanaskan menghasilkan NH₃. Amonia inilah yang membantu melepaskan proton dari asetilaseton.</li>
                  <li><strong>Asetilaseton [C₅H₈O₂]:</strong> Setelah kehilangan proton, bentuk anionnya (<KaTeX math="\mathrm{C_5H_7O_2^-}" /> atau <KaTeX math="\text{acac}^-" />) berkoordinasi dengan Cr(III) sebagai ligan bidentat pembentuk cincin kelat heksagonal. Dibutuhkan 3 molekul untuk mencapai bilangan koordinasi 6.</li>
                </ul>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* 4. Crystal Colors */}
        <SectionCard title="Warna Kristal" icon="🎨" accent="border-purple-500">
          <p className="text-sm text-gray-600 mb-3">
            Warna kompleks Cr(III) bergantung pada jenis ligan karena perbedaan energi pemisahan medan kristal{' '}
            <KaTeX math="\Delta_0" /> menyebabkan penyerapan cahaya pada panjang gelombang yang berbeda.
          </p>
          <div className="grid sm:grid-cols-3 gap-3">
            <ColorSwatch
              color="#2d8c7f"
              label="K₃[Cr(ox)₃]·3H₂O"
              formula="Kalium tris(oksalato)kromat(III)"
              hexCode="#2d8c7f — hijau kebiruan"
            />
            <ColorSwatch
              color="#4a8c3f"
              label="[Cr(ur)₆]Cl₃·3H₂O"
              formula="Heksaureakromium(III) klorida"
              hexCode="#4a8c3f — hijau"
            />
            <ColorSwatch
              color="#6b2137"
              label="[Cr(acac)₃]"
              formula="Tris(asetilasetonato)kromium(III)"
              hexCode="#6b2137 — marun/merah-ungu"
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Warna marun pada [Cr(acac)₃] menunjukkan penyerapan cahaya di daerah hijau-biru (λ lebih pendek → Δ₀ lebih besar) — acac⁻ berposisi lebih tinggi di deret spektrokimia dibanding oksalat.
          </p>
        </SectionCard>

        {/* 5. Recrystallization */}
        <SectionCard title="Rekristalisasi" icon="💎" defaultOpen={true} accent="border-cyan-500">
          <div className="text-sm text-gray-700 space-y-3 leading-relaxed">
            <p>
              Isolasi senyawa kompleks dilakukan dengan mencapai <strong>kondisi larutan jenuh</strong>:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-xs text-gray-600">
              <li>Penguapan pelarut perlahan → bibit kristal terbentuk di permukaan</li>
              <li>Pendinginan larutan → lebih banyak endapan mengkristal</li>
              <li>Penangas es / refrigerator untuk mempercepat pengendapan</li>
            </ol>
            <p>
              Metode <strong>difusi uap</strong> digunakan untuk rekristalisasi:
              kristal dilarutkan dalam pelarut (air/etanol) dalam botol kecil,
              ditempatkan di dalam botol besar berisi anti-pelarut (etanol/aseton).
              Uap anti-pelarut perlahan berdifusi → menurunkan kelarutan → kristal tumbuh perlahan dengan kualitas tinggi.
            </p>
            
            <VaporDiffusion />
          </div>
        </SectionCard>
      </div>
    </main>
  );
}

