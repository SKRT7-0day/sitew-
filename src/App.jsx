import React, { useState, useEffect } from 'react';
import { Tag, Moon, Sun, ExternalLink, Plus, Loader2 } from 'lucide-react';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [serverUrl, setServerUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [joinCount, setJoinCount] = useState(0);
  const [tags, setTags] = useState([]); 

  // جلب البيانات عند فتح الموقع
  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => {
        setJoinCount(data.totalJoins || 0);
        setTags(data.servers || []); 
      })
      .catch(err => console.error("Database Error:", err));
  }, []);

  // دالة إضافة السيرفر (محدثة لتعمل فوراً على الشاشة)
  const handleAddServer = async () => {
    if (!serverUrl.includes('discord.gg/') && !serverUrl.includes('discord.com/invite/')) {
      return alert("الرجاء وضع رابط ديسكورد صحيح!");
    }
    setLoading(true);
    
    try {
      const inviteCode = serverUrl.split('/').pop();
      // جلب بيانات السيرفر من ديسكورد مباشرة
      const response = await fetch(`https://discord.com/api/v9/invites/${inviteCode}?with_counts=true`);
      const d = await response.json();
      
      if (!d.guild) {
        alert("رابط غير صالح أو السيرفر غير موجود");
        setLoading(false);
        return;
      }

      // تجهيز بيانات السيرفر
      const newServer = {
        id: Date.now(),
        name: d.guild.name,
        tag: d.guild.name.substring(0, 4).toUpperCase(),
        members: d.approximate_member_count > 1000 ? (d.approximate_member_count / 1000).toFixed(1) + 'K' : d.approximate_member_count,
        icon: d.guild.icon ? `https://cdn.discordapp.com/icons/${d.guild.id}/${d.guild.icon}.png` : `https://ui-avatars.com/api/?name=${d.guild.name}&background=6366f1&color=fff`,
        invite: serverUrl
      };

      // 1. عرض السيرفر في الشاشة فوراً (لكي لا تشعر بأي مشكلة)
      setTags(prevTags => [newServer, ...prevTags]);
      setServerUrl('');

      // 2. إرسال البيانات للحفظ في الخلفية (MongoDB) بصمت
      fetch('/api/stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'ADD_SERVER', server: newServer })
      }).catch(err => console.log("خطأ في الحفظ الخلفي", err));

    } catch (err) {
      alert("حدث خطأ في جلب بيانات السيرفر.");
    }
    setLoading(false);
  };

  const handleJoinClick = async (invite) => {
    try {
      fetch('/api/stats', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'INCREMENT_JOIN' }) 
      });
      setJoinCount(prev => prev + 1);
    } catch (err) { console.error(err); }
    window.open(invite, '_blank');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#0F1115] text-white' : 'bg-gray-50 text-black'}`}>
      
      {/* Navbar - تمت إزالة زر Login والتركيز على البساطة */}
      <nav className={`p-4 border-b ${darkMode ? 'border-gray-800 bg-[#0F1115]' : 'border-gray-200 bg-white'} flex justify-between items-center sticky top-0 z-50`}>
        <div className="flex items-center gap-2 font-black text-xl tracking-tighter">
          <Tag className="text-purple-600"/> SKRT7.<span className="text-purple-600">TAGS</span>
        </div>
        <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-xl transition-all hover:scale-110 ${darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-200 text-gray-600'}`}>
          {darkMode ? <Sun size={20}/> : <Moon size={20}/>}
        </button>
      </nav>

      <header className="py-12 text-center px-4">
        <h1 className="text-4xl font-black mb-8 italic">Discord <span className="text-purple-600">Tags</span> Gallery</h1>
        
        {/* صندوق إضافة السيرفر - أصبح هو الأساس الآن */}
        <div className="max-w-md mx-auto flex gap-2 mb-12 bg-[#16191F] p-2 rounded-2xl border border-gray-800 shadow-2xl transition-all focus-within:border-purple-600 focus-within:shadow-purple-600/20">
          <input 
            value={serverUrl}
            onChange={(e) => setServerUrl(e.target.value)}
            placeholder="أضف رابط سيرفرك هنا (https://discord.gg/...)" 
            className="flex-1 bg-transparent p-2 outline-none text-sm font-medium text-white placeholder-gray-500 text-right"
            dir="ltr"
          />
          <button onClick={handleAddServer} className="bg-purple-600 p-3 rounded-xl hover:bg-purple-500 transition-all active:scale-95 text-white flex items-center justify-center min-w-[50px]">
            {loading ? <Loader2 className="animate-spin" size={20}/> : <Plus size={20}/>}
          </button>
        </div>

        {/* الإحصائيات التي تتحدث تلقائياً */}
        <div className="flex justify-center gap-4 flex-wrap">
          {[
            { label: 'Total Tags', val: tags.length, color: 'text-purple-500' },
            { label: 'Status', val: 'Online', color: 'text-green-500' },
            { label: 'Total Joins', val: joinCount, color: 'text-blue-500' }
          ].map((stat, i) => (
            <div key={i} className={`p-4 rounded-2xl border min-w-[110px] ${darkMode ? 'bg-[#16191F] border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`}>
              <div className={`text-2xl font-black ${stat.color}

