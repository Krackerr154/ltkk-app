'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import KaTeX from './KaTeX';

export default function TermSymbolD3() {
  const [freeOrbitals, setFreeOrbitals] = useState<number[]>([0, 0, 0, 0, 0]);
  const freeMlValues = [2, 1, 0, -1, -2];

  const [octOrbitals, setOctOrbitals] = useState<number[]>([0, 0, 0, 0, 0]);
  // 0,1,2 = t2g (dxy, dxz, dyz)
  // 3,4 = eg (dx2-y2, dz2)

  const maxElectrons = 3;

  const toggleFree = (index: number) => {
    const current = freeOrbitals.filter(e => e > 0).length;
    const newOrbs = [...freeOrbitals];
    if (newOrbs[index] === 1) newOrbs[index] = 0;
    else if (current < maxElectrons) newOrbs[index] = 1;
    setFreeOrbitals(newOrbs);
  };

  const toggleOct = (index: number) => {
    const current = octOrbitals.filter(e => e > 0).length;
    const newOrbs = [...octOrbitals];
    if (newOrbs[index] === 1) newOrbs[index] = 0;
    else if (current < maxElectrons) newOrbs[index] = 1;
    setOctOrbitals(newOrbs);
  };

  // --- FREE ION CALCS ---
  const freeCount = freeOrbitals.filter(e => e > 0).length;
  const isFreeComplete = freeCount === maxElectrons;
  const L = freeOrbitals.reduce((acc, val, idx) => acc + (val === 1 ? freeMlValues[idx] : 0), 0);
  const freeS = freeCount * 0.5;
  const freeMultiplicity = 2 * freeS + 1;

  const getTermLetter = (l: number) => {
    const terms = ['S', 'P', 'D', 'F', 'G', 'H', 'I'];
    return terms[Math.abs(l)] || '?';
  };

  const isFreeGroundState = isFreeComplete && freeOrbitals[0] === 1 && freeOrbitals[1] === 1 && freeOrbitals[2] === 1;

  // --- OCTAHEDRAL CALCS ---
  const octCount = octOrbitals.filter(e => e > 0).length;
  const isOctComplete = octCount === maxElectrons;
  const t2gCount = octOrbitals[0] + octOrbitals[1] + octOrbitals[2];
  const egCount = octOrbitals[3] + octOrbitals[4];
  const isOctGroundState = isOctComplete && t2gCount === 3 && egCount === 0;

  // Reusable electron SVGs
  const ElectronSVG = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="19" x2="12" y2="5"></line>
      <polyline points="5 12 12 5 19 12"></polyline>
    </svg>
  );

  return (
    <div className="space-y-6">
      {/* PHASE 1: FREE ION */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 lg:p-8 shadow-sm">
        <p className="text-sm text-gray-600 mb-6 text-center max-w-lg mx-auto leading-relaxed">
          Tahap 1: Isi <strong>3 elektron</strong> ke dalam orbital d untuk mencari <strong>Simbol Term Bebas (Free Ion)</strong> keadaan dasar ion Cr³⁺. <br className="hidden sm:block" />
          <span className="text-gray-400">Klik kotak orbital (dari kiri) untuk memasukkan/mengeluarkan elektron tunggal.</span>
        </p>

        <div className="flex justify-center gap-2 sm:gap-4 lg:gap-6 mb-3">
          {freeMlValues.map((ml, i) => (
            <div key={i} className="flex flex-col items-center z-10">
              <span className="text-xs text-gray-500 mb-2 font-mono font-medium">{ml > 0 ? `+${ml}` : ml}</span>
              <button
                onClick={() => toggleFree(i)}
                disabled={freeCount === maxElectrons && freeOrbitals[i] === 0}
                className={`w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center border-2 rounded-xl transition-all duration-200 ease-in-out cursor-pointer relative shadow-sm
                  bg-gray-50 hover:bg-gray-100 border-gray-200
                  ${freeOrbitals[i] === 1 ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-500/20' : ''}
                  ${freeCount === maxElectrons && freeOrbitals[i] === 0 ? 'opacity-40 cursor-not-allowed' : ''}
                `}
              >
                <AnimatePresence>
                  {freeOrbitals[i] === 1 && (
                    <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} className="text-purple-600">
                      <ElectronSVG />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-gray-400 font-medium tracking-wider uppercase mb-8">
          Nilai \text{<KaTeX math="M_L" />}
        </p>

        {/* Free Ion Calculation Result */}
        <div className="pt-6 border-t border-gray-100 min-h-[140px] flex flex-col justify-center">
          {isFreeComplete ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`p-5 rounded-xl border ${isFreeGroundState ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
              <div className="flex flex-col md:flex-row gap-6 justify-between h-full items-start md:items-center">
                <div className="space-y-4 flex-1">
                  <h4 className={`text-base font-bold flex items-center gap-2 ${isFreeGroundState ? 'text-green-800' : 'text-amber-800'}`}>
                    {isFreeGroundState ? '✅ Keadaan Dasar Ditemukan!' : '⚠️ Bukan Keadaan Dasar'}
                  </h4>
                  <div className="text-sm space-y-2 text-gray-700 bg-white/50 p-4 rounded-lg border border-white/60">
                    <p className="flex justify-between items-center">
                      <span><strong>Spin Total (S):</strong> {freeS.toFixed(1)}</span>
                      <span className="text-gray-500 text-xs px-2 py-1 bg-white rounded-md shadow-sm border border-gray-100 flex gap-2"><span>Multiplisitas = 2({freeS}) + 1 = <strong>{freeMultiplicity}</strong></span></span>
                    </p>
                    <p className="flex justify-between items-center">
                      <span><strong>Momentum Orbital (L):</strong> {L}</span>
                      <span className="text-gray-500 text-xs px-2 py-1 bg-white rounded-md shadow-sm border border-gray-100">Term = <strong>{getTermLetter(L)}</strong></span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center w-full md:w-auto min-w-[140px] bg-white rounded-xl p-5 border shadow-sm">
                  <span className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-widest">Simbol Term</span>
                  <div className="text-4xl md:text-5xl font-serif text-gray-800">
                    <KaTeX math={`^${freeMultiplicity}\\text{${getTermLetter(L)}}`} display={false} />
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-sm text-gray-400 p-8 border-2 border-dashed border-gray-100 rounded-xl bg-gray-50/50 text-center">
              Tempatkan {maxElectrons - freeCount} elektron lagi. <br />(Isi orbital dengan nilai L terbesar terlebih dahulu untuk ground state)
            </div>
          )}
        </div>
      </div>

      {/* PHASE 2: OCTAHEDRAL SPLITTING (Only visible when Free Ion ground state is found) */}
      <AnimatePresence>
        {isFreeGroundState && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="overflow-hidden"
          >
            <div className="bg-purple-50 text-purple-900 p-5 sm:p-6 rounded-xl border border-purple-200 text-sm shadow-sm mt-3 mb-2">
              <p className="mb-4">
                <strong>Tahap 2: Pemisahan Oktahedral (<KaTeX math="O_h" />):</strong> Dalam pengaruh ligan oktahedral, kelima orbital terbelah menjadi dua kelompok energi (<KaTeX math="t_{2g}" /> dan <KaTeX math="e_g" />).
                Isi kotak orbital yang baru terbelah ini dengan 3 elektron untuk menentukan <strong>Term Simbol Oktahedral</strong>.
              </p>

              <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 shadow-inner overflow-hidden relative mb-4">
                {/* Octahedral Diagram Area - Light Theme */}
                <div className="relative max-w-lg mx-auto my-4 font-sans">

                  {/* Vertical Delta_o Arrow */}
                  <div className="absolute right-0 top-2 bottom-6 w-12 flex-col items-center justify-between text-gray-400 hidden sm:flex">
                    <div className="w-full border-t border-dashed border-gray-300"></div>
                    <div className="flex-1 w-px bg-gray-300 relative my-1">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-b-[6px] border-transparent border-b-gray-400"></div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-gray-500 px-1 font-serif text-sm">
                        <KaTeX math="\Delta_o" />
                      </div>
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[6px] border-transparent border-t-gray-400"></div>
                    </div>
                    <div className="w-full border-t border-dashed border-gray-300"></div>
                  </div>

                  {/* e_g level */}
                  <div className="flex items-center mb-8 relative">
                    <div className="w-20 text-right pr-4 text-[11px] sm:text-xs text-gray-500 font-sans tracking-tight leading-loose">
                      <KaTeX math="e_g" /> <br /><span className="text-[10px] text-gray-400">(+6Dq)</span>
                    </div>
                    <div className="flex-1 flex justify-center gap-4 relative">
                      <div className="absolute top-1/2 left-0 w-full border-t border-gray-200 z-0 -translate-y-[10px]"></div>
                      {/* Box dx2-y2 */}
                      <div className="flex flex-col items-center z-10">
                        <button onClick={() => toggleOct(3)} disabled={octCount === maxElectrons && octOrbitals[3] === 0} className={`w-14 h-11 border-2 rounded-md transition-all cursor-pointer bg-white hover:bg-gray-50 flex items-center justify-center shadow-sm ${octOrbitals[3] === 1 ? 'border-purple-500 ring-1 ring-purple-500/20' : 'border-gray-300'}`}>
                          <AnimatePresence>{octOrbitals[3] === 1 && <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} exit={{ scale: 0.5 }} className="text-purple-600"><ElectronSVG /></motion.div>}</AnimatePresence>
                        </button>
                        <span className="text-[10px] text-gray-400 mt-1 font-mono">dx²-y²</span>
                      </div>
                      {/* Box dz2 */}
                      <div className="flex flex-col items-center z-10">
                        <button onClick={() => toggleOct(4)} disabled={octCount === maxElectrons && octOrbitals[4] === 0} className={`w-14 h-11 border-2 rounded-md transition-all cursor-pointer bg-white hover:bg-gray-50 flex items-center justify-center shadow-sm ${octOrbitals[4] === 1 ? 'border-purple-500 ring-1 ring-purple-500/20' : 'border-gray-300'}`}>
                          <AnimatePresence>{octOrbitals[4] === 1 && <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} exit={{ scale: 0.5 }} className="text-purple-600"><ElectronSVG /></motion.div>}</AnimatePresence>
                        </button>
                        <span className="text-[10px] text-gray-400 mt-1 font-mono">dz²</span>
                      </div>
                    </div>
                    <div className="w-12 sm:w-16"></div> {/* spacer */}
                  </div>

                  {/* t_2g level */}
                  <div className="flex items-center relative">
                    <div className="w-20 text-right pr-4 text-[11px] sm:text-xs text-gray-500 font-sans tracking-tight leading-loose">
                      <KaTeX math="t_{2g}" /> <br /><span className="text-[10px] text-gray-400">(-4Dq)</span>
                    </div>
                    <div className="flex-1 flex justify-center gap-4 relative">
                      <div className="absolute top-1/2 left-0 w-full border-t border-gray-200 z-0 -translate-y-[10px]"></div>
                      {/* Box dxy */}
                      <div className="flex flex-col items-center z-10">
                        <button onClick={() => toggleOct(0)} disabled={octCount === maxElectrons && octOrbitals[0] === 0} className={`w-14 h-11 border-2 rounded-md transition-all cursor-pointer bg-white hover:bg-gray-50 flex items-center justify-center shadow-sm ${octOrbitals[0] === 1 ? 'border-purple-500 ring-1 ring-purple-500/20' : 'border-gray-300'}`}>
                          <AnimatePresence>{octOrbitals[0] === 1 && <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} exit={{ scale: 0.5 }} className="text-purple-600"><ElectronSVG /></motion.div>}</AnimatePresence>
                        </button>
                        <span className="text-[10px] text-gray-400 mt-1 font-mono">dxy</span>
                      </div>
                      {/* Box dxz */}
                      <div className="flex flex-col items-center z-10">
                        <button onClick={() => toggleOct(1)} disabled={octCount === maxElectrons && octOrbitals[1] === 0} className={`w-14 h-11 border-2 rounded-md transition-all cursor-pointer bg-white hover:bg-gray-50 flex items-center justify-center shadow-sm ${octOrbitals[1] === 1 ? 'border-purple-500 ring-1 ring-purple-500/20' : 'border-gray-300'}`}>
                          <AnimatePresence>{octOrbitals[1] === 1 && <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} exit={{ scale: 0.5 }} className="text-purple-600"><ElectronSVG /></motion.div>}</AnimatePresence>
                        </button>
                        <span className="text-[10px] text-gray-400 mt-1 font-mono">dxz</span>
                      </div>
                      {/* Box dyz */}
                      <div className="flex flex-col items-center z-10">
                        <button onClick={() => toggleOct(2)} disabled={octCount === maxElectrons && octOrbitals[2] === 0} className={`w-14 h-11 border-2 rounded-md transition-all cursor-pointer bg-white hover:bg-gray-50 flex items-center justify-center shadow-sm ${octOrbitals[2] === 1 ? 'border-purple-500 ring-1 ring-purple-500/20' : 'border-gray-300'}`}>
                          <AnimatePresence>{octOrbitals[2] === 1 && <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} exit={{ scale: 0.5 }} className="text-purple-600"><ElectronSVG /></motion.div>}</AnimatePresence>
                        </button>
                        <span className="text-[10px] text-gray-400 mt-1 font-mono">dyz</span>
                      </div>
                    </div>
                    <div className="w-12 sm:w-16"></div> {/* spacer */}
                  </div>

                </div>

                {/* Octahedral Calculation Result */}
                <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col items-center justify-center min-h-[100px]">
                  <AnimatePresence mode="wait">
                    {!isOctComplete ? (
                      <motion.div key="inc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center text-sm text-gray-500 font-medium">
                        {octCount === 0 ? "Tempatkan 3 elektron ke diagram oktahedral ini." : `Sisa ${maxElectrons - octCount} elektron.`}
                      </motion.div>
                    ) : isOctGroundState ? (
                      <motion.div key="gs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full">
                        <div className="mb-4 text-center">
                          <div className="inline-flex items-center gap-3 bg-green-50 px-5 py-2.5 rounded-xl border border-green-200 shadow-sm">
                            <span className="text-2xl font-serif font-bold text-green-900 border-r border-green-200 pr-3"><KaTeX math="^4A_{2g}" /></span>
                            <span className="text-green-700 font-medium tracking-wide text-sm">— ground state</span>
                          </div>
                        </div>
                        <div className="bg-white p-5 rounded-xl border border-gray-200 text-gray-700 text-sm max-w-2xl mx-auto shadow-sm leading-relaxed">
                          <p className="mb-3 text-purple-800 font-semibold flex items-center gap-2">
                            <span className="w-5 h-5 rounded-[4px] bg-purple-100 text-purple-700 flex items-center justify-center text-xs border border-purple-200">✓</span> Cara Menentukan Term Simbol:
                          </p>
                          <p className="mb-3">
                            Ketiga elektron menempati orbital degeneracy-<KaTeX math="t_{2g}" /> yang berenergi lebih rendah sehingga menjadi keadaan dasar oktahedral.
                          </p>
                          <ul className="text-left inline-block space-y-1.5 text-gray-600 bg-gray-50 p-4 rounded-lg w-full">
                            <li>• <strong>Multiplisitas Spin:</strong> 3 elektron searah <KaTeX math="\rightarrow S = \frac{3}{2} \rightarrow 2S+1 = 4" /> (Kuartet).</li>
                            <li>• <strong>Aspek Simetri Spasial (<KaTeX math="L" />):</strong> Orbital terisi tepat separuh pada sub-level <KaTeX math="t_{2g}^3" /> menjadikannya simetris bola (<KaTeX math="A_2" />).</li>
                            <li>• <strong>Hasil:</strong> Term <KaTeX math="^4A_{2g}" /> (Singly Degenerate / tingkat tunggal).</li>
                          </ul>
                        </div>
                      </motion.div>
                    ) : (t2gCount === 2 && egCount === 1) ? (
                      <motion.div key="ex1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full">
                        <div className="mb-4 text-center">
                          <div className="inline-flex flex-wrap items-center justify-center gap-3 bg-amber-50 px-5 py-2.5 rounded-xl border border-amber-200 shadow-sm">
                            <span className="text-2xl font-serif font-bold text-amber-900 border-r border-amber-200 pr-3 flex items-center gap-2">
                              <KaTeX math="^4T_{2g}" /> <span className="text-sm font-sans mx-1">/</span> <KaTeX math="^4T_{1g}" />
                            </span>
                            <span className="text-amber-700 font-medium tracking-wide text-[11px] sm:text-sm">— Keadaan Tereksitasi</span>
                          </div>
                        </div>
                        <div className="bg-white p-5 rounded-xl border border-gray-200 text-gray-700 text-sm max-w-2xl mx-auto shadow-sm leading-relaxed">
                          <p className="mb-3 text-amber-700 font-semibold flex items-center gap-2">
                            <span className="w-5 h-5 rounded-[4px] bg-amber-100 text-amber-800 flex items-center justify-center text-xs border border-amber-200">!</span> Asal Simbol <KaTeX math="^4T_{2g}" /> dan <KaTeX math="^4T_{1g}" />
                          </p>
                          <p className="mb-3 text-gray-600">
                            Satu elektron tereksitasi ke <KaTeX math="e_g" /> menghasilkan konfigurasi <KaTeX math="(t_{2g})^2(e_g)^1" />. Mengapa muncul term <KaTeX math="T_{2g}" /> dan <KaTeX math="T_{1g}" />?
                          </p>
                          <ul className="text-left inline-block space-y-2 text-gray-600 bg-amber-50/50 p-4 rounded-lg border border-amber-100/50 w-full mt-1">
                            <li>• <strong>Pendekatan Teori Grup (Produk Silang):</strong> Interaksi spasial antara "hole" di orbital <KaTeX math="t_{2g}" /> (simetri <KaTeX math="T_{2g}" />) dan elektron tunggal di orbital <KaTeX math="e_g" /> (simetri <KaTeX math="E_g" />) dihitung menggunakan perkalian (direct product) simetrinya.</li>
                            <li>• <strong>Rumus:</strong> <KaTeX math="T_{2g} \otimes E_g = T_{1g} \oplus T_{2g}" />.</li>
                            <li>• Karenanya, konfigurasi ini membelah (split) menjadi dua keadaan eksitasi <strong>Triply Degenerate</strong> dengan spin tetap paralel (S=3/2), yaitu <KaTeX math="^4T_{2g}" /> dan <KaTeX math="^4T_{1g}(F)" />.</li>
                          </ul>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div key="ex2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full">
                        <div className="mb-4 text-center">
                          <div className="inline-flex flex-wrap items-center justify-center gap-3 bg-rose-50 px-5 py-2.5 rounded-xl border border-rose-200 shadow-sm">
                            <span className="text-2xl font-serif font-bold text-rose-900 border-r border-rose-200 pr-3">
                              <KaTeX math="^4T_{1g}(P)" />
                            </span>
                            <span className="text-rose-700 font-medium tracking-wide text-[11px] sm:text-sm">— Eksitasi Tingkat Tinggi</span>
                          </div>
                        </div>
                        <div className="bg-white p-5 rounded-xl border border-gray-200 text-gray-700 text-sm max-w-2xl mx-auto shadow-sm leading-relaxed">
                          <p className="mb-3 text-rose-700 font-semibold flex items-center gap-2">
                            <span className="w-5 h-5 rounded-[4px] bg-rose-100 text-rose-800 flex items-center justify-center text-xs border border-rose-200">!!</span> Asal Simbol <KaTeX math="^4T_{1g}(P)" />
                          </p>
                          <p className="mb-3 text-gray-600">
                            Dua elektron dieksitasi ke orbital berenergi tinggi membentuk konfigurasi <KaTeX math="(t_{2g})^1(e_g)^2" />. Mengapa mendapat <KaTeX math="T_{1g}" /> lagi?
                          </p>
                          <ul className="text-left inline-block space-y-2 text-gray-600 bg-rose-50/50 p-4 rounded-lg border border-rose-100/50 w-full mt-1">
                            <li>• <strong>Pendekatan Teori Grup:</strong> Dua elektron ber-spin paralel di level <KaTeX math="e_g" /> bergabung memberikan simetri spasial total <KaTeX math="A_{2g}" />. Satu elektron tersisa di <KaTeX math="t_{2g}" /> memiliki simetri <KaTeX math="T_{2g}" />.</li>
                            <li>• <strong>Rumus Produk Silang:</strong> <KaTeX math="T_{2g} \otimes A_{2g} = T_{1g}" />.</li>
                            <li>• Keadaan ini juga <strong>Triply Degenerate</strong>, tetapi energinya lebih tinggi dari <KaTeX math="^4T_{1g}(F)" />. Karena kedua term berbagi simetri spasial namun berasal dari sifat interaksi spin yang berbeda di ion bebas, term tereksitasi ganda ini diturunkan/berkorelasi dengan term ion bebas <KaTeX math="^4P" />, sehingga disimbolkan sebagai <KaTeX math="^4T_{1g}(P)" />.</li>
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
