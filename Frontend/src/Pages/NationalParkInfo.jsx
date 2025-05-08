import React from 'react';
import { useParams } from 'react-router-dom';
import floraFauna from '../assets/stateInfo.json';
import { motion } from 'framer-motion';

const NationalParkInfo = () => {
  const { stateName } = useParams();
  const stateInfo = floraFauna[stateName?.toLowerCase()];

  if (!stateInfo) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <h1 className="text-2xl font-bold text-red-500">
          No information available for {stateName}.
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-300 p-8">
      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold text-green-800">
          {stateName} - National Park Info
        </h1>
        <p className="text-lg text-green-600 mt-2">
          Discover the beauty and biodiversity of {stateName}.
        </p>
      </motion.div>

      {/* Content */}
      <motion.div
        className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Interesting Facts */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-green-700 mb-2">
            🌍 Interesting Facts
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {stateInfo.interesting_facts}
          </p>
        </div>

        {/* Flora Section */}
        {stateInfo.flora && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-green-700 mb-2">
              🌿 Flora
            </h2>
            <p className="text-gray-700 leading-relaxed">
              <strong>Primary:</strong> {stateInfo.flora.primary} <br />
              <strong>Other:</strong> {stateInfo.flora.other?.join(', ')} <br />
              <strong>Conservation Status:</strong>{' '}
              {stateInfo.flora.conservation_status} <br />
              <strong>Description:</strong> {stateInfo.flora.description}
            </p>
          </div>
        )}

        {/* Fauna Section */}
        {stateInfo.fauna && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-green-700 mb-2">
              🐾 Fauna
            </h2>
            <p className="text-gray-700 leading-relaxed">
              <strong>Primary:</strong> {stateInfo.fauna.primary} <br />
              <strong>Other:</strong> {stateInfo.fauna.other?.join(', ')} <br />
              <strong>Conservation Status:</strong>{' '}
              {stateInfo.fauna.conservation_status} <br />
              <strong>Description:</strong> {stateInfo.fauna.description}
            </p>
          </div>
        )}

        {/* Additional Details */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-green-700 mb-2">
            📍 Additional Details
          </h2>
          <p className="text-gray-700 leading-relaxed">
            <strong>Area:</strong> {stateInfo.area} <br />
            <strong>Established:</strong> {stateInfo.established}
          </p>
        </div>

        {/* Back Button */}
        <motion.button
          className="w-full bg-green-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition"
          onClick={() => window.history.back()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Go Back
        </motion.button>
      </motion.div>
    </div>
  );
};

export default NationalParkInfo;