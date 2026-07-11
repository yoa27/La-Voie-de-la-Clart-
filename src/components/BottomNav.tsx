/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Tab } from '../types';
import { Home, Compass, Eye, Heart, Bell } from 'lucide-react';

interface BottomNavProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export default function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: 'accueil', label: 'Accueil', icon: Home },
    { id: 'exploration', label: 'Explore', icon: Compass },
    { id: 'vision', label: 'Vision', icon: Eye },
    { id: 'gratitude', label: 'Gratitude', icon: Heart },
    { id: 'rappels', label: 'Rappels', icon: Bell }
  ];

  return (
    <nav className="fixed bottom-0 w-full z-40 bg-white/90 backdrop-blur-md border-t border-black/[0.08] px-6 py-3 h-18 flex justify-center shadow-sm">
      <div className="w-full max-w-2xl flex justify-between items-center">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all relative group cursor-pointer ${
                isActive 
                  ? 'text-black scale-105' 
                  : 'text-black/40 hover:text-black/80'
              }`}
            >
              <IconComponent className="w-5 h-5 stroke-[1.5]" />
              <span className="text-[9px] font-sans font-medium tracking-widest uppercase mt-1">
                {tab.label}
              </span>
              {isActive && (
                <div className="absolute -bottom-1 w-1 h-1 bg-black rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
