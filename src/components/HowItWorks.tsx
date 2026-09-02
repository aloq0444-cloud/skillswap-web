import React from 'react';
import { Search, MessageSquare, Timer, Sparkles, CheckCircle } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: Search,
      number: '1',
      title: 'Укажите свои навыки',
      description: 'Добавьте в профиль предметы, которым можете обучать, и список тем, которые хотите изучить.',
      highlight: 'Бесплатный каталог'
    },
    {
      icon: MessageSquare,
      number: '2',
      title: 'Предложите обмен',
      description: 'Найдите подходящего напарника в каталоге, согласуйте взаимные цели и удобное время встреч.',
      highlight: 'Онлайн или Офлайн'
    },
    {
      icon: Timer,
      number: '3',
      title: 'Проведите сессию 50/50',
      description: 'Занимайтесь пополам: 30-45 минут вы объясняете свой предмет, затем партнер учит вас своему.',
      highlight: 'Без оплаты деньгами'
    }
  ];

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-b from-white via-emerald-50/40 to-white rounded-3xl my-8 border border-emerald-100/80">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Простая механика</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          Как работает взаимный обмен знаниями
        </h2>
        <p className="text-gray-600 text-sm mt-2">
          Принцип P2P-обучения: вместо оплаты деньгами вы делитесь собственным ценным опытом
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-emerald-100/90 shadow-xs relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg">
                    <Icon className="w-6 h-6 text-emerald-700" />
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-200/60">
                    Шаг {step.number}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{step.highlight}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
