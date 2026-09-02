import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Laptop, 
  CheckCircle2, 
  Repeat, 
  SlidersHorizontal,
  ArrowUpDown,
  PlusCircle,
  X,
  BookOpen,
  Sparkles
} from 'lucide-react';
import { UserProfile, Category, Format } from '../types';
import { CATEGORY_LABELS } from '../mockData';
import { MessageSquare } from 'lucide-react';

interface ExplorePageProps {
  users: UserProfile[];
  onSelectUser: (user: UserProfile) => void;
  onProposeExchange: (user: UserProfile) => void;
  onOpenCreateListing: () => void;
  onOpenChat?: (user: UserProfile) => void;
  initialSearchQuery?: string;
  initialTeachFilter?: string;
  initialLearnFilter?: string;
}

export const ExplorePage: React.FC<ExplorePageProps> = ({
  users,
  onSelectUser,
  onProposeExchange,
  onOpenCreateListing,
  onOpenChat,
  initialSearchQuery = '',
  initialTeachFilter = '',
  initialLearnFilter = '',
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [selectedFormat, setSelectedFormat] = useState<Format>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'sessions'>('rating');
  const [filterTeach, setFilterTeach] = useState(initialTeachFilter);
  const [filterLearn, setFilterLearn] = useState(initialLearnFilter);

  // Categories list
  const categories: { id: Category; label: string }[] = [
    { id: 'all', label: 'Все предметы' },
    { id: 'languages', label: 'Языки' },
    { id: 'exact_sciences', label: 'Точные науки' },
    { id: 'programming', label: 'Программирование' },
    { id: 'art_design', label: 'Искусство и Дизайн' },
    { id: 'music', label: 'Музыка' },
    { id: 'business', label: 'Бизнес' },
  ];

  // Filtered and sorted users
  const filteredUsers = useMemo(() => {
    return users
      .filter((user) => {
        // Search query check (name, tagline, teach skills, learn skills)
        const q = searchQuery.toLowerCase().trim();
        const matchesQuery = !q || (
          user.name.toLowerCase().includes(q) ||
          user.tagline.toLowerCase().includes(q) ||
          user.city.toLowerCase().includes(q) ||
          user.teachSkills.some(s => s.name.toLowerCase().includes(q) || s.description?.toLowerCase().includes(q)) ||
          user.learnSkills.some(s => s.name.toLowerCase().includes(q) || s.goal?.toLowerCase().includes(q))
        );

        // Category filter
        const matchesCategory = selectedCategory === 'all' || (
          user.teachSkills.some(s => s.category === selectedCategory) ||
          user.learnSkills.some(s => s.category === selectedCategory)
        );

        // Format filter
        const matchesFormat = selectedFormat === 'all' || (
          selectedFormat === 'online' ? true : !user.onlineOnly
        );

        // Specific pair filters from hero
        const matchesTeach = !filterTeach || (
          user.teachSkills.some(s => s.name.toLowerCase().includes(filterTeach.toLowerCase()))
        );
        const matchesLearn = !filterLearn || (
          user.learnSkills.some(s => s.name.toLowerCase().includes(filterLearn.toLowerCase()))
        );

        return matchesQuery && matchesCategory && matchesFormat && matchesTeach && matchesLearn;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
        if (sortBy === 'sessions') return b.completedSessions - a.completedSessions;
        return 0;
      });
  }, [users, searchQuery, selectedCategory, selectedFormat, sortBy, filterTeach, filterLearn]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedFormat('all');
    setFilterTeach('');
    setFilterLearn('');
  };

  const hasActiveFilters = searchQuery || selectedCategory !== 'all' || selectedFormat !== 'all' || filterTeach || filterLearn;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Page Title & Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Каталог предложений взаимного обучения
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Найдено <span className="font-bold text-emerald-700">{filteredUsers.length}</span> анкет участников, готовых к честному обмену
          </p>
        </div>

        <button
          id="explore-create-listing-btn"
          onClick={onOpenCreateListing}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0F392B] hover:bg-[#164e3b] text-white font-semibold text-sm rounded-xl shadow-xs transition-all cursor-pointer shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Разместить свое объявление</span>
        </button>
      </div>

      {/* Filter Control Bar */}
      <div className="bg-white rounded-2xl p-4 border border-emerald-100/90 shadow-xs mb-8 space-y-4">
        
        {/* Search input & Sort selector row */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="explore-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по предмету, имени или ключевому слову..."
              className="w-full pl-10 pr-9 py-2.5 text-sm bg-emerald-50/40 border border-emerald-200/80 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all font-medium"
            />
            {searchQuery && (
              <button
                id="explore-clear-search-btn"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Format selector */}
            <div className="flex items-center bg-gray-100 p-1 rounded-xl">
              <button
                id="explore-format-all-btn"
                onClick={() => setSelectedFormat('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  selectedFormat === 'all' ? 'bg-white text-gray-900 shadow-2xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Все форматы
              </button>
              <button
                id="explore-format-online-btn"
                onClick={() => setSelectedFormat('online')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  selectedFormat === 'online' ? 'bg-white text-emerald-800 shadow-2xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Онлайн
              </button>
              <button
                id="explore-format-offline-btn"
                onClick={() => setSelectedFormat('offline')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  selectedFormat === 'offline' ? 'bg-white text-emerald-800 shadow-2xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Офлайн
              </button>
            </div>

            {/* Sort selector */}
            <div className="flex items-center gap-1 bg-emerald-50/80 border border-emerald-200/80 px-3 py-1.5 rounded-xl text-xs font-medium text-gray-700">
              <ArrowUpDown className="w-3.5 h-3.5 text-emerald-600" />
              <label htmlFor="explore-sort-select" className="text-gray-500 font-normal">Сортировка:</label>
              <select
                id="explore-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent font-bold text-gray-800 focus:outline-none cursor-pointer"
              >
                <option value="rating">По рейтингу</option>
                <option value="reviews">По отзывам</option>
                <option value="sessions">По сессиям</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider shrink-0 mr-1">
            Категория:
          </span>
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`explore-category-${cat.id}`}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-2xs ring-2 ring-emerald-300/40'
                  : 'bg-emerald-50/70 text-emerald-900 border border-emerald-200/60 hover:bg-emerald-100'
              }`}
            >
              {cat.label}
            </button>
          ))}

          {hasActiveFilters && (
            <button
              id="explore-reset-filters-btn"
              onClick={clearAllFilters}
              className="ml-auto px-2.5 py-1.5 text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-colors shrink-0 flex items-center gap-1 font-medium cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Сбросить</span>
            </button>
          )}
        </div>

        {/* Active search filter notice if filtered by pairs */}
        {(filterTeach || filterLearn) && (
          <div className="flex items-center gap-2 p-2 bg-emerald-100/60 rounded-xl text-xs text-emerald-900 border border-emerald-200/80">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span>
              Показаны анкеты для обмена: 
              {filterTeach && <b> «Преподавание: {filterTeach}»</b>}
              {filterTeach && filterLearn && ' ↔ '}
              {filterLearn && <b> «Изучение: {filterLearn}»</b>}
            </span>
            <button 
              onClick={() => { setFilterTeach(''); setFilterLearn(''); }}
              className="ml-auto underline font-bold cursor-pointer"
            >
              Очистить
            </button>
          </div>
        )}
      </div>

      {/* Users Cards Grid */}
      {filteredUsers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              id={`explore-user-card-${user.id}`}
              className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header: Avatar, Name, Location, Rating */}
                <div className="flex items-start justify-between gap-3 mb-3.5">
                  <div className="flex items-center gap-3">
                    <div className="relative cursor-pointer" onClick={() => onSelectUser(user)}>
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-13 h-13 rounded-2xl object-cover ring-2 ring-emerald-100"
                      />
                      <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" title="Онлайн" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3
                          onClick={() => onSelectUser(user)}
                          className="font-bold text-gray-900 text-base hover:text-emerald-700 cursor-pointer"
                        >
                          {user.name}
                        </h3>
                        {user.verified && (
                          <span title="Подтвержденный профиль">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          <span>{user.city}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-emerald-700 font-medium">
                          <Laptop className="w-3 h-3" />
                          <span>{user.onlineOnly ? 'Только Онлайн' : 'Онлайн / Офлайн'}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Rating Pill */}
                  <div className="text-right shrink-0">
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 border border-amber-200/80 rounded-lg text-amber-900 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{user.rating.toFixed(2)}</span>
                    </div>
                    <p className="text-[10px] text-gray-500 mt-0.5 font-medium">{user.reviewCount} отзывов</p>
                  </div>
                </div>

                {/* Tagline */}
                <p className="text-xs text-gray-600 line-clamp-2 mb-3.5 bg-gray-50/70 p-2 rounded-xl">
                  {user.tagline}
                </p>

                {/* Core Skill Exchange Box */}
                <div className="space-y-2.5 my-3">
                  
                  {/* Teach skills */}
                  <div className="p-2.5 bg-emerald-50/60 rounded-xl border border-emerald-100">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">
                        🎓 Могу научить:
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {user.teachSkills.map((skill) => (
                        <div
                          key={skill.id}
                          className="inline-flex items-center gap-1.5 px-2 py-1 bg-white rounded-lg border border-emerald-200/70 text-xs text-gray-900 font-medium shadow-2xs"
                        >
                          <span>{skill.name}</span>
                          <span className="text-[10px] px-1 py-0.2 bg-emerald-100 text-emerald-800 font-bold rounded">
                            {skill.level.split(' ')[0]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Learn skills */}
                  <div className="p-2.5 bg-teal-50/50 rounded-xl border border-teal-100">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] uppercase font-bold text-teal-800 tracking-wider">
                        🎯 Хочу изучить:
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {user.learnSkills.map((skill) => (
                        <div
                          key={skill.id}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-white rounded-lg border border-teal-200/70 text-xs text-teal-950 font-medium shadow-2xs"
                        >
                          <span>{skill.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {user.badges.slice(0, 3).map((badge, bIdx) => (
                    <span 
                      key={bIdx}
                      className="text-[10px] font-medium px-2 py-0.5 bg-gray-100 text-gray-700 rounded-md"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3 border-t border-gray-100 grid grid-cols-2 gap-2">
                <button
                  id={`explore-user-profile-btn-${user.id}`}
                  onClick={() => onSelectUser(user)}
                  className="w-full py-2.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors text-center cursor-pointer"
                >
                  Профиль и отзывы
                </button>
                <button
                  id={`explore-user-propose-btn-${user.id}`}
                  onClick={() => onProposeExchange(user)}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-white bg-[#0F392B] hover:bg-[#164e3b] rounded-xl transition-colors shadow-2xs cursor-pointer"
                >
                  <Repeat className="w-3.5 h-3.5" />
                  <span>Предложить обмен</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 bg-white rounded-3xl border border-emerald-100 p-8 max-w-lg mx-auto shadow-xs">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">Ничего не найдено</h3>
          <p className="text-sm text-gray-500 mb-6">
            По вашему запросу не нашлось подходящих анкет. Попробуйте смягчить фильтры или станьте первым, кто предложит этот навык!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={clearAllFilters}
              className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-xl transition-colors cursor-pointer"
            >
              Сбросить все фильтры
            </button>
            <button
              onClick={onOpenCreateListing}
              className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-white bg-[#0F392B] hover:bg-[#164e3b] rounded-xl transition-colors cursor-pointer"
            >
              Создать объявление
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
