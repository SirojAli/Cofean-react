export interface MeLiked {
  mb_id: string;
  like_ref_id: string;
  my_favorite: boolean;
}

export interface CafeSearchObj {
  page: number;
  limit: number;
  order: string;
  search?: string;
}

export interface ProductSearchObj {
  page: number;
  limit: number;
  order: string;
  product_collection?: string[];
  search: string;
  price: number[];
  cafe_mb_id?: string;
}

export interface ReviewSearchObj {
  page: number;
  limit: number;
  review_ref_id: string;
}

export interface CreateReviewObj {
  review_ref_id: string;
  group_type: string;
  title: string;
  content?: string;
  product_rating?: number;
}

export interface MemberLiken {
  like_group: string;
  like_status: number;
  like_ref_id: string;
}

export interface CartItem {
  _id: string;
  quantity: number;
  name: string;
  price: number;
  discount: number;
  image: string;
}

export interface ChatMsg {
  msg: string;
  mb_id: number;
  mb_nick: string;
  mb_image: number;
}

export interface ChatGreetMsg {
  text: string;
}

export interface ChatInfoMsg {
  total: number;
}
