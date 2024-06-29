import { Product } from "./product";

export interface Like {
  _id: string;
  like_ref_id: string;
  like_group: string;
  mb_id: string;
  createdAt: Date;
  updatedAt: Date;
  product_data: Product;
}

export interface MeLiked {
  mb_id: string;
  like_ref_id: string;
  my_favorite: boolean;
}

export interface MemberLiken {
  like_group: string;
  like_status: number;
  like_ref_id: string;
}
