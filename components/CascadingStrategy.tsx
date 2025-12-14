/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Target, Flag, Layers, Zap, BookOpen, Heart, HardHat, Shield, Coins, Users, Leaf, Globe, CheckCircle, Factory, ArrowRight } from 'lucide-react';

// Data derived from "Matriks Cascading Kinerja Strategis" in the Masterplan PDF
const CASCADING_DATA = [
  {
    id: 1,
    name: "Klaster 1: Ekonomi & Agribisnis",
    mission: "Meningkatkan Perekonomian Berbasis Agribisnis",
    goal: "Mengatasi Economic Structure Trap",
    desc: "Transformasi dari pertanian ekstraktif menuju hilirisasi dan nilai tambah.",
    color: "bg-pop-primary",
    icon: Factory,
    villages: [
      { 
        name: "Braja Gemilang", 
        program: "BUMDESMA PANGAN", 
        strategy: "Daya Pergerakan", 
        activity: "Pembangunan Unit Pengolahan Mocaf & Kemitraan", 
        iku: "Tonase Singkong, Pendapatan Petani" 
      },
      { 
        name: "Raman Fajar", 
        program: "PRO-AKTIF & KRENOVA", 
        strategy: "Daya Kesejahteraan", 
        activity: "Fasilitasi Sertifikasi Halal/PIRT & Alat Pengering", 
        iku: "Jumlah IKM Legal, Stabilitas Produksi" 
      },
      { 
        name: "Giri Mulyo", 
        program: "BUMDESMA PANGAN", 
        strategy: "Daya Pengetahuan", 
        activity: "Smart Farming (Irigasi Tetes) & Packing House", 
        iku: "Sertifikasi GAP, Volume Ekspor" 
      },
      { 
        name: "Sukadana Baru", 
        program: "BUMDESMA PANGAN", 
        strategy: "Daya Kesejahteraan", 
        activity: "Revitalisasi Kebun Lada & Sertifikasi Indikasi Geografis", 
        iku: "Produktivitas Lada, Stabilitas Harga" 
      },
      { 
        name: "Margototo", 
        program: "GARDAPURA", 
        strategy: "Daya Pengorbanan", 
        activity: "Instalasi Biogas Komunal & Pupuk Organik", 
        iku: "Pengguna Gas Metan, Volume Pupuk" 
      },
      { 
        name: "Tulus Rejo", 
        program: "LAMTIM CERDAS", 
        strategy: "Daya Pengetahuan", 
        activity: "Sertifikasi Penangkar Bibit & Digital Katalog", 
        iku: "Penangkar Bersertifikat, Transaksi Online" 
      }
    ]
  },
  {
    id: 2,
    name: "Klaster 2: Pariwisata & Lingkungan",
    mission: "Mengembangkan Wisata & Nilai Budaya",
    goal: "Mengatasi Fiscal Trap (PADes Baru)",
    desc: "Menciptakan sumber ekonomi baru melalui pariwisata berbasis komunitas dan ekologi.",
    color: "bg-pop-secondary",
    icon: Leaf,
    villages: [
      { 
        name: "Pugung Raharjo", 
        program: "KRENOVA DESA", 
        strategy: "Daya Kebudayaan", 
        activity: "Storytelling Sejarah & Pelatihan Pemandu", 
        iku: "Length of Stay Wisatawan, Pendapatan Homestay" 
      },
      { 
        name: "Banjar Rejo", 
        program: "KRENOVA DESA", 
        strategy: "Daya Kebudayaan", 
        activity: "Revitalisasi Sanggar Gemati & Paket Wisata Edukasi", 
        iku: "Pertunjukan Berbayar, Regenerasi Seni" 
      },
      { 
        name: "Labuhan Ratu IX", 
        program: "GARDAPURA", 
        strategy: "Daya Pengorbanan", 
        activity: "Paket Ecotourism Penyangga TNWK & Mitigasi Gajah", 
        iku: "Penurunan Konflik, Pendapatan Jasa Lingkungan" 
      },
      { 
        name: "Sri Menanti", 
        program: "GARDAPURA", 
        strategy: "Daya Pergerakan", 
        activity: "Gerakan 'Tiket Sampah' & Restorasi Sungai", 
        iku: "Volume Sampah Terkelola, Baku Mutu Air" 
      }
    ]
  },
  {
    id: 3,
    name: "Klaster 3: SDM & Tata Kelola",
    mission: "Meningkatkan Kualitas SDM & Tata Kelola",
    goal: "Mengatasi Human Capital & Service Trap",
    desc: "Fondasi pembangunan melalui pendidikan vokasi dan digitalisasi pelayanan.",
    color: "bg-pop-accent text-pop-dark",
    icon: Users,
    villages: [
      { 
        name: "Bumi Mulyo", 
        program: "LAMTIM CERDAS", 
        strategy: "Daya Pengetahuan", 
        activity: "Transformasi Perpusdes ke Community Learning Center", 
        iku: "Warga Terlatih, Tingkat Kunjungan" 
      },
      { 
        name: "Raman Endra", 
        program: "DESA CAKAP", 
        strategy: "Daya Pengetahuan", 
        activity: "Siskeudes Online & Dashboard Data Real-time", 
        iku: "Transparansi APBDes, Kecepatan Layanan" 
      }
    ]
  }
];

