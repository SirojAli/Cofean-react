export interface CartItem {
  _id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  discount: number;
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
