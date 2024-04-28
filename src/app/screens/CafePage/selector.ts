import { createSelector } from "reselect";
import { AppRootState } from "../../../types/screen";

const selectCafePage = (state: AppRootState) => state.cafePage;
export const retrieveAllCafes = createSelector(
  selectCafePage,
  (CafePage) => CafePage.allCafes
);
export const retrieveRandomCafes = createSelector(
  selectCafePage,
  (CafePage) => CafePage.randomCafes
);
export const retrieveChosenCafe = createSelector(
  selectCafePage,
  (CafePage) => CafePage.chosenCafe
);
