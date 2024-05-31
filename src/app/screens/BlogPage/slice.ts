import { createSlice } from "@reduxjs/toolkit";
import { BlogPageState } from "../../../types/screen";

const initialState: BlogPageState = {
  allBlogs: [],
  topBlogs: [],
  chosenBlog: null,
};

const BlogPageSlice = createSlice({
  name: "blogPage",
  initialState,
  reducers: {
    setAllBlogs: (state, action) => {
      state.allBlogs = action.payload;
    },
    setTopBlogs: (state, action) => {
      state.topBlogs = action.payload;
    },
    setChosenBlog: (state, action) => {
      state.chosenBlog = action.payload;
    },
  },
});

export const { setAllBlogs, setTopBlogs, setChosenBlog } =
  BlogPageSlice.actions;

const BlogPageReducer = BlogPageSlice.reducer;
export default BlogPageReducer;
