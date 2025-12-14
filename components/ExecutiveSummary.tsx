/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ChevronDown, ChevronUp, BookOpen, Target, TrendingUp, ShieldCheck } from 'lucide-react';

export const ExecutiveSummary: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-5xl mx-auto my-12 px-6 lg:px-0">
        <div className="bg-white rounded-3xl border-4 border-pop-dark shadow-pop overflow-hidden">
            {/* Header / Toggle */}
            <div 
                className="p-8 bg-stone-50 flex flex-col md:flex-row justify-between items-center cursor-pointer hover:bg-stone-100 transition-colors gap-6"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-start md:items-center gap-6">
                    <div className="p-4 bg-pop-primary text-pop-dark border-2 border-pop-dark rounded-2xl shadow-sm shrink-0">
                        <FileText size={32} strokeWidth={2} />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 rounded-md bg-pop-accent text-pop-dark text-[10px] font-black uppercase tracking-widest border border-pop-dark">Dokumen Induk</span>
                            <span className="text-xs font-bold text-stone-400">Update 2024</span>
                        </div>
                        <h3 className="font-display text-2xl md:text-3xl text-pop-dark leading-tight">Laporan Riset Mendalam</h3>
                        <p className="text-stone-600 font-medium mt-1 text-sm md:text-base">
                            Matriks Kinerja Strategis Terintegrasi Masterplan Desa Makmur 2025–2029
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-stone-400 hidden md:block">
                        {isOpen ? 'Tutup Laporan' : 'Baca Selengkapnya'}
                    </span>
                    <div className={`p-3 bg-white border-2 border-pop-dark rounded-xl transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                        <ChevronDown size={20} />
                    </div>
                </div>
            </div>

            {/* Content Body */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="border-t-4 border-pop-dark bg-white"
                    >
                        <div className="p-8 md:p-12 prose prose-stone max-w-none prose-headings:font-display prose-headings:text-pop-dark prose-a:text-pop-primary prose-strong:text-pop-dark">
                            
                            {/* BAB I */}
                            <div className="mb-12 border-b-2 border-dashed border-stone-200 pb-8">
                                <h2 className="flex items-center gap-3 text-3xl">
                                    <BookOpen className="text-pop-secondary" /> Bab I: Pendahuluan dan Konteks Strategis
                                </h2>
                                
                                <h3>1.1 Urgensi Penyelarasan Perencanaan Pembangunan</h3>
                                <p>
                                    Dokumen ini menyajikan analisis komprehensif dan matriks kinerja terperinci yang dirancang sebagai mesin operasional bagi <strong>Masterplan Desa Makmur Kabupaten Lampung Timur Periode 2025–2029</strong>. Laporan ini disusun sebagai respons terhadap kebutuhan mendesak untuk mengatasi fenomena <em>"Kesenjangan Ganda" (Dual-Gap)</em> yang telah lama menghambat efektivitas pembangunan daerah: kesenjangan perencanaan antara dokumen makro RPJMD dengan realitas mikro di tingkat desa, dan kesenjangan implementasi antara belanja modal Organisasi Perangkat Daerah (OPD) dengan belanja pembangunan pemerintah desa.
                                </p>
                                <p>
                                    Analisis teknokratis terhadap kondisi dasar (baseline) tahun 2024 menunjukkan adanya paradoks pembangunan yang tajam di Kabupaten Lampung Timur. Meskipun memiliki kekayaan sumber daya alam yang melimpah dan bonus demografi yang signifikan, indikator kesejahteraan utama menunjukkan stagnasi struktural. Tingkat kemiskinan tercatat sebesar <strong>13,19% (142,69 ribu jiwa)</strong>, menempatkan kabupaten ini pada peringkat kedua tertinggi di Provinsi Lampung. Lebih mengkhawatirkan lagi, Indeks Pembangunan Manusia (IPM) meskipun berstatus "Tinggi" pada angka 73,05, masih menyisakan defisit kualitas sumber daya manusia yang serius, tercermin dari Rata-rata Lama Sekolah (RLS) yang hanya mencapai <strong>8,20 tahun</strong>—setara dengan putus sekolah di kelas 2 SMP.
                                </p>
                                <p>
                                    Ketimpangan ini bukan semata-mata akibat kurangnya sumber daya fiskal, melainkan kegagalan koordinasi sistemik. Perencanaan sektoral yang dilakukan oleh OPD seringkali berhenti pada output administratif tanpa menyentuh outcome kewilayahan yang spesifik. Di sisi lain, Dana Desa yang dikelola oleh 264 desa seringkali terfragmentasi dalam proyek-proyek skala kecil yang tidak memiliki daya ungkit strategis terhadap prioritas kabupaten. Oleh karena itu, Masterplan Desa Makmur 2025–2029 hadir dengan pendekatan radikal: mengintegrasikan Visi "Siwo Itou" (Sembilan Misi Utama) ke dalam matriks kinerja tunggal yang mengikat OPD, Pemerintah Kecamatan, dan Pemerintah Desa dalam satu orkestrasi pembangunan yang terukur.
                                </p>

                                <h3>1.2 Transformasi Paradigma: Dari IDM ke Indeks Desa 6 Dimensi (ID6)</h3>
                                <p>
                                    Fondasi metodologis dari matriks kinerja ini adalah pergeseran instrumen pengukuran dari Indeks Desa Membangun (IDM) menuju <strong>Indeks Desa 6 Dimensi (ID6)</strong>. Perubahan ini bukan sekadar pergantian nomenklatur, melainkan transformasi fundamental dalam cara pemerintah daerah memandang, mengukur, dan mengintervensi kemajuan desa.
                                </p>
                                <p>
                                    IDM, yang digunakan pada periode sebelumnya, cenderung berfokus pada potensi dan ketersediaan infrastruktur statis. Sebaliknya, ID6 yang diadopsi dalam Masterplan ini dirancang untuk menangkap dinamika kualitas hidup dan kinerja layanan secara real-time dan berbasis bukti (evidence-based). Keenam dimensi tersebut—Layanan Dasar (DLD), Sosial (DS), Ekonomi (DE), Lingkungan (DL), Aksesibilitas (DA), dan Tata Kelola Pemerintahan Desa (DTKPD)—menjadi kerangka kerja logis (Logical Framework) bagi penyusunan program dan kegiatan dalam matriks ini.
                                </p>
                                <div className="bg-stone-50 p-4 border-l-4 border-pop-primary rounded-r-lg my-4">
                                    <p className="m-0 italic text-sm">
                                        Pentingnya pergeseran ini terlihat jelas dalam arsitektur database "Lamtim Makmur Digital". Misalnya, dalam Dimensi Layanan Dasar (DLD), keberhasilan tidak lagi diukur hanya dari "berdirinya bangunan Posyandu", melainkan dihitung secara algoritmik dari data transaksi layanan kesehatan ibu dan anak yang terintegrasi, yang secara langsung berkorelasi dengan penurunan angka stunting.
                                    </p>
                                </div>

                                <h3>1.3 Struktur Laporan dan Metodologi Matriks</h3>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li><strong>Bab II</strong> akan menguraikan Arsitektur Integrasi, menjelaskan bagaimana Visi Makro RPJMD diturunkan menjadi Program Prioritas Inovatif.</li>
                                    <li><strong>Bab III</strong> merupakan inti laporan, menyajikan Matriks Kinerja Terperinci yang dibagi berdasarkan Tujuh Program Prioritas. Setiap sub-bab akan menyertakan analisis mendalam tentang "Lokus" (lokasi prioritas) berdasarkan data statistik kecamatan (BPS) untuk memastikan intervensi yang presisi.</li>
                                    <li><strong>Bab IV</strong> membahas Kerangka Pendanaan, merinci bagaimana kebutuhan indikatif Rp 5,2 Triliun akan dipenuhi melalui strategi blended finance.</li>
                                    <li><strong>Bab V</strong> menutup dengan Mekanisme Tata Kelola, menjelaskan peran Camat sebagai "Gerbang Kualitas" dan BAPPEDA sebagai "Dirigen".</li>
                                </ul>
                            </div>

                            {/* BAB II */}
                            <div className="mb-12 border-b-2 border-dashed border-stone-200 pb-8">
                                <h2 className="flex items-center gap-3 text-3xl">
                                    <Target className="text-pop-primary" /> Bab II: Arsitektur Integrasi Perencanaan
                                </h2>
                                
                                <h3>2.1 Menurunkan "Siwo Itou" ke Level Operasional</h3>
                                <p>
                                    Tantangan terbesar dalam perencanaan pembangunan daerah adalah menerjemahkan janji politik menjadi bahasa teknokratis anggaran. RPJMD Kabupaten Lampung Timur 2025–2029 menetapkan sembilan misi pembangunan yang dikenal sebagai <strong>"Siwo Itou"</strong>. Agar misi ini tidak berhenti sebagai slogan, Masterplan Desa Makmur melakukan clustering misi-misi tersebut ke dalam Tujuh Program Prioritas Inovatif.
                                </p>
                                <p>Logika penyusunan matriks ini mengikuti alur kaskade kinerja (Performance Cascading) sebagai berikut:</p>
                                <ol className="list-decimal pl-5 space-y-1 font-medium text-pop-dark">
                                    <li><strong>Visi & Misi (RPJMD):</strong> Arah politik makro (Contoh: Misi 1 - Peningkatan Kualitas SDM).</li>
                                    <li><strong>Urusan Pemerintahan (UU 23/2014):</strong> Memetakan misi ke dalam urusan wajib/pilihan (Contoh: Urusan Pendidikan & Kesehatan).</li>
                                    <li><strong>Organisasi Perangkat Daerah (OPD):</strong> Menunjuk Lead Agency yang bertanggung jawab (Contoh: Dinas Pendidikan).</li>
                                    <li><strong>Program Prioritas Masterplan:</strong> Nomenklatur program inovatif yang bersifat lintas sektoral (Contoh: "LAMTIM CERDAS & SEHAT").</li>
                                    <li><strong>Kegiatan & Sub-Kegiatan:</strong> Aksi konkret yang didanai (Contoh: Rehabilitasi Ruang Kelas, PMT Stunting).</li>
                                    <li><strong>Indikator Kinerja (IKU) & Target:</strong> Ukuran keberhasilan kuantitatif (Contoh: RLS 8,90 Tahun).</li>
                                    <li><strong>Kontribusi ID6:</strong> Dampak spesifik pada skor desa (Contoh: Peningkatan Skor DLD).</li>
                                </ol>

                                <h3>2.2 Filosofi "Pancadaya" sebagai Penggerak</h3>
                                <p>Matriks kinerja ini juga dijiwai oleh filosofi "Pancadaya", yang menempatkan aspek non-material sebagai bahan bakar pembangunan.</p>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <li className="bg-stone-50 p-3 rounded-lg border border-stone-200"><strong>Daya Pengetahuan:</strong> Mendasari program pendidikan dan literasi digital.</li>
                                    <li className="bg-stone-50 p-3 rounded-lg border border-stone-200"><strong>Daya Pengorbanan:</strong> Mendasari program gotong royong infrastruktur.</li>
                                    <li className="bg-stone-50 p-3 rounded-lg border border-stone-200"><strong>Daya Pergerakan:</strong> Mendasari penguatan kelembagaan desa.</li>
                                    <li className="bg-stone-50 p-3 rounded-lg border border-stone-200"><strong>Daya Kebudayaan:</strong> Mendasari pengembangan ekonomi kreatif dan identitas lokal.</li>
                                    <li className="bg-stone-50 p-3 rounded-lg border border-stone-200"><strong>Daya Kesejahteraan:</strong> Mendasari intervensi ekonomi dan pengentasan kemiskinan.</li>
                                </ul>
                            </div>

                            {/* BAB III */}
                            <div className="mb-12 border-b-2 border-dashed border-stone-200 pb-8">
                                <h2 className="flex items-center gap-3 text-3xl">
                                    <TrendingUp className="text-pop-accent text-pop-dark" /> Bab III: Matriks Kinerja Terperinci
                                </h2>
                                <p>Bagian ini menyajikan dekomposisi mendalam dari matriks kinerja untuk setiap program prioritas.</p>

                                {/* 3.1 GEBRAK */}
                                <div className="mt-8 bg-pop-light p-6 rounded-xl border-2 border-pop-dark">
                                    <h3 className="mt-0 text-xl font-black text-pop-dark">3.1 Program Prioritas 1: GEBRAK (Gerbang Ekonomi Desa Terbuka)</h3>
                                    <p className="text-sm">
                                        <strong>Konteks Strategis:</strong> Program GEBRAK dirancang untuk menjawab Misi 3 (Infrastruktur) dan Misi 5 (Ekonomi). Data baseline menunjukkan kondisi kemantapan jalan kabupaten baru mencapai 61,04% pada tahun 2024.
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
                                        <div className="bg-white p-3 rounded border border-pop-dark">
                                            <strong>Target Kinerja (2029):</strong>
                                            <ul className="list-disc pl-4 mt-1">
                                                <li>Jalan Mantap: 75,00%</li>
                                                <li>JUT: 100% Desa Pertanian Mantap</li>
                                                <li>Internet: 100% (0 Blank Spot)</li>
                                            </ul>
                                        </div>
                                        <div className="bg-white p-3 rounded border border-pop-dark">
                                            <strong>Pagu Indikatif (5 Tahun):</strong>
                                            <p className="text-lg font-bold text-pop-primary">Rp 1.850 Miliar</p>
                                        </div>
                                    </div>
                                    <p className="text-sm mt-4"><strong>Analisis Lokus:</strong> Fokus pada koridor logistik strategis seperti Raman Utara (sentra hortikultura), Batanghari (lumbung padi), dan Braja Selebah (penyangga TNWK).</p>
                                </div>

                                {/* 3.2 LAMTIM CERDAS */}
                                <div className="mt-6 bg-stone-50 p-6 rounded-xl border-2 border-stone-200">
                                    <h3 className="mt-0 text-xl font-black text-pop-dark">3.2 Program Prioritas 2: LAMTIM CERDAS & SEHAT</h3>
                                    <p className="text-sm">
                                        <strong>Konteks Strategis:</strong> Manifestasi Misi 1 (SDM) dan Misi 2 (Kesehatan). Tantangan utama adalah "Perangkap Modal Manusia" dengan RLS 8,20 tahun dan stunting 14,8%.
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
                                        <div className="bg-white p-3 rounded border border-stone-300">
                                            <strong>Target Kinerja (2029):</strong>
                                            <ul className="list-disc pl-4 mt-1">
                                                <li>RLS: 8,90 Tahun</li>
                                                <li>Stunting: &lt; 10,0%</li>
                                                <li>Posyandu PURI: 100%</li>
                                            </ul>
                                        </div>
                                        <div className="bg-white p-3 rounded border border-stone-300">
                                            <strong>Pagu Indikatif (5 Tahun):</strong>
                                            <p className="text-lg font-bold text-pop-secondary">Rp 1.200 Miliar</p>
                                        </div>
                                    </div>
                                </div>

                                {/* 3.3 BUMDESMA */}
                                <div className="mt-6 bg-pop-light p-6 rounded-xl border-2 border-pop-dark">
                                    <h3 className="mt-0 text-xl font-black text-pop-dark">3.3 Program Prioritas 3: BUMDESMA PANGAN</h3>
                                    <p className="text-sm">
                                        <strong>Konteks Strategis:</strong> Mendorong korporatisasi pertanian dan hilirisasi. Lampung Timur tidak boleh lagi hanya menjadi produsen bahan mentah.
                                    </p>
                                    <p className="text-sm mt-2"><strong>Target:</strong> 50 Unit BUMDesma Aktif & Peningkatan Nilai Tambah 20%.</p>
                                </div>

                                {/* 3.4 PRO-AKTIF */}
                                <div className="mt-6 bg-stone-50 p-6 rounded-xl border-2 border-stone-200">
                                    <h3 className="mt-0 text-xl font-black text-pop-dark">3.4 Program Prioritas 6: PRO-AKTIF</h3>
                                    <p className="text-sm">
                                        <strong>Konteks Strategis:</strong> Penanggulangan Kemiskinan (13,19%). Basis data terpadu untuk bantuan tepat sasaran.
                                    </p>
                                    <p className="text-sm mt-2"><strong>Target:</strong> Kemiskinan &lt; 10%, Kemiskinan Ekstrem 0%, 2.500 Unit RTLH direhab.</p>
                                </div>

                                {/* 3.5 GARDAPURA & 3.6 DESA CAKAP */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                    <div className="bg-pop-light p-4 rounded-xl border-2 border-pop-dark">
                                        <h4 className="text-lg font-bold m-0">3.5 GARDAPURA (Lingkungan)</h4>
                                        <p className="text-xs mt-2">Mitigasi bencana & pelestarian lingkungan. Fokus: 50 Desa Tangguh Bencana, 100 Bank Sampah.</p>
                                    </div>
                                    <div className="bg-stone-50 p-4 rounded-xl border-2 border-stone-200">
                                        <h4 className="text-lg font-bold m-0">3.6 DESA CAKAP (Tata Kelola)</h4>
                                        <p className="text-xs mt-2">Reformasi birokrasi desa. Target: 100% Desa Digital (Smart Village) & Skor Pemerintahan "Baik".</p>
                                    </div>
                                </div>
                            </div>

                            {/* BAB IV & V */}
                            <div className="mb-8">
                                <h2 className="flex items-center gap-3 text-3xl">
                                    <ShieldCheck className="text-pop-dark" /> Bab IV & V: Pendanaan & Tata Kelola
                                </h2>
                                
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
                                    <div>
                                        <h3>4.1 Strategi "Blending Finance"</h3>
                                        <p>Total kebutuhan Rp 5,2 Triliun dipenuhi melalui:</p>
                                        <ul className="list-disc pl-5 text-sm space-y-1">
                                            <li><strong>APBD Kabupaten (60%):</strong> Infrastruktur strategis & gaji aparatur.</li>
                                            <li><strong>Dana Desa (30%):</strong> "Dikunci" via Perbup untuk JUT, Stunting, BUMDes.</li>
                                            <li><strong>DAK (Pusat):</strong> Dimaksimalkan via data teknis valid.</li>
                                            <li><strong>Pinjaman Daerah:</strong> Opsi akselerasi GEBRAK.</li>
                                            <li><strong>CSR & Filantropi (5%):</strong> Kemitraan swasta & ZISWAF.</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3>Bab V: Tata Kelola "Tiga Lapis"</h3>
                                        <ul className="list-disc pl-5 text-sm space-y-1">
                                            <li><strong>Lapis Koordinasi (Kabupaten - BAPPEDA):</strong> Dirigen & Dashboard Terpadu.</li>
                                            <li><strong>Lapis Supervisi (Kecamatan - Camat):</strong> Quality Gate verifikasi APBDes.</li>
                                            <li><strong>Lapis Eksekusi (Desa - Kades):</strong> Ujung tombak, dinilai berdasarkan kenaikan skor ID6.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-pop-primary p-6 rounded-xl border-2 border-pop-dark text-center mt-12">
                                <h3 className="text-pop-dark m-0 mb-2">Penutup</h3>
                                <p className="text-sm text-pop-dark m-0 font-medium">
                                    Laporan ini adalah peta jalan teknokratis untuk mentransformasi Kabupaten Lampung Timur. Keberhasilan Masterplan Desa Makmur 2025–2029 akan diukur dari peningkatan kesejahteraan nyata warga desa.
                                </p>
                            </div>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    </div>
  )
}
