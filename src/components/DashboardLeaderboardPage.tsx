import React, { useState } from 'react';
import { 
  Trophy, 
  Star, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  Play, 
  Video, 
  Repeat, 
  PlusCircle, 
  Flame, 
  UserCheck, 
  FileText,
  Timer,
  Pause,
  RotateCcw,
  MessageSquare
} from 'lucide-react';
import { UserProfile, ExchangeProposal, ActiveSession } from '../types';

interface DashboardLeaderboardPageProps {
  users: UserProfile[];
  currentUser: UserProfile;
  proposals: ExchangeProposal[];
  activeSessions: ActiveSession[];
  onAcceptProposal: (id: string) => void;
  onDeclineProposal: (id: string) => void;
  onOpenCreateListing: () => void;
  onSelectUser: (user: UserProfile) => void;
  onOpenChatWithProposal?: (proposalId: string) => void;
}

export const DashboardLeaderboardPage: React.FC<DashboardLeaderboardPageProps> = ({
  users,
  currentUser,
  proposals,
  activeSessions,
  onAcceptProposal,
  onDeclineProposal,
  onOpenCreateListing,
  onSelectUser,
  onOpenChatWithProposal,
}) => {
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'dashboard'>('leaderboard');
  const [proposalSubTab, setProposalSubTab] = useState<'incoming' | 'outgoing' | 'sessions'>('incoming');

  // Interactive 50/50 Session Timer Tool
  const [timerRunning, setTimerRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(1800); // 30 mins
  const [currentTurn, setCurrentTurn] = useState<'teaching' | 'learning'>('teaching');

  React.useEffect(() => {
    let interval: any = null;
    if (timerRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((s) => s - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, secondsLeft]);

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const incomingProposals = proposals.filter(p => p.receiverId === currentUser.id);
  const outgoingProposals = proposals.filter(p => p.senderId === currentUser.id);

  // Sorted leaderboard
  const sortedUsers = [...users].sort((a, b) => {
    if (b.completedSessions !== a.completedSessions) {
      return b.completedSessions - a.completedSessions;
    }
    return b.rating - a.rating;
  });

  const topThree = sortedUsers.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Top Header Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Личный кабинет и Рейтинг платформы
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Отслеживайте свои заявки на обмен, планируйте уроки и соревнуйтесь в таблице лидеров
          </p>
        </div>

        {/* View Switcher Pill */}
        <div className="flex items-center bg-gray-100 p-1 rounded-2xl shrink-0 self-start sm:self-auto border border-gray-200">
          <button
            id="tab-btn-leaderboard"
            onClick={() => setActiveTab('leaderboard')}
            className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'leaderboard'
                ? 'bg-white text-emerald-900 shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>Рейтинг лидеров</span>
          </button>
          <button
            id="tab-btn-dashboard"
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-white text-emerald-900 shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Repeat className="w-4 h-4 text-emerald-600" />
            <span>Заявки и сессии</span>
            {incomingProposals.filter(p => p.status === 'pending').length > 0 && (
              <span className="w-5 h-5 bg-emerald-500 text-white rounded-full text-[10px] flex items-center justify-center font-bold">
                {incomingProposals.filter(p => p.status === 'pending').length}
              </span>
            )}
          </button>
        </div>
      </div>

      {activeTab === 'leaderboard' ? (
        /* LEADERBOARD VIEW */
        <div className="space-y-8">
          
          {/* Podium for Top 3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            
            {/* 2nd Place */}
            {topThree[1] && (
              <div 
                onClick={() => onSelectUser(topThree[1])}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all text-center flex flex-col items-center justify-between cursor-pointer order-2 md:order-1 relative overflow-hidden"
              >
                <div className="w-full">
                  <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center text-sm font-extrabold mx-auto mb-3 border border-slate-300">
                    🥈 2 место
                  </div>
                  <img
                    src={topThree[1].avatar}
                    alt={topThree[1].name}
                    className="w-20 h-20 rounded-2xl object-cover ring-4 ring-slate-100 shadow-md mx-auto mb-3"
                  />
                  <h3 className="font-extrabold text-gray-900 text-base">{topThree[1].name}</h3>
                  <p className="text-xs text-gray-500 truncate mt-0.5">{topThree[1].tagline}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 w-full flex items-center justify-around text-xs">
                  <div>
                    <span className="font-bold text-gray-900 block">{topThree[1].completedSessions}</span>
                    <span className="text-gray-400 text-[10px]">сессий</span>
                  </div>
                  <div>
                    <span className="font-bold text-amber-600 block">{topThree[1].rating.toFixed(2)} ★</span>
                    <span className="text-gray-400 text-[10px]">рейтинг</span>
                  </div>
                </div>
              </div>
            )}

            {/* 1st Place (Gold Champion) */}
            {topThree[0] && (
              <div 
                onClick={() => onSelectUser(topThree[0])}
                className="bg-gradient-to-b from-amber-50/70 via-white to-white rounded-3xl p-6 border-2 border-amber-300 shadow-md hover:shadow-lg transition-all text-center flex flex-col items-center justify-between cursor-pointer order-1 md:order-2 relative overflow-hidden scale-105"
              >
                <div className="absolute top-0 right-0 left-0 bg-amber-400 text-amber-950 text-[11px] font-extrabold py-1 tracking-wider uppercase">
                  🏆 Лидер платформы
                </div>
                <div className="w-full pt-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center text-base font-extrabold mx-auto mb-3 border border-amber-300">
                    🥇 1 место
                  </div>
                  <img
                    src={topThree[0].avatar}
                    alt={topThree[0].name}
                    className="w-24 h-24 rounded-2xl object-cover ring-4 ring-amber-200 shadow-lg mx-auto mb-3"
                  />
                  <h3 className="font-extrabold text-gray-900 text-lg">{topThree[0].name}</h3>
                  <p className="text-xs text-gray-600 truncate mt-0.5 font-medium">{topThree[0].tagline}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-amber-100 w-full flex items-center justify-around text-xs">
                  <div>
                    <span className="font-extrabold text-emerald-800 text-sm block">{topThree[0].completedSessions}</span>
                    <span className="text-gray-500 text-[10px]">сессий</span>
                  </div>
                  <div>
                    <span className="font-extrabold text-amber-700 text-sm block">{topThree[0].rating.toFixed(2)} ★</span>
                    <span className="text-gray-500 text-[10px]">рейтинг</span>
                  </div>
                </div>
              </div>
            )}

            {/* 3rd Place */}
            {topThree[2] && (
              <div 
                onClick={() => onSelectUser(topThree[2])}
                className="bg-white rounded-3xl p-6 border border-amber-200 shadow-xs hover:shadow-md transition-all text-center flex flex-col items-center justify-between cursor-pointer order-3 md:order-3 relative overflow-hidden"
              >
                <div className="w-full">
                  <div className="w-10 h-10 rounded-2xl bg-amber-100/80 text-amber-900 flex items-center justify-center text-sm font-extrabold mx-auto mb-3 border border-amber-300">
                    🥉 3 место
                  </div>
                  <img
                    src={topThree[2].avatar}
                    alt={topThree[2].name}
                    className="w-20 h-20 rounded-2xl object-cover ring-4 ring-amber-100 shadow-md mx-auto mb-3"
                  />
                  <h3 className="font-extrabold text-gray-900 text-base">{topThree[2].name}</h3>
                  <p className="text-xs text-gray-500 truncate mt-0.5">{topThree[2].tagline}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 w-full flex items-center justify-around text-xs">
                  <div>
                    <span className="font-bold text-gray-900 block">{topThree[2].completedSessions}</span>
                    <span className="text-gray-400 text-[10px]">сессий</span>
                  </div>
                  <div>
                    <span className="font-bold text-amber-600 block">{topThree[2].rating.toFixed(2)} ★</span>
                    <span className="text-gray-400 text-[10px]">рейтинг</span>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Full Leaderboard Table */}
          <div className="bg-white rounded-3xl border border-emerald-100 shadow-xs overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Полная таблица участников
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Рейтинг формируется на основе взаимных оценок и регулярности проведения занятий
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                  ⚡️ Обновляется в реальном времени
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-emerald-50/60 text-[11px] uppercase font-bold text-emerald-900 border-b border-emerald-100">
                  <tr>
                    <th className="px-6 py-3.5"># Ранг</th>
                    <th className="px-6 py-3.5">Участник</th>
                    <th className="px-6 py-3.5">Чему обучает</th>
                    <th className="px-6 py-3.5 text-center">Сессии</th>
                    <th className="px-6 py-3.5 text-center">Рейтинг</th>
                    <th className="px-6 py-3.5 text-right">Действие</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sortedUsers.map((user, idx) => (
                    <tr
                      key={user.id}
                      className="hover:bg-emerald-50/40 transition-colors"
                    >
                      {/* Rank */}
                      <td className="px-6 py-4 font-bold text-gray-700">
                        {idx === 0 && '🥇 1'}
                        {idx === 1 && '🥈 2'}
                        {idx === 2 && '🥉 3'}
                        {idx > 2 && `${idx + 1}`}
                      </td>

                      {/* User */}
                      <td className="px-6 py-4">
                        <div 
                          onClick={() => onSelectUser(user)}
                          className="flex items-center gap-3 cursor-pointer group"
                        >
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-10 h-10 rounded-xl object-cover ring-1 ring-emerald-200"
                          />
                          <div>
                            <span className="font-bold text-gray-900 group-hover:text-emerald-700 block">
                              {user.name}
                            </span>
                            <span className="text-xs text-gray-500">{user.city}</span>
                          </div>
                        </div>
                      </td>

                      {/* Teach Skills */}
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {user.teachSkills.map((s) => (
                            <span
                              key={s.id}
                              className="text-xs font-medium px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded-md border border-emerald-100"
                            >
                              {s.name}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Completed sessions */}
                      <td className="px-6 py-4 text-center font-bold text-gray-900">
                        {user.completedSessions}
                      </td>

                      {/* Rating */}
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center gap-1 font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          {user.rating.toFixed(2)}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => onSelectUser(user)}
                          className="text-xs font-bold text-emerald-800 hover:text-emerald-950 hover:underline cursor-pointer"
                        >
                          Профиль →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      ) : (
        /* DASHBOARD VIEW: PROPOSALS & SESSIONS */
        <div className="space-y-8">
          
          {/* Sub Navigation */}
          <div className="flex items-center gap-2 border-b border-gray-200 pb-3">
            <button
              onClick={() => setProposalSubTab('incoming')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                proposalSubTab === 'incoming'
                  ? 'bg-[#0F392B] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Входящие предложения ({incomingProposals.length})
            </button>
            <button
              onClick={() => setProposalSubTab('outgoing')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                proposalSubTab === 'outgoing'
                  ? 'bg-[#0F392B] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Отправленные ({outgoingProposals.length})
            </button>
            <button
              onClick={() => setProposalSubTab('sessions')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                proposalSubTab === 'sessions'
                  ? 'bg-[#0F392B] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Ближайшие сессии ({activeSessions.length})
            </button>
          </div>

          {/* Incoming proposals */}
          {proposalSubTab === 'incoming' && (
            <div className="space-y-4">
              {incomingProposals.length > 0 ? (
                incomingProposals.map((prop) => (
                  <div
                    key={prop.id}
                    className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-xs space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={prop.senderAvatar}
                          alt={prop.senderName}
                          className="w-12 h-12 rounded-2xl object-cover ring-2 ring-emerald-100"
                        />
                        <div>
                          <h3 className="font-bold text-gray-900 text-base">{prop.senderName}</h3>
                          <p className="text-xs text-gray-500">{prop.createdAt} • Формат: {prop.format === 'online' ? 'Онлайн' : 'Офлайн'}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {prop.status === 'pending' ? (
                          <>
                            <button
                              id={`accept-prop-${prop.id}`}
                              onClick={() => onAcceptProposal(prop.id)}
                              className="flex items-center gap-1.5 px-4 py-2 bg-[#0F392B] hover:bg-[#164e3b] text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
                            >
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              <span>Принять обмен</span>
                            </button>
                            <button
                              id={`decline-prop-${prop.id}`}
                              onClick={() => onDeclineProposal(prop.id)}
                              className="flex items-center gap-1.5 px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
                            >
                              <XCircle className="w-4 h-4 text-rose-500" />
                              <span>Отклонить</span>
                            </button>
                          </>
                        ) : (
                          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl">
                            {prop.status === 'accepted' ? 'Принято' : 'Отклонено'}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Skill pair exchanged */}
                    <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-gray-500 text-[10px] font-bold uppercase block mb-0.5">Вам предлагают:</span>
                        <p className="font-bold text-gray-900">{prop.offeredSkill}</p>
                      </div>
                      <div>
                        <span className="text-gray-500 text-[10px] font-bold uppercase block mb-0.5">От вас хотят изучить:</span>
                        <p className="font-bold text-emerald-800">{prop.requestedSkill}</p>
                      </div>
                    </div>

                    {/* Message & Schedule */}
                    <div className="space-y-1 text-xs">
                      <p className="text-gray-700 italic">«{prop.message}»</p>
                      {prop.suggestedSchedule && (
                        <p className="text-emerald-800 font-semibold flex items-center gap-1 pt-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Предложенное время: {prop.suggestedSchedule}</span>
                        </p>
                      )}
                    </div>

                    {onOpenChatWithProposal && (
                      <div className="pt-2 border-t border-emerald-100 flex justify-end">
                        <button
                          onClick={() => onOpenChatWithProposal(prop.id)}
                          className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200/80 rounded-xl text-xs font-bold transition-all cursor-pointer"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Открыть чат с {prop.senderName.split(' ')[0]}</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-3xl border border-gray-200 p-6">
                  <p className="text-gray-500 text-sm">Входящих заявок пока нет.</p>
                </div>
              )}
            </div>
          )}

          {/* Outgoing proposals */}
          {proposalSubTab === 'outgoing' && (
            <div className="space-y-4">
              {outgoingProposals.length > 0 ? (
                outgoingProposals.map((prop) => (
                  <div
                    key={prop.id}
                    className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-xs space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900 text-base">Заявка для: {prop.receiverName}</h3>
                        <p className="text-xs text-gray-500">{prop.createdAt}</p>
                      </div>
                      <span className="px-3 py-1 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold rounded-xl">
                        Ожидает ответа
                      </span>
                    </div>

                    <div className="p-3 bg-emerald-50/50 rounded-xl text-xs space-y-1">
                      <p><span className="font-bold text-gray-700">Вы предложили:</span> {prop.offeredSkill}</p>
                      <p><span className="font-bold text-gray-700">Вы хотите изучить:</span> {prop.requestedSkill}</p>
                      <p><span className="font-bold text-gray-700">Сообщение:</span> {prop.message}</p>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] text-gray-400">
                        {prop.suggestedSchedule ? `Время: ${prop.suggestedSchedule}` : 'Сессия 50/50'}
                      </span>
                      {onOpenChatWithProposal && (
                        <button
                          id={`open-chat-prop-${prop.id}`}
                          onClick={() => onOpenChatWithProposal(prop.id)}
                          className="flex items-center gap-1.5 px-4 py-2 bg-[#0F392B] hover:bg-[#164e3b] text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-emerald-300" />
                          <span>Написать студенту ({prop.receiverName.split(' ')[0]})</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-3xl border border-gray-200 p-6">
                  <p className="text-gray-500 text-sm">Вы еще не отправляли заявок. Откройте каталог и предложите обмен!</p>
                </div>
              )}
            </div>
          )}

          {/* Active Upcoming Sessions & 50/50 Interactive Timer */}
          {proposalSubTab === 'sessions' && (
            <div className="space-y-6">
              
              {/* Upcoming sessions list */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeSessions.map((sess) => (
                  <div
                    key={sess.id}
                    className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-xs space-y-4 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-3">
                          <img
                            src={sess.partnerAvatar}
                            alt={sess.partnerName}
                            className="w-12 h-12 rounded-2xl object-cover ring-2 ring-emerald-100"
                          />
                          <div>
                            <span className="font-bold text-gray-900 text-base block">{sess.partnerName}</span>
                            <span className="text-xs text-emerald-700 font-semibold">{sess.scheduledTime}</span>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md">
                          1-на-1
                        </span>
                      </div>

                      <p className="text-xs text-gray-700 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100 mt-2">
                        <b>Тема:</b> {sess.topic}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <a
                        href={sess.meetingLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#0F392B] hover:bg-[#164e3b] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                      >
                        <Video className="w-4 h-4 text-emerald-300" />
                        <span>Войти в звонок</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Interactive 50/50 Session Practice Timer Widget */}
              <div className="bg-gradient-to-br from-emerald-900 via-teal-950 to-[#0F392B] text-white rounded-3xl p-6 sm:p-8 shadow-lg">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-400/20">
                      <Timer className="w-3.5 h-3.5" />
                      <span>Инструмент для парной сессии</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold">
                      Таймер честного 50/50 занятия
                    </h3>
                    <p className="text-xs sm:text-sm text-emerald-200/80 mt-1 max-w-md">
                      Запустите таймер во время онлайн-звонка: 30 минут на первую тему, затем звуковой сигнал для смены роли.
                    </p>
                  </div>

                  {/* Timer Display */}
                  <div className="flex flex-col items-center bg-white/10 backdrop-blur-md px-8 py-5 rounded-3xl border border-white/15">
                    <div className="text-xs uppercase font-bold text-emerald-300 tracking-wider mb-1">
                      {currentTurn === 'teaching' ? '🎓 Часть 1: Ты преподаешь' : '🎯 Часть 2: Ты учишься'}
                    </div>
                    <div className="text-4xl sm:text-5xl font-mono font-extrabold tracking-tight my-1">
                      {formatTimer(secondsLeft)}
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <button
                        onClick={() => setTimerRunning(!timerRunning)}
                        className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                      >
                        {timerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                        <span>{timerRunning ? 'Пауза' : 'Старт'}</span>
                      </button>
                      <button
                        onClick={() => {
                          setTimerRunning(false);
                          setSecondsLeft(1800);
                          setCurrentTurn(currentTurn === 'teaching' ? 'learning' : 'teaching');
                        }}
                        className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors cursor-pointer"
                        title="Сменить роль и сбросить таймер"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
};
