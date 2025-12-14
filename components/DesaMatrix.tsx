/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, Filter, ChevronDown, ChevronUp, ChevronRight, 
  Download, FileSpreadsheet, Eye, BarChart2, ArrowUpDown, Database, Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- TYPES ---
interface VillageData {
  id: string;
  kode_desa: string;
  nama: string;
  kecamatan: string;
  status: 'MANDIRI' | 'MAJU' | 'BERKEMBANG' | 'TERTINGGAL';
  skor_total: number;
  dimensions: {
    DLD: number; // Layanan Dasar
    DS: number;  // Sosial
    DE: number;  // Ekonomi
    DL: number;  // Lingkungan
    DA: number;  // Aksesibilitas
    DTKPD: number; // Tata Kelola
  };
  indicators: Record<string, number>; // I.01 to I.48
}

type SortKey = 'nama' | 'kecamatan' | 'status' | 'skor_total' | 'DLD' | 'DE' | 'DTKPD';

// --- CONSTANTS ---
const INDICATOR_NAMES: Record<string, string> = {
  "I.01": "Akses Kesehatan Dasar", "I.02": "Dokter/Nakes Desa", "I.03": "Jaminan Kesehatan Warga",
  "I.05": "Akses Pendidikan Non-Formal", "I.06": "Ketersediaan TBM/Perpus", "I.10": "Aktivitas Posyandu", 
  "I.13": "Akses Sanitasi Layak", "I.15": "Gotong Royong", "I.16": "Ruang Publik Terbuka", 
  "I.17": "Kearifan Lokal/Budaya", "I.23": "Keberagaman Produksi", "I.25": "Akses Toko/Warung Digital", 
  "I.26": "Kinerja BUMDes", "I.29": "Akses Logistik/Jalan", "I.30": "Akses Pasar Ekspor", 
  "I.31": "Pencemaran Lingkungan", "I.32": "Pengelolaan Sampah", "I.38": "Waktu Tempuh Prasarana", 
  "I.40": "Kualitas Musdes", "I.41": "Dokumen Perencanaan", "I.42": "Transparansi Keuangan", 
  "I.47": "Inovasi/PADes"
};

const DIMENSION_MAPPING: Record<string, string[]> = {
  "Layanan Dasar (DLD)": ["I.01", "I.02", "I.03", "I.05", "I.06", "I.10", "I.13"],
  "Sosial (DS)": ["I.15", "I.16", "I.17"],
  "Ekonomi (DE)": ["I.23", "I.25", "I.26", "I.29", "I.30"],
  "Lingkungan (DL)": ["I.31", "I.32"],
  "Aksesibilitas (DA)": ["I.38"],
  "Tata Kelola (DTKPD)": ["I.40", "I.41", "I.42", "I.47"]
};

