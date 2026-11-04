import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  MapPin, 
  Calendar,
  Maximize2
} from 'lucide-react';
import { GALLERY_ITEMS, GalleryItem } from '../data/gallery';

export const GalleryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    'All',
    'Products',
    'Cleanrooms & Manufacturing',
    'Hospital Installations'
  ];

  const filteredItems = activeCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const currentLightboxItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <div className="space-y-12 pb-16">
      
      {/* 1. Page Header */}
      <div className="bg-[#0B2F63] text-white py-14 sm:py-18 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#38B6FF]">
              <ImageIcon className="w-4 h-4" />
              <span>Visual Documentary</span>
            </div>
            <h1 className="text-3xl sm:text-4.5xl font-extrabold tracking-tight text-white">
              Medical & Facility Image Gallery
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Explore high-resolution photography of our sterile medical devices, automated ISO Class 7 cleanrooms, hospital clinical suites, and global air freight consignments.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* 2. Category Filter Controls */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                  activeCategory === cat
                    ? 'bg-[#0B2F63] text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-500 font-mono">
            Showing {filteredItems.length} Photographs
          </div>
        </div>

        {/* 3. Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div 
              key={item.id}
              onClick={() => openLightbox(index)}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-lg transition-all group cursor-pointer flex flex-col justify-between"
            >
              <div className="aspect-4/3 bg-slate-50 relative overflow-hidden flex items-center justify-center p-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-[#0B2F63]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-2.5 rounded-full bg-white/90 text-[#0B2F63] shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <ZoomIn className="w-5 h-5" />
                  </span>
                </div>

                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[10px] font-bold text-[#0B2F63] px-2.5 py-1 rounded-md border border-slate-200">
                  {item.category}
                </span>
              </div>

              <div className="p-4 space-y-1">
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#0B2F63] transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                  {item.caption}
                </p>
                
                {(item.location || item.date) && (
                  <div className="pt-2 flex items-center gap-3 text-[10px] text-slate-400 font-mono">
                    {item.location && <span>{item.location}</span>}
                    {item.date && <span>· {item.date}</span>}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* 4. Lightbox Modal */}
      {lightboxIndex !== null && currentLightboxItem && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          <div 
            className="relative max-w-5xl w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between text-white">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#38B6FF] tracking-wider">
                  {currentLightboxItem.category} ({lightboxIndex + 1} of {filteredItems.length})
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white truncate max-w-lg">
                  {currentLightboxItem.title}
                </h3>
              </div>

              <button
                onClick={closeLightbox}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Image View */}
            <div className="relative flex-1 bg-black flex items-center justify-center p-4 sm:p-8 min-h-[350px] overflow-hidden">
              <img
                src={currentLightboxItem.image}
                alt={currentLightboxItem.title}
                className="max-h-[65vh] max-w-full object-contain animate-in zoom-in-95 duration-200"
              />

              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white transition-colors cursor-pointer border border-slate-700"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white transition-colors cursor-pointer border border-slate-700"
                aria-label="Next Image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom Caption */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 text-xs text-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <p className="max-w-2xl leading-relaxed">{currentLightboxItem.caption}</p>
              {currentLightboxItem.location && (
                <div className="text-[11px] font-mono text-slate-400 shrink-0">
                  {currentLightboxItem.location} {currentLightboxItem.date && `(${currentLightboxItem.date})`}
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
