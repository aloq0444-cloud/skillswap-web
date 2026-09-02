import { UserProfile, ExchangeProposal, ActiveSession, StudentConversation } from './types';

export const CURRENT_USER: UserProfile = {
  id: 'user-me',
  name: 'Константин Васильев',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  tagline: 'Frontend-разработчик и любитель астрофизики',
  city: 'Москва',
  onlineOnly: false,
  rating: 4.95,
  reviewCount: 18,
  completedSessions: 42,
  responseRate: '99%',
  badges: ['🌟 Топ ментор', '🚀 40+ сессий', '⚡️ Быстрый ответ', '🎓 Сертифицирован'],
  bio: 'Привет! Работаю фронтенд-инженером более 5 лет (React, TypeScript, Tailwind, Node.js). Обожаю делиться опытом с новичками и практиковать реальные задачи. В ответ мечтаю подтянуть разговорный английский до уровня C1 и освоить основы квантовой физики.',
  verified: true,
  weeklyRank: 4,
  joinedDate: 'Сентябрь 2024',
  teachSkills: [
    {
      id: 'ts-1',
      name: 'React & TypeScript',
      category: 'programming',
      level: 'Эксперт / Носитель',
      description: 'Архитектура современных приложений, хуки, стейт-менеджмент, оптимизация рендеринга.'
    },
    {
      id: 'ts-2',
      name: 'HTML5 & Современный Tailwind CSS',
      category: 'programming',
      level: 'Эксперт / Носитель',
      description: 'Адаптивная верстка, анимации, дизайн-системы, доступность (a11y).'
    }
  ],
  learnSkills: [
    {
      id: 'ls-1',
      name: 'Разговорный английский (C1)',
      category: 'languages',
      goal: 'Свободное прохождение зарубежных технических собеседований и беглое обсуждение сложных тем.'
    },
    {
      id: 'ls-2',
      name: 'Квантовая и общая физика',
      category: 'exact_sciences',
      goal: 'Понимание фундаментальных принципов, квантовой механики и теории относительности без занудства.'
    }
  ],
  reviews: [
    {
      id: 'rev-me-1',
      authorId: 'user-1',
      authorName: 'Алексей Смирнов',
      authorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      date: '3 дня назад',
      skillPair: 'React ↔ Разговорный Английский',
      comment: 'Константин — потрясающий наставник! Всего за 3 сессии разложил мне по полочкам хуки и контекст в React. Я в ответ помог подготовить презентацию на английском. Чистый бартер, польза 100%!',
      likes: 8
    },
    {
      id: 'rev-me-2',
      authorId: 'user-3',
      authorName: 'Максим Власов',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      date: '2 недели назад',
      skillPair: 'TypeScript ↔ Матанализ',
      comment: 'Очень пунктуальный и структурированный ментор. Время делили ровно 50/50 по таймеру, всё очень продуктивно.',
      likes: 4
    }
  ]
};

