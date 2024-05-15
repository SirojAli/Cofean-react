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

  public async getTopPosts(data: SearchBlogObj) {
    try {
      let url = `/blog/target?blog_types=${data.blog_types}&page=${data.page}&limit=${data.limit}`;
      if (data.order) url += `&order=${data.order}`;

      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state>>>", result.data.state);

      const posts: Blog[] = result.data.data;
      return posts;
    } catch (err: any) {
      console.log(`ERROR >>> getTopPosts ${err.message}`);
      throw err;
    }
  }

  public async uploadImageToServer(image: any) {
    try {
      let formData = new FormData();
      formData.append("blog_image", image);
      console.log("image >>>", image);

      const result = await axios(`${this.path}/blog/image`, {
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

  public async createPost(data: BlogInput) {
    try {
      const result = await axios.post(this.path + "/blog/create", data, {
        withCredentials: true,
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state>>>", result.data.state);

      const post: Blog = result.data.data;
      return post;
    } catch (err: any) {
      console.log(`ERROR >>> createPost ${err.message}`);
      throw err;
    }
  }

  public async getTargetPosts(data: SearchBlogObj) {
    try {
      let url = `/blog/target?blog_types=${data.blog_types}&page=${data.page}&limit=${data.limit}`;
      if (data.order) url += `&order=${data.order}`;

      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state>>>", result.data.state);

      const posts: Blog[] = result.data.data;
      return posts;
    } catch (err: any) {
      console.log(`ERROR >>> getTargetPosts ${err.message}`);
      throw err;
    }
  }

  async getMemberBlogPosts(data: SearchMemberBlogsObj) {
    try {
      let url = `/blog/posts?mb_id=${data.mb_id}&page=${data.page}&limit=${data.limit}`;

      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state>>>", result.data.state);

      const post: Blog[] = result.data.data;
      return post;
    } catch (err: any) {
      console.log(`ERROR >>> getMemberBlogPosts ${err.message}`);
      throw err;
    }
  }

  async getChosenPost(blog_id: string) {
    try {
      let url = `/blog/single-article/${blog_id}`;

      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state>>>", result.data.state);

      const post: Blog = result.data.data;
      return post;
    } catch (err: any) {
      console.log(`ERROR >>> getChosenPost ${err.message}`);
      throw err;
    }
  }
}

export default BlogApiService;
