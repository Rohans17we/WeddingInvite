"use client";

import React, { useRef } from "react";
import { useGLTF, Clone } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Lantern3D({ flip = false }: { flip?: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/3d Models/arabian_lamp.glb");

  React.useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshStandardMaterial({
          color: '#ffd700',
          metalness: 0.6,
          roughness: 0.2,
          emissive: '#4a3b00',
          emissiveIntensity: 0.5
        });
      }
    });
  }, [scene]);

  useFrame((state, delta) => {
    if (group.current) {
      // Rotate 360 degrees over 10 seconds
      const speed = (Math.PI * 2) / 10;
      group.current.rotation.y += speed * delta;
    }
  });

  return (
    <group ref={group} dispose={null} scale={flip ? [-1, 1, 1] : [1, 1, 1]}>
      {/* Use Clone to safely reuse the cached GLTF scene across multiple instances */}
      <Clone object={scene} />
    </group>
  );
}

// Preload the model so it loads quickly
useGLTF.preload("/3d Models/arabian_lamp.glb");
