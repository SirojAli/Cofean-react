import axios from "axios";
import assert from "assert";
import { serverApi } from "../../lib/config";
import { Definer } from "../../lib/definer";
import { ProductSearchObj } from "../../types/product";
import { Product } from "../../types/product";

class ProductApiService {
  private readonly path: string;
  constructor() {
    this.path = serverApi;
  }
  async getTargetProducts(data: ProductSearchObj): Promise<Product[]> {
    try {
      const url = `/products`,
        result = await axios.post(this.path + url, data, {
          withCredentials: true,
        });
      console.log("API Response Raw:", result); // Log raw API response
      assert.ok(result, Definer.general_err1);

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("API Response Processed >>>", result.data.state);

      const products: Product[] = result.data.data;
      return products;
    } catch (err: any) {
      console.log(`ERROR >>> getTargetProducts ${err.message}`);
      throw err;
    }
  }

  async getChosenProduct(product_id: string): Promise<Product> {
    try {
      const url = `/products/${product_id}`,
        result = await axios.get(this.path + url, {
          withCredentials: true,
        });
      console.log("Result from backend:", result); // Log the entire result object
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state>>>", result.data.state);

      const product: Product = result.data.data;
      return product;
    } catch (err: any) {
      console.log(`ERROR >>> getChosenProduct ${err.message}`);
      throw err;
    }
  }

  async getLikedProduct(data: any): Promise<any> {
    try {
      const url = `/liked-products`,
        result = await axios.post(this.path + url, data, {
          withCredentials: true,
        });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state >>>", result.data.state);
      const product: Product = result.data.data;
      return product;
    } catch (err: any) {
      console.log(`ERROR >>> getLikedProduct ${err.message}`);
      throw err;
    }
  }
}

export default ProductApiService;
