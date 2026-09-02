import React from 'react';
import { Trophy, Star, ArrowRight, CheckCircle2, Award, Clock, MessageSquare } from 'lucide-react';
import { UserProfile } from '../types';

interface WeeklyTopTeachersProps {
  users: UserProfile[];
  onSelectUser: (user: UserProfile) => void;
  onProposeExchange: (user: UserProfile) => void;
  onOpenLeaderboard: () => void;
  onOpenChat?: (user: UserProfile) => void;
}

export const WeeklyTopTeachers: React.FC<WeeklyTopTeachersProps> = ({
  users,
  onSelectUser,
  onProposeExchange,
  onOpenLeaderboard,
  onOpenChat,
}) => {
  // Top 4 users for the weekly preview
  const topUsers = [...users]
    .sort((a, b) => b.completedSessions - a.completedSessions)
    .slice(0, 4);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-emerald-100/70 dark:border-emerald-900/50">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1.5">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>Зал славы SkillSwap</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-emerald-50 tracking-tight">
            Топ напарников и преподавателей недели
          </h2>
          <p className="text-gray-600 dark:text-emerald-300/70 text-sm mt-1">
            Участники с наибольшим количеством успешных сессий и наивысшим рейтингом от партнеров
          </p>
        </div>
        <button
          id="home-view-full-leaderboard-btn"
          onClick={onOpenLeaderboard}
          className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800 dark:text-emerald-400 hover:text-emerald-950 dark:hover:text-emerald-300 hover:underline cursor-pointer"
        >
          <span>Полный рейтинг платформы</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {topUsers.map((user, index) => {
          const rankColors = [
            'bg-amber-400 text-amber-950 ring-2 ring-amber-300',
            'bg-slate-300 text-slate-900 ring-2 ring-slate-200',
            'bg-amber-700 text-amber-100 ring-2 ring-amber-600/50',
            'bg-emerald-600 text-white',
          ];

          return (
            <div
              key={user.id}
              id={`weekly-top-user-${user.id}`}
              className="bg-white dark:bg-[#0A1D15] rounded-2xl p-5 border border-emerald-100 dark:border-emerald-900/60 shadow-xs hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-700 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header with avatar and rank */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-14 h-14 rounded-2xl object-cover ring-2 ring-emerald-100 dark:ring-emerald-800"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-xs ${rankColors[index] || 'bg-emerald-600 text-white'}`}>
                      {index + 1}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 dark:bg-amber-950/60 border border-amber-200/80 dark:border-amber-800/80 rounded-lg text-amber-800 dark:text-amber-300 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{user.rating.toFixed(2)}</span>
                    </div>
                    <div className="text-[11px] text-gray-500 dark:text-emerald-400/70 mt-1 flex items-center justify-end gap-1">
                      <Clock className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      <span>{user.completedSessions} сессий</span>
                    </div>
                  </div>
                </div>

                {/* User info */}
                <div className="mb-3">
                  <div className="flex items-center gap-1.5">
                    <h3 
                      onClick={() => onSelectUser(user)}
                      className="font-bold text-gray-900 dark:text-emerald-50 text-base hover:text-emerald-700 dark:hover:text-emerald-300 cursor-pointer truncate"
                    >
                      {user.name}
                    </h3>
                    {user.verified && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-emerald-300/70 truncate mt-0.5">{user.tagline}</p>
                </div>

                {/* Badges preview */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {user.badges.slice(0, 2).map((badge, bIdx) => (
                    <span 
                      key={bIdx}
                      className="text-[10px] font-medium px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 rounded-md border border-emerald-100 dark:border-emerald-800/60"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Skills summary */}
                <div className="space-y-2 text-xs border-t border-gray-100 dark:border-emerald-900/50 pt-3">
                  <div>
                    <span className="text-gray-500 dark:text-emerald-400/60 text-[10px] uppercase font-bold block mb-0.5">Обучает:</span>
                    <p className="font-semibold text-gray-800 dark:text-emerald-100 truncate">
                      {user.teachSkills.map(s => s.name).join(', ')}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-emerald-400/60 text-[10px] uppercase font-bold block mb-0.5">Хочет освоить:</span>
                    <p className="text-emerald-700 dark:text-emerald-400 font-medium truncate">
                      {user.learnSkills.map(s => s.name).join(', ')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-5 pt-3 border-t border-gray-100 dark:border-emerald-900/50 grid grid-cols-2 gap-2">
                <button
                  id={`view-profile-btn-${user.id}`}
                  onClick={() => onSelectUser(user)}
                  className="w-full py-2 text-xs font-semibold text-gray-700 dark:text-emerald-200 bg-gray-100 dark:bg-emerald-950/70 hover:bg-gray-200 dark:hover:bg-emerald-900/60 rounded-xl transition-colors text-center cursor-pointer"
                >
                  Профиль
                </button>
                <button
                  id={`propose-exchange-btn-${user.id}`}
                  onClick={() => onProposeExchange(user)}
                  className="w-full py-2 text-xs font-semibold text-white bg-[#0F392B] dark:bg-emerald-600 hover:bg-[#164e3b] dark:hover:bg-emerald-500 rounded-xl transition-colors shadow-2xs text-center cursor-pointer"
                >
                  Обмен
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
