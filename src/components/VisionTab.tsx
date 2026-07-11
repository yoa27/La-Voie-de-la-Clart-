/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { VisionCard } from '../types';
import { Plus, X, Trash2, HelpCircle, Star } from 'lucide-react';

interface VisionTabProps {
  visionCards: VisionCard[];
  setVisionCards: React.Dispatch<React.SetStateAction<VisionCard[]>>;
}

export default function VisionTab({ visionCards, setVisionCards }: VisionTabProps) {
  const [activeCard, setActiveCard] = useState<VisionCard | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Form state for new card
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newCategory, setNewCategory] = useState('MANIFESTATION');
  const [newQuote, setNewQuote] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    // Use a high-quality monochrome Picsum image seed if no URL is provided
    const finalImageUrl = newImageUrl.trim() || 
      `https://picsum.photos/seed/${encodeURIComponent(newTitle.trim().toLowerCase())}/600/800?grayscale`;

    const newCard: VisionCard = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      subtitle: newSubtitle.trim() || 'Une nouvelle manifestation.',
      category: newCategory.toUpperCase(),
      quote: newQuote.trim() || `La clarté se manifeste à travers ma vision de ${newTitle.trim()}.`,
      imageUrl: finalImageUrl,
      isCustom: true
    };

    const updated = [newCard, ...visionCards];
    setVisionCards(updated);
    localStorage.setItem('clarte_vision_cards', JSON.stringify(updated));

    // Reset fields
    setNewTitle('');
    setNewSubtitle('');
    setNewCategory('MANIFESTATION');
    setNewQuote('');
    setNewImageUrl('');
    setIsAddModalOpen(false);
  };

  const handleDeleteCard = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid opening the card detail modal
    if (!window.confirm("Voulez-vous vraiment supprimer cet ancrage de votre tableau de vision ?")) return;

    const updated = visionCards.filter(c => c.id !== id);
    setVisionCards(updated);
    localStorage.setItem('clarte_vision_cards', JSON.stringify(updated));
    if (activeCard?.id === id) {
      setActiveCard(null);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 pb-32">
      
      {/* Header Section */}
      <header className="mb-12 text-center md:text-left">
        <p className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-black/40 mb-3">
          MANIFESTATION
        </p>
        <h2 className="text-3xl md:text-4xl font-sans font-medium tracking-tight mb-4">
          Créez votre réalité
        </h2>
        <div className="w-12 h-px bg-black mx-auto md:mx-0"></div>
      </header>

      {/* Bento-style Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {visionCards.map((card) => {
          const isDarkCard = card.id === '3'; // Make the mountain peak high-contrast inverted for emphasis!
          
          return (
            <div 
              key={card.id}
              onClick={() => setActiveCard(card)}
              className={`break-inside-avoid border p-4 bg-white transition-all duration-300 cursor-pointer relative group/card hover:shadow-md hover:-translate-y-1 ${
                isDarkCard 
                  ? 'bg-black border-black text-white' 
                  : 'border-black/[0.12] text-black'
              }`}
            >
              {/* Optional Delete button for custom cards */}
              {card.isCustom && (
                <button
                  onClick={(e) => handleDeleteCard(card.id, e)}
                  className="absolute top-6 right-6 z-10 w-8 h-8 rounded-full bg-white/90 border border-black/10 text-red-600 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity hover:bg-white active:scale-90"
                  title="Supprimer cet ancrage"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}

              {/* Image Container */}
              <div className="relative overflow-hidden aspect-[4/5] bg-black/5 mb-4 rounded-xl">
                <img 
                  src={card.imageUrl} 
                  alt={card.title} 
                  className={`w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-102 ${
                    isDarkCard ? 'brightness-90 contrast-125' : ''
                  }`}
                  referrerPolicy="no-referrer"
                />
                {/* Elegant overlay detail on hover */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white/95 text-black text-[10px] font-sans font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-black/10">
                    S'imprégner
                  </span>
                </div>
              </div>

              {/* Content text */}
              <div className="px-1 py-1">
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[9px] font-sans font-bold tracking-widest uppercase ${
                    isDarkCard ? 'text-white/40' : 'text-black/40'
                  }`}>
                    {card.category || 'MANIFESTATION'}
                  </span>
                  {card.isCustom && (
                    <span className="text-[8px] border border-black/20 text-black/50 px-1.5 py-0.5 rounded-full font-sans uppercase">
                      Perso
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-sans font-semibold uppercase tracking-widest mb-1">
                  {card.title}
                </h3>
                <p className={`text-xs font-serif ${
                  isDarkCard ? 'text-white/75' : 'text-black/75'
                }`}>
                  {card.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Action Button (FAB) to Add Custom Vision Anchor */}
      <button 
        onClick={() => setIsAddModalOpen(true)}
        className="fixed bottom-24 right-6 md:right-12 w-14 h-14 bg-black text-white hover:bg-black/90 active:scale-95 hover:scale-105 transition-all rounded-full flex items-center justify-center shadow-lg z-40 cursor-pointer"
        title="Créer un nouvel ancrage visuel"
      >
        <Plus className="w-7 h-7 stroke-[2]" />
      </button>

      {/* -------------------- DETAIL MODAL -------------------- */}
      {activeCard && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-black w-full max-w-md p-6 rounded-2xl flex flex-col shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <button 
              onClick={() => setActiveCard(null)}
              className="absolute top-4 right-4 text-black hover:opacity-60 transition-opacity cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[9px] font-sans font-bold tracking-[0.2em] text-black/40 uppercase mb-1">
              {activeCard.category || 'ANCRAGE VISUEL'}
            </span>
            <h3 className="text-2xl font-sans font-semibold uppercase tracking-wider text-black mb-4">
              {activeCard.title}
            </h3>

            {/* Immersive Image Display */}
            <div className="w-full aspect-[4/3] overflow-hidden rounded-xl bg-black/5 mb-6 border border-black/10">
              <img 
                src={activeCard.imageUrl} 
                alt={activeCard.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Affirmation Block */}
            <div className="border-l-2 border-black pl-4 mb-6">
              <p className="text-xs font-sans text-black/40 uppercase tracking-widest mb-1">Affirmation active :</p>
              <p className="text-base font-serif italic text-black leading-relaxed">
                "{activeCard.quote}"
              </p>
            </div>

            <p className="text-xs font-sans text-black/60 leading-relaxed bg-black/5 p-4 rounded-xl">
              <Star className="w-4 h-4 inline-block text-black mr-2 stroke-[1.5] -mt-0.5" />
              Prenez 30 secondes pour contempler cette image, respirez calmement, et sentez l'émotion de cette manifestation déjà accomplie dans votre réalité.
            </p>

            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => setActiveCard(null)}
                className="px-6 py-2 bg-black text-white rounded-xl font-sans text-xs uppercase tracking-wider hover:opacity-95 cursor-pointer"
              >
                Intégrer la vision
              </button>
            </div>
          </div>
        </div>
      )}

      {/* -------------------- ADD MODAL -------------------- */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-black w-full max-w-md p-6 rounded-2xl flex flex-col shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <button 
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 text-black hover:opacity-60 transition-opacity cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-sans font-semibold uppercase tracking-wider text-black mb-6">
              Nouvel Ancrage de Manifestation
            </h3>

            <form onSubmit={handleAddCard} className="space-y-4">
              
              {/* Title input */}
              <div>
                <label className="block text-[10px] font-sans font-bold uppercase tracking-wider text-black/50 mb-1">
                  Titre (ex: Liberté, Santé, Voyage, Prospérité) *
                </label>
                <input 
                  type="text" 
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Écrivez le mot clé..."
                  className="w-full bg-black/[0.02] border border-black/10 rounded-xl px-3 py-2.5 text-xs font-serif focus:outline-none focus:border-black"
                />
              </div>

              {/* Subtitle input */}
              <div>
                <label className="block text-[10px] font-sans font-bold uppercase tracking-wider text-black/50 mb-1">
                  Description courte (ex: 'Courir le long de la plage de mes rêves')
                </label>
                <input 
                  type="text" 
                  value={newSubtitle}
                  onChange={(e) => setNewSubtitle(e.target.value)}
                  placeholder="L'intention condensée..."
                  className="w-full bg-black/[0.02] border border-black/10 rounded-xl px-3 py-2.5 text-xs font-serif focus:outline-none focus:border-black"
                />
              </div>

              {/* Category input */}
              <div>
                <label className="block text-[10px] font-sans font-bold uppercase tracking-wider text-black/50 mb-1">
                  Catégorie
                </label>
                <select 
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-black/[0.02] border border-black/10 rounded-xl px-3 py-2.5 text-xs font-sans focus:outline-none focus:border-black"
                >
                  <option value="MANIFESTATION">MANIFESTATION</option>
                  <option value="SANTÉ">SANTÉ & CORPS</option>
                  <option value="ABONDANCE">ABONDANCE</option>
                  <option value="AMOUR">AMOUR & FAMILLE</option>
                  <option value="CARRIÈRE">CARRIÈRE & CRÉATIVITÉ</option>
                  <option value="PENSÉE">PHILOSOPHIE & MENTAL</option>
                </select>
              </div>

              {/* Affirmation input */}
              <div>
                <label className="block text-[10px] font-sans font-bold uppercase tracking-wider text-black/50 mb-1">
                  Affirmation active complète (ex: 'Je suis en parfaite santé et rempli d'énergie vitale')
                </label>
                <textarea 
                  value={newQuote}
                  onChange={(e) => setNewQuote(e.target.value)}
                  placeholder="Récitez cette affirmation complète à voix haute..."
                  rows={2}
                  className="w-full bg-black/[0.02] border border-black/10 rounded-xl px-3 py-2.5 text-xs font-serif focus:outline-none focus:border-black"
                />
              </div>

              {/* Image URL input */}
              <div>
                <label className="block text-[10px] font-sans font-bold uppercase tracking-wider text-black/50 mb-1 flex items-center justify-between">
                  <span>URL de l'image (Optionnel)</span>
                  <span className="text-[8px] bg-black/5 text-black/50 px-1.5 py-0.5 rounded-full uppercase">Lien Web</span>
                </label>
                <input 
                  type="url" 
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/... (Laisser vide pour une génération dynamique)"
                  className="w-full bg-black/[0.02] border border-black/10 rounded-xl px-3 py-2.5 text-xs font-serif focus:outline-none focus:border-black"
                />
                <p className="text-[9px] text-black/40 font-serif italic mt-1 leading-relaxed">
                  Laissez le champ URL vide pour générer automatiquement une image monochrome artistique basée sur votre titre !
                </p>
              </div>

              <div className="pt-2 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-3 border border-black/10 rounded-xl font-sans text-xs uppercase tracking-wider text-black hover:bg-black/5 cursor-pointer"
                >
                  Annuler
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 bg-black text-white rounded-xl font-sans text-xs uppercase tracking-wider hover:bg-black/90 active:scale-95 transition-all cursor-pointer"
                >
                  Créer l'ancrage
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
