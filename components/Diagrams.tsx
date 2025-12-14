/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip 
} from 'recharts';
import { 
  Building2, Sprout, HandHeart, Scale, Users, Leaf, ArrowRight,
  MapPin
} from 'lucide-react';

// --- STATIC DATA DEFINITIONS ---

// Data updated based on Masterplan Desa Makmur "Target Intervensi ID6"
const RADAR_DATA = [
  { subject: 'Layanan Dasar', A: 120, B: 110, fullMark: 150, desc: 'Pendidikan Vokasi, Kesehatan, Layanan Dasar' },
  { subject: 'Sosial', A: 98, B: 130, fullMark: 150, desc: 'Modal Sosial, Warisan Budaya, Keterampilan SDM' },
  { subject: 'Ekonomi', A: 86, B: 130, fullMark: 150, desc: 'Keberagaman Produksi, Akses Pasar, Nilai Tambah' },
  { subject: 'Lingkungan', A: 99, B: 100, fullMark: 150, desc: 'Energi Bersih, Pengelolaan Sampah, Konservasi' },
  { subject: 'Aksesibilitas', A: 85, B: 90, fullMark: 150, desc: 'Infrastruktur Jalan, Internet, Akses Wisata' },
  { subject: 'Tata Kelola', A: 65, B: 85, fullMark: 150, desc: 'Transparansi Data, Layanan Digital (Smart Village)' },
];

const MISSIONS_DATA = [
  { 
      id: 1, 
      title: "SDM & Vokasi", 
      icon: Users, 
      program: "LAMTIM CERDAS", 
      focus: "Pendidikan Vokasi & Kesehatan",
      description: "Meningkatkan kualitas SDM melalui beasiswa, pelatihan vokasi, dan pemerataan layanan kesehatan.",
      color: "bg-pop-primary"
  },
  { 
      id: 3, 
      title: "Infrastruktur", 
      icon: Building2, 
      program: "GEBRAK", 
      focus: "Jalan & Internet",
      description: "Gerakan Bersama Rakyat untuk percepatan pembangunan infrastruktur fisik dan digital.",
      color: "bg-pop-secondary"
  },
  { 
      id: 5, 
      title: "Hilirisasi", 
      icon: Sprout, 
      program: "BUMDESMA", 
      focus: "Nilai Tambah",
      description: "Mengubah komoditas mentah menjadi produk bernilai tambah melalui BUMDes dan Koperasi.",
      color: "bg-pop-accent text-pop-dark"
  },
  { 
      id: 6, 
      title: "Reformasi Birokrasi", 
      icon: Scale, 
      program: "DESA CAKAP", 
      focus: "Digitalisasi",
      description: "Mewujudkan tata kelola pemerintahan yang Cerdas, Akuntabel, dan Partisipatif.",
      color: "bg-pop-muted text-pop-dark"
  },
  { 
      id: 8, 
      title: "Perlindungan", 
      icon: HandHeart, 
      program: "PRO-AKTIF", 
      focus: "Kemiskinan",
      description: "Intervensi kemiskinan ekstrem melalui bantuan sosial tepat sasaran dan pemberdayaan.",
      color: "bg-pop-primary"
  },
  { 
      id: 9, 
      title: "Lingkungan", 
      icon: Leaf, 
      program: "GARDAPURA", 
      focus: "Sanitasi",
      description: "Gerakan sadar lingkungan untuk sanitasi total, pengelolaan sampah, dan ketangguhan bencana.",
      color: "bg-stone-700 text-white"
  },
];

