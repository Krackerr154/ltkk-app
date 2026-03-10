import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero with subtle gradient bg */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-cyan-50/30 to-indigo-50/40 pointer-events-none" />
        <div className="absolute top-20 -right-20 w-72 h-72 bg-teal-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-20 w-60 h-60 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-12 pb-16 sm:pt-20 sm:pb-24">
          <header className="text-center space-y-4 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-100/60 text-teal-700 text-xs font-medium rounded-full mb-2">
              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse" />
              Interactive Learning Platform
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              <span className="text-gradient">LTKK</span>{' '}
              <span className="text-gray-800">Interactive</span>
            </h1>
            <p className="text-gray-500 text-lg sm:text-xl max-w-xl mx-auto leading-relaxed">
              Pembelajaran Interaktif Praktikum Kimia Koordinasi
            </p>
            <p className="text-sm text-gray-400 max-w-md mx-auto">
              Eksplorasi sintesis, rekristalisasi, dan spektroskopi UV-Vis kompleks Cr(III) melalui visualisasi dan kalkulator interaktif.
            </p>
          </header>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-6 pb-16 space-y-10">
        {/* Module cards */}
        <section className="grid sm:grid-cols-2 gap-5 stagger-children">
          <Link
            href="/modul-2"
            className="group relative block p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-teal-200 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 bg-teal-50 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300">
                🧪
              </div>
              <div>
                <p className="text-xs font-medium text-teal-600 uppercase tracking-wider">Modul 2</p>
                <h2 className="text-lg font-bold text-gray-800 group-hover:text-teal-700 transition-colors">
                  Sintesis &amp; Rekristalisasi
                </h2>
              </div>
            </div>
            <p className="text-gray-500 text-sm mb-4 leading-relaxed">
              Sintesis tiga kompleks Cr(III) dengan ligan oksalat, urea, dan asetilasetonato.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {['Teori', 'Reaksi', 'Struktur Ligan', 'Stoikiometri', 'Warna'].map((tag) => (
                <span key={tag} className="px-2 py-0.5 bg-gray-50 text-gray-500 text-xs rounded-md border border-gray-100">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-4 flex items-center text-sm font-medium text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity">
              Mulai belajar
              <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          <Link
            href="/modul-6"
            className="group relative block p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-indigo-200 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 bg-indigo-50 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300">
                🌈
              </div>
              <div>
                <p className="text-xs font-medium text-indigo-600 uppercase tracking-wider">Modul 6</p>
                <h2 className="text-lg font-bold text-gray-800 group-hover:text-indigo-700 transition-colors">
                  Spektrum UV-Vis &amp; Δ₀
                </h2>
              </div>
            </div>
            <p className="text-gray-500 text-sm mb-4 leading-relaxed">
              Teori medan kristal, pengukuran UV-Vis, dan penentuan energi pemisahan Δ₀.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {['Medan Kristal', 'Orbital d', 'Spektrokimia', 'Kalkulator Δ₀', 'Warna'].map((tag) => (
                <span key={tag} className="px-2 py-0.5 bg-gray-50 text-gray-500 text-xs rounded-md border border-gray-100">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-4 flex items-center text-sm font-medium text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
              Mulai belajar
              <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </section>

        {/* About card */}
        <section className="animate-fade-in-up bg-white/70 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-9 h-9 bg-amber-50 rounded-lg flex items-center justify-center text-lg flex-shrink-0">📘</div>
            <div>
              <h3 className="font-bold text-gray-800">Tentang Praktikum Ini</h3>
              <p className="text-xs text-gray-400 mt-0.5">Laboratorium Teknik Kimia Koordinasi</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Praktikum ini mempelajari senyawa kompleks Cr(III) dengan tiga ligan berbeda:{' '}
            <strong className="text-teal-700">oksalat</strong> (K₃[Cr(C₂O₄)₃]),{' '}
            <strong className="text-teal-700">urea</strong> ([Cr(ur)₆]Cl₃·3H₂O), dan{' '}
            <strong className="text-teal-700">asetilasetonato</strong> ([Cr(acac)₃]).
          </p>
          <div className="grid grid-cols-3 gap-3 mt-5">
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <p className="text-2xl font-bold text-teal-700">3</p>
              <p className="text-xs text-gray-500 mt-0.5">Kompleks</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <p className="text-2xl font-bold text-indigo-700">3</p>
              <p className="text-xs text-gray-500 mt-0.5">Ligan</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <p className="text-2xl font-bold text-amber-600">2</p>
              <p className="text-xs text-gray-500 mt-0.5">Modul</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
