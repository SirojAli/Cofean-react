import { createSelector } from "reselect";
import { AppRootState } from "../../../types/screen";

const selectBlogPage = (state: AppRootState) => state.blogPage;
export const retrieveAllBlogs = createSelector(
  selectBlogPage,
  (BlogPage) => BlogPage.allBlogs
);
export const retrieveTopBlogs = createSelector(
  selectBlogPage,
  (BlogPage) => BlogPage.topBlogs
);
// export const retrieveChosenBlog = createSelector(
//   selectBlogPage,
//   (BlogPage) => BlogPage.chosenBlog
// );
