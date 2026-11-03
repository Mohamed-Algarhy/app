import { User } from "./user";

export interface Comment extends CharacterData {
  _id: string;
  image: string;
  commentCreator: User;
  post: string;
  parentComment: null;
  likes: any[];
  createdAt: string;
  repliesCount: number;
  content:string;
}

 