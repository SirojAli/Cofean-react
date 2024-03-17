import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../types/screen";

const initialState: HomePageState = {
  topCafes: [],
  trendProducts: [],
  saleProducts: [],
  topPosts: [],
};

const HomePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setTopCafes: (state, action) => {
      state.topCafes = action.payload;
    },
    setTrendProducts: (state, action) => {
      state.trendProducts = action.payload;
    },
    setSaleProducts: (state, action) => {
      state.saleProducts = action.payload;
    },
    setTopPosts: (state, action) => {
      state.topPosts = action.payload;
    },
  },
});

export const { setTopCafes, setTrendProducts, setSaleProducts, setTopPosts } =
  HomePageSlice.actions;

const HomePageReducer = HomePageSlice.reducer;
export default HomePageReducer;
