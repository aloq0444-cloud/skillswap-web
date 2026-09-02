import React, { useState } from 'react';
import { X, Repeat, Send, Calendar, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProfile, SkillOffer } from '../types';

interface ExchangeModalProps {
  recipient: UserProfile;
  currentUser: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onSubmitProposal: (proposalData: {
    receiverId: string;
    receiverName: string;
    offeredSkill: string;
    requestedSkill: string;
    message: string;
    format: 'online' | 'offline';
    suggestedSchedule: string;
  }) => void;
}

export const ExchangeModal: React.FC<ExchangeModalProps> = ({
  recipient,
  currentUser,
  isOpen,
  onClose,
  onSubmitProposal,
}) => {
  if (!isOpen) return null;

  const [selectedOfferedSkill, setSelectedOfferedSkill] = useState(
    currentUser.teachSkills[0]?.name || 'React & TypeScript'
  );
  const [selectedRequestedSkill, setSelectedRequestedSkill] = useState(
    recipient.teachSkills[0]?.name || ''
  );
  const [format, setFormat] = useState<'online' | 'offline'>('online');
  const [schedule, setSchedule] = useState('2 раза в неделю по 60 минут (вечером)');
  const [message, setMessage] = useState(
    `Привет, ${recipient.name.split(' ')[0]}! Хочу предложить взаимный обмен: я помогу тебе с «${selectedOfferedSkill}», а взамен буду рад учиться у тебя «${selectedRequestedSkill || recipient.teachSkills[0]?.name}».`
  );
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitProposal({
      receiverId: recipient.id,
      receiverName: recipient.name,
      offeredSkill: selectedOfferedSkill,
      requestedSkill: selectedRequestedSkill || recipient.teachSkills[0]?.name || 'Обмен знаниями',
      message,
      format,
      suggestedSchedule: schedule,
    });

    setSubmitted(true);
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#22C55E', '#10B981', '#059669', '#34D399']
      });
    } catch {}

    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-emerald-100 relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            {/* Modal Header */}
            <div className="flex items-center gap-3.5 mb-6">
              <img
                src={recipient.avatar}
                alt={recipient.name}
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-emerald-200 shadow-xs"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xl font-extrabold text-gray-900">
                    Предложить обмен
                  </h3>
                </div>
                <p className="text-xs text-gray-500">
                  Партнер: <span className="font-bold text-gray-800">{recipient.name}</span> ({recipient.city})
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* What I offer */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  🎓 Чему вы можете обучить ({currentUser.name.split(' ')[0]}):
                </label>
                <select
                  value={selectedOfferedSkill}
                  onChange={(e) => {
                    setSelectedOfferedSkill(e.target.value);
                    setMessage(
                      `Привет, ${recipient.name.split(' ')[0]}! Хочу предложить взаимный обмен: я помогу тебе с «${e.target.value}», а взамен буду рад учиться у тебя «${selectedRequestedSkill}».`
                    );
                  }}
                  className="w-full px-3.5 py-2.5 bg-emerald-50/50 border border-emerald-200 rounded-xl text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {currentUser.teachSkills.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name} ({s.level})
                    </option>
                  ))}
                  <option value="Другой персональный навык">Другой персональный навык (укажу в сообщении)</option>
                </select>
              </div>

              {/* What I want to learn from recipient */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  🎯 Чему вы хотите научиться у {recipient.name.split(' ')[0]}:
                </label>
                <select
                  value={selectedRequestedSkill}
                  onChange={(e) => {
                    setSelectedRequestedSkill(e.target.value);
                    setMessage(
                      `Привет, ${recipient.name.split(' ')[0]}! Хочу предложить взаимный обмен: я помогу тебе с «${selectedOfferedSkill}», а взамен буду рад учиться у тебя «${e.target.value}».`
                    );
                  }}
                  className="w-full px-3.5 py-2.5 bg-teal-50/50 border border-teal-200 rounded-xl text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {recipient.teachSkills.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name} ({s.level})
                    </option>
                  ))}
                </select>
              </div>

              {/* Format & Schedule */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Формат встреч:
                  </label>
                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="online">Онлайн (Google Meet / Zoom)</option>
                    {!recipient.onlineOnly && <option value="offline">Офлайн ({recipient.city})</option>}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Удобный график:
                  </label>
                  <input
                    type="text"
                    value={schedule}
                    onChange={(e) => setSchedule(e.target.value)}
                    placeholder="Например: Вт и Чт в 19:00"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Личное сообщение партнеру:
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed font-normal"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  id="submit-proposal-modal-btn"
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#0F392B] hover:bg-[#164e3b] text-white text-sm font-bold rounded-2xl shadow-md transition-all active:scale-98 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-emerald-300" />
                  <span>Отправить заявку на обмен</span>
                </button>
                <p className="text-[11px] text-gray-500 text-center mt-2">
                  Заявка появится в личном кабинете напарника. Обмен полностью бесплатен!
                </p>
              </div>

            </form>
          </div>
        ) : (
          /* Success Screen */
          <div className="py-8 text-center space-y-3">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-extrabold text-gray-900">
              Заявка успешно отправлена!
            </h3>
            <p className="text-sm text-gray-600 max-w-xs mx-auto">
              Мы уведомили {recipient.name}. Вы можете следить за статусом во вкладке «Рейтинг и Кабинет».
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