// Verified 12 Pilot Villages from PDF Page 12-13
const PILOT_VILLAGES_DATA = [
  { 
      name: "Braja Gemilang", 
      kecamatan: "Braja Slebah",
      niche: "Sentra Mocaf", 
      status: "MAJU",
      desc: "Hilirisasi Ubi Kayu (BUMDESMA PANGAN).",
      color: "bg-pop-primary"
  },
  { 
      name: "Raman Fajar", 
      kecamatan: "Raman Utara",
      niche: "Sentra Kerupuk", 
      status: "MANDIRI",
      desc: "IKM Terstandarisasi (PRO-AKTIF & KRENOVA).",
      color: "bg-pop-secondary"
  },
  { 
      name: "Giri Mulyo", 
      kecamatan: "Marga Sekampung",
      niche: "Alpukat Siger", 
      status: "MAJU",
      desc: "Smart Farming & GAP (Agroforestri).",
      color: "bg-pop-accent"
  },
  { 
      name: "Sukadana Baru", 
      kecamatan: "Marga Tiga",
      niche: "Lada Hitam", 
      status: "MAJU",
      desc: "Penyangga Harga & IG (BUMDESMA).",
      color: "bg-pop-muted"
  },
  { 
      name: "Pugung Raharjo", 
      kecamatan: "Sekampung Udik",
      niche: "Wisata Sejarah", 
      status: "MANDIRI",
      desc: "Storytelling & Cagar Budaya.",
      color: "bg-pop-primary"
  },
  { 
      name: "Banjar Rejo", 
      kecamatan: "Batanghari",
      niche: "Desa Budaya", 
      status: "MAJU",
      desc: "Revitalisasi Sanggar Gemati (KRENOVA).",
      color: "bg-pop-secondary"
  },
  { 
      name: "Labuhan Ratu IX", 
      kecamatan: "Labuhan Ratu",
      niche: "Ekowisata", 
      status: "MANDIRI",
      desc: "Penyangga TNWK (Konflik ke Aset).",
      color: "bg-pop-accent"
  },
  { 
      name: "Sri Menanti", 
      kecamatan: "Bandar Sribhawono",
      niche: "Konservasi Air", 
      status: "MANDIRI",
      desc: "Tiket Sampah & Bersih Sungai (GARDAPURA).",
      color: "bg-pop-muted"
  },
  { 
      name: "Bumi Mulyo", 
      kecamatan: "Sekampung Udik",
      niche: "Desa Literasi", 
      status: "MAJU",
      desc: "Community Learning Center (Pendidikan).",
      color: "bg-pop-primary"
  },
  { 
      name: "Raman Endra", 
      kecamatan: "Raman Utara",
      niche: "Smart Village/Madu", 
      status: "MANDIRI",
      desc: "Digitalisasi & E-Catalog (DESA CAKAP).",
      color: "bg-pop-secondary"
  },
  { 
      name: "Margototo", 
      kecamatan: "Metro Kibang",
      niche: "Sentra Ternak", 
      status: "MAJU",
      desc: "Korporasi Peternak & Biogas (Integrated Farming).",
      color: "bg-pop-accent"
  },
  { 
      name: "Tulus Rejo", 
      kecamatan: "Pekalongan",
      niche: "Sentra Pembibitan", 
      status: "MANDIRI",
      desc: "Sertifikasi Bibit & Jejaring Agribisnis.",
      color: "bg-pop-muted"
  },
];