export const CascadingStrategy = () => {
  const [selectedCluster, setSelectedCluster] = useState(CASCADING_DATA[0]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 min-h-[600px]">
      {/* Left Sidebar: Clusters */}
      <div className="w-full lg:w-1/3 flex flex-col gap-4">
        {CASCADING_DATA.map((cluster) => (
          <motion.button
            key={cluster.id}
            onClick={() => setSelectedCluster(cluster)}
            className={`relative p-0 text-left transition-all duration-300 group`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={`absolute inset-0 rounded-xl bg-pop-dark translate-x-1 translate-y-1 transition-transform ${selectedCluster.id === cluster.id ? 'translate-x-2 translate-y-2' : ''}`}></div>
            <div className={`relative p-5 rounded-xl border-2 border-pop-dark flex items-center gap-4 ${
              selectedCluster.id === cluster.id 
                ? `${cluster.color} ${cluster.color.includes('text-pop-dark') ? 'text-pop-dark' : 'text-white'}` 
                : 'bg-white text-pop-dark hover:bg-stone-50'
            }`}>
                 <div className={`p-2 rounded-lg border-2 border-pop-dark ${selectedCluster.id === cluster.id ? 'bg-white text-pop-dark' : cluster.color + (cluster.color.includes('text-pop-dark') ? ' border-pop-dark' : ' text-white')}`}>
                    <cluster.icon size={24} strokeWidth={2.5} />
                 </div>
                 <div className="flex-1">
                    <div className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-80">Klaster {cluster.id}</div>
                    <div className="font-display text-lg leading-tight">{cluster.name.split(':')[1]}</div>
                 </div>
                 {selectedCluster.id === cluster.id && <ChevronRight size={24} strokeWidth={3} />}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Right Content: Cluster Details */}
      <div className="w-full lg:w-2/3 relative">
         <div className="absolute inset-0 bg-pop-dark rounded-3xl transform translate-x-2 translate-y-2"></div>
         <div className="relative bg-white rounded-3xl border-2 border-pop-dark p-8 h-full flex flex-col overflow-hidden">
             
             {/* Header */}
             <div className={`absolute top-0 left-0 w-full h-3 ${selectedCluster.color} border-b-2 border-pop-dark`}></div>
             
             <AnimatePresence mode='wait'>
                <motion.div
                    key={selectedCluster.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="h-full flex flex-col"
                >
                    <div className="mb-6 pt-4">
                        <div className="flex items-center gap-3 mb-2">
                           <span className={`inline-block px-3 py-1 rounded-md text-xs font-black tracking-widest uppercase border-2 border-pop-dark shadow-pop-sm ${selectedCluster.color} ${selectedCluster.color.includes('text-pop-dark') ? 'text-pop-dark' : 'text-white'}`}>
                              {selectedCluster.mission}
                           </span>
                        </div>
                        <h2 className="text-2xl lg:text-3xl font-display text-pop-dark mb-2">{selectedCluster.goal}</h2>
                        <p className="text-stone-600 font-medium">{selectedCluster.desc}</p>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                        {selectedCluster.villages.map((village, idx) => (
                            <div key={idx} className="bg-pop-light p-4 rounded-xl border-2 border-pop-dark shadow-pop-sm hover:shadow-pop transition-shadow">
                                <div className="flex justify-between items-start mb-3 border-b-2 border-dashed border-stone-300 pb-2">
                                    <h3 className="font-display text-xl text-pop-dark">{village.name}</h3>
                                    <div className="px-2 py-1 bg-white border border-pop-dark rounded text-[10px] font-black uppercase tracking-wider text-pop-dark">
                                        {village.program}
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <Zap size={14} className="text-pop-primary" />
                                            <span className="text-xs font-bold text-stone-500 uppercase">Strategi & Kegiatan</span>
                                        </div>
                                        <p className="text-sm font-bold text-pop-dark">{village.strategy}</p>
                                        <p className="text-sm text-stone-700 leading-snug">{village.activity}</p>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <Target size={14} className="text-pop-secondary" />
                                            <span className="text-xs font-bold text-stone-500 uppercase">Indikator Kinerja (IKU)</span>
                                        </div>
                                        <p className="text-sm font-medium text-pop-dark bg-white/50 p-2 rounded border border-stone-200">
                                            {village.iku}
                                        </p>
                                    </div>
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