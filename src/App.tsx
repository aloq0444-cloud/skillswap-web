import React, { useState, useEffect } from 'react';
import { 
  Header 
} from './components/Header';
import { 
  HomeHero 
} from './components/HomeHero';
import { 
  PopularExchanges 
} from './components/PopularExchanges';
import { 
  WeeklyTopTeachers 
} from './components/WeeklyTopTeachers';
import { 
  HowItWorks 
} from './components/HowItWorks';
import { 
  ExplorePage 
} from './components/ExplorePage';
import { 
  ProfilePage 
} from './components/ProfilePage';
import { 
  AiAssistantPage 
} from './components/AiAssistantPage';
import { 
  DashboardLeaderboardPage 
} from './components/DashboardLeaderboardPage';
import { 
  StudentExchangeChatPage 
} from './components/StudentExchangeChatPage';
import { 
  ExchangeModal 
} from './components/ExchangeModal';
import { 
  CreateListingModal 
} from './components/CreateListingModal';
import { 
  AuthModal 
} from './components/AuthModal';
import { 
  ReviewModal 
} from './components/ReviewModal';

import { 
  UserProfile, 
  ActiveTab, 
  ExchangeProposal, 
  ActiveSession, 
  Category, 
  SkillLevel,
  StudentConversation,
  StudentChatMessage,
  ThemeMode
} from './types';
import { 
  CURRENT_USER, 
  INITIAL_USERS, 
  INITIAL_PROPOSALS, 
  INITIAL_ACTIVE_SESSIONS,
  INITIAL_CONVERSATIONS
} from './mockData';
import { 
  GraduationCap, 
  Sparkles, 
  Heart, 
  ShieldCheck, 
  BookOpen, 
  CheckCircle,
  Repeat,
  MessageSquare
} from 'lucide-react';

