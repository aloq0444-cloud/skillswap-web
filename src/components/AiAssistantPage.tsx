import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Copy, 
  Check, 
  RotateCcw, 
  BookOpen, 
  Calendar, 
  ListChecks, 
  Clock,
  ArrowRight,
  Square,
  FileText,
  Zap,
  CheckCircle2
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { ChatMessage } from '../types';

interface AiAssistantPageProps {
  onApplyPlanToListing?: (planText: string) => void;
}

export const AiAssistantPage: React.FC<AiAssistantPageProps> = ({ onApplyPlanToListing }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'assistant',
      content: `### Привет! Я твой скоростной ИИ-Ассистент по взаимному обучению 🎓

Я отвечаю **мгновенно** и помогаю сделать ваш обмен знаниями максимально продуктивным:

1. 📋 **Составить персональный учебный план (Syllabus)** на 2–4 недели по любой паре предметов (например, *Python ↔ Английский* или *Figma ↔ React*).
2. ✍️ **Сформировать цепляющий текст заявки**, чтобы быстро найти надежного напарника.
3. ⏱ **Рассчитать тайминг сессии 50/50**, чтобы время делилось честно и без усталости.
4. 💡 **Объяснить сложные концепции** простым языком и составить контрольные вопросы.

*Выберите быструю пару предметов ниже или задайте любой вопрос!*`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedToast, setCopiedToast] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleStopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsLoading(false);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    // Create abort controller for cancelation
    const controller = new AbortController();
    abortControllerRef.current = controller;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const assistantMsgId = `assistant-${Date.now()}`;
    const assistantPlaceholder: ChatMessage = {
      id: assistantMsgId,
      role: 'assistant',
      content: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage, assistantPlaceholder]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
        body: JSON.stringify({
          message: text,
          conversationHistory: messages.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error('Streaming connection failed');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith('data:')) continue;
          const dataStr = trimmed.replace(/^data:\s*/, '');
          if (dataStr === '[DONE]') break;
          try {
            const parsed = JSON.parse(dataStr);
            if (parsed.text) {
              accumulated += parsed.text;
              setMessages(prev =>
                prev.map(m => (m.id === assistantMsgId ? { ...m, content: accumulated } : m))
              );
            }
          } catch {
            // continue streaming parse
          }
        }
      }

      if (!accumulated.trim()) {
        throw new Error('Empty stream response');
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        console.log('User cancelled stream');
        return;
      }
      console.warn('Streaming error, fallback to fast endpoint:', err);
      try {
        const fallbackRes = await fetch('/api/ai/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: text,
            conversationHistory: messages.map(m => ({ role: m.role, content: m.content })),
          }),
        });
        const data = await fallbackRes.json();
        setMessages(prev =>
          prev.map(m =>
            m.id === assistantMsgId
              ? { ...m, content: data.reply || 'Готово! Чем еще могу помочь по взаимному обучению?' }
              : m
          )
        );
      } catch {
        setMessages(prev =>
          prev.map(m =>
            m.id === assistantMsgId
              ? {
                  ...m,
                  content: `### 🎯 Экспертный совет по запросу: «${text}»\n\n#### Структура равноправного обмена 50/50:\n- **00–05 мин:** Синхронизация и постановка микро-целей.\n- **05–30 мин (25 мин):** Блок 1 (Преподает участник А, практикуется участник B).\n- **30–35 мин:** Перерыв 5 минут.\n- **35–60 мин (25 мин):** Блок 2 (Преподает участник B, практикуется участник А).\n\n💡 *Совет:* Вы можете скопировать этот план и обсудить его в чате с напарником!`
                }
              : m
          )
        );
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleCopyMessage = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setCopiedToast(true);
    setTimeout(() => {
      setCopiedId(null);
      setCopiedToast(false);
    }, 2000);
  };

  const handleClearChat = () => {
    if (isLoading) {
      handleStopGeneration();
    }
    setMessages([
      {
        id: 'welcome-msg-reset',
        role: 'assistant',
        content: 'Чат очищен. Какой план или вопрос мы разберем следующим?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ]);
  };

  // Popular skill swap pairings for instant one-click plans
  const skillPairs = [
    {
      title: 'Python ⇄ Английский',
      prompt: 'Составь подробный план парных занятий на 4 недели для обмена: Разговорный Английский (B2) ⇄ Основы Python с нуля. 2 урока в неделю по 60 минут (30/30 мин).',
      badge: 'Хит',
    },
    {
      title: 'Figma / UI ⇄ React',
      prompt: 'Составь учебный план обмена знаниями 50/50: UI/UX дизайн в Figma ⇄ Frontend разработка на React/TypeScript. Практические задания на каждый урок.',
      badge: 'IT & Дизайн',
    },
    {
      title: 'Высш. математика ⇄ Немецкий',
      prompt: 'Сформируй 4-недельную программу обмена: Высшая математика (Мат. анализ) ⇄ Разговорный немецкий для учебы (уровень A2-B1).',
      badge: 'Академический',
    },
    {
      title: 'Гитара ⇄ Digital-маркетинг',
      prompt: 'Напиши план равноправного обучения: Основы игры на гитаре (аккорды, ритм) ⇄ Digital-маркетинг и продвижение проектов.',
      badge: 'Творчество',
    },
  ];

  const quickPrompts = [
    {
      title: 'Шаблон объявления об обмене',
      icon: BookOpen,
      prompt: 'Помоги написать привлекательное и грамотное объявление для платформы SkillSwap: я обучаю Figma и UI/UX дизайну, а взамен ищу репетитора по разговорному английскому.',
    },
    {
      title: 'Как делить время 50/50?',
      icon: Clock,
      prompt: 'Как правильно организовать равноправный урок по 60-90 минут, чтобы оба участника получили максимум пользы и не устали?',
    },
    {
      title: 'Чек-лист для первой встречи',
      icon: ListChecks,
      prompt: 'Составь чек-лист для первой ознакомительной встречи с партнером по взаимному обучению: о чем договориться и как проверить уровень знаний.',
    },
    {
      title: '3 вопроса для проверки знаний',
      icon: Calendar,
      prompt: 'Предложи 3 интерактивных вопроса или мини-теста, чтобы проверить, действительно ли напарник усвоил пройденный материал.',
    },
  ];

  // Dynamic follow-up suggestion chips
  const followUpSuggestions = [
    '➕ Добавь домашние задания к каждому занятию',
    '✍️ Напиши текст объявления для напарника',
    '⏱ Как провести первое занятие по этому плану?',
    '🎯 Напиши 3 проверочных вопроса для напарника',
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Header Banner with Speed Indicator */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-[#0F392B] rounded-3xl p-6 sm:p-7 text-white shadow-lg mb-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-semibold tracking-wide text-emerald-200 mb-2.5 border border-white/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <Zap className="w-3.5 h-3.5 text-emerald-300" />
              <span>Gemini Flash High-Speed Engine • Ответ ~0.7 сек</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              ИИ-Ассистент взаимного обучения
            </h1>
            <p className="text-emerald-100/90 text-xs sm:text-sm mt-1 max-w-xl">
              Мгновенные учебные планы 1-on-1, идеальные заявки на обмен и методические советы для сессий 50/50.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={handleClearChat}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-medium transition-colors border border-white/15 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Очистить диалог</span>
            </button>
          </div>
        </div>

        {/* Quick Skill Pairs */}
        <div className="mt-5 pt-4 border-t border-white/15">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-200 mb-2">
            Готовые программы обмена в один клик:
          </p>
          <div className="flex flex-wrap gap-2">
            {skillPairs.map((pair, idx) => (
              <button
                key={idx}
                id={`ai-preset-pair-${idx}`}
                onClick={() => handleSendMessage(pair.prompt)}
                disabled={isLoading}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-white transition-all hover:scale-102 active:scale-98 cursor-pointer"
              >
                <Sparkles className="w-3 h-3 text-emerald-300" />
                <span className="font-medium">{pair.title}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-emerald-400/30 text-emerald-100">
                  {pair.badge}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Prompt Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {quickPrompts.map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={idx}
              id={`ai-quick-prompt-${idx}`}
              onClick={() => handleSendMessage(item.prompt)}
              disabled={isLoading}
              className="flex items-start gap-2.5 p-3 rounded-2xl bg-white border border-emerald-100 hover:border-emerald-300 hover:shadow-xs transition-all text-left group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <span className="text-xs font-bold text-gray-900 group-hover:text-emerald-800 line-clamp-2 block leading-snug">
                  {item.title}
                </span>
                <span className="text-[10px] text-gray-500 mt-0.5 flex items-center gap-1">
                  <span>Запустить</span>
                  <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Chat Messages Box */}
      <div className="bg-white rounded-3xl border border-emerald-100 shadow-sm flex flex-col h-[580px] overflow-hidden">
        
        {/* Messages list */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5 bg-[#FAFCFB]">
          {messages.map((msg, index) => {
            const isUser = msg.role === 'user';
            const isCopied = copiedId === msg.id;
            const isLatestAssistant = !isUser && index === messages.length - 1;

            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-9 h-9 rounded-2xl bg-[#0F392B] text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <Bot className="w-5 h-5 text-emerald-300" />
                  </div>
                )}

                <div className={`max-w-[90%] sm:max-w-[80%] rounded-3xl p-4 sm:p-5 shadow-2xs relative group ${
                  isUser
                    ? 'bg-[#0F392B] text-white rounded-br-none'
                    : 'bg-white border border-emerald-100 text-gray-800 rounded-bl-none shadow-xs'
                }`}>
                  
                  {/* Content */}
                  {isUser ? (
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  ) : msg.content ? (
                    <div className="prose prose-sm max-w-none text-gray-800 leading-relaxed space-y-2.5 [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-emerald-950 [&_h4]:text-sm [&_h4]:font-bold [&_h4]:text-emerald-900 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:text-xs sm:[&_li]:text-sm [&_li]:my-1 [&_p]:text-xs sm:[&_p]:text-sm [&_blockquote]:border-l-4 [&_blockquote]:border-emerald-500 [&_blockquote]:bg-emerald-50/80 [&_blockquote]:p-3 [&_blockquote]:rounded-r-xl [&_blockquote]:text-emerald-950 [&_code]:bg-emerald-50 [&_code]:text-emerald-800 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-md [&_code]:font-mono">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                      {isLoading && messages[messages.length - 1]?.id === msg.id && (
                        <span className="inline-block w-1.5 h-3.5 bg-emerald-600 ml-0.5 animate-pulse align-middle" />
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 py-1">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                      <span className="text-xs text-emerald-800 font-medium ml-1">Мгновенный ответ генерируется...</span>
                    </div>
                  )}

                  {/* Message Footer & Actions */}
                  {Boolean(msg.content) && (
                    <div className={`flex flex-wrap items-center justify-between gap-2 mt-3 pt-2 text-[11px] ${
                      isUser ? 'text-emerald-200 border-t border-white/10' : 'text-gray-400 border-t border-gray-100'
                    }`}>
                      <div className="flex items-center gap-2">
                        <span>{msg.timestamp}</span>
                        {!isUser && (
                          <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                            Gemini Flash
                          </span>
                        )}
                      </div>

                      {!isUser && (
                        <div className="flex items-center gap-2">
                          {onApplyPlanToListing && (msg.content.includes('план') || msg.content.includes('План')) && (
                            <button
                              onClick={() => onApplyPlanToListing(msg.content)}
                              className="flex items-center gap-1 px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg font-medium transition-colors cursor-pointer"
                              title="Использовать как план обмена"
                            >
                              <FileText className="w-3 h-3" />
                              <span>Применить в карточку</span>
                            </button>
                          )}

                          <button
                            onClick={() => handleCopyMessage(msg.id, msg.content)}
                            className="flex items-center gap-1 hover:text-emerald-700 transition-colors cursor-pointer px-2 py-1 rounded-lg hover:bg-gray-50"
                            title="Скопировать ответ"
                          >
                            {isCopied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                            <span>{isCopied ? 'Скопировано!' : 'Копировать'}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Dynamic Follow-up Suggestions for latest message */}
                  {isLatestAssistant && !isLoading && Boolean(msg.content) && (
                    <div className="mt-3 pt-2.5 border-t border-emerald-100/60">
                      <p className="text-[10px] font-semibold text-emerald-800 uppercase tracking-wider mb-1.5">
                        Быстрое продолжение:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {followUpSuggestions.map((suggestion, sIdx) => (
                          <button
                            key={sIdx}
                            onClick={() => handleSendMessage(suggestion)}
                            className="text-[11px] px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/60 transition-colors text-left cursor-pointer"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                </div>

                {isUser && (
                  <div className="w-9 h-9 rounded-2xl bg-emerald-100 text-emerald-900 flex items-center justify-center shrink-0 font-bold text-xs">
                    <User className="w-5 h-5 text-emerald-800" />
                  </div>
                )}
              </div>
            );
          })}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-emerald-100">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              id="ai-chat-input"
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Напишите пару предметов, вопрос по теме или запрос на учебный план..."
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-emerald-50/50 border border-emerald-200 rounded-2xl text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            />

            {isLoading ? (
              <button
                type="button"
                onClick={handleStopGeneration}
                className="px-4 h-12 bg-amber-600 hover:bg-amber-700 text-white rounded-2xl flex items-center gap-1.5 shadow-md transition-all active:scale-95 cursor-pointer shrink-0 text-xs font-semibold"
                title="Остановить генерацию"
              >
                <Square className="w-4 h-4 fill-white" />
                <span className="hidden sm:inline">Стоп</span>
              </button>
            ) : (
              <button
                id="ai-chat-send-btn"
                type="submit"
                disabled={!inputMessage.trim()}
                className="w-12 h-12 bg-[#0F392B] hover:bg-[#164e3b] disabled:bg-gray-200 disabled:cursor-not-allowed text-white rounded-2xl flex items-center justify-center shadow-md transition-all active:scale-95 cursor-pointer shrink-0"
                aria-label="Отправить сообщение"
              >
                <Send className="w-5 h-5 text-emerald-300" />
              </button>
            )}
          </form>

          <div className="flex items-center justify-between text-[11px] text-gray-500 mt-2 px-1">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>Gemini Flash High-Speed Engine • Ответ без задержек</span>
            </span>
            <span>Нажмите Enter для отправки</span>
          </div>
        </div>

      </div>

      {/* Copy Toast */}
      {copiedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F392B] text-white px-4 py-2.5 rounded-2xl shadow-xl border border-emerald-500/30 flex items-center gap-2 text-xs animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Текст скопирован в буфер обмена</span>
        </div>
      )}

    </div>
  );
};
