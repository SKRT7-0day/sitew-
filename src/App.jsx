import React, { useState, useEffect } from 'react';
import { Tag, Moon, Sun, ExternalLink, LogIn, Users, Plus, Loader2 } from 'lucide-react';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [serverUrl, setServerUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [joinCount, setJoinCount] = useState(0);
  const [tags, setTags] = useState([]); // سنتركها فارغة لتجلب البيانات من خزانك

  // 1. جلب كل السيرفرات والعدادات من MongoDB عند فتح الموقع
  useEffect(() => {
    const fetchData = async () => {
      try {
        // جلب الإحصائيات (الضغطات)
        const statsRes = await fetch('/api/stats');
        const statsData = await statsRes.json();
        setJoinCount(statsData.totalJoins || 0);

        // جلب قائمة السيرفرات من قاعدة البيانات (تأكد أن لديك API يسمى /api/tags)
        const tagsRes = await fetch('/api/tags');
        const tagsData = await tagsRes.json();
        setTags(tagsData || []);
      } catch (err) {
        console.error("Database connection error:", err);
      }
    };
    fetchData();
  }, []);

  // 2. دالة الجلب التلقائي ثم الحفظ في MongoDB
  const handleAddServer = async () => {
    if (!serverUrl.includes('discord.gg/')) return alert("الرجاء وضع رابط صحيح");
    setLoading(true);
    try {
      const inviteCode = serverUrl.split('/').pop();
      const response = await fetch(`https://discord.com/api/v9/invites/${inviteCode}?with_counts=true`);
      const discordData = await response.json();
      
      const newServer = {
        name: discordData.guild.name,
        tag: discordData.guild.name.substring(0, 4).toUpperCase(),
        members: (discordData.approximate_member_count / 1000).toFixed(1) + 'K',
        icon: `https://cdn.discordapp.com/icons/${discordData.guild.id}/${discordData.guild.icon}.png`,
        invite: serverUrl
      };

      // --- هنا الربط مع خزان MongoDB ---
      const saveRes = await fetch('/api/tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newServer)
      });

      if (saveRes.ok) {
        const savedServer = await saveRes.json();
        setTags([savedServer, ...tags]); // تحديث القائمة فوراً
        setServerUrl('');
      }
    } catch (error) {
      alert("حدث خطأ أثناء الحفظ في قاعدة البيانات");
    }
    setLoading(false);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#0F1115] text-white' : 'bg-gray-50 text-black'}`}>
      <nav className={`p-4 border-b flex justify-between items-center sticky top-0 z-50 ${darkMode ? 'border-gray-800 bg-[#0F1115]/90' : 'border-gray-200 bg-white/90'} backdrop-blur-md`}>
        <div className="flex items-center gap-2 font-black text-xl">
          <Tag className="text-purple-600"/> SKRT7.<span className="text-purple-600">TAGS</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-xl bg-gray-800/50">
            {darkMode ? <Sun size={20} className="text-yellow-400"/> : <Moon size={20}/>}
          </button>
          <button className="bg-purple-600 px-4 py-2 rounded-xl font-bold text-sm">Login</button>
        </div>
      </nav>

      <header className="py-12 text-center px-4">
        <h1 className="text-4xl font-black mb-8 tracking-tight">Discord <span className="text-purple-600">Tags</span> Gallery</h1>
        
        <div className="max-w-md mx-auto flex gap-2 mb-12">
          <input 
            value={serverUrl}
            onChange={(e) => setServerUrl(e.target.value)}
            placeholder="ضع رابط سيرفرك هنا..." 
            className={`flex-1 p-3 rounded-2xl border outline-none transition-all ${darkMode ? 'bg-[#16191F] border-gray-800 focus:border-purple-600' : 'bg-white border-gray-200'}`}
          />
          <button onClick={handleAddServer} className="bg-purple-600 p-3 rounded-2xl hover:bg-purple-700">
            {loading ? <Loader2 className="animate-spin"/> : <Plus/>}
          </button>
        </div>

        <div className="flex justify-center gap-4 flex-wrap">
          {/* العداد يقرأ الآن من طول المصفوفة التي تأتي من MongoDB */}
          <div className={`px-8 py-4 rounded-3xl border ${darkMode ? 'bg-[#16191F] border-gray-800' : 'bg-white border-gray-100'}`}>
            <div className="text-2xl font-black text-purple-500">{tags.length}</div>
            <div className="text-[10px] text-gray-500 uppercase font-black">Total Tags</div>
          </div>
          <div className={`px-8 py-4 rounded-3xl border ${darkMode ? 'bg-[#16191F] border-gray-800' : 'bg-white border-gray-100'}`}>
            <div className="text-2xl font-black text-blue-500">{joinCount}</div>
            <div className="text-[10px] text-gray-500 uppercase font-black">Total Joins</div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tags.map(server => (
          <div key={server._id || server.id} className={`p-5 rounded-[2rem] border transition-all ${darkMode ? 'bg-[#16191F] border-gray-800' : 'bg-white border-gray-100 shadow-sm'}`}>
            <div className="flex items-center gap-4 mb-6">
              <img src={server.icon} className="w-14 h-14 rounded-2xl object-cover bg-gray-700" onError={(e) => e.target.src = "https://ui-avatars.com/api/?background=6366f1&color=fff"}/>
              <div className="overflow-hidden">
                <h3 className="font-bold truncate">{server.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] bg-purple-500/10 text-purple-500 px-2 py-0.5 rounded border border-purple-500/20 font-bold">#{server.tag}</span>
                  <span className="text-[10px] text-gray-500 flex items-center gap-1"><Users size={10}/> {server.members}</span>
                </div>
              </div>
            </div>
            <button onClick={() => window.open(server.invite, '_blank')} className="w-full bg-purple-600 text-white py-3 rounded-2xl font-black text-sm flex items-center justify-center gap-2">
              Join Server <ExternalLink size={14}/>
            </button>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;
