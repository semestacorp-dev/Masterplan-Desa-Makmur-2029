/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, LayersControl } from 'react-leaflet';
import * as L from 'leaflet';
import { ExternalLink } from 'lucide-react';

// Fix for default marker icons in React-Leaflet
const customIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Helper to generate an organic-looking boundary (simulating admin border)
const generateIrregularBoundary = (lat: number, lng: number, radius: number = 0.012, seed: number) => {
    const points = [];
    const segments = 10; // Number of vertices
    
    for (let i = 0; i < segments; i++) {
        const angle_deg = (360 / segments) * i;
        const angle_rad = Math.PI / 180 * angle_deg;
        
        // Use pseudo-randomness based on seed and index to ensure stable borders
        const noise = Math.sin(seed * 999 + i * 13) * 0.3; // -0.3 to 0.3 variance
        const r = radius * (1 + noise); 
        
        const x = lng + r * Math.cos(angle_rad) * 1.2; // Stretch longitude slightly
        const y = lat + r * Math.sin(angle_rad); 
        
        points.push([y, x] as [number, number]);
    }
    return points;
};

const getColorByStatus = (status: string) => {
    if (status.includes('MANDIRI')) return '#00E676'; // Pop Primary
    if (status.includes('MAJU')) return '#00BFA5';    // Pop Secondary
    return '#C6FF00'; // Pop Accent
};

// Data moved outside component to be stable
const VILLAGES = [
    { name: "Braja Gemilang", lat: -5.230, lng: 105.720, niche: "Sentra Mocaf", status: "MAJU", id: 1 },
    { name: "Raman Fajar", lat: -5.010, lng: 105.580, niche: "Sentra Kerupuk", status: "MANDIRI", id: 2 },
    { name: "Giri Mulyo", lat: -5.380, lng: 105.650, niche: "Alpukat Siger", status: "MAJU", id: 3 },
    { name: "Sukadana Baru", lat: -5.080, lng: 105.620, niche: "Lada Hitam", status: "MAJU", id: 4 },
    { name: "Pugung Raharjo", lat: -5.320, lng: 105.580, niche: "Wisata Sejarah", status: "MANDIRI", id: 5 },
    { name: "Banjar Rejo", lat: -5.130, lng: 105.480, niche: "Desa Budaya", status: "MAJU", id: 6 },
    { name: "Labuhan Ratu IX", lat: -5.160, lng: 105.680, niche: "Ekowisata", status: "MANDIRI", id: 7 },
    { name: "Sri Menanti", lat: -5.350, lng: 105.750, niche: "Konservasi Air", status: "MANDIRI", id: 8 },
    { name: "Bumi Mulyo", lat: -5.340, lng: 105.600, niche: "Desa Literasi", status: "MAJU", id: 9 },
    { name: "Raman Endra", lat: -4.980, lng: 105.550, niche: "Smart Village/Madu", status: "MANDIRI", id: 10 },
    { name: "Margototo", lat: -5.050, lng: 105.380, niche: "Sentra Ternak", status: "MAJU", id: 11 },
    { name: "Tulus Rejo", lat: -5.080, lng: 105.450, niche: "Sentra Pembibitan", status: "MANDIRI", id: 12 },
];

// Center of Lampung Timur
const CENTER_POSITION: [number, number] = [-5.180, 105.600];

export const VillageMap: React.FC = () => {
    return (
        <div className="w-full h-[600px] rounded-2xl overflow-hidden shadow-pop border-2 border-pop-dark z-0 relative">
            <MapContainer 
                center={CENTER_POSITION} 
                zoom={10} 
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={false}
            >
                <LayersControl position="topright">
                    <LayersControl.BaseLayer checked name="Google Maps (Jalan)">
                        <TileLayer
                            attribution='&copy; <a href="https://maps.google.com">Google Maps</a>'
                            url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                        />
                    </LayersControl.BaseLayer>
                    
                    <LayersControl.BaseLayer name="Google Maps (Satelit)">
                        <TileLayer
                            attribution='&copy; <a href="https://maps.google.com">Google Maps</a>'
                            url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
                        />
                    </LayersControl.BaseLayer>
                </LayersControl>
                
                {VILLAGES.map((v) => {
                    const color = getColorByStatus(v.status);
                    const boundary = generateIrregularBoundary(v.lat, v.lng, 0.015, v.id);
                    
                    return (
                        <React.Fragment key={v.id}>
                            {/* Administration Border */}
                            <Polygon 
                                positions={boundary}
                                pathOptions={{ 
                                    color: color, 
                                    fillColor: color, 
                                    fillOpacity: 0.3, 
                                    weight: 3,
                                    dashArray: '5, 5'
                                }} 
                            >
                                <Popup>
                                    <div className="font-sans text-center">
                                        <div className="text-[10px] font-black uppercase tracking-widest text-stone-500 mb-1">Batas Administrasi</div>
                                        <div className="font-display font-bold text-pop-dark text-lg">Desa {v.name}</div>
                                    </div>
                                </Popup>
                            </Polygon>
                            
                            {/* Village Marker */}
                            <Marker position={[v.lat, v.lng]} icon={customIcon}>
                                <Popup className="font-sans">
                                    <div className="p-1 min-w-[150px]">
                                        <div className="flex items-center gap-2 mb-2 border-b-2 border-pop-dark pb-2">
                                            <div className="w-3 h-3 rounded-full border border-black" style={{ backgroundColor: color }}></div>
                                            <h4 className="font-bold text-pop-dark font-display text-lg m-0 leading-none">{v.name}</h4>
                                        </div>
                                        
                                        <div className="space-y-1 mb-3">
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs text-stone-500 font-bold uppercase">Status ID6:</span>
                                                <span className="text-xs font-black px-2 py-0.5 rounded text-pop-dark" style={{ backgroundColor: color }}>{v.status}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs text-stone-500 font-bold uppercase">Niche:</span>
                                                <span className="text-xs font-bold text-pop-dark">{v.niche}</span>
                                            </div>
                                        </div>

                                        <a 
                                            href={`https://www.google.com/maps/search/?api=1&query=${v.lat},${v.lng}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 w-full py-2 bg-pop-dark text-white rounded-md text-xs font-bold hover:bg-pop-secondary transition-colors border-2 border-transparent hover:border-pop-dark"
                                        >
                                            <ExternalLink size={12} />
                                            Buka di Google Maps
                                        </a>
                                    </div>
                                </Popup>
                            </Marker>
                        </React.Fragment>
                    )
                })}
            </MapContainer>
            
            {/* Map Legend */}
            <div className="absolute bottom-6 left-6 z-[1000] bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-pop border-2 border-pop-dark text-xs">
                <div className="font-black mb-3 text-pop-dark uppercase tracking-widest text-sm border-b-2 border-stone-200 pb-1">Status Desa</div>
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 rounded bg-[#00E676] border-2 border-pop-dark"></div>
                    <span className="font-bold text-stone-700">Desa Mandiri</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-[#00BFA5] border-2 border-pop-dark"></div>
                    <span className="font-bold text-stone-700">Desa Maju</span>
                </div>
            </div>
        </div>
    );
};