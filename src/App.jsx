import React, { useState, useEffect } from 'react';
import { Tag, PlusCircle, Moon, Sun, Search, Users, ShieldCheck, BarChart3, X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [joinCount, setJoinCount] = useState(0);
  const [tags, setTags] = useState([
    { id: 1, name: 'SKRT7 OFFICIAL', tag: 'SKRT', members: '10K', category: 'Gaming', status: 'Official' },
    { id: 2, name: 'SKRT7', tag: 'SKRT7', members: '5K', category: 'Gaming', status: 'Verified' }
  ]);

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => setJoinCount(data.totalJoins || 0))
      .catch(err => console.error("Database Error:", err));
  }, []);

  const handleJoinClick = async (tag) => {
    try {
      await fetch('/api/stats', { method: 'POST' });
      setJoinCount(prev => prev + 1);
    } catch (err) {
      console.error("Update failed:", err);
    }
    window.open(`https://discord.gg/${tag}`, '_blank');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-[#0F1115] text-white' : 'bg-white text-black'}`}>
      <nav className="sticky top-0 z-40 border-b border-gray-800 backdrop-blur-md bg-[#0F1115]/80 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 font-black text-xl">
          <div className="bg-purple-600 p-2 rounded-xl text-white"><Tag size={20}/></div>
          <span>SKRT7.<span className="text-purple-600">TAGS</span></span>
        </div>
        <button onClick={() => setDarkMode(!darkMode)} className="p-2.5 bg-gray-800 rounded-xl text-yellow-400">
          {darkMode ? <Sun size={20}/> : <Moon size={20}/>}
        </button>
      </nav>

      <header className="pt-16 pb-12 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-black mb-4">SKRT7 <span className="text-purple-600">Clan Tags</span> Gallery</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-10">
          <div className="bg-[#16191F] p-4 rounded-2xl border border-gray-800">
            <div className="text-2xl font-bold text-purple-500">{joinCount}</div>
            <div className="text-xs text-gray-500 uppercase">Total Joins</div>
          </div>
          <div className="bg-[#16191F] p-4 rounded-2xl border border-gray-800">
            <div className="text-2xl font-bold text-green-500">Ready</div>
            <div className="text-xs text-gray-500 uppercase">Status</div>
          </div>
          <div className="bg-[#16191F] p-4 rounded-2xl border border-gray-800">
            <div className="text-2xl font-bold text-blue-500">1</div>
            <div className="text-xs text-gray-500 uppercase">Verified</div>
          </div>
          <div className="bg-[#16191F] p-4 rounded-2xl border border-gray-800">
            <div className="text-2xl font-bold text-purple-500">{tags.length}</div>
            <div className="text-xs text-gray-500 uppercase">Total Tags</div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {tags.map(item => (
          <div key={item.id} className="bg-[#16191F] p-6 rounded-3xl border border-gray-800 hover:border-purple-500/50 transition-all">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-black text-lg">{item.name}</h3>
                <span className="text-[10px] bg-purple-500/10 text-purple-500 px-2 py-0.5 rounded border border-purple-500/20">{item.tag}</span>
              </div>
              <div className="w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center text-gray-500 text-xl font-black">{item.name[0]}</div>
            </div>
            <button onClick={() => handleJoinClick(item.tag)} className="w-full bg-purple-600 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20">
              <ExternalLink size={18}/> Join
            </button>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;

