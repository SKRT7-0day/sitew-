import React, { useState } from 'react';
import { Search, Users, ExternalLink, X, Info, Flame, Star, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// بيانات التاغات - يمكنك إضافة أو تعديل البيانات هنا بسهولة
const initialTags = [
  { id: 1, name: '@zori', tag: 'zori', members: '1.1K', icon: <Flame className="text-orange-500" />, category: 'Popular' },
  { id: 2, name: 'ORANGE CAT', tag: 'MEOW', members: '8.4K', icon: '🐱', category: 'Gaming' },
  { id: 3, name: 'IDOL tag', tag: 'IDOL', members: '1.4K', icon: <Star className="text-yellow-500" />, category: 'Social' },
  { id: 4, name: 'WebMC', tag: 'WBMG', members: '2.8K', icon: '🌐', category: 'Community' },
  { id: 5, name: 'Truth.', tag: 'zz', members: '5.1K', icon: '💀', category: 'Social' },
  { id: 6, name: 'PsychWard', tag: 'papa', members: '268', icon: '🧠', category: 'Community' },
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);

  // تصفية التاغات بناءً على البحث
  const filteredTags = initialTags.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8f9fd] text-gray-900 font-sans selection:bg-purple-200">
      
      {/* Header & Search Section */}
      <header className="pt-16 pb-12 px-4 text-center bg-white border-b border-purple-50">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight"
        >
          Discord Clan <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">Tags Gallery</span>
        </motion.h1>
        <p className="text-gray-500 max-w-lg mx-auto mb-10 text-lg">
          استكشف مجتمعات ديسكورد المميزة من خلال التاغات الرسمية الخاصة بهم.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors" size={22} />
          <input 
            type="text" 
            placeholder="ابحث عن سيرفر أو تاغ معين..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white border-2 border-gray-100 shadow-xl shadow-purple-100/20 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition-all text-lg"
          />
        </div>
      </header>

      {/* Tags Grid */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTags.map((item) => (
            <motion.div 
              layoutId={item.id}
              key={item.id} 
              className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        {item.tag}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-400 font-medium">
                        <Users size={14} className="text-gray-300" /> {item.members}
                      </span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedTag(item)}
                  className="p-2 text-gray-300 hover:text-purple-500 transition-colors"
                >
                  <Info size={20} />
                </button>
              </div>
              
              <div className="flex gap-3">
                <a 
                  href={`https://discord.gg/${item.tag}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-[2] bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-purple-200 hover:brightness-110 active:scale-95 transition-all"
                >
                  Join Server <ExternalLink size={18}/>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Modal - النافذة المنبثقة كما في الصورة 1000143729.jpg */}
      <AnimatePresence>
        {selectedTag && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-[#1a1a1a] text-white w-full max-w-sm rounded-[2.5rem] overflow-hidden relative shadow-2xl"
            >
              <button 
                onClick={() => setSelectedTag(null)} 
                className="absolute top-5 right-5 bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors z-10"
              >
                <X size={20}/>
              </button>
              
              {/* Cover Image Effect */}
              <div className="h-28 bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900"></div>
              
              <div className="px-8 pb-10 text-center -mt-10">
                <div className="w-24 h-24 bg-gray-800 rounded-full mx-auto border-[6px] border-[#1a1a1a] flex items-center justify-center text-5xl mb-4 shadow-xl">
                  {selectedTag.icon}
                </div>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <h2 className="text-2xl font-black">{selectedTag.name}</h2>
                  <ShieldCheck className="text-blue-400" size={20} />
                </div>
                <p className="text-gray-400 font-medium mb-8">.gg/{selectedTag.tag} • {selectedTag.members} members</p>
                
                <div className="space-y-3">
                  <button className="w-full bg-white text-black py-4 rounded-2xl font-black text-lg hover:bg-gray-100 transition-all">
                    Join Community
                  </button>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Official Discord Partner Tag</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-12 text-center text-gray-400 text-sm">
        <p>© 2026 Discord Tags Gallery - Made with ❤️ for Hamza</p>
      </footer>
    </div>
  );
}

export default App;

