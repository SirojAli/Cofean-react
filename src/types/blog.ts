import { MeLiked } from "./others";
import { Member } from "./user";

export interface BlogInput {
  post_subject: string;
  post_content: string;
  post_image: string;
  board_id: string;
}

export interface Blog {
  _id: string;
  post_subject: string;
  post_content: string;
  post_image: string | null;
  board_id: string;
  post_status: string;
  post_views: number;
  post_likes: number;
  mb_id: string;
  createdAt: Date;
  updateAt: Date;
  member_data: Member;
  me_liked: MeLiked[];
}

export interface SearchBlogObj {
  page: number;
  limit: number;
  board_id: string;
  order?: string | null;
}

export interface SearchMemberBlogsObj {
  page: number;
  limit: number;
  mb_id: string;
}
