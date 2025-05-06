// import { Canvas } from '@react-three/fiber';
// import { Grid } from '@react-three/drei';
// import { Color, Fog, DoubleSide } from 'three';
// import AnimalModel from './AnimalModel'; // Ensure the import path is correct

// export default function GridBoxScene() {
//   const color = '#ff00ff'; // Grid color (magenta)

//   return (
//     <div className="w-screen h-screen">
//       <Canvas
//         camera={{ position: [15, 10, 15], fov: 50 }}
//         onCreated={({ scene, camera }) => {
//           scene.background = new Color(0x0a0015); // Dark background for contrast
//           scene.fog = new Fog(0x0a0015, 30, 100);  // Fog for depth
//           camera.lookAt(0, 0, 0); // Center the camera to look at the origin
//         }}
//         gl={{ antialias: true, alpha: true }}
//       >
//         {/* Lighting */}
//         <ambientLight intensity={0.3} color={color} />
//         <pointLight intensity={1} position={[10, 10, 10]} color={color} />
//         <spotLight intensity={1.5} position={[0, 10, 0]} angle={0.2} penumbra={1} color={color} />

//         {/* Grid for floor */}
//         <Grid
//           position={[0, 0, 0]}
//           args={[50, 50]} // Larger grid for a full floor
//           sectionSize={2}
//           cellSize={1}
//           sectionColor={color}
//           cellColor={color}
//           infiniteGrid={false}
//         >
//           <meshStandardMaterial attach="material" side={DoubleSide} />
//         </Grid>

//         {/* Animal model */}
//         <AnimalModel 
//           position={[0, 0, 0]} // Center the tiger in the scene
//           scale={1}             // Adjust scale to fit the scene
//           rotation={[0, Math.PI, 0]} // Rotate if needed (default for natural facing)
//         />
//       </Canvas>
//     </div>
//   );
// }