// --- MOCK DATA GENERATOR ---
const generateData = (): VillageData[] => {
  const kecamatans = [
    'Sukadana', 'Labuhan Ratu', 'Batanghari', 'Sekampung', 'Pekalongan', 
    'Way Jepara', 'Purbolinggo', 'Raman Utara', 'Metro Kibang', 'Marga Tiga',
    'Mataram Baru', 'Bandar Sribhawono', 'Melinting', 'Gunung Pelindung', 
    'Jabung', 'Waway Karya', 'Batanghari Nuban', 'Bumi Agung'
  ];
  
  const villagePrefixes = ['Sumber', 'Marg', 'Tulus', 'Bumi', 'Sido', 'Braja', 'Raman', 'Giri', 'Banjar', 'Sri'];
  const villageSuffixes = ['Rejo', 'Agung', 'Mulyo', 'Sari', 'Makmur', 'Jaya', 'Baru', 'Indah', 'Asri', 'Bhakti'];

  const data: VillageData[] = [];

  const pilots = [
    { n: "Braja Gemilang", k: "Braja Slebah", s: "MAJU", sc: 70.08 },
    { n: "Banjar Rejo", k: "Batanghari", s: "MAJU", sc: 77.95 },
    { n: "Tulus Rejo", k: "Pekalongan", s: "MANDIRI", sc: 86.77 },
    { n: "Margototo", k: "Metro Kibang", s: "MAJU", sc: 74.65 },
    { n: "Labuhan Ratu IX", k: "Labuhan Ratu", s: "MANDIRI", sc: 84.09 },
    { n: "Raman Endra", k: "Raman Utara", s: "MANDIRI", sc: 83.62 },
    { n: "Pugung Raharjo", k: "Sekampung Udik", s: "MANDIRI", sc: 82.36 },
    { n: "Giri Mulyo", k: "Marga Sekampung", s: "MAJU", sc: 73.23 },
    { n: "Sukadana Baru", k: "Marga Tiga", s: "MAJU", sc: 70.87 },
    { n: "Sri Menanti", k: "Bandar Sribhawono", s: "MANDIRI", sc: 85.51 },
    { n: "Raman Fajar", k: "Raman Utara", s: "MANDIRI", sc: 83.78 },
    { n: "Bumi Mulyo", k: "Sekampung Udik", s: "MAJU", sc: 76.22 },
  ];

  let idCounter = 1;

  pilots.forEach(p => {
    data.push(createVillage(idCounter++, p.n, p.k, p.s as any, p.sc));
  });

  for (let i = 13; i <= 264; i++) {
    const k = kecamatans[Math.floor(Math.random() * kecamatans.length)];
    const n = `${villagePrefixes[Math.floor(Math.random() * villagePrefixes.length)]} ${villageSuffixes[Math.floor(Math.random() * villageSuffixes.length)]} ${Math.floor(Math.random() * 10) > 8 ? 'II' : ''}`;
    
    const rand = Math.random();
    let status: any = 'BERKEMBANG';
    let baseScore = 55;
    
    if (rand > 0.85) { status = 'MANDIRI'; baseScore = 82; }
    else if (rand > 0.55) { status = 'MAJU'; baseScore = 71; }
    else if (rand > 0.15) { status = 'BERKEMBANG'; baseScore = 55; }
    else { status = 'TERTINGGAL'; baseScore = 45; }

    const score = baseScore + (Math.random() * 10 - 5);
    data.push(createVillage(idCounter++, n.trim(), k, status, score));
  }

  return data;
};

const createVillage = (id: number, name: string, kec: string, status: any, totalScore: number): VillageData => {
  const baseDim = totalScore / 6; 
  const dimScore = () => Math.min(100, Math.max(20, baseDim + (Math.random() * 20 - 10)));
  
  const indicators: Record<string, number> = {};
  for(let i=1; i<=48; i++) {
    const key = `I.${i.toString().padStart(2, '0')}`;
    let val = 3;
    if (status === 'MANDIRI') val = Math.floor(Math.random() * 2) + 4;
    else if (status === 'TERTINGGAL') val = Math.floor(Math.random() * 3) + 1;
    else val = Math.floor(Math.random() * 5) + 1;
    indicators[key] = val;
  }

  return {
    id: id.toString(),
    kode_desa: `1807${id.toString().padStart(6, '0')}`,
    nama: name,
    kecamatan: kec,
    status: status,
    skor_total: parseFloat(totalScore.toFixed(2)),
    dimensions: {
      DLD: parseFloat(dimScore().toFixed(2)),
      DS: parseFloat(dimScore().toFixed(2)),
      DE: parseFloat(dimScore().toFixed(2)),
      DL: parseFloat(dimScore().toFixed(2)),
      DA: parseFloat(dimScore().toFixed(2)),
      DTKPD: parseFloat(dimScore().toFixed(2)),
    },
    indicators
  };
};

