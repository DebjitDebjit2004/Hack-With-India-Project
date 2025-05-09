import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaLeaf, FaBinoculars } from 'react-icons/fa';
import { MdOutlineExplore } from 'react-icons/md';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const NationalParkInfo = () => {
  return (
    <div className="flex flex-col min-h-screen"> {/* Parent flex container for sticky footer */}
      <Navbar />
      <main className="flex-grow bg-gradient-to-br from-green-500 via-emerald-800 to-teal-700 pb-12">
        {/* Hero Section */}
        {/* 1. Parent of Hero Image: Added overflow-hidden to contain the scaled image */}
        <div className="relative h-[500px] overflow-hidden group  bg-white shadow-[0_0_25px_rgba(52,211,153,1.9)]">
          <img
            src="https://i.pinimg.com/736x/30/e7/0e/30e70e03b39d19f9e8ecf251e4cd3cf6.jpg"
            alt="Kaziranga National Park"
            // 2. Hero Image Hover Effect: Scales the image on hover.
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-8 left-8 text-white z-10">
            <motion.h1
              className="text-5xl font-bold"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Kaziranga National Park
            </motion.h1>
            <motion.p
              className="text-xl mt-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Discover the breathtaking landscapes and rich wildlife of Kaziranga.  
              <br />
              A UNESCO World Heritage Site, home to the Indian one-horned rhinoceros. 
            </motion.p>
          </div>
        </div>

        {/* Main Content Section */}
        <motion.div
          // 3. Light Effect on Parent Border: Added a custom shadow for a glow effect.
          // This shadow is a soft, blurred, semi-transparent color.
          // Format: shadow-[x-offset_y-offset_blur-radius_spread-radius_color]
          // Or more simply for glow: shadow-[x-offset_y-offset_blur-radius_color]
          className="max-w-6xl mx-auto bg-white shadow-[0_0_25px_rgba(52,211,153,1.9)] rounded-lg p-8 mt-12"
        >
          {/* Location & Heritage Section */}
          <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-semibold text-green-800 mb-4 flex items-center gap-2">
                <FaMapMarkerAlt /> Location & Heritage
              </h2>
              <p className="text-gray-800 leading-relaxed">
                Kaziranga, located in Assam, India, is a UNESCO World Heritage Site since 1985 
                and is renowned for its biodiversity. The park covers an area of 430 square kilometers
                and is home to the world's largest population of the Indian one-horned rhinoceros.
              </p>
            </div>
            {/* 4. Grid Image Container: overflow-hidden to neatly contain scaled image */}
            <div className="overflow-hidden rounded-lg">
              <img
                src="https://i.pinimg.com/736x/fa/41/fd/fa41fdae81d556e24600dd441a08fbb9.jpg"
                alt="Kaziranga Grasslands"
                className="w-full h-full object-cover rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:brightness-105"
              />
            </div>
          </div>

          {/* Flora Section (Image on left, Text on right for md screens) */}
          <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="overflow-hidden rounded-lg md:order-1"> 
              <img
                src="https://www.forestessentialsindia.com/blog/wp-content/uploads/feimg/upload/5/8/58bf8a5ef71b14e87539b79fe22b0c9e.jpg"
                alt="Kaziranga Flora"
                className="w-full h-full object-cover rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:brightness-105"
              />
            </div>
            <div className="md:order-2"> {/* md:order-2 keeps text on right */}
              <h2 className="text-3xl font-semibold text-green-800 mb-4 flex items-center gap-2">
                <FaLeaf /> Flora
              </h2>
              <p className="text-gray-800 leading-relaxed">
                Known for vast stretches of elephant grass, marshlands, and dense tropical forests,
                Kaziranga is home to a variety of flora including the endangered species of  
                <strong> Assam's Elephant Grass</strong>. The park is also rich in medicinal plants
                and herbs, making it a biodiversity hotspot.
              </p>
            </div>
          </div>

          {/* Fauna Section (Text on left, Image on right for md screens) */}
          <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="md:order-1"> {/* Text part */}
              <h2 className="text-3xl font-semibold text-green-800 mb-4 flex items-center gap-2">
                <FaBinoculars /> Fauna
              </h2>
              <p className="text-gray-800 leading-relaxed">
                Home to the largest population of Indian Rhinoceros, Bengal Tigers, Asian Elephants,
                and a variety of birds, Kaziranga is a haven for wildlife enthusiasts. The park's
                diverse ecosystems support over 35 species of mammals, 480 species of birds, and
                numerous reptiles and amphibians. The park is also a critical habitat for the
                endangered swamp deer and the wild water buffalo.
              </p>
            </div>
            <div className="overflow-hidden rounded-lg md:order-2"> {/* Image part */}
              <img
                src="https://i.pinimg.com/736x/7e/6c/1b/7e6c1b90d453a1d9fb41238354d293e0.jpg"
                alt="Kaziranga Fauna"
                className="w-full h-full object-cover rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:brightness-105"
              />
            </div>
          </div>

          {/* Tourism Guide Section (Image on left, Text on right for md screens) */}
          <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="overflow-hidden rounded-lg md:order-1"> {/* Image part */}
              <img
                src="https://i.pinimg.com/736x/c1/0a/ac/c10aac71556d93cd369e7cef98a26000.jpg"
                alt="Kaziranga Tourism"
                className="w-full h-full object-cover rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:brightness-105"
              />
            </div>
            <div className="md:order-2"> {/* Text part */}
              <h2 className="text-3xl font-semibold text-green-800 mb-4 flex items-center gap-2">
                <MdOutlineExplore /> Tourism Guide
              </h2>
              <p className="text-gray-800 leading-relaxed">
                <strong>Best Time to Visit:</strong> November to April <br />
                <strong>Activities:</strong> Jeep Safaris, Elephant Rides, Bird Watching <br />
                <strong>Entry Points:</strong> Kohora, Bagori, Agaratoli, Burapahar <br />
                <strong>Nearby Attractions:</strong> Majuli Island, Tea Gardens of Assam
              </p>
            </div>
          </div>

          {/* Animal Models Section */}
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-green-800 mb-4">
              Explore Animal Models
            </h2>
            <p className="text-gray-800 leading-relaxed mb-4">
              Experience the wildlife of Kaziranga through our interactive animal models.
            </p>
            <button
              className="bg-green-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-green-700 transition"
              onClick={() => window.location.href = '/animal-models'}
            >
              View Animal Models
            </button>
          </div>

          {/* Call to Action */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <button
              className="bg-green-700 text-white py-3 px-6 rounded-lg shadow-md hover:bg-green-800 transition flex items-center gap-2"
              onClick={() => window.history.back()}
            >
              Go Back
            </button>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default NationalParkInfo;