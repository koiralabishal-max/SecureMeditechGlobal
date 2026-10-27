import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  Loader2, 
  Minimize2, 
  Maximize2, 
  RotateCcw, 
  Copy, 
  Check, 
  FileText, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

interface ChatBotProps {
  isOpen: boolean;
  onToggle: () => void;
  onOpenRfq: () => void;
}

const INITIAL_PROMPT_SUGGESTIONS = [
  'What are your OEM private labeling minimums (MOQ)?',
  'What are standard lead times for catheter kits?',
  'Which Incoterms do you support for air & sea freight?',
  'What cleanroom & ISO certifications do your facilities hold?',
  'Can you assemble a custom OT / ICU surgical combo pack?'
];

export const ChatBot: React.FC<ChatBotProps> = ({ isOpen, onToggle, onOpenRfq }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'model',
      text: "Hello! I'm the **AI Procurement & Technical Specialist** at **Secure MediTech Global**.\n\nI can assist you with:\n• **Lead times & expedited hospital dispatch** (standard 3–5 days, urgent 24–48h)\n• **International logistics & Incoterms** (FOB, CIF, CFR, DAP, DDP door-to-door)\n• **OEM contract manufacturing & MOQs** (custom private labeling from 500 units)\n• **Clinical specifications & ISO 13485 / CE documentation**\n\nHow can I support your facility's procurement today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState<string | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
      // focus input
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [messages, isOpen, isMinimized]);

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = (customPrompt || inputText).trim();
    if (!textToSend || isLoading) return;

    const userMessageId = `user-${Date.now()}`;
    const userMessage: ChatMessage = {
      id: userMessageId,
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Update local state with user message
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputText('');
    setIsLoading(true);

    try {
      // Build multi-turn payload format for @google/genai contents
      // Each turn has: { role: 'user' | 'model', parts: [{ text: string }] }
      const contentsPayload = updatedMessages.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: contentsPayload
        })
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      const botResponseText = data.text || "Thank you for your inquiry. Please reach out directly to our sales desk at info@securemeditechglobal.com or call +1 (307) 533-4504.";

      const modelMessage: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        text: botResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, modelMessage]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'model',
        text: "I experienced a brief connectivity interruption. However, for immediate assistance with lead times, international shipping (CIF/DDP), or OEM orders:\n\n• **Phone:** +1 (307) 533-4504\n• **Email:** info@securemeditechglobal.com\n• **Address:** 30 N Gould St Ste R, Sheridan, WY 82801, USA",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(id);
    setTimeout(() => setIsCopied(null), 2000);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'model',
        text: "Conversation refreshed. I'm ready to answer any questions about our surgical consumables, catheter lines, OEM manufacturing minimums, or international shipping logistics.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Render markdown-like simple format (bold, bullet points, line breaks)
  const renderFormattedText = (rawText: string) => {
    const lines = rawText.split('\n');
    return lines.map((line, idx) => {
      // Bullet point line
      const trimmed = line.trim();
      const isBullet = trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('*');
      const content = isBullet ? trimmed.replace(/^[\s•\-\*]+/, '') : line;

      // Parse bold segments **text**
      const parts = content.split(/(\*\*[^*]+\*\*)/g);
      const renderedParts = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={pIdx} className="font-semibold text-slate-900">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      if (isBullet) {
        return (
          <li key={idx} className="flex items-start gap-2 ml-1 my-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38B6FF] mt-2 shrink-0" />
            <span className="text-slate-700 leading-relaxed">{renderedParts}</span>
          </li>
        );
      }

      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }

      return (
        <p key={idx} className="text-slate-700 leading-relaxed my-1">
          {renderedParts}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={onToggle}
            className="group relative flex items-center gap-3 px-4 py-3.5 bg-gradient-to-r from-[#0B2F63] to-[#124185] hover:from-[#0E3A7B] hover:to-[#174e9e] text-white rounded-full shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:-translate-y-1 active:scale-95 border border-white/20"
            aria-label="Open AI Procurement Specialist"
          >
            {/* Live Indicator Pulse */}
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38B6FF] opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-[#38B6FF] ring-2 ring-white" />
            </span>

            <div className="p-1 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
              <Sparkles className="w-5 h-5 text-[#38B6FF]" />
            </div>
            <div className="text-left hidden sm:block pr-1">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#38B6FF]">
                AI Procurement
              </div>
              <div className="text-xs font-semibold text-white">
                Chat Specialist
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Chat Window Panel */}
      {isOpen && (
        <div 
          className={`fixed z-50 transition-all duration-300 ${
            isMinimized 
              ? 'bottom-6 right-6 w-72 sm:w-80 h-16' 
              : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-[440px] h-[580px] max-h-[88vh]'
          } bg-white rounded-2xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200`}
        >
          {/* Header */}
          <div className="bg-[#0B2F63] text-white px-4 py-3.5 flex items-center justify-between shrink-0 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#38B6FF] to-blue-400 flex items-center justify-center text-[#0B2F63] font-bold shadow-xs">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-[#0B2F63]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-white tracking-tight">
                    AI Procurement Specialist
                  </h3>
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-[#38B6FF]/20 text-[#38B6FF] border border-[#38B6FF]/30">
                    Flash 3.8
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>ISO 13485 Knowledge Base</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-slate-300">
              <button
                onClick={handleResetChat}
                title="Restart conversation"
                className="p-1.5 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Restart conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? 'Expand window' : 'Minimize window'}
                className="p-1.5 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label={isMinimized ? 'Expand' : 'Minimize'}
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={onToggle}
                title="Close chat"
                className="p-1.5 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body when not minimized */}
          {!isMinimized && (
            <>
              {/* Message List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/70 text-xs sm:text-sm">
                {messages.map((msg) => {
                  const isUser = msg.role === 'user';
                  return (
                    <div
                      key={msg.id}
                      className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      {!isUser && (
                        <div className="w-7 h-7 rounded-lg bg-[#0B2F63] text-[#38B6FF] flex items-center justify-center shrink-0 mt-0.5">
                          <Bot className="w-4 h-4" />
                        </div>
                      )}

                      <div className={`max-w-[85%] rounded-2xl px-4 py-3 relative group ${
                        isUser
                          ? 'bg-[#0B2F63] text-white shadow-xs rounded-tr-xs'
                          : 'bg-white text-slate-800 border border-slate-200/90 shadow-2xs rounded-tl-xs'
                      }`}>
                        {/* Text */}
                        {isUser ? (
                          <div className="whitespace-pre-wrap leading-relaxed text-white">
                            {msg.text}
                          </div>
                        ) : (
                          <div className="text-slate-800">
                            {renderFormattedText(msg.text)}
                          </div>
                        )}

                        {/* Timestamp & Utilities */}
                        <div className={`mt-2 flex items-center justify-between gap-3 text-[10px] ${
                          isUser ? 'text-blue-200' : 'text-slate-400'
                        }`}>
                          <span>{msg.timestamp}</span>
                          {!isUser && (
                            <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => handleCopy(msg.id, msg.text)}
                                className="hover:text-slate-600 transition-colors flex items-center gap-1"
                                title="Copy answer"
                              >
                                {isCopied === msg.id ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-600" />
                                    <span className="text-emerald-600">Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    <span>Copy</span>
                                  </>
                                )}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {isUser && (
                        <div className="w-7 h-7 rounded-lg bg-slate-200 text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                          <User className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex gap-2.5 justify-start">
                    <div className="w-7 h-7 rounded-lg bg-[#0B2F63] text-[#38B6FF] flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-tl-xs shadow-2xs flex items-center gap-2 text-slate-500">
                      <Loader2 className="w-4 h-4 animate-spin text-[#38B6FF]" />
                      <span className="text-xs">Consulting catalog & specs...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompt Chips */}
              {messages.length <= 3 && !isLoading && (
                <div className="px-3 py-2 bg-slate-100/70 border-t border-slate-200/80 overflow-x-auto">
                  <div className="flex gap-2">
                    {INITIAL_PROMPT_SUGGESTIONS.map((suggestion, i) => (
                      <button
                        key={i}
                        onClick={() => handleSendMessage(suggestion)}
                        className="text-[11px] font-medium text-slate-700 bg-white hover:bg-blue-50 hover:text-[#0B2F63] hover:border-blue-200 px-3 py-1.5 rounded-full border border-slate-200 shadow-2xs whitespace-nowrap transition-colors flex items-center gap-1 shrink-0"
                      >
                        <span>{suggestion}</span>
                        <ChevronRight className="w-3 h-3 text-slate-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="p-3 bg-white border-t border-slate-200">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-end gap-2"
                >
                  <textarea
                    ref={inputRef}
                    rows={1}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about MOQs, lead times, or specs..."
                    className="flex-1 max-h-24 p-2.5 text-xs sm:text-sm bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#38B6FF] focus:ring-2 focus:ring-[#38B6FF]/20 rounded-xl resize-none outline-none text-slate-800 placeholder-slate-400"
                  />
                  
                  <button
                    type="submit"
                    disabled={!inputText.trim() || isLoading}
                    className="p-2.5 bg-[#0B2F63] hover:bg-[#164082] disabled:opacity-40 text-white rounded-xl shadow-xs transition-colors shrink-0"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

                {/* Footer Assistive Strip */}
                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1 text-slate-400">
                    Press <kbd className="px-1 py-0.2 bg-slate-100 border border-slate-200 rounded text-[9px]">Enter</kbd> to send
                  </span>
                  <button
                    onClick={onOpenRfq}
                    className="text-[#0B2F63] hover:text-[#38B6FF] font-semibold flex items-center gap-1 transition-colors"
                  >
                    <FileText className="w-3 h-3 text-[#38B6FF]" />
                    <span>Open RFQ Form</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
