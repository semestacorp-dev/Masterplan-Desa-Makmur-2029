/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Target, Flag, Layers, Zap, BookOpen, Heart, HardHat, Shield, Coins, Users, Leaf, Globe, CheckCircle } from 'lucide-react';

// Data derived from the RPJMD PDF (Tables 3.14 - 3.19 & Table 4.2)
const CASCADING_DATA = [
  {
    id: 1,
    mission: "SDM & Vokasi",
    desc: "Meningkatkan kualitas sumber daya manusia dan pendidikan vokasi",
    theme: "UNGGUL",
    color: "bg-pop-primary",
    icon: BookOpen,
    goals: [
      {
        tujuan: "Meningkatnya kualitas dan daya saing sumber daya manusia",
        sasaran: [
          {
            text: "Meningkatnya derajat pendidikan masyarakat",
            indikator: ["Indeks Pembangunan Manusia", "Rata-rata Lama Sekolah", "Harapan Lama Sekolah"],
            programs: [
                "Program Pengelolaan Pendidikan", 
                "Program Pendidik dan Tenaga Kependidikan", 
                "Program Beasiswa Makmur (PHTC)",
                "Program Sekolah Kolaboratif"
            ],
            opd: "Dinas Pendidikan & Kebudayaan"
          }
        ]
      }
    ]
  },
  {
    id: 2,
    mission: "Layanan Kesehatan",
    desc: "Pemerataan layanan kesehatan melalui Kartu Sehat",
    theme: "UNGGUL",
    color: "bg-pop-secondary",
    icon: Heart,
    goals: [
      {
        tujuan: "Meningkatnya kualitas dan daya saing sumber daya manusia",
        sasaran: [
          {
            text: "Meningkatnya derajat kesehatan masyarakat",
            indikator: ["Indeks Kesehatan", "Usia Harapan Hidup", "Prevalensi Stunting"],
            programs: [
                "Program Pemenuhan Upaya Kesehatan", 
                "Program Peningkatan Kapasitas SDM Kesehatan", 
                "Kartu Sehat Makmur (PHTC)",
                "Program Pencegahan Stunting"
            ],
            opd: "Dinas Kesehatan"
          }
        ]
      }
    ]
  },
  {
    id: 3,
    mission: "Infrastruktur Merata",
    desc: "Pembangunan Infrastruktur yang merata dan berkualitas",
    theme: "MAJU",
    color: "bg-pop-accent text-pop-dark",
    icon: HardHat,
    goals: [
      {
        tujuan: "Terwujudnya infrastruktur daerah yang merata dan berkualitas",
        sasaran: [
          {
            text: "Meningkatnya kemantapan infrastruktur dasar dan tata ruang",
            indikator: ["Indeks Infrastruktur", "Kemantapan Jalan Kabupaten"],
            programs: [
                "Program Penyelenggaraan Jalan (URC)", 
                "Program Penataan Bangunan", 
                "Program PSU (Lampu Jalan)",
                "City Beautification (PHTC)"
            ],
            opd: "Dinas PUPR"
          }
        ]
      }
    ]
  },
  {
    id: 4,
    mission: "Nilai Religi & Budaya",
    desc: "Menjaga nilai-nilai religi dan budaya",
    theme: "RELIGIUS",
    color: "bg-pop-muted text-pop-dark",
    icon: Shield,
    goals: [
      {
        tujuan: "Meningkatnya pemerataan kesejahteraan dan keharmonisan",
        sasaran: [
          {
            text: "Meningkatnya kehidupan masyarakat yang aman, harmonis, dan demokratis",
            indikator: ["Indeks Kerukunan Umat Beragama"],
            programs: [
                "Program Pengembangan Kebudayaan", 
                "Program Pelestarian Cagar Budaya", 
                "Bantuan Rumah Ibadah"
            ],
            opd: "Badan Kesbangpol / Dikbud"
          }
        ]
      }
    ]
  },
  {
    id: 5,
    mission: "Hilirisasi Ekonomi",
    desc: "Hilirisasi produksi pertanian dan pariwisata",
    theme: "MANDIRI",
    color: "bg-pop-primary",
    icon: Leaf,
    goals: [
      {
        tujuan: "Meningkatnya ketahanan ekonomi daerah melalui sektor strategis",
        sasaran: [
          {
            text: "Meningkatnya pertumbuhan dan ketahanan ekonomi daerah",
            indikator: ["Laju Pertumbuhan Ekonomi", "Nilai Tukar Petani"],
            programs: [
                "Program Penyediaan Sarana Pertanian", 
                "Program Pengelolaan Perikanan Tangkap & Budidaya", 
                "Program Pengembangan Pariwisata"
            ],
            opd: "Dinas Pertanian / Dinas Perikanan"
          }
        ]
      }
    ]
  }
];

