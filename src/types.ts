export type Category = 
  | 'all' 
  | 'languages' 
  | 'exact_sciences' 
  | 'programming' 
  | 'art_design' 
  | 'music' 
  | 'business'
  | 'sports_hobbies';

export type Format = 'all' | 'online' | 'offline';

export type SkillLevel = 'Начальный' | 'Средний' | 'Продвинутый' | 'Эксперт / Носитель';

export type ThemeMode = 'light' | 'dark';

export interface SkillOffer {
  id: string;
  name: string;
  category: Category;
  level: SkillLevel;
  description?: string;
}

export interface SkillWanted {
  id: string;
  name: string;
  category: Category;
  goal?: string;
}

export interface Review {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  rating: number;
  date: string;
  skillPair: string; // e.g. "Английский ↔ Физика"
  comment: string;
  likes: number;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  tagline: string;
  city: string;
  onlineOnly: boolean;
  rating: number;
  reviewCount: number;
  completedSessions: number;
  responseRate: string; // "98%"
  badges: string[];
  bio: string;
  teachSkills: SkillOffer[];
  learnSkills: SkillWanted[];
  reviews: Review[];
  verified: boolean;
  weeklyRank?: number;
  joinedDate: string;
}

export interface ExchangeProposal {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  receiverId: string;
  receiverName: string;
  offeredSkill: string;
  requestedSkill: string;
  message: string;
  status: 'pending' | 'accepted' | 'declined' | 'completed';
  createdAt: string;
  format: 'online' | 'offline';
  suggestedSchedule: string;
}

export interface ActiveSession {
  id: string;
  partnerId: string;
  partnerName: string;
  partnerAvatar: string;
  topic: string;
  myRole: 'teaching' | 'learning' | 'both';
  scheduledTime: string;
  status: 'upcoming' | 'in_progress' | 'completed';
  meetingLink: string;
  format: 'online' | 'offline';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface StudentChatMessage {
  id: string;
  senderId: string; // 'user-me' or partnerId
  senderName?: string;
  senderAvatar?: string;
  isMe?: boolean;
  text: string;
  timestamp: string;
  type?: 'text' | 'proposal_summary' | 'schedule_proposal' | 'session_link';
  scheduleData?: {
    date: string;
    time: string;
    format: 'online' | 'offline';
    meetingLink?: string;
    status?: 'proposed' | 'confirmed';
  };
}

export interface StudentConversation {
  id: string; // usually proposal id
  proposalId: string;
  partnerId: string;
  partnerName: string;
  partnerAvatar: string;
  partnerTagline?: string;
  partnerRating: number;
  partnerCity: string;
  onlineStatus: 'online' | 'away' | 'offline';
  isInitiatedByMe: boolean; // true if I sent the proposal
  offeredSkill: string;
  requestedSkill: string;
  proposalStatus?: 'pending' | 'accepted' | 'declined' | 'completed';
  suggestedSchedule?: string;
  format?: 'online' | 'offline';
  unreadCount: number;
  messages: StudentChatMessage[];
  lastActivity: string;
}

export type ActiveTab = 'home' | 'explore' | 'profile' | 'assistant' | 'dashboard' | 'chats';
