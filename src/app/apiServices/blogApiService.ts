import axios from "axios";
import assert from "assert";
import { serverApi } from "../../lib/config";
import { Definer } from "../../lib/definer";
import { Member } from "../../types/user";
import {
  Blog,
  BlogInput,
  SearchBlogObj,
  SearchMemberBlogsObj,
} from "../../types/blog";

class BlogApiService {
  private readonly path: string;
  constructor() {
    this.path = serverApi;
  }

  public async getTopBlogs(data: SearchBlogObj) {
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

  public async uploadImageToServer(image: any) {
    try {
      let formData = new FormData();
      formData.append("blog_image", image);
      console.log("image >>>", image);

      const result = await axios(`${this.path}/blogs/image`, {
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state>>>", result.data.state);

      const image_name: string = result.data.data;
      return image_name;
    } catch (err: any) {
      console.log(`ERROR >>> uploadImageToServer ${err.message}`);
      throw err;
    }
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

  public async getTargetBlogs(data: SearchBlogObj) {
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
      console.log(`ERROR >>> getTargetBlogs ${err.message}`);
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
