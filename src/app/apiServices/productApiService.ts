import axios from "axios";
import assert from "assert";
import { serverApi } from "../../lib/config";
import { Definer } from "../../lib/definer";
import { ProductSearchObj } from "../../types/others";
import { Product } from "../../types/product";

class ProductApiService {
  private readonly path: string;
  constructor() {
    this.path = serverApi;
  }

  async getCafeProducts(data: ProductSearchObj): Promise<Product[]> {
    try {
      const url = `/products`;
      // const url = `/cafes/${data.cafe_mb_id}/products`;
      console.log("Request URL>>> ", url);
      console.log("Request Data>>> ", data);

      const result = await axios.post(this.path + url, data, {
        withCredentials: true,
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data.state != "fail", result?.data?.message);
      console.log("state>>>", result.data.state);

      const cafe_products: Product[] = result.data.data;
      return cafe_products;
    } catch (err: any) {
      console.log(`ERROR getCafeProducts>>> ${err.message}`);
      throw err;
    }
  }

  async getSaleProducts(data: ProductSearchObj): Promise<Product[]> {
    try {
      const url = `/products`,
        result = await axios.post(this.path + url, data, {
          withCredentials: true,
        });
      assert.ok(result, Definer.general_err1);

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state>>>", result.data.state);

      const sale_products: Product[] = result.data.data;
      return sale_products;
    } catch (err: any) {
      console.log(`ERROR >>> getSaleProducts ${err.message}`);
      throw err;
    }
  }

  async getAllProducts(data: ProductSearchObj): Promise<Product[]> {
    try {
      const url = `/products`,
        result = await axios.post(this.path + url, data, {
          withCredentials: true,
        });
      assert.ok(result, Definer.general_err1);

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state>>>", result.data.state);

      const all_products: Product[] = result.data.data;
      return all_products;
    } catch (err: any) {
      console.log(`ERROR >>> getAllProducts ${err.message}`);
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
}

export default ProductApiService;
