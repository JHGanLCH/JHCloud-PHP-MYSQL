
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Cpu, ExternalLink } from 'lucide-react';
import React from 'react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { name: '首页', path: '/' },
    { name: '发现公司', path: '/about' },
    { name: '产品介绍', path: '/products' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    if (path === '/products') {
        return location.pathname.startsWith('/products') || 
               location.pathname.startsWith('/product/') || 
               location.pathname.startsWith('/case/');
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="p-2 bg-green-600 rounded-xl group-hover:bg-green-500 transition-all shadow-lg shadow-green-900/40">
              <Cpu className="w-8 h-8 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-black tracking-tight text-white block leading-tight ai-text-glow">嘉禾云网</span>
              <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest block opacity-70">基于AI的新一代智能制造平台</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center">
            {/* 导航区域 */}
            <div className="flex items-center space-x-12">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative py-2 text-[15px] font-bold uppercase tracking-[0.1em] transition-all duration-300 ${
                    isActive(item.path)
                      ? 'text-green-500 ai-text-glow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {item.name}
                  {isActive(item.path) && (
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-green-500 rounded-full shadow-[0_0_8px_#22c55e]"></span>
                  )}
                </Link>
              ))}
            </div>
            
            {/* 按钮区域 */}
            <div className="flex-shrink-0 ml-16">
              <a
                href="http://210.12.53.106:97/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-3 bg-green-600 hover:bg-green-500 text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-xl transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transform hover:-translate-y-0.5 active:scale-95"
              >
                在线体验 <ExternalLink size={14} />
              </a>
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden glass-panel border-t border-white/5 animate-fadeIn">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-4 rounded-xl text-base font-bold ${
                  isActive(item.path)
                    ? 'text-green-500 bg-green-500/5'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="px-4 mt-4">
              <a
                href="http://210.12.53.106:97/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-4 bg-green-600 text-white rounded-xl text-sm font-black uppercase tracking-widest shadow-lg shadow-green-900/20 active:scale-95 transition-all"
              >
                进入在线体验系统 <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
