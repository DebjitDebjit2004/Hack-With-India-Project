import React from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.nav
      className="fixed top-4 left-4 right-4 z-50 backdrop-blur-lg bg-black/50 text-white px-6 py-4 flex justify-between items-center rounded-lg shadow-lg"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-2xl font-bold text-yellow-400">Aranya</h1>
      <ul className="hidden md:flex gap-6 text-sm tracking-wide">
        <li className="hover:text-yellow-400 cursor-pointer transition">Explore</li>
        <li className="hover:text-yellow-400 cursor-pointer transition">Map</li>
        <li className="hover:text-yellow-400 cursor-pointer transition">Contribute</li>
        <li className="hover:text-yellow-400 cursor-pointer transition">Report</li>
        <li className="hover:text-yellow-400 cursor-pointer transition">Chat</li>
        <li className="hover:text-yellow-400 cursor-pointer transition">Admin</li>
      </ul>
    </motion.nav>
  );
};

export default Navbar;
