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
