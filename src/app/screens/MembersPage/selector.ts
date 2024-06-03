import { createSelector } from "reselect";
import { AppRootState } from "../../../types/screen";

const selectMemberPage = (state: AppRootState) => state.memberPage;
export const retrieveChosenMember = createSelector(
  selectMemberPage,
  (MemberPage) => MemberPage.chosenMember
);
export const retrieveChosenMemberBlogs = createSelector(
  selectMemberPage,
  (MemberPage) => MemberPage.chosenMemberBlogs
);
export const retrieveChosenBlog = createSelector(
  selectMemberPage,
  (MemberPage) => MemberPage.chosenBlog
);
export const retrieveMemberFollowers = createSelector(
  selectMemberPage,
  (MemberPage) => MemberPage.memberFollowers
);
export const retrieveMemberFollowings = createSelector(
  selectMemberPage,
  (MemberPage) => MemberPage.memberFollowings
);
