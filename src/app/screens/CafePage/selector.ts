import { createSelector } from "reselect";
import { AppRootState } from "../../../types/screen";

const selectCafePage = (state: AppRootState) => state.cafePage;
export const retrieveAllCafes = createSelector(
  selectCafePage,
  (CafePage) => CafePage.allCafes
);
export const retrieveChosenCafe = createSelector(
  selectCafePage,
  (CafePage) => CafePage.chosenCafe
);
export const retrieveRandomCafes = createSelector(
  selectCafePage,
  (CafePage) => CafePage.randomCafes
);
export const retrieveCafeProducts = createSelector(
  selectCafePage,
  (CafePage) => CafePage.cafeProducts
);
