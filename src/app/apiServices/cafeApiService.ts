import axios from "axios";
import assert from "assert";
import { serverApi } from "../../lib/config";
import { Definer } from "../../lib/definer";
import { Cafe } from "../../types/user";
import { SearchObj } from "../../types/others";

class CafeApiService {
  private readonly path: string;
  constructor() {
    this.path = serverApi;
  }

  async getTopCafes(): Promise<Cafe[]> {
    try {
      const url = "/cafes?order=top&page=1&limit=6";
      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data.state != "fail", result?.data?.message);
      console.log("state:", result.data.state);

      // console.log("result>>>", result);
      const top_cafes: Cafe[] = result.data.data;
      return top_cafes;
    } catch (err: any) {
      console.log(`ERROR >>> getTopCafes ${err.message}`);
      throw err;
    }
  }

  async getCafes(data: SearchObj): Promise<Cafe[]> {
    try {
      const url = `/cafes?order=${data.order}&page=${data.page}&limit=${data.limit}`,
        result = await axios.get(this.path + url, { withCredentials: true });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data.state != "fail", result?.data?.message);
      console.log("state:", result.data.state);

      const top_cafes: Cafe[] = result.data.data;
      return top_cafes;
    } catch (err: any) {
      console.log(`ERROR >>> getCafes ${err.message}`);
      throw err;
    }
  }

  async getChosenCafe(id: string): Promise<Cafe> {
    try {
      const url = `/cafes/${id}`,
        result = await axios.get(this.path + url, { withCredentials: true });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data.state != "fail", result?.data?.message);
      console.log("state:", result.data.state);

      const cafe: Cafe = result.data.data;
      return cafe;
    } catch (err: any) {
      console.log(`ERROR >>> getChosenCafe ${err.message}`);
      throw err;
    }
  }
}

export default CafeApiService;
