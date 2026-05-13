import React, { useState, useEffect } from 'react';
import { Tag, Moon, Sun, ExternalLink, LogIn } from 'lucide-react';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [joinCount, setJoinCount] = useState(0);
  const [tags] = useState([
    { id: 1, name: 'SKRT7 OFFICIAL', tag: 'SKRT' },
    { id: 2, name: 'SKRT7', tag: 'SKRT7' }
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
    } catch (err) { console.error(err); }
    window.open(`https://discord.gg/${tag}`, '_blank');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#0F1115] text-white' : 'bg-gray-50 text-black'}`}>
      {/* Navbar المحدث مع زر الدخول والـ Dark Mode */}
      <nav className={`p-4 border-b ${darkMode ? 'border-gray-800 bg-[#0F1115]' : 'border-gray-200 bg-white'} flex justify-between items-center sticky top-0 z-50`}>
        <div className="flex items-center gap-2 font-black text-xl">
          <Tag className="text-purple-600"/> SKRT7.TAGS
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-xl ${darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-200 text-gray-600'}`}>
            {darkMode ? <Sun size={20}/> : <Moon size={20}/>}
          </button>
          <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl font-bold transition-all text-sm">
            <LogIn size={18}/> Login
          </button>
        </div>
      </nav>

      <header className="py-12 text-center px-4">
        <h1 className="text-4xl font-black mb-4">SKRT7 <span className="text-purple-600">Clan Tags</span> Gallery</h1>
        <div className="flex justify-center gap-4 mt-8 flex-wrap">
          {[
            { label: 'Total Tags', val: tags.length, color: 'text-purple-500' },
            { label: 'Verified', val: 1, color: 'text-blue-500' },
            { label: 'Status', val: 'Ready', color: 'text-green-500' },
            { label: 'Total Joins', val: joinCount, color: 'text-purple-500' }
          ].map((stat, i) => (
            <div key={i} className={`p-4 rounded-2xl border min-w-[100px] ${darkMode ? 'bg-[#16191F] border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`}>
              <div className={`text-xl font-bold ${stat.color}`}>{stat.val}</div>
              <div className="text-[10px] text-gray-500 uppercase font-bold">{stat.label}</div>
            </div>
          ))}
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {tags.map(item => (
          <div key={item.id} className={`p-6 rounded-3xl border transition-all ${darkMode ? 'bg-[#16191F] border-gray-800' : 'bg-white border-gray-100 shadow-md'}`}>
             <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-black text-lg">{item.name}</h3>
                <span className="text-[10px] bg-purple-500/10 text-purple-500 px-2 py-0.5 rounded border border-purple-500/20">{item.tag}</span>
              </div>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>{item.name[0]}</div>
            </div>
            <button onClick={() => handleJoinClick(item.tag)} className="w-full bg-purple-600 text-white py-3.5 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-purple-700 transition-all">
              Join <ExternalLink size={16}/>
            </button>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;

