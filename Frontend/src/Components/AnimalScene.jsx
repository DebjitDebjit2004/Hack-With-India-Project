import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Color, Fog } from 'three';

function AnimalModel(props) {
  const group = useRef();
  const { scene } = useGLTF('/models/white_tiger_rigged_animated.glb');

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={group} {...props}>
      <primitive object={scene} />
    </group>
  );
}

export default function AnimalScene() {
  return (
    <Canvas
      className="w-full h-screen fixed top-0 left-0 z-0"
      camera={{ position: [100, 50, 100], fov: 40 }}
      onCreated={({ scene, camera }) => {
        scene.background = new Color(0xf8f8f8); // Original foggy white background
        scene.fog = new Fog(0xf8f8f8, 50, 300); // Original fog settings
        camera.lookAt(0, 15, 0);
      }}
      shadows
    >
      <ambientLight intensity={0.8} />
      <directionalLight
        intensity={2}
        position={[10, 30, 10]}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight intensity={0.5} position={[-10, 20, -10]} />
      <hemisphereLight intensity={0.5} groundColor={0x1a472a} skyColor={0xffffff} />

      <AnimalModel
        position={[0, -20, 0]}
        scale={0.7}
        rotation={[0, Math.PI, 0]}
      />
    </Canvas>
  );
}
