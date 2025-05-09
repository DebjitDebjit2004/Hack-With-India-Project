import { FaTwitter, FaGithub, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1B1F1D] text-white py-10 px-6 md:px-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        {/* Brand */}
        <div>
          <h1 className="text-2xl font-bold text-yellow-400">Aranya</h1>
          <p className="text-sm text-gray-400 mt-2">Protecting wildlife through tech and community.</p>
        </div>

        {/* Links */}
        <div className="flex flex-col md:flex-row gap-4 text-sm">
          <a href="#" className="hover:text-yellow-400">Explore</a>
          <a href="#" className="hover:text-yellow-400">Map</a>
          <a href="#" className="hover:text-yellow-400">Contribute</a>
          <a href="#" className="hover:text-yellow-400">Report</a>
        </div>

        {/* Socials */}
        <div className="flex gap-4 text-xl">
          <a href="#" className="hover:text-yellow-400"><FaTwitter /></a>
          <a href="#" className="hover:text-yellow-400"><FaGithub /></a>
          <a href="#" className="hover:text-yellow-400"><FaInstagram /></a>
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} WildLifeNet. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
