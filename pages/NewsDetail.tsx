
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NEWS_DATA } from '../constants';
import { Calendar, Eye, ArrowLeft } from 'lucide-react';

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const news = NEWS_DATA.find(n => n.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!news) return <div className="p-20 text-center text-slate-400">新闻内容正在加载或已移除...</div>;

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <button 
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-slate-500 hover:text-green-600 transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5" /> 返回新闻列表
        </button>

        <article className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-sm border border-slate-100">
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">
            {news.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm mb-12 pb-8 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-green-500" />
              <span>发布日期：{news.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-blue-500" />
              <span>浏览：{news.views} 次</span>
            </div>
          </div>

          <div className="mb-12 rounded-3xl overflow-hidden shadow-2xl shadow-slate-200">
            <img src={news.imageUrl} alt={news.title} className="w-full h-auto" />
          </div>

          <div className="prose prose-lg prose-slate max-w-none text-slate-600 leading-loose">
            <div dangerouslySetInnerHTML={{ __html: news.content }} />
          </div>
        </article>
      </div>
    </div>
  );
};

export default NewsDetail;