// --- SUB-COMPONENT: ROW DETAIL ---
const VillageDetail: React.FC<{ village: VillageData }> = ({ village }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-stone-50 border-t-2 border-pop-dark p-6 overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Dimensions Chart */}
        <div>
          <h4 className="font-display text-xl text-pop-dark mb-4 flex items-center gap-2">
            <BarChart2 size={24} className="text-pop-secondary" /> Skor Dimensi
          </h4>
          <div className="space-y-4 bg-white p-5 rounded-xl border-2 border-pop-dark shadow-pop-sm">
            {(Object.entries(village.dimensions) as [string, number][]).map(([key, val], idx) => (
              <div key={key} className="flex items-center gap-3">
                <span className="w-16 font-mono text-xs font-black text-pop-dark">{key}</span>
                <div className="flex-1 h-4 bg-stone-100 rounded-full overflow-hidden border-2 border-pop-dark">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${val}%` }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 * idx }}
                    className={`h-full ${val > 80 ? 'bg-pop-primary' : val > 60 ? 'bg-pop-accent' : 'bg-pop-muted'}`} 
                  ></motion.div>
                </div>
                <span className="w-10 text-right text-sm font-bold text-pop-dark">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Indicators Drilldown */}
        <div>
          <h4 className="font-display text-xl text-pop-dark mb-4 flex items-center gap-2">
            <Eye size={24} className="text-pop-primary" /> Detail Indikator
          </h4>
          <div className="space-y-4 h-[300px] overflow-y-auto pr-2 scrollbar-hide">
            {Object.entries(DIMENSION_MAPPING).map(([dimName, indicatorKeys], dimIdx) => (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + (dimIdx * 0.1) }}
                  key={dimName} 
                  className="bg-white p-4 rounded-xl border-2 border-pop-dark shadow-sm"
                >
                    <h5 className="text-xs font-black uppercase tracking-wider text-pop-dark mb-3 border-b-2 border-dashed border-stone-200 pb-2">{dimName}</h5>
                    <div className="grid grid-cols-6 gap-2">
                        {indicatorKeys.map(key => {
                            const val = village.indicators[key] || 0;
                            const bg = val === 5 ? 'bg-pop-primary text-pop-dark border-pop-dark' : 
                                      val === 4 ? 'bg-pop-secondary/20 text-pop-dark border-pop-secondary' :
                                      val === 3 ? 'bg-pop-accent/20 text-pop-dark border-pop-accent' :
                                      'bg-stone-100 text-stone-600 border-stone-300';
                            
                            const tooltip = INDICATOR_NAMES[key] || `Indikator ${key}`;

                            return (
                                <div key={key} title={`${key}: ${tooltip} (Nilai: ${val})`} className={`
                                  ${bg} border-2 rounded-lg flex flex-col items-center justify-center p-1.5 cursor-help transition-all hover:scale-110 hover:shadow-md transform hover:-translate-y-1
                                `}>
                                  <span className="text-[8px] font-bold opacity-70 mb-0.5">{key}</span>
                                  <span className="text-sm font-black leading-none">{val}</span>
                                </div>
                            )
                        })}
                    </div>
                </motion.div>
            ))}
          </div>
          <div className="mt-2 text-center">
             <span className="text-[10px] text-stone-400 italic font-bold">Scroll untuk melihat dimensi lainnya</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- MAIN COMPONENT ---
export const DesaMatrix: React.FC = () => {
  const [data, setData] = useState<VillageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [page, setPage] = useState(1);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: SortKey, direction: 'asc' | 'desc' } | null>(null);
  
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setData(generateData());
      setLoading(false);
    }, 800);
  }, []);

  const handleSort = (key: SortKey) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const processedData = useMemo(() => {
    let result = data.filter(item => {
      const matchesSearch = item.nama.toLowerCase().includes(search.toLowerCase()) || 
                            item.kecamatan.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = filterStatus === 'ALL' || item.status === filterStatus;
      return matchesSearch && matchesStatus;
    });

    if (sortConfig) {
      result.sort((a, b) => {
        let aVal: string | number = '';
        let bVal: string | number = '';

        if (sortConfig.key === 'DLD' || sortConfig.key === 'DE' || sortConfig.key === 'DTKPD') {
             // these are dimension keys
             const dimKey = sortConfig.key as keyof typeof a.dimensions;
             aVal = a.dimensions[dimKey];
             bVal = b.dimensions[dimKey];
        } else {
             // these are top-level keys
             // We can safely cast because we handled the dimension keys above
             const k = sortConfig.key as keyof Pick<VillageData, 'nama' | 'kecamatan' | 'status' | 'skor_total'>;
             aVal = a[k];
             bVal = b[k];
        }

        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [data, search, filterStatus, sortConfig]);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return processedData.slice(start, start + ITEMS_PER_PAGE);
  }, [processedData, page]);

  const totalPages = Math.ceil(processedData.length / ITEMS_PER_PAGE);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'MANDIRI': return 'bg-[#00E676] text-pop-dark border-pop-dark'; // Primary
      case 'MAJU': return 'bg-[#00BFA5] text-pop-dark border-pop-dark';    // Secondary
      case 'BERKEMBANG': return 'bg-[#C6FF00] text-pop-dark border-pop-dark'; // Accent
      case 'TERTINGGAL': return 'bg-[#A5D6A7] text-pop-dark border-pop-dark'; // Muted
      default: return 'bg-stone-500 text-white';
    }
  };

  const SortIcon = ({ colKey }: { colKey: SortKey }) => (
    <span className={`inline-block ml-1 transition-transform duration-300 ${sortConfig?.key === colKey ? 'text-pop-primary scale-110' : 'text-stone-300'}`}>
        {sortConfig?.key === colKey ? (sortConfig.direction === 'asc' ? <ChevronUp size={12}/> : <ChevronDown size={12}/>) : <ArrowUpDown size={12}/>}
    </span>
  );

  if (loading) return (
    <div className="w-full h-64 flex items-center justify-center bg-white rounded-xl border-2 border-pop-dark shadow-pop">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-10 h-10 text-pop-primary animate-spin" />
        <span className="text-sm font-black uppercase tracking-widest text-pop-dark animate-pulse">Memuat Matriks Data...</span>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-pop border-2 border-pop-dark overflow-hidden">
      {/* Header Toolbar */}
      <div className="p-6 border-b-2 border-pop-dark bg-stone-50 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h3 className="font-display text-2xl text-pop-dark flex items-center gap-2">
            <FileSpreadsheet className="text-pop-secondary" />
            Database Indeks Desa
          </h3>
          <div className="flex items-center gap-2 mt-1">
             <span className="w-2 h-2 rounded-full bg-pop-primary animate-pulse border border-pop-dark"></span>
             <p className="text-xs text-stone-500 font-bold">Live Connection: <strong>264 Records</strong></p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4 transition-colors group-focus-within:text-pop-primary" />
            <input 
              type="text" 
              placeholder="Cari Desa / Kecamatan..." 
              className="pl-9 pr-4 py-2 text-sm border-2 border-stone-300 rounded-lg focus:outline-none focus:ring-0 focus:border-pop-primary w-full md:w-64 transition-all shadow-sm font-medium placeholder:font-normal"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="relative">
             <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4" />
             <select 
               className="pl-9 pr-8 py-2 text-sm border-2 border-stone-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-0 focus:border-pop-secondary cursor-pointer shadow-sm font-bold text-stone-600 transition-colors"
               value={filterStatus}
               onChange={(e) => setFilterStatus(e.target.value)}
             >
               <option value="ALL">Semua Status</option>
               <option value="MANDIRI">Mandiri</option>
               <option value="MAJU">Maju</option>
               <option value="BERKEMBANG">Berkembang</option>
               <option value="TERTINGGAL">Tertinggal</option>
             </select>
          </div>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-pop-primary text-pop-dark border-2 border-pop-dark text-sm font-bold rounded-lg shadow-pop-sm hover:shadow-pop transition-all"
          >
             <Download size={16} /> Export
          </motion.button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-pop-light border-b-2 border-pop-dark text-xs font-black text-pop-dark uppercase tracking-wider">
              <th className="p-4 w-12">#</th>
              <th className="p-4 cursor-pointer hover:bg-white hover:text-pop-secondary transition-colors group" onClick={() => handleSort('nama')}>
                  Desa <SortIcon colKey="nama"/>
              </th>
              <th className="p-4 cursor-pointer hover:bg-white hover:text-pop-secondary transition-colors group" onClick={() => handleSort('kecamatan')}>
                  Kecamatan <SortIcon colKey="kecamatan"/>
              </th>
              <th className="p-4 text-center cursor-pointer hover:bg-white hover:text-pop-secondary transition-colors group" onClick={() => handleSort('status')}>
                  Status ID6 <SortIcon colKey="status"/>
              </th>
              <th className="p-4 text-center cursor-pointer hover:bg-white hover:text-pop-secondary transition-colors group" onClick={() => handleSort('skor_total')}>
                  Total Skor <SortIcon colKey="skor_total"/>
              </th>
              <th className="p-4 text-center hidden md:table-cell cursor-pointer hover:bg-white hover:text-pop-secondary transition-colors group" onClick={() => handleSort('DLD')}>
                  Layanan (DLD) <SortIcon colKey="DLD"/>
              </th>
              <th className="p-4 text-center hidden md:table-cell cursor-pointer hover:bg-white hover:text-pop-secondary transition-colors group" onClick={() => handleSort('DE')}>
                  Ekonomi (DE) <SortIcon colKey="DE"/>
              </th>
              <th className="p-4 text-center hidden md:table-cell cursor-pointer hover:bg-white hover:text-pop-secondary transition-colors group" onClick={() => handleSort('DTKPD')}>
                  Tata Kelola <SortIcon colKey="DTKPD"/>
              </th>
              <th className="p-4 w-12"></th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-stone-100">
            {paginatedData.map((village, idx) => (
              <React.Fragment key={village.id}>
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`hover:bg-stone-50 transition-colors cursor-pointer border-b border-stone-100 ${expandedId === village.id ? 'bg-stone-50' : ''}`}
                  onClick={() => setExpandedId(expandedId === village.id ? null : village.id)}
                >
                  <td className="p-4 text-stone-400 font-mono text-xs font-bold">{(page-1)*ITEMS_PER_PAGE + idx + 1}</td>
                  <td className="p-4 font-bold text-stone-900">{village.nama}</td>
                  <td className="p-4 text-stone-600 font-medium">{village.kecamatan}</td>
                  <td className="p-4 text-center">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-black tracking-wide border-2 shadow-sm ${getStatusColor(village.status)}`}>
                      {village.status}
                    </span>
                  </td>
                  <td className="p-4 text-center font-mono font-black text-pop-dark text-base">{village.skor_total.toFixed(2)}</td>
                  
                  {/* Visual Heatmap Bars for Dimensions */}
                  <td className="p-4 hidden md:table-cell">
                     <div className="flex flex-col gap-1 items-center">
                        <span className="text-[10px] font-mono font-bold">{village.dimensions.DLD}</span>
                        <div className="w-20 h-2 bg-stone-200 rounded-full overflow-hidden border border-stone-300">
                           <div className={`h-full ${village.dimensions.DLD > 70 ? 'bg-pop-primary' : 'bg-pop-accent'}`} style={{ width: `${village.dimensions.DLD}%` }}></div>
                        </div>
                     </div>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                     <div className="flex flex-col gap-1 items-center">
                        <span className="text-[10px] font-mono font-bold">{village.dimensions.DE}</span>
                        <div className="w-20 h-2 bg-stone-200 rounded-full overflow-hidden border border-stone-300">
                           <div className={`h-full ${village.dimensions.DE > 70 ? 'bg-pop-secondary' : 'bg-pop-accent'}`} style={{ width: `${village.dimensions.DE}%` }}></div>
                        </div>
                     </div>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                     <div className="flex flex-col gap-1 items-center">
                        <span className="text-[10px] font-mono font-bold">{village.dimensions.DTKPD}</span>
                        <div className="w-20 h-2 bg-stone-200 rounded-full overflow-hidden border border-stone-300">
                           <div className={`h-full ${village.dimensions.DTKPD > 70 ? 'bg-pop-primary' : 'bg-pop-muted'}`} style={{ width: `${village.dimensions.DTKPD}%` }}></div>
                        </div>
                     </div>
                  </td>
                  
                  <td className="p-4 text-stone-400">
                    <div className={`transition-transform duration-200 ${expandedId === village.id ? 'rotate-180' : ''}`}>
                         <ChevronDown size={20} />
                    </div>
                  </td>
                </motion.tr>
                
                {/* Expandable Row */}
                <tr>
                  <td colSpan={9} className="p-0 border-none">
                    <AnimatePresence>
                      {expandedId === village.id && <VillageDetail village={village} />}
                    </AnimatePresence>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t-2 border-pop-dark bg-stone-50 flex justify-between items-center">
        <span className="text-xs font-bold text-stone-500">
          Page {page} of {totalPages}
        </span>
        <div className="flex gap-2">
           <button 
             onClick={() => setPage(p => Math.max(1, p-1))}
             disabled={page === 1}
             className="px-4 py-1.5 bg-white border-2 border-stone-300 rounded-lg text-xs font-bold hover:bg-stone-100 hover:border-pop-dark disabled:opacity-50 transition-all shadow-sm"
           >
             Prev
           </button>
           <button 
             onClick={() => setPage(p => Math.min(totalPages, p+1))}
             disabled={page === totalPages}
             className="px-4 py-1.5 bg-white border-2 border-stone-300 rounded-lg text-xs font-bold hover:bg-stone-100 hover:border-pop-dark disabled:opacity-50 transition-all shadow-sm"
           >
             Next
           </button>
        </div>
      </div>
    </div>
  );
};