import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, ZoomIn } from 'lucide-react';
import { HOSPITAL_GALLERY, GalleryItem } from '../data/hospitalData';

interface GalleryLightBoxModalProps {
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

export const GalleryLightBoxModal: React.FC<GalleryLightBoxModalProps> = ({
  initialIndex = 0,
  isOpen,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  if (!isOpen) return null;

  const currentItem = HOSPITAL_GALLERY[currentIndex] || HOSPITAL_GALLERY[0];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : HOSPITAL_GALLERY.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev < HOSPITAL_GALLERY.length - 1 ? prev + 1 : 0));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative bg-slate-900 rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden border border-slate-800 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0875E1] bg-[#0875E1]/10 px-2.5 py-1 rounded-md">
              {currentItem.category}
            </span>
            <h3 className="text-sm font-bold text-white">
              {currentItem.title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 mr-2">
              {currentIndex + 1} / {HOSPITAL_GALLERY.length}
            </span>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Photo Area */}
        <div className="relative bg-black flex items-center justify-center min-h-[300px] sm:min-h-[420px] max-h-[60vh] overflow-hidden select-none">
          <img
            src={currentItem.image}
            alt={currentItem.title}
            className="w-full h-full max-h-[58vh] object-contain"
          />

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-transform hover:scale-110"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-transform hover:scale-110"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Thumbnail Selector & Caption */}
        <div className="p-5 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="max-w-xl">
            <h4 className="text-sm font-bold text-white mb-1">
              {currentItem.title}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentItem.description}
            </p>
          </div>

          {/* Mini Thumbnails */}
          <div className="flex items-center gap-2 shrink-0">
            {HOSPITAL_GALLERY.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setCurrentIndex(idx)}
                className={`relative w-14 h-10 rounded-lg overflow-hidden border-2 transition-all ${
                  idx === currentIndex
                    ? 'border-[#0875E1] scale-105 shadow-md'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
