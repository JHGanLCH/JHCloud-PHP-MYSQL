
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockApi } from '../api/mockApi';
import { ProductItem, CaseItem, TechnicalSpec, IndustryFeature, ProductTab } from '../types';
// Added ArrowRight to lucide-react imports
import { Box, Code2, ShieldCheck, Factory, ArrowRight } from 'lucide-react';

const Products: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ProductTab>('core');
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [techSpecs, setTechSpecs] = useState<TechnicalSpec[]>([]);
  const [features, setFeatures] = useState<IndustryFeature[]>([]);
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      setProducts(await mockApi.getProducts());
      setTechSpecs(await mockApi.getTechSpecs());
      setFeatures(await mockApi.getFeatures());
      setCases(await mockApi.getCases());
    };
    loadData();
  }, []);

  const tabs = [
    { id: 'core', name: '产品体系', icon: <Box className="w-5 h-5" /> },
    { id: 'tech', name: '技术说明', icon: <Code2 className="w-5 h-5" /> },
    { id: 'feature', name: '行业特色', icon: <ShieldCheck className="w-5 h-5" /> },
    { id: 'case', name: '案例介绍', icon: <Factory className="w-5 h-5" /> },
  ];

  const industries = ['all', ...Array.from(new Set(cases.map(c => c.industry)))];
  const filteredCases = selectedIndustry === 'all' 
    ? cases 
    : cases.filter(c => c.industry === selectedIndustry);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-slate-900 py-24 text-center overflow-hidden relative">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-500/20 via-transparent to-transparent"></div>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-6 relative z-10 ai-text-glow uppercase tracking-tight">产品体系与解决方案</h1>
        <p className="text-slate-400 max-w-2xl mx-auto px-6 relative z-10 leading-relaxed font-medium">
          构建全场景工业数字化闭环，从核心智能制造大脑到行业深度定制应用，助力企业实现智慧化跨越。
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 -mt-10 relative z-20">
        <div className="flex flex-wrap gap-4 mb-16 bg-white p-3 rounded-3xl shadow-2xl overflow-x-auto no-scrollbar border border-slate-100">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ProductTab)}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black transition-all whitespace-nowrap text-sm tracking-widest uppercase ${
                activeTab === tab.id 
                  ? 'bg-green-600 text-white shadow-[0_10px_25px_rgba(22,163,74,0.3)]' 
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {tab.icon}
              {tab.name}
            </button>
          ))}
        </div>

        <div className="animate-fadeIn">
          {activeTab === 'core' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {products.map((product) => (
                <div 
                  key={product.id}
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="group bg-white rounded-[2rem] p-8 shadow-sm hover:shadow-2xl transition-all cursor-pointer border border-slate-100 hover:border-green-200 flex flex-col h-full"
                >
                  <div className="h-56 mb-8 rounded-2xl overflow-hidden bg-slate-50 relative">
                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-green-600 transition-colors leading-tight">{product.name}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow opacity-80">{product.shortIntro}</p>
                  <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">View Details</span>
                     <div className="w-10 h-10 bg-slate-50 group-hover:bg-green-600 group-hover:text-white rounded-xl flex items-center justify-center transition-all">
                        <ArrowRight size={18} />
                     </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'tech' && (
            <div className="bg-white rounded-[3rem] p-12 md:p-20 shadow-sm border border-slate-100 space-y-24">
              {techSpecs.length > 0 ? techSpecs.map((tech, idx) => (
                <section key={tech.id} className="animate-slideUp max-w-5xl mx-auto">
                  <div className="flex flex-col md:flex-row gap-16 items-center">
                    <div className="md:w-1/2 space-y-8">
                       <h3 className="text-3xl font-black text-slate-900 leading-tight">
                         <div className="w-12 h-1.5 bg-green-600 rounded-full mb-4" /> 
                         {tech.title}
                       </h3>
                       <div className="prose prose-lg prose-slate text-slate-600 leading-loose opacity-90">
                         <div dangerouslySetInnerHTML={{ __html: tech.content }} />
                       </div>
                    </div>
                    {tech.imageUrl && (
                      <div className="md:w-1/2 rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.1)] border border-slate-100 transform hover:-rotate-1 transition-transform">
                        <img src={tech.imageUrl} alt={tech.title} className="w-full h-auto object-cover" />
                      </div>
                    )}
                  </div>
                  {idx !== techSpecs.length - 1 && <div className="mt-24 border-t border-slate-50" />}
                </section>
              )) : (
                <div className="text-center py-20 text-slate-400 font-bold tracking-widest uppercase">暂无技术说明内容</div>
              )}
            </div>
          )}

          {activeTab === 'feature' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {features.length > 0 ? features.map((feature) => (
                <div 
                  key={feature.id}
                  className={`bg-white p-12 rounded-[3rem] border-t-[12px] shadow-sm transition-all hover:shadow-2xl border border-slate-100 ${
                    feature.type === 'green' ? 'border-t-green-600' : 'border-t-blue-600'
                  }`}
                >
                  <h3 className="text-2xl font-black mb-8 text-slate-900 flex items-center gap-4">
                     <span className={`w-3 h-3 rounded-full ${feature.type === 'green' ? 'bg-green-600' : 'bg-blue-600'}`}></span>
                     {feature.title}
                  </h3>
                  <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-lg opacity-90">
                    <div dangerouslySetInnerHTML={{ __html: feature.content }} />
                  </div>
                </div>
              )) : (
                <div className="col-span-2 text-center py-20 text-slate-400 font-bold tracking-widest uppercase">暂无行业特色内容</div>
              )}
            </div>
          )}

          {activeTab === 'case' && (
            <div>
              <div className="flex flex-wrap gap-3 mb-12 overflow-x-auto no-scrollbar pb-2">
                {industries.map(ind => (
                  <button
                    key={ind}
                    onClick={() => setSelectedIndustry(ind)}
                    className={`px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap border ${
                      selectedIndustry === ind 
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xl' 
                        : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200'
                    }`}
                  >
                    {ind === 'all' ? '全部行业' : ind}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {filteredCases.length > 0 ? filteredCases.map(item => (
                  <div 
                    key={item.id}
                    onClick={() => navigate(`/case/${item.id}`)}
                    className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all flex flex-col lg:flex-row cursor-pointer border border-slate-100 h-full"
                  >
                    <div className="lg:w-2/5 h-64 lg:h-auto overflow-hidden relative">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent lg:hidden"></div>
                    </div>
                    <div className="p-10 lg:w-3/5 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-green-50 text-green-700 font-black text-[10px] uppercase tracking-widest rounded-lg">{item.industry}</span>
                      </div>
                      <h4 className="text-xl font-black text-slate-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight">{item.title}</h4>
                      <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed opacity-80 italic">"{item.summary}"</p>
                      <div className="mt-8 flex items-center text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] group-hover:text-green-600 transition-colors">
                         Case Analysis <ArrowRight size={14} className="ml-2" />
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="col-span-2 text-center py-20 text-slate-400 font-bold tracking-widest uppercase">该行业下暂无案例</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
