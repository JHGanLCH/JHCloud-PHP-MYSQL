
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { COMPANY_INTRO, NEWS_DATA } from '../constants';

const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'intro' | 'news'>('intro');
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 4;
  const navigate = useNavigate();

  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = NEWS_DATA.slice(indexOfFirstNews, indexOfLastNews);
  const totalPages = Math.ceil(NEWS_DATA.length / newsPerPage);

  return (
    <div className="min-h-screen bg-white">
      {/* Banner */}
      <div className="h-64 bg-slate-900 flex items-center justify-center relative">
        <img src="https://picsum.photos/seed/about/1600/400" className="absolute inset-0 w-full h-full object-cover opacity-50" />
        <h1 className="relative text-4xl font-bold text-white tracking-widest">发现公司</h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex border-b border-slate-200 mb-12">
          <button
            onClick={() => setActiveTab('intro')}
            className={`px-8 py-4 text-lg font-bold transition-all border-b-2 ${
              activeTab === 'intro' ? 'text-green-600 border-green-600' : 'text-slate-400 border-transparent'
            }`}
          >
            公司简介
          </button>
          <button
            onClick={() => setActiveTab('news')}
            className={`px-8 py-4 text-lg font-bold transition-all border-b-2 ${
              activeTab === 'news' ? 'text-green-600 border-green-600' : 'text-slate-400 border-transparent'
            }`}
          >
            公司新闻
          </button>
        </div>

        {activeTab === 'intro' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                <span className="w-2 h-8 bg-green-600 rounded-full" />
                关于嘉禾云网
              </h2>
              <div className="text-slate-600 leading-relaxed space-y-4 text-lg">
                {COMPANY_INTRO.split('。').map((p, i) => p && <p key={i}>{p}。</p>)}
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img src="https://picsum.photos/seed/team/800/600" alt="Office" />
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid gap-6">
              {currentNews.map((news) => (
                <div 
                  key={news.id} 
                  onClick={() => navigate(`/news/${news.id}`)}
                  className="group flex flex-col md:flex-row bg-slate-50 hover:bg-white rounded-xl overflow-hidden border border-slate-100 hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className="md:w-64 h-48 shrink-0">
                    <img src={news.imageUrl} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="p-8">
                    <span className="text-sm text-slate-400 font-mono mb-2 block">{news.date}</span>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-green-600">{news.title}</h3>
                    <p className="text-slate-500 line-clamp-2">{news.summary}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-12">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-md transition-colors ${
                    currentPage === i + 1 ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default About;
