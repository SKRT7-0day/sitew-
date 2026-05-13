import React, { useState, useEffect } from 'react';
import { Tag, PlusCircle, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
  const [tags, setTags] = useState([
    { id: 1, name: 'SKRT7 OFFICIAL', tag: 'SKRT', members: '10K', category: 'Gaming', status: 'Official' }
  ]);
  const [joinCount, setJoinCount] = useState(0);
  const [darkMode, setDarkMode] = useState(true);

  // جلب البيانات من MongoDB فور فتح الموقع
  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => setJoinCount(data.totalJoins || 0))
      .catch(err => console.error("Error:", err));
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
    <div className={`min-h-screen ${darkMode ? 'bg-[#0F1115] text-white' : 'bg-white text-black'}`}>
      <nav className="p-6 border-b border-gray-800 flex justify-between items-center">
        <div className="flex items-center gap-2 font-black text-xl">
          <Tag className="text-purple-600"/> SKRT7.TAGS
        </div>
        <button onClick={() => setDarkMode(!darkMode)} className="p-2 bg-gray-800 rounded-lg">
          {darkMode ? <Sun size={20}/> : <Moon size={20}/>}
        </button>
      </nav>

      <header className="py-16 text-center">
        <h1 className="text-5xl font-black mb-4">SKRT7 Clan Tags Gallery</h1>
        <div className="flex justify-center gap-8 mt-10">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">{joinCount}</div>
            <div className="text-sm text-gray-500 uppercase">Total Joins</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">{tags.length}</div>
            <div className="text-sm text-gray-500 uppercase">Total Tags</div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {tags.map(item => (
          <div key={item.id} className="bg-[#16191F] p-6 rounded-2xl border border-gray-800">
            <h3 className="text-xl font-bold mb-4">{item.name}</h3>
            <button onClick={() => handleJoinClick(item.tag)} className="w-full bg-purple-600 py-3 rounded-xl font-bold hover:bg-purple-700 transition-all">
              Join
            </button>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;

