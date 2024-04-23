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
