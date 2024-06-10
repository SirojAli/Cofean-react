import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../types/screen";

const initialState: HomePageState = {
  topCafes: [],
  trendProducts: [],
  saleProducts: [],
  // topBlogs: [],
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
    // setTopBlogs: (state, action) => {
    //   state.topBlogs = action.payload;
    // },
  },
});

export const { setTopCafes, setTrendProducts, setSaleProducts } =
  HomePageSlice.actions;

const HomePageReducer = HomePageSlice.reducer;
export default HomePageReducer;