export const INITIAL_USERS: UserProfile[] = [
  {
    id: 'user-1',
    name: 'Алексей Смирнов',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
    tagline: 'Аспирант МФТИ, фанат теоретической физики',
    city: 'Москва',
    onlineOnly: false,
    rating: 4.98,
    reviewCount: 34,
    completedSessions: 78,
    responseRate: '100%',
    badges: ['🏆 Лидер недели', '🔬 Ученый', '🗣 IELTS 8.5', '🤝 Надежный напарник'],
    bio: 'Преподаю общую и теоретическую физику, механику, электродинамику и математику. Объясняю на простых жизненных моделях. Ищу партнера для углубления в веб-разработку на Python/React или практических занятий французским.',
    verified: true,
    weeklyRank: 1,
    joinedDate: 'Июнь 2024',
    teachSkills: [
      {
        id: 'u1-t1',
        name: 'Общая физика и Механика',
        category: 'exact_sciences',
        level: 'Эксперт / Носитель',
        description: 'Университетский уровень, подготовка к олимпиадам и экзаменам, наглядные примеры.'
      },
      {
        id: 'u1-t2',
        name: 'Академический Английский (IELTS 8.5)',
        category: 'languages',
        level: 'Эксперт / Носитель',
        description: 'Научные статьи, академическое письмо, свободная беглая речь.'
      }
    ],
    learnSkills: [
      {
        id: 'u1-l1',
        name: 'Python & Data Science',
        category: 'programming',
        goal: 'Автоматизация физических вычислений, библиотеки NumPy, SciPy, Matplotlib.'
      },
      {
        id: 'u1-l2',
        name: 'Французский язык с нуля (A1-A2)',
        category: 'languages',
        goal: 'Базовая грамматика и разговорная практика для путешествий.'
      }
    ],
    reviews: [
      {
        id: 'u1-r1',
        authorId: 'user-2',
        authorName: 'Елена Романова',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        date: 'Вчера',
        skillPair: 'Физика ↔ UI/UX Дизайн',
        comment: 'Алексей помог понять оптику и теорию цвета с точки зрения физики волн! А я научила его делать аккуратные презентации в Figma.',
        likes: 12
      },
      {
        id: 'u1-r2',
        authorId: 'user-4',
        authorName: 'Дарья Ким',
        authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        date: 'Неделю назад',
        skillPair: 'Английский ↔ Китайский',
        comment: 'У Алексея идеальное произношение и огромный словарный запас. Занятия проходят на одном дыхании.',
        likes: 9
      }
    ]
  },
  {
    id: 'user-2',
    name: 'Елена Романова',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    tagline: 'Lead Product Designer в FinTech, ментор Figma',
    city: 'Санкт-Петербург',
    onlineOnly: false,
    rating: 4.96,
    reviewCount: 29,
    completedSessions: 64,
    responseRate: '98%',
    badges: ['🎨 Pro Дизайнер', '⚡️ Супер-отзывы', '🔥 50+ сессий'],
    bio: 'Делаю удобные интерфейсы 7 лет. Обучаю Figma, дизайн-системам, UX-исследованиям и анимациям. Хочу подтянуть Python для работы с генеративными нейросетями и изучить испанский язык.',
    verified: true,
    weeklyRank: 2,
    joinedDate: 'Август 2024',
    teachSkills: [
      {
        id: 'u2-t1',
        name: 'UI/UX Дизайн & Figma Pro',
        category: 'art_design',
        level: 'Эксперт / Носитель',
        description: 'Компоненты, автолейауты, переменные, прототипирование и передача в разработку.'
      },
      {
        id: 'u2-t2',
        name: 'UX-исследования и CJM',
        category: 'art_design',
        level: 'Продвинутый',
        description: 'Кастдевы, юзабилити-тестирование, анализ пользовательских путей.'
      }
    ],
    learnSkills: [
      {
        id: 'u2-l1',
        name: 'Python & Generative AI',
        category: 'programming',
        goal: 'Написание скриптов, работа с API Stable Diffusion и LLM для автоматизации дизайна.'
      },
      {
        id: 'u2-l2',
        name: 'Испанский язык (B1)',
        category: 'languages',
        goal: 'Практика живой речи, грамматика Subjuntivo.'
      }
    ],
    reviews: [
      {
        id: 'u2-r1',
        authorId: 'user-5',
        authorName: 'Илья Новиков',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        date: '4 дня назад',
        skillPair: 'Figma ↔ 3D Blender',
        comment: 'Елена научила меня выстраивать сетки и дизайн-токены так, как делают в топ-студиях. Очень рекомендую!',
        likes: 6
      }
    ]
  },
  {
    id: 'user-3',
    name: 'Максим Власов',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    tagline: 'Data Scientist & любитель немецкой литературы',
    city: 'Казань',
    onlineOnly: true,
    rating: 4.92,
    reviewCount: 22,
    completedSessions: 51,
    responseRate: '95%',
    badges: ['📐 Математик', '🇩🇪 TestDaF C1', '🤝 Точный тайминг'],
    bio: 'Закончил мехмат, работаю в машинном обучении. Свободно говорю по-немецки (прожил 3 года в Берлине). Готов обучать немецкому или матанализу/линейной алгебре в обмен на уроки игры на электрогитаре или уроки вокала.',
    verified: true,
    weeklyRank: 3,
    joinedDate: 'Июль 2024',
    teachSkills: [
      {
        id: 'u3-t1',
        name: 'Немецкий язык (C1 / TestDaF)',
        category: 'languages',
        level: 'Эксперт / Носитель',
        description: 'Разговорный немецкий, подготовка к Goethe/TestDaF, грамматика без стресса.'
      },
      {
        id: 'u3-t2',
        name: 'Высшая математика & Линал',
        category: 'exact_sciences',
        level: 'Эксперт / Носитель',
        description: 'Дифференциальные уравнения, теория вероятностей, линейная алгебра для ML.'
      }
    ],
    learnSkills: [
      {
        id: 'u3-l1',
        name: 'Электрогитара и риффы',
        category: 'music',
        goal: 'Постановка рук, основы импровизации в блюзе и роке, чтение табов.'
      },
      {
        id: 'u3-l2',
        name: 'Эстрадный вокал',
        category: 'music',
        goal: 'Дыхание, опора звука, расширение диапазона.'
      }
    ],
    reviews: [
      {
        id: 'u3-r1',
        authorId: 'user-6',
        authorName: 'София Морозова',
        authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        date: '5 дней назад',
        skillPair: 'Немецкий ↔ Вокал',
        comment: 'Прекрасный преподаватель! Немецкая грамматика наконец перестала казаться страшной.',
        likes: 7
      }
    ]
  },
  {
    id: 'user-4',
    name: 'Дарья Ким',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    tagline: 'Преподаватель китайского HSK 5 & Мультиинструменталист',
    city: 'Новосибирск',
    onlineOnly: false,
    rating: 4.97,
    reviewCount: 31,
    completedSessions: 73,
    responseRate: '100%',
    badges: ['🀄️ HSK 5', '🎸 Гитара Pro', '🏆 Топ рейтинга'],
    bio: 'Училась в Шанхае 4 года. Объясняю тоны, иероглифику и живые идиомы китайского языка. Также играю на акустической гитаре и укулеле 10 лет. Хочу подтянуть академический английский и основы Python-кодинга.',
    verified: true,
    weeklyRank: 5,
    joinedDate: 'Май 2024',
    teachSkills: [
      {
        id: 'u4-t1',
        name: 'Китайский язык (HSK 1-5)',
        category: 'languages',
        level: 'Эксперт / Носитель',
        description: 'Фонетика (пиньинь, тоны), ключи иероглифов, живая разговорная практика.'
      },
      {
        id: 'u4-t2',
        name: 'Акустическая гитара и фингерстайл',
        category: 'music',
        level: 'Продвинутый',
        description: 'Аккорды, бой, переборы, разбор любимых песен с первого занятия.'
      }
    ],
    learnSkills: [
      {
        id: 'u4-l1',
        name: 'Английский для академических статей',
        category: 'languages',
        goal: 'Подготовка к сдаче TOEFL, продвинутая эссеистика.'
      },
      {
        id: 'u4-l2',
        name: 'Python с нуля',
        category: 'programming',
        goal: 'Парсинг текстов на китайском, автоматизация лингвистических таблиц.'
      }
    ],
    reviews: [
      {
        id: 'u4-r1',
        authorId: 'user-1',
        authorName: 'Алексей Смирнов',
        authorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        date: '10 дней назад',
        skillPair: 'Китайский ↔ Английский',
        comment: 'Дарья объяснила структуру тонов буквально за 40 минут! Очень рекомендую как терпеливого и чуткого педагога.',
        likes: 11
      }
    ]
  },
  {
    id: 'user-5',
    name: 'Илья Новиков',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    tagline: '3D Artist в геймдеве (Blender, Unreal Engine 5)',
    city: 'Екатеринбург',
    onlineOnly: true,
    rating: 4.88,
    reviewCount: 16,
    completedSessions: 38,
    responseRate: '94%',
    badges: ['🎮 3D Мастер', '💡 Практик', '⚡️ Быстрый результат'],
    bio: 'Создаю окружение и персонажей для инди-игр. Обучаю пайплайну Blender (моделинг, развертка, текстурирование в Substance, экспорт в движок). Хочу научиться создавать сайты на React/Next.js и верстать портфолио.',
    verified: true,
    weeklyRank: 6,
    joinedDate: 'Октябрь 2024',
    teachSkills: [
      {
        id: 'u5-t1',
        name: '3D-моделирование в Blender',
        category: 'art_design',
        level: 'Эксперт / Носитель',
        description: 'Hard surface моделирование, скульптинг, правильная топология и UV-развертка.'
      }
    ],
    learnSkills: [
      {
        id: 'u5-l1',
        name: 'Веб-разработка (React & Tailwind)',
        category: 'programming',
        goal: 'Создание собственного интерактивного 3D-портфолио на Three.js / React.'
      }
    ],
    reviews: [
      {
        id: 'u5-r1',
        authorId: 'user-me',
        authorName: 'Константин Васильев',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        date: '3 недели назад',
        skillPair: 'Blender ↔ React',
        comment: 'Илья показал крутые лайфхаки по оптимизации полигонов для веба. Очень доволен обменом!',
        likes: 5
      }
    ]
  },
  {
    id: 'user-6',
    name: 'София Морозова',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    tagline: 'Преподаватель испанского языка (DELE C1) и вокала',
    city: 'Минск',
    onlineOnly: false,
    rating: 4.94,
    reviewCount: 25,
    completedSessions: 59,
    responseRate: '99%',
    badges: ['🇪🇸 DELE C1', '🎤 Вокал Pro', '❤️ Душевные уроки'],
    bio: 'Выпускница консерватории и переводчик испанского. Обучаю чистому испанскому произношению, живому сленгу Мадрида и латиноамериканским диалектам. В вокале ставлю правильное диафрагмальное дыхание. Хочу выучить финансовую грамотность и основы таргетированной рекламы.',
    verified: true,
    weeklyRank: 7,
    joinedDate: 'Июнь 2024',
    teachSkills: [
      {
        id: 'u6-t1',
        name: 'Испанский язык (A1 - C1)',
        category: 'languages',
        level: 'Эксперт / Носитель',
        description: 'Разговорная практика, преодоление языкового зажима, культура Испании.'
      },
      {
        id: 'u6-t2',
        name: 'Постановка голоса и вокал',
        category: 'music',
        level: 'Эксперт / Носитель',
        description: 'Снятие зажимов, дыхание, расширение диапазона, интонирование.'
      }
    ],
    learnSkills: [
      {
        id: 'u6-l1',
        name: 'Маркетинг и Таргет',
        category: 'business',
        goal: 'Продвижение своего музыкального проекта в соцсетях и запуск воронки.'
      }
    ],
    reviews: [
      {
        id: 'u6-r1',
        authorId: 'user-3',
        authorName: 'Максим Власов',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        date: '2 недели назад',
        skillPair: 'Вокал ↔ Немецкий',
        comment: 'София — великолепный педагог! Всего за пару уроков почувствовал опору и снял зажим в горле.',
        likes: 8
      }
    ]
  },
  {
    id: 'user-7',
    name: 'Артем Лебедев',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80',
    tagline: 'Growth Hacker, эксперт по перформанс-маркетингу',
    city: 'Алматы',
    onlineOnly: false,
    rating: 4.91,
    reviewCount: 19,
    completedSessions: 44,
    responseRate: '96%',
    badges: ['📈 Маркетинг Гуру', '💼 Бизнес-кейсы', '🚀 Рост трафика'],
    bio: 'Управляю маркетинговыми бюджетами $50k+, настраиваю сквозную аналитику, юнит-экономику и воронки продаж. Ищу наставника по французскому языку для переезда или опытного математика для понимания алгоритмов машинного обучения.',
    verified: true,
    weeklyRank: 8,
    joinedDate: 'Ноябрь 2024',
    teachSkills: [
      {
        id: 'u7-t1',
        name: 'Digital-маркетинг & Аналитика',
        category: 'business',
        level: 'Эксперт / Носитель',
        description: 'Google Analytics 4, юнит-экономика, когортный анализ, масштабирование трафика.'
      }
    ],
    learnSkills: [
      {
        id: 'u7-l1',
        name: 'Французский язык (B1-B2)',
        category: 'languages',
        goal: 'Подготовка к собеседованию во французскую компанию.'
      }
    ],
    reviews: [
      {
        id: 'u7-r1',
        authorId: 'user-2',
        authorName: 'Елена Романова',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        date: 'Неделю назад',
        skillPair: 'Маркетинг ↔ UI/UX',
        comment: 'Артем помог настроить конверсионные цели для лендинга. Четко, по делу и с цифрами.',
        likes: 4
      }
    ]
  },
  {
    id: 'user-8',
    name: 'Анна Зайцева',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    tagline: 'Химик-биоорганик, репетитор олимпиадников',
    city: 'Казань',
    onlineOnly: true,
    rating: 4.95,
    reviewCount: 28,
    completedSessions: 69,
    responseRate: '100%',
    badges: ['🧪 Химия Pro', '🏅 100 баллов ЕГЭ', '📚 Методист'],
    bio: 'Победитель всероса по химии, преподаю органическую и неорганическую химию, биохимию. Показываю логику реакций вместо зубрежки. Мечтаю освоить разговорный итальянский язык с нуля для поездки во Флоренцию.',
    verified: true,
    weeklyRank: 9,
    joinedDate: 'Июль 2024',
    teachSkills: [
      {
        id: 'u8-t1',
        name: 'Органическая и Неорганическая Химия',
        category: 'exact_sciences',
        level: 'Эксперт / Носитель',
        description: 'Механизмы реакций, стереохимия, подготовка к олимпиадам и вузовским экзаменам.'
      }
    ],
    learnSkills: [
      {
        id: 'u8-l1',
        name: 'Итальянский язык для начинающих',
        category: 'languages',
        goal: 'Разговорные фразы, базовый диалог в кафе и музеях, правильное произношение.'
      }
    ],
    reviews: [
      {
        id: 'u8-r1',
        authorId: 'user-1',
        authorName: 'Алексей Смирнов',
        authorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        date: 'Месяц назад',
        skillPair: 'Химия ↔ Физика',
        comment: 'Анна — блестящий химик! Обсуждали квантовую химию орбиталей. Получил массу удовольствия.',
        likes: 10
      }
    ]
  },
  {
    id: 'user-9',
    name: 'Руслан Гасанов',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    tagline: 'Staff Backend Инженер (Go, Rust, Highload microservices)',
    city: 'Тбилиси',
    onlineOnly: true,
    rating: 4.97,
    reviewCount: 38,
    completedSessions: 82,
    responseRate: '100%',
    badges: ['🦀 Rust Pro', '⚡️ Highload Master', '🏆 Топ ментор'],
    bio: 'Проектирую распределенные системы и микросервисы с нагрузкой 500k RPS на Go и Rust. Помогаю освоить многопоточность, горутины, каналы, gRPC и профилирование памяти. В обмен ищу напарника для практики разговорного японского языка (JLPT N3-N2) или академического английского.',
    verified: true,
    weeklyRank: 4,
    joinedDate: 'Март 2024',
    teachSkills: [
      {
        id: 'u9-t1',
        name: 'Golang & Rust: Архитектура Microservices',
        category: 'programming',
        level: 'Эксперт / Носитель',
        description: 'Concurrency, горутины, gRPC, Kafka, оптимизация аллокаций памяти и профилирование pprof.'
      },
      {
        id: 'u9-t2',
        name: 'Highload базы данных и Redis',
        category: 'programming',
        level: 'Эксперт / Носитель',
        description: 'Шардирование, репликация, сложные индексы в PostgreSQL, кеширование и консистентность.'
      }
    ],
    learnSkills: [
      {
        id: 'u9-l1',
        name: 'Японский язык (JLPT N3-N2)',
        category: 'languages',
        goal: 'Разговорная практика, кандзи и аудирование для переезда в Токио.'
      },
      {
        id: 'u9-l2',
        name: 'Шахматная стратегия и дебюты',
        category: 'sports_hobbies',
        goal: 'Углубление понимания позиционной игры и эндшпиля до рейтинга 2000+ FIDE.'
      }
    ],
    reviews: [
      {
        id: 'u9-r1',
        authorId: 'user-me',
        authorName: 'Константин Васильев',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        date: '2 дня назад',
        skillPair: 'Rust ↔ React',
        comment: 'Руслан невероятно глубоко понимает внутренности языка. Буквально за пару часов разобрали borrow checker и многопоточность без гонок данных!',
        likes: 14
      }
    ]
  },
  {
    id: 'user-10',
    name: 'Мария Васильева',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    tagline: 'Филолог Сорбонны, Французский язык (DALF C2)',
    city: 'Санкт-Петербург',
    onlineOnly: false,
    rating: 4.99,
    reviewCount: 42,
    completedSessions: 91,
    responseRate: '100%',
    badges: ['🇫🇷 DALF C2', '🌟 Преподаватель ВШЭ', '✨ Живой парижский акцент'],
    bio: 'Окончила магистратуру в Париже, преподаю живой французский язык: от правильного грассирования «R» до тонких нюансов субжонктива и современной литературы. Хочу научиться создавать современные лендинги и веб-сервисы на React/Tailwind.',
    verified: true,
    weeklyRank: 1,
    joinedDate: 'Февраль 2024',
    teachSkills: [
      {
        id: 'u10-t1',
        name: 'Французский язык (A1 - C2 / DALF)',
        category: 'languages',
        level: 'Эксперт / Носитель',
        description: 'Идеальное произношение, разговорная речь, подготовка к международным экзаменам DELF/DALF.'
      }
    ],
    learnSkills: [
      {
        id: 'u10-l1',
        name: 'Frontend разработка (React & UI)',
        category: 'programming',
        goal: 'Создание собственного интерактивного онлайн-учебника и платформы с упражнениями.'
      }
    ],
    reviews: [
      {
        id: 'u10-r1',
        authorId: 'user-7',
        authorName: 'Артем Лебедев',
        authorAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        date: 'Вчера',
        skillPair: 'Французский ↔ Маркетинг',
        comment: 'Мария ставит произношение с первого же урока! Понятная методика без нудной зубрежки правил.',
        likes: 11
      }
    ]
  },
  {
    id: 'user-11',
    name: 'Дмитрий Ковалев',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    tagline: 'Кандидат в мастера FIDE по шахматам (2280 ELO)',
    city: 'Москва',
    onlineOnly: false,
    rating: 4.96,
    reviewCount: 35,
    completedSessions: 77,
    responseRate: '98%',
    badges: ['♟️ Мастер FIDE', '🧠 Стратег', '🔥 Аналитик'],
    bio: 'Тренер по классическим шахматам и блицу со стажем 8 лет. Разбираем дебютный репертуар, тактические мотивы, типовые пешечные структуры и расчет вариантов. В обмен хочу изучить основы Python и алгоритмы машинного обучения для шахматных движков.',
    verified: true,
    weeklyRank: 7,
    joinedDate: 'Апрель 2024',
    teachSkills: [
      {
        id: 'u11-t1',
        name: 'Шахматная стратегия и тактика (FIDE)',
        category: 'sports_hobbies',
        level: 'Эксперт / Носитель',
        description: 'Расчет вариантов, позиционная оценка, дебютная подготовка и разбор партий гроссмейстеров.'
      }
    ],
    learnSkills: [
      {
        id: 'u11-l1',
        name: 'Python & Нейросети для игр',
        category: 'programming',
        goal: 'Разработка нейросетевых ботов и анализ шахматных позиций с библиотекой python-chess.'
      }
    ],
    reviews: [
      {
        id: 'u11-r1',
        authorId: 'user-3',
        authorName: 'Максим Власов',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        date: '3 дня назад',
        skillPair: 'Шахматы ↔ Математика',
        comment: 'Дмитрий научил находить комбинации, которые я раньше в партиях просто не замечал. Очень глубокий тренер!',
        likes: 9
      }
    ]
  },
  {
    id: 'user-12',
    name: 'Полина Белова',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    tagline: 'Motion Designer & 2D/3D Аниматор (After Effects, Cinema 4D)',
    city: 'Новосибирск',
    onlineOnly: true,
    rating: 4.93,
    reviewCount: 21,
    completedSessions: 48,
    responseRate: '97%',
    badges: ['🎬 Motion Pro', '✨ Cinema 4D', '🎨 Креатив'],
    bio: 'Создаю промо-ролики, анимацию интерфейсов Lottie и эксплейнеры для брендов. Обучаю After Effects: кейфреймы, скрипты, шейпы, 3D-композитинг. Мечтаю освоить разработку мобильных приложений на Swift/iOS.',
    verified: true,
    weeklyRank: 10,
    joinedDate: 'Июль 2024',
    teachSkills: [
      {
        id: 'u12-t1',
        name: 'Motion Design & After Effects',
        category: 'art_design',
        level: 'Эксперт / Носитель',
        description: 'Анимация интерфейсов, Lottie, кинетическая типографика, плагины Duik и RubberHose.'
      }
    ],
    learnSkills: [
      {
        id: 'u12-l1',
        name: 'iOS Разработка на Swift & SwiftUI',
        category: 'programming',
        goal: 'Создание собственного мобильного приложения с авторскими анимациями.'
      }
    ],
    reviews: [
      {
        id: 'u12-r1',
        authorId: 'user-2',
        authorName: 'Елена Романова',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        date: 'Неделю назад',
        skillPair: 'Motion ↔ UI/UX',
        comment: 'Полина объяснила принципы плавной кривой скорости (graph editor). Анимации интерфейса теперь выглядят на миллион!',
        likes: 7
      }
    ]
  },
  {
    id: 'user-13',
    name: 'Тимур Саттаров',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
    tagline: 'Саунд-дизайнер и Музыкальный продюсер (Ableton Live, Сведение)',
    city: 'Казань',
    onlineOnly: false,
    rating: 4.95,
    reviewCount: 26,
    completedSessions: 55,
    responseRate: '99%',
    badges: ['🎧 Sound Pro', '🎹 Ableton Master', '🎛 Сведение и Мастеринг'],
    bio: 'Пишу музыку для игр и рекламы, преподаю саунд-дизайн, синтез звука (Serum, Vital), сведение треков, эквализацию и динамическую обработку. Ищу партнера для понимания инвестиций, финансового моделирования и юнит-экономики.',
    verified: true,
    weeklyRank: 11,
    joinedDate: 'Май 2024',
    teachSkills: [
      {
        id: 'u13-t1',
        name: 'Создание музыки и Саунд-дизайн в Ableton Live',
        category: 'music',
        level: 'Эксперт / Носитель',
        description: 'Синтез звука, работа с плагинами, сведение, мастеринг, аранжировка электронной музыки.'
      }
    ],
    learnSkills: [
      {
        id: 'u13-l1',
        name: 'Финансовый менеджмент и Инвестиции',
        category: 'business',
        goal: 'Построение финансовой модели музыкального лейбла и расчет окупаемости релизов.'
      }
    ],
    reviews: [
      {
        id: 'u13-r1',
        authorId: 'user-4',
        authorName: 'Дарья Ким',
        authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        date: '2 недели назад',
        skillPair: 'Ableton ↔ Гитара',
        comment: 'Тимур помог записать и идеально свести партию гитары с эффектами. Очень крутой эксперт по звуку!',
        likes: 8
      }
    ]
  },
  {
    id: 'user-14',
    name: 'Екатерина Волкова',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    tagline: 'Астрофизик, исследователь релятивистской космологии',
    city: 'Москва',
    onlineOnly: true,
    rating: 4.98,
    reviewCount: 30,
    completedSessions: 66,
    responseRate: '100%',
    badges: ['🔭 Астрофизика', '🌌 Космология', '🪐 Олимпиадный тренер'],
    bio: 'Научный сотрудник института астрономии РАН. Объясняю общую теорию относительности, гравитационные волны, физику черных дыр и структуру Вселенной. Ищу наставника по разговорному испанскому или итальянскому языку.',
    verified: true,
    weeklyRank: 3,
    joinedDate: 'Январь 2024',
    teachSkills: [
      {
        id: 'u14-t1',
        name: 'Астрофизика, Космология и Теория относительности',
        category: 'exact_sciences',
        level: 'Эксперт / Носитель',
        description: 'Гравитационная физика, космологические модели, спектроскопия и анализ астрономических данных.'
      }
    ],
    learnSkills: [
      {
        id: 'u14-l1',
        name: 'Испанский язык (A2-B1)',
        category: 'languages',
        goal: 'Разговорная практика для поездки на международную конференцию в Мадрид.'
      }
    ],
    reviews: [
      {
        id: 'u14-r1',
        authorId: 'user-1',
        authorName: 'Алексей Смирнов',
        authorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        date: '5 дней назад',
        skillPair: 'Астрофизика ↔ Механика',
        comment: 'Екатерина объясняет космологические уравнения Эйнштейна с невероятной страстью и ясностью!',
        likes: 12
      }
    ]
  },
  {
    id: 'user-15',
    name: 'Владислав Морозов',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80',
    tagline: 'DevOps & Cloud Architect (Kubernetes, CI/CD, Terraform, AWS)',
    city: 'Минск',
    onlineOnly: true,
    rating: 4.91,
    reviewCount: 23,
    completedSessions: 52,
    responseRate: '96%',
    badges: ['☸️ Kubernetes Pro', '☁️ Cloud Master', '⚡️ CI/CD Эксперт'],
    bio: 'Строю отказоустойчивые инфраструктуры на K8s, Helm, ArgoCD, Terraform и AWS. Обучаю контейнеризации Docker, настройке пайплайнов GitHub Actions и мониторингу в Prometheus/Grafana. Мечтаю освоить академический рисунок и скетчинг.',
    verified: true,
    weeklyRank: 12,
    joinedDate: 'Август 2024',
    teachSkills: [
      {
        id: 'u15-t1',
        name: 'DevOps: Docker, Kubernetes & CI/CD',
        category: 'programming',
        level: 'Эксперт / Носитель',
        description: 'Кластеры K8s, манифесты, Helm-чарты, GitOps пайплайны, Infrastructure as Code на Terraform.'
      }
    ],
    learnSkills: [
      {
        id: 'u15-l1',
        name: 'Академический рисунок и Скетчинг',
        category: 'art_design',
        goal: 'Постановка руки, перспектива, светотень, быстрые зарисовки архитектуры в блокноте.'
      }
    ],
    reviews: [
      {
        id: 'u15-r1',
        authorId: 'user-me',
        authorName: 'Константин Васильев',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        date: 'Неделю назад',
        skillPair: 'DevOps ↔ React',
        comment: 'Владислав помог настроить полноценный CI/CD пайплайн деплоя с нуля за один созвон. Очень понятно и структурировано!',
        likes: 10
      }
    ]
  },
  {
    id: 'user-16',
    name: 'Ольга Чен',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    tagline: 'Когнитивный нейробиолог & Эксперт по эффективному обучению',
    city: 'Алматы',
    onlineOnly: false,
    rating: 4.97,
    reviewCount: 33,
    completedSessions: 74,
    responseRate: '100%',
    badges: ['🧠 Нейробиолог', '📚 Методики запоминания', '💡 Продуктивность'],
    bio: 'Исследую механизмы долговременной памяти, нейропластичность и концентрацию внимания. Обучаю техникам интервального повторения, мнемотехнике, борьбе с прокрастинацией и научному тайм-менеджменту. В обмен ищу наставника по китайскому языку или игре на фортепиано.',
    verified: true,
    weeklyRank: 5,
    joinedDate: 'Март 2024',
    teachSkills: [
      {
        id: 'u16-t1',
        name: 'Нейробиология обучения & Мнемотехники',
        category: 'exact_sciences',
        level: 'Эксперт / Носитель',
        description: 'Как устроен мозг во время учебы, алгоритмы Spaced Repetition (Anki), управление вниманием и сном.'
      }
    ],
    learnSkills: [
      {
        id: 'u16-l1',
        name: 'Фортепиано и Гармония',
        category: 'music',
        goal: 'Чтение нот с листа, аккорды и основы джазовой импровизации.'
      }
    ],
    reviews: [
      {
        id: 'u16-r1',
        authorId: 'user-4',
        authorName: 'Дарья Ким',
        authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        date: 'Вчера',
        skillPair: 'Нейробиология ↔ Китайский',
        comment: 'Ольга объяснила, как структурировать повторение сотен иероглифов без забывания. Это перевернуло мой подход к учебе!',
        likes: 15
      }
    ]
  }
];