// --- ID6 RADAR DIAGRAM ---
export const ID6RadarDiagram: React.FC = () => {
  const [activeDim, setActiveDim] = useState<number | null>(null);

  // Custom tick to allow interactivity on chart labels
  // Wrapped in useCallback to maintain stable reference
  const renderCustomTick = useCallback((props: any) => {
    const { payload, x, y, textAnchor, index } = props;
    const isActive = activeDim === index;
    
    return (
      <g 
        onMouseEnter={() => setActiveDim(index)}
        onMouseLeave={() => setActiveDim(null)}
        style={{ cursor: 'pointer' }}
      >
        <text
          x={x}
          y={y}
          dy={4}
          textAnchor={textAnchor}
          fill={isActive ? '#C6FF00' : 'rgba(255,255,255,0.6)'}
          fontSize={isActive ? 12 : 10}
          fontWeight={isActive ? 900 : 500}
          fontFamily="Righteous"
          className="transition-all duration-300 select-none"
        >
          {payload.value}
        </text>
      </g>
    );
  }, [activeDim]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col md:flex-row items-center gap-8 p-0"
    >
      <div className="w-full md:w-1/2 h-80 relative bg-white/10 rounded-2xl backdrop-blur-sm border-2 border-white/20 p-4">
         <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={RADAR_DATA}>
              <PolarGrid stroke="rgba(255,255,255,0.3)" strokeDasharray="5 5" />
              <PolarAngleAxis 
                dataKey="subject" 
                tick={renderCustomTick}
              />
              <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
              <Radar
                name="Desa Makmur"
                dataKey="A"
                stroke="#00E676"
                strokeWidth={4}
                fill="#00E676"
                fillOpacity={0.6}
                isAnimationActive={true}
                animationDuration={1500}
                animationEasing="ease-out"
              />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: '2px solid #003300', boxShadow: '4px 4px 0px 0px #003300', fontFamily: 'Outfit' }}
                itemStyle={{ color: '#00E676', fontWeight: 'bold' }}
              />
            </RadarChart>
         </ResponsiveContainer>
         <div className="absolute top-2 left-2 bg-pop-primary text-pop-dark px-3 py-1 rounded-md text-xs font-black tracking-widest border border-pop-dark shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">ID6 METRICS</div>
      </div>
      
      <div className="w-full md:w-1/2">
        <h3 className="font-display text-3xl mb-4 text-white drop-shadow-md">Indeks Desa <span className="text-pop-accent">6 Dimensi</span></h3>
        <p className="text-stone-300 mb-6 text-sm leading-relaxed font-medium">
          Pergeseran paradigma dari Indeks Desa Membangun (IDM) ke ID6 memungkinkan diagnosis yang lebih presisi terhadap 48 indikator turunan.
        </p>
        <div className="grid grid-cols-2 gap-3">
          {RADAR_DATA.map((item, idx) => (
             <motion.div 
                key={idx} 
                onMouseEnter={() => setActiveDim(idx)}
                onMouseLeave={() => setActiveDim(null)}
                animate={{ 
                    scale: activeDim === idx ? 1.05 : 1,
                    backgroundColor: activeDim === idx ? '#00E676' : 'rgba(255, 255, 255, 0.05)',
                    borderColor: activeDim === idx ? '#003300' : 'rgba(255, 255, 255, 0.1)',
                    color: activeDim === idx ? '#003300' : '#d6d3d1'
                }}
                className={`p-3 rounded-lg border-2 cursor-pointer transition-colors duration-200`}
             >
                <div className="flex justify-between items-center mb-1">
                    <div className="text-xs font-black uppercase tracking-wider">{item.subject}</div>
                </div>
                <div className={`text-[10px] leading-tight font-medium ${activeDim === idx ? 'text-pop-dark opacity-100 font-bold' : 'opacity-60'}`}>
                    {item.desc}
                </div>
             </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// --- RPJMD ALIGNMENT MATRIX ---
export const RpjmdMatrix: React.FC = () => {
    const [activeMission, setActiveMission] = useState(0);
    const [hoveredMission, setHoveredMission] = useState<number | null>(null);

    return (
        <div className="flex flex-col lg:flex-row h-auto lg:h-[500px]">
            {/* Left: Missions List */}
            <div className="w-full lg:w-1/3 bg-white p-6 border-b lg:border-b-0 lg:border-r-2 border-pop-dark relative z-10 flex flex-col gap-2 overflow-y-auto">
                <div className="font-display text-2xl text-pop-dark mb-4 border-b-2 border-pop-dark pb-2">Misi Siwo Itou</div>
                {MISSIONS_DATA.map((m, idx) => (
                    <button
                        key={m.id}
                        onClick={() => setActiveMission(idx)}
                        onMouseEnter={() => setHoveredMission(idx)}
                        onMouseLeave={() => setHoveredMission(null)}
                        className={`w-full text-left px-5 py-4 rounded-xl flex items-center gap-4 transition-all duration-300 border-2 ${
                            activeMission === idx 
                            ? `${m.color} ${m.color.includes('text-pop-dark') ? 'text-pop-dark' : 'text-white'} border-pop-dark shadow-pop transform translate-x-2` 
                            : 'bg-white border-transparent hover:border-pop-dark hover:bg-pop-light text-stone-600'
                        }`}
                    >
                        <div className={`p-2 rounded-lg bg-white/20 border-2 border-transparent ${activeMission === idx ? 'border-black/10' : ''}`}>
                             <m.icon size={20} className={activeMission === idx ? (m.color.includes('text-pop-dark') ? 'text-pop-dark' : 'text-white') : 'text-pop-dark'} strokeWidth={2.5} />
                        </div>
                        <span className="font-bold text-base font-display">{m.title}</span>
                        {activeMission === idx && <ArrowRight size={20} className="ml-auto" />}
                    </button>
                ))}
            </div>

            {/* Right: Masterplan Translation Content */}
            <div className="w-full lg:w-2/3 p-8 lg:p-12 flex flex-col justify-center bg-pop-light relative z-0">
                <div className="absolute top-0 right-0 p-4">
                    <div className="text-9xl font-display text-pop-dark/5">{activeMission + 1}</div>
                </div>
                
                <AnimatePresence mode='wait'>
                    <motion.div 
                        key={activeMission}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className={`inline-block px-3 py-1 rounded-md text-xs font-black tracking-widest uppercase mb-4 border-2 border-pop-dark shadow-pop-sm ${MISSIONS_DATA[activeMission].color}`}>
                             Program Prioritas
                        </div>
                        <h2 className="font-display text-5xl lg:text-6xl text-pop-dark mb-6 leading-tight">
                            {MISSIONS_DATA[activeMission].program}
                        </h2>
                        <p className="text-xl text-stone-600 mb-10 leading-relaxed font-medium">
                            {MISSIONS_DATA[activeMission].description}
                        </p>
                        
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-xl border-2 border-pop-dark shadow-pop">
                                <div className="text-stone-400 text-xs font-black uppercase mb-2">Fokus Utama</div>
                                <div className={`text-xl font-display ${MISSIONS_DATA[activeMission].color.includes('bg-pop') ? 'text-pop-dark' : 'text-pop-primary'}`}>
                                    {MISSIONS_DATA[activeMission].focus}
                                </div>
                            </div>
                            <div className="bg-pop-dark p-6 rounded-xl border-2 border-pop-dark shadow-pop text-white">
                                <div className="text-stone-400 text-xs font-black uppercase mb-2">Target 2029</div>
                                <div className="text-xl font-display text-pop-accent">
                                    Tercapai 100%
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}

// --- PILOT VILLAGE GRID ---
export const PilotVillagesGrid: React.FC = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
            {PILOT_VILLAGES_DATA.map((v, i) => (
                <motion.div 
                    key={i}
                    whileHover={{ y: -10, rotate: i % 2 === 0 ? 2 : -2 }}
                    className="bg-white p-5 rounded-2xl border-2 border-pop-dark shadow-pop hover:shadow-pop-hover transition-all duration-300 group relative overflow-hidden"
                >
                    <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full ${v.color} opacity-20 -mr-4 -mt-4 transition-transform group-hover:scale-150 duration-500`}></div>

                    <div className="flex flex-col h-full relative z-10">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-2 rounded-lg ${v.color} border-2 border-pop-dark ${v.color === 'bg-pop-accent' || v.color === 'bg-pop-muted' ? 'text-pop-dark' : 'text-white'} shadow-pop-sm`}>
                                <MapPin size={20} />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-md bg-stone-100 border border-pop-dark text-pop-dark">
                                {v.status}
                            </span>
                        </div>
                        
                        <h4 className="font-display text-xl text-pop-dark mb-1">{v.name}</h4>
                        <div className="text-xs font-bold text-stone-400 uppercase mb-3">{v.kecamatan}</div>

                        <div className="mt-auto">
                            <p className="text-sm text-stone-600 font-medium mb-3 leading-snug">
                                {v.desc}
                            </p>
                            <div className="pt-3 border-t-2 border-dashed border-stone-200">
                                <span className={`text-xs font-black uppercase tracking-wider ${v.color === 'bg-pop-accent' ? 'text-pop-dark' : 'text-pop-primary'}`}>{v.niche}</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}
