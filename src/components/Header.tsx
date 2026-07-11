/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Leaf } from 'lucide-react';

interface HeaderProps {
  title: string;
  onOpenSettings?: () => void;
}

export default function Header({ title, onOpenSettings }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-black/[0.06] flex flex-col justify-center items-center w-full px-6 py-4">
      <div className="flex justify-between items-center w-full max-w-2xl">
        <div className="flex items-center gap-3">
          <Leaf className="w-6 h-6 text-black animate-pulse" />
          <h1 className="text-sm font-semibold tracking-[0.2em] uppercase font-sans text-black">
            {title}
          </h1>
        </div>
        {onOpenSettings && (
          <button 
            onClick={onOpenSettings}
            className="w-10 h-10 flex items-center justify-center hover:bg-black/5 active:scale-95 transition-all rounded-full cursor-pointer"
            aria-label="Paramètres"
          >
            <svg 
              className="w-5 h-5 text-black" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
              />
            </svg>
          </button>
        )}
      </div>
    </header>
  );
}
