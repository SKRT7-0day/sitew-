
import React, { useState, useEffect } from 'react';
import { Search, Users, ShieldCheck, PlusCircle, Image as ImageIcon, BarChart3, Tag, Globe, X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// بيانات أولية أكثر واقعية
const initialTags = [
  { id: 1, name: 'ORANGE CAT', tag: 'MEOW', members: '8.4K', icon: 'https://cdn.discordapp.com/icons/1151123456789/a_bcde.png', category: 'Gaming', status: 'Official' },
  { id: 2, name: '@zori', tag: 'zori', members: '1.1K', icon: '', category: 'Social', status: 'Verified' },
  { id: 3, name: 'IDOL tag', tag: 'IDOL', members: '1.4K', icon: '', category: 'Social', status: 'Official' },
  { id: 4, name: 'WebMC', tag: 'WBMG', members: '2.8K', icon: '', category: 'Community', status: 'New' },
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [tags, setTags] = useState(() => {
    const saved = localStorage.getItem('discord_gallery_pro');
    return saved ? JSON.parse(saved) : initialTags;
  });

  useEffect(() => {
    localStorage.setItem('discord_gallery_pro', JSON.stringify(tags));
  }, [tags]);

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
      
      {/* Navbar الاحترافي */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-purple-600 p-2 rounded-xl text-white"><Tag size={20}/></div>
            <span className="font-black text-xl tracking-tight">EKZA.<span className="text-purple-600">TAGS</span></span>
          </div>
          <button onClick={() => setShowAddForm(true)} className="bg-gray-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-purple-600 transition-all flex items-center gap-2">
            <PlusCircle size={18}/> أضف سيرفرك
          </button>
        </div>
      </nav>

      {/* Header & Stats - مستوحى من ekea.lol */}
      <header className="pt-20 pb-12 px-4 text-center">
        <motion.h1 initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
          Discord <span className="text-purple-600">Clan Tags</span> Gallery
        </motion.h1>
        <p className="text-gray-500 max-w-lg mx-auto mb-10 font-medium">اكتشف أرقى مجتمعات ديسكورد من خلال التاغات الرسمية والمميزة.</p>

        {/* شريط الإحصائيات الاحترافي */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-16">
          {[
            { label: 'Total Tags', value: tags.length + 1100, color: 'text-purple-600' },
            { label: 'With Badges', value: '780', color: 'text-blue-600' },
            { label: 'New This Week', value: '12', color: 'text-green-600' },
            { label: 'Total Joins', value: '1.2K', color: 'text-pink-600' }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-4 rounded-[2rem] shadow-sm border border-gray-50">
              <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
              <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* محرك البحث المطور */}
        <div className="relative max-w-2xl mx-auto group">
          <div className="absolute inset-0 bg-purple-200 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
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
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><Globe size={80}/></div>
              
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-4">
                  {item.icon ? (
                    <img src={item.icon} className="w-16 h-16 rounded-[1.5rem] object-cover shadow-lg shadow-purple-100" />
                  ) : (
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-[1.5rem] flex items-center justify-center text-2xl font-black text-gray-400 border border-gray-100">
                      {item.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h3 className="font-black text-lg">{item.name}</h3>
                    <div className="flex items-center gap-2">
                       <span className="text-[10px] bg-purple-50 text-purple-600 px-2 py-0.5 rounded-lg font-black border border-purple-100">{item.tag}</span>
                       <span className="text-[10px] text-gray-400 flex items-center gap-1 font-bold"><Users size={12}/> {item.members}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <a href={`https://discord.gg/${item.tag}`} target="_blank" className="flex-1 bg-purple-600 text-white py-4 rounded-2xl font-black text-center hover:bg-purple-700 transition-all shadow-lg shadow-purple-100 flex items-center justify-center gap-2">
                  Join Server <ExternalLink size={16}/>
                </a>
                <button onClick={() => setSelectedTag(item)} className="bg-gray-50 text-gray-400 p-4 rounded-2xl hover:bg-gray-100 transition-all border border-gray-100">
                  <BarChart3 size={20}/>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Modal: تفاصيل السيرفر الاحترافي */}
      <AnimatePresence>
        {selectedTag && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50">
             <motion.div initial={{scale:0.9, opacity:0}} animate={{scale:1, opacity:1}} className="bg-white w-full max-w-lg rounded-[3rem] overflow-hidden shadow-2xl relative">
                <div className="h-40 bg-gradient-to-br from-purple-600 to-indigo-700 relative">
                  <button onClick={() => setSelectedTag(null)} className="absolute top-6 right-6 bg-white/20 p-2 rounded-full text-white hover:bg-white/40"><X/></button>
                </div>
                <div className="px-10 pb-12 text-center -mt-16">
                  <div className="w-32 h-32 bg-white rounded-[2.5rem] mx-auto p-2 shadow-2xl border-4 border-white mb-6">
                    {selectedTag.icon ? <img src={selectedTag.icon} className="w-full h-full rounded-[2rem] object-cover" /> : <div className="w-full h-full bg-gray-100 rounded-[2rem] flex items-center justify-center text-4xl font-black text-gray-300">{selectedTag.name.charAt(0)}</div>}
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <h2 className="text-3xl font-black">{selectedTag.name}</h2>
                    <ShieldCheck className="text-blue-500" size={28} />
                  </div>
                  <p className="text-gray-400 font-bold mb-8 uppercase tracking-widest text-sm">Discord.gg/{selectedTag.tag}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                      <div className="text-xl font-black text-purple-600">{selectedTag.members}</div>
                      <div className="text-[10px] text-gray-400 uppercase font-bold">Members</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                      <div className="text-xl font-black text-blue-600">{selectedTag.status}</div>
                      <div className="text-[10px] text-gray-400 uppercase font-bold">Verification</div>
                    </div>
                  </div>

                  <a href={`https://discord.gg/${selectedTag.tag}`} target="_blank" className="block w-full bg-purple-600 text-white py-5 rounded-[2rem] font-black text-xl shadow-xl shadow-purple-100 hover:scale-[1.02] transition-transform">انضم للمجتمع الآن</a>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* نافذة الإضافة */}
      <AnimatePresence>
        {showAddForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <motion.div initial={{y:50}} animate={{y:0}} className="bg-white p-10 rounded-[3rem] w-full max-w-md shadow-2xl">
              <h2 className="text-3xl font-black mb-8 text-center">سجل سيرفرك</h2>
              <form onSubmit={handleAddServer} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold mb-2 ml-4">اسم السيرفر</label>
                  <input name="name" required placeholder="مثال: ملوك العرب" className="w-full p-5 bg-gray-50 rounded-[1.5rem] outline-none focus:ring-2 focus:ring-purple-400 border-none shadow-inner" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 ml-4">التاغ (ID)</label>
                  <input name="tag" required placeholder="مثال: ARAB" className="w-full p-5 bg-gray-50 rounded-[1.5rem] outline-none focus:ring-2 focus:ring-purple-400 border-none shadow-inner" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 ml-4 text-purple-600">رابط أيقونة السيرفر (اختياري)</label>
                  <input name="iconUrl" placeholder="https://..." className="w-full p-5 bg-purple-50 rounded-[1.5rem] outline-none focus:ring-2 focus:ring-purple-400 border-none shadow-inner" />
                </div>
                <button type="submit" className="w-full bg-gray-900 text-white py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-gray-200">نشر السيرفر في المعرض</button>
                <button type="button" onClick={() => setShowAddForm(false)} className="w-full text-gray-400 font-bold">إلغاء</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default App;
