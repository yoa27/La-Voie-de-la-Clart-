/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GratitudeEntry } from '../types';
import { Calendar, Trash2, CheckCircle } from 'lucide-react';

interface GratitudeTabProps {
  gratitudeEntries: GratitudeEntry[];
  setGratitudeEntries: React.Dispatch<React.SetStateAction<GratitudeEntry[]>>;
}

export default function GratitudeTab({ gratitudeEntries, setGratitudeEntries }: GratitudeTabProps) {
  const [item1, setItem1] = useState('');
  const [item2, setItem2] = useState('');
  const [item3, setItem3] = useState('');
  const [buttonState, setButtonState] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!item1.trim() && !item2.trim() && !item3.trim()) {
      alert("Veuillez remplir au moins un champ de gratitude avant d'enregistrer.");
      return;
    }

    const newEntry: GratitudeEntry = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      items: [
        item1.trim() || "Un moment de silence et de présence.",
        item2.trim() || "Le souffle de vie qui m'anime.",
        item3.trim() || "La beauté simple de l'instant."
      ]
    };

    const updated = [newEntry, ...gratitudeEntries];
    setGratitudeEntries(updated);
    localStorage.setItem('clarte_gratitude_entries', JSON.stringify(updated));

    // Show visual confirmation on the button
    setButtonState('success');
    
    // Clear inputs after animation
    setTimeout(() => {
      setItem1('');
      setItem2('');
      setItem3('');
      setButtonState('idle');
    }, 2000);
  };

  const handleDeleteEntry = (id: string) => {
    if (!window.confirm("Voulez-vous supprimer cette entrée de votre journal de gratitude ?")) return;
    const updated = gratitudeEntries.filter(entry => entry.id !== id);
    setGratitudeEntries(updated);
    localStorage.setItem('clarte_gratitude_entries', JSON.stringify(updated));
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="w-full max-w-xl mx-auto py-8 px-4 pb-32">
      
      {/* Header Section */}
      <section className="mb-12 text-center">
        <h1 className="font-sans text-3xl font-medium text-black mb-3">
          Gratitude
        </h1>
        <p className="font-sans text-xs font-semibold text-black/50 uppercase tracking-[0.15em] leading-relaxed">
          Notez 3 choses pour lesquelles vous êtes reconnaissant aujourd'hui
        </p>
      </section>

      {/* Gratitude Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Item 1 */}
        <div className="relative pt-4 pb-1 border-b border-black/10 focus-within:border-black transition-colors">
          <span className="absolute left-0 top-0 font-sans text-xs font-semibold text-black/40">
            01
          </span>
          <input 
            type="text"
            value={item1}
            onChange={(e) => setItem1(e.target.value)}
            placeholder="J'éprouve de la gratitude pour..."
            className="w-full bg-transparent border-none text-base font-serif pt-4 pb-1 pl-6 pr-2 focus:outline-none placeholder:text-black/20 placeholder:italic text-black"
          />
        </div>

        {/* Item 2 */}
        <div className="relative pt-4 pb-1 border-b border-black/10 focus-within:border-black transition-colors">
          <span className="absolute left-0 top-0 font-sans text-xs font-semibold text-black/40">
            02
          </span>
          <input 
            type="text"
            value={item2}
            onChange={(e) => setItem2(e.target.value)}
            placeholder="Je suis reconnaissant pour..."
            className="w-full bg-transparent border-none text-base font-serif pt-4 pb-1 pl-6 pr-2 focus:outline-none placeholder:text-black/20 placeholder:italic text-black"
          />
        </div>

        {/* Item 3 */}
        <div className="relative pt-4 pb-1 border-b border-black/10 focus-within:border-black transition-colors">
          <span className="absolute left-0 top-0 font-sans text-xs font-semibold text-black/40">
            03
          </span>
          <input 
            type="text"
            value={item3}
            onChange={(e) => setItem3(e.target.value)}
            placeholder="Ma troisième pensée positive..."
            className="w-full bg-transparent border-none text-base font-serif pt-4 pb-1 pl-6 pr-2 focus:outline-none placeholder:text-black/20 placeholder:italic text-black"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-6 flex justify-center">
          <button 
            type="submit"
            disabled={buttonState === 'success'}
            className={`font-sans font-semibold text-xs py-3.5 px-16 uppercase tracking-widest border transition-all duration-300 w-full md:w-auto cursor-pointer ${
              buttonState === 'success'
                ? 'bg-black text-white border-black flex items-center justify-center gap-2'
                : 'bg-black text-white border-black hover:bg-black/90 active:scale-95'
            }`}
          >
            {buttonState === 'success' ? (
              <>
                <CheckCircle className="w-4 h-4 animate-bounce" />
                <span>Enregistré</span>
              </>
            ) : (
              <span>Enregistrer</span>
            )}
          </button>
        </div>
      </form>

      {/* Decorative Line Element (Atmospheric) */}
      <div className="my-16 flex justify-center opacity-10">
        <div className="w-px h-16 bg-black"></div>
      </div>

      {/* Gratitude Diary / Journal History */}
      <section className="space-y-6">
        <h3 className="text-sm font-sans font-semibold tracking-widest uppercase text-black mb-4">
          Mon Journal de Gratitude
        </h3>

        {gratitudeEntries.length === 0 ? (
          <p className="text-sm text-black/40 font-serif italic text-center py-6 border border-dashed border-black/10 rounded-xl">
            Votre journal de gratitude est encore vierge. Écrivez ci-dessus pour enregistrer vos premiers moments magiques.
          </p>
        ) : (
          <div className="space-y-6">
            {gratitudeEntries.map((entry) => (
              <div 
                key={entry.id} 
                className="border border-black/[0.08] p-5 rounded-2xl bg-white hover:border-black/20 transition-all space-y-4 relative group"
              >
                {/* Delete button */}
                <button
                  onClick={() => handleDeleteEntry(entry.id)}
                  className="absolute top-4 right-4 text-black/30 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100 p-1 cursor-pointer"
                  title="Supprimer cette entrée"
                >
                  <Trash2 className="w-4 h-4 stroke-[1.5]" />
                </button>

                {/* Header info */}
                <div className="flex items-center gap-2 text-[10px] font-sans font-bold text-black/40 uppercase tracking-widest">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{formatDate(entry.timestamp)}</span>
                </div>

                {/* 3 points of gratitude */}
                <ol className="space-y-2">
                  {entry.items.map((text, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-black/80 items-start">
                      <span className="font-sans font-semibold text-black/30 text-xs min-w-4">0{idx + 1}</span>
                      <span className="font-serif leading-relaxed italic">"{text}"</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Background Subtle Wave Effect */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.02]">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-46.5C87.4,-33.8,90,-18.7,89.1,-3.7C88.2,11.3,83.7,26.2,75.8,39.7C67.9,53.2,56.5,65.3,43.2,72.9C29.9,80.5,14.9,83.6,0.3,83.1C-14.3,82.5,-28.7,78.3,-41.8,70.9C-54.9,63.5,-66.7,52.8,-74.6,39.9C-82.5,27,-86.5,11.9,-85.4,-2.8C-84.3,-17.5,-78.2,-31.8,-69.3,-43.8C-60.4,-55.8,-48.7,-65.4,-36.1,-73.4C-23.5,-81.4,-11.7,-87.8,1.4,-90.2C14.5,-92.6,29.1,-91.1,44.7,-76.4Z" fill="#000000" transform="translate(100 100)"></path>
          </svg>
        </div>
      </div>

    </div>
  );
}
