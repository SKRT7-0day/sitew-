import React, { useState, useEffect } from 'react';
import { Search, Users, ExternalLink, X, ShieldCheck, PlusCircle, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const initialTags = [
  { id: 1, name: 'ORANGE CAT', tag: 'MEOW', members: '8.4K', icon: 'https://cdn.discordapp.com/icons/123456/example1.png', tagImg: '', category: 'Gaming' },
  { id: 2, name: 'Zori', tag: 'ZORI', members: '1.1K', icon: '', tagImg: '', category: 'Popular' },
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [tags, setTags] = useState(() => {
    const savedTags = localStorage.getItem('discord_tags_v2');
    return savedTags ? JSON.parse(savedTags) : initialTags;
  });

  useEffect(() => {
    localStorage.setItem('discord_tags_v2', JSON.stringify(tags));
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
      icon: formData.get('iconUrl'), // رابط صورة السيرفر
      tagImg: formData.get('tagUrl'), // رابط صورة التاغ
      members: 'جديد',
    };
    setTags([newServer, ...tags]);
    setShowAddForm(false);
  };

  // وظيفة لعرض الصورة أو أول حرف إذا كانت الصورة فارغة
  const RenderIcon = ({ src, name, size = "w-14 h-14" }) => {
    if (src && src.startsWith('http')) {
      return <img src={src} alt={name} className={`${size} rounded-2xl object-cover border border-purple-100 shadow-sm`} />;
    }
    return (
      <div className={`${size} bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
        {name.charAt(0).toUpperCase()}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f8f9fd] text-gray-900 pb-20 font-sans">
      <header className="pt-16 pb-12 px-4 text-center bg-white border-b border-purple-50 shadow-sm">
        <h1 className="text-4xl font-black mb-6">Discord <span className="text-purple-600">Tags Gallery</span></h1>
        
        <button onClick={() => setShowAddForm(true)} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-purple-200 mb-8 mx-auto">
          <PlusCircle size={22} /> أضف سيرفرك بالصور
        </button>

        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input type="text" placeholder="ابحث عن التاغات..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-12 pr-6 py-4 rounded-2xl border-2 border-gray-100 outline-none focus:border-purple-400 transition-all shadow-sm" />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTags.map((item) => (
            <motion.div layout key={item.id} className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
              <div className="flex items-center gap-4 mb-6">
                <RenderIcon src={item.icon} name={item.name} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-800 truncate">{item.name}</h3>
                    {item.tagImg && <img src={item.tagImg} alt="tag" className="w-5 h-5 object-contain" title="Official Tag" />}
                  </div>
                  <span className="text-[10px] bg-purple-50 text-purple-600 px-2 py-0.5 rounded-md font-black uppercase tracking-tighter border border-purple-100">
                    {item.tag}
                  </span>
                </div>
              </div>
              <button onClick={() => setSelectedTag(item)} className="w-full bg-gray-50 text-gray-700 py-4 rounded-2xl font-bold hover:bg-purple-600 hover:text-white transition-all">
                تفاصيل السيرفر
              </button>
            </motion.div>
          ))}
        </div>
      </main>

      {/* نافذة الإضافة */}
      <AnimatePresence>
        {showAddForm && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <motion.div initial={{y:100, opacity:0}} animate={{y:0, opacity:1}} className="bg-white p-8 rounded-[2.5rem] w-full max-w-md shadow-2xl overflow-y-auto max-h-[90vh]">
              <h2 className="text-2xl font-black mb-6 text-center">بيانات السيرفر الجديد</h2>
              <form onSubmit={handleAddServer} className="space-y-5">
                <input name="name" required placeholder="اسم السيرفر" className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-purple-400 border border-gray-100" />
                <input name="tag" required placeholder="تاغ السيرفر (بدون .gg/)" className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-purple-400 border border-gray-100" />
                <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100">
                  <p className="text-xs font-bold text-purple-700 mb-3 flex items-center gap-2"><ImageIcon size={14}/> روابط الصور (اختياري)</p>
                  <input name="iconUrl" placeholder="رابط صورة السيرفر (URL)" className="w-full p-3 bg-white rounded-xl outline-none text-sm mb-3 border border-purple-100" />
                  <input name="tagUrl" placeholder="رابط صورة التاغ (URL)" className="w-full p-3 bg-white rounded-xl outline-none text-sm border border-purple-100" />
                </div>
                <button type="submit" className="w-full bg-purple-600 text-white py-5 rounded-2xl font-black shadow-lg">حفظ ونشر السيرفر</button>
                <button type="button" onClick={() => setShowAddForm(false)} className="w-full text-gray-400 font-bold">إلغاء</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* تفاصيل السيرفر */}
      <AnimatePresence>
        {selectedTag && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <motion.div initial={{scale:0.9}} animate={{scale:1}} className="bg-[#121212] text-white w-full max-w-sm rounded-[3rem] overflow-hidden relative shadow-2xl border border-white/5">
              <button onClick={() => setSelectedTag(null)} className="absolute top-6 right-6 bg-white/5 p-2 rounded-full"><X/></button>
              <div className="h-32 bg-gradient-to-br from-indigo-900 to-purple-900 opacity-50"></div>
              <div className="px-8 pb-12 text-center -mt-16">
                <div className="mx-auto mb-6 inline-block">
                  <RenderIcon src={selectedTag.icon} name={selectedTag.name} size="w-32 h-32 border-[8px] border-[#121212]" />
                </div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <h2 className="text-2xl font-black tracking-tight">{selectedTag.name}</h2>
                  <ShieldCheck className="text-blue-500" size={24} />
                </div>
                <p className="text-gray-400 font-medium mb-10 tracking-widest uppercase text-sm">.gg/{selectedTag.tag}</p>
                <a href={`https://discord.gg/${selectedTag.tag}`} target="_blank" rel="noreferrer" className="block w-full bg-white text-black py-5 rounded-[1.5rem] font-black text-xl hover:scale-105 transition-all shadow-xl shadow-white/5">انضم الآن</a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
