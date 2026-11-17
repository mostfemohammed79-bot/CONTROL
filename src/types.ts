export type PageId =
  | 'dashboard'
  | 'videos'
  | 'comments'
  | 'ideas'
  | 'analytics'
  | 'settings';

export interface VideoItem {
  id: string;
  title: string;
  status: 'published' | 'scheduled' | 'draft';
  thumbnail: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  publishedAt: string | null;
  scheduledFor: string | null;
  duration: string;
  storagePath?: string | null;
  fileName?: string | null;
  videoUrl?: string | null;
}

export interface CommentItem {
  id: string;
  videoTitle: string;
  author: string;
  avatarColor: string;
  text: string;
  timestamp: string;
  sentiment: 'positive' | 'neutral' | 'sensitive';
  replyStatus: 'auto-replied' | 'pending' | 'approved' | 'rejected';
  replyText?: string;
}

export interface ReplyRule {
  id: string;
  keywords: string[];
  reply: string;
  active: boolean;
}

export interface ContentIdea {
  id: string;
  title: string;
  hook: string;
  format: string;
  hashtags: string[];
  estimatedReach: string;
  confidence: number;
  saved: boolean;
}

