import { User } from './user';

export interface Post {
  _id: string;
  body?: string;
  image?: string;
  privacy: string;
  user: User;
  sharedPost: null;
  likes: any[];
  createdAt: string;
  commentsCount: number;
  sharesCount: number;
  likesCount: number;
  isShare: boolean;
  id: string;
  bookmarked: boolean;
  TopComment:TopComment
}

export interface TopComment {
  commentCreator: CommentCreator;
  content?: string;
  createdAt?: string;
  likes?: any[];
  parentComment?: any | null;
  post?: string;
  _id?: string;
}
export interface CommentCreator {
  _id?: string;
  name?: string;
  username?: string;
  photo?: string;
}