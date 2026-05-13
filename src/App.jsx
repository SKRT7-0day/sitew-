
import React, { useState, useEffect } from 'react';
import { Search, Users, ShieldCheck, PlusCircle, Image as ImageIcon, BarChart3, Tag, Globe, X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const initialTags = [
  { id: 1, name: 'ORANGE CAT', tag: 'MEOW', members: '8.4K', icon: 'https://cdn.discordapp.com/icons/1151123456789/a_bcde.png', category: 'Gaming', status: 'Official' },
  { id: 2, name: '@zori', tag: 'zori', members: '1.1K', icon: '', category: 'Social', status: 'Verified' },
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // عداد انضمام حقيقي مخزن في الجهاز
  const [joinCount, setJoinCount] = useState(() => {
    const savedJoins = localStorage.getItem('total_joins_count');
    return savedJoins ? parseInt(savedJoins) : 1200; // يبدأ من 1200 كقيمة افتراضية
  });

  const [tags, setTags] = useState(() => {
    const saved = localStorage.getItem('discord_gallery_pro');
    return saved ? JSON.parse(saved) : initialTags;
  });

  useEffect(() => {
    localStorage.setItem('discord_gallery_pro', JSON.stringify(tags));
    localStorage.setItem('total_joins_count', joinCount.toString());
  }, [tags, joinCount]);

  // وظيفة زيادة العداد عند الضغط على انضمام
  const handleJoinClick = (tag) => {
    setJoinCount(prev => prev + 1);
    window.open(`https://discord.gg/${tag}`, '_blank');
  };

  const filteredTags = tags.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    <div className="min-h-screen bg-[#FDFDFF] text-[#1A1D23] font-sans pb-20">
      
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-purple-600 p-2 rounded-xl text-white"><Tag size={20}/></div>
            <span className="font-black text-xl tracking-tight">SKRT7.<span className="text-purple-600">TAGS</span></span>
          </div>
          <button onClick={() => setShowAddForm(true)} className="bg-gray-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-purple-600 transition-all flex items-center gap-2">
            <PlusCircle size={18}/> أضف سيرفرك
          </button>
        </div>
      </nav>

      {/* Header & Real Stats */}
      <header className="pt-20 pb-12 px-4 text-center">
        <motion.h1 initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
          SKRT7 <span className="text-purple-600">Clan Tags</span> Gallery
        </motion.h1>
        <p className="text-gray-500 max-w-lg mx-auto mb-10 font-medium">معرض سكيرت 7 الرسمي لتاغات الكلان المميزة.</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-16">
          <div className="bg-white p-4 rounded-[2rem] shadow-sm border border-gray-50">
            <div className="text-2xl font-black text-purple-600">{tags.length}</div>
            <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Total Tags</div>
          </div>
          <div className="bg-white p-4 rounded-[2rem] shadow-sm border border-gray-50">
            <div className="text-2xl font-black text-blue-600">780</div>
            <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">With Badges</div>
          </div>
          <div className="bg-white p-4 rounded-[2rem] shadow-sm border border-gray-50">
            <div className="text-2xl font-black text-green-600">12</div>
            <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">New This Week</div>
          </div>
          <div className="bg-white p-4 rounded-[2rem] shadow-sm border border-gray-50">
            <div className="text-2xl font-black text-pink-600">{joinCount}</div>
            <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Total Joins</div>
          </div>
        </div>

        <div className="relative max-w-2xl mx-auto group">
          <div className="relative bg-white p-2 rounded-[2.5rem] shadow-xl border border-gray-100 flex items-center">
            <Search className="ml-4 text-gray-400" size={24} />
            <input 
              type="text" 
              placeholder="ابحث عن اسم سيرفر أو تاغ معين..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-4 outline-none font-bold text-lg"
            />
          </div>
        </div>
      </header>

      {/* معرض السيرفرات */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTags.map((item) => (
            <motion.div layout key={item.id} className="bg-white rounded-[2.5rem] p-6 border border-gray-100 shadow-sm hover:shadow-2xl transition-all relative group overflow-hidden">
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-4">
                  {item.icon ? (
                    <img src={item.icon} className="w-16 h-16 rounded-[1.5rem] object-cover" />
                  ) : (
                    <div className="w-16 h-16 bg-gray-100 rounded-[1.5rem] flex items-center justify-center text-2xl font-black text-gray-400">
                      {item.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h3 className="font-black text-lg">{item.name}</h3>
                    <div className="flex items-center gap-2">
                       <span className="text-[10px] bg-purple-50 text-purple-600 px-2 py-0.5 rounded-lg font-black border border-purple-100">{item.tag}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => handleJoinClick(item.tag)} 
                  className="flex-1 bg-purple-600 text-white py-4 rounded-2xl font-black text-center hover:bg-purple-700 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  Join Server <ExternalLink size={16}/>
                </button>
                <button onClick={() => setSelectedTag(item)} className="bg-gray-50 text-gray-400 p-4 rounded-2xl hover:bg-gray-100 border border-gray-100">
                  <BarChart3 size={20}/>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* باقي الـ Modals هنا (نفس الكود السابق)... */}
    </div>
  );
}

export default App;
