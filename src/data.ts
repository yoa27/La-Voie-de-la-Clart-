/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { VisionCard, ReminderTime } from './types';

export const INITIAL_VISION_CARDS: VisionCard[] = [
  {
    id: '1',
    title: 'Sérénité',
    subtitle: 'La maison de mes rêves.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBouwgQJDtf4c9xqLUgWqQyngzU6YC0v3yPZ7Ao0cQYXXfmpMwuGR0LjuxPUbALq82csUygPKPUFNR9InR7jKY_GRXhFRfFEPrrdKDHdqRbvwKxXS_6v-sS_G1TKSKaU_RxMzqq2DV5XuXYqlGLOyWVJewnfUmql9laHF0QqtUfDRrjLjiaZdpUtbPemSvl9nUQOXbqRoYDnemnyQj4LeYFHJ5CEJFIzHz5-OU7Dh6-l7pg5n-S5AjUaA',
    category: 'MANIFESTATION',
    quote: 'Je vis dans un espace d\'harmonie absolue, où chaque pièce respire le calme et la clarté.'
  },
  {
    id: '2',
    title: 'Clarté',
    subtitle: 'Esprit focalisé.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpcPVOAtBROXyCLa-fMPj1ydXneXE_YaSZ4n0Ir2umvQPsgxLfsvWXhASf4c5nPoYKIuuGWkmshi-BU3_JlX8pJ_0ts9YyOnb6aTWw4gFcN4YCCZQb9Jx1iwu9OljxUIlU-otCwckfNiNEsZKDiySx8kjdPqQTv81-BAuFhozmDqMl4m0Cmp6htuM_P_uuVEnspokxbhEE7VdMv6WFy6SWbOKY3gLICNEvpyOaY9z2nM6Y_G9k0YPApA',
    category: 'SAGESSE',
    quote: 'Mes pensées sont fluides et pures comme de l\'encre se diffusant dans l\'eau claire de l\'instant présent.'
  },
  {
    id: '3',
    title: 'Élévation',
    subtitle: 'Atteindre les sommets.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCr2RVYpt4lE9UchUWMS-TfdQJ8IO_JlcjHlCGKi4Mur_D2brVsllATTm85aTLc9nPtKcgHhpeEVhr7R-ofTKzRTRy4D0r6ae3q6AnPkJrvETRjHda4yFT7WwoPiaUsf2dBs05eX1lXpx_voLQvwyVUoW8I8PKJozcDIQ1kf8gxzfE3VFqHtWA_ZmIxcJom3fY9CPDynECY93kssbynaiEfjJAgqbKU7Q6jIXBn0QhUpex9dugaE4L4pQ',
    category: 'SPIRITUALITÉ',
    quote: 'Chaque jour, je m\'élève au-dessus des nuages du doute pour contempler la vérité de mon potentiel.'
  },
  {
    id: '4',
    title: 'Création',
    subtitle: 'Écrire mon futur.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_4eDVTCXZMOX5ORMkU8xiJgggxF591jEfg2aoOloq8rEKR-98Vxd5EQsC0-S2v8-tUJczmmZcol_7MHUH5ZGfCM7O64OTG9Pa7TEwD2qfqE0sbyp4zIqKTrn_JoFje-hCh7OSQNRwDjIQMPo8bIUt0CEVRYTefYkYCYPQjeaVsLpEhzH9xcy6jE-7qaU0wdxnWrjPSw05DH3iDZ65tw6QLlKflaR0d3TD6L2a2EczFnNmsKQ4DP9gdg',
    category: 'MINDSET',
    quote: 'Je suis l\'auteur souverain de mon destin, et chaque mot que j\'écris façonne la réalité de demain.'
  },
  {
    id: '5',
    title: 'Équilibre',
    subtitle: 'Harmonie quotidienne.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaB8oArFqOUcn2H3aUtyzzTyjxeYlMbU06kzxD_yAFVOUf4JYs5f-ECi0hAC46ntaIhW5FDxAXkSS99N4RvH2rZ7hDeCTMkUJd-GESfDCYgWJ7Cwv0soJyuPrjQVjFCl9P07sD75lKOuu0EEZZhYNUguTuY-zwPT_prFI69MQegixGz2uRGFHTLqewJDEwvzGwyPTDArJIiUUSvvYMFANIRZNupFjQkEyktyqNHxOG-RrOPeglbfcgqA',
    category: 'MÉDITATION',
    quote: 'Mon esprit est comme un jardin zen, où chaque élément trouve sa place exacte dans la paix suprême.'
  },
  {
    id: '6',
    title: 'Abondance',
    subtitle: 'L\'infini devant moi.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDxEyIWjXJmAzo6vUysunVj-PIb467uxbjDRvRnMeRlJgV8RMX8nFmmvHZkuol5KjV_6Qwp5tgaB-e0SIEeZUuTR463X7lK-KXXRRSNiyWlgTFKuoyYXV_nrkaKyS-a-4N_fDKpzEJH33lK2FKgfoMz4xBTdqbog0lIhrKOT-iZCbDj4YqYdRX_K-g6IFWTWBQnxx9D-HOYIbe3qg3LuOZALqdVSY9m4dUGBK7kiblNougpoUdHb_fnw',
    category: 'RITUEL',
    quote: 'L\'univers est une mer de possibilités illimitées. J\'ouvre grand mon cœur pour recevoir ses flots.'
  }
];

