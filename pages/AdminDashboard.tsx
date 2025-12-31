
import React, { useState, useEffect, useRef } from 'react';
import { mockApi } from '../api/mockApi';
import { NewsItem, ProductItem, CaseItem, TechnicalSpec, IndustryFeature } from '../types';
import { 
  Newspaper, Package, Briefcase, Plus, Trash2, Edit, Save, 
  X, LogOut, Lock, Cpu, Settings, Code2, ShieldCheck,
  Type, Bold, Italic, List, Link as LinkIcon, Image as ImageIcon,
  Heading1, Heading2, Eye, Code, Upload, ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type ActiveTab = 'news' | 'products' | 'tech' | 'feature' | 'cases' | 'settings';

const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ user: '', psw: '' });
  const [activeTab, setActiveTab] = useState<ActiveTab>('news');
  const [news, setNews] = useState<NewsItem[]>([]);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [techSpecs, setTechSpecs] = useState<TechnicalSpec[]>([]);
  const [features, setFeatures] = useState<IndustryFeature[]>([]);
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [editMode, setEditMode] = useState<'write' | 'preview'>('write');
  const [pswForm, setPswForm] = useState({ old: '', new: '' });
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // 根据当前标签页确定富文本内容对应的字段名
  const getFieldName = () => activeTab === 'products' ? 'fullIntro' : 'content';

  useEffect(() => {
    if (isAuthenticated) loadData();
  }, [isAuthenticated]);

  const loadData = async () => {
    setNews(await mockApi.getNews());
    setProducts(await mockApi.getProducts());
    setTechSpecs(await mockApi.getTechSpecs());
    setFeatures(await mockApi.getFeatures());
    setCases(await mockApi.getCases());
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await mockApi.login(loginForm.user, loginForm.psw);
    if (success) {
      setIsAuthenticated(true);
    } else {
      alert('账号或密码错误');
    }
  };

  const handleUpdatePsw = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await mockApi.updatePassword(pswForm.old, pswForm.new);
    if (res.success) {
      alert('密码修改成功，请重新登录');
      setIsAuthenticated(false);
      setPswForm({ old: '', new: '' });
    } else {
      alert(res.message);
    }
  };

  const handleDelete = async (type: ActiveTab, id: string) => {
    if (!confirm('确定要删除此条记录吗？')) return;
    if (type === 'news') await mockApi.deleteNews(id);
    if (type === 'products') await mockApi.deleteProduct(id);
    if (type === 'tech') await mockApi.deleteTechSpec(id);
    if (type === 'feature') await mockApi.deleteFeature(id);
    if (type === 'cases') await mockApi.deleteCase(id);
    loadData();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'news') await mockApi.saveNews(editingItem);
    if (activeTab === 'products') await mockApi.saveProduct(editingItem);
    if (activeTab === 'tech') await mockApi.saveTechSpec(editingItem);
    if (activeTab === 'feature') await mockApi.saveFeature(editingItem);
    if (activeTab === 'cases') await mockApi.saveCase(editingItem);
    setEditingItem(null);
    loadData();
  };

  const insertTag = (before: string, after: string = '') => {
    if (!textareaRef.current) return;
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selection = text.substring(start, end);
    const replacement = before + selection + after;
    
    const fieldName = getFieldName();
    const newValue = text.substring(0, start) + replacement + text.substring(end);
    
    setEditingItem({
      ...editingItem,
      [fieldName]: newValue
    });

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selection.length);
    }, 0);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      insertTag(`<img src="${base64}" alt="uploaded image" class="w-full rounded-2xl shadow-lg my-6" />`);
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.readAsDataURL(file);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        {/* 背景修饰 */}
        <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500 rounded-full blur-[120px]"></div>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-white/20 animate-fadeIn relative z-10">
          <div className="flex flex-col items-center mb-10">
            <div className="p-4 bg-slate-900 rounded-2xl mb-4 shadow-xl shadow-green-900/10">
              <Cpu className="w-10 h-10 text-green-500" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">嘉禾云网・管理中枢</h1>
            <p className="text-slate-400 text-sm mt-2 text-center font-medium leading-relaxed">
              请输入您的管理员凭证以继续<br/>
              <span className="text-[10px] font-black uppercase tracking-widest text-green-600/60 mt-1 block">Security Node Authorization</span>
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">管理员账号</label>
              <input 
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 focus:bg-white outline-none transition-all text-slate-900 font-bold placeholder-slate-400 shadow-inner"
                placeholder="Account Username"
                value={loginForm.user}
                onChange={e => setLoginForm({...loginForm, user: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">访问密码</label>
              <input 
                type="password"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 focus:bg-white outline-none transition-all text-slate-900 font-bold placeholder-slate-400 shadow-inner"
                placeholder="Access Password"
                value={loginForm.psw}
                onChange={e => setLoginForm({...loginForm, psw: e.target.value})}
                required
              />
            </div>
            <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black hover:bg-slate-800 transition-all transform active:scale-95 shadow-2xl shadow-slate-300 mt-2 text-sm tracking-widest uppercase">
              身份验证并进入
            </button>
            <button type="button" onClick={() => navigate('/')} className="w-full text-slate-400 text-xs hover:text-green-600 text-center font-black uppercase tracking-widest transition-colors">
              返回官网门户
            </button>
          </form>
        </div>
      </div>
    );
  }

  const currentList = () => {
    switch(activeTab) {
      case 'news': return news;
      case 'products': return products;
      case 'tech': return techSpecs;
      case 'feature': return features;
      case 'cases': return cases;
      default: return [];
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-72 bg-slate-900 text-slate-400 flex flex-col shadow-2xl shrink-0">
        <div className="p-8 border-b border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-green-900/50">嘉</div>
          <div>
            <div className="text-white font-bold leading-tight">管理系统</div>
            <div className="text-[10px] uppercase tracking-tighter opacity-50 font-black">Jiahe Admin v1.0</div>
          </div>
        </div>
        
        <nav className="flex-1 p-6 space-y-2 overflow-y-auto no-scrollbar">
          {[
            { id: 'news', icon: Newspaper, label: '新闻维护' },
            { id: 'products', icon: Package, label: '产品体系' },
            { id: 'tech', icon: Code2, label: '技术说明' },
            { id: 'feature', icon: ShieldCheck, label: '行业特色' },
            { id: 'cases', icon: Briefcase, label: '案例维护' },
            { id: 'settings', icon: Settings, label: '安全设置' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ActiveTab)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl font-bold transition-all ${
                activeTab === tab.id ? 'bg-green-600 text-white shadow-lg shadow-green-900/40' : 'hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <tab.icon size={20} /> {tab.label}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-800">
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="w-full flex items-center justify-center gap-2 py-4 border border-slate-700 rounded-2xl hover:bg-red-600/10 hover:text-red-500 hover:border-red-500/50 transition-all font-black text-xs uppercase tracking-widest"
          >
            <LogOut size={16} /> 退出登录
          </button>
        </div>
      </aside>

      <main className="flex-1 p-10 overflow-auto no-scrollbar">
        {activeTab !== 'settings' && (
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-black text-slate-800">
                {activeTab === 'news' && '新闻动态维护'}
                {activeTab === 'products' && '产品体系维护'}
                {activeTab === 'tech' && '核心技术说明'}
                {activeTab === 'feature' && '核心行业特色'}
                {activeTab === 'cases' && '典型案例维护'}
              </h2>
              <p className="text-slate-400 mt-1 font-medium tracking-tight">管理官网动态内容与产品资料库</p>
            </div>
            <button 
              onClick={() => {
                setEditingItem(activeTab === 'feature' ? { type: 'green' } : {});
                setEditMode('write');
              }}
              className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 shadow-2xl shadow-slate-200 transition-all transform hover:-translate-y-1 text-sm tracking-widest uppercase"
            >
              <Plus size={20} className="text-green-500" /> 发布新内容
            </button>
          </div>
        )}

        {activeTab === 'settings' ? (
          <div className="max-w-md bg-white p-12 rounded-[3rem] shadow-sm border border-slate-100 mx-auto mt-20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-blue-600"></div>
            <h2 className="text-2xl font-black mb-10 flex items-center gap-3 text-slate-900"><Lock className="text-blue-500" /> 修改管理密码</h2>
            <form onSubmit={handleUpdatePsw} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest ml-1">当前旧密码</label>
                <input 
                  type="password"
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white text-slate-900 font-bold transition-all shadow-inner placeholder-slate-400"
                  placeholder="Current Password"
                  value={pswForm.old}
                  onChange={e => setPswForm({...pswForm, old: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest ml-1">设定新密码</label>
                <input 
                  type="password"
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white text-slate-900 font-bold transition-all shadow-inner placeholder-slate-400"
                  placeholder="New Secure Password"
                  value={pswForm.new}
                  onChange={e => setPswForm({...pswForm, new: e.target.value})}
                  required
                />
              </div>
              <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black hover:bg-slate-800 transition-all shadow-xl mt-4 text-sm tracking-widest uppercase">保存新密码</button>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">标题 / 名称</th>
                  <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">属性信息</th>
                  <th className="px-8 py-6 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">管理操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {currentList().map((item: any) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="font-bold text-slate-900 mb-1 group-hover:text-green-600 transition-colors">{item.title || item.name}</div>
                      <div className="text-xs text-slate-400 truncate w-64">{item.summary || item.shortIntro || '详细内容详见详情'}</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        {item.isSticky && <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded text-[10px] font-black uppercase tracking-tight">置顶</span>}
                        {item.type && <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tight ${item.type === 'green' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>{item.type}</span>}
                        <span className="text-xs font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">{item.date || item.industry || '动态内容'}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-3">
                        <button onClick={() => {
                          setEditingItem(item);
                          setEditMode('write');
                        }} className="p-3 text-slate-600 hover:bg-slate-900 hover:text-white rounded-xl transition-all hover:scale-105 shadow-sm hover:shadow-lg"><Edit size={16} /></button>
                        <button onClick={() => handleDelete(activeTab, item.id)} className="p-3 text-slate-600 hover:bg-red-600 hover:text-white rounded-xl transition-all hover:scale-105 shadow-sm hover:shadow-lg"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {currentList().length === 0 && <div className="p-24 text-center text-slate-300 font-black uppercase tracking-[0.3em] italic opacity-40">暂无数据记录</div>}
          </div>
        )}
      </main>

      {/* Rich Text Editor Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-[60] bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-6 animate-fadeIn">
          <div className="bg-white w-full max-w-7xl rounded-[3rem] shadow-2xl flex flex-col max-h-[95vh] overflow-hidden border border-white/20">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50 relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-green-600"></div>
              <div>
                <h3 className="text-2xl font-black text-slate-900">内容编辑器工作台</h3>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">Workspace / {activeTab}</p>
              </div>
              <button onClick={() => setEditingItem(null)} className="p-3 hover:bg-red-50 hover:text-red-600 rounded-2xl text-slate-400 transition-all"><X size={24} /></button>
            </div>

            <form onSubmit={handleSave} className="flex-1 overflow-hidden p-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-4 space-y-8 overflow-y-auto pr-4 no-scrollbar">
                <div className="space-y-3">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">显示名称 / 主标题</label>
                  <input 
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 focus:bg-white font-bold transition-all shadow-inner text-slate-900 placeholder-slate-400"
                    placeholder="请输入展示标题"
                    value={editingItem.title || editingItem.name || ''}
                    onChange={e => setEditingItem({...editingItem, [activeTab === 'products' ? 'name' : 'title']: e.target.value})}
                    required
                  />
                </div>

                {activeTab === 'feature' && (
                  <div className="space-y-3">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">行业特色风格</label>
                    <select 
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 focus:bg-white font-bold shadow-inner text-slate-900 cursor-pointer"
                      value={editingItem.type}
                      onChange={e => setEditingItem({...editingItem, type: e.target.value})}
                    >
                      <option value="green">工业绿色 (智能制造系统)</option>
                      <option value="blue">科技蓝色 (高效协同平台)</option>
                    </select>
                  </div>
                )}

                {activeTab === 'news' && (
                  <div className="flex items-center gap-4 p-6 bg-red-50/50 rounded-[2rem] border border-red-100/50 shadow-sm group cursor-pointer transition-colors hover:bg-red-50" onClick={() => setEditingItem({...editingItem, isSticky: !editingItem.isSticky})}>
                    <input 
                      type="checkbox" 
                      id="sticky-edit"
                      className="w-6 h-6 rounded-lg accent-red-600 cursor-pointer"
                      checked={editingItem.isSticky || false}
                      onChange={e => setEditingItem({...editingItem, isSticky: e.target.checked})}
                      onClick={e => e.stopPropagation()}
                    />
                    <label htmlFor="sticky-edit" className="text-xs font-black text-red-900 cursor-pointer select-none uppercase tracking-widest">全局置顶显示</label>
                  </div>
                )}

                {activeTab === 'cases' && (
                  <div className="space-y-3">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">应用所属行业</label>
                    <input 
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white shadow-inner text-slate-900 font-bold placeholder-slate-400"
                      value={editingItem.industry || ''}
                      onChange={e => setEditingItem({...editingItem, industry: e.target.value})}
                      placeholder="例如：高端装备制造"
                    />
                  </div>
                )}

                {(activeTab !== 'feature') && (
                  <div className="space-y-3">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">展示封面 URL</label>
                    <input 
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 focus:bg-white shadow-inner text-slate-900 font-bold placeholder-slate-400"
                      value={editingItem.imageUrl || ''}
                      onChange={e => setEditingItem({...editingItem, imageUrl: e.target.value})}
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>
                )}

                {(activeTab === 'news' || activeTab === 'products' || activeTab === 'cases') && (
                  <div className="space-y-3">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">列表摘要说明</label>
                    <textarea 
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none h-40 resize-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 focus:bg-white shadow-inner text-slate-900 font-medium leading-relaxed placeholder-slate-400"
                      placeholder="简短的摘要介绍，支持多行输入..."
                      value={editingItem.summary || editingItem.shortIntro || ''}
                      onChange={e => setEditingItem({...editingItem, [activeTab === 'products' ? 'shortIntro' : 'summary']: e.target.value})}
                    />
                  </div>
                )}
              </div>

              <div className="lg:col-span-8 flex flex-col h-full min-h-[500px]">
                <div className="flex items-center justify-between mb-4 px-2">
                  <div className="flex items-center gap-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">正文深度内容编排</label>
                    <div className="flex bg-slate-100 p-1.5 rounded-2xl">
                      <button 
                        type="button"
                        onClick={() => setEditMode('write')}
                        className={`px-6 py-2 rounded-xl text-[10px] font-black flex items-center gap-2 transition-all uppercase tracking-widest ${editMode === 'write' ? 'bg-white shadow-lg text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
                      >
                        <Code size={12} className={editMode === 'write' ? 'text-green-600' : ''} /> Source Code
                      </button>
                      <button 
                        type="button"
                        onClick={() => setEditMode('preview')}
                        className={`px-6 py-2 rounded-xl text-[10px] font-black flex items-center gap-2 transition-all uppercase tracking-widest ${editMode === 'preview' ? 'bg-white shadow-lg text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
                      >
                        <Eye size={12} className={editMode === 'preview' ? 'text-blue-600' : ''} /> Full Preview
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex-1 bg-slate-50 border border-slate-200 rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl relative">
                  {editMode === 'write' && (
                    <div className="bg-slate-100/80 backdrop-blur-sm p-3 border-b border-slate-200 flex flex-wrap gap-2 sticky top-0 z-10">
                      <div className="flex gap-1 bg-white p-1 rounded-xl shadow-sm">
                        <button type="button" onClick={() => insertTag('<b>', '</b>')} className="p-2.5 hover:bg-slate-100 rounded-lg transition-all text-slate-600" title="加粗"><Bold size={16}/></button>
                        <button type="button" onClick={() => insertTag('<i>', '</i>')} className="p-2.5 hover:bg-slate-100 rounded-lg transition-all text-slate-600" title="斜体"><Italic size={16}/></button>
                      </div>
                      <div className="flex gap-1 bg-white p-1 rounded-xl shadow-sm">
                        <button type="button" onClick={() => insertTag('<h1>', '</h1>')} className="p-2.5 hover:bg-slate-100 rounded-lg transition-all text-slate-600 font-black text-xs" title="H1">H1</button>
                        <button type="button" onClick={() => insertTag('<h2>', '</h2>')} className="p-2.5 hover:bg-slate-100 rounded-lg transition-all text-slate-600 font-black text-xs" title="H2">H2</button>
                      </div>
                      <div className="flex gap-1 bg-white p-1 rounded-xl shadow-sm">
                        <button type="button" onClick={() => insertTag('<ul>\n  <li>', '</li>\n</ul>')} className="p-2.5 hover:bg-slate-100 rounded-lg transition-all text-slate-600" title="列表"><List size={16}/></button>
                        <button type="button" onClick={() => {
                          const url = prompt('请输入链接地址', 'http://');
                          if(url) insertTag(`<a href="${url}" target="_blank" class="text-green-600 font-bold hover:underline">`, '</a>');
                        }} className="p-2.5 hover:bg-slate-100 rounded-lg transition-all text-slate-600" title="链接"><LinkIcon size={16}/></button>
                      </div>
                      
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleImageUpload} 
                        accept="image/*" 
                        className="hidden" 
                      />
                      <button 
                        type="button" 
                        onClick={() => fileInputRef.current?.click()} 
                        className="p-2.5 bg-green-600 hover:bg-green-500 text-white rounded-xl transition-all flex items-center gap-2 font-black text-[10px] uppercase tracking-widest shadow-lg shadow-green-900/20" 
                        title="选择本地图片插入"
                      >
                        <ImageIcon size={14}/> Add Visual Asset
                      </button>

                      <div className="w-px h-6 bg-slate-300 mx-2 self-center opacity-50" />
                      <button type="button" onClick={() => insertTag('<p>', '</p>')} className="p-2.5 hover:bg-white rounded-xl transition-all text-slate-400" title="段落标签"><Type size={16}/></button>
                    </div>
                  )}

                  <div className="flex-1 relative overflow-auto no-scrollbar">
                    {editMode === 'write' ? (
                      <textarea 
                        ref={textareaRef}
                        className="w-full h-full p-10 bg-transparent outline-none font-mono text-sm leading-relaxed resize-none text-slate-900 placeholder-slate-400"
                        value={editingItem[getFieldName()] || ''}
                        onChange={e => setEditingItem({...editingItem, [getFieldName()]: e.target.value})}
                        placeholder="使用上方工具栏快捷键或在此直接输入 HTML 内容..."
                      />
                    ) : (
                      <div className="w-full h-full p-12 overflow-auto bg-white prose prose-slate max-w-none shadow-inner">
                        <div dangerouslySetInnerHTML={{ __html: editingItem[getFieldName()] || '<div class="h-64 flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-[2rem]"><p class="text-slate-300 font-black uppercase tracking-[0.4em] italic">Awaiting source input...</p></div>' }} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </form>

            <div className="p-10 border-t border-slate-100 bg-slate-50 flex justify-end gap-5">
              <button type="button" onClick={() => setEditingItem(null)} className="px-10 py-4 text-slate-400 font-black hover:bg-slate-200 rounded-2xl transition-all uppercase tracking-widest text-xs">取消所有改动</button>
              <button onClick={handleSave} className="px-12 py-4 bg-slate-900 text-white font-black rounded-2xl shadow-2xl shadow-slate-300 hover:shadow-slate-400 transition-all transform hover:-translate-y-1 flex items-center gap-3 uppercase tracking-widest text-xs">
                <Save size={18} className="text-green-500" /> 同步到生产环境
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
