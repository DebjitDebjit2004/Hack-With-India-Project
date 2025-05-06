import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Marker,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FiMenu, FiX } from "react-icons/fi";
import { floraFauna } from "../assets/stateInfo"; // Adjust the path as necessary

const Home = () => {
  const [indiaStates, setIndiaStates] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hoveredState, setHoveredState] = useState(null); // Track the hovered state

  useEffect(() => {
    fetch("/data/geoBoundaries-IND-ADM1_simplified.geojson")
      .then((res) => res.json())
      .then((data) => setIndiaStates(data.features))
      .catch((err) => console.error("Error loading GeoJSON:", err));
  }, []);

  const defaultStyle = {
    weight: 1,
    color: "#555",
    fillColor: "#5cb85c",
    fillOpacity: 0.3,
  };

  const onEachState = (feature, layer) => {
    const stateName = feature.properties?.shapeName || "Unknown";
    layer.setStyle(defaultStyle);

    layer.on({
      mouseover: () => {
        const randomColor =
          "#" + Math.floor(Math.random() * 16777215).toString(16);
        layer.setStyle({
          fillColor: randomColor,
          fillOpacity: 0.7,
          weight: 2,
          color: "#222",
        });

        setHoveredState(stateName); // Set the hovered state
      },
      mouseout: () => {
        layer.setStyle(defaultStyle);
        setHoveredState(null); // Reset the hovered state on mouseout
      },
    });
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-black/80 text-white shadow-lg z-[999] transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-white font-semibold text-lg">
          🌿 Wildlife Map
        </div>
        <ul className="p-4 space-y-4">
          <li className="hover:text-green-400 cursor-pointer">Home</li>
          <li className="hover:text-green-400 cursor-pointer">About Us</li>
          <li className="hover:text-green-400 cursor-pointer">Login</li>
          <li className="hover:text-green-400 cursor-pointer">Wildlife Info</li>
        </ul>
      </div>

      {/* Toggle Button on Right */}
      <button
        className="fixed top-4 right-4 z-[1000] bg-green-600 text-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center text-xl hover:bg-green-700"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Map */}
      <MapContainer
        center={[22.9734, 78.6569]}
        zoom={5}
        scrollWheelZoom={false}
        style={{ height: "100vh", width: "100vw" }}
        maxBounds={[
          [6, 68],
          [38, 98],
        ]}
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {indiaStates.map((feature, index) => (
          <GeoJSON key={index} data={feature} onEachFeature={onEachState} />
        ))}

        {/* Show marker only for the hovered state */}
        {hoveredState && floraFauna[hoveredState] && (
          <Marker position={floraFauna[hoveredState].coordinates}>
            <Tooltip direction="top" offset={[0, -10]}>
              <div>
                <strong>{floraFauna[hoveredState].sanctuary}</strong>
                <br />
                🌿 {floraFauna[hoveredState].flora}
                <br />
                🐾 {floraFauna[hoveredState].fauna}
              </div>
            </Tooltip>
          </Marker>
        )}
      </MapContainer>
    </>
  );
};

export default Home;
