import { MeFollowed } from "./follow";
import { MeLiked } from "./others";

export interface Cafe {
  _id: string;
  mb_nick: string;
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

export interface Member {
  _id: string;
  mb_nick: string;
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

export interface MemberUpdateData {
  mb_nick?: string | null;
  mb_phone?: string | null;
  mb_address?: string | null;
  mb_description?: string | null;
  mb_image?: string | null;
}
