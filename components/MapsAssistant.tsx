/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Search, Loader2, Navigation, ExternalLink, Compass } from 'lucide-react';

export const MapsAssistant: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [places, setPlaces] = useState<any[]>([]);

  const suggestions = [
    "Cari Puskesmas terdekat di Labuhan Ratu",
    "Tunjukkan lokasi sekolah SMA di Raman Utara",
    "Pasar tradisional di sekitar Batanghari",
    "Kantor Kecamatan Sukadana"
  ];

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setQuery(searchQuery);
    setLoading(true);
    setResult(null);
    setPlaces([]);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: searchQuery,
        config: {
          tools: [{ googleMaps: {} }],
        },
      });

      if (response.text) {
        setResult(response.text);
      }

      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks) {
        const foundPlaces = chunks
          .map((c: any) => c.maps)
          .filter((m: any) => m && m.title && m.uri);
        setPlaces(foundPlaces);
      }

    } catch (e) {
      console.error(e);
      setResult("Gagal mengakses data Google Maps. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-12 mb-20">
      <div className="bg-white rounded-3xl border-4 border-pop-dark shadow-pop overflow-hidden">
        {/* Header */}
        <div className="bg-pop-secondary p-6 border-b-4 border-pop-dark flex items-center justify-between">
            <div className="text-white">
                <h3 className="font-display text-2xl flex items-center gap-2">
                    <Compass className="w-8 h-8" />
                    Asisten Lokasi Cerdas
                </h3>
                <p className="font-medium opacity-90 text-sm mt-1">
                    Cari fasilitas publik & infrastruktur real-time dengan Google Maps Grounding.
                </p>
            </div>
        </div>

        <div className="p-8 bg-stone-50">
             {/* Input */}
             <div className="relative mb-6">
                <input 
                    type="text" 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
                    placeholder="Cari lokasi fasilitas (misal: Sekolah di Raman Utara)..."
                    className="w-full h-14 pl-12 pr-4 rounded-xl border-2 border-pop-dark focus:outline-none focus:ring-4 focus:ring-pop-secondary/30 text-lg font-bold text-pop-dark shadow-sm"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                <button 
                    onClick={() => handleSearch(query)}
                    disabled={loading || !query}
                    className="absolute right-2 top-2 bottom-2 px-6 bg-pop-dark text-white rounded-lg font-bold text-sm hover:bg-pop-primary hover:text-pop-dark transition-colors disabled:opacity-50"
                >
                    {loading ? <Loader2 className="animate-spin" /> : 'Cari'}
                </button>
             </div>

             {/* Suggestions */}
             {!result && !loading && (
                 <div className="flex flex-wrap gap-2 mb-4">
                    {suggestions.map((s, i) => (
                        <button 
                            key={i}
                            onClick={() => handleSearch(s)}
                            className="px-3 py-1.5 bg-white border border-stone-300 rounded-full text-xs font-bold text-stone-600 hover:border-pop-dark hover:text-pop-dark hover:bg-pop-accent transition-all"
                        >
                            <MapPin size={12} className="inline mr-1" /> {s}
                        </button>
                    ))}
                 </div>
             )}

             {/* Results */}
             <AnimatePresence mode='wait'>
                {(result || loading) && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white rounded-xl border-2 border-pop-dark p-6"
                    >
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-8 text-pop-dark">
                                <Loader2 size={40} className="animate-spin mb-4 text-pop-secondary" />
                                <p className="font-display text-xl animate-pulse">Menghubungkan ke Google Maps...</p>
                            </div>
                        ) : (
                            <div className="flex flex-col lg:flex-row gap-8">
                                <div className="flex-1 prose prose-stone max-w-none">
                                    <h4 className="font-display text-lg text-pop-dark mb-2 flex items-center gap-2">
                                        <Navigation size={20} className="text-pop-primary" />
                                        Informasi Lokasi
                                    </h4>
                                    <div className="whitespace-pre-wrap text-sm font-medium leading-relaxed">
                                        {result}
                                    </div>
                                </div>
                                
                                {places.length > 0 && (
                                    <div className="w-full lg:w-1/3 space-y-3">
                                        <h4 className="font-display text-sm text-stone-500 uppercase tracking-widest mb-3">
                                            Ditemukan di Peta
                                        </h4>
                                        {places.map((place, idx) => (
                                            <a 
                                                key={idx} 
                                                href={place.uri} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="block p-3 bg-stone-50 rounded-lg border border-stone-200 hover:border-pop-secondary hover:bg-white hover:shadow-md transition-all group"
                                            >
                                                <div className="font-bold text-pop-dark text-sm mb-1 flex items-start justify-between">
                                                    {place.title}
                                                    <ExternalLink size={14} className="text-stone-300 group-hover:text-pop-secondary" />
                                                </div>
                                                <div className="text-xs text-stone-500 truncate">
                                                    Buka di Google Maps
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </motion.div>
                )}
             </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
