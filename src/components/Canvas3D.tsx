'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload } from '@react-three/drei';

export default function Canvas3D({ children }: { children: React.ReactNode }) {
  return (
    <Canvas
      className='w-full h-full'
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls enableZoom={false} />
      <Preload all />
      {children}
    </Canvas>
  );
}