export const INITIAL_PROPOSALS: ExchangeProposal[] = [
  {
    id: 'prop-1',
    senderId: 'user-1',
    senderName: 'Алексей Смирнов',
    senderAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
    receiverId: 'user-me',
    receiverName: 'Константин Васильев',
    offeredSkill: 'Академический Английский (IELTS 8.5)',
    requestedSkill: 'React & TypeScript',
    message: 'Привет, Константин! Увидел твою карточку. Могу проводить с тобой интенсивные разговорные сессии на английском 2 раза в неделю в обмен на консультации по React-архитектуре.',
    status: 'pending',
    createdAt: 'Сегодня, 14:30',
    format: 'online',
    suggestedSchedule: 'Вт и Чт, 19:00 - 20:00 (МСК)'
  },
  {
    id: 'prop-2',
    senderId: 'user-2',
    senderName: 'Елена Романова',
    senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    receiverId: 'user-me',
    receiverName: 'Константин Васильев',
    offeredSkill: 'UI/UX Дизайн & Figma Pro',
    requestedSkill: 'HTML5 & Современный Tailwind CSS',
    message: 'Привет! Хочу глубже понять тонкости верстки в Tailwind для своих макетов. Взамен научу фишкам работы с переменными в Figma.',
    status: 'accepted',
    createdAt: 'Вчера, 18:15',
    format: 'online',
    suggestedSchedule: 'Сб, 12:00 - 13:30'
  },
  {
    id: 'prop-3',
    senderId: 'user-me',
    senderName: 'Константин Васильев',
    senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    receiverId: 'user-4',
    receiverName: 'Дарья Ким',
    offeredSkill: 'React & TypeScript',
    requestedSkill: 'Китайский язык (HSK 1-5)',
    message: 'Привет, Дарья! Хочу начать учить китайский с нуля. Готов обучать веб-разработке и автоматизации скриптов.',
    status: 'pending',
    createdAt: '2 дня назад',
    format: 'online',
    suggestedSchedule: 'Пн и Ср, 20:00'
  },
  {
    id: 'prop-4',
    senderId: 'user-me',
    senderName: 'Константин Васильев',
    senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    receiverId: 'user-3',
    receiverName: 'Максим Власов',
    offeredSkill: 'React & TypeScript',
    requestedSkill: 'Python & Анализ данных',
    message: 'Привет, Максим! Хочу освоить Pandas и базовый Data Science. В ответ подробно объясню архитектуру компонентов и хуки в React.',
    status: 'pending',
    createdAt: 'Вчера, 16:45',
    format: 'online',
    suggestedSchedule: 'Суббота, 14:00'
  }
];

