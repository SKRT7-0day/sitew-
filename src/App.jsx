import React, { useState, useEffect } from 'react';
import { Tag, ExternalLink, Plus, Loader2 } from 'lucide-react';

function App() {
  const [serverUrl, setServerUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [joinCount, setJoinCount] = useState(0);

  // جلب البيانات المخزنة فعلياً عند تحميل الصفحة
  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => {
        setJoinCount(data.totalJoins || 0);
        setTags(data.servers || []); // جلب السيرفرات المخزنة في MongoDB
      })
      .catch(err => console.error("خطأ في الاتصال بالخزان:", err));
  }, []);

  const handleAddServer = async () => {
    if (!serverUrl.includes('discord.gg/')) return alert("الرابط غير صحيح");
    setLoading(true);
    
    try {
      const inviteCode = serverUrl.split('/').pop();
      const response = await fetch(`https://discord.com/api/v9/invites/${inviteCode}?with_counts=true`);
      const d = await response.json();
      
      const newServer = {
        name: d.guild.name,
        tag: d.guild.name.substring(0, 4).toUpperCase(), // جلب التاق
        members: (d.approximate_member_count / 1000).toFixed(1) + 'K',
        icon: `https://cdn.discordapp.com/icons/${d.guild.id}/${d.guild.icon}.png`,
        invite: serverUrl
      };

      // إرسال البيانات للحفظ الدائم في MongoDB
      const saveRes = await fetch('/api/stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'ADD_SERVER', // نحدد للخلفية أننا نريد إضافة سيرفر
          server: newServer 
        })
      });

      if (saveRes.ok) {
        const updatedData = await saveRes.json();
        setTags(updatedData.servers); // تحديث القائمة من قاعدة البيانات مباشرة
        setServerUrl('');
      }
    } catch (error) {
      alert("فشل الحفظ في قاعدة البيانات");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0F1115] text-white p-6 font-sans">
      <header className="text-center py-10">
        <h1 className="text-4xl font-black mb-6 italic">Discord <span className="text-purple-600">Tags</span> Gallery</h1>
        
        <div className="max-w-md mx-auto flex gap-2 mb-8 bg-[#16191F] p-2 rounded-2xl border border-gray-800">
          <input 
            value={serverUrl}
            onChange={(e) => setServerUrl(e.target.value)}
            placeholder="ضع رابط سيرفرك هنا..." 
            className="flex-1 bg-transparent p-2 outline-none text-sm"
          />
          <button onClick={handleAddServer} className="bg-purple-600 p-3 rounded-xl hover:bg-purple-700 transition-all">
            {loading ? <Loader2 className="animate-spin" size={20}/> : <Plus size={20}/>}
          </button>
        </div>

        <div className="flex justify-center gap-4">
          <div className="bg-[#16191F] border border-gray-800 px-6 py-3 rounded-2xl text-center">
            <div className="text-2xl font-black text-purple-500">{tags.length}</div>
            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Total Tags</div>
          </div>
          <div className="bg-[#16191F] border border-gray-800 px-6 py-3 rounded-2xl text-center">
            <div className="text-2xl font-black text-blue-500">{joinCount}</div>
            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Total Joins</div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {tags.map((s, i) => (
          <div key={i} className="bg-[#16191F] border border-gray-800 p-5 rounded-[2.5rem] hover:border-purple-600/50 transition-all group">
            <div className="flex items-center gap-4 mb-6">
              <img src={s.icon} className="w-14 h-14 rounded-2xl shadow-xl" onError={(e) => e.target.src="https://ui-avatars.com/api/?background=6366f1&color=fff"}/>
              <div className="flex-1 overflow-hidden">
                <h3 className="font-bold text-sm truncate">{s.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                   <span className="text-[10px] bg-purple-600/20 text-purple-400 px-2 py-0.5 rounded-lg border border-purple-600/30 font-bold tracking-tighter">#{s.tag}</span>
                   <span className="text-[10px] text-gray-500 font-medium italic">{s.members} Members</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => window.open(s.invite, '_blank')}
              className="w-full bg-purple-600 py-3 rounded-2xl text-sm font-black group-hover:bg-purple-500 transition-all flex items-center justify-center gap-2"
            >
              Join Server <ExternalLink size={14}/>
            </button>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;
