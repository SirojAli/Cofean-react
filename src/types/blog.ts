import { MeLiked } from "./others";
import { Member } from "./user";

export interface BlogInput {
  blog_title: string;
  blog_content: string;
  blog_image: string;
  blog_types: string;
}

export interface Blog {
  _id: string;
  blog_title: string;
  blog_content: string;
  blog_image: string | null;
  blog_types: string;
  blog_status: string;
  blog_views: number;
  blog_likes: number;
  mb_id: string;
  createdAt: Date;
  updatedAt: Date;
  member_data: Member;
  me_liked: MeLiked[];
}

export interface SearchBlogObj {
  page: number;
  limit: number;
  blog_types: string;
  order?: string | null;
}

export interface SearchMemberBlogsObj {
  page: number;
  limit: number;
  mb_id: string;
}