export const INITIAL_CONVERSATIONS: StudentConversation[] = [
  {
    id: 'conv-prop-3',
    proposalId: 'prop-3',
    partnerId: 'user-4',
    partnerName: 'Дарья Ким',
    partnerAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    partnerTagline: 'Переводчик-синхронист (Китайский HSK 6, Английский C2)',
    partnerRating: 4.96,
    partnerCity: 'Санкт-Петербург',
    onlineStatus: 'online',
    isInitiatedByMe: true,
    offeredSkill: 'React & TypeScript',
    requestedSkill: 'Китайский язык (HSK 1-5)',
    proposalStatus: 'pending',
    suggestedSchedule: 'Пн и Ср, 20:00',
    format: 'online',
    unreadCount: 1,
    lastActivity: '15 минут назад',
    messages: [
      {
        id: 'msg-p3-1',
        senderId: 'user-me',
        senderName: 'Константин Васильев',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        text: 'Привет, Дарья! Хочу начать учить китайский с нуля. Готов обучать веб-разработке и автоматизации скриптов.',
        timestamp: '2 дня назад, 19:10',
        type: 'proposal_summary'
      },
      {
        id: 'msg-p3-2',
        senderId: 'user-4',
        senderName: 'Дарья Ким',
        senderAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
        text: 'Привет, Константин! Отличная идея! Я как раз сейчас собираю портфолио и хочу написать свой интерактивный сайт для изучения иероглифов на React.',
        timestamp: 'Вчера, 11:20',
        type: 'text'
      },
      {
        id: 'msg-p3-3',
        senderId: 'user-me',
        senderName: 'Константин Васильев',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        text: 'Супер! Сможем сделать отличный пет-проект. Давай в первый урок поставим окружение, а с твоей стороны — разберем пиньинь и 4 тона.',
        timestamp: 'Вчера, 12:05',
        type: 'text'
      },
      {
        id: 'msg-p3-4',
        senderId: 'user-4',
        senderName: 'Дарья Ким',
        senderAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
        text: 'Договорились! Предлагаю созвониться в эту среду в 20:00 в Google Meet на 60 минут (30 мин китайский, 30 мин React). Тебе подходит?',
        timestamp: '15 минут назад',
        type: 'schedule_proposal',
        scheduleData: {
          date: 'Среда, 30 октября',
          time: '20:00 - 21:00 (МСК)',
          format: 'online',
          meetingLink: 'https://meet.google.com/skillswap-daria-react',
          status: 'proposed'
        }
      }
    ]
  },
  {
    id: 'conv-prop-4',
    proposalId: 'prop-4',
    partnerId: 'user-3',
    partnerName: 'Максим Власов',
    partnerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    partnerTagline: 'Data Scientist в FinTech, ментор по Python & SQL',
    partnerRating: 4.91,
    partnerCity: 'Казань',
    onlineStatus: 'online',
    isInitiatedByMe: true,
    offeredSkill: 'React & TypeScript',
    requestedSkill: 'Python & Анализ данных',
    proposalStatus: 'pending',
    suggestedSchedule: 'Суббота, 14:00',
    format: 'online',
    unreadCount: 0,
    lastActivity: 'Вчера, 17:30',
    messages: [
      {
        id: 'msg-p4-1',
        senderId: 'user-me',
        senderName: 'Константин Васильев',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        text: 'Привет, Максим! Хочу освоить Pandas и базовый Data Science. В ответ подробно объясню архитектуру компонентов и хуки в React.',
        timestamp: 'Вчера, 16:45',
        type: 'proposal_summary'
      },
      {
        id: 'msg-p4-2',
        senderId: 'user-3',
        senderName: 'Максим Власов',
        senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        text: 'Привет! Звучит очень интересно. У меня как раз есть пет-проект дашборда на React, где я путаюсь с useEffect. Можем начать в субботу!',
        timestamp: 'Вчера, 17:30',
        type: 'text'
      }
    ]
  },
  {
    id: 'conv-prop-1',
    proposalId: 'prop-1',
    partnerId: 'user-1',
    partnerName: 'Алексей Смирнов',
    partnerAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
    partnerTagline: 'Аспирант МФТИ, фанат теоретической физики',
    partnerRating: 4.98,
    partnerCity: 'Москва',
    onlineStatus: 'online',
    isInitiatedByMe: false,
    offeredSkill: 'React & TypeScript',
    requestedSkill: 'Академический Английский (IELTS 8.5)',
    proposalStatus: 'pending',
    suggestedSchedule: 'Вт и Чт, 19:00 - 20:00',
    format: 'online',
    unreadCount: 1,
    lastActivity: 'Сегодня, 14:35',
    messages: [
      {
        id: 'msg-p1-1',
        senderId: 'user-1',
        senderName: 'Алексей Смирнов',
        senderAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
        text: 'Привет, Константин! Увидел твою карточку. Могу проводить с тобой интенсивные разговорные сессии на английском 2 раза в неделю в обмен на консультации по React-архитектуре.',
        timestamp: 'Сегодня, 14:30',
        type: 'proposal_summary'
      },
      {
        id: 'msg-p1-2',
        senderId: 'user-1',
        senderName: 'Алексей Смирнов',
        senderAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
        text: 'Напиши, в какое время тебе удобнее — в будни вечером или в выходные?',
        timestamp: 'Сегодня, 14:35',
        type: 'text'
      }
    ]
  },
  {
    id: 'conv-prop-2',
    proposalId: 'prop-2',
    partnerId: 'user-2',
    partnerName: 'Елена Романова',
    partnerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    partnerTagline: 'Lead UI/UX дизайнер в EdTech стартапе',
    partnerRating: 4.94,
    partnerCity: 'Москва',
    onlineStatus: 'away',
    isInitiatedByMe: false,
    offeredSkill: 'HTML5 & Современный Tailwind CSS',
    requestedSkill: 'UI/UX Дизайн & Figma Pro',
    proposalStatus: 'accepted',
    suggestedSchedule: 'Завтра в 12:00',
    format: 'online',
    unreadCount: 0,
    lastActivity: 'Вчера, 18:30',
    messages: [
      {
        id: 'msg-p2-1',
        senderId: 'user-2',
        senderName: 'Елена Романова',
        senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
        text: 'Привет! Хочу глубже понять тонкости верстки в Tailwind для своих макетов. Взамен научу фишкам работы с переменными в Figma.',
        timestamp: 'Вчера, 18:15',
        type: 'proposal_summary'
      },
      {
        id: 'msg-p2-2',
        senderId: 'user-me',
        senderName: 'Константин Васильев',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        text: 'Привет, Елена! С удовольствием! Давай завтра в 12:00 проведем первый созвон, я подготовлю живые примеры Tailwind.',
        timestamp: 'Вчера, 18:25',
        type: 'text'
      },
      {
        id: 'msg-p2-3',
        senderId: 'user-2',
        senderName: 'Елена Романова',
        senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
        text: 'Договорились! Ссылка на звонок создана, до встречи завтра в 12:00!',
        timestamp: 'Вчера, 18:30',
        type: 'session_link',
        scheduleData: {
          date: 'Завтра',
          time: '12:00 (МСК)',
          format: 'online',
          meetingLink: 'https://meet.google.com/swap-skill-room-1',
          status: 'confirmed'
        }
      }
    ]
  }
];

