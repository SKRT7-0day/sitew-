import React, { useState, useEffect } from 'react';
import { Search, Users, ShieldCheck, PlusCircle, BarChart3, Tag, X, ExternalLink, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // نظام الوضع الليلي
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  // قائمة نظيفة (فارغة أو سيرفر واحد كمثال احترافي)
  const [tags, setTags] = useState(() => {
    const saved = localStorage.getItem('skrt7_gallery');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'SKRT7 OFFICIAL', tag: 'SKRT', members: '10K', icon: '', category: 'Gaming', status: 'Official' }
    ];
  });

  const [joinCount, setJoinCount] = useState(() => {
    const savedJoins = localStorage.getItem('total_joins_count');
    return savedJoins ? parseInt(savedJoins) : 1200;
  });

  useEffect(() => {
    localStorage.setItem('skrt7_gallery', JSON.stringify(tags));
    localStorage.setItem('total_joins_count', joinCount.toString());
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [tags, joinCount, darkMode]);

  const handleJoinClick = (tag) => {
    setJoinCount(prev => prev + 1);
    window.open(`https://discord.gg/${tag}`, '_blank');
  };

  const handleAddServer = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newServer = {
      id: Date.now(),
      name: formData.get('name'),
      tag: formData.get('tag'),
      icon: formData.get('iconUrl'),
      members: '0',
      category: 'New',
      status: 'User Added'
    };
    setTags([newServer, ...tags]);
    setShowAddForm(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-[#0F1115] text-white' : 'bg-[#FDFDFF] text-[#1A1D23]'}`}>
      
      {/* Navbar المطور */}
      <nav className={`sticky top-0 z-40 border-b backdrop-blur-md px-6 py-4 ${darkMode ? 'bg-[#0F1115]/80 border-gray-800' : 'bg-white/80 border-gray-100'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-purple-600 p-2 rounded-xl text-white shadow-lg shadow-purple-500/20"><Tag size={20}/></div>
            <span className="font-black text-xl tracking-tight">SKRT7.<span className="text-purple-600">TAGS</span></span>
          </div>
          
          <div className="flex items-center gap-3">
            {/* زر الوضع الليلي */}
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2.5 rounded-xl border transition-all ${darkMode ? 'bg-gray-800 border-gray-700 text-yellow-400' : 'bg-gray-50 border-gray-100 text-gray-500'}`}
            >
              {darkMode ? <Sun size={20}/> : <Moon size={20}/>}
            </button>
            
            <button onClick={() => setShowAddForm(true)} className="bg-purple-600 text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:scale-105 transition-all flex items-center gap-2">
              <PlusCircle size={18}/> <span className="hidden md:inline">أضف سيرفرك</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="pt-16 pb-12 px-4 text-center">
        <motion.h1 initial={{opacity:0}} animate={{opacity:1}} className="text-4xl md:text-6xl font-black mb-4">
          SKRT7 <span className="text-purple-600">Clan Tags</span> Gallery
        </motion.h1>
        <p className={`max-w-lg mx-auto mb-10 font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          المعرض الرسمي لتنظيم وعرض تاغات الكلان الاحترافية.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-16">
          {[
            { label: 'Total Tags', value: tags.length, color: 'text-purple-500' },
            { label: 'Verified', value: '1', color: 'text-blue-500' },
            { label: 'Active Now', value: 'Ready', color: 'text-green-500' },
            { label: 'Total Joins', value: joinCount, color: 'text-pink-500' }
          ].map((stat, i) => (
            <div key={i} className={`p-4 rounded-[2rem] border transition-all ${darkMode ? 'bg-[#16191F] border-gray-800 shadow-xl' : 'bg-white border-gray-50 shadow-sm'}`}>
              <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
              <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="relative max-w-2xl mx-auto px-4">
          <div className={`relative flex items-center p-2 rounded-[2.5rem] border transition-all ${darkMode ? 'bg-[#16191F] border-gray-700 shadow-2xl' : 'bg-white border-gray-100 shadow-xl'}`}>
            <Search className="ml-4 text-gray-400" size={24} />
            <input 
              type="text" 
              placeholder="ابحث عن تاغ..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-4 bg-transparent outline-none font-bold text-lg"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tags.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase())).map((item) => (
            <motion.div layout key={item.id} className={`rounded-[2.5rem] p-6 border transition-all hover:scale-[1.02] ${darkMode ? 'bg-[#16191F] border-gray-800' : 'bg-white border-gray-50 shadow-sm'}`}>
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-2xl font-black ${darkMode ? 'bg-gray-800 text-gray-500' : 'bg-gray-100 text-gray-400'}`}>
                  {item.icon ? <img src={item.icon} className="w-full h-full rounded-[1.5rem] object-cover" /> : item.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-black text-lg">{item.name}</h3>
                  <span className="text-[10px] bg-purple-600/10 text-purple-500 px-2 py-0.5 rounded-lg font-black border border-purple-500/20">{item.tag}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => handleJoinClick(item.tag)} className="flex-1 bg-purple-600 text-white py-4 rounded-2xl font-black shadow-lg shadow-purple-500/20 hover:bg-purple-700 transition-all flex items-center justify-center gap-2">
                  Join <ExternalLink size={16}/>
                </button>
                <button onClick={() => setSelectedTag(item)} className={`p-4 rounded-2xl border transition-all ${darkMode ? 'bg-gray-800 border-gray-700 text-gray-400' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
                  <BarChart3 size={20}/>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Modal إضافة سيرفر */}
      <AnimatePresence>
        {showAddForm && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div initial={{scale:0.9}} animate={{scale:1}} className={`p-10 rounded-[3rem] w-full max-w-md ${darkMode ? 'bg-[#16191F] border border-gray-800' : 'bg-white'}`}>
              <h2 className="text-3xl font-black mb-8 text-center">أضف تاغ جديد</h2>
              <form onSubmit={handleAddServer} className="space-y-4">
                <input name="name" required placeholder="اسم السيرفر" className={`w-full p-5 rounded-2xl outline-none border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-100'}`} />
                <input name="tag" required placeholder="التاغ (ID)" className={`w-full p-5 rounded-2xl outline-none border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-100'}`} />
                <button type="submit" className="w-full bg-purple-600 text-white py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-purple-500/20">نشر الآن</button>
                <button type="button" onClick={() => setShowAddForm(false)} className="w-full text-gray-500 font-bold">إلغاء</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default App;

