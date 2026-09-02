import React, { useState } from 'react';
import { 
  Star, 
  MapPin, 
  Laptop, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Repeat, 
  Award, 
  MessageSquare, 
  ThumbsUp, 
  Share2, 
  Sparkles,
  ArrowLeft,
  GraduationCap,
  Target,
  Plus
} from 'lucide-react';
import { UserProfile, Review } from '../types';

interface ProfilePageProps {
  user: UserProfile;
  currentUser: UserProfile;
  onProposeExchange: (user: UserProfile) => void;
  onOpenReviewModal: (user: UserProfile) => void;
  onOpenChat?: (user: UserProfile) => void;
  onBackToExplore?: () => void;
  onSelectAnotherUser?: (user: UserProfile) => void;
  allUsers: UserProfile[];
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  currentUser,
  onProposeExchange,
  onOpenReviewModal,
  onOpenChat,
  onBackToExplore,
  onSelectAnotherUser,
  allUsers,
}) => {
  const [likedReviewIds, setLikedReviewIds] = useState<Set<string>>(new Set());
  const isOwnProfile = user.id === currentUser.id;

  const toggleLikeReview = (reviewId: string) => {
    setLikedReviewIds(prev => {
      const next = new Set(prev);
      if (next.has(reviewId)) {
        next.delete(reviewId);
      } else {
        next.add(reviewId);
      }
      return next;
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Top navigation row */}
      {onBackToExplore && (
        <button
          onClick={onBackToExplore}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 mb-6 bg-emerald-100/60 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Назад к каталогу</span>
        </button>
      )}

      {/* Profile Header Hero Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100/90 shadow-sm relative overflow-hidden mb-8">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          
          {/* Avatar and Main Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover ring-4 ring-emerald-100 shadow-md"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full" title="Онлайн" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                  {user.name}
                </h1>
                {user.verified && (
                  <span title="Подтвержденный профиль">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                  </span>
                )}
              </div>

              <p className="text-sm font-medium text-gray-700 mt-1 max-w-md">
                {user.tagline}
              </p>

              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mt-2.5">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  <span>{user.city}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                  <Laptop className="w-3.5 h-3.5" />
                  <span>{user.onlineOnly ? 'Только Онлайн' : 'Онлайн / Офлайн'}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  <span>С нами с {user.joinedDate}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right Action buttons & Stats */}
          <div className="w-full md:w-auto flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            {!isOwnProfile ? (
              <>
                <button
                  id="profile-propose-exchange-btn"
                  onClick={() => onProposeExchange(user)}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-[#0F392B] dark:bg-emerald-600 hover:bg-[#164e3b] dark:hover:bg-emerald-500 text-white text-sm font-bold rounded-2xl shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <Repeat className="w-4 h-4" />
                  <span>Предложить обмен</span>
                </button>

                {onOpenChat && (
                  <button
                    id="profile-open-chat-btn"
                    onClick={() => onOpenChat(user)}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Написать сообщение</span>
                  </button>
                )}

                <button
                  id="profile-leave-review-btn"
                  onClick={() => onOpenReviewModal(user)}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-100 dark:bg-emerald-950/80 hover:bg-emerald-200 dark:hover:bg-emerald-900/60 text-emerald-900 dark:text-emerald-200 text-xs font-bold rounded-xl transition-colors cursor-pointer border border-emerald-200/60 dark:border-emerald-800"
                >
                  <Star className="w-3.5 h-3.5 text-amber-500" />
                  <span>Оставить отзыв</span>
                </button>
              </>
            ) : (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 rounded-2xl border border-emerald-200 dark:border-emerald-800 text-center">
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-200">Это ваш профиль на платформе</span>
              </div>
            )}
          </div>
        </div>

        {/* Badges Bar */}
        <div className="mt-6 pt-5 border-t border-emerald-100/80 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500 mr-2 flex items-center gap-1">
            <Award className="w-4 h-4 text-emerald-600" />
            <span>Бейджи компетенций:</span>
          </span>
          {user.badges.map((badge, idx) => (
            <span
              key={idx}
              className="text-xs font-semibold px-3 py-1 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200/70 shadow-2xs"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Quantitative Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-emerald-100/80">
          <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
            <div className="flex items-center gap-1.5 text-amber-500 font-extrabold text-lg">
              <Star className="w-5 h-5 fill-amber-400" />
              <span className="text-gray-900">{user.rating.toFixed(2)}</span>
            </div>
            <span className="text-[11px] text-gray-500 mt-0.5 block">{user.reviewCount} оценок партнеров</span>
          </div>

          <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
            <div className="text-emerald-700 font-extrabold text-lg">
              {user.completedSessions}
            </div>
            <span className="text-[11px] text-gray-500 mt-0.5 block">Завершенных сессий</span>
          </div>

          <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
            <div className="text-emerald-700 font-extrabold text-lg">
              {user.responseRate}
            </div>
            <span className="text-[11px] text-gray-500 mt-0.5 block">Скорость ответа</span>
          </div>

          <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
            <div className="text-emerald-700 font-extrabold text-lg">
              #{user.weeklyRank || 5}
            </div>
            <span className="text-[11px] text-gray-500 mt-0.5 block">Место в рейтинге</span>
          </div>
        </div>

      </div>

      {/* Bio section */}
      <div className="bg-white rounded-3xl p-6 border border-emerald-100/90 shadow-xs mb-8">
        <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
          <span>О себе и подходе к обучению</span>
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          {user.bio}
        </p>
      </div>

      {/* Main 2-Column: "Могу научить" & "Хочу изучить" */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        
        {/* Block: Могу научить */}
        <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-lg mb-4 pb-3 border-b border-emerald-100">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span>Могу научить</span>
              <span className="ml-auto text-xs font-normal px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-lg">
                {user.teachSkills.length} предмета
              </span>
            </div>

            <div className="space-y-4">
              {user.teachSkills.map((skill) => (
                <div
                  key={skill.id}
                  className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-200/70"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h3 className="font-bold text-gray-900 text-base">
                      {skill.name}
                    </h3>
                    <span className="text-xs font-bold px-2.5 py-0.5 bg-emerald-600 text-white rounded-full shadow-2xs">
                      {skill.level}
                    </span>
                  </div>
                  {skill.description && (
                    <p className="text-xs text-gray-600 leading-relaxed mt-1">
                      {skill.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-100 text-xs text-gray-500">
            💡 Каждое занятие строится по равноправной формуле 50/50 (половина времени — преподавание, половина — учеба).
          </div>
        </div>

        {/* Block: Хочу изучить */}
        <div className="bg-white rounded-3xl p-6 border border-teal-100 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-teal-900 font-bold text-lg mb-4 pb-3 border-b border-teal-100">
              <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <span>Хочу изучить</span>
              <span className="ml-auto text-xs font-normal px-2 py-0.5 bg-teal-100 text-teal-800 rounded-lg">
                {user.learnSkills.length} темы
              </span>
            </div>

            <div className="space-y-4">
              {user.learnSkills.map((skill) => (
                <div
                  key={skill.id}
                  className="p-4 bg-teal-50/40 rounded-2xl border border-teal-200/70"
                >
                  <h3 className="font-bold text-gray-900 text-base mb-1">
                    {skill.name}
                  </h3>
                  {skill.goal && (
                    <p className="text-xs text-gray-600 leading-relaxed">
                      <span className="font-semibold text-teal-800">Цель:</span> {skill.goal}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-teal-100 text-xs text-gray-500">
            🎯 Если вы компетентны в одной из этих тем, нажмите кнопку «Предложить обмен»!
          </div>
        </div>

      </div>

      {/* Reviews Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-xs mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
              <span>Отзывы участников обмена</span>
              <span className="text-sm font-normal text-gray-500">({user.reviews.length})</span>
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Только реальные отзывы после завершенных 1-on-1 сессий
            </p>
          </div>

          {!isOwnProfile && (
            <button
              onClick={() => onOpenReviewModal(user)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-xl transition-colors cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Написать отзыв</span>
            </button>
          )}
        </div>

        {user.reviews.length > 0 ? (
          <div className="space-y-4">
            {user.reviews.map((rev) => {
              const isLiked = likedReviewIds.has(rev.id);
              const likeCount = rev.likes + (isLiked ? 1 : 0);

              return (
                <div
                  key={rev.id}
                  className="p-5 bg-gray-50/70 rounded-2xl border border-gray-200/80 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={rev.authorAvatar}
                        alt={rev.authorName}
                        className="w-10 h-10 rounded-xl object-cover ring-1 ring-emerald-200"
                      />
                      <div>
                        <span className="font-bold text-gray-900 text-sm block">
                          {rev.authorName}
                        </span>
                        <span className="text-[11px] text-gray-500">{rev.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 px-2 py-0.5 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{rev.rating}</span>
                    </div>
                  </div>

                  {/* Skill pair exchanged */}
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-100 text-emerald-900 rounded-md text-[11px] font-semibold">
                    <Repeat className="w-3 h-3 text-emerald-600" />
                    <span>Обмен: {rev.skillPair}</span>
                  </div>

                  {/* Comment text */}
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                    «{rev.comment}»
                  </p>

                  {/* Helpful footer */}
                  <div className="flex items-center justify-end pt-1">
                    <button
                      onClick={() => toggleLikeReview(rev.id)}
                      className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                        isLiked 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'text-gray-500 hover:bg-gray-200/80 hover:text-gray-700'
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>Полезно ({likeCount})</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 text-sm">
            У этого пользователя пока нет отзывов. Станьте первым напарником по обмену!
          </div>
        )}
      </div>

      {/* Quick switcher to other demo profiles */}
      {onSelectAnotherUser && (
        <div className="bg-emerald-50/70 rounded-3xl p-6 border border-emerald-200/80">
          <h3 className="text-sm font-bold text-gray-900 mb-3">
            Посмотреть другие профили платформы:
          </h3>
          <div className="flex flex-wrap gap-2">
            {allUsers.map((u) => (
              <button
                key={u.id}
                onClick={() => onSelectAnotherUser(u)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  u.id === user.id
                    ? 'bg-[#0F392B] text-white shadow-xs'
                    : 'bg-white text-gray-800 border border-emerald-200 hover:bg-emerald-100'
                }`}
              >
                <img src={u.avatar} alt={u.name} className="w-5 h-5 rounded-full object-cover" />
                <span>{u.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
