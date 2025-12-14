/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { HeroScene, VillageScene } from './components/QuantumScene';
import { ID6RadarDiagram, RpjmdMatrix, PilotVillagesGrid } from './components/Diagrams';
import { VillageMap } from './components/VillageMap';
import { DesaMatrix } from './components/DesaMatrix';
import { CascadingStrategy } from './components/CascadingStrategy';
import { ArrowDown, Menu, X, BarChart3, AlertTriangle, Scale, Download } from 'lucide-react';

// --- ANIMATION VARIANTS ---
const fadeInValues = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.8, 
      delay: i * 0.1, 
      ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] 
    }
  })
};

const SectionWrapper = ({ children, id, className = "" }: { children?: React.ReactNode, id: string, className?: string }) => {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

// --- COMPONENTS ---

const NavLink = ({ href, children, onClick }: { href: string, children?: React.ReactNode, onClick: (e: any) => void }) => {
  return (
    <motion.a 
      href={href} 
      onClick={onClick} 
      className="relative px-4 py-2 cursor-pointer text-sm font-black uppercase tracking-wider text-pop-dark hover:text-pop-primary transition-colors border-2 border-transparent hover:border-pop-dark hover:bg-pop-accent hover:shadow-pop transform hover:-translate-y-1 rounded-lg"
      whileHover="hover"
      initial="initial"
    >
      <span className="relative z-10">{children}</span>
    </motion.a>
  );
};

const StatCard = ({ value, label, delay, color = "bg-white" }: { value: string, label: string, delay: number, color?: string }) => {
  return (
    <motion.div 
      variants={fadeInValues}
      custom={delay}
      whileHover={{ y: -10, boxShadow: "8px 8px 0px 0px #003300" }}
      className={`flex flex-col items-center p-6 ${color} rounded-xl border-2 border-pop-dark shadow-pop transition-all duration-300`}
    >
      <h3 className="font-display text-4xl text-pop-dark mb-2">{value}</h3>
      <p className="text-xs text-pop-dark font-bold uppercase tracking-widest text-center leading-relaxed">{label}</p>
    </motion.div>
  );
};

const LeaderSection = () => (
  <SectionWrapper id="leader" className="bg-pop-accent py-24 border-b-2 border-pop-dark relative overflow-hidden bg-pop-pattern">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-3 px-4 py-2 bg-pop-primary border-2 border-pop-dark rounded-full shadow-pop-sm transform -rotate-2"
            >
                <span className="w-3 h-3 rounded-full bg-white animate-pulse border border-black"></span>
                <span className="text-xs font-black tracking-widest text-pop-dark uppercase">Leaders 2025-2029</span>
            </motion.div>
            <motion.h2 variants={fadeInValues} className="font-display text-5xl md:text-6xl text-pop-dark mb-4 drop-shadow-md">Sinergi Membangun Desa</motion.h2>
            <motion.p variants={fadeInValues} className="text-pop-dark font-medium text-lg max-w-2xl mx-auto bg-white border-2 border-pop-dark p-4 rounded-xl shadow-pop">Komitmen bersama Bupati dan Wakil Bupati untuk mewujudkan Lampung Timur Makmur melalui pembangunan desa yang terukur.</motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto">
          {/* Bupati Card */}
          <motion.div variants={fadeInValues} custom={1} className="group relative">
             <div className="flex flex-col items-center text-center">
                 {/* Image Frame */}
                 <div className="relative mb-8 perspective-1000">
                     <div className="absolute inset-0 bg-pop-primary rounded-full blur-none border-2 border-pop-dark transform translate-x-2 translate-y-2"></div>
                     <div className="relative w-72 h-96 bg-white rounded-2xl overflow-hidden shadow-pop border-2 border-pop-dark rotate-2 group-hover:rotate-0 transition-all duration-500 ease-out z-10">
                        <img 
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Ela_Siti_Nuryamah_Official.png/400px-Ela_Siti_Nuryamah_Official.png" 
                          alt="Hj. Ela Siti Nuryamah" 
                          className="w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                     </div>
                     <motion.div 
                       className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-pop-primary px-6 py-2 rounded-lg shadow-pop border-2 border-pop-dark z-20 whitespace-nowrap transform -rotate-2"
                     >
                        <div className="font-display font-bold text-pop-dark text-lg tracking-wide">BUPATI</div>
                     </motion.div>
                 </div>

                 <h3 className="font-display text-2xl md:text-3xl text-pop-dark mb-2 mt-4 bg-white border-2 border-pop-dark px-4 py-1 rounded-lg shadow-pop-sm transform -rotate-1">Hj. Ela Siti Nuryamah</h3>
                 
                 <div className="relative bg-white p-6 rounded-2xl border-2 border-pop-dark shadow-pop mt-6 mx-4 md:mx-0">
                    <span className="absolute -top-6 -left-2 text-6xl text-pop-secondary font-display">"</span>
                    <blockquote className="text-pop-dark text-base font-medium leading-relaxed italic relative z-10">
                      Masterplan Desa Makmur ini adalah komitmen kami untuk tidak sekadar membangun fisik, tetapi membangun peradaban desa. Kita pastikan setiap rupiah anggaran bermuara pada kesejahteraan warga.
                    </blockquote>
                 </div>
             </div>
          </motion.div>

          {/* Wakil Bupati Card */}
          <motion.div variants={fadeInValues} custom={2} className="group relative mt-12 md:mt-0">
             <div className="flex flex-col items-center text-center">
                 {/* Image Frame */}
                 <div className="relative mb-8 perspective-1000">
                     <div className="absolute inset-0 bg-pop-secondary rounded-full blur-none border-2 border-pop-dark transform translate-x-2 translate-y-2"></div>
                     <div className="relative w-72 h-96 bg-white rounded-2xl overflow-hidden shadow-pop border-2 border-pop-dark -rotate-2 group-hover:rotate-0 transition-all duration-500 ease-out z-10">
                        <img 
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Azwar_Hadi.jpg/500px-Azwar_Hadi.jpg" 
                          alt="H. Azwar Hadi" 
                          className="w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                     </div>
                     <motion.div 
                        className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-pop-secondary px-6 py-2 rounded-lg shadow-pop border-2 border-pop-dark z-20 whitespace-nowrap transform rotate-2"
                      >
                        <div className="font-display font-bold text-white text-lg tracking-wide">WAKIL BUPATI</div>
                     </motion.div>
                 </div>

                 <h3 className="font-display text-2xl md:text-3xl text-pop-dark mb-2 mt-4 bg-white border-2 border-pop-dark px-4 py-1 rounded-lg shadow-pop-sm transform rotate-1">H. Azwar Hadi, S.E.</h3>
                 
                 <div className="relative bg-white p-6 rounded-2xl border-2 border-pop-dark shadow-pop mt-6 mx-4 md:mx-0">
                    <span className="absolute -top-6 -left-2 text-6xl text-pop-primary font-display">"</span>
                    <blockquote className="text-pop-dark text-base font-medium leading-relaxed italic relative z-10">
                      Pengawasan dan tata kelola adalah prioritas. Kami akan memastikan seluruh perangkat daerah bekerja sinergis, transparan, dan melayani sepenuh hati demi suksesnya Desa Makmur.
                    </blockquote>
                 </div>
             </div>
          </motion.div>
          
        </div>
      </div>
  </SectionWrapper>
);

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  // Parallax for Hero text
  const yHero = useTransform(scrollY, [0, 500], [0, 200]);
  const opacityHero = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-pop-light text-pop-dark font-sans selection:bg-pop-primary selection:text-pop-dark">
      
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b-2 ${scrolled ? 'bg-white/95 backdrop-blur-md border-pop-dark py-2 shadow-pop-sm' : 'bg-transparent border-transparent py-6'}`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            {/* Logo Lampung Timur */}
            <div className="w-12 h-12 flex items-center justify-center bg-white border-2 border-pop-dark rounded-full shadow-pop-sm group-hover:scale-110 transition-transform">
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Lambang_Kabupaten_Lampung_Timur.png/250px-Lambang_Kabupaten_Lampung_Timur.png" 
                    alt="Logo Lampung Timur" 
                    className="w-8 h-8 object-contain"
                />
            </div>
            <div className="flex flex-col">
              <span className={`font-display text-xl leading-none transition-all duration-300 ${scrolled ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 md:opacity-100 md:translate-x-0 text-pop-dark'}`}>
                MDM <span className="text-pop-primary">2029</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-stone-500 font-bold group-hover:text-pop-secondary transition-colors">Lampung Timur</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <NavLink href="#traps" onClick={scrollToSection('traps')}>Diagnosis</NavLink>
            <NavLink href="#solution" onClick={scrollToSection('solution')}>Pancadaya</NavLink>
            <NavLink href="#strategy" onClick={scrollToSection('strategy')}>Strategi</NavLink>
            <NavLink href="#cascading" onClick={scrollToSection('cascading')}>Matriks</NavLink>
            <NavLink href="#database" onClick={scrollToSection('database')}>Data Center</NavLink>
            
            <motion.button 
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden px-6 py-2 bg-pop-primary text-pop-dark rounded-lg text-sm font-bold border-2 border-pop-dark shadow-pop hover:shadow-pop-hover transition-all"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Download size={18} /> PDF
              </span>
            </motion.button>
          </div>

          <button className="md:hidden text-pop-dark p-2 bg-white border-2 border-pop-dark rounded-lg shadow-pop-sm" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-40 bg-pop-accent flex flex-col items-center justify-center gap-8 text-2xl font-display text-pop-dark border-l-4 border-pop-dark"
          >
              <a href="#traps" onClick={scrollToSection('traps')} className="hover:text-pop-primary hover:scale-110 transition-all">Diagnosis</a>
              <a href="#solution" onClick={scrollToSection('solution')} className="hover:text-pop-secondary hover:scale-110 transition-all">Solusi</a>
              <a href="#strategy" onClick={scrollToSection('strategy')} className="hover:text-white hover:scale-110 transition-all">Strategi</a>
              <a href="#cascading" onClick={scrollToSection('cascading')} className="hover:text-pop-primary hover:scale-110 transition-all">Matriks</a>
              <a href="#database" onClick={scrollToSection('database')} className="hover:text-white hover:scale-110 transition-all">Data Center</a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden bg-white">
        <HeroScene />
        
        {/* Abstract Green Pop Art Shapes Background */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
            <div className="absolute top-20 left-10 w-32 h-32 bg-pop-primary rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
            <div className="absolute top-40 right-20 w-48 h-48 bg-pop-secondary rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-pop-accent rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <motion.div 
          style={{ y: yHero, opacity: opacityHero }}
          className="relative z-10 container mx-auto px-6 text-center"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20, rotate: -5 }}
            animate={{ opacity: 1, y: 0, rotate: -2 }}
            transition={{ delay: 0.5 }}
            className="inline-block mb-6 px-6 py-2 bg-pop-accent border-2 border-pop-dark text-pop-dark text-sm tracking-widest uppercase font-black rounded-lg shadow-pop"
          >
            Laporan Akhir 2025-2029
          </motion.div>
          
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl mb-8 text-pop-dark leading-[0.9]">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="block text-pop-primary drop-shadow-[4px_4px_0px_#003300]"
            >
              MASTERPLAN
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="text-pop-secondary drop-shadow-[4px_4px_0px_#003300] italic"
            >
              DESA MAKMUR
            </motion.div>
          </h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="max-w-2xl mx-auto bg-white p-6 rounded-xl border-2 border-pop-dark shadow-pop mb-12 transform rotate-1"
          >
             <p className="text-xl md:text-2xl text-pop-dark font-medium leading-relaxed">
              Menerjemahkan Visi <span className="bg-pop-accent px-1">"Lampung Timur Makmur"</span> menjadi aksi nyata, terukur, dan berdampak di <span className="bg-pop-primary px-1">264 desa</span>.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="flex justify-center gap-4"
          >
             <a href="#traps" onClick={scrollToSection('traps')} className="group cursor-pointer">
                <div className="px-8 py-4 bg-pop-dark text-white rounded-full shadow-pop border-2 border-white group-hover:bg-pop-secondary group-hover:scale-105 transition-all duration-300 flex items-center gap-3">
                   <span className="text-lg font-bold tracking-wide">Jelajahi Sekarang</span>
                   <div className="bg-white rounded-full p-1 text-pop-dark group-hover:rotate-90 transition-transform duration-300">
                     <ArrowDown size={20} />
                   </div>
                </div>
             </a>
          </motion.div>
        </motion.div>
      </header>
      
      <LeaderSection />

      <main>
        {/* The Problem: 3 Traps */}
        <SectionWrapper id="traps" className="py-24 bg-white border-b-2 border-pop-dark">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
               <motion.div variants={fadeInValues}>
                 <div className="inline-block mb-3 px-3 py-1 bg-pop-primary text-pop-dark border-2 border-pop-dark rounded-md text-xs font-black tracking-widest uppercase shadow-pop-sm transform -rotate-1">Diagnosis Masalah</div>
                 <h2 className="font-display text-5xl mb-6 leading-tight text-pop-dark">Tiga Perangkap Pembangunan</h2>
                 <p className="text-xl text-stone-600 mb-8 leading-relaxed font-medium">
                   Analisis mendalam mengidentifikasi tiga hambatan struktural yang saling mengunci ("Development Traps") yang harus diurai secara simultan.
                 </p>
                 
                 <div className="space-y-6">
                    {[
                      { icon: AlertTriangle, color: "bg-pop-accent", title: "Human Capital Trap", desc: "Kualitas SDM rendah (RLS < 9 tahun) dan stunting 14.8% menghambat produktivitas." },
                      { icon: BarChart3, color: "bg-pop-secondary text-white", title: "Economic Structure Trap", desc: "Ekspor komoditas mentah (padi, jagung, singkong) tanpa hilirisasi, nilai tambah rendah." },
                      { icon: Scale, color: "bg-pop-primary", title: "Fiscal & Service Trap", desc: "Kapasitas fiskal rendah membatasi investasi infrastruktur (kemantapan jalan hanya 60.2%)." }
                    ].map((item, idx) => (
                      <motion.div 
                        key={idx}
                        variants={fadeInValues}
                        custom={idx}
                        whileHover={{ x: 10, rotate: idx % 2 === 0 ? 1 : -1 }}
                        className="flex gap-4 p-5 rounded-xl border-2 border-pop-dark bg-white shadow-pop hover:shadow-pop-hover transition-all duration-300 cursor-default"
                      >
                          <div className={`shrink-0 mt-1 p-3 ${item.color} rounded-lg border-2 border-pop-dark shadow-pop-sm`}>
                            <item.icon className="text-pop-dark" size={24} strokeWidth={2.5} />
                          </div>
                          <div>
                              <h4 className="font-display text-xl text-pop-dark mb-1">{item.title}</h4>
                              <p className="text-sm font-medium text-stone-600">{item.desc}</p>
                          </div>
                      </motion.div>
                    ))}
                 </div>
               </motion.div>
               
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
                 whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                 transition={{ duration: 0.8 }}
                 className="bg-pop-light p-8 rounded-3xl relative overflow-hidden min-h-[500px] flex items-center justify-center border-2 border-pop-dark shadow-pop"
               >
                  {/* Background grid */}
                  <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,#003300_25%,transparent_25%,transparent_75%,#003300_75%,#003300),linear-gradient(45deg,#003300_25%,transparent_25%,transparent_75%,#003300_75%,#003300)] bg-[length:20px_20px] bg-[position:0_0,10px_10px]"></div>

                  <div className="text-center relative z-10 w-full">
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: -2 }}
                        className="bg-white border-2 border-pop-dark p-6 rounded-2xl shadow-pop mb-8 inline-block"
                      >
                         <div className="text-7xl font-display text-pop-primary mb-2">13.19%</div>
                         <div className="text-pop-dark font-black uppercase tracking-widest text-sm bg-pop-accent px-2 py-1 inline-block border border-pop-dark rounded">Angka Kemiskinan</div>
                      </motion.div>
                      
                      <div className="grid grid-cols-2 gap-6">
                          <motion.div whileHover={{ y: -5, rotate: 2 }} className="bg-white border-2 border-pop-dark p-4 rounded-xl shadow-pop">
                              <div className="text-4xl font-display text-pop-secondary mb-1">8.2 Th</div>
                              <div className="text-stone-500 text-xs font-bold uppercase">Rata-rata Sekolah</div>
                          </motion.div>
                          <motion.div whileHover={{ y: -5, rotate: -2 }} className="bg-white border-2 border-pop-dark p-4 rounded-xl shadow-pop">
                              <div className="text-4xl font-display text-pop-primary mb-1">60.2%</div>
                              <div className="text-stone-500 text-xs font-bold uppercase">Jalan Mantap</div>
                          </motion.div>
                      </div>
                  </div>
               </motion.div>
            </div>
          </div>
        </SectionWrapper>

        {/* The Solution: Pancadaya & ID6 */}
        <section id="solution" className="py-24 bg-pop-dark text-white relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-900 via-green-950 to-black"></div>
            <div className="absolute top-10 right-10 w-32 h-32 bg-pop-primary rounded-full mix-blend-screen filter blur-2xl opacity-50 animate-pulse"></div>
            <div className="absolute bottom-10 left-10 w-40 h-40 bg-pop-secondary rounded-full mix-blend-screen filter blur-2xl opacity-50 animate-pulse" style={{ animationDelay: '1s' }}></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-block mb-3 px-3 py-1 bg-pop-accent text-pop-dark border-2 border-white rounded-md text-xs font-black tracking-widest uppercase shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transform rotate-1">Arsitektur Solusi</div>
                    <motion.h2 
                      variants={fadeInValues}
                      initial="hidden"
                      whileInView="visible"
                      className="font-display text-5xl md:text-6xl mb-6 text-white"
                    >
                      Filosofi Pancadaya
                    </motion.h2>
                    <p className="text-xl text-stone-300 font-light leading-relaxed">
                        Bukan sekadar program, melainkan metodologi untuk mengaktivasi energi sosial desa.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/20">
                         <ID6RadarDiagram />
                    </div>
                    
                    <div className="space-y-6">
                        {[
                          { id: 1, title: "Shift to ID6", text: "Transisi dari Indeks Desa Membangun (IDM) ke Indeks Desa 6 Dimensi (ID6) untuk diagnosis yang lebih tajam.", color: "text-pop-accent", border: "border-pop-accent" },
                          { id: 2, title: "Evidence-Based", text: "Intervensi tidak lagi berbasis keinginan ('wish list'), melainkan berbasis data defisit indikator ID6.", color: "text-pop-primary", border: "border-pop-primary" },
                          { id: 3, title: "Sakai Sambayan", text: "Merevitalisasi semangat gotong royong sebagai 'Co-financing' pembangunan non-APBD.", color: "text-pop-secondary", border: "border-pop-secondary" }
                        ].map((item, idx) => (
                          <motion.div 
                            key={idx}
                            initial={{ x: 50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ delay: idx * 0.2, duration: 0.6 }}
                            whileHover={{ x: -10, scale: 1.02 }}
                            className={`flex items-start gap-5 p-5 rounded-2xl bg-stone-800/50 border-2 border-transparent hover:${item.border} transition-all duration-300`}
                          >
                              <div className={`w-14 h-14 rounded-xl bg-stone-900 flex items-center justify-center ${item.color} border-2 border-stone-700 shrink-0 font-display text-3xl shadow-pop`}>{item.id}</div>
                              <div>
                                  <h4 className={`text-2xl font-display mb-2 ${item.color}`}>{item.title}</h4>
                                  <p className="text-stone-300 text-base leading-relaxed">{item.text}</p>
                              </div>
                          </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        {/* Strategy: RPJMD Matrix */}
        <SectionWrapper id="strategy" className="py-24 bg-pop-pattern">
            <div className="container mx-auto px-6">
                 <div className="text-center mb-16">
                    <div className="inline-block mb-3 px-3 py-1 bg-white text-pop-dark border-2 border-pop-dark rounded-md text-xs font-black tracking-widest uppercase shadow-pop transform -rotate-1">Integrasi Strategis</div>
                    <h2 className="font-display text-5xl text-pop-dark mb-4 mt-4">Dari Visi ke Aksi</h2>
                    <p className="text-stone-600 text-lg font-medium max-w-2xl mx-auto bg-white p-2 rounded-lg border-2 border-pop-dark shadow-pop-sm">
                        Bagaimana "Siwo Itou" (9 Cita RPJMD) diterjemahkan menjadi 7 Program Prioritas Masterplan Desa Makmur.
                    </p>
                </div>
                
                <div className="bg-white p-2 rounded-2xl border-2 border-pop-dark shadow-pop">
                    <RpjmdMatrix />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
                    <StatCard value="75.00" label="Target IPM 2029" delay={1} color="bg-pop-primary/10" />
                    <StatCard value="<10%" label="Target Stunting" delay={2} color="bg-pop-secondary/10" />
                    <StatCard value="0%" label="Kemiskinan Ekstrem" delay={3} color="bg-pop-accent/20" />
                    <StatCard value="100%" label="Desa ODF" delay={4} color="bg-pop-muted/30" />
                </div>
            </div>
        </SectionWrapper>

        {/* Cascading Strategy Section */}
        <SectionWrapper id="cascading" className="py-24 bg-pop-light border-t-2 border-pop-dark">
            <div className="container mx-auto px-6">
                 <div className="text-center mb-16">
                    <div className="inline-block mb-3 px-3 py-1 bg-pop-primary text-pop-dark border-2 border-pop-dark rounded-md text-xs font-black tracking-widest uppercase shadow-pop transform rotate-1">Matriks Cascading</div>
                    <h2 className="font-display text-5xl text-pop-dark mb-4 mt-4">Peta Jalan Pembangunan</h2>
                    <p className="text-stone-600 font-medium text-lg max-w-2xl mx-auto">
                        Penjabaran menyeluruh dari Visi "Lampung Timur Makmur".
                    </p>
                </div>
                
                <CascadingStrategy />
            </div>
        </SectionWrapper>

        {/* Data Center Section */}
        <SectionWrapper id="database" className="py-24 bg-white border-t-2 border-pop-dark">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
               <div className="inline-block mb-3 px-3 py-1 bg-pop-secondary text-white border-2 border-pop-dark rounded-md text-xs font-black tracking-widest uppercase shadow-pop transform -rotate-1">Dashboard Analitik</div>
               <h2 className="font-display text-5xl text-pop-dark mb-4 mt-4">Matriks Desa 6 Dimensi</h2>
               <p className="text-stone-600 text-lg font-medium max-w-2xl mx-auto">
                   Visualisasi data terpadu (Data Lakehouse) yang memetakan skor kinerja 264 Desa.
               </p>
            </div>
            
            <DesaMatrix />
          </div>
        </SectionWrapper>

        {/* Pilot Villages */}
        <SectionWrapper id="pilots" className="py-24 bg-pop-pattern border-t-2 border-pop-dark">
            <div className="container mx-auto px-6">
                 <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div>
                        <div className="inline-block mb-3 px-3 py-1 bg-pop-accent text-pop-dark border-2 border-pop-dark rounded-md text-xs font-black tracking-widest uppercase shadow-pop transform rotate-1">Model Replikasi</div>
                        <h2 className="font-display text-5xl text-pop-dark mt-4">12 Desa Percontohan</h2>
                    </div>
                    <p className="text-stone-600 font-medium max-w-md text-base mt-4 md:mt-0 bg-white p-3 rounded-lg border-2 border-pop-dark shadow-pop-sm">
                        Laboratorium inovasi untuk menguji strategi Pancadaya sebelum direplikasi ke 252 desa lainnya.
                    </p>
                 </div>

                 {/* Interactive 3D Scene Container */}
                 <motion.div 
                   whileHover={{ scale: 1.01 }}
                   className="w-full h-[450px] bg-pop-dark rounded-3xl overflow-hidden relative mb-16 shadow-pop border-4 border-pop-dark"
                 >
                     <VillageScene />
                     <div className="absolute bottom-6 left-6 text-white text-xs font-bold font-sans backdrop-blur-md bg-white/10 p-3 rounded-xl border border-white/20">
                        🔵 Visualisasi: 12 Titik Intervensi Strategis
                     </div>
                 </motion.div>

                 <PilotVillagesGrid />

                 <div className="mt-24 mb-16">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-4 h-12 bg-pop-primary rounded-full border-2 border-pop-dark shadow-pop-sm transform -rotate-6"></div>
                        <h3 className="font-display text-4xl text-pop-dark">Peta Sebaran Desa</h3>
                    </div>
                    <VillageMap />
                 </div>

                 <div className="mt-20 p-10 bg-white rounded-3xl border-4 border-pop-dark shadow-pop text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-pop-accent rounded-full -mr-16 -mt-16 z-0"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-pop-secondary rounded-full -ml-16 -mb-16 z-0"></div>
                    
                    <h3 className="font-display text-3xl text-pop-dark mb-8 relative z-10">Tata Kelola Implementasi</h3>
                    <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-20 items-center relative z-10">
                        <div className="text-center group">
                            <div className="w-20 h-20 bg-pop-primary text-pop-dark rounded-2xl border-2 border-pop-dark shadow-pop flex items-center justify-center text-3xl font-display mb-3 mx-auto group-hover:scale-110 transition-transform">1</div>
                            <div className="font-black text-xl text-pop-dark mb-1">BAPPEDA</div>
                            <div className="text-xs uppercase tracking-widest text-stone-500 font-bold bg-stone-100 px-2 py-1 rounded border border-stone-200">Dirigen</div>
                        </div>
                        <ArrowDown className="text-pop-dark rotate-0 md:-rotate-90 animate-bounce w-8 h-8" strokeWidth={3} />
                        <div className="text-center group">
                            <div className="w-20 h-20 bg-pop-secondary text-white rounded-2xl border-2 border-pop-dark shadow-pop flex items-center justify-center text-3xl font-display mb-3 mx-auto group-hover:scale-110 transition-transform">2</div>
                            <div className="font-black text-xl text-pop-dark mb-1">CAMAT</div>
                            <div className="text-xs uppercase tracking-widest text-stone-500 font-bold bg-stone-100 px-2 py-1 rounded border border-stone-200">Quality Gate</div>
                        </div>
                        <ArrowDown className="text-pop-dark rotate-0 md:-rotate-90 animate-bounce w-8 h-8" strokeWidth={3} style={{ animationDelay: '0.2s' }} />
                        <div className="text-center group">
                            <div className="w-20 h-20 bg-pop-accent text-pop-dark rounded-2xl border-2 border-pop-dark shadow-pop flex items-center justify-center text-3xl font-display mb-3 mx-auto group-hover:scale-110 transition-transform">3</div>
                            <div className="font-black text-xl text-pop-dark mb-1">DESA</div>
                            <div className="text-xs uppercase tracking-widest text-stone-500 font-bold bg-stone-100 px-2 py-1 rounded border border-stone-200">Prime Mover</div>
                        </div>
                    </div>
                 </div>
            </div>
        </SectionWrapper>

      </main>

      <footer className="bg-pop-dark text-white py-12 border-t-4 border-pop-primary">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
                <div className="text-white font-display font-bold text-3xl mb-2 flex items-center gap-3 justify-center md:justify-start">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border-2 border-pop-primary">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Lambang_Kabupaten_Lampung_Timur.png/250px-Lambang_Kabupaten_Lampung_Timur.png" alt="Logo" className="w-6 h-6" />
                  </div>
                  Desa Makmur
                </div>
                <p className="text-sm text-stone-400 font-medium">Kabupaten Lampung Timur 2025-2029</p>
            </div>
            <div className="text-center md:text-right text-sm">
                <p className="mb-1 text-stone-400">Disiapkan untuk:</p>
                <p className="text-pop-accent font-bold tracking-wide text-lg">Bupati & Wakil Bupati Terpilih</p>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;