/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Tab = 'accueil' | 'exploration' | 'vision' | 'gratitude' | 'rappels';

export interface GratitudeEntry {
  id: string;
  timestamp: number; // ms timestamp
  items: string[];   // 3 items of gratitude
}

export interface VisionCard {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  isCustom?: boolean;
  category?: string;
  quote?: string;
}

export interface ReminderTime {
  id: string;
  time: string; // "08:00", etc.
  periodLabel: string; // "Matin", "Après-midi", "Soir" etc.
}

export type FrequencyType = 'fixe' | 'aleatoire';

export interface AffirmationTheme {
  id: string;
  name: string;
  checked: boolean;
}

export interface ReminderState {
  notificationsEnabled: boolean;
  frequency: FrequencyType;
  times: ReminderTime[];
  themes: string[]; // Active themes list
}