export default function App() {
  // Global State & Theme
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('skillswap-theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    localStorage.setItem('skillswap-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [currentUser, setCurrentUser] = useState<UserProfile>(CURRENT_USER);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [users, setUsers] = useState<UserProfile[]>(INITIAL_USERS);
  const [selectedProfileUser, setSelectedProfileUser] = useState<UserProfile>(INITIAL_USERS[0]);

  // Proposals & Sessions
  const [proposals, setProposals] = useState<ExchangeProposal[]>(INITIAL_PROPOSALS);
  const [activeSessions, setActiveSessions] = useState<ActiveSession[]>(INITIAL_ACTIVE_SESSIONS);

  // Student Exchange Conversations State
  const [conversations, setConversations] = useState<StudentConversation[]>(INITIAL_CONVERSATIONS);
  const [activeChatId, setActiveChatId] = useState<string>(INITIAL_CONVERSATIONS[0]?.id || '');

  // Search & Filter State passed to Explore
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [exploreTeachFilter, setExploreTeachFilter] = useState('');
  const [exploreLearnFilter, setExploreLearnFilter] = useState('');

  // Modals state
  const [isExchangeModalOpen, setIsExchangeModalOpen] = useState(false);
  const [exchangeRecipient, setExchangeRecipient] = useState<UserProfile>(INITIAL_USERS[0]);
  const [isCreateListingModalOpen, setIsCreateListingModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewRecipient, setReviewRecipient] = useState<UserProfile>(INITIAL_USERS[0]);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Scroll to top on tab switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  // Actions
  const handleOpenDirectChatWithUser = (user: UserProfile) => {
    const existing = conversations.find(c => c.partnerId === user.id);
    if (existing) {
      setActiveChatId(existing.id);
      setActiveTab('chats');
      return;
    }

    // Create a new direct student conversation
    const newConvId = `conv-direct-${user.id}`;
    const myTeach = currentUser.teachSkills[0]?.name || 'Обмен знаниями';
    const theirTeach = user.teachSkills[0]?.name || 'Обучение';

    const newConv: StudentConversation = {
      id: newConvId,
      proposalId: `prop-direct-${user.id}`,
      partnerId: user.id,
      partnerName: user.name,
      partnerAvatar: user.avatar,
      partnerRating: user.rating,
      partnerCity: user.city,
      offeredSkill: myTeach,
      requestedSkill: theirTeach,
      suggestedSchedule: 'По договоренности 50/50',
      isInitiatedByMe: true,
      lastActivity: 'Только что',
      unreadCount: 0,
      onlineStatus: 'online',
      messages: [
        {
          id: `msg-${Date.now()}-welcome`,
          senderId: user.id,
          text: `Привет! Я готов поделиться знаниями по «${theirTeach}». Что именно хочешь изучить в первую очередь?`,
          timestamp: 'Только что',
          isMe: false,
          type: 'text',
        },
      ],
    };

    setConversations(prev => [newConv, ...prev]);
    setActiveChatId(newConvId);
    setActiveTab('chats');
    showToast(`Открыт чат с пользователем ${user.name}`);
  };
  const handleOpenProposeExchange = (recipient: UserProfile) => {
    setExchangeRecipient(recipient);
    setIsExchangeModalOpen(true);
  };

  const handleOpenReviewModal = (recipient: UserProfile) => {
    setReviewRecipient(recipient);
    setIsReviewModalOpen(true);
  };

  const handleSelectUserProfile = (user: UserProfile) => {
    setSelectedProfileUser(user);
    setActiveTab('profile');
  };

  const handleSearchExchangeFromHero = (wantToLearn: string, canTeach: string) => {
    setExploreTeachFilter(canTeach);
    setExploreLearnFilter(wantToLearn);
    setGlobalSearchQuery('');
    setActiveTab('explore');
  };

  const handleSelectPopularPair = (teach: string, learn: string) => {
    setExploreTeachFilter(teach);
    setExploreLearnFilter(learn);
    setGlobalSearchQuery('');
    setActiveTab('explore');
  };

  const handleGlobalSearchSubmit = (query: string) => {
    setGlobalSearchQuery(query);
    setExploreTeachFilter('');
    setExploreLearnFilter('');
    setActiveTab('explore');
  };

  const handleSubmitProposal = (proposalData: {
    receiverId: string;
    receiverName: string;
    offeredSkill: string;
    requestedSkill: string;
    message: string;
    format: 'online' | 'offline';
    suggestedSchedule: string;
  }) => {
    const proposalId = `prop-${Date.now()}`;
    const newProposal: ExchangeProposal = {
      id: proposalId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      receiverId: proposalData.receiverId,
      receiverName: proposalData.receiverName,
      offeredSkill: proposalData.offeredSkill,
      requestedSkill: proposalData.requestedSkill,
      message: proposalData.message,
      status: 'pending',
      createdAt: 'Только что',
      format: proposalData.format,
      suggestedSchedule: proposalData.suggestedSchedule,
    };

    setProposals(prev => [newProposal, ...prev]);

    // Create a new active student conversation
    const partner = users.find(u => u.id === proposalData.receiverId);
    const newConversationId = `conv-${proposalId}`;
    const newConversation: StudentConversation = {
      id: newConversationId,
      proposalId: proposalId,
      partnerId: proposalData.receiverId,
      partnerName: proposalData.receiverName,
      partnerAvatar: partner?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      partnerRating: partner?.rating || 4.9,
      partnerCity: partner?.city || 'Онлайн',
      offeredSkill: proposalData.offeredSkill,
      requestedSkill: proposalData.requestedSkill,
      suggestedSchedule: proposalData.suggestedSchedule,
      isInitiatedByMe: true,
      lastActivity: 'Только что',
      unreadCount: 0,
      onlineStatus: 'online',
      messages: [
        {
          id: `msg-${Date.now()}-1`,
          senderId: currentUser.id,
          text: `Запрос на взаимный обмен навыками: ${proposalData.offeredSkill} ⇄ ${proposalData.requestedSkill}`,
          timestamp: 'Только что',
          isMe: true,
          type: 'proposal_summary',
        },
        {
          id: `msg-${Date.now()}-2`,
          senderId: currentUser.id,
          text: proposalData.message,
          timestamp: 'Только что',
          isMe: true,
          type: 'text',
        },
      ],
    };

    setConversations(prev => [newConversation, ...prev]);
    setActiveChatId(newConversationId);
    showToast(`Заявка для ${proposalData.receiverName} отправлена! Чат со студентом открыт.`);
    setActiveTab('chats');
  };

  const handleSendMessageInChat = (
    conversationId: string,
    text: string,
    type: StudentChatMessage['type'] = 'text',
    scheduleData?: any
  ) => {
    const newMessage: StudentChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
      type,
      scheduleData,
    };

    setConversations(prev =>
      prev.map(c => {
        if (c.id === conversationId) {
          return {
            ...c,
            lastActivity: 'Только что',
            messages: [...c.messages, newMessage],
          };
        }
        return c;
      })
    );
  };

  const handleOpenChatWithProposal = (proposalId: string) => {
    let conv = conversations.find(c => c.proposalId === proposalId);
    if (!conv) {
      const prop = proposals.find(p => p.id === proposalId);
      if (prop) {
        const isMe = prop.senderId === currentUser.id;
        const targetPartnerId = isMe ? prop.receiverId : prop.senderId;
        const partner = users.find(u => u.id === targetPartnerId);
        conv = {
          id: `conv-${prop.id}`,
          proposalId: prop.id,
          partnerId: targetPartnerId,
          partnerName: isMe ? prop.receiverName : prop.senderName,
          partnerAvatar: partner?.avatar || (isMe ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250' : prop.senderAvatar),
          partnerRating: partner?.rating || 4.9,
          partnerCity: partner?.city || 'Онлайн',
          offeredSkill: prop.offeredSkill,
          requestedSkill: prop.requestedSkill,
          suggestedSchedule: prop.suggestedSchedule,
          isInitiatedByMe: isMe,
          lastActivity: 'Только что',
          unreadCount: 0,
          onlineStatus: 'online',
          messages: [
            {
              id: `msg-${Date.now()}-1`,
              senderId: prop.senderId,
              text: `Запрос на взаимный обмен навыками: ${prop.offeredSkill} ⇄ ${prop.requestedSkill}`,
              timestamp: prop.createdAt,
              isMe: isMe,
              type: 'proposal_summary',
            },
            {
              id: `msg-${Date.now()}-2`,
              senderId: prop.senderId,
              text: prop.message,
              timestamp: prop.createdAt,
              isMe: isMe,
              type: 'text',
            },
          ],
        };
        setConversations(prev => [conv!, ...prev]);
      }
    }

    if (conv) {
      setActiveChatId(conv.id);
      setConversations(prev =>
        prev.map(c => (c.id === conv!.id ? { ...c, unreadCount: 0 } : c))
      );
    }
    setActiveTab('chats');
  };

  const handleAcceptProposal = (proposalId: string) => {
    setProposals(prev =>
      prev.map(p => (p.id === proposalId ? { ...p, status: 'accepted' } : p))
    );

    const prop = proposals.find(p => p.id === proposalId);
    if (prop) {
      const newSession: ActiveSession = {
        id: `sess-${Date.now()}`,
        partnerId: prop.senderId,
        partnerName: prop.senderName,
        partnerAvatar: prop.senderAvatar,
        topic: `${prop.offeredSkill} ↔ ${prop.requestedSkill}`,
        myRole: 'both',
        scheduledTime: prop.suggestedSchedule || 'На этой неделе (по согласованию)',
        status: 'upcoming',
        meetingLink: 'https://meet.google.com/swap-p2p-room',
        format: prop.format,
      };
      setActiveSessions(prev => [newSession, ...prev]);
      showToast(`Обмен с ${prop.senderName} подтвержден! Сессия добавлена в кабинет.`);
    }
  };

  const handleDeclineProposal = (proposalId: string) => {
    setProposals(prev =>
      prev.map(p => (p.id === proposalId ? { ...p, status: 'declined' } : p))
    );
    showToast('Заявка отклонена');
  };

  const handleCreateListing = (data: {
    teachSkillName: string;
    teachCategory: Category;
    teachLevel: SkillLevel;
    teachDescription: string;
    learnSkillName: string;
    learnCategory: Category;
    learnGoal: string;
    city: string;
    onlineOnly: boolean;
  }) => {
    const updatedCurrentUser: UserProfile = {
      ...currentUser,
      city: data.city,
      onlineOnly: data.onlineOnly,
      teachSkills: [
        {
          id: `ts-${Date.now()}`,
          name: data.teachSkillName,
          category: data.teachCategory,
          level: data.teachLevel,
          description: data.teachDescription,
        },
        ...currentUser.teachSkills,
      ],
      learnSkills: [
        {
          id: `ls-${Date.now()}`,
          name: data.learnSkillName,
          category: data.learnCategory,
          goal: data.learnGoal,
        },
        ...currentUser.learnSkills,
      ],
    };

    setCurrentUser(updatedCurrentUser);
    setUsers(prev => [updatedCurrentUser, ...prev.filter(u => u.id !== currentUser.id)]);
    showToast('Ваше предложение опубликовано в общем каталоге!');
  };

  const handleSubmitReview = (reviewData: {
    recipientId: string;
    rating: number;
    skillPair: string;
    comment: string;
  }) => {
    const newReview = {
      id: `rev-${Date.now()}`,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      rating: reviewData.rating,
      date: 'Сегодня',
      skillPair: reviewData.skillPair,
      comment: reviewData.comment,
      likes: 1,
    };

    setUsers(prev =>
      prev.map(u => {
        if (u.id === reviewData.recipientId) {
          const updatedReviews = [newReview, ...u.reviews];
          const avgRating =
            updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length;
          return {
            ...u,
            reviews: updatedReviews,
            reviewCount: updatedReviews.length,
            rating: Number(avgRating.toFixed(2)),
          };
        }
        return u;
      })
    );

    if (selectedProfileUser.id === reviewData.recipientId) {
      setSelectedProfileUser(prev => ({
        ...prev,
        reviews: [newReview, ...prev.reviews],
        reviewCount: prev.reviewCount + 1,
      }));
    }

    showToast('Спасибо! Отзыв успешно опубликован.');
  };

  const handleAcceptSchedule = (conversationId: string, scheduleData: any) => {
    const conv = conversations.find(c => c.id === conversationId);
    if (!conv) return;

    const partner = users.find(u => u.id === conv.partnerId);
    const newSession: ActiveSession = {
      id: `sess-${Date.now()}`,
      partnerId: conv.partnerId,
      partnerName: conv.partnerName,
      partnerAvatar: conv.partnerAvatar,
      topic: `${conv.offeredSkill} ↔ ${conv.requestedSkill}`,
      myRole: 'both',
      scheduledTime: scheduleData?.date || conv.suggestedSchedule || 'На этой неделе',
      status: 'upcoming',
      meetingLink: scheduleData?.meetingLink || 'https://meet.google.com/skillswap-confirmed-room',
      format: scheduleData?.format || 'online',
    };

    setActiveSessions(prev => [newSession, ...prev]);

    // Send confirmation message into chat
    handleSendMessageInChat(
      conversationId,
      `🎉 Время встречи подтверждено: ${scheduleData?.date || 'Согласовано'}! Сессия добавлена в личный кабинет.`,
      'text'
    );

    showToast(`Сессия с ${conv.partnerName} подтверждена и добавлена в расписание!`);
  };

  // Unread chats count calculation
  const totalUnreadChats = conversations.reduce((sum, c) => sum + (c.unreadCount || 0), 0);

  return (
    <div className="min-h-screen bg-[#F0FDF4] dark:bg-[#07150E] flex flex-col font-sans text-gray-900 dark:text-emerald-50 selection:bg-emerald-200 dark:selection:bg-emerald-800 selection:text-emerald-900 dark:selection:text-emerald-100 transition-colors duration-200">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F392B] dark:bg-[#134233] text-white px-5 py-3.5 rounded-2xl shadow-xl border border-emerald-400/30 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Persistent Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onOpenCreateListing={() => setIsCreateListingModalOpen(true)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        isLoggedIn={isLoggedIn}
        globalSearchQuery={globalSearchQuery}
        setGlobalSearchQuery={setGlobalSearchQuery}
        onSearchSubmit={handleGlobalSearchSubmit}
        unreadChatsCount={totalUnreadChats}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* TAB 1: HOME PAGE */}
        {activeTab === 'home' && (
          <div className="animate-in fade-in duration-200">
            <HomeHero
              onSearchExchange={handleSearchExchangeFromHero}
              onOpenAiAssistant={() => setActiveTab('assistant')}
            />

            <PopularExchanges onSelectPair={handleSelectPopularPair} />

            <WeeklyTopTeachers
              users={users}
              onSelectUser={handleSelectUserProfile}
              onProposeExchange={handleOpenProposeExchange}
              onOpenLeaderboard={() => setActiveTab('dashboard')}
              onOpenChat={handleOpenDirectChatWithUser}
            />

            <HowItWorks />
          </div>
        )}

        {/* TAB 2: EXPLORE CATALOG */}
        {activeTab === 'explore' && (
          <div className="animate-in fade-in duration-200">
            <ExplorePage
              users={users}
              onSelectUser={handleSelectUserProfile}
              onProposeExchange={handleOpenProposeExchange}
              onOpenCreateListing={() => setIsCreateListingModalOpen(true)}
              onOpenChat={handleOpenDirectChatWithUser}
              initialSearchQuery={globalSearchQuery}
              initialTeachFilter={exploreTeachFilter}
              initialLearnFilter={exploreLearnFilter}
            />
          </div>
        )}

        {/* TAB 3: USER PROFILE PAGE */}
        {activeTab === 'profile' && (
          <div className="animate-in fade-in duration-200">
            <ProfilePage
              user={selectedProfileUser}
              currentUser={currentUser}
              onProposeExchange={handleOpenProposeExchange}
              onOpenReviewModal={handleOpenReviewModal}
              onOpenChat={handleOpenDirectChatWithUser}
              onBackToExplore={() => setActiveTab('explore')}
              onSelectAnotherUser={handleSelectUserProfile}
              allUsers={users}
            />
          </div>
        )}

        {/* TAB 4: AI STUDY ASSISTANT */}
        {activeTab === 'assistant' && (
          <div className="animate-in fade-in duration-200">
            <AiAssistantPage
              onApplyPlanToListing={(_planText) => {
                setIsCreateListingModalOpen(true);
              }}
            />
          </div>
        )}

        {/* TAB 5: STUDENT EXCHANGES CHAT */}
        {activeTab === 'chats' && (
          <div className="animate-in fade-in duration-200">
            <StudentExchangeChatPage
              conversations={conversations}
              activeConversationId={activeChatId}
              onSelectConversation={(id) => {
                setActiveChatId(id);
                // Mark conversation as read
                setConversations(prev =>
                  prev.map(c => (c.id === id ? { ...c, unreadCount: 0 } : c))
                );
              }}
              onSendMessage={handleSendMessageInChat}
              onAcceptSchedule={handleAcceptSchedule}
              onViewProfile={(partnerId) => {
                const partner = users.find(u => u.id === partnerId);
                if (partner) {
                  setSelectedProfileUser(partner);
                  setActiveTab('profile');
                }
              }}
              onNavigateToExplore={() => setActiveTab('explore')}
            />
          </div>
        )}

        {/* TAB 6: LEADERBOARD & DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="animate-in fade-in duration-200">
            <DashboardLeaderboardPage
              users={users}
              currentUser={currentUser}
              proposals={proposals}
              activeSessions={activeSessions}
              onAcceptProposal={handleAcceptProposal}
              onDeclineProposal={handleDeclineProposal}
              onOpenCreateListing={() => setIsCreateListingModalOpen(true)}
              onSelectUser={handleSelectUserProfile}
              onOpenChatWithProposal={handleOpenChatWithProposal}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-[#081710] border-t border-emerald-100 dark:border-emerald-900/60 py-12 px-4 sm:px-6 lg:px-8 mt-16 transition-colors duration-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#0F392B] dark:bg-emerald-600 text-emerald-300 dark:text-emerald-100 flex items-center justify-center">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg text-gray-900 dark:text-emerald-50">Skill<span className="text-emerald-600 dark:text-emerald-400">Swap</span></span>
            </div>
            <p className="text-xs text-gray-500 dark:text-emerald-300/70 leading-relaxed">
              Платформа взаимного обучения и равноправного обмена знаниями. Учись бесплатно у людей, влюбленных в свое дело.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-emerald-200 mb-3">
              Разделы сервиса
            </h4>
            <ul className="space-y-2 text-xs text-gray-600 dark:text-emerald-300/80">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-emerald-700 dark:hover:text-emerald-300 cursor-pointer">
                  Главная страница
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('explore')} className="hover:text-emerald-700 dark:hover:text-emerald-300 cursor-pointer">
                  Каталог анкет обмена
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('chats')} className="hover:text-emerald-700 dark:hover:text-emerald-300 cursor-pointer flex items-center gap-1.5">
                  <span>Чаты со студентами</span>
                  {totalUnreadChats > 0 && (
                    <span className="px-1.5 py-0.2 bg-emerald-600 text-white rounded-full text-[10px] font-bold">
                      {totalUnreadChats}
                    </span>
                  )}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('assistant')} className="hover:text-emerald-700 dark:hover:text-emerald-300 cursor-pointer">
                  ИИ-Ассистент (Учебный план)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('dashboard')} className="hover:text-emerald-700 dark:hover:text-emerald-300 cursor-pointer">
                  Рейтинг и Личный кабинет
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-emerald-200 mb-3">
              Популярные пары
            </h4>
            <ul className="space-y-2 text-xs text-gray-600 dark:text-emerald-300/80">
              <li>
                <button onClick={() => handleSelectPopularPair('Английский язык', 'Физика и Математика')} className="hover:text-emerald-700 dark:hover:text-emerald-300 cursor-pointer">
                  Английский ↔ Физика
                </button>
              </li>
              <li>
                <button onClick={() => handleSelectPopularPair('Python & Data Science', 'UI/UX Дизайн в Figma')} className="hover:text-emerald-700 dark:hover:text-emerald-300 cursor-pointer">
                  Python ↔ UI/UX Дизайн
                </button>
              </li>
              <li>
                <button onClick={() => handleSelectPopularPair('Китайский язык (HSK)', 'Гитара и Музыка')} className="hover:text-emerald-700 dark:hover:text-emerald-300 cursor-pointer">
                  Китайский ↔ Гитара
                </button>
              </li>
              <li>
                <button onClick={() => handleSelectPopularPair('Немецкий язык C1', 'Высшая математика')} className="hover:text-emerald-700 dark:hover:text-emerald-300 cursor-pointer">
                  Немецкий ↔ Математика
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-emerald-200">
              Принцип P2P
            </h4>
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 rounded-2xl border border-emerald-200/80 dark:border-emerald-800/60 text-[11px] text-emerald-900 dark:text-emerald-200 leading-relaxed">
              <span className="font-bold block mb-1">🤝 Честный бартер 50/50:</span>
              Без финансовых расчетов. Каждый урок делится пополам между обоими участниками.
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-gray-100 dark:border-emerald-900/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400 dark:text-emerald-400/60">
          <div>© {new Date().getFullYear()} SkillSwap • Платформа взаимного обучения</div>
          <div className="flex items-center gap-4">
            <span>Режим: {theme === 'dark' ? '🌙 Темная тема' : '☀️ Светлая тема'}</span>
            <span>•</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Gemini 3.7 Flash AI</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ExchangeModal
        recipient={exchangeRecipient}
        currentUser={currentUser}
        isOpen={isExchangeModalOpen}
        onClose={() => setIsExchangeModalOpen(false)}
        onSubmitProposal={handleSubmitProposal}
      />

      <CreateListingModal
        isOpen={isCreateListingModalOpen}
        onClose={() => setIsCreateListingModalOpen(false)}
        onCreateListing={handleCreateListing}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={(user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
          showToast(`Добро пожаловать, ${user.name}!`);
        }}
        availableUsers={[CURRENT_USER, ...INITIAL_USERS]}
      />

      <ReviewModal
        recipient={reviewRecipient}
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmitReview={handleSubmitReview}
      />

    </div>
  );
}
