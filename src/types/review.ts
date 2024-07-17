import { Member_data } from "./user";

export interface Review {
  _id: string;
  mb_id: string;
  member_data?: Member_data;
  review_ref_id: string;
  review_group: string;
  content: string;
  product_rating?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReviewSearchObj {
  page: number;
  limit: number;
  review_ref_id: string;
}

export interface CreateReviewObj {
  review_ref_id: string;
  group_type: string;
  content: string;
  product_rating?: number;
}
