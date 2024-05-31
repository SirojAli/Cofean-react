import { createSlice } from "@reduxjs/toolkit";
import { MemberPageState } from "../../../types/screen";

const initialState: MemberPageState = {
  chosenMember: null,
  chosenMemberBlogs: [],
  memberFollowers: [],
  memberFollowings: [],
};

const memberPageSlice = createSlice({
  name: "memberPage",
  initialState,
  reducers: {
    setChosenMember: (state, action) => {
      state.chosenMember = action.payload;
    },
    setChosenMemberBlogs: (state, action) => {
      state.chosenMemberBlogs = action.payload;
    },

    setMemberFollowers: (state, action) => {
      state.memberFollowers = action.payload;
    },
    setMemberFollowings: (state, action) => {
      state.memberFollowings = action.payload;
    },
  },
});

export const {
  setChosenMember,
  setChosenMemberBlogs,

  setMemberFollowers,
  setMemberFollowings,
} = memberPageSlice.actions;

const MemberPageReducer = memberPageSlice.reducer;
export default MemberPageReducer;
