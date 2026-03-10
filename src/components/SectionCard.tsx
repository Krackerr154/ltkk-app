'use client';
import { useState, useRef, useEffect, ReactNode } from 'react';

interface SectionCardProps {
  title: string;
  icon?: string;
  children: ReactNode;
  defaultOpen?: boolean;
  accent?: string;
}

export default function SectionCard({
  title,
  icon,
  children,
  defaultOpen = true,
  accent = 'border-teal-500',
}: SectionCardProps) {
  const [open, setOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [open, children]);

  return (
    <section className={`bg-white rounded-2xl shadow-sm border border-gray-100 border-l-4 ${accent} overflow-hidden transition-shadow hover:shadow-md`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-gray-50/50 transition-colors group"
        aria-expanded={open}
      >
        <h2 className="text-base sm:text-lg font-bold text-gray-800 flex items-center gap-2.5">
          {icon && <span className="text-lg">{icon}</span>}
          {title}
        </h2>
        <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
          open ? 'bg-gray-100 rotate-180' : 'bg-gray-50 group-hover:bg-gray-100'
        }`}>
          <svg
            className="w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      <div
        ref={contentRef}
        className="transition-all duration-350 ease-in-out overflow-hidden"
        style={{
          maxHeight: open ? contentHeight ?? 'none' : 0,
          opacity: open ? 1 : 0,
        }}
      >
        <div className="px-5 sm:px-6 pb-5 sm:pb-6 space-y-4">{children}</div>
      </div>
    </section>
  );
}
