/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Play, Square, ArrowRight, X, Sparkles, Check } from 'lucide-react';

interface ExplorationTabProps {
  playFrequency: (freq: number) => void;
  stopFrequency: () => void;
  activeFrequency: number | null;
}

export default function ExplorationTab({ 
  playFrequency, 
  stopFrequency, 
  activeFrequency 
}: ExplorationTabProps) {
  const [activeMethod, setActiveMethod] = useState<'369' | '5x55' | null>(null);
  
  // 369 local form state
  const [affirmation369, setAffirmation369] = useState('');
  const [morningInputs, setMorningInputs] = useState<string[]>(['', '', '']);
  const [middayInputs, setMiddayInputs] = useState<string[]>(['', '', '', '', '', '']);
  const [eveningInputs, setEveningInputs] = useState<string[]>(['', '', '', '', '', '', '', '', '']);
  const [is369Submitted, setIs369Submitted] = useState(false);

  // 5x55 local state
  const [affirmation55, setAffirmation55] = useState('');
  const [timesTyped, setTimesTyped] = useState<string[]>([]);
  const [currentTypingValue, setCurrentTypingValue] = useState('');
  const [dayStreak, setDayStreak] = useState(1);
  const [is55Completed, setIs55Completed] = useState(false);

  const handleFrequencyClick = (freq: number) => {
    if (activeFrequency === freq) {
      stopFrequency();
    } else {
      playFrequency(freq);
    }
  };

  const reset369 = () => {
    setAffirmation369('');
    setMorningInputs(['', '', '']);
    setMiddayInputs(['', '', '', '', '', '']);
    setEveningInputs(['', '', '', '', '', '', '', '', '']);
    setIs369Submitted(false);
  };

  const handleMorningChange = (index: number, val: string) => {
    const updated = [...morningInputs];
    updated[index] = val;
    setMorningInputs(updated);
  };

  const handleMiddayChange = (index: number, val: string) => {
    const updated = [...middayInputs];
    updated[index] = val;
    setMiddayInputs(updated);
  };

  const handleEveningChange = (index: number, val: string) => {
    const updated = [...eveningInputs];
    updated[index] = val;
    setEveningInputs(updated);
  };

  const handleAddTyping55 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentTypingValue.trim()) return;
    
    const newTyped = [...timesTyped, currentTypingValue.trim()];
    setTimesTyped(newTyped);
    setCurrentTypingValue('');

    if (newTyped.length >= 55) {
      setIs55Completed(true);
    }
  };

  const reset55 = () => {
    setAffirmation55('');
    setTimesTyped([]);
    setCurrentTypingValue('');
    setIs55Completed(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-8 px-4 pb-32">
      {/* Hero Title */}
      <section className="mb-16">
        <h2 className="text-3xl font-sans font-medium tracking-tight mb-3">Exploration</h2>
        <div className="h-[2px] w-12 bg-black mb-6"></div>
        <p className="text-sm font-sans text-black/60 max-w-sm leading-relaxed">
          Découvrez de nouvelles méthodes pour aligner votre intention avec la réalité.
        </p>
      </section>

      <div className="space-y-20">
        
        {/* Section: Fréquences Vibratoires */}
        <section>
          <div className="flex items-baseline justify-between mb-6">
            <h3 className="text-base font-sans font-medium tracking-tight text-black">
              Fréquences Vibratoires
            </h3>
            <span className="text-[10px] font-sans font-bold tracking-[0.2em] text-black/40 uppercase">
              Auditif
            </span>
          </div>

          <div className="space-y-4">
            {/* 432 Hz */}
            <div 
              onClick={() => handleFrequencyClick(432)}
              className={`p-6 border rounded-2xl flex items-center justify-between group/item transition-all duration-300 cursor-pointer ${
                activeFrequency === 432 
                  ? 'border-black bg-black text-white' 
                  : 'border-black/[0.08] bg-white text-black hover:-translate-y-0.5'
              }`}
            >
              <div className="flex flex-col gap-1">
                <span className={`text-[10px] font-sans font-bold tracking-[0.25em] uppercase ${
                  activeFrequency === 432 ? 'text-white/60' : 'text-black/40'
                }`}>
                  432 HZ
                </span>
                <span className="text-sm font-serif">Harmonie naturelle & guérison</span>
              </div>
              <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                activeFrequency === 432 
                  ? 'bg-white border-white text-black' 
                  : 'border-black/[0.12] group-hover/item:bg-black group-hover/item:border-black group-hover/item:text-white'
              }`}>
                {activeFrequency === 432 ? (
                  <Square className="w-4 h-4 fill-black stroke-none" />
                ) : (
                  <Play className="w-4 h-4 fill-current stroke-[1.5] ml-0.5" />
                )}
              </div>
            </div>

            {/* 528 Hz */}
            <div 
              onClick={() => handleFrequencyClick(528)}
              className={`p-6 border rounded-2xl flex items-center justify-between group/item transition-all duration-300 cursor-pointer ${
                activeFrequency === 528 
                  ? 'border-black bg-black text-white' 
                  : 'border-black/[0.08] bg-white text-black hover:-translate-y-0.5'
              }`}
            >
              <div className="flex flex-col gap-1">
                <span className={`text-[10px] font-sans font-bold tracking-[0.25em] uppercase ${
                  activeFrequency === 528 ? 'text-white/60' : 'text-black/40'
                }`}>
                  528 HZ
                </span>
                <span className="text-sm font-serif">Transformation & miracles (DNA)</span>
              </div>
              <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                activeFrequency === 528 
                  ? 'bg-white border-white text-black' 
                  : 'border-black/[0.12] group-hover/item:bg-black group-hover/item:border-black group-hover/item:text-white'
              }`}>
                {activeFrequency === 528 ? (
                  <Square className="w-4 h-4 fill-black stroke-none" />
                ) : (
                  <Play className="w-4 h-4 fill-current stroke-[1.5] ml-0.5" />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Section: Méthodes de Manifestation */}
        <section>
          <div className="flex items-baseline justify-between mb-6">
            <h3 className="text-base font-sans font-medium tracking-tight text-black">
              Méthodes de Manifestation
            </h3>
            <span className="text-[10px] font-sans font-bold tracking-[0.2em] text-black/40 uppercase">
              Pratique
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Méthode 369 */}
            <div 
              onClick={() => setActiveMethod('369')}
              className="border border-black/[0.08] bg-white rounded-3xl p-8 flex flex-col justify-between min-h-[260px] hover:border-black transition-all duration-300 cursor-pointer group/card"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-xs font-sans font-bold">
                    01
                  </div>
                  <h4 className="text-base font-sans font-semibold text-black">Méthode 369</h4>
                </div>
                <p className="text-xs text-black/60 font-serif leading-relaxed">
                  Exploitez le code de l'univers de Nikola Tesla à travers l'écriture matinale, méridienne et nocturne.
                </p>
              </div>
              <div className="flex justify-end mt-6">
                <div className="flex items-center gap-2 opacity-60 group-hover/card:opacity-100 transition-opacity">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest">Commencer</span>
                  <ArrowRight className="w-4 h-4 stroke-[1.5]" />
                </div>
              </div>
            </div>

            {/* Méthode 5x55 */}
            <div 
              onClick={() => setActiveMethod('5x55')}
              className="border border-black/[0.08] bg-white rounded-3xl p-8 flex flex-col justify-between min-h-[260px] hover:border-black transition-all duration-300 cursor-pointer group/card"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-xs font-sans font-bold">
                    02
                  </div>
                  <h4 className="text-base font-sans font-semibold text-black">Méthode 5×55</h4>
                </div>
                <p className="text-xs text-black/60 font-serif leading-relaxed">
                  Réécrivez votre subconscient en notant votre affirmation 55 fois pendant 5 jours consécutifs.
                </p>
              </div>
              <div className="flex justify-end mt-6">
                <div className="flex items-center gap-2 opacity-60 group-hover/card:opacity-100 transition-opacity">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest">Commencer</span>
                  <ArrowRight className="w-4 h-4 stroke-[1.5]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Aesthetic Visual Anchor */}
        <div className="w-full h-[320px] rounded-[32px] overflow-hidden relative group/hero">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover/hero:scale-105" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuClX0pRkLlmFQpTxfCnA_Xor-5rRKhqjcQ5ZTsgkVTojMJq_Er5FYaTXUnrLz2AKkdB5_IYuEfKAAz-XwRz-BXodhAF_h3yAAe-M3hQ4_0_sdbQ33_QZKeo681C6sQHXNyggPZxgXHKRDVoeWTPjF9AWdeRtZyyWfTQinQ5ACe8YUCAps_pFTinCaPhmbzyppBwRocZRWae11LWdLV2_qSl5TFfTX3bw6lPpL3MF_atbPkhC-MsNzjcWg')" }}
          ></div>
          <div className="absolute inset-0 bg-black/15 flex items-center justify-center p-8 text-center backdrop-grayscale-[30%]">
            <p className="text-base text-white font-serif font-light italic leading-relaxed drop-shadow-sm max-w-xs">
              "Le vide est la forme la plus pure du potentiel."
            </p>
          </div>
        </div>

        {/* Ending credit */}
        <section className="pt-8">
          <div className="flex flex-col items-center gap-3 opacity-30">
            <div className="w-8 h-px bg-black"></div>
            <p className="text-[10px] font-sans font-bold uppercase tracking-[0.3em]">
              Fin de l'exploration • Plus à venir
            </p>
          </div>
        </section>

      </div>

      {/* ----------------- INTERACTIVE METHOD DRAWERS / MODALS ----------------- */}

      {/* A. Drawer Méthode 369 */}
      {activeMethod === '369' && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-black w-full max-w-xl p-6 rounded-3xl flex flex-col shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => { setActiveMethod(null); reset369(); }}
              className="absolute top-4 right-4 text-black hover:opacity-60 transition-opacity cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-sans font-semibold">369</span>
              <h3 className="text-xl font-sans font-semibold uppercase tracking-wider text-black">Atelier de Manifestation 369</h3>
            </div>

            <p className="text-xs text-black/60 font-serif leading-relaxed mb-6">
              Nikola Tesla croyait que les nombres 3, 6 et 9 possédaient l'énergie de la création. Écrivez votre affirmation 3 fois le matin, 6 fois l'après-midi, et 9 fois le soir pour ancrer votre désir dans la matière.
            </p>

            {!is369Submitted ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-sans font-bold uppercase tracking-wider text-black/50 mb-2">
                    Votre Affirmation Générale (ex: "Je vis dans l'abondance")
                  </label>
                  <input 
                    type="text" 
                    value={affirmation369}
                    onChange={(e) => setAffirmation369(e.target.value)}
                    placeholder="Écrivez votre intention ici..."
                    className="w-full bg-transparent border-b border-black/20 focus:border-black py-2 text-sm font-serif text-black placeholder:text-black/20 focus:outline-none"
                  />
                </div>

                {affirmation369 && (
                  <div className="space-y-6 animate-fadeIn">
                    
                    {/* Morning (3 times) */}
                    <div>
                      <h4 className="text-xs font-sans font-semibold text-black mb-2 uppercase tracking-wide flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
                        Le Matin - Écrivez 3 fois pour éveiller l'esprit
                      </h4>
                      <div className="space-y-2">
                        {morningInputs.map((val, idx) => (
                          <input 
                            key={idx}
                            type="text"
                            value={val}
                            onChange={(e) => handleMorningChange(idx, e.target.value)}
                            placeholder={`Affirmation matin #${idx + 1}`}
                            className="w-full bg-black/[0.02] border border-black/10 rounded-lg px-3 py-2 text-xs font-serif"
                          />
                        ))}
                      </div>
                    </div>

                    {/* Midday (6 times) */}
                    <div>
                      <h4 className="text-xs font-sans font-semibold text-black mb-2 uppercase tracking-wide flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
                        L'Après-midi - Écrivez 6 fois pour stabiliser la forme
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {middayInputs.map((val, idx) => (
                          <input 
                            key={idx}
                            type="text"
                            value={val}
                            onChange={(e) => handleMiddayChange(idx, e.target.value)}
                            placeholder={`Affirmation midi #${idx + 1}`}
                            className="w-full bg-black/[0.02] border border-black/10 rounded-lg px-3 py-2 text-xs font-serif"
                          />
                        ))}
                      </div>
                    </div>

                    {/* Evening (9 times) */}
                    <div>
                      <h4 className="text-xs font-sans font-semibold text-black mb-2 uppercase tracking-wide flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
                        Le Soir - Écrivez 9 fois pour sceller dans le subconscient
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {eveningInputs.map((val, idx) => (
                          <input 
                            key={idx}
                            type="text"
                            value={val}
                            onChange={(e) => handleEveningChange(idx, e.target.value)}
                            placeholder={`Affirmation soir #${idx + 1}`}
                            className="w-full bg-black/[0.02] border border-black/10 rounded-lg px-3 py-2 text-xs font-serif"
                          />
                        ))}
                      </div>
                    </div>

                    <button 
                      onClick={() => setIs369Submitted(true)}
                      className="w-full bg-black text-white py-3 rounded-xl font-sans text-xs uppercase tracking-widest hover:opacity-90 transition-all cursor-pointer"
                    >
                      Enregistrer ma session d'alignement
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 space-y-4 animate-fadeIn">
                <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="font-sans font-semibold text-base text-black">Alignement 369 Scellé</h4>
                <p className="text-sm font-serif text-black/60 max-w-sm mx-auto">
                  "L'univers n'est que vibration, harmonie et nombres." Vos intentions d'aujourd'hui sont inscrites dans le flux cosmique. Continuez demain avec la même dévotion.
                </p>
                <div className="bg-black/5 p-4 rounded-xl max-w-xs mx-auto text-left space-y-2">
                  <p className="text-[10px] font-sans font-bold text-black/50 uppercase tracking-wider">Mon intention scellée :</p>
                  <p className="text-sm font-serif italic text-black">"{affirmation369}"</p>
                </div>
                <button 
                  onClick={() => { setActiveMethod(null); reset369(); }}
                  className="px-8 py-2 border border-black rounded-full font-sans text-xs uppercase tracking-widest hover:bg-black/5 transition-all cursor-pointer"
                >
                  Fermer l'Atelier
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* B. Drawer Méthode 5x55 */}
      {activeMethod === '5x55' && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-black w-full max-w-xl p-6 rounded-3xl flex flex-col shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => { setActiveMethod(null); reset55(); }}
              className="absolute top-4 right-4 text-black hover:opacity-60 transition-opacity cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-sans font-semibold">5x55</span>
              <h3 className="text-xl font-sans font-semibold uppercase tracking-wider text-black">Atelier d'Intégration 5×55</h3>
            </div>

            <p className="text-xs text-black/60 font-serif leading-relaxed mb-6">
              Cette formule puissante consiste à écrire votre affirmation 55 fois par jour pendant 5 jours consécutifs. Ce rythme répétitif sature le subconscient et aligne votre vibration de fond.
            </p>

            <div className="flex justify-between items-center bg-black/5 px-4 py-2.5 rounded-xl mb-6">
              <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-black/50">Progression :</span>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((d) => (
                  <button 
                    key={d}
                    onClick={() => setDayStreak(d)}
                    className={`w-7 h-7 rounded-full text-xs font-sans font-bold flex items-center justify-center transition-colors cursor-pointer ${
                      dayStreak >= d ? 'bg-black text-white' : 'bg-black/5 text-black/40'
                    }`}
                  >
                    J{d}
                  </button>
                ))}
              </div>
            </div>

            {!is55Completed ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-sans font-bold uppercase tracking-wider text-black/50 mb-2">
                    Votre Affirmation Puissante (Simple et positive, au présent)
                  </label>
                  <input 
                    type="text" 
                    value={affirmation55}
                    onChange={(e) => setAffirmation55(e.target.value)}
                    placeholder="ex: 'Je choisis la paix intérieure aujourd'hui'"
                    className="w-full bg-transparent border-b border-black/20 focus:border-black py-2 text-sm font-serif text-black placeholder:text-black/20 focus:outline-none"
                    disabled={timesTyped.length > 0}
                  />
                </div>

                {affirmation55 && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="flex justify-between items-center text-xs font-sans font-semibold">
                      <span className="text-black/50 uppercase tracking-wide">
                        Ligne {timesTyped.length} de 55
                      </span>
                      <span className="text-black bg-black/5 px-2 py-0.5 rounded-full">
                        {Math.round((timesTyped.length / 55) * 100)}% complété
                      </span>
                    </div>

                    <div className="w-full h-1.5 bg-black/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-black transition-all duration-300"
                        style={{ width: `${(timesTyped.length / 55) * 100}%` }}
                      ></div>
                    </div>

                    {/* Quick suggestion for quick typing to make it friendly but interactive */}
                    <p className="text-[10px] text-black/40 font-serif italic">
                      Pour faciliter le processus, écrivez l'affirmation ci-dessous et validez pour l'ajouter à la liste, ou cliquez pour copier l'affirmation principale.
                    </p>

                    <form onSubmit={handleAddTyping55} className="flex gap-2">
                      <input 
                        type="text"
                        value={currentTypingValue}
                        onChange={(e) => setCurrentTypingValue(e.target.value)}
                        placeholder="Tapez l'affirmation ici..."
                        className="flex-grow bg-black/[0.02] border border-black/10 rounded-xl px-4 py-2.5 text-xs font-serif focus:outline-none focus:border-black"
                      />
                      <button 
                        type="submit"
                        className="bg-black text-white px-4 py-2.5 rounded-xl font-sans text-xs uppercase tracking-wider hover:opacity-90 transition-all cursor-pointer"
                      >
                        Ajouter
                      </button>
                    </form>

                    <div className="flex gap-2">
                      <button 
                        type="button"
                        onClick={() => setCurrentTypingValue(affirmation55)}
                        className="text-[10px] font-sans font-semibold border border-black/20 px-3 py-1.5 rounded-lg hover:bg-black/5"
                      >
                        Copier l'affirmation
                      </button>
                      <button 
                        type="button"
                        onClick={() => {
                          const updated = [...timesTyped];
                          while (updated.length < 55) {
                            updated.push(affirmation55);
                          }
                          setTimesTyped(updated);
                          setIs55Completed(true);
                        }}
                        className="text-[10px] font-sans font-semibold bg-black/5 text-black px-3 py-1.5 rounded-lg hover:bg-black/10 ml-auto"
                      >
                        Auto-Remplir (Simuler)
                      </button>
                    </div>

                    {/* Scrollable container of written affirmations */}
                    <div className="border border-black/10 rounded-xl max-h-40 overflow-y-auto p-3 space-y-1.5 bg-black/[0.01]">
                      {timesTyped.length === 0 ? (
                        <p className="text-xs text-black/30 font-serif italic text-center py-4">
                          Le journal d'affirmation est vide pour le moment.
                        </p>
                      ) : (
                        timesTyped.map((text, i) => (
                          <div key={i} className="flex gap-2 text-xs font-serif text-black/80">
                            <span className="text-black/30 text-[10px] font-sans font-semibold min-w-5">
                              {i + 1}
                            </span>
                            <span>{text}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 space-y-4 animate-fadeIn">
                <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h4 className="font-sans font-semibold text-base text-black">Jour {dayStreak} Complété !</h4>
                <p className="text-sm font-serif text-black/60 max-w-sm mx-auto">
                  Félicitations pour votre alignement ! Vous avez écrit l'affirmation 55 fois pour aujourd'hui. L'énergie est en train de réécrire vos croyances profondes.
                </p>
                <div className="bg-black/5 p-4 rounded-xl max-w-xs mx-auto text-left space-y-2">
                  <p className="text-[10px] font-sans font-bold text-black/50 uppercase tracking-wider">Votre affirmation du jour :</p>
                  <p className="text-sm font-serif italic text-black">"{affirmation55}"</p>
                </div>
                <button 
                  onClick={() => { setActiveMethod(null); reset55(); }}
                  className="px-8 py-2 border border-black rounded-full font-sans text-xs uppercase tracking-widest hover:bg-black/5 transition-all cursor-pointer"
                >
                  Continuer
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
