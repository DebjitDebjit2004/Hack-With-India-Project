import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FiMenu, FiX, FiMapPin, FiUnlock } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import floraFauna from '../assets/stateInfo.json';

const Home = () => {
  const [indiaStates, setIndiaStates] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hoveredState, setHoveredState] = useState(null);
  const [lockedState, setLockedState] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetch('/data/geoBoundaries-IND-ADM1_simplified_cleaned.geojson')
      .then((res) => res.json())
      .then((data) => setIndiaStates(data.features))
      .catch((err) => console.error('Error loading GeoJSON:', err));
  }, []);

  const defaultStyle = {
    weight: 1,
    color: '#2e7d32',
    fillColor: '#a5d6a7',
    fillOpacity: 0.4,
  };

  const onEachState = (feature, layer) => {
    const stateName = feature.properties?.shapeName || 'Unknown';
    layer.setStyle(defaultStyle);

    layer.on({
      mouseover: () => {
        if (!lockedState) {
          layer.setStyle({
            fillColor: '#66bb6a',
            fillOpacity: 0.7,
            weight: 2,
            color: '#1b5e20',
          });
          setHoveredState(stateName);
        }
      },
      mouseout: () => {
        if (!lockedState) {
          layer.setStyle(defaultStyle);
          setHoveredState(null);
        }
      },
      click: () => {
        setLockedState(stateName === lockedState ? null : stateName);
      },
    });
  };

  const StateInfoPanel = ({ stateInfo }) => (
    <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-green-300 animate-fade-in h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-green-800">{stateInfo.sanctuary}</h2>
        <button
          className="text-green-800 hover:text-green-600"
          onClick={() => setLockedState(null)}
        >
          {lockedState ? <FiUnlock size={20} /> : <FiMapPin size={20} />}
        </button>
      </div>
      <div className="space-y-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-green-700">🌿 Flora</h3>
          <p className="text-gray-700">
            Primary: {stateInfo.flora.primary} <br />
            Other: {stateInfo.flora.other.join(', ')} <br />
            Conservation Status: {stateInfo.flora.conservation_status} <br />
            Description: {stateInfo.flora.description}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-green-700">🐾 Fauna</h3>
          <p className="text-gray-700">
            Primary: {stateInfo.fauna.primary} <br />
            Other: {stateInfo.fauna.other.join(', ')} <br />
            Conservation Status: {stateInfo.fauna.conservation_status} <br />
            Description: {stateInfo.fauna.description}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-green-700">🌍 Facts</h3>
          <p className="text-gray-700">
            Area: {stateInfo.area} <br />
            Established: {stateInfo.established} <br />
            Interesting Facts: {stateInfo.interesting_facts}
          </p>
        </div>
        {/* Add a button to navigate to the NationalParkInfo page */}
        <div className="mt-4">
          <button
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition"
            onClick={() => navigate(`/national-park-info/${lockedState || hoveredState}`)}
          >
            Explore More About This National Park
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative bg-[url('/images/nature-bg.jpg')] bg-cover bg-center">
      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gradient-to-b from-green-800 to-green-600 text-white shadow-lg z-[999] transform transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-green-700 flex items-center justify-between">
          <span className="text-xl font-semibold">🌿 Explore Wildlife</span>
          <button
            className="text-white hover:text-gray-300"
            onClick={() => setSidebarOpen(false)}
          >
            <FiX size={24} />
          </button>
        </div>
        <ul className="p-6 space-y-4">
          {['Home', 'WildTalk', 'Wildlife Info', 'Conservation Efforts', 'Contact Us'].map((item) => (
            <li
              key={item}
              className="hover:bg-green-700 hover:rounded-lg p-2 cursor-pointer transition-colors"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Toggle Button */}
      <button
        className="fixed top-4 right-4 z-[1000] bg-green-600 text-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center text-xl hover:bg-green-700"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Info Panel */}
      <div className="fixed left-4 top-20 w-80 z-[998] h-[calc(100vh-6rem)]">
        {lockedState && floraFauna[lockedState] ? (
          <StateInfoPanel stateInfo={floraFauna[lockedState]} />
        ) : hoveredState && floraFauna[hoveredState] ? (
          <StateInfoPanel stateInfo={floraFauna[hoveredState]} />
        ) : (
          <div className="bg-white/80 p-6 rounded-xl shadow-lg flex items-center justify-center h-full">
            <p className="text-gray-500">Hover over a state for details</p>
          </div>
        )}
      </div>

      {/* Map */}
      <MapContainer
        center={[22.9734, 78.6569]}
        zoom={5}
        scrollWheelZoom={false}
        style={{ height: '100vh', width: '100vw' }}
        maxBounds={[[6, 68], [38, 98]]}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {indiaStates.map((feature, index) => (
          <GeoJSON key={index} data={feature} onEachFeature={onEachState} />
        ))}
      </MapContainer>
    </div>
  );
};

export default Home;