import React, { useState } from 'react';
import { X, Lock, Mail, User, CheckCircle2, GraduationCap } from 'lucide-react';
import { UserProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: UserProfile) => void;
  availableUsers: UserProfile[];
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  availableUsers,
}) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default demo login to primary user or create quick profile
    const userToLogin: UserProfile = availableUsers[0] || {
      id: `user-${Date.now()}`,
      name: name || 'Ученик SkillSwap',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      tagline: 'Участник платформы взаимного обучения',
      city: 'Москва',
      onlineOnly: false,
      rating: 5.0,
      reviewCount: 0,
      completedSessions: 0,
      responseRate: '100%',
      badges: ['🌱 Новичок'],
      bio: 'Готов учиться и делиться знаниями!',
      verified: true,
      joinedDate: 'Сегодня',
      teachSkills: [],
      learnSkills: [],
      reviews: [],
    };

    onLogin(userToLogin);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-emerald-100 relative">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-3">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-extrabold text-gray-900">
            {mode === 'login' ? 'Вход в SkillSwap' : 'Регистрация на платформе'}
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Обменивайтесь навыками без денег и скрытых тарифов
          </p>
        </div>

        {/* Quick Demo Switcher */}
        <div className="mb-5 p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-200/80">
          <span className="text-[11px] font-bold text-emerald-900 block mb-2">
            Быстрый вход под демо-аккаунтом:
          </span>
          <div className="grid grid-cols-2 gap-2">
            {availableUsers.slice(0, 2).map((u) => (
              <button
                key={u.id}
                type="button"
                onClick={() => {
                  onLogin(u);
                  onClose();
                }}
                className="flex items-center gap-2 p-2 bg-white rounded-xl border border-emerald-200 text-left hover:bg-emerald-100 transition-colors cursor-pointer"
              >
                <img src={u.avatar} alt={u.name} className="w-7 h-7 rounded-full object-cover" />
                <div className="truncate">
                  <span className="font-bold text-xs text-gray-900 block truncate">{u.name.split(' ')[0]}</span>
                  <span className="text-[10px] text-emerald-700">{u.completedSessions} сессий</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Ваше имя:</label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Иван Петров"
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Email адрес:</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Пароль:</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-[#0F392B] hover:bg-[#164e3b] text-white text-xs sm:text-sm font-bold rounded-2xl shadow-md transition-all active:scale-98 cursor-pointer"
            >
              {mode === 'login' ? 'Войти в аккаунт' : 'Зарегистрироваться'}
            </button>
          </div>
        </form>

        <div className="text-center mt-4 pt-3 border-t border-gray-100">
          <button
            type="button"
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            className="text-xs text-emerald-800 hover:underline font-semibold cursor-pointer"
          >
            {mode === 'login' ? 'Еще нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
          </button>
        </div>

      </div>
    </div>
  );
};
