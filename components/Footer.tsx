
import React from 'react';
import { MapPin, Phone, Mail, ShieldCheck, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <h3 className="text-white text-xl font-black mb-6 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-green-600 rounded-full"></span>
              嘉禾云网
            </h3>
            <p className="text-sm leading-relaxed mb-8 opacity-70">
              面向制造业企业提供智能化解决方案和软硬件产品的创新型高技术企业。以“引领智能制造、塑造智慧企业”为核心理念，打造国内一流的智能制造平台。
            </p>
            <div className="flex gap-4">
               <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-green-600/20 transition-colors cursor-pointer group">
                  <Globe className="w-5 h-5 text-slate-500 group-hover:text-green-500" />
               </div>
               <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-green-600/20 transition-colors cursor-pointer group">
                  <ShieldCheck className="w-5 h-5 text-slate-500 group-hover:text-green-500" />
               </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <h3 className="text-white text-sm font-black uppercase tracking-widest mb-6">联系信息</h3>
            <ul className="space-y-5 text-sm">
              <li className="flex items-start gap-4 group">
                <MapPin className="w-5 h-5 text-green-500 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="opacity-80">北京市大兴区生物医药基地庆丰西路27号</span>
              </li>
              <li className="flex items-center gap-4 group">
                <Phone className="w-5 h-5 text-blue-500 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="opacity-80">010-84505763</span>
              </li>
              <li className="flex items-center gap-4 group">
                <Mail className="w-5 h-5 text-green-500 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="opacity-80">contact@jiaheyunwang.com</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h3 className="text-white text-sm font-black uppercase tracking-widest mb-6">快速链接</h3>
            <div className="grid grid-cols-1 gap-4 text-sm font-medium">
              <Link to="/about" className="hover:text-green-500 transition-colors opacity-70 hover:opacity-100 flex items-center gap-2">
                 发现公司
              </Link>
              <Link to="/products" className="hover:text-green-500 transition-colors opacity-70 hover:opacity-100 flex items-center gap-2">
                 产品体系
              </Link>
              <a href="http://210.12.53.106:97/" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition-colors opacity-70 hover:opacity-100 flex items-center gap-2">
                 在线体验
              </a>
            </div>
          </div>

          <div className="lg:col-span-1">
            <h3 className="text-white text-sm font-black uppercase tracking-widest mb-6">系统入口</h3>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-4">Internal Access Only</p>
              <Link to="/admin" className="inline-flex items-center gap-3 bg-slate-800 hover:bg-slate-700 text-white px-5 py-3 rounded-xl text-xs font-bold transition-all w-full justify-center">
                <ShieldCheck size={16} className="text-green-500" /> 管理后台登录
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-500 font-bold tracking-widest uppercase">
          <p>© {new Date().getFullYear()} 北京嘉禾云网科技有限公司 版权所有</p>
          <div className="flex items-center gap-4">
            <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors">
              京ICP备16060152号-1
            </a>
            <span className="w-1 h-1 bg-slate-800 rounded-full"></span>
            <span>Made with Industrial AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