export const INITIAL_ACTIVE_SESSIONS: ActiveSession[] = [
  {
    id: 'sess-1',
    partnerId: 'user-2',
    partnerName: 'Елена Романова',
    partnerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    topic: 'Figma Дизайн-токены ↔ Tailwind CSS Конфигурация',
    myRole: 'both',
    scheduledTime: 'Завтра, 12:00 (через 14 часов)',
    status: 'upcoming',
    meetingLink: 'https://meet.google.com/swap-skill-room-1',
    format: 'online'
  },
  {
    id: 'sess-2',
    partnerId: 'user-1',
    partnerName: 'Алексей Смирнов',
    partnerAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
    topic: 'Tech English Pitching ↔ React State Management',
    myRole: 'both',
    scheduledTime: 'Пятница, 19:30',
    status: 'upcoming',
    meetingLink: 'https://meet.google.com/swap-skill-room-2',
    format: 'online'
  }
];

export const POPULAR_EXCHANGE_PAIRS = [
  {
    id: 'pair-1',
    teach: 'Английский язык',
    learn: 'Физика и Математика',
    participantsCount: 142,
    badge: '🔥 Самый частый',
    bgGradient: 'from-emerald-50 to-teal-50',
    borderColor: 'border-emerald-200'
  },
  {
    id: 'pair-2',
    teach: 'Python & Data Science',
    learn: 'UI/UX Дизайн в Figma',
    participantsCount: 98,
    badge: '🚀 Трендовый',
    bgGradient: 'from-emerald-50 to-green-50',
    borderColor: 'border-green-200'
  },
  {
    id: 'pair-3',
    teach: 'Немецкий язык C1',
    learn: 'Высшая математика',
    participantsCount: 64,
    badge: '🎓 Академический',
    bgGradient: 'from-teal-50 to-emerald-50',
    borderColor: 'border-teal-200'
  },
  {
    id: 'pair-4',
    teach: 'Китайский язык (HSK)',
    learn: 'Гитара и Музыка',
    participantsCount: 53,
    badge: '🎨 Творческий',
    bgGradient: 'from-green-50 to-emerald-50',
    borderColor: 'border-emerald-200'
  },
  {
    id: 'pair-5',
    teach: 'Веб-разработка (React)',
    learn: '3D-моделирование (Blender)',
    participantsCount: 47,
    badge: '💻 IT-бартер',
    bgGradient: 'from-emerald-50 to-teal-50',
    borderColor: 'border-emerald-200'
  },
  {
    id: 'pair-6',
    teach: 'Испанский язык (DELE)',
    learn: 'Академический вокал',
    participantsCount: 39,
    badge: '✨ Популярный',
    bgGradient: 'from-teal-50 to-green-50',
    borderColor: 'border-teal-200'
  },
  {
    id: 'pair-7',
    teach: 'Golang & Rust Microservices',
    learn: 'Японский язык (JLPT)',
    participantsCount: 42,
    badge: '⚡️ Highload',
    bgGradient: 'from-emerald-50 to-teal-50',
    borderColor: 'border-emerald-200'
  },
  {
    id: 'pair-8',
    teach: 'Шахматная тактика (FIDE)',
    learn: 'Python & Машинное обучение',
    participantsCount: 56,
    badge: '♟️ Стратегия',
    bgGradient: 'from-amber-50 to-emerald-50',
    borderColor: 'border-amber-200'
  },
  {
    id: 'pair-9',
    teach: 'Саунд-дизайн в Ableton Live',
    learn: 'Финансовый менеджмент',
    participantsCount: 31,
    badge: '🎧 Аудио & Фин',
    bgGradient: 'from-purple-50 to-emerald-50',
    borderColor: 'border-purple-200'
  }
];

export const CATEGORY_LABELS: Record<string, string> = {
  all: 'Все предметы',
  languages: 'Языки',
  exact_sciences: 'Точные науки',
  programming: 'Программирование',
  art_design: 'Искусство и Дизайн',
  music: 'Музыка',
  business: 'Бизнес и Маркетинг',
  sports_hobbies: 'Хобби и Спорт'
};
