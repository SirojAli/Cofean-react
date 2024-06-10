import axios from "axios";
import assert from "assert";
import { serverApi } from "../../lib/config";
import { Definer } from "../../lib/definer";
import { Member } from "../../types/user";
import { Blog, BlogInput, BlogSearchObj } from "../../types/blog";

class BlogApiService {
  private readonly path: string;
  constructor() {
    this.path = serverApi;
  }

  public async getAllBlogs(data: BlogSearchObj): Promise<Blog[]> {
    try {
      let url = `/blogs/posts?page=${data.page}&limit=${data.limit}&mb_id=${data.mb_id}`;
      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });
      console.log("state >>>", result.data.state);
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data.state !== "fail", result?.data?.message);
      const blogs: Blog[] = result.data.data;
      return blogs;
    } catch (err: any) {
      console.log(`ERROR >>> getAllBlogs ${err.message}`);
      throw err;
    }
  }

  public async getChosenBlog(id: string): Promise<boolean> {
    try {
      let url = `/blogs/single-blog/${id}`;
      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });
      console.log("state:", result.data.state);
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data.state !== "fail", result?.data?.message);
      return true;
    } catch (err: any) {
      console.log(`ERROR >>> getChosenBlog ${err.message}`);
      throw err;
    }
  }

  public async createBlog(data: any) {
    try {
      console.log(data);
      let formData = new FormData();
      formData.append("blog_title", data.blog_title);
      formData.append("blog_content", data.blog_content);
      formData.append("blog_image", data.blog_image);
      const result = await axios(`${this.path}/blogs/create`, {
        method: "POST",
        data: formData,
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state: ", result.data.data);
      const blogs: Blog = result.data.data;
      return blogs;
    } catch (err: any) {
      console.log(`ERROR >>> createBlog ${err.message}`);
    }
  }

  public async subscribeMember(data: any): Promise<any> {
    try {
      let url = "/follow/subscribe";
      const result = await axios.post(this.path + url, data, {
        withCredentials: true,
      });
      console.log("state:", result.data.state);
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data.state !== "fail", result?.data?.message);
      return true;
    } catch (err: any) {
      console.log(`ERROR >>> subscribeMember ${err.message}`);
      throw err;
    }
  }

  public async unsubscribeMember(data: any): Promise<any> {
    try {
      let url = "/follow/unsubscribe";
      const result = await axios.post(this.path + url, data, {
        withCredentials: true,
      });
      console.log("state:", result.data.state);
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data.state !== "fail", result?.data?.message);
      return true;
    } catch (err: any) {
      console.log(`ERROR >>> unsubscribeMember ${err.message}`);
      throw err;
    }
  }
}

export default BlogApiService;
