
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PRODUCTS_DATA, TRIAL_LINK } from '../constants';
import { ArrowLeft, PlayCircle } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = PRODUCTS_DATA.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) return <div className="p-20 text-center text-slate-400">产品信息已下架或不存在</div>;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <button 
          onClick={() => navigate(-1)}
          className="mb-12 flex items-center gap-2 text-slate-500 hover:text-green-600 font-bold transition-colors"
        >
          <ArrowLeft className="w-5 h-5" /> 返回产品中心
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="order-2 lg:order-1 space-y-10">
            <div>
              <div className="inline-block px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-black tracking-widest uppercase mb-4">
                产品体系 - 智能制造
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight mb-6">{product.name}</h1>
              <p className="text-xl text-slate-500 leading-relaxed font-medium italic border-l-4 border-green-500 pl-6">
                {product.shortIntro}
              </p>
            </div>

            <div className="prose prose-lg prose-slate max-w-none text-slate-600 leading-loose">
              <div dangerouslySetInnerHTML={{ __html: product.fullIntro }} />
            </div>

            <div className="pt-10 flex flex-wrap gap-6">
               <a 
                 href={TRIAL_LINK} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="bg-green-600 hover:bg-slate-900 text-white px-10 py-5 rounded-[2rem] font-black shadow-2xl shadow-green-200 flex items-center gap-3 transition-all transform hover:-translate-y-2 active:scale-95"
               >
                 立即开启在线体验 <PlayCircle className="w-6 h-6" />
               </a>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="sticky top-32 rounded-[3rem] overflow-hidden shadow-2xl bg-slate-50 border border-slate-100">
              <img src={product.imageUrl} alt={product.name} className="w-full h-auto hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
