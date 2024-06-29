import { Product } from "./product";
import { Member } from "./user";

export interface OrderItems {
  _id: string;
  item_quantity: number;
  item_price: number;
  order_id: string;
  product_id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  _id: string;
  order_total_amount: number;
  order_status: string;
  mb_id: string;
  createdAt: Date;
  updatedAt: Date;
  order_items: OrderItems[];
  product_data: Product[];
}
