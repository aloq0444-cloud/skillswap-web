import React, { useState } from 'react';
import { X, PlusCircle, Sparkles, CheckCircle2, GraduationCap, Target } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Category, SkillLevel } from '../types';

interface CreateListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateListing: (data: {
    teachSkillName: string;
    teachCategory: Category;
    teachLevel: SkillLevel;
    teachDescription: string;
    learnSkillName: string;
    learnCategory: Category;
    learnGoal: string;
    city: string;
    onlineOnly: boolean;
  }) => void;
}

export const CreateListingModal: React.FC<CreateListingModalProps> = ({
  isOpen,
  onClose,
  onCreateListing,
}) => {
  if (!isOpen) return null;

  const [teachSkillName, setTeachSkillName] = useState('');
  const [teachCategory, setTeachCategory] = useState<Category>('languages');
  const [teachLevel, setTeachLevel] = useState<SkillLevel>('Продвинутый');
  const [teachDescription, setTeachDescription] = useState('');

  const [learnSkillName, setLearnSkillName] = useState('');
  const [learnCategory, setLearnCategory] = useState<Category>('programming');
  const [learnGoal, setLearnGoal] = useState('');

  const [city, setCity] = useState('Москва');
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teachSkillName.trim() || !learnSkillName.trim()) return;

    onCreateListing({
      teachSkillName,
      teachCategory,
      teachLevel,
      teachDescription,
      learnSkillName,
      learnCategory,
      learnGoal,
      city,
      onlineOnly,
    });

    setSubmitted(true);
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#22C55E', '#10B981', '#0F392B']
      });
    } catch {}

    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-emerald-100 relative max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <PlusCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-gray-900">
                  Разместить объявление об обмене
                </h3>
                <p className="text-xs text-gray-500">
                  Ваша карточка появится в общем каталоге для поиска партнеров
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Section 1: Teach */}
              <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-200/70 space-y-3">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                  <GraduationCap className="w-4 h-4 text-emerald-600" />
                  <span>Чему вы готовы научить</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Название предмета / навыка:
                  </label>
                  <input
                    type="text"
                    required
                    value={teachSkillName}
                    onChange={(e) => setTeachSkillName(e.target.value)}
                    placeholder="Например: Разговорный Испанский (B2), Python для детей, Гитара..."
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-emerald-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                      Категория:
                    </label>
                    <select
                      value={teachCategory}
                      onChange={(e) => setTeachCategory(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs bg-white border border-emerald-200 rounded-xl text-gray-800 font-medium focus:outline-none"
                    >
                      <option value="languages">Языки</option>
                      <option value="exact_sciences">Точные науки</option>
                      <option value="programming">Программирование</option>
                      <option value="art_design">Искусство и Дизайн</option>
                      <option value="music">Музыка</option>
                      <option value="business">Бизнес и Маркетинг</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                      Ваш уровень владения:
                    </label>
                    <select
                      value={teachLevel}
                      onChange={(e) => setTeachLevel(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs bg-white border border-emerald-200 rounded-xl text-gray-800 font-medium focus:outline-none"
                    >
                      <option value="Начальный">Начальный</option>
                      <option value="Средний">Средний</option>
                      <option value="Продвинутый">Продвинутый</option>
                      <option value="Эксперт / Носитель">Эксперт / Носитель</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    Краткое описание подхода / программы:
                  </label>
                  <textarea
                    rows={2}
                    value={teachDescription}
                    onChange={(e) => setTeachDescription(e.target.value)}
                    placeholder="Например: Объясняю на практике, даю домашние задания, делюсь шпаргалками..."
                    className="w-full p-2.5 text-xs bg-white border border-emerald-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Section 2: Learn */}
              <div className="p-4 bg-teal-50/50 rounded-2xl border border-teal-200/70 space-y-3">
                <div className="flex items-center gap-2 text-teal-950 font-bold text-sm">
                  <Target className="w-4 h-4 text-teal-600" />
                  <span>Чему вы хотите научиться взамен</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Интересующий предмет:
                  </label>
                  <input
                    type="text"
                    required
                    value={learnSkillName}
                    onChange={(e) => setLearnSkillName(e.target.value)}
                    placeholder="Например: Квантовая физика, Основы Figma, Вокал..."
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-teal-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                      Категория:
                    </label>
                    <select
                      value={learnCategory}
                      onChange={(e) => setLearnCategory(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs bg-white border border-teal-200 rounded-xl text-gray-800 font-medium focus:outline-none"
                    >
                      <option value="programming">Программирование</option>
                      <option value="languages">Языки</option>
                      <option value="exact_sciences">Точные науки</option>
                      <option value="art_design">Искусство и Дизайн</option>
                      <option value="music">Музыка</option>
                      <option value="business">Бизнес и Маркетинг</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                      Ваша цель изучения:
                    </label>
                    <input
                      type="text"
                      value={learnGoal}
                      onChange={(e) => setLearnGoal(e.target.value)}
                      placeholder="Например: Для переезда / проекта"
                      className="w-full px-3 py-2 text-xs bg-white border border-teal-200 rounded-xl text-gray-900 focus:outline-none font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Location & Format */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Город проживания:
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none font-medium"
                  />
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 text-xs font-medium text-gray-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={onlineOnly}
                      onChange={(e) => setOnlineOnly(e.target.checked)}
                      className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                    />
                    <span>Только Онлайн занятия (без офлайна)</span>
                  </label>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#0F392B] hover:bg-[#164e3b] text-white text-sm font-bold rounded-2xl shadow-md transition-all active:scale-98 cursor-pointer"
                >
                  Опубликовать объявление в каталоге
                </button>
              </div>

            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-3">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-extrabold text-gray-900">
              Объявление опубликовано!
            </h3>
            <p className="text-sm text-gray-600 max-w-xs mx-auto">
              Ваша карточка доступна во вкладке «Каталог обмена». Удачи в поиске напарников!
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
