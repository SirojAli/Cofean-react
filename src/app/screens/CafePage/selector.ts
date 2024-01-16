import { createSelector } from "reselect";
import { AppRootState } from "../../../types/screen";

const selectCafePage = (state: AppRootState) => state.cafePage;
export const retrieveTargetCafes = createSelector(
  selectCafePage,
  (CafePage) => CafePage.targetCafes
);
export const retrieveRandomCafes = createSelector(
  selectCafePage,
  (CafePage) => CafePage.randomCafes
);
export const retrieveChosenCafe = createSelector(
  selectCafePage,
  (CafePage) => CafePage.chosenCafe
);
export const retrieveTargetProducts = createSelector(
  selectCafePage,
  (CafePage) => CafePage.targetProducts
);
export const retrieveChosenProduct = createSelector(
  selectCafePage,
  (CafePage) => CafePage.chosenProduct
);
