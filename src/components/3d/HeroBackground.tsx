"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function StarField() {
  const ref = useRef<THREE.Points>(null);
  const sphere = useMemo(() => {
    const positions = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
      const r = Math.random() * 2 + 0.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta) * 3;
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 3;
      positions[i * 3 + 2] = r * Math.cos(phi) * 3;
    }
    return positions;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta * 0.02;
      ref.current.rotation.y -= delta * 0.03;
    }
  });

  return (
    <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#6C63FF"
        size={0.004}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

function FloatingSphere({ position, color, size }: { position: [number, number, number]; color: string; size: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const speed = Math.random() * 0.5 + 0.3;

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3;
      ref.current.rotation.x += 0.005;
      ref.current.rotation.z += 0.003;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.15}
        wireframe
      />
    </mesh>
  );
}

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 2], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[2, 2, 2]} color="#6C63FF" intensity={2} />
        <pointLight position={[-2, -2, -2]} color="#00E5FF" intensity={1.5} />
        <StarField />
        <FloatingSphere position={[1.5, 0.5, -1]} color="#6C63FF" size={0.4} />
        <FloatingSphere position={[-1.5, -0.5, -0.5]} color="#00E5FF" size={0.3} />
        <FloatingSphere position={[0.5, -1, -1.5]} color="#a855f7" size={0.25} />
      </Canvas>
    </div>
  );
}
