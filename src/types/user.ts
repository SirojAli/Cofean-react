import { MeFollowed } from "./follow";
import { MeLiked } from "./like";

export interface Cafe {
  _id: string;
  mb_nick: string;
  mb_email: string;
  mb_phone: string;
  mb_password: string;
  mb_type: string;
  mb_status: string;
  mb_address: string;
  mb_description: string;
  mb_image: string;
  mb_point?: number;
  mb_top?: string;
  mb_views: number;
  mb_likes: number;
  mb_rating: number;
  mb_follow_count: number;
  mb_subscriber_count: number;
  createdAt: Date;
  me_liked: MeLiked[];
}

export interface CafeSearchObj {
  page: number;
  limit: number;
  order: string;
  search?: string;
}

export interface Member {
  _id: string;
  mb_nick: string;
  mb_email: string;
  mb_phone: string;
  mb_password: string;
  mb_type: string;
  mb_status: string;
  mb_address?: string;
  mb_description?: string;
  mb_image?: string;
  mb_point?: number;
  mb_top?: string;
  mb_views: number;
  mb_likes: number;
  mb_rating: number;
  mb_follow_count: number;
  mb_subscriber_count: number;
  createdAt: Date;
  me_liked: [];
  me_followed: MeFollowed[];
}

export interface Member_data {
  createdAt: string;
  mb_email: string;
  mb_image?: string;
  mb_follow_cnt: number;
  mb_nick: string;
  mb_password: string;
  mb_point: number;
  mb_status: string;
  mb_subscriber_cnt: number;
  mb_type: string;
  updatedAt: Date;
  _id: string;
}
