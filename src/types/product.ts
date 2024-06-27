import { MeLiked } from "./others";
import { Cafe } from "./user";

export interface Product {
  _id: string;
  product_name: string;
  product_cafe_name: string;
  product_collection: string;
  product_status: string;
  product_price: number;
  product_discount: number;
  product_size: number;
  product_volume: number;
  product_description: string;
  product_images: string;
  product_views: number;
  product_likes: number;
  product_rating: number;
  product_reviews: number;
  product_allergy: string;
  product_calories: number;
  product_caffeine: number;
  product_sugar: number;
  product_protein: number;
  product_saturated_fat: number;
  product_sodium: number;
  cafe_mb_id: Cafe;
  createdAt: Date;
  updatedAt: Date;
  me_liked: MeLiked[];
}
