import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, useGLTF } from '@react-three/drei';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Color } from 'three';

const animalModels = [
  {
    name: 'White Tiger',
    url: '/models/white_tiger_rigged_animated.glb',
    position: [20, 0.2, 0],
    scale: 0.5,
    camera: { position: [10, 30, 80], fov: 90 },
  },
  {
    name: 'Elephant',
    url: '/models/elephant.glb',
    position: [0, -1.5, 2],
    scale: 1.2,
    camera: { position: [0, 0, 7], fov: 70 },
  },
  {
    name: 'Rhino',
    url: '/models/model_56a_-_southern_white_rhino.glb',
    position: [0, -0.6, 2],
    scale: 1.1,
    camera: { position: [0, 0, 6], fov: 55 },
  },
];

function AnimalModel({ modelUrl, position, scale, camera }) {
  const group = useRef();
  const { scene } = useGLTF(modelUrl);

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.01;
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={camera.position} fov={camera.fov} />
      <group ref={group} position={position} scale={scale}>
        <primitive object={scene} />
      </group>
    </>
  );
}

export default function AnimalScene({ currentAnimal, setCurrentAnimal }) {
  const nextAnimal = () => {
    setCurrentAnimal((prev) => (prev + 1) % animalModels.length);
  };

  const prevAnimal = () => {
    setCurrentAnimal((prev) => (prev - 1 + animalModels.length) % animalModels.length);
  };

  const { name, url, position, scale, camera } = animalModels[currentAnimal];

  return (
    <div className="w-full h-screen fixed top-0 left-0 z-0">
      {/* Animal Name at the Top */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-md shadow-md z-50">
        <h1 className="text-xl font-semibold">{name}</h1>
      </div>

      <Canvas
        shadows
        onCreated={({ scene }) => {
          scene.background = new Color(0xf8f8f8);
        }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight intensity={2} position={[10, 30, 10]} castShadow />
        <hemisphereLight intensity={0.5} />
        <AnimalModel modelUrl={url} position={position} scale={scale} camera={camera} />
      </Canvas>

      {/* Navigation Buttons */}
      <div className="absolute inset-y-1/2 left-4 flex items-center">
        <button
          onClick={prevAnimal}
          className="p-3 bg-gray-800 text-white rounded-full shadow-md hover:bg-gray-700"
        >
          <FiChevronLeft size={28} />
        </button>
      </div>
      <div className="absolute inset-y-1/2 right-4 flex items-center">
        <button
          onClick={nextAnimal}
          className="p-3 bg-gray-800 text-white rounded-full shadow-md hover:bg-gray-700"
        >
          <FiChevronRight size={28} />
        </button>
      </div>
    </div>
  );
}