export const INITIAL_TIMES: ReminderTime[] = [
  { id: 't1', time: '08:00', periodLabel: 'Matin' },
  { id: 't2', time: '14:30', periodLabel: 'Après-midi' },
  { id: 't3', time: '21:00', periodLabel: 'Soir' }
];

export const ZEN_QUOTES = [
  "La clarté n'est pas l'absence de nuages, mais la capacité de voir au-delà.",
  "Je suis le créateur de ma propre réalité. La clarté guide chacun de mes pas.",
  "Le vide est la forme la plus pure du potentiel.",
  "La paix intérieure commence au moment où vous choisissez de ne pas laisser une autre personne ou un événement contrôler vos émotions.",
  "Respirer. Relâcher. Manifester. Tout est déjà là, attendant votre alignement.",
  "L'abondance n'est pas ce que nous acquérons, mais ce avec quoi nous nous connectons."
];

export const THEME_AFFIRMATIONS: Record<string, string[]> = {
  'Abondance': [
    "Je suis digne de recevoir toute la richesse et la prospérité de l'univers.",
    "L'abondance coule librement dans ma vie à chaque instant.",
    "Toutes les portes du succès s'ouvrent devant moi avec une fluidité parfaite.",
    "Je me connecte à l'océan infini de la créativité et des opportunités."
  ],
  'Paix Intérieure': [
    "Mon esprit est calme, mon cœur est en paix, mon âme est sereine.",
    "Je lâche prise sur ce que je ne peux contrôler et j'embrasse le moment présent.",
    "Chaque respiration m'apporte la clarté et dissout l'agitation.",
    "Je suis ancré dans la tranquillité éternelle de mon être profond."
  ],
  'Confiance': [
    "J'ai une confiance absolue dans ma guidance intérieure et mon intuition.",
    "Je possède en moi toutes les forces nécessaires pour surmonter chaque défi.",
    "Je m'exprime avec clarté, intégrité et assurance.",
    "Je suis fort, capable, et parfaitement aligné avec ma mission de vie."
  ],
  'Gratitude': [
    "Je remercie la vie pour ses bénédictions infinies, petites et grandes.",
    "Mon cœur déborde de reconnaissance pour tout l'amour qui m'entoure.",
    "Chaque jour m'offre de nouvelles raisons d'éprouver de la gratitude.",
    "Je vis dans l'appréciation profonde de la beauté simple du monde."
  ]
};

export const MEDITATION_PRESETS = [
  {
    id: 'm1',
    title: 'Ancrage du Matin',
    duration: '10 min',
    desc: 'Un exercice de respiration consciente pour éveiller vos sens et définir votre intention de la journée.',
    audioUrl: 'morning_breath'
  },
  {
    id: 'm2',
    title: 'Libération du Stress',
    duration: '15 min',
    desc: 'Un scan corporel guidé combiné à des fréquences apaisantes pour relâcher les tensions physiques.',
    audioUrl: 'stress_release'
  },
  {
    id: 'm3',
    title: 'Visualisation de l\'Abondance',
    duration: '12 min',
    desc: 'Un voyage intérieur immersif conçu pour aligner votre vibration avec l\'énergie du succès.',
    audioUrl: 'abundance_visual'
  }
];

export const WISDOM_PRESETS = [
  {
    id: 'w1',
    title: 'La nature du flux',
    content: "Dans la philosophie taoïste, le Wu Wei est l'art de l'action sans effort. Tout comme l'eau sculpte le canyon non pas par la force brute, mais par sa persévérance fluide, apprenez à glisser avec le courant de la vie. Ne forcez pas la manifestation, devenez simplement le réceptacle qui l'accueille naturellement."
  },
  {
    id: 'w2',
    title: 'Le pouvoir du détachement',
    content: "L'attachement au résultat est le plus grand obstacle à la manifestation. Lorsque vous plantez une graine en terre, vous ne la déterrez pas toutes les heures pour vérifier si elle pousse. Vous lui faites confiance. Manifestez avec ferveur, puis détachez-vous totalement du 'comment' et du 'quand'."
  }
];

export const RITUAL_PRESETS = [
  {
    id: 'r1',
    title: 'Le Bain de Clarté Matinal',
    steps: [
      "Asseyez-vous en silence dès le réveil, avant d'utiliser tout écran.",
      "Prenez 3 respirations profondes en inspirant la lumière et en expirant le sommeil.",
      "Récitez votre affirmation du jour à voix haute, trois fois de suite.",
      "Écrivez vos 3 gratitudes dans votre journal intime."
    ]
  },
  {
    id: 'r2',
    title: 'Le Scellement Nocturne',
    steps: [
      "Allongez-vous confortablement et fermez les yeux.",
      "Pensez au moment le plus beau ou le plus doux de la journée écoulée.",
      "Dites mentalement 'Merci' pour cette expérience.",
      "Laissez votre esprit flotter dans un sentiment de sécurité totale."
    ]
  }
];
