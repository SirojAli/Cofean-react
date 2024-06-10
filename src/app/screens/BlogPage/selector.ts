import { createSelector } from "reselect";
import { AppRootState } from "../../../types/screen";

const selectBlogPage = (state: AppRootState) => state.blogPage;
export const retrieveAllBlogs = createSelector(
  selectBlogPage,
  (BlogPage) => BlogPage.allBlogs
);
export const retrieveChosenMember = createSelector(
  selectBlogPage,
  (BlogPage) => BlogPage.chosenMember
);
export const retrieveChosenMemberBlogs = createSelector(
  selectBlogPage,
  (BlogPage) => BlogPage.chosenMemberBlogs
);
export const retrieveChosenBlog = createSelector(
  selectBlogPage,
  (BlogPage) => BlogPage.chosenBlog
);
export const retrieveMemberFollowers = createSelector(
  selectBlogPage,
  (BlogPage) => BlogPage.memberFollowers
);
export const retrieveMemberFollowings = createSelector(
  selectBlogPage,
  (BlogPage) => BlogPage.memberFollowings
);
export const retrieveBlogReviews = createSelector(
  selectBlogPage,
  (BlogPage) => BlogPage.blogReviews
);
