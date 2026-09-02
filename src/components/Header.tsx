import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Sparkles, 
  Trophy, 
  Compass, 
  User, 
  Menu, 
  X, 
  PlusCircle, 
  CheckCircle2,
  GraduationCap,
  MessageSquare,
  Sun,
  Moon
} from 'lucide-react';
import { ActiveTab, UserProfile, ThemeMode } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  currentUser: UserProfile;
  onOpenCreateListing: () => void;
  onOpenAuth: () => void;
  isLoggedIn: boolean;
  globalSearchQuery: string;
  setGlobalSearchQuery: (query: string) => void;
  onSearchSubmit: (query: string) => void;
  unreadChatsCount?: number;
  theme: ThemeMode;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  onOpenCreateListing,
  onOpenAuth,
  isLoggedIn,
  globalSearchQuery,
  setGlobalSearchQuery,
  onSearchSubmit,
  unreadChatsCount = 0,
  theme,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearchSubmit(globalSearchQuery);
      setActiveTab('explore');
    }
  };

  const navItems = [
    { id: 'home' as ActiveTab, label: 'Главная', icon: BookOpen },
    { id: 'explore' as ActiveTab, label: 'Каталог обмена', icon: Compass },
    { 
      id: 'chats' as ActiveTab, 
      label: 'Чаты со студентами', 
      icon: MessageSquare, 
      badge: unreadChatsCount > 0 ? String(unreadChatsCount) : undefined 
    },
    { id: 'assistant' as ActiveTab, label: 'ИИ-Ассистент', icon: Sparkles, badge: 'AI' },
    { id: 'dashboard' as ActiveTab, label: 'Рейтинг и Кабинет', icon: Trophy },
    { id: 'profile' as ActiveTab, label: 'Мой профиль', icon: User },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#081710]/90 backdrop-blur-md border-b border-emerald-100 dark:border-emerald-900/60 shadow-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo */}
          <div 
            id="header-logo"
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 cursor-pointer select-none shrink-0 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-400 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform duration-200">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg text-gray-900 dark:text-emerald-50 tracking-tight">Skill<span className="text-emerald-600 dark:text-emerald-400">Swap</span></span>
                <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 bg-emerald-100 dark:bg-emerald-900/80 text-emerald-800 dark:text-emerald-300 rounded-md">P2P</span>
              </div>
              <p className="text-[11px] text-gray-700 dark:text-emerald-400/70 hidden sm:block leading-none">Взаимное обучение</p>
            </div>
          </div>

          {/* Quick Subject Search Bar in Header */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-2">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-emerald-600 dark:text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="header-search-input"
                type="text"
                value={globalSearchQuery}
                onChange={(e) => setGlobalSearchQuery(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder="Найти навык: Английский, Python, Физика..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 rounded-xl text-gray-800 dark:text-emerald-100 placeholder-gray-500 dark:placeholder-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white dark:focus:bg-[#0D241A] transition-all"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-xl transition-all cursor-pointer ${
                    isActive 
                      ? 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/40 shadow-xs' 
                      : 'text-gray-600 dark:text-emerald-200/70 hover:text-gray-900 dark:hover:text-emerald-100 hover:bg-gray-50 dark:hover:bg-emerald-900/20'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-700 dark:text-emerald-400/80'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-full">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-emerald-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            
            {/* Theme Toggle Button */}
            <button
              id="theme-toggle-btn"
              onClick={onToggleTheme}
              className="p-2 text-gray-600 dark:text-emerald-300 hover:text-emerald-700 dark:hover:text-emerald-100 hover:bg-emerald-50 dark:hover:bg-emerald-900/50 rounded-xl transition-all cursor-pointer border border-transparent dark:border-emerald-800/40"
              title={theme === 'dark' ? 'Включить светлую тему' : 'Включить темную тему'}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-300 transition-transform rotate-0 hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-emerald-800 transition-transform -rotate-12 hover:rotate-0" />
              )}
            </button>

            {/* Create listing button */}
            <button
              id="header-create-listing-btn"
              onClick={onOpenCreateListing}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-800 dark:text-emerald-200 bg-emerald-100/90 dark:bg-emerald-900/60 hover:bg-emerald-200/90 dark:hover:bg-emerald-800/80 rounded-xl transition-colors cursor-pointer border border-emerald-200/60 dark:border-emerald-700/50"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Создать обмен</span>
            </button>

            {/* Primary button: Auth / User Profile */}
            {isLoggedIn ? (
              <button
                id="header-profile-btn"
                onClick={() => setActiveTab('profile')}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 bg-[#0F392B] dark:bg-[#134233] hover:bg-[#164e3b] dark:hover:bg-[#1a5542] text-white text-xs font-medium rounded-xl shadow-xs transition-all cursor-pointer border border-emerald-700/40"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-6 h-6 rounded-full object-cover ring-1 ring-emerald-400"
                />
                <span className="max-w-[100px] truncate">{currentUser.name.split(' ')[0]}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              </button>
            ) : (
              <button
                id="header-login-btn"
                onClick={onOpenAuth}
                className="px-4 py-2 bg-[#0F392B] dark:bg-emerald-700 hover:bg-[#164e3b] dark:hover:bg-emerald-600 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-all hover:shadow-md cursor-pointer"
              >
                Войти / Регистрация
              </button>
            )}

            {/* Mobile menu button */}
            <button
              id="header-mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 dark:text-emerald-300 hover:text-gray-900 dark:hover:text-emerald-100 hover:bg-emerald-50 dark:hover:bg-emerald-900/50 rounded-xl transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#0B1E16] border-b border-emerald-100 dark:border-emerald-900/60 px-4 pt-2 pb-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="pb-2">
            <div className="relative">
              <Search className="w-4 h-4 text-emerald-600 dark:text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="mobile-search-input"
                type="text"
                value={globalSearchQuery}
                onChange={(e) => setGlobalSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    onSearchSubmit(globalSearchQuery);
                    setActiveTab('explore');
                    setMobileMenuOpen(false);
                  }
                }}
                placeholder="Поиск по предметам..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-emerald-50/80 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-xl text-gray-800 dark:text-emerald-100 placeholder-gray-500 dark:placeholder-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium ${
                    isActive 
                      ? 'bg-emerald-50 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200' 
                      : 'text-gray-700 dark:text-emerald-100 hover:bg-gray-50 dark:hover:bg-emerald-900/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-700 dark:text-emerald-400/80'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 bg-emerald-500 text-white rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-emerald-100 dark:border-emerald-900/50 flex gap-2">
            <button
              id="mobile-theme-btn"
              onClick={onToggleTheme}
              className="flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-semibold bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 rounded-xl"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-emerald-700" />}
              <span>{theme === 'dark' ? 'Светлая' : 'Темная'}</span>
            </button>
            <button
              id="mobile-create-listing-btn"
              onClick={() => {
                onOpenCreateListing();
                setMobileMenuOpen(false);
              }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-semibold bg-emerald-100 dark:bg-emerald-900/80 text-emerald-800 dark:text-emerald-200 rounded-xl"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Создать обмен</span>
            </button>
            {!isLoggedIn && (
              <button
                id="mobile-auth-btn"
                onClick={() => {
                  onOpenAuth();
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2.5 text-xs font-semibold bg-[#0F392B] dark:bg-emerald-700 text-white rounded-xl"
              >
                Войти
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

