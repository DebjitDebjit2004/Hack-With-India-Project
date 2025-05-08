import React, { useState } from 'react';
import { Mic, Send, MessageCircle } from 'lucide-react';
import AnimalScene from '../Components/AnimalScene';

const animalDescriptions = {
  'White Tiger': 'The white tiger is a rare pigmentation variant of the Bengal tiger, native to the Indian subcontinent. These majestic animals have white fur with black stripes and piercing blue eyes.',
  Elephant: 'Elephants are the largest land animals, known for their intelligence and strong social bonds. They use their trunk for communication and handling objects.',
  Rhino: 'Rhinos are large herbivorous mammals known for their thick skin and iconic horns. They are found in Africa and Asia.',
};

const WildTalk = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [chatOpen, setChatOpen] = useState(false);
  const [currentAnimal, setCurrentAnimal] = useState(0);

  const handleSpeak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  const handleAsk = () => {
    const animalName = Object.keys(animalDescriptions)[currentAnimal];
    setResponse(animalDescriptions[animalName] || 'I am not sure about that.');
    handleSpeak(animalDescriptions[animalName]);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <AnimalScene currentAnimal={currentAnimal} setCurrentAnimal={setCurrentAnimal} />
      </div>
      <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-20 bg-white/60 backdrop-blur-md px-6 py-4 rounded-md">
        <h2 className="text-2xl font-semibold mb-2">About the {Object.keys(animalDescriptions)[currentAnimal]}</h2>
        <p className="leading-relaxed">{animalDescriptions[Object.keys(animalDescriptions)[currentAnimal]]}</p>
        <button
          onClick={() => handleSpeak(animalDescriptions[Object.keys(animalDescriptions)[currentAnimal]])}
          className="mt-3 bg-blue-600 text-white px-3 py-1 rounded-md"
        >
          Listen
        </button>
      </div>
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-lg"
      >
        <MessageCircle size={24} />
      </button>
      {chatOpen && (
        <div className="fixed bottom-20 right-6 w-80 bg-white/40 backdrop-blur-md rounded-xl shadow-lg p-4 z-30 border border-white/20">
          <div className="text-sm text-gray-700 mb-2 font-semibold">🤖 Ask WildTalk AI</div>
          <div className="flex items-center gap-2 mb-3">
            <input
              type="text"
              placeholder="e.g., Where do lions live?"
              className="flex-grow p-2 rounded-md border focus:ring-2 focus:ring-blue-300"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleAsk} className="bg-blue-500 p-2 rounded-md text-white">
              <Send size={18} />
            </button>
          </div>
          {response && (
            <div className="bg-white/50 p-3 rounded-md">
              <strong>AI:</strong> {response}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WildTalk;