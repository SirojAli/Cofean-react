import { createSlice } from "@reduxjs/toolkit";
import { BlogPageState } from "../../../types/screen";

const initialState: BlogPageState = {
  allBlogs: [],
  chosenMember: null,
  chosenMemberBlogs: [],
  chosenBlog: null,
  memberFollowers: [],
  memberFollowings: [],
  blogReviews: [],
};

const blogPageSlice = createSlice({
  name: "blogPage",
  initialState,
  reducers: {
    setAllBlogs: (state, action) => {
      state.allBlogs = action.payload;
    },
    setChosenMember: (state, action) => {
      state.chosenMember = action.payload;
    },
    setChosenMemberBlogs: (state, action) => {
      state.chosenMemberBlogs = action.payload;
    },
    setChosenBlog: (state, action) => {
      state.chosenBlog = action.payload;
    },
    setMemberFollowers: (state, action) => {
      state.memberFollowers = action.payload;
    },
    setMemberFollowings: (state, action) => {
      state.memberFollowings = action.payload;
    },
    setBlogReviews: (state, action) => {
      state.blogReviews = action.payload;
    },
  },
});

export const {
  setAllBlogs,
  setChosenMember,
  setChosenMemberBlogs,
  setChosenBlog,
  setMemberFollowers,
  setMemberFollowings,
  setBlogReviews,
} = blogPageSlice.actions;

const BlogPageReducer = blogPageSlice.reducer;
export default BlogPageReducer;
