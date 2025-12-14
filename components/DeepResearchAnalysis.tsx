/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { motion } from 'framer-motion';
import { BrainCircuit, Search, Loader2, AlertCircle, Bot, Sparkles, FileText } from 'lucide-react';

export const DeepResearchAnalysis: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const suggestions = [
    "Analisis risiko kegagalan program hilirisasi Mocaf di Braja Gemilang dan strategi mitigasinya.",
    "Evaluasi dampak jangka panjang program GARDAPURA terhadap pengurangan emisi karbon desa.",
    "Buat simulasi proyeksi kenaikan IDM jika 7 program prioritas berjalan optimal dalam 2 tahun.",
    "Analisis korelasi antara digitalisasi Smart Village di Raman Endra dengan transparansi anggaran."
  ];

  const handleAnalyze = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: query,
        config: {
          thinkingConfig: { thinkingBudget: 32768 },
        },
      });

      if (response.text) {
        setResult(response.text);
      } else {
        throw new Error("No analysis generated.");
      }
    } catch (err: any) {
      console.error("Analysis error:", err);
      setError(err.message || "Gagal melakukan analisis. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl border-4 border-pop-dark shadow-pop overflow-hidden relative">
            {/* Header */}
            <div className="bg-pop-accent p-6 border-b-4 border-pop-dark flex items-center justify-between">
                <div>
                    <h3 className="font-display text-3xl text-pop-dark flex items-center gap-3">
                        <BrainCircuit className="w-8 h-8 text-pop-dark fill-current opacity-80" />
                        Deep Research Analysis
                    </h3>
                    <p className="font-bold text-pop-dark/80 mt-1">
                        Analisis mendalam Masterplan menggunakan Thinking Mode (Gemini 3.0 Pro).
                    </p>
                </div>
                <div className="hidden md:block">
                     <div className="bg-white/20 p-2 rounded-lg border-2 border-pop-dark backdrop-blur-sm">
                        <Bot className="text-pop-dark w-8 h-8" />
                     </div>
                </div>
            </div>

            <div className="p-8 bg-pop-pattern">
                {/* Input Area */}
                <div className="flex flex-col gap-4 mb-6">
                    <div className="relative">
                        <textarea 
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Tuliskan pertanyaan kompleks Anda untuk dianalisis (contoh: Evaluasi strategi ekonomi...)"
                            className="w-full min-h-[120px] p-4 rounded-xl border-2 border-pop-dark focus:outline-none focus:ring-4 focus:ring-pop-primary/50 text-lg font-medium shadow-sm transition-all resize-y"
                        />
                        <div className="absolute right-3 bottom-3 text-stone-400">
                           <Search size={20} />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleAnalyze}
                            disabled={loading || !query.trim()}
                            className="h-12 px-8 bg-pop-dark text-white font-display text-lg rounded-xl shadow-pop hover:bg-pop-primary hover:text-pop-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 border-2 border-transparent hover:border-pop-dark"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" />
                                    <span className="animate-pulse">Thinking...</span>
                                </>
                            ) : (
                                <>
                                    <Sparkles size={18} />
                                    Mulai Analisis
                                </>
                            )}
                        </motion.button>
                    </div>
                </div>

                {/* Suggestions */}
                <div className="mb-8 flex flex-wrap gap-2">
                    <span className="text-xs font-black uppercase tracking-widest text-stone-500 py-1.5">Contoh Analisis:</span>
                    {suggestions.map((s, i) => (
                        <button 
                            key={i}
                            onClick={() => setQuery(s)}
                            className="px-3 py-1 bg-white border border-pop-dark rounded-full text-xs font-bold text-pop-dark hover:bg-pop-secondary hover:text-white transition-colors shadow-sm text-left truncate max-w-[300px]"
                            title={s}
                        >
                            {s}
                        </button>
                    ))}
                </div>

                {/* Result Area */}
                {(result || loading || error) && (
                    <div className="bg-stone-50 rounded-2xl border-2 border-pop-dark p-6 min-h-[200px] relative">
                         {loading && (
                            <div className="flex flex-col items-center justify-center h-48 gap-4">
                                <div className="relative">
                                    <div className="w-16 h-16 border-4 border-pop-muted rounded-full animate-spin border-t-pop-primary"></div>
                                    <BrainCircuit className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-pop-dark w-8 h-8 animate-pulse" />
                                </div>
                                <p className="font-display text-lg text-pop-dark animate-pulse">Sedang Berpikir Mendalam...</p>
                                <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">Thinking Budget: 32k Tokens</p>
                            </div>
                        )}

                        {error && (
                            <div className="text-center p-8">
                                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                                <p className="font-bold text-pop-dark text-lg mb-2">Analisis Gagal</p>
                                <p className="text-stone-600">{error}</p>
                            </div>
                        )}

                        {result && !loading && (
                            <div className="prose prose-stone max-w-none">
                                <div className="flex items-center gap-2 mb-4 pb-4 border-b-2 border-dashed border-stone-300">
                                    <FileText className="text-pop-primary" />
                                    <h4 className="font-display text-xl text-pop-dark m-0">Hasil Analisis</h4>
                                </div>
                                <div className="whitespace-pre-wrap text-stone-800 leading-relaxed font-medium">
                                    {result}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};
