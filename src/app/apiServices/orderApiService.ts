import axios from "axios";
import assert from "assert";
import { serverApi } from "../../lib/config";
import { Definer } from "../../lib/definer";
import { CartItem, ProductSearchObj } from "../../types/others";
import { Product } from "../../types/product";
import { Order, OrderItem } from "../../types/order";

class OrderApiService {
  private readonly path: string;
  constructor() {
    this.path = serverApi;
  }
  async createOrder(data: CartItem[]): Promise<Order> {
    try {
      const url = "/orders/create",
        result = await axios.post(this.path + url, data, {
          withCredentials: true,
        });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state>>>", result.data.state);

      const order: Order = result.data.data;
      console.log("order:", order);
      return order;
    } catch (err: any) {
      console.log(`ERROR >>> creatOrder ${err.message}`);
      throw err;
    }
  }

  async getMyOrders(order_status: string): Promise<Order[]> {
    try {
      const url = `/orders?status=${order_status}`,
        result = await axios.get(this.path + url, {
          withCredentials: true,
        });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state>>>", result.data.state);

      const orders: Order[] = result.data.data;
      console.log("orders>>>", orders);

      return orders;
    } catch (err: any) {
      console.log(`ERROR >>> getMyOrders ${err.message}`);
      throw err;
    }
  }

  async updateOrderStatus(data: any): Promise<Order> {
    try {
      console.log("data>>>", data);

      const url = "/orders/edit",
        result = await axios.post(this.path + url, data, {
          withCredentials: true,
        });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state>>>", result.data.state);

      const order: Order = result.data.data;
      return order;
    } catch (err: any) {
      console.log(`ERROR >>> updateOrderStatus ${err.message}`);
      throw err;
    }
  }
}

export default OrderApiService;
