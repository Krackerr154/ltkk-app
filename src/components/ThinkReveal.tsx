'use client';
import { useState, ReactNode } from 'react';

interface ThinkRevealProps {
  question: string;
  children: ReactNode;
}

export default function ThinkReveal({ question, children }: ThinkRevealProps) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="border border-indigo-200 rounded-lg overflow-hidden">
      <div className="p-4 bg-indigo-50">
        <p className="text-sm font-medium text-indigo-800 flex items-center gap-2">
          <span>💡</span> {question}
        </p>
      </div>
      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          className="w-full p-3 text-sm text-indigo-600 hover:bg-indigo-50 transition-colors font-medium"
        >
          Tap to reveal explanation →
        </button>
      ) : (
        <div className="p-4 text-sm text-gray-700 space-y-2 bg-white border-t border-indigo-100">
          {children}
        </div>
      )}
    </div>
  );
}
