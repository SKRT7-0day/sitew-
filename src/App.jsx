import React, { useState, useEffect } from 'react';
import { Tag, Moon, Sun, ExternalLink, LogIn, Users, Plus, Loader2 } from 'lucide-react';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [serverUrl, setServerUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [joinCount, setJoinCount] = useState(0);
  const [tags, setTags] = useState([]);

  // جلب البيانات من MongoDB فور تحميل الصفحة
  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => {
        setJoinCount(data.totalJoins || 0);
        // إذا كان خزانك يحتوي على قائمة السيرفرات في نفس الـ API
        if(data.servers) setTags(data.servers);
      })
      .catch(err => console.error("Database Error:", err));
  }, []);

  const handleAddServer = async () => {
    if (!serverUrl.includes('discord.gg/')) return;
    setLoading(true);
    try {
      const inviteCode = serverUrl.split('/').pop();
      const response = await fetch(`https://discord.com/api/v9/invites/${inviteCode}?with_counts=true`);
      const d = await response.json();
      
      const newServer = {
        name: d.guild.name,
        tag: d.guild.name.substring(0, 4).toUpperCase(),
        members: (d.approximate_member_count / 1000).toFixed(1) + 'K',
        icon: `https://cdn.discordapp.com/icons/${d.guild.id}/${d.guild.icon}.png`,
        invite: serverUrl
      };

      // إرسال السيرفر الجديد ليتم حفظه في MongoDB
      await fetch('/api/stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add_server', server: newServer })
      });

      setTags([newServer, ...tags]);
      setServerUrl('');
    } catch (error) {
      console.error("Save failed");
    }
    setLoading(false);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#0F1115] text-white' : 'bg-gray-50 text-black'}`}>
      <nav className="p-4 flex justify-between items-center border-b border-gray-800">
        <div className="flex items-center gap-2 font-black text-xl">
           <Tag className="text-purple-600"/> TAGS.<span className="text-purple-600">SKRT7</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-purple-600 px-3 py-1.5 rounded-lg text-xs font-bold">Login</button>
          <button onClick={() => setDarkMode(!darkMode)}><Sun size={18} className="text-yellow-500"/></button>
        </div>
      </nav>

      <header className="py-12 text-center">
        <h1 className="text-3xl font-black mb-6">Discord <span className="text-purple-600">Tags</span> Gallery</h1>
        
        <div className="max-w-md mx-auto flex gap-2 px-4 mb-8">
          <button onClick={handleAddServer} className="bg-purple-600 p-3 rounded-xl">
            {loading ? <Loader2 className="animate-spin" size={20}/> : <Plus size={20}/>}
          </button>
          <input 
            value={serverUrl}
            onChange={(e) => setServerUrl(e.target.value)}
            placeholder="https://discord.gg/..." 
            className="flex-1 bg-[#16191F] border border-gray-800 p-3 rounded-xl text-sm outline-none"
          />
        </div>

        <div className="flex justify-center gap-4">
          <div className="bg-[#16191F] border border-gray-800 p-4 rounded-2xl min-w-[100px]">
             <div className="text-xl font-bold text-blue-500">{joinCount}</div>
             <div className="text-[9px] text-gray-500 font-bold uppercase">Total Joins</div>
          </div>
          <div className="bg-[#16191F] border border-gray-800 p-4 rounded-2xl min-w-[100px]">
             <div className="text-xl font-bold text-purple-500">{tags.length}</div>
             <div className="text-[9px] text-gray-500 font-bold uppercase">Total Tags</div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {tags.map((s, i) => (
          <div key={i} className="bg-[#16191F] border border-gray-800 p-5 rounded-[2rem]">
            <div className="flex items-center gap-3 mb-4">
              <img src={s.icon} className="w-12 h-12 rounded-xl bg-gray-700" onError={(e) => e.target.src="https://ui-avatars.com/api/?background=6366f1&color=fff"}/>
              <div className="overflow-hidden text-left">
                <h3 className="font-bold text-sm truncate">{s.name}</h3>
                <span className="text-[10px] text-purple-500 font-bold">#{s.tag}</span>
              </div>
            </div>
            <button onClick={() => window.open(s.invite, '_blank')} className="w-full bg-purple-600 py-2.5 rounded-xl text-sm font-bold">Join Server</button>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;

