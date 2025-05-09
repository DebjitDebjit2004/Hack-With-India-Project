import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const images = [
  {
    src: 'https://plus.unsplash.com/premium_photo-1661843615544-b2c973491c8b?w=600&auto=format&fit=crop&q=60',
    size: 'col-span-1 row-span-2'
  },
  {
    src: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?w=600&auto=format&fit=crop&q=60',
    size: 'col-span-2 row-span-2'
  },
  {
    src: 'https://images.unsplash.com/photo-1543946207-39bd91e70ca7?w=600&auto=format&fit=crop&q=60',
    size: 'col-span-2 row-span-2'
  },
  {
    src: 'https://images.unsplash.com/photo-1520552159191-e28a1d9f0d7e?w=600&auto=format&fit=crop&q=60',
    size: 'col-span-1 row-span-2'
  },
  {
    src: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=600&auto=format&fit=crop&q=60',
    size: 'col-span-1 row-span-2'
  },
  {
    src: 'https://images.unsplash.com/photo-1504173010664-32509aeebb62?w=600&auto=format&fit=crop&q=60',
    size: 'col-span-2 row-span-2'
  },
];

const verticalRevealAnimation = {
  hidden: { opacity: 0, clipPath: 'inset(100% 0 0 0)' },
  visible: { opacity: 1, clipPath: 'inset(0 0 0 0)', transition: { duration: 1, ease: 'easeInOut' } }
};

const horizontalRevealAnimation = {
  hidden: { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
  visible: { opacity: 1, clipPath: 'inset(0 0 0 0)', transition: { duration: 1, ease: 'easeInOut' } }
};

const GalleryPage = () => {
  const [page, setPage] = useState(1);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 via-emerald-800 to-teal-700">
      <Navbar />
    <div className="min-h-screen bg-white text-black p-36 font-serif max-w-screen-xl mx-auto text-center">
      <motion.div
        className="grid grid-cols-3 auto-rows-[180px] gap-4 relative max-w-5xl mx-auto"
        initial="hidden"
        animate="visible"
      >
        {images.map((img, i) => (
          <motion.div
            key={i}
            className={`relative overflow-hidden rounded-lg shadow-sm cursor-pointer ${img.size}`}
            variants={img.size.includes('col-span-2') ? horizontalRevealAnimation : verticalRevealAnimation}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.97 }}
          >
            <motion.img
              src={img.src}
              alt="Photo"
              className="w-full h-full object-cover block"
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="flex justify-start items-center gap-4 mt-8 text-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          className="p-2 rounded hover:drop-shadow-[0_0_2em_#646cffaa]"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handlePageChange(Math.max(page - 1, 1))}
        >
          <ArrowLeft size={20} />
        </motion.button>
        <span className="text-gray-500">{page}/3</span>
        <motion.button
          className="p-2 rounded hover:drop-shadow-[0_0_2em_#61dafbaa]"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handlePageChange(Math.min(page + 1, 3))}
        >
          <ArrowRight size={20} />
        </motion.button>
      </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default GalleryPage;
