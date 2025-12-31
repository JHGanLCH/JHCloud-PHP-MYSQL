
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { MessageSquare, Send, X, Bot, Sparkles, Loader2, User } from 'lucide-react';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: '您好！我是嘉禾云网 AI 助手。我可以为您解答关于智能制造、工业大模型以及我们的数字化解决方案。' }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: '你现在是北京嘉禾云网科技有限公司的智能专家。你需要以专业、科技感且礼貌的口吻回答问题。核心理念是 AI 驱动智能制造。公司产品包括设备物联网、iMES、iEMIS、iAPE等。回答要简洁有力。',
          maxOutputTokens: 500,
          temperature: 0.7,
        }
      });

      const aiResponse = response.text || '抱歉，我现在正忙于处理工业大数据，请稍后再试。';
      setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, { role: 'ai', text: '连接 AI 脑核时出现波动，请检查网络。' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-80 md:w-96 h-[500px] glass-panel rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-fadeIn ai-glow">
          {/* Header */}
          <div className="bg-slate-900/80 p-4 border-b border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-600 rounded-lg">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-sm">嘉禾智脑 AI 专家</h4>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-[10px] text-slate-400">在线支持中</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar bg-slate-950/20">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-white/5 border border-white/10 text-slate-200'
                }`}>
                  <div className="flex items-center gap-2 mb-1 opacity-50">
                    {msg.role === 'user' ? <User size={12}/> : <Bot size={12}/>}
                    <span className="text-[10px] uppercase font-bold tracking-tighter">
                      {msg.role === 'user' ? 'You' : 'Jiahe AI'}
                    </span>
                  </div>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/10 p-3 rounded-2xl">
                  <Loader2 className="w-5 h-5 animate-spin text-green-500" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-slate-900/50 border-t border-white/10">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="询问智能制造相关问题..."
                className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500 transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={loading}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-green-500 hover:text-green-400 disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </div>
            <div className="mt-2 flex justify-center">
               <div className="flex items-center gap-1 text-[9px] text-slate-500 font-bold uppercase tracking-widest">
                 <Sparkles size={10} className="text-blue-500" /> Powered by Jiahe Industrial LLM
               </div>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="group relative p-4 bg-green-600 hover:bg-green-500 text-white rounded-2xl shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 ai-glow"
        >
          <div className="absolute -top-1 -right-1">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
          </div>
          <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-[10px] font-bold py-1 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none uppercase tracking-widest border border-white/10">
            AI 专家在线
          </div>
        </button>
      )}
    </div>
  );
};

export default AIAssistant;
