import { createSelector } from "reselect";
import { AppRootState } from "../../../types/screen";

const selectProductPage = (state: AppRootState) => state.productPage;
export const retrieveAllProducts = createSelector(
  selectProductPage,
  (ProductPage) => ProductPage.allProducts
);
export const retrieveRandomProducts = createSelector(
  selectProductPage,
  (ProductPage) => ProductPage.randomProducts
);
export const retrieveChosenProduct = createSelector(
  selectProductPage,
  (ProductPage) => ProductPage.chosenProduct
);
export const retrieveBestSellerProducts = createSelector(
  selectProductPage,
  (ProductPage) => ProductPage.bestSellerProducts
);
