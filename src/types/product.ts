import { MeLiked } from "./others";

export interface Product {
  _id: string;
  product_name: string;
  product_collection: string;
  product_status: string;
  product_price: number;
  product_discount: number;
  product_left_count: number;
  product_size: number;
  product_volume: number;
  product_description: string;
  product_image: string[];
  product_views: number;
  product_likes: number;
  restaurant_mb_id: string;
  createdAt: Date;
  updateAt: Date;
  me_liked: MeLiked[];
}
