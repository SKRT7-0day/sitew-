import React, { useState } from 'react';
import { Tag, Moon, Sun, ExternalLink, ShieldCheck, Users } from 'lucide-react';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  // قائمة سيرفراتك - غير الأسماء والروابط والتاقات من هنا مباشرة بكل سهولة!
  const [servers] = useState([
    {
      id: 1,
      name: "SKRT7 OFFICIAL",
      tag: "SKRT",
      members: "12.5K",
      icon: "https://ui-avatars.com/api/?name=SKRT&background=6366f1&color=fff",
      invite: "https://discord.gg/your-link-1",
      verified: true
    },
    {
      id: 2,
      name: "SKRT7 COMMUNITY",
      tag: "SKRT7",
      members: "5.2K",
      icon: "https://ui-avatars.com/api/?name=S2&background=a855f7&color=fff",
      invite: "https://discord.gg/your-link-2",
      verified: false
    }
  ]);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#0F1115] text-white' : 'bg-gray-50 text-black'} font-sans transition-colors duration-300`}>
      
      {/* Navbar */}
      <nav className={`p-4 border-b ${darkMode ? 'border-gray-800 bg-[#0F1115]/80' : 'border-gray-200 bg-white/80'} flex justify-between items-center sticky top-0 z-50 backdrop-blur-md`}>
        <div className="flex items-center gap-2 font-black text-xl tracking-tighter">
          <Tag className="text-purple-500" size={22}/> SKRT7.<span className="text-purple-500">TAGS</span>
        </div>
        <button 
          onClick={() => setDarkMode(!darkMode)} 
          className={`p-2.5 rounded-xl transition-all hover:scale-105 ${darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-white shadow-sm border border-gray-200 text-gray-600'}`}
        >
          {darkMode ? <Sun size={18}/> : <Moon size={18}/>}
        </button>
      </nav>

      {/* Header */}
      <header className="py-16 text-center px-4 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
          Discord <span className="text-purple-500">Clan Tags</span> Gallery
        </h1>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} leading-relaxed`}>
          المعرض الرسمي لتاقات وسيرفرات ديسكورد الخاصة بكلانات SKRT7. تصفح وانضم فوراً.
        </p>

        {/* Stats */}
        <div className="flex justify-center gap-4 mt-8 flex-wrap">
          <div className={`px-6 py-3 rounded-2xl border min-w-[120px] ${darkMode ? 'bg-[#16191F] border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`}>
            <div className="text-2xl font-black text-purple-500">{servers.length}</div>
            <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Total Tags</div>
          </div>
          <div className={`px-6 py-3 rounded-2xl border min-w-[120px] ${darkMode ? 'bg-[#16191F] border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`}>
            <div className="text-2xl font-black text-green-500">Active</div>
            <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Status</div>
          </div>
        </div>
      </header>

      {/* Grid List */}
      <main className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servers.map((srv) => (
          <div 
            key={srv.id} 
            className={`p-6 rounded-[2.5rem] border transition-all duration-300 hover:-translate-y-1 ${darkMode ? 'bg-[#16191F] border-gray-800 hover:border-purple-500/50' : 'bg-white border-gray-200 shadow-md hover:shadow-xl'}`}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <img src={srv.icon} alt={srv.name} className="w-14 h-14 rounded-2xl object-cover shadow-md" />
                {srv.verified && (
                  <div className="absolute -top-1 -right-1 bg-blue-500 text-white p-0.5 rounded-full border-2 border-[#16191F]">
                    <ShieldCheck size={12}/>
                  </div>
                )}
              </div>
              <div className="overflow-hidden flex-1 text-left">
                <h3 className="font-black text-sm truncate">{srv.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded-lg border border-purple-500/20 font-bold">
                    #{srv.tag}
                  </span>
                  <span className="text-[10px] text-gray-500 font-bold flex items-center gap-1">
                    <Users size={12}/> {srv.members}
                  </span>
                </div>
              </div>
            </div>
            
            <a 
              href={srv.invite} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-colors shadow-lg shadow-purple-600/10"
            >
              Join Server <ExternalLink size={14}/>
            </a>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;

