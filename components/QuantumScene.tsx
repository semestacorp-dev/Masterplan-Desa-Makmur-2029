/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Icosahedron, Octahedron, MeshDistortMaterial, Text, Stars, Environment, Ring, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Fix for missing R3F types in global JSX namespace and React module
declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      meshStandardMaterial: any;
      ambientLight: any;
      spotLight: any;
      pointLight: any;
    }
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      meshStandardMaterial: any;
      ambientLight: any;
      spotLight: any;
      pointLight: any;
    }
  }
}

const ID6Core = () => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.rotation.y = t * 0.2;
      ref.current.rotation.x = Math.sin(t * 0.5) * 0.1;
    }
  });

  return (
    <group>
      {/* The Core: ID6 - Pop Primary Green */}
      <Icosahedron ref={ref} args={[1.5, 0]}>
        <MeshDistortMaterial
          color="#00E676"
          envMapIntensity={3}
          clearcoat={1}
          clearcoatRoughness={0.1}
          metalness={0.5}
          roughness={0.2}
          distort={0.4}
          speed={3}
        />
      </Icosahedron>
      
      {/* Rings - Pop Secondary Teal & Accent Lime */}
      <Ring args={[2.2, 2.35, 64]} rotation={[Math.PI / 2, 0, 0]}>
         <meshStandardMaterial color="#00BFA5" side={THREE.DoubleSide} transparent opacity={0.8} metalness={0.5} emissive="#00BFA5" emissiveIntensity={0.5} />
      </Ring>
      <Ring args={[2.8, 2.9, 64]} rotation={[Math.PI / 1.8, 0, 0]}>
         <meshStandardMaterial color="#C6FF00" side={THREE.DoubleSide} transparent opacity={0.6} metalness={0.5} emissive="#C6FF00" emissiveIntensity={0.5} />
      </Ring>
      <Sparkles count={80} scale={6} size={6} speed={0.8} opacity={1} color="#C6FF00" />
    </group>
  );
};

const PilotVillageNode: React.FC<{ position: [number, number, number], label: string, delay: number, color: string }> = ({ position, label, delay, color }) => {
    const ref = useRef<THREE.Group>(null);
    
    useFrame((state) => {
        if (ref.current) {
            const t = state.clock.getElapsedTime();
            ref.current.position.y = position[1] + Math.sin(t + delay) * 0.5;
            ref.current.rotation.y += 0.02;
            ref.current.rotation.z = Math.sin(t * 0.5) * 0.1;
        }
    });

    return (
        <group ref={ref} position={position}>
            <Octahedron args={[0.3, 0]}>
                <meshStandardMaterial color={color} metalness={0.6} roughness={0.2} />
            </Octahedron>
            <Text
                position={[0, -0.6, 0]}
                fontSize={0.25}
                color="white"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.02}
                outlineColor="black"
                font="https://fonts.gstatic.com/s/righteous/v13/1xFnvx5yJB3Dngmv9QC8MS0.woff"
            >
                {label}
            </Text>
        </group>
    )
}

export const VillageScene: React.FC = () => {
  const villages = [
      "Braja Gemilang", "Banjar Rejo", "Tulus Rejo", "Margototo",
      "Labuhan Ratu IX", "Raman Endra", "Pugung Raharjo", "Giri Mulyo",
      "Sukadana Baru", "Sri Menanti", "Raman Fajar", "Bumi Mulyo"
  ];
  
  // Green/Teal/Lime colors
  const colors = ['#00E676', '#00BFA5', '#C6FF00', '#A5D6A7'];

  return (
    <div className="w-full h-full absolute inset-0 bg-stone-900">
      <Canvas camera={{ position: [0, 0, 9], fov: 50 }} gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}>
        <ambientLight intensity={0.8} />
        <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={5} color="#ffffff" castShadow />
        <pointLight position={[-10, -10, -10]} intensity={3} color="#00E676" />
        <Environment preset="city" blur={0.8} />
        
        <Float rotationIntensity={0.2} floatIntensity={0.5} speed={1.5}>
           <ID6Core />
           
           {villages.map((name, i) => {
               const angle = (i / villages.length) * Math.PI * 2;
               const radius = 4.2;
               const x = Math.cos(angle) * radius;
               const z = Math.sin(angle) * radius * 0.5; 
               const y = Math.sin(angle * 3) * 2; 
               
               return (
                   <PilotVillageNode 
                        key={name} 
                        position={[x, y, z]} 
                        label={name} 
                        delay={i * 0.5} 
                        color={colors[i % colors.length]}
                   />
               );
           })}
        </Float>
        
        <Stars radius={100} depth={50} count={3000} factor={6} saturation={1} fade speed={2} />
      </Canvas>
    </div>
  );
}

export const HeroScene: React.FC = () => {
    return (
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.7} />
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.4}>
            <ID6Core />
          </Float>
          <Environment preset="city" />
          <Sparkles count={50} scale={6} size={4} speed={0.6} opacity={0.6} color="#00E676" />
        </Canvas>
      </div>
    );
};