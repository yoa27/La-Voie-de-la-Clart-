/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Tab, GratitudeEntry, VisionCard, ReminderTime, FrequencyType } from './types';
import { INITIAL_VISION_CARDS, INITIAL_TIMES } from './data';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import AccueilTab from './components/AccueilTab';
import ExplorationTab from './components/ExplorationTab';
import VisionTab from './components/VisionTab';
import GratitudeTab from './components/GratitudeTab';
import RappelsTab from './components/RappelsTab';
import { Sparkles, Info, RefreshCw, X, Bell, Moon, Sun } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('accueil');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // --- Persistent Storage State ---
  const [visionCards, setVisionCards] = useState<VisionCard[]>([]);
  const [gratitudeEntries, setGratitudeEntries] = useState<GratitudeEntry[]>([]);
  const [reminderTimes, setReminderTimes] = useState<ReminderTime[]>([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [frequencyType, setFrequencyType] = useState<FrequencyType>('fixe');
  const [activeThemes, setActiveThemes] = useState<string[]>(['Abondance', 'Paix Intérieure']);

  // --- Web Audio API Synth Engine ---
  const [activeFrequency, setActiveFrequency] = useState<number | null>(null);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
  const [oscillator, setOscillator] = useState<OscillatorNode | null>(null);
  const [gainNode, setGainNode] = useState<GainNode | null>(null);

  // --- Custom In-App Notification Toast ---
  const [toast, setToast] = useState<{ visible: boolean; title: string; message: string } | null>(null);

  // --- Load Initial Saved States ---
  useEffect(() => {
    // Vision cards
    const savedVision = localStorage.getItem('clarte_vision_cards');
    if (savedVision) {
      try { setVisionCards(JSON.parse(savedVision)); } catch (e) { setVisionCards(INITIAL_VISION_CARDS); }
    } else {
      setVisionCards(INITIAL_VISION_CARDS);
      localStorage.setItem('clarte_vision_cards', JSON.stringify(INITIAL_VISION_CARDS));
    }

    // Gratitude entries
    const savedGratitude = localStorage.getItem('clarte_gratitude_entries');
    if (savedGratitude) {
      try { setGratitudeEntries(JSON.parse(savedGratitude)); } catch (e) { setGratitudeEntries([]); }
    } else {
      setGratitudeEntries([]);
    }

    // Reminder times
    const savedTimes = localStorage.getItem('clarte_reminder_times');
    if (savedTimes) {
      try { setReminderTimes(JSON.parse(savedTimes)); } catch (e) { setReminderTimes(INITIAL_TIMES); }
    } else {
      setReminderTimes(INITIAL_TIMES);
      localStorage.setItem('clarte_reminder_times', JSON.stringify(INITIAL_TIMES));
    }

    // Notifications enabled
    const savedNotif = localStorage.getItem('clarte_notifications_enabled');
    if (savedNotif) {
      try { setNotificationsEnabled(JSON.parse(savedNotif)); } catch (e) { setNotificationsEnabled(true); }
    }

    // Frequency Type
    const savedFreq = localStorage.getItem('clarte_frequency_type');
    if (savedFreq) {
      setFrequencyType(savedFreq as FrequencyType);
    }

    // Active Themes
    const savedThemes = localStorage.getItem('clarte_active_themes');
    if (savedThemes) {
      try { setActiveThemes(JSON.parse(savedThemes)); } catch (e) { setActiveThemes(['Abondance', 'Paix Intérieure']); }
    }
  }, []);

  // --- Play/Stop Sine Wave Synth Frequency ---
  const playFrequency = (freq: number) => {
    // If already playing, stop the existing node
    if (oscillator) {
      try {
        oscillator.stop();
        oscillator.disconnect();
      } catch (e) {}
    }

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = audioCtx || new AudioContextClass();
      if (!audioCtx) setAudioCtx(ctx);

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Low volume comfort envelope
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.15); // Fade in

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();

      setOscillator(osc);
      setGainNode(gain);
      setActiveFrequency(freq);
    } catch (e) {
      console.warn("L'Audio Context a été bloqué par les restrictions de sécurité de l'iframe.", e);
    }
  };

  const stopFrequency = () => {
    if (oscillator && gainNode && audioCtx) {
      try {
        gainNode.gain.setValueAtTime(gainNode.gain.value, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15); // Fade out
        setTimeout(() => {
          try {
            oscillator.stop();
            oscillator.disconnect();
          } catch (e) {}
        }, 200);
      } catch (e) {
        try {
          oscillator.stop();
          oscillator.disconnect();
        } catch (err) {}
      }
    }
    setOscillator(null);
    setGainNode(null);
    setActiveFrequency(null);
  };

  // Stop sound if navigating away from the explore tab
  useEffect(() => {
    if (activeTab !== 'exploration' && activeTab !== 'accueil') {
      stopFrequency();
    }
  }, [activeTab]);

  // --- Trigger In-App Notification Toast ---
  const triggerToast = (title: string, message: string) => {
    setToast({ visible: true, title, message });
    
    // Auto slide-up after 5 seconds
    setTimeout(() => {
      setToast(prev => prev ? { ...prev, visible: false } : null);
    }, 5500);
  };

  // --- Reset All Settings to Factory ---
  const handleResetData = () => {
    if (!window.confirm("Voulez-vous vraiment réinitialiser toutes les données ? Votre journal de gratitude et tableau de vision personnalisés seront effacés.")) return;
    localStorage.clear();
    setVisionCards(INITIAL_VISION_CARDS);
    setGratitudeEntries([]);
    setReminderTimes(INITIAL_TIMES);
    setNotificationsEnabled(true);
    setFrequencyType('fixe');
    setActiveThemes(['Abondance', 'Paix Intérieure']);
    stopFrequency();
    setIsSettingsOpen(false);
    setActiveTab('accueil');
    triggerToast("Réinitialisation Réussie", "L'application a retrouvé son état de sérénité initial.");
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c] font-serif pb-24 relative select-none">
      
      {/* Top App Bar */}
      <Header 
        title="La Voie de la Clarté" 
        onOpenSettings={() => setIsSettingsOpen(true)} 
      />

      {/* Main Content Area */}
      <main className="w-full min-h-[calc(100vh-144px)] flex flex-col justify-start">
        {activeTab === 'accueil' && (
          <AccueilTab 
            setActiveTab={setActiveTab} 
            playFrequency={playFrequency}
            stopFrequency={stopFrequency}
            activeFrequency={activeFrequency}
          />
        )}
        {activeTab === 'exploration' && (
          <ExplorationTab 
            playFrequency={playFrequency} 
            stopFrequency={stopFrequency} 
            activeFrequency={activeFrequency} 
          />
        )}
        {activeTab === 'vision' && (
          <VisionTab 
            visionCards={visionCards} 
            setVisionCards={setVisionCards} 
          />
        )}
        {activeTab === 'gratitude' && (
          <GratitudeTab 
            gratitudeEntries={gratitudeEntries} 
            setGratitudeEntries={setGratitudeEntries} 
          />
        )}
        {activeTab === 'rappels' && (
          <RappelsTab 
            notificationsEnabled={notificationsEnabled}
            setNotificationsEnabled={setNotificationsEnabled}
            frequency={frequencyType}
            setFrequency={setFrequencyType}
            times={reminderTimes}
            setTimes={setReminderTimes}
            activeThemes={activeThemes}
            setActiveThemes={setActiveThemes}
            triggerToast={triggerToast}
          />
        )}
      </main>

      {/* Persistent Bottom Navigation */}
      <BottomNav 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* -------------------- SETTINGS DRAWER OVERLAY -------------------- */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-end">
          <div className="bg-white border-l border-black/10 w-full max-w-sm h-full p-6 flex flex-col shadow-2xl relative animate-slideLeft">
            
            {/* Close setting */}
            <button 
              onClick={() => setIsSettingsOpen(false)}
              className="absolute top-4 right-4 text-black hover:opacity-60 transition-opacity cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-xl font-sans font-semibold uppercase tracking-wider text-black mb-6 mt-4">
              Paramètres Zen
            </h3>

            <div className="space-y-6 flex-grow">
              
              {/* About App */}
              <div className="space-y-2 border-b border-black/5 pb-4">
                <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-black/50 flex items-center gap-1.5">
                  <Info className="w-4 h-4" />
                  À Propos de l'App
                </h4>
                <p className="text-xs font-serif text-black/70 leading-relaxed">
                  <strong>La Voie de la Clarté</strong> est un espace d'alignement vibratoire conçu pour vous détacher de la surcharge informationnelle moderne. En combinant la pureté du noir et blanc avec des fréquences de guérison et des méthodes éprouvées, l'application vous ramène à l'essentiel.
                </p>
              </div>

              {/* Reset Control */}
              <div className="space-y-2 border-b border-black/5 pb-4">
                <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-black/50 flex items-center gap-1.5">
                  <RefreshCw className="w-4 h-4" />
                  Gestion de l'espace
                </h4>
                <p className="text-[11px] text-black/40 font-serif leading-relaxed mb-3">
                  Effacer vos gratitudes et vos modifications de vision board pour repartir sur une page vierge.
                </p>
                <button 
                  onClick={handleResetData}
                  className="px-4 py-2 border border-red-600/30 text-red-600 hover:bg-red-50 active:scale-95 transition-all text-xs font-sans font-semibold uppercase tracking-wider rounded-lg cursor-pointer"
                >
                  Réinitialiser les données
                </button>
              </div>

              {/* Sound warning */}
              <div className="bg-black/5 p-4 rounded-xl space-y-2">
                <h4 className="text-xs font-sans font-bold uppercase text-black">Note de l'esprit</h4>
                <p className="text-[11px] text-black/60 font-serif leading-relaxed">
                  L'expérience sonore utilise l'Audio de synthèse de votre navigateur. Veuillez vous assurer que le son de votre appareil est activé pour profiter des fréquences vibratoires de 432 Hz et 528 Hz.
                </p>
              </div>

            </div>

            {/* Version footer */}
            <div className="text-center pt-6 border-t border-black/5">
              <p className="text-[9px] font-sans font-bold text-black/30 uppercase tracking-[0.2em]">
                La Voie de la Clarté • Version 2026.7
              </p>
            </div>

          </div>
        </div>
      )}

      {/* -------------------- IN-APP PUSH NOTIFICATION TOAST -------------------- */}
      {toast && toast.visible && (
        <div className="fixed top-4 left-4 right-4 z-50 flex justify-center pointer-events-none animate-slideDown">
          <div className="bg-white/95 backdrop-blur-md border border-black p-4 rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] max-w-md w-full flex gap-4 pointer-events-auto">
            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shrink-0">
              <Bell className="w-5 h-5 animate-swing" />
            </div>
            <div className="flex-grow space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-black">
                  {toast.title}
                </span>
                <span className="text-[8px] font-sans text-black/40">Maintenant</span>
              </div>
              <p className="text-xs font-serif italic text-black leading-relaxed">
                "{toast.message}"
              </p>
            </div>
            <button 
              onClick={() => setToast(prev => prev ? { ...prev, visible: false } : null)}
              className="text-black/30 hover:text-black shrink-0 self-start p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
