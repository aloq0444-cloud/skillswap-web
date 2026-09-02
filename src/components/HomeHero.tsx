import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Repeat, 
  ShieldCheck, 
  Users, 
  Zap,
  BookMarked
} from 'lucide-react';

interface HomeHeroProps {
  onSearchExchange: (wantToLearn: string, canTeach: string) => void;
  onOpenAiAssistant: () => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  onSearchExchange,
  onOpenAiAssistant,
}) => {
  const [wantToLearn, setWantToLearn] = useState('');
  const [canTeach, setCanTeach] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchExchange(wantToLearn, canTeach);
  };

  const sampleTags = [
    { want: 'Физика', teach: 'Английский' },
    { want: 'UI/UX Дизайн', teach: 'Python' },
    { want: 'Высшая математика', teach: 'Немецкий' },
    { want: 'Гитара', teach: 'Китайский' },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-[#F0FDF4] to-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-b border-emerald-100/60">
      {/* Decorative ambient blurred spots */}
      <div className="absolute -top-24 -left-20 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-0 w-80 h-80 bg-green-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        
        {/* Top pill badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold tracking-wide mb-6 border border-emerald-200/60 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Равноправное взаимное обучение • 1-на-1</span>
        </div>

        {/* Main Hero Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.15] max-w-4xl mx-auto">
          Обменивайся знаниями <br className="hidden sm:inline" />
          <span className="text-emerald-700 underline decoration-emerald-300 decoration-wavy decoration-2 underline-offset-8">
            без денег
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Платформа честного бартера навыков: учи других тому, в чем ты профи, и бесплатно получай практические знания от увлеченных напарников.
        </p>

        {/* Interactive Fast Matching Search Box */}
        <div className="mt-9 max-w-3xl mx-auto bg-white p-3 sm:p-4 rounded-2xl shadow-xl shadow-emerald-900/5 border border-emerald-100">
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center gap-3">
            
            {/* Input: Want to learn */}
            <div className="w-full flex-1 text-left">
              <label htmlFor="hero-learn-input" className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1 px-1">
                Я хочу научиться:
              </label>
              <div className="relative">
                <input
                  id="hero-learn-input"
                  type="text"
                  value={wantToLearn}
                  onChange={(e) => setWantToLearn(e.target.value)}
                  placeholder="Например: Физика, Python, Китайский..."
                  className="w-full px-3.5 py-2.5 bg-emerald-50/40 border border-emerald-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all font-medium"
                />
              </div>
            </div>

            {/* Middle exchange icon */}
            <div className="hidden md:flex items-center justify-center pt-5">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Repeat className="w-4 h-4" />
              </div>
            </div>

            {/* Input: Can teach */}
            <div className="w-full flex-1 text-left">
              <label htmlFor="hero-teach-input" className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1 px-1">
                Я могу научить:
              </label>
              <div className="relative">
                <input
                  id="hero-teach-input"
                  type="text"
                  value={canTeach}
                  onChange={(e) => setCanTeach(e.target.value)}
                  placeholder="Например: Английский, Figma, Гитара..."
                  className="w-full px-3.5 py-2.5 bg-emerald-50/40 border border-emerald-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all font-medium"
                />
              </div>
            </div>

            {/* Search Button (Dark contrast) */}
            <div className="w-full md:w-auto pt-2 md:pt-5">
              <button
                id="hero-search-btn"
                type="submit"
                className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-[#0F392B] hover:bg-[#164e3b] text-white font-semibold text-sm rounded-xl shadow-md transition-all duration-150 hover:shadow-lg active:scale-95 cursor-pointer whitespace-nowrap"
              >
                <span>Найти пару</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Quick preset chips */}
          <div className="mt-3 pt-3 border-t border-emerald-100/80 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-gray-500 font-medium">Быстрый подбор:</span>
            {sampleTags.map((tag, idx) => (
              <button
                key={idx}
                id={`hero-preset-tag-${idx}`}
                type="button"
                onClick={() => {
                  setWantToLearn(tag.want);
                  setCanTeach(tag.teach);
                  onSearchExchange(tag.want, tag.teach);
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200/70 hover:bg-emerald-100 hover:border-emerald-300 transition-colors cursor-pointer"
              >
                <span>{tag.want}</span>
                <span className="text-emerald-500 font-bold">↔</span>
                <span>{tag.teach}</span>
              </button>
            ))}
          </div>
        </div>

        {/* AI Assistant Callout banner */}
        <div className="mt-7 inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-emerald-100/90 via-green-100/80 to-teal-100/90 rounded-2xl border border-emerald-200/80 shadow-xs">
          <div className="w-7 h-7 rounded-lg bg-[#0F392B] text-white flex items-center justify-center shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
          </div>
          <p className="text-xs sm:text-sm text-gray-800 text-left">
            Не знаете, как составить план парных занятий? 
            <button 
              id="hero-ai-callout-btn"
              onClick={onOpenAiAssistant}
              className="ml-1.5 font-bold text-emerald-800 hover:text-emerald-950 underline cursor-pointer"
            >
              Спросите ИИ-Ассистента →
            </button>
          </p>
        </div>

        {/* Trust Badges / Stats Bar */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-emerald-100">
          <div className="flex flex-col items-center p-3 rounded-xl bg-white/70 border border-emerald-100/60 shadow-2xs">
            <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xl sm:text-2xl">
              <Zap className="w-5 h-5 text-emerald-500" />
              <span>0 ₽</span>
            </div>
            <span className="text-xs text-gray-500 mt-0.5">Бесплатный обмен</span>
          </div>

          <div className="flex flex-col items-center p-3 rounded-xl bg-white/70 border border-emerald-100/60 shadow-2xs">
            <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xl sm:text-2xl">
              <Users className="w-5 h-5 text-emerald-500" />
              <span>1 450+</span>
            </div>
            <span className="text-xs text-gray-500 mt-0.5">Активных участников</span>
          </div>

          <div className="flex flex-col items-center p-3 rounded-xl bg-white/70 border border-emerald-100/60 shadow-2xs">
            <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xl sm:text-2xl">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <span>4.96 ★</span>
            </div>
            <span className="text-xs text-gray-500 mt-0.5">Средний рейтинг</span>
          </div>

          <div className="flex flex-col items-center p-3 rounded-xl bg-white/70 border border-emerald-100/60 shadow-2xs">
            <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xl sm:text-2xl">
              <BookMarked className="w-5 h-5 text-emerald-500" />
              <span>50 / 50</span>
            </div>
            <span className="text-xs text-gray-500 mt-0.5">Честное время сессий</span>
          </div>
        </div>

      </div>
    </section>
  );
};
