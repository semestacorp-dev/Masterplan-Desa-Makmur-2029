/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { motion } from 'framer-motion';
import { Sparkles, Image as ImageIcon, Download, Loader2, AlertCircle, Wand2 } from 'lucide-react';

export const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const suggestions = [
    "Modern sustainable village community center with solar panels",
    "Smart farming drone monitoring lush rice fields in Lampung",
    "Riverbank ecotourism park with wooden boardwalks and clean water",
    "Digital village command center with data dashboards",
    "Traditional market with clean stalls and digital payment QR codes"
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Using Imagen model as requested for high quality generation
      const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '16:9',
        },
      });

      const imageBytes = response.generatedImages?.[0]?.image?.imageBytes;
      if (imageBytes) {
        setImageUrl(`data:image/jpeg;base64,${imageBytes}`);
      } else {
        throw new Error("No image data received from the API.");
      }
    } catch (err: any) {
      console.error("Generation error:", err);
      setError(err.message || "Gagal menghasilkan visualisasi. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl border-4 border-pop-dark shadow-pop overflow-hidden relative">
            {/* Header */}
            <div className="bg-pop-primary p-6 border-b-4 border-pop-dark flex items-center justify-between">
                <div>
                    <h3 className="font-display text-3xl text-pop-dark flex items-center gap-3">
                        <Sparkles className="w-8 h-8 text-white fill-current" />
                        Visualisasi Masa Depan
                    </h3>
                    <p className="font-bold text-pop-dark/80 mt-1">
                        Bayangkan transformasi Desa Makmur dengan AI Generatif (Imagen).
                    </p>
                </div>
                <div className="hidden md:block">
                     <div className="bg-white/20 p-2 rounded-lg border-2 border-pop-dark backdrop-blur-sm">
                        <ImageIcon className="text-pop-dark w-8 h-8" />
                     </div>
                </div>
            </div>

            <div className="p-8 bg-pop-pattern">
                {/* Input Area */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-grow relative">
                        <input 
                            type="text" 
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Deskripsikan visi pembangunan desa (contoh: Taman desa ramah anak...)"
                            className="w-full h-14 pl-6 pr-4 rounded-xl border-2 border-pop-dark focus:outline-none focus:ring-4 focus:ring-pop-accent/50 text-lg font-medium shadow-sm transition-all"
                            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400">
                           <Wand2 size={20} />
                        </div>
                    </div>
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleGenerate}
                        disabled={loading || !prompt.trim()}
                        className="h-14 px-8 bg-pop-dark text-white font-display text-xl rounded-xl shadow-pop hover:bg-pop-secondary transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 border-2 border-transparent hover:border-pop-dark min-w-[160px]"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : 'Generate'}
                    </motion.button>
                </div>

                {/* Suggestions */}
                <div className="mb-8 flex flex-wrap gap-2">
                    <span className="text-xs font-black uppercase tracking-widest text-stone-500 py-1.5">Quick Prompts:</span>
                    {suggestions.map((s, i) => (
                        <button 
                            key={i}
                            onClick={() => setPrompt(s)}
                            className="px-3 py-1 bg-white border border-pop-dark rounded-full text-xs font-bold text-pop-dark hover:bg-pop-accent transition-colors shadow-sm text-left"
                        >
                            {s}
                        </button>
                    ))}
                </div>

                {/* Display Area */}
                <div className="bg-stone-100 rounded-2xl border-2 border-pop-dark min-h-[400px] flex items-center justify-center relative overflow-hidden group">
                    {loading && (
                        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
                            <Loader2 className="w-12 h-12 text-pop-primary animate-spin mb-4" />
                            <p className="font-display text-xl text-pop-dark animate-pulse">Sedang Melukis Masa Depan...</p>
                        </div>
                    )}
                    
                    {error && (
                        <div className="text-center p-8 max-w-md">
                            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                            <p className="font-bold text-pop-dark text-lg mb-2">Oops!</p>
                            <p className="text-stone-600">{error}</p>
                        </div>
                    )}

                    {!loading && !imageUrl && !error && (
                        <div className="text-center opacity-40">
                            <ImageIcon className="w-24 h-24 mx-auto mb-4 text-stone-400" />
                            <p className="font-display text-2xl text-stone-400">Area Visualisasi</p>
                        </div>
                    )}

                    {imageUrl && (
                        <>
                            <img src={imageUrl} alt="Generated Visualization" className="w-full h-full object-cover" />
                            <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <a 
                                    href={imageUrl} 
                                    download={`visualisasi-desa-${Date.now()}.jpg`}
                                    className="p-3 bg-white text-pop-dark rounded-full shadow-pop border-2 border-pop-dark hover:bg-pop-primary transition-colors flex items-center gap-2 font-bold text-sm"
                                >
                                    <Download size={18} /> Simpan Gambar
                                </a>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};
