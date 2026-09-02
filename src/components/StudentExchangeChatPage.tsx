import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  User, 
  Calendar, 
  Video, 
  Sparkles, 
  Check, 
  CheckCheck, 
  Clock, 
  Repeat, 
  Search, 
  Star, 
  MapPin, 
  ArrowRight, 
  Plus, 
  ExternalLink,
  MessageSquare,
  ChevronRight,
  Filter,
  CheckCircle2,
  X,
  PhoneCall,
  Flame
} from 'lucide-react';
import { StudentConversation, StudentChatMessage } from '../types';

interface StudentExchangeChatPageProps {
  conversations: StudentConversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onSendMessage: (conversationId: string, text: string, type?: StudentChatMessage['type'], scheduleData?: any) => void;
  onAcceptSchedule?: (conversationId: string, scheduleData: any) => void;
  onViewProfile?: (userId: string) => void;
  onNavigateToExplore?: () => void;
}

export const StudentExchangeChatPage: React.FC<StudentExchangeChatPageProps> = ({
  conversations,
  activeConversationId,
  onSelectConversation,
  onSendMessage,
  onAcceptSchedule,
  onViewProfile,
  onNavigateToExplore,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'outgoing' | 'incoming'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('Завтра в 19:00');
  const [scheduledFormat, setScheduledFormat] = useState<'online' | 'offline'>('online');
  const [copiedLink, setCopiedLink] = useState(false);
  const [acceptedProposals, setAcceptedProposals] = useState<Record<string, boolean>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Filter conversations
  const filteredConversations = conversations.filter((c) => {
    if (filterMode === 'outgoing' && !c.isInitiatedByMe) return false;
    if (filterMode === 'incoming' && c.isInitiatedByMe) return false;
    if (!searchQuery.trim()) return true;

    const q = searchQuery.toLowerCase();
    return (
      c.partnerName.toLowerCase().includes(q) ||
      c.offeredSkill.toLowerCase().includes(q) ||
      c.requestedSkill.toLowerCase().includes(q)
    );
  });

  // Current active conversation
  const currentConversation = conversations.find((c) => c.id === activeConversationId) || filteredConversations[0] || conversations[0];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentConversation?.messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || !currentConversation) return;

    onSendMessage(currentConversation.id, text, 'text');
    setInputMessage('');

    // Simulate realistic intelligent response from the student partner
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      let replyText = 'Отлично, договорились! Давай сверим детали и назначим точное время звонка.';
      const pName = currentConversation.partnerName;

      if (text.includes('19:00') || text.includes('созвон') || text.includes('время') || text.includes('Meet')) {
        replyText = `Да, в это время мне отлично подходит! Я подготовил план на 60 минут: 30 минут по теме «${currentConversation.offeredSkill}», затем 30 минут по «${currentConversation.requestedSkill}». Ссылка на Google Meet будет активна.`;
      } else if (pName.includes('Дарья')) {
        replyText = 'Супер! Я уже открыла материалы по тонам китайского языка и HSK 1-3. Жду с нетерпением нашего обмена!';
      } else if (pName.includes('Максим')) {
        replyText = 'Отлично! Я собрал Jupiter Notebook с примерами Pandas и визуализацией, скину перед началом урока.';
      } else if (pName.includes('Алексей')) {
        replyText = 'Договорились! Разберем основные формулы механики и кинематики, а потом перейдем к разговорному английскому.';
      } else if (pName.includes('Екатерина')) {
        replyText = 'Замечательно! Посмотрим на твои макеты в Figma и настроим сетку с автолейаутами. До связи!';
      } else if (pName.includes('Илья')) {
        replyText = 'Супер! Разберем основные аккорды и правильную постановку пальцев на грифе гитары.';
      }

      onSendMessage(currentConversation.id, replyText, 'text');
    }, 1300);
  };

  const handleProposeScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentConversation) return;

    const meetLink = `https://meet.google.com/skillswap-${currentConversation.partnerId.replace('user-', '')}-${Date.now().toString().slice(-4)}`;
    
    onSendMessage(
      currentConversation.id,
      `Предложено время совместной сессии: ${scheduledDate}`,
      'schedule_proposal',
      {
        date: scheduledDate,
        time: '60 минут (30 / 30 мин)',
        format: scheduledFormat,
        meetingLink: meetLink,
        status: 'proposed'
      }
    );

    setShowScheduleModal(false);
  };

  const handleAcceptScheduleClick = (msgId: string, scheduleData: any) => {
    if (!currentConversation) return;
    setAcceptedProposals(prev => ({ ...prev, [msgId]: true }));
    if (onAcceptSchedule) {
      onAcceptSchedule(currentConversation.id, scheduleData);
    }
  };

  const handleCopyMeetingLink = (link?: string) => {
    const l = link || 'https://meet.google.com/swap-p2p-session';
    navigator.clipboard.writeText(l);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const quickReplyChips = [
    'Привет! В какие дни тебе удобнее созваниваться?',
    'Давай созвонимся на 45-60 минут в Google Meet',
    'Удобно сегодня в 19:00 по Москве',
    'Какой у тебя сейчас уровень в предмете?',
    'Я подготовил план первого занятия 50/50'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Header Info Banner */}
      <div className="bg-gradient-to-r from-[#0F392B] via-teal-900 to-emerald-950 dark:from-[#061A12] dark:via-[#0B261B] dark:to-[#04120C] rounded-3xl p-5 sm:p-6 text-white shadow-md mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-emerald-800/40">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 dark:bg-emerald-900/60 rounded-full text-xs font-semibold text-emerald-300 mb-2 border border-white/10">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>P2P Студенческий мессенджер</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Чаты по обмену навыками
          </h1>
          <p className="text-emerald-100/80 text-xs sm:text-sm mt-1 max-w-xl">
            Обсуждайте формат, согласовывайте удобное время созвона и обменивайтесь материалами со студентами в реальном времени.
          </p>
        </div>

        {/* Action button to explore */}
        <button
          onClick={onNavigateToExplore}
          className="self-start md:self-auto flex items-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-gray-900 font-bold rounded-2xl text-xs shadow-sm transition-all active:scale-98 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Найти еще напарников</span>
        </button>
      </div>

      {/* Main Chat Layout Container */}
      <div className="bg-white dark:bg-[#0A1D15] rounded-3xl border border-emerald-100 dark:border-emerald-900/60 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px] transition-colors duration-200">
        
        {/* ================= LEFT SIDEBAR (CONVERSATIONS LIST) ================= */}
        <div className="lg:col-span-4 border-r border-emerald-100 dark:border-emerald-900/60 bg-[#FAFCFB] dark:bg-[#071710] flex flex-col">
          
          {/* Filter Navigation Tabs */}
          <div className="p-4 border-b border-emerald-100/80 dark:border-emerald-900/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-gray-500 dark:text-emerald-300/70">
                Диалоги обмена ({conversations.length})
              </span>
            </div>

            {/* Filter Tabs */}
            <div className="grid grid-cols-3 gap-1 p-1 bg-emerald-100/60 dark:bg-emerald-950/80 rounded-xl">
              <button
                onClick={() => setFilterMode('all')}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer text-center ${
                  filterMode === 'all'
                    ? 'bg-white dark:bg-emerald-800 text-emerald-950 dark:text-white shadow-xs'
                    : 'text-emerald-900/70 dark:text-emerald-300/70 hover:text-emerald-950 dark:hover:text-white'
                }`}
              >
                Все ({conversations.length})
              </button>
              <button
                onClick={() => setFilterMode('outgoing')}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer text-center ${
                  filterMode === 'outgoing'
                    ? 'bg-white dark:bg-emerald-800 text-emerald-950 dark:text-white shadow-xs'
                    : 'text-emerald-900/70 dark:text-emerald-300/70 hover:text-emerald-950 dark:hover:text-white'
                }`}
              >
                Отправленные
              </button>
              <button
                onClick={() => setFilterMode('incoming')}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer text-center ${
                  filterMode === 'incoming'
                    ? 'bg-white dark:bg-emerald-800 text-emerald-950 dark:text-white shadow-xs'
                    : 'text-emerald-900/70 dark:text-emerald-300/70 hover:text-emerald-950 dark:hover:text-white'
                }`}
              >
                Входящие
              </button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-gray-400 dark:text-emerald-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Поиск по имени или предмету..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8.5 pr-3 py-2 bg-white dark:bg-[#0D241B] border border-emerald-100 dark:border-emerald-800/80 rounded-xl text-xs text-gray-900 dark:text-emerald-100 placeholder-gray-400 dark:placeholder-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Conversations Scrollable List */}
          <div className="flex-1 overflow-y-auto divide-y divide-emerald-50/80 dark:divide-emerald-950/80 max-h-[540px]">
            {filteredConversations.length === 0 ? (
              <div className="p-8 text-center text-gray-400 dark:text-emerald-500/70 space-y-2">
                <MessageSquare className="w-8 h-8 mx-auto text-emerald-300 dark:text-emerald-600 opacity-60" />
                <p className="text-xs font-medium">Нет диалогов в этой категории</p>
                <button
                  onClick={() => {
                    setFilterMode('all');
                    setSearchQuery('');
                  }}
                  className="text-xs text-emerald-700 dark:text-emerald-400 font-bold underline cursor-pointer"
                >
                  Показать все диалоги
                </button>
              </div>
            ) : (
              filteredConversations.map((conv) => {
                const isSelected = conv.id === currentConversation?.id;
                const lastMsg = conv.messages[conv.messages.length - 1];

                return (
                  <button
                    key={conv.id}
                    id={`chat-item-${conv.id}`}
                    onClick={() => onSelectConversation(conv.id)}
                    className={`w-full p-4 flex items-start gap-3 text-left transition-all cursor-pointer relative ${
                      isSelected
                        ? 'bg-emerald-50/90 dark:bg-emerald-900/40 border-l-4 border-emerald-600 dark:border-emerald-400'
                        : 'hover:bg-gray-50/80 dark:hover:bg-emerald-950/40'
                    }`}
                  >
                    {/* Avatar with status indicator */}
                    <div className="relative shrink-0">
                      <img
                        src={conv.partnerAvatar}
                        alt={conv.partnerName}
                        className="w-12 h-12 rounded-2xl object-cover ring-2 ring-emerald-100 dark:ring-emerald-800"
                      />
                      {conv.onlineStatus === 'online' && (
                        <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-gray-900 rounded-full" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <h4 className="text-xs font-bold text-gray-900 dark:text-emerald-50 truncate flex items-center gap-1">
                          <span>{conv.partnerName}</span>
                          <span className="text-[10px] text-amber-500 font-medium flex items-center">
                            ★{conv.partnerRating}
                          </span>
                        </h4>
                        <span className="text-[10px] text-gray-400 dark:text-emerald-400/60 shrink-0">
                          {lastMsg ? lastMsg.timestamp.split(',').pop()?.trim() : conv.lastActivity}
                        </span>
                      </div>

                      {/* Exchange skill pair badge */}
                      <div className="flex items-center gap-1 my-1">
                        <span className="text-[10px] px-2 py-0.5 rounded-md font-semibold truncate max-w-[200px] bg-emerald-100/70 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-200">
                          {conv.isInitiatedByMe ? 'Вы предложили: ' : 'Входящий: '}
                          {conv.offeredSkill.split(' ')[0]} ⇄ {conv.requestedSkill.split(' ')[0]}
                        </span>
                      </div>

                      {/* Snippet */}
                      <p className="text-[11px] text-gray-500 dark:text-emerald-300/70 truncate leading-snug">
                        {lastMsg ? lastMsg.text : 'Новый диалог'}
                      </p>
                    </div>

                    {/* Unread badge */}
                    {conv.unreadCount > 0 && (
                      <span className="w-4 h-4 bg-emerald-600 text-white rounded-full text-[9px] font-bold flex items-center justify-center shrink-0 self-center">
                        {conv.unreadCount}
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* ================= RIGHT MAIN AREA (ACTIVE CHAT) ================= */}
        {currentConversation ? (
          <div className="lg:col-span-8 flex flex-col h-[640px] bg-white dark:bg-[#091B13]">
            
            {/* Top Bar with Student Info */}
            <div className="p-4 border-b border-emerald-100 dark:border-emerald-900/60 flex items-center justify-between gap-3 bg-white dark:bg-[#091B13] z-10">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative shrink-0">
                  <img
                    src={currentConversation.partnerAvatar}
                    alt={currentConversation.partnerName}
                    className="w-11 h-11 rounded-2xl object-cover ring-2 ring-emerald-200 dark:ring-emerald-700"
                  />
                  {currentConversation.onlineStatus === 'online' && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-gray-900 rounded-full" />
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-extrabold text-gray-900 dark:text-emerald-50 truncate">
                      {currentConversation.partnerName}
                    </h3>
                    <span className="text-xs font-bold text-amber-500 flex items-center gap-0.5">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{currentConversation.partnerRating}</span>
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 dark:text-emerald-300/70 truncate flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-gray-400 dark:text-emerald-500" />
                    <span>{currentConversation.partnerCity}</span>
                    <span>•</span>
                    <span className={currentConversation.onlineStatus === 'online' ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-gray-400'}>
                      {currentConversation.onlineStatus === 'online' ? 'В сети' : 'Был(а) недавно'}
                    </span>
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setShowScheduleModal(true)}
                  className="flex items-center gap-1 px-3 py-2 bg-emerald-50 dark:bg-emerald-900/50 hover:bg-emerald-100 dark:hover:bg-emerald-800/60 text-emerald-800 dark:text-emerald-200 rounded-xl text-xs font-bold transition-colors cursor-pointer border border-emerald-200/60 dark:border-emerald-700/50"
                  title="Предложить дату и время встречи"
                >
                  <Calendar className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-300" />
                  <span className="hidden sm:inline">Назначить сессию</span>
                </button>

                <button
                  onClick={() => handleCopyMeetingLink()}
                  className="flex items-center gap-1 px-3 py-2 bg-gray-50 dark:bg-emerald-950/60 hover:bg-gray-100 dark:hover:bg-emerald-900/40 text-gray-700 dark:text-emerald-200 rounded-xl text-xs font-medium transition-colors cursor-pointer border border-gray-200 dark:border-emerald-800/60"
                  title="Скопировать ссылку на Google Meet"
                >
                  <Video className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="hidden sm:inline">
                    {copiedLink ? 'Скопировано!' : 'Google Meet'}
                  </span>
                </button>

                {onViewProfile && (
                  <button
                    onClick={() => onViewProfile(currentConversation.partnerId)}
                    className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-emerald-200 hover:bg-gray-100 dark:hover:bg-emerald-900/40 rounded-xl transition-colors cursor-pointer"
                    title="Посмотреть анкету студента"
                  >
                    <User className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Pinned Exchange Proposal Card Banner */}
            <div className="px-4 py-2.5 bg-emerald-50/90 dark:bg-emerald-950/60 border-b border-emerald-100 dark:border-emerald-900/60 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-lg bg-emerald-600 text-white shrink-0">
                  <Repeat className="w-3 h-3" />
                </span>
                <span className="text-gray-700 dark:text-emerald-200">
                  Предмет обмена: <strong className="text-emerald-900 dark:text-emerald-100">{currentConversation.offeredSkill}</strong> ⇄ <strong className="text-emerald-900 dark:text-emerald-100">{currentConversation.requestedSkill}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-700 shadow-2xs">
                  {currentConversation.isInitiatedByMe ? 'Вы отправили заявку' : 'Входящая заявка'}
                </span>
                <span className="text-[10px] text-gray-500 dark:text-emerald-400/70">
                  {currentConversation.suggestedSchedule || 'График 50/50'}
                </span>
              </div>
            </div>

            {/* Messages Scroll View */}
            <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-[#FAFCFB] dark:bg-[#071710]">
              {currentConversation.messages.map((msg) => {
                const isMe = msg.isMe !== undefined ? msg.isMe : (msg.senderId === 'user-me' || msg.senderId === 'u-current');
                const isProposalAccepted = acceptedProposals[msg.id];

                return (
                  <div
                    key={msg.id}
                    className={`flex items-end gap-2.5 ${isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    {!isMe && (
                      <img
                        src={currentConversation.partnerAvatar}
                        alt={currentConversation.partnerName}
                        className="w-8 h-8 rounded-xl object-cover mb-1 ring-1 ring-emerald-200 dark:ring-emerald-700 shrink-0"
                      />
                    )}

                    <div
                      className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-3.5 sm:p-4 text-xs sm:text-sm shadow-2xs relative ${
                        isMe
                          ? 'bg-[#0F392B] dark:bg-[#144737] text-white rounded-br-none border border-emerald-700/50'
                          : 'bg-white dark:bg-[#0C2219] border border-emerald-100 dark:border-emerald-800/80 text-gray-800 dark:text-emerald-100 rounded-bl-none shadow-xs'
                      }`}
                    >
                      {/* Special rendering for proposal summary card */}
                      {msg.type === 'proposal_summary' && (
                        <div className="mb-2 p-2.5 rounded-xl bg-white/10 dark:bg-emerald-950/70 border border-white/15 dark:border-emerald-700/40 text-xs space-y-1">
                          <div className="flex items-center gap-1 font-bold text-emerald-300">
                            <Repeat className="w-3 h-3" />
                            <span>Заявка на обмен отправлена</span>
                          </div>
                          <p className="text-[11px] opacity-90">
                            Вы предложили: {currentConversation.offeredSkill} ⇄ Взамен: {currentConversation.requestedSkill}
                          </p>
                        </div>
                      )}

                      {/* Special rendering for schedule proposal */}
                      {msg.type === 'schedule_proposal' && msg.scheduleData && (
                        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/80 text-gray-800 dark:text-emerald-100 rounded-xl border border-emerald-200 dark:border-emerald-800 mb-2 space-y-2">
                          <div className="flex items-center justify-between gap-1.5 font-bold text-xs text-emerald-900 dark:text-emerald-200">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                              <span>Предложение совместного урока</span>
                            </span>
                            <span className="text-[10px] px-2 py-0.5 bg-emerald-200/60 dark:bg-emerald-800 rounded-full font-bold text-emerald-900 dark:text-emerald-100">
                              50/50
                            </span>
                          </div>
                          <div className="text-xs space-y-0.5 text-gray-700 dark:text-emerald-200/90">
                            <p><strong>Дата и время:</strong> {msg.scheduleData.date} ({msg.scheduleData.time})</p>
                            <p><strong>Формат:</strong> {msg.scheduleData.format === 'online' ? 'Онлайн созвон' : 'Офлайн встреча'}</p>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-2 pt-1">
                            {msg.scheduleData.meetingLink && (
                              <a
                                href={msg.scheduleData.meetingLink}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-600 text-white rounded-lg text-[11px] font-bold hover:bg-emerald-700 transition-colors"
                              >
                                <Video className="w-3 h-3" />
                                <span>Google Meet</span>
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            )}

                            {!isMe && !isProposalAccepted && (
                              <button
                                onClick={() => handleAcceptScheduleClick(msg.id, msg.scheduleData)}
                                className="inline-flex items-center gap-1 px-3 py-1 bg-[#0F392B] dark:bg-emerald-500 hover:bg-[#164e3b] dark:hover:bg-emerald-400 text-white dark:text-gray-950 font-bold rounded-lg text-[11px] transition-all cursor-pointer shadow-xs"
                              >
                                <CheckCircle2 className="w-3 h-3" />
                                <span>Принять время</span>
                              </button>
                            )}

                            {isProposalAccepted && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-100 dark:bg-emerald-900/90 text-emerald-800 dark:text-emerald-200 rounded-lg text-[11px] font-bold">
                                <Check className="w-3 h-3" />
                                <span>Время принято</span>
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Text */}
                      <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>

                      {/* Footer */}
                      <div
                        className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${
                          isMe ? 'text-emerald-200/80' : 'text-gray-400 dark:text-emerald-400/60'
                        }`}
                      >
                        <span>{msg.timestamp}</span>
                        {isMe && <CheckCheck className="w-3 h-3 text-emerald-300" />}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-300 animate-in fade-in">
                  <img
                    src={currentConversation.partnerAvatar}
                    alt=""
                    className="w-7 h-7 rounded-xl object-cover"
                  />
                  <div className="px-3 py-2 bg-emerald-50 dark:bg-emerald-900/60 rounded-2xl rounded-bl-none border border-emerald-100 dark:border-emerald-800 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    <span className="text-[11px] text-emerald-700 dark:text-emerald-300 ml-1">{currentConversation.partnerName} печатает...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Reply Chips */}
            <div className="px-4 py-2 bg-white dark:bg-[#091B13] border-t border-emerald-50 dark:border-emerald-900/50 flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-[10px] font-bold text-gray-400 dark:text-emerald-500 uppercase tracking-wider shrink-0">
                Быстрый ответ:
              </span>
              {quickReplyChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(chip)}
                  className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/70 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-900 dark:text-emerald-200 rounded-lg text-xs whitespace-nowrap transition-colors border border-emerald-200/50 dark:border-emerald-800/60 cursor-pointer"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Message Input Box */}
            <div className="p-3 sm:p-4 bg-white dark:bg-[#091B13] border-t border-emerald-100 dark:border-emerald-900/60">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(true)}
                  className="p-2.5 text-gray-400 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 rounded-xl transition-colors cursor-pointer shrink-0"
                  title="Предложить время урока"
                >
                  <Calendar className="w-5 h-5" />
                </button>

                <input
                  id="student-chat-input"
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={`Написать студенту ${currentConversation.partnerName.split(' ')[0]}...`}
                  className="flex-1 px-4 py-3 bg-emerald-50/40 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-xs sm:text-sm text-gray-900 dark:text-emerald-100 placeholder-gray-400 dark:placeholder-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white dark:focus:bg-[#0D261C] transition-all"
                />

                <button
                  id="send-student-message-btn"
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className="px-4 py-3 bg-[#0F392B] dark:bg-emerald-600 hover:bg-[#164e3b] dark:hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-2xl flex items-center gap-1.5 shadow-xs transition-all active:scale-98 cursor-pointer shrink-0"
                >
                  <Send className="w-4 h-4 text-emerald-300 dark:text-emerald-100" />
                  <span className="hidden sm:inline text-xs">Отправить</span>
                </button>
              </form>
            </div>

          </div>
        ) : (
          <div className="lg:col-span-8 flex flex-col items-center justify-center p-12 text-center text-gray-400 dark:text-emerald-500">
            <MessageSquare className="w-12 h-12 text-emerald-300 dark:text-emerald-600 mb-3" />
            <h3 className="text-base font-bold text-gray-800 dark:text-emerald-100">Выберите диалог</h3>
            <p className="text-xs text-gray-500 dark:text-emerald-400 mt-1">
              Нажмите на любого студента из списка слева, чтобы начать или продолжить общение.
            </p>
          </div>
        )}

      </div>

      {/* Schedule Proposal Modal */}
      {showScheduleModal && currentConversation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#0C2219] rounded-3xl max-w-md w-full p-6 shadow-2xl border border-emerald-100 dark:border-emerald-800 relative">
            <button
              onClick={() => setShowScheduleModal(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 dark:hover:text-emerald-200 hover:bg-gray-100 dark:hover:bg-emerald-900/50 rounded-full cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 flex items-center justify-center font-bold">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-emerald-50">
                  Согласовать время занятия
                </h3>
                <p className="text-xs text-gray-500 dark:text-emerald-300/70">
                  Студент: {currentConversation.partnerName}
                </p>
              </div>
            </div>

            <form onSubmit={handleProposeScheduleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-emerald-200 mb-1">
                  Удобная дата и время:
                </label>
                <input
                  type="text"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  placeholder="Например: В среду в 20:00 или Суббота в 14:00"
                  className="w-full px-3.5 py-2.5 bg-emerald-50/50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-gray-900 dark:text-emerald-100 font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-emerald-200 mb-1">
                  Формат встречи:
                </label>
                <select
                  value={scheduledFormat}
                  onChange={(e) => setScheduledFormat(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 bg-emerald-50/50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-gray-900 dark:text-emerald-100 font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option value="online">Онлайн (Google Meet созвон)</option>
                  <option value="offline">Офлайн ({currentConversation.partnerCity})</option>
                </select>
              </div>

              <div className="p-3 bg-emerald-50/60 dark:bg-emerald-950/40 rounded-xl text-[11px] text-emerald-900 dark:text-emerald-200 space-y-1 border border-emerald-100 dark:border-emerald-900/50">
                <p className="font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  Золотое правило 50/50:
                </p>
                <p className="text-gray-600 dark:text-emerald-300/80">
                  Урок длится 60 минут: 30 минут вы учите напарника «{currentConversation.offeredSkill}», а затем 30 минут напарник учит вас «{currentConversation.requestedSkill}».
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="px-4 py-2.5 text-xs font-semibold text-gray-600 dark:text-emerald-300 hover:bg-gray-100 dark:hover:bg-emerald-900/40 rounded-xl transition-colors cursor-pointer"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#0F392B] dark:bg-emerald-600 hover:bg-[#164e3b] dark:hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-xs transition-all active:scale-98 cursor-pointer flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5 text-emerald-300 dark:text-emerald-100" />
                  <span>Отправить напарнику</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
