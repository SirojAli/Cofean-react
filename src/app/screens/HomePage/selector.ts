import { createSelector } from "reselect";
import { AppRootState } from "../../../types/screen";

const selectHomePage = (state: AppRootState) => state.homePage;
export const retrieveTopCafes = createSelector(
  selectHomePage,
  (HomePage) => HomePage.topCafes
);
export const retrieveTrendProducts = createSelector(
  selectHomePage,
  (HomePage) => HomePage.trendProducts
);
export const retrieveSaleProducts = createSelector(
  selectHomePage,
  (HomePage) => HomePage.saleProducts
);
export const retrieveTopBlogs = createSelector(
  selectHomePage,
  (HomePage) => HomePage.topBlogs
);
