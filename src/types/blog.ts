import { MeLiked } from "./like";
import { Member } from "./user";

export interface BlogInput {
  blog_title: string;
  blog_content: string;
  blog_images?: Array<string> | null;
}

export interface Blog {
  _id: string;
  blog_title: string;
  blog_content: string;
  blog_images?: Array<string> | null;
  blog_status: string;
  blog_views: number;
  blog_likes: number;
  mb_id: string;
  createdAt: Date;
  updatedAt: Date;
  member_data: Member;
  me_liked: MeLiked[];
}

export interface BlogSearchObj {
  page: number;
  limit: number;
  mb_id: string;
}