export const CascadingStrategy = () => {
  const [selectedTheme, setSelectedTheme] = useState(CASCADING_DATA[0]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 min-h-[600px]">
      {/* Left Sidebar: Themes */}
      <div className="w-full lg:w-1/3 flex flex-col gap-4 h-[600px] overflow-y-auto pr-2 scrollbar-hide">
        {CASCADING_DATA.map((theme) => (
          <motion.button
            key={theme.id}
            onClick={() => setSelectedTheme(theme)}
            className={`relative p-0 text-left transition-all duration-300 group`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={`absolute inset-0 rounded-xl bg-pop-dark translate-x-1 translate-y-1 transition-transform ${selectedTheme.id === theme.id ? 'translate-x-2 translate-y-2' : ''}`}></div>
            <div className={`relative p-5 rounded-xl border-2 border-pop-dark flex items-center gap-4 ${
              selectedTheme.id === theme.id 
                ? `${theme.color} ${theme.color.includes('text-pop-dark') ? 'text-pop-dark' : 'text-white'}` 
                : 'bg-white text-pop-dark hover:bg-stone-50'
            }`}>
                 <div className={`p-2 rounded-lg border-2 border-pop-dark ${selectedTheme.id === theme.id ? 'bg-white text-pop-dark' : theme.color + (theme.color.includes('text-pop-dark') ? ' border-pop-dark' : ' text-white')}`}>
                    <theme.icon size={24} strokeWidth={2.5} />
                 </div>
                 <div className="flex-1">
                    <div className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-80">{theme.theme}</div>
                    <div className="font-display text-xl leading-none">{theme.mission}</div>
                 </div>
                 {selectedTheme.id === theme.id && <ChevronRight size={24} strokeWidth={3} />}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Right Content: Cascading Flow */}
      <div className="w-full lg:w-2/3 relative">
         <div className="absolute inset-0 bg-pop-dark rounded-3xl transform translate-x-2 translate-y-2"></div>
         <div className="relative bg-white rounded-3xl border-2 border-pop-dark p-8 h-full flex flex-col overflow-hidden">
             
             {/* Header */}
             <div className={`absolute top-0 left-0 w-full h-3 ${selectedTheme.color} border-b-2 border-pop-dark`}></div>
             
             <AnimatePresence mode='wait'>
                <motion.div
                    key={selectedTheme.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="h-full flex flex-col"
                >
                    <div className="mb-8 pt-4">
                        <span className={`inline-block px-3 py-1 rounded-md text-xs font-black tracking-widest uppercase mb-3 border-2 border-pop-dark shadow-pop-sm ${selectedTheme.color} ${selectedTheme.color.includes('text-pop-dark') ? 'text-pop-dark' : 'text-white'}`}>
                            Misi {selectedTheme.id}
                        </span>
                        <h2 className="text-3xl lg:text-4xl font-display text-pop-dark mb-3">{selectedTheme.desc}</h2>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-8">
                        {selectedTheme.goals.map((goal, idx) => (
                            <div key={idx} className="relative pl-6 border-l-4 border-stone-200">
                                <div className={`absolute -left-[11px] top-0 w-5 h-5 rounded-full border-2 border-pop-dark ${selectedTheme.color}`}></div>
                                
                                <div className="mb-6">
                                    <h3 className="font-bold text-lg text-pop-dark bg-stone-100 p-3 rounded-lg border-2 border-stone-200 inline-block">
                                        <span className="text-stone-400 text-xs uppercase block mb-1 font-black">Tujuan</span>
                                        {goal.tujuan}
                                    </h3>
                                </div>

                                <div className="space-y-6">
                                    {goal.sasaran.map((sasaran, sIdx) => (
                                        <div key={sIdx} className="bg-pop-light p-5 rounded-2xl border-2 border-pop-dark shadow-pop-sm">
                                            <div className="mb-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Flag size={16} className={`text-pop-secondary`} />
                                                    <span className="text-xs font-black uppercase tracking-wider text-stone-500">Sasaran Daerah</span>
                                                </div>
                                                <p className="font-medium text-pop-dark text-lg leading-snug">{sasaran.text}</p>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t-2 border-dashed border-stone-300">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <Layers size={16} />
                                                        <span className="text-xs font-black uppercase tracking-wider text-stone-500">Indikator Kinerja</span>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {sasaran.indikator.map((ind, iIdx) => (
                                                            <span key={iIdx} className="px-3 py-1 bg-white border-2 border-pop-dark rounded-full text-xs font-bold text-pop-dark">
                                                                {ind}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                                
                                                <div>
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <Zap size={16} />
                                                        <span className="text-xs font-black uppercase tracking-wider text-stone-500">Program Prioritas</span>
                                                    </div>
                                                    <ul className="space-y-2">
                                                        {sasaran.programs.map((prog, pIdx) => (
                                                            <li key={pIdx} className="flex items-start gap-2 text-sm font-medium text-stone-700">
                                                                <CheckCircle size={14} className={`mt-1 shrink-0 text-pop-primary`} />
                                                                {prog}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                            
                                            <div className="mt-4 pt-3 border-t-2 border-stone-200 flex justify-end">
                                                <div className="bg-pop-dark text-white px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest">
                                                    OPD: {sasaran.opd}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
             </AnimatePresence>
         </div>
      </div>
    </div>
  );
};