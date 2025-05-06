// import React from "react";
// import { motion } from "framer-motion";


// const features = [
//   {
//     title: "Wildlife Map",
//     description: "Explore national parks and reserves across India.",
//     image: "https://images.unsplash.com/photo-1597248883602-cd34b4ecb7bb",
//   },
//   {
//     title: "AI Animal Agents",
//     description: "Chat with smart animal bots powered by AI.",
//     image: "https://images.unsplash.com/photo-1583337130417-3346a1c3c4bd",
//   },
//   {
//     title: "NFT Rewards",
//     description: "Earn digital rewards by contributing sightings.",
//     image: "https://images.unsplash.com/photo-1644864049366-6f17bd4c3287",
//   },
//   {
//     title: "Satellite Insights",
//     description: "Access scientific research and satellite images.",
//     image: "https://images.unsplash.com/photo-1617293372537-f69db5da8ed3",
//   },
// ];

// const FeatureCards = () => {
//   return (
//     <section className="bg-[#f9f9f9] py-20 px-6 md:px-20">
//       <h2 className="text-4xl font-bold text-center mb-10 text-green-900">Discover Our Features</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//         {features.map((feature, index) => (
//           <motion.div
//             key={index}
//             className="bg-white shadow-lg rounded-2xl overflow-hidden cursor-pointer group transition transform hover:scale-105"
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: index * 0.2 }}
//             viewport={{ once: true }}
//           >
//             <img
//               src={feature.image}
//               alt={feature.title}
//               className="w-full h-40 object-cover group-hover:brightness-75 transition"
//             />
//             <div className="p-4">
//               <h3 className="text-lg font-bold text-green-800">{feature.title}</h3>
//               <p className="text-gray-600 text-sm mt-2">{feature.description}</p>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default FeatureCards;
