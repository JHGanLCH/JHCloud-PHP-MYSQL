
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, PlayCircle } from 'lucide-react';
import { mockApi } from '../api/mockApi';
import { NewsItem, CaseItem } from '../types';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [cases, setCases] = useState<CaseItem[]>([]);

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1920',
      title: 'AI 驱动智造未来',
      subtitle: '基于工业大模型的下一代智能工厂解决方案',
      tag: 'INDUSTRIAL LLM'
    },
    {
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1920',
      title: '从自动化到自主化',
      subtitle: '全栈工业 AI 赋能，助力制造企业跨越式升级',
      tag: 'SMART EVOLUTION'
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      setNews(await mockApi.getNews());
      setCases(await mockApi.getCases());
    };
    fetchData();

    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // 整理案例：每个行业选一个
  const industries = Array.from(new Set(cases.map(c => c.industry)));
  const homeCases = industries.map(ind => cases.find(c => c.industry === ind)!);

  return (
    <div className="flex flex-col gap-0">
      {/* 第2排：广告图片滚动 (Banner) */}
      <section className="relative h-[600px] md:h-[750px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === activeSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/60 to-transparent z-10" />
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 z-20 flex flex-col items-start justify-center text-left max-w-7xl mx-auto px-6">
              <div className="flex items-center gap-2 mb-6 animate-fadeIn">
                 <div className="px-3 py-1 bg-green-600/20 border border-green-500/50 rounded-full flex items-center gap-2">
                   <Sparkles className="w-4 h-4 text-green-400" />
                   <span className="text-[10px] font-black text-green-400 tracking-widest">{slide.tag}</span>
                 </div>
              </div>
              <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tight ai-text-glow leading-tight">
                {slide.title.split(' ').map((word, i) => (
                  <span key={i} className={i === 0 ? 'text-white' : 'text-green-500'}>{word} </span>
                ))}
              </h1>
              <p className="text-xl md:text-2xl font-medium text-slate-300 opacity-90 mb-10 max-w-2xl leading-relaxed">
                {slide.subtitle}
              </p>
              <div className="flex flex-wrap gap-5">
                <button 
                  onClick={() => navigate('/products')}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-2xl font-black transition-all transform hover:-translate-y-1 flex items-center gap-2 shadow-xl"
                >
                  探索产品体系
                </button>
                <a 
                  href="http://210.12.53.106:97/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group bg-green-600 hover:bg-green-500 text-white px-12 py-5 rounded-2xl font-black transition-all transform hover:-translate-y-1 flex items-center gap-3 shadow-[0_20px_50px_rgba(34,197,94,0.4)] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 skew-x-12"></div>
                  <PlayCircle className="w-6 h-6 animate-pulse" /> 
                  <span className="text-lg">立即在线体验</span>
                </a>
              </div>
            </div>
          </div>
        ))}
        
        {/* Indicators */}
        <div className="absolute bottom-10 left-6 z-30 flex gap-3">
          {slides.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setActiveSlide(i)}
              className={`h-1 transition-all rounded-full ${i === activeSlide ? 'w-12 bg-green-500 shadow-[0_0_10px_#22c55e]' : 'w-4 bg-white/20'}`}
            />
          ))}
        </div>
      </section>

      {/* 第3排：公司新闻 (动态洞察，每排2条，显示3排，共6条) */}
      <section className="py-24 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-black text-white mb-2 ai-text-glow">动态洞察</h2>
              <div className="w-12 h-1 bg-green-600 rounded-full"></div>
            </div>
            <button onClick={() => navigate('/about')} className="text-slate-400 hover:text-green-500 text-sm font-bold flex items-center gap-1 transition-colors">
              更多新闻 <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {news.slice(0, 6).map((item) => (
              <div 
                key={item.id} 
                onClick={() => navigate(`/news/${item.id}`)} 
                className="group flex glass-panel hover:bg-white/5 transition-all rounded-2xl overflow-hidden cursor-pointer h-32 border border-white/5 shadow-lg"
              >
                <div className="w-32 md:w-48 shrink-0 overflow-hidden relative">
                  <img src={item.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.title} />
                  {item.isSticky && (
                    <div className="absolute top-0 left-0 bg-green-600 text-[10px] text-white px-3 py-1 font-black uppercase tracking-wider">置顶</div>
                  )}
                </div>
                <div className="flex-1 px-5 md:px-8 flex flex-col justify-center min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-slate-500 font-mono tracking-wider">{item.date}</span>
                    <ArrowRight size={16} className="text-slate-700 group-hover:text-green-500 transition-colors group-hover:translate-x-1" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-green-400 transition-colors truncate mb-1">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed opacity-80">{item.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 第4排：行业案例展示 (横排，每个行业选1个) */}
      <section className="py-24 border-y border-white/5 bg-[#020617]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
             <h2 className="text-3xl font-black text-white mb-2 ai-text-glow">行业实践</h2>
             <p className="text-slate-500 text-[10px] font-black tracking-[0.4em] uppercase opacity-60">Global AI Case Studies</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {homeCases.map((item) => (
              <div 
                key={item.id} 
                onClick={() => navigate(`/case/${item.id}`)} 
                className="group glass-panel rounded-[2.5rem] p-10 hover:-translate-y-2 transition-all cursor-pointer border border-white/5 flex flex-col gap-8 shadow-xl"
              >
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-white/95 rounded-2xl flex items-center justify-center p-4 shadow-2xl group-hover:rotate-6 transition-transform">
                    <img src={item.logo} className="w-full h-full object-contain" alt="logo" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-green-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">{item.industry}</div>
                    <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors line-clamp-1">{item.title}</h3>
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 italic opacity-90 border-l-2 border-green-900/50 pl-4">
                  "{item.summary}"
                </p>
                <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                  <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Case Profile</span>
                  <div className="text-green-500 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                    <ArrowRight size={20} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
