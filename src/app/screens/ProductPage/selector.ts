import { createSelector } from "reselect";
import { AppRootState } from "../../../types/screen";

const selectProductPage = (state: AppRootState) => state.productPage;
export const retrieveTargetProducts = createSelector(
  selectProductPage,
  (ProductPage) => ProductPage.targetProducts
);
export const retrieveRandomProducts = createSelector(
  selectProductPage,
  (ProductPage) => ProductPage.randomProducts
);
export const retrieveChosenProduct = createSelector(
  selectProductPage,
  (ProductPage) => ProductPage.chosenProduct
);
