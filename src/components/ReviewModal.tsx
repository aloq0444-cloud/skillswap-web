import React, { useState } from 'react';
import { X, Star, MessageSquare, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProfile } from '../types';

interface ReviewModalProps {
  recipient: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (reviewData: {
    recipientId: string;
    rating: number;
    skillPair: string;
    comment: string;
  }) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  recipient,
  isOpen,
  onClose,
  onSubmitReview,
}) => {
  if (!isOpen) return null;

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [skillPair, setSkillPair] = useState(
    recipient.teachSkills[0] ? `${recipient.teachSkills[0].name} ↔ Мой навык` : 'Взаимный обмен'
  );
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    onSubmitReview({
      recipientId: recipient.id,
      rating,
      skillPair,
      comment,
    });

    setSubmitted(true);
    try {
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.6 },
        colors: ['#22C55E', '#F59E0B']
      });
    } catch {}

    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1400);
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

        {!submitted ? (
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img
                src={recipient.avatar}
                alt={recipient.name}
                className="w-12 h-12 rounded-2xl object-cover ring-2 ring-emerald-200"
              />
              <div>
                <h3 className="text-xl font-extrabold text-gray-900">
                  Оставить отзыв
                </h3>
                <p className="text-xs text-gray-500">
                  Оцените опыт взаимного обучения с {recipient.name}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Star Rating Picker */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 text-center">
                  Ваша общая оценка:
                </label>
                <div className="flex items-center justify-center gap-2 py-1">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isFilled = (hoverRating || rating) >= star;
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            isFilled
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Skill pair */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Пара предметов обмена:
                </label>
                <input
                  type="text"
                  value={skillPair}
                  onChange={(e) => setSkillPair(e.target.value)}
                  placeholder="Например: Python ↔ Английский"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>

              {/* Comment text */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Ваш отзыв и впечатления от сессии:
                </label>
                <textarea
                  rows={4}
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Насколько партнер понятно объяснял материал? Соблюдался ли тайминг 50/50?..."
                  className="w-full p-3 text-xs bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-normal"
                />
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#0F392B] hover:bg-[#164e3b] text-white text-xs sm:text-sm font-bold rounded-2xl shadow-md transition-all active:scale-98 cursor-pointer"
                >
                  Опубликовать отзыв
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
              Спасибо за отзыв!
            </h3>
            <p className="text-sm text-gray-600 max-w-xs mx-auto">
              Ваш отзыв поможет другим участникам выбирать лучших напарников.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
