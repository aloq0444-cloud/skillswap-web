import React from 'react';
import { Repeat, ArrowUpRight, Flame } from 'lucide-react';
import { POPULAR_EXCHANGE_PAIRS } from '../mockData';

interface PopularExchangesProps {
  onSelectPair: (teach: string, learn: string) => void;
}

export const PopularExchanges: React.FC<PopularExchangesProps> = ({ onSelectPair }) => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-1.5">
            <Flame className="w-4 h-4 text-emerald-500" />
            <span>Тренды недели</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Популярные направления обмена
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Самые востребованные комбинации навыков среди студентов и специалистов
          </p>
        </div>
        <div className="text-xs text-gray-500 hidden sm:block">
          Нажмите на карточку, чтобы открыть каталог участников
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {POPULAR_EXCHANGE_PAIRS.map((pair) => (
          <div
            key={pair.id}
            id={`popular-pair-card-${pair.id}`}
            onClick={() => onSelectPair(pair.teach, pair.learn)}
            className="group relative bg-white rounded-2xl p-5 border border-emerald-100/90 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            {/* Top row */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200/60">
                {pair.badge}
              </span>
              <span className="text-xs text-gray-500 font-medium">
                {pair.participantsCount} активных пар
              </span>
            </div>

            {/* Exchange flow */}
            <div className="space-y-2.5 my-2">
              <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-100">
                <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-700 block mb-0.5">
                  Ты преподаешь:
                </span>
                <span className="font-bold text-gray-900 text-sm sm:text-base">
                  {pair.teach}
                </span>
              </div>

              <div className="flex justify-center -my-1 relative z-10">
                <div className="w-7 h-7 rounded-full bg-white border border-emerald-200 text-emerald-600 flex items-center justify-center shadow-xs group-hover:rotate-180 transition-transform duration-300">
                  <Repeat className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="p-3 bg-teal-50/60 rounded-xl border border-teal-100">
                <span className="text-[10px] uppercase tracking-wider font-bold text-teal-700 block mb-0.5">
                  Ты изучаешь:
                </span>
                <span className="font-bold text-gray-900 text-sm sm:text-base">
                  {pair.learn}
                </span>
              </div>
            </div>

            {/* Footer action link */}
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-emerald-700 group-hover:text-emerald-800">
              <span>Смотреть анкеты</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
