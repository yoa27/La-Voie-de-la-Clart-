/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ReminderTime, FrequencyType } from '../types';
import { INITIAL_TIMES, THEME_AFFIRMATIONS, ZEN_QUOTES } from '../data';
import { Bell, BellRing, Sparkles, Plus, Trash2, Clock, Check, RefreshCw, X, Play } from 'lucide-react';

interface RappelsTabProps {
  notificationsEnabled: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;
  frequency: FrequencyType;
  setFrequency: (freq: FrequencyType) => void;
  times: ReminderTime[];
  setTimes: React.Dispatch<React.SetStateAction<ReminderTime[]>>;
  activeThemes: string[];
  setActiveThemes: React.Dispatch<React.SetStateAction<string[]>>;
  triggerToast: (title: string, message: string) => void;
}

export default function RappelsTab({
  notificationsEnabled,
  setNotificationsEnabled,
  frequency,
  setFrequency,
  times,
  setTimes,
  activeThemes,
  setActiveThemes,
  triggerToast
}: RappelsTabProps) {
  const [isAddingTime, setIsAddingTime] = useState(false);
  const [newTime, setNewTime] = useState('09:00');
  const [newPeriodLabel, setNewPeriodLabel] = useState('Matin');
  const [currentPreviewQuote, setCurrentPreviewQuote] = useState(ZEN_QUOTES[1]);

  const themesList = ['Abondance', 'Paix Intérieure', 'Confiance', 'Gratitude'];

  // Dynamically update the quote preview when active themes change
  useEffect(() => {
    if (activeThemes.length === 0) {
      setCurrentPreviewQuote(ZEN_QUOTES[1]);
      return;
    }

    // Pick a random affirmation from any of the selected themes
    const randomTheme = activeThemes[Math.floor(Math.random() * activeThemes.length)];
    const options = THEME_AFFIRMATIONS[randomTheme];
    if (options && options.length > 0) {
      const randomQuote = options[Math.floor(Math.random() * options.length)];
      setCurrentPreviewQuote(randomQuote);
    }
  }, [activeThemes]);

  const handleToggleTheme = (theme: string) => {
    let updated: string[];
    if (activeThemes.includes(theme)) {
      updated = activeThemes.filter((t) => t !== theme);
    } else {
      updated = [...activeThemes, theme];
    }
    setActiveThemes(updated);
    localStorage.setItem('clarte_active_themes', JSON.stringify(updated));
  };

  const handleAddTime = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTime) return;

    // Determine default period label if not customized
    let label = newPeriodLabel;
    if (label === 'Matin') {
      const hours = parseInt(newTime.split(':')[0], 10);
      if (hours >= 12 && hours < 18) label = 'Après-midi';
      else if (hours >= 18) label = 'Soir';
    }

    const newReminder: ReminderTime = {
      id: 'custom_' + Date.now(),
      time: newTime,
      periodLabel: label
    };

    // Sort times sequentially
    const updated = [...times, newReminder].sort((a, b) => {
      const [ha, ma] = a.time.split(':').map(Number);
      const [hb, mb] = b.time.split(':').map(Number);
      return ha * 60 + ma - (hb * 60 + mb);
    });

    setTimes(updated);
    localStorage.setItem('clarte_reminder_times', JSON.stringify(updated));
    setIsAddingTime(false);
  };

  const handleDeleteTime = (id: string) => {
    const updated = times.filter((t) => t.id !== id);
    setTimes(updated);
    localStorage.setItem('clarte_reminder_times', JSON.stringify(updated));
  };

  const playNotificationPing = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      // Create oscillator for a beautiful high bell chime
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime); // High A note
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.3); // Ramp down
      
      // Soft envelope for a bell chime
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 1.5);
    } catch (e) {
      console.warn("Audio Context blocked or not supported yet.", e);
    }
  };

  const testNotification = () => {
    playNotificationPing();
    
    // Choose a gorgeous notification headline based on themes
    const headerTitle = activeThemes.length > 0 
      ? `Rappel d'Affirmation • ${activeThemes[Math.floor(Math.random() * activeThemes.length)]}`
      : "Rappel d'Affirmation • La Voie de la Clarté";

    triggerToast(headerTitle, currentPreviewQuote);
  };

  return (
    <div className="w-full max-w-xl mx-auto py-8 px-4 pb-32 space-y-12">
      
      {/* Header Section */}
      <header className="space-y-2">
        <h2 className="text-3xl font-sans font-medium tracking-tight text-black">
          Rappels d'Affirmations
        </h2>
        <p className="text-sm font-serif text-black/60 opacity-80">
          Synchronisez votre esprit avec vos intentions quotidiennes.
        </p>
      </header>

      {/* Notification Master Switch */}
      <section className="flex items-center justify-between py-6 border-b border-black/10">
        <div>
          <h3 className="text-sm font-sans font-semibold tracking-wide text-black uppercase">
            Notifications
          </h3>
          <p className="text-xs font-serif text-black/50 opacity-80">
            Activer les rappels quotidiens
          </p>
        </div>
        <button
          onClick={() => {
            const val = !notificationsEnabled;
            setNotificationsEnabled(val);
            localStorage.setItem('clarte_notifications_enabled', JSON.stringify(val));
          }}
          className={`relative inline-block w-11 h-6 rounded-full transition-colors duration-300 border focus:outline-none cursor-pointer ${
            notificationsEnabled ? 'bg-black border-black' : 'bg-transparent border-black/25'
          }`}
          aria-label="Toggle notifications"
        >
          <span 
            className={`absolute top-0.5 left-0.5 w-4.5 h-4.5 rounded-full transition-transform duration-300 ${
              notificationsEnabled ? 'translate-x-5 bg-white' : 'translate-x-0 bg-black'
            }`}
          />
        </button>
      </section>

      {/* Frequency Selection */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-black stroke-[1.5]" />
          <h3 className="text-xs font-sans font-semibold tracking-widest uppercase text-black">
            Fréquence de diffusion
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => {
              setFrequency('fixe');
              localStorage.setItem('clarte_frequency_type', 'fixe');
            }}
            className={`border py-5 rounded-xl flex flex-col items-center justify-center space-y-1 transition-all active:scale-95 cursor-pointer ${
              frequency === 'fixe'
                ? 'border-black bg-black text-white'
                : 'border-black/10 bg-white text-black hover:bg-black/5'
            }`}
          >
            <span className="text-xs font-sans font-semibold tracking-widest uppercase">Fixe</span>
            <span className={`text-[10px] font-serif ${frequency === 'fixe' ? 'text-white/60' : 'text-black/40'}`}>
              Horaires choisis
            </span>
          </button>
          
          <button 
            onClick={() => {
              setFrequency('aleatoire');
              localStorage.setItem('clarte_frequency_type', 'aleatoire');
            }}
            className={`border py-5 rounded-xl flex flex-col items-center justify-center space-y-1 transition-all active:scale-95 cursor-pointer ${
              frequency === 'aleatoire'
                ? 'border-black bg-black text-white'
                : 'border-black/10 bg-white text-black hover:bg-black/5'
            }`}
          >
            <span className="text-xs font-sans font-semibold tracking-widest uppercase">Aléatoire</span>
            <span className={`text-[10px] font-serif ${frequency === 'aleatoire' ? 'text-white/60' : 'text-black/40'}`}>
              Surprise zen
            </span>
          </button>
        </div>
      </section>

      {/* Time Picker / Schedule (Only relevant if frequency is fixe) */}
      <section className={`space-y-4 transition-opacity duration-300 ${frequency === 'aleatoire' ? 'opacity-40 pointer-events-none' : ''}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-black stroke-[1.5]" />
            <h3 className="text-xs font-sans font-semibold tracking-widest uppercase text-black">
              Horaires choisis
            </h3>
          </div>
          {frequency === 'fixe' && (
            <button 
              onClick={() => setIsAddingTime(!isAddingTime)}
              className="text-xs font-sans font-semibold underline decoration-1 underline-offset-4 hover:opacity-60 transition-opacity flex items-center gap-1 cursor-pointer"
            >
              {isAddingTime ? 'Annuler' : 'Ajouter'}
            </button>
          )}
        </div>

        {/* Inline Add Time Form */}
        {isAddingTime && (
          <form onSubmit={handleAddTime} className="border border-black p-4 rounded-xl flex flex-wrap gap-3 items-end bg-black/[0.01] animate-fadeIn">
            <div className="flex-1 min-w-[120px]">
              <label className="block text-[9px] font-sans font-bold uppercase tracking-wider text-black/50 mb-1">
                Choisir l'heure
              </label>
              <input 
                type="time" 
                required
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="w-full bg-white border border-black/10 px-3 py-2 rounded-lg text-xs font-sans focus:outline-none focus:border-black"
              />
            </div>
            <div className="flex-1 min-w-[120px]">
              <label className="block text-[9px] font-sans font-bold uppercase tracking-wider text-black/50 mb-1">
                Période (Label)
              </label>
              <select 
                value={newPeriodLabel}
                onChange={(e) => setNewPeriodLabel(e.target.value)}
                className="w-full bg-white border border-black/10 px-3 py-2.5 rounded-lg text-xs font-sans focus:outline-none focus:border-black"
              >
                <option value="Matin">Matin</option>
                <option value="Après-midi">Après-midi</option>
                <option value="Soir">Soir</option>
                <option value="Nuit">Nuit</option>
                <option value="Journée">Journée</option>
              </select>
            </div>
            <button 
              type="submit"
              className="bg-black text-white px-5 py-2.5 rounded-lg font-sans text-xs uppercase tracking-wider hover:opacity-90 transition-all cursor-pointer"
            >
              Ajouter
            </button>
          </form>
        )}

        {/* Times Rows */}
        <div className="space-y-3">
          {times.map((row) => (
            <div 
              key={row.id} 
              className="border border-black px-5 py-4 flex items-center justify-between group rounded-xl bg-white"
            >
              <span className="text-xl font-sans font-medium text-black">{row.time}</span>
              <div className="flex items-center gap-6">
                <span className="text-xs font-serif text-black/40">{row.periodLabel}</span>
                <button 
                  onClick={() => handleDeleteTime(row.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-black/40 hover:text-red-600 p-1 cursor-pointer"
                  title="Supprimer cet horaire"
                >
                  <Trash2 className="w-4 h-4 stroke-[1.5]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Themes Pill Selection */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-black stroke-[1.5]" />
          <h3 className="text-xs font-sans font-semibold tracking-widest uppercase text-black">
            Thèmes d'Inspiration
          </h3>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {themesList.map((theme) => {
            const isChecked = activeThemes.includes(theme);
            return (
              <button
                key={theme}
                onClick={() => handleToggleTheme(theme)}
                className={`border rounded-full px-5 py-2.5 flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 font-sans text-xs ${
                  isChecked
                    ? 'border-black bg-black text-white'
                    : 'border-black/20 bg-white text-black hover:bg-black/5'
                }`}
              >
                <span>{theme}</span>
                {isChecked && <Check className="w-3.5 h-3.5 stroke-[2]" />}
              </button>
            );
          })}
        </div>
      </section>

      {/* Visual Anchor (Bento Style Preview Card) */}
      <section className="border border-black p-6 bg-white relative overflow-hidden rounded-2xl">
        <div className="relative z-10 space-y-4">
          <div className="w-8 h-px bg-black/40"></div>
          <h4 className="text-base font-serif italic text-black leading-relaxed">
            "{currentPreviewQuote}"
          </h4>
          <p className="text-[10px] font-sans font-bold text-black/40 uppercase tracking-widest">
            Aperçu du rappel
          </p>
        </div>
        <div className="absolute -right-8 -bottom-8 text-black/[0.03] select-none pointer-events-none">
          <Bell className="w-32 h-32" />
        </div>
      </section>

      {/* Action Button: Tester la Notification */}
      <div className="pt-4">
        <button 
          onClick={testNotification}
          className="w-full bg-black text-white font-sans font-semibold text-xs py-4 hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-3 rounded-full uppercase tracking-widest border border-black cursor-pointer shadow-sm"
        >
          <span>Tester la Notification</span>
          <BellRing className="w-4 h-4 stroke-[2] animate-bounce" />
        </button>
      </div>

    </div>
  );
}
