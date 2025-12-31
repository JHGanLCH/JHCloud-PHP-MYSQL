
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CASE_DATA } from '../constants';
import { ArrowLeft, Quote } from 'lucide-react';

const CaseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const item = CASE_DATA.find(c => c.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!item) return <div className="p-20 text-center text-slate-400">案例内容正在整理中...</div>;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="h-[32rem] bg-slate-900 relative overflow-hidden">
        <img src={item.imageUrl} className="absolute inset-0 w-full h-full object-cover opacity-50 blur-[2px] scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="bg-white/95 backdrop-blur p-5 rounded-[2rem] mb-8 shadow-2xl transform hover:rotate-3 transition-transform">
             <img src={item.logo} alt="Client Logo" className="w-20 h-20 object-contain" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 max-w-5xl drop-shadow-2xl leading-tight">{item.title}</h1>
          <div className="flex items-center gap-4">
            <span className="w-12 h-px bg-green-500" />
            <span className="text-green-400 font-black tracking-[0.3em] uppercase text-sm">{item.industry}</span>
            <span className="w-12 h-px bg-green-500" />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-24 relative z-10 pb-32">
        <div className="bg-white rounded-[3rem] p-10 md:p-20 shadow-2xl border border-slate-100">
           <button 
            onClick={() => navigate(-1)}
            className="mb-12 flex items-center gap-2 text-slate-400 hover:text-green-600 transition-colors font-bold"
          >
            <ArrowLeft className="w-5 h-5" /> 返回行业应用列表
          </button>

          <div className="mb-16 relative">
             <Quote className="w-16 h-16 text-green-50 absolute -top-8 -left-10" />
             <p className="text-2xl md:text-3xl text-slate-800 font-bold italic relative z-10 leading-relaxed">
                "{item.summary}"
             </p>
          </div>

          <div className="prose prose-xl prose-slate max-w-none text-slate-600 leading-loose">
             <div dangerouslySetInnerHTML={{ __html: item.content }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseDetail;
