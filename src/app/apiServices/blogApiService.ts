import axios from "axios";
import assert from "assert";
import { serverApi } from "../../lib/config";
import { Definer } from "../../lib/definer";
import { Member } from "../../types/user";
import {
  Blog,
  BlogInput,
  BlogSearchObj,
  SearchMemberBlogsObj,
} from "../../types/blog";

class BlogApiService {
  private readonly path: string;
  constructor() {
    this.path = serverApi;
  }

  public async createBlog(data: BlogInput) {
    try {
      const result = await axios.post(this.path + "/blogs/create", data, {
        withCredentials: true,
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state>>>", result.data.state);

      const blog: Blog = result.data.data;
      return blog;
    } catch (err: any) {
      console.log(`ERROR >>> createBlog ${err.message}`);
      throw err;
    }
  }

  async getAllBlogs(data: BlogSearchObj): Promise<Blog[]> {
    try {
      const url = `/blogs`,
        result = await axios.post(this.path + url, data, {
          withCredentials: true,
        });
      assert.ok(result, Definer.general_err1);

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state>>>", result.data.state);

      const all_blogs: Blog[] = result.data.data;
      return all_blogs;
    } catch (err: any) {
      console.log(`ERROR getAllBlogs >>> ${err.message}`);
      throw err;
    }
  }

  public async getTargetBlogs(data: BlogSearchObj) {
    try {
      let url = `/blogs/all-blogs?blog_types=${data.blog_types}&page=${data.page}&limit=${data.limit}`;
      if (data.order) url += `&order=${data.order}`;

      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state >>>", result.data.state);

      const blogs: Blog[] = result.data.data;
      return blogs;
    } catch (err: any) {
      console.log(`ERROR >>> getTargetBlogs ${err.message}`);
      throw err;
    }
  }

  public async getTopBlogs(data: BlogSearchObj) {
    try {
      let url = `/blogs/target?blog_types=${data.blog_types}&page=${data.page}&limit=${data.limit}`;
      if (data.order) url += `&order=${data.order}`;

      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state>>>", result.data.state);

      const blogs: Blog[] = result.data.data;
      return blogs;
    } catch (err: any) {
      console.log(`ERROR >>> getTopBlogs ${err.message}`);
      throw err;
    }
  }

  async getMemberBlogs(data: SearchMemberBlogsObj) {
    try {
      let url = `/blogs/target-blogs?mb_id=${data.mb_id}&page=${data.page}&limit=${data.limit}`;

      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state>>>", result.data.state);

      const blog: Blog[] = result.data.data;
      return blog;
    } catch (err: any) {
      console.log(`ERROR >>> getMemberBlogBlogs ${err.message}`);
      throw err;
    }
  }

  async getChosenBlog(blog_id: string) {
    try {
      let url = `/blogs/single-article/${blog_id}`;

      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state>>>", result.data.state);

      const blog: Blog = result.data.data;
      return blog;
    } catch (err: any) {
      console.log(`ERROR >>> getChosenBlog ${err.message}`);
      throw err;
    }
  }
}

export default BlogApiService;
