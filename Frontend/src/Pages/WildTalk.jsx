import React, { useState } from "react";
import { Mic, Send, MessageCircle } from "lucide-react";
import AnimalScene from "../Components/AnimalScene";

const WildTalk = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [chatOpen, setChatOpen] = useState(false);

  const handleSpeak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  const handleAsk = () => {
    const mockResponse = "The white tiger is a rare variant of the Bengal tiger.";
    setResponse(mockResponse);
    handleSpeak(mockResponse);
  };

  const tigerInfo = `The white tiger is a rare pigmentation variant of the Bengal tiger, native to the Indian subcontinent. 
These majestic animals have white fur with black stripes and piercing blue eyes. 
They are not albino but a result of a genetic mutation known as leucism. 
These tigers are often found in captivity and are known for their elegance and strength.`;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fullscreen Model Background */}
      <div className="absolute inset-0 z-0">
        <AnimalScene />
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/30 to-white/10 backdrop-blur-[1px]" />
      </div>


      {/* Description Box at Bottom */}
      <div className="fixed bottom-10 left-6 right-6 z-20">
        <div className="max-w-3xl mx-auto bg-transparent text-justify">
          <h2 className="text-2xl font-semibold mb-3">About the White Tiger</h2>
          <p className="whitespace-pre-line leading-relaxed">{tigerInfo}</p>
        </div>
      </div>

      {/* Text-to-Speech Button at Bottom */}
      <div className="fixed bottom-6 left-6 z-20">
        <button
          onClick={() => handleSpeak(tigerInfo)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition shadow-lg"
        >
          <Mic size={18} /> Listen to Description
        </button>
      </div>

      {/* Floating Chatbot Button */}
      <button
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition z-20"
        onClick={() => setChatOpen(!chatOpen)}
        title="Ask WildTalk AI"
      >
        <MessageCircle size={24} />
      </button>

      {/* Chatbot Overlay */}
      {chatOpen && (
        <div className="fixed bottom-20 right-6 w-80 bg-white/40 backdrop-blur-md rounded-xl shadow-lg p-4 z-30 border border-white/20">
          <div className="text-sm text-gray-700 mb-2 font-semibold">🤖 Ask WildTalk AI</div>
          <div className="flex items-center gap-2 mb-3">
            <input
              type="text"
              placeholder="e.g., Where do white tigers live?"
              className="flex-grow p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              onClick={handleAsk}
              className="bg-blue-500 p-2 rounded-md text-white hover:bg-blue-600 transition"
              title="Ask AI"
            >
              <Send size={18} />
            </button>
          </div>

          {response && (
            <div className="bg-white/50 backdrop-blur-sm p-3 rounded-md text-gray-800 text-sm">
              <strong>AI:</strong> {response}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WildTalk;
