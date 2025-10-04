'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function ThreeDCard() {
  const meshRef = useRef<any>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color='#6366f1' metalness={0.5} roughness={0.2} />
    </mesh>
  );
}
