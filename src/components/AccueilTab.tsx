/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Tab } from '../types';
import { Leaf, BookOpen, Sun, Activity, Play, X, Compass, ChevronRight, Sparkles } from 'lucide-react';
import { MEDITATION_PRESETS, WISDOM_PRESETS, RITUAL_PRESETS, ZEN_QUOTES } from '../data';

interface AccueilTabProps {
  setActiveTab: (tab: Tab) => void;
  playFrequency: (freq: number) => void;
  stopFrequency: () => void;
  activeFrequency: number | null;
}

export default function AccueilTab({ 
  setActiveTab, 
  playFrequency, 
  stopFrequency, 
  activeFrequency 
}: AccueilTabProps) {
  const [activeModal, setActiveModal] = useState<'meditations' | 'sagesse' | 'affirmations' | 'rituels' | null>(null);
  const [playingMeditation, setPlayingMeditation] = useState<string | null>(null);
  const [currentAffirmationIndex, setCurrentAffirmationIndex] = useState(0);
  const [dailyQuote, setDailyQuote] = useState('');
  const [isQuoteCopied, setIsQuoteCopied] = useState(false);

  useEffect(() => {
    const today = new Date().toLocaleDateString('fr-FR');
    const storedDate = localStorage.getItem('clarte_daily_quote_date');
    const storedQuote = localStorage.getItem('clarte_daily_quote');

    if (storedDate === today && storedQuote) {
      setDailyQuote(storedQuote);
    } else {
      const quotesList = [
        "La clarté n'est pas l'absence de nuages, mais la capacité de voir au-delà.",
        "Le silence n'est pas vide, il est plein de réponses.",
        "Je suis le créateur de ma propre réalité. La clarté guide chacun de mes pas.",
        "Le vide est la forme la plus pure du potentiel.",
        "La paix intérieure commence au moment où vous choisissez de ne pas laisser les événements contrôler vos émotions.",
        "Respirer. Relâcher. Manifester. Tout est déjà là, attendant votre alignement.",
        "L'abondance n'est pas ce que nous acquérons, mais ce avec quoi nous nous connectons.",
        "Le calme est un super-pouvoir. Apprenez à observer sans réagir.",
        "La vie n'est pas un problème à résoudre, mais une réalité à expérimenter.",
        "Au milieu du chaos, gardez un sanctuaire de paix au fond de vous.",
        "La gratitude transforme ce que nous avons en suffisant, et même en plus.",
        "Chaque matin nous naissons à nouveau. Ce que nous faisons aujourd'hui est ce qui importe le plus.",
        "Sois le changement que tu veux voir naître dans ta vie.",
        "La clarté naît du silence de l'esprit, pas du tumulte des pensées.",
        "Vivez comme si tout était un miracle, car au fond, chaque instant l'est.",
        "Rien n'est permanent, sauf le changement. Accueillez-le avec sérénité.",
        "La clarté de l'esprit apporte la pureté des intentions.",
        "Le bonheur n'est pas une destination, c'est une manière de voyager.",
        "Prenez soin de votre esprit, c'est là que réside toute votre force créatrice.",
        "Chaque pas fait avec conscience est une victoire sur la dispersion."
      ];

      const now = new Date();
      const start = new Date(now.getFullYear(), 0, 0);
      const diff = now.getTime() - start.getTime();
      const oneDay = 1000 * 60 * 60 * 24;
      const dayOfYear = Math.floor(diff / oneDay);
      
      const index = dayOfYear % quotesList.length;
      const newQuote = quotesList[index];

      localStorage.setItem('clarte_daily_quote_date', today);
      localStorage.setItem('clarte_daily_quote', newQuote);
      setDailyQuote(newQuote);
    }
  }, []);

  const handleCopyQuote = () => {
    if (!dailyQuote) return;
    navigator.clipboard.writeText(dailyQuote);
    setIsQuoteCopied(true);
    setTimeout(() => setIsQuoteCopied(false), 2000);
  };

  const affirmations = [
    "Je suis digne de vivre en paix, entouré d'amour et de lumière.",
    "La clarté habite mon esprit et la paix remplit mon cœur.",
    "Je lâche prise sur ce que je ne peux contrôler pour embrasser l'instant présent.",
    "Je manifeste l'abondance dans ma vie en vibrant à ma plus haute fréquence.",
    "Chaque respiration renforce mon alignement avec le plan divin de ma vie."
  ];

  const handlePlayMeditation = (id: string, presetName: string) => {
    if (playingMeditation === id) {
      stopFrequency();
      setPlayingMeditation(null);
    } else {
      // Play a custom frequency based on meditation type
      const freq = id === 'm1' ? 432 : id === 'm2' ? 528 : 396;
      playFrequency(freq);
      setPlayingMeditation(id);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto py-8 px-4 flex flex-col items-center">
      
      {/* Background Zenith Flow Style Decoration */}
      <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none -z-10" style={{ height: '50vh' }}>
        <svg className="w-full h-full opacity-20" preserveAspectRatio="none" viewBox="0 0 1440 320">
          <path d="M0,224L60,208C120,192,240,160,360,160C480,160,600,192,720,213.3C840,235,960,245,1080,224C1200,203,1320,149,1380,122.7L1440,96L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z" fill="#eeeeee"></path>
        </svg>
      </div>

      {/* Hero Header */}
      <section className="text-center mb-10 mt-6">
        <h1 className="text-4xl md:text-5xl font-sans font-semibold tracking-tight text-black dark:text-zinc-100 mb-3 transition-colors duration-500">
          La Voie de la Clarté
        </h1>
        <p className="text-lg font-serif italic text-black/60 dark:text-zinc-400 transition-colors duration-500">
          Manifester la paix au quotidien
        </p>
      </section>

      {/* Daily Quote Card */}
      <div className="w-full border border-black/[0.12] dark:border-white/[0.12] bg-white dark:bg-zinc-900/60 p-6 rounded-2xl mb-12 flex flex-col items-center text-center relative overflow-hidden group hover:border-black/30 dark:hover:border-white/30 transition-all duration-300 shadow-sm">
        <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
          <Sparkles className="w-4 h-4 text-black/60 dark:text-zinc-300 stroke-[1.5]" />
        </div>
        <span className="text-[9px] font-sans font-bold tracking-[0.2em] text-black/40 dark:text-zinc-400 uppercase mb-2">
          Citation d'alignement • Aujourd'hui
        </span>
        <p className="text-sm md:text-base font-serif italic text-black/80 dark:text-zinc-200 leading-relaxed px-4">
          "{dailyQuote || "Chargement de la sagesse du jour..."}"
        </p>
        
        {/* Subtle Copy/Share Interaction */}
        <button 
          onClick={handleCopyQuote}
          className="mt-4 text-[10px] font-sans font-semibold text-black/40 dark:text-zinc-500 hover:text-black dark:hover:text-zinc-300 hover:underline underline-offset-4 tracking-wider uppercase transition-colors cursor-pointer"
        >
          {isQuoteCopied ? 'Copié dans le presse-papiers ✓' : 'Partager la sagesse'}
        </button>
      </div>

      {/* Grid of Zen Categories */}
      <div className="grid grid-cols-2 gap-8 w-full mb-16">
        
        {/* Category: Méditations */}
        <button 
          onClick={() => setActiveModal('meditations')}
          className="flex flex-col items-center text-center group cursor-pointer"
        >
          <div className="w-18 h-18 mb-4 flex items-center justify-center rounded-full border border-black/[0.12] dark:border-white/[0.12] group-hover:bg-black dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-zinc-900 transition-all duration-300">
            <Leaf className="w-7 h-7 text-black dark:text-zinc-100 group-hover:text-white dark:group-hover:text-zinc-900 stroke-[1.2]" />
          </div>
          <span className="text-xs font-sans font-semibold tracking-widest uppercase text-black dark:text-zinc-300">
            Méditations
          </span>
        </button>

        {/* Category: Sagesse */}
        <button 
          onClick={() => setActiveModal('sagesse')}
          className="flex flex-col items-center text-center group cursor-pointer"
        >
          <div className="w-18 h-18 mb-4 flex items-center justify-center rounded-full border border-black/[0.12] dark:border-white/[0.12] group-hover:bg-black dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-zinc-900 transition-all duration-300">
            <BookOpen className="w-7 h-7 text-black dark:text-zinc-100 group-hover:text-white dark:group-hover:text-zinc-900 stroke-[1.2]" />
          </div>
          <span className="text-xs font-sans font-semibold tracking-widest uppercase text-black dark:text-zinc-300">
            Sagesse
          </span>
        </button>

        {/* Category: Affirmations */}
        <button 
          onClick={() => setActiveModal('affirmations')}
          className="flex flex-col items-center text-center group cursor-pointer"
        >
          <div className="w-18 h-18 mb-4 flex items-center justify-center rounded-full border border-black/[0.12] dark:border-white/[0.12] group-hover:bg-black dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-zinc-900 transition-all duration-300">
            <Sun className="w-7 h-7 text-black dark:text-zinc-100 group-hover:text-white dark:group-hover:text-zinc-900 stroke-[1.2]" />
          </div>
          <span className="text-xs font-sans font-semibold tracking-widest uppercase text-black dark:text-zinc-300">
            Affirmations
          </span>
        </button>

        {/* Category: Rituels */}
        <button 
          onClick={() => setActiveModal('rituels')}
          className="flex flex-col items-center text-center group cursor-pointer"
        >
          <div className="w-18 h-18 mb-4 flex items-center justify-center rounded-full border border-black/[0.12] dark:border-white/[0.12] group-hover:bg-black dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-zinc-900 transition-all duration-300">
            <Activity className="w-7 h-7 text-black dark:text-zinc-100 group-hover:text-white dark:group-hover:text-zinc-900 stroke-[1.2]" />
          </div>
          <span className="text-xs font-sans font-semibold tracking-widest uppercase text-black dark:text-zinc-300">
            Rituels
          </span>
        </button>

      </div>

      {/* Call to Action Anchor Section */}
      <section className="w-full text-center mt-auto py-4 flex flex-col items-center">
        <h4 className="text-lg font-serif italic text-black/75 dark:text-zinc-300 max-w-sm leading-relaxed mb-8 px-4">
          "La clarté n'est pas l'absence de nuages, mais la capacité de voir au-delà."
        </h4>
        <button 
          onClick={() => setActiveTab('exploration')}
          className="px-12 py-4 bg-black dark:bg-white text-white dark:text-zinc-950 hover:bg-black/90 dark:hover:bg-white/90 active:scale-95 transition-all rounded-full tracking-widest uppercase font-sans font-semibold text-xs border border-black dark:border-white flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <span>Commencer</span>
          <ChevronRight className="w-4 h-4 stroke-[2]" />
        </button>
      </section>

      {/* -------------------- MODALS -------------------- */}
      
      {/* 1. Modal Méditations */}
      {activeModal === 'meditations' && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-black dark:border-zinc-800 w-full max-w-md p-6 rounded-2xl flex flex-col shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <button 
              onClick={() => { setActiveModal(null); stopFrequency(); setPlayingMeditation(null); }}
              className="absolute top-4 right-4 text-black dark:text-white hover:opacity-60 transition-opacity cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-6">
              <Leaf className="w-6 h-6 text-black dark:text-zinc-100" />
              <h3 className="text-xl font-sans font-semibold uppercase tracking-wider text-black dark:text-zinc-100">Méditations Guidées</h3>
            </div>
            
            <p className="text-xs font-sans text-black/50 dark:text-zinc-400 uppercase tracking-widest mb-4">Sessions Disponibles</p>
            
            <div className="space-y-4">
              {MEDITATION_PRESETS.map((med) => {
                const isPlaying = playingMeditation === med.id;
                return (
                  <div key={med.id} className="border border-black/10 dark:border-white/10 p-4 rounded-xl flex items-start justify-between gap-4 bg-black/[0.01] dark:bg-white/[0.01]">
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-sans font-semibold text-sm text-black dark:text-zinc-100">{med.title}</h4>
                        <span className="text-[10px] bg-black/5 dark:bg-white/5 text-black/60 dark:text-zinc-400 px-2 py-0.5 rounded-full font-sans font-medium">{med.duration}</span>
                      </div>
                      <p className="text-xs text-black/60 dark:text-zinc-400 font-serif">{med.desc}</p>
                    </div>
                    <button 
                      onClick={() => handlePlayMeditation(med.id, med.title)}
                      className={`w-10 h-10 rounded-full border border-black dark:border-white flex items-center justify-center transition-all cursor-pointer ${
                        isPlaying ? 'bg-black dark:bg-white text-white dark:text-zinc-900' : 'bg-transparent text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5'
                      }`}
                    >
                      {isPlaying ? (
                        <div className="flex gap-0.5 items-center justify-center">
                          <span className="w-1 h-3 bg-white dark:bg-zinc-950 rounded-full animate-bounce"></span>
                          <span className="w-1 h-2.5 bg-white dark:bg-zinc-950 rounded-full animate-bounce delay-75"></span>
                          <span className="w-1 h-3 bg-white dark:bg-zinc-950 rounded-full animate-bounce delay-150"></span>
                        </div>
                      ) : (
                        <Play className="w-4 h-4 fill-black dark:fill-white stroke-[1.5]" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 pt-4 border-t border-black/10 dark:border-white/10 text-center">
              <p className="text-xs text-black/40 dark:text-zinc-400 font-serif italic">
                {playingMeditation ? "Onde vibratoire active. Installez-vous confortablement et respirez." : "Sélectionnez une session pour démarrer la vibration zen."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. Modal Sagesse */}
      {activeModal === 'sagesse' && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-black dark:border-zinc-800 w-full max-w-md p-6 rounded-2xl flex flex-col shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-black dark:text-white hover:opacity-60 transition-opacity cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-6 h-6 text-black dark:text-zinc-100" />
              <h3 className="text-xl font-sans font-semibold uppercase tracking-wider text-black dark:text-zinc-100">Paroles de Sagesse</h3>
            </div>

            <p className="text-xs font-sans text-black/50 dark:text-zinc-400 uppercase tracking-widest mb-4">Réflexions Zen</p>
            
            <div className="space-y-6">
              {WISDOM_PRESETS.map((wisdom) => (
                <div key={wisdom.id} className="border-l-2 border-black dark:border-white pl-4">
                  <h4 className="font-sans font-semibold text-sm text-black dark:text-zinc-100 mb-2 uppercase tracking-wide">{wisdom.title}</h4>
                  <p className="text-sm text-black/70 dark:text-zinc-300 font-serif leading-relaxed italic">
                    "{wisdom.content}"
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-8 border-t border-black/10 dark:border-white/10 pt-4 text-center">
              <p className="text-[10px] font-sans text-black/40 dark:text-zinc-400 uppercase tracking-widest">
                Laissez ces paroles guider vos pensées
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3. Modal Affirmations */}
      {activeModal === 'affirmations' && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-black dark:border-zinc-800 w-full max-w-md p-6 rounded-2xl flex flex-col shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-black dark:text-white hover:opacity-60 transition-opacity cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-6">
              <Sun className="w-6 h-6 text-black dark:text-zinc-100" />
              <h3 className="text-xl font-sans font-semibold uppercase tracking-wider text-black dark:text-zinc-100">Affirmations Actives</h3>
            </div>

            <p className="text-xs font-sans text-black/50 dark:text-zinc-400 uppercase tracking-widest mb-4">Focus Mental</p>

            <div className="border border-black dark:border-zinc-800 p-8 rounded-xl bg-black dark:bg-zinc-950 text-white dark:text-zinc-100 text-center min-h-40 flex flex-col justify-center items-center relative overflow-hidden my-4">
              <p className="text-lg font-serif italic leading-relaxed px-2">
                "{affirmations[currentAffirmationIndex]}"
              </p>
              <div className="absolute bottom-2 text-[9px] font-sans uppercase tracking-[0.2em] text-white/40 dark:text-zinc-500">
                Affirmation {currentAffirmationIndex + 1} sur {affirmations.length}
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <button 
                onClick={() => setCurrentAffirmationIndex((prev) => (prev - 1 + affirmations.length) % affirmations.length)}
                className="flex-1 py-3 border border-black dark:border-white rounded-lg font-sans text-xs uppercase tracking-wider text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5 active:scale-95 transition-all cursor-pointer"
              >
                Précédente
              </button>
              <button 
                onClick={() => setCurrentAffirmationIndex((prev) => (prev + 1) % affirmations.length)}
                className="flex-1 py-3 bg-black dark:bg-white text-white dark:text-zinc-900 rounded-lg font-sans text-xs uppercase tracking-wider hover:bg-black/90 dark:hover:bg-white/90 active:scale-95 transition-all cursor-pointer"
              >
                Suivante
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Modal Rituels */}
      {activeModal === 'rituels' && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-black dark:border-zinc-800 w-full max-w-md p-6 rounded-2xl flex flex-col shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-black dark:text-white hover:opacity-60 transition-opacity cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-6">
              <Activity className="w-6 h-6 text-black dark:text-zinc-100" />
              <h3 className="text-xl font-sans font-semibold uppercase tracking-wider text-black dark:text-zinc-100">Rituels Quotidiens</h3>
            </div>

            <p className="text-xs font-sans text-black/50 dark:text-zinc-400 uppercase tracking-widest mb-4">Pratiques Sacrées</p>

            <div className="space-y-6">
              {RITUAL_PRESETS.map((ritual) => (
                <div key={ritual.id} className="border border-black/10 dark:border-white/10 rounded-xl p-4 bg-black/[0.01] dark:bg-white/[0.01]">
                  <h4 className="font-sans font-semibold text-sm text-black dark:text-zinc-100 uppercase tracking-wide mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-black dark:bg-white"></span>
                    {ritual.title}
                  </h4>
                  <ul className="space-y-3">
                    {ritual.steps.map((step, idx) => (
                      <li key={idx} className="flex gap-3 text-xs text-black/70 dark:text-zinc-300 leading-relaxed items-start">
                        <span className="font-sans font-semibold text-black/40 dark:text-zinc-500 min-w-4">0{idx+1}</span>
                        <span className="font-serif">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
