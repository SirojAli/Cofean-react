import { createSlice } from "@reduxjs/toolkit";
import { ProductPageState } from "../../../types/screen";

const initialState: ProductPageState = {
  allProducts: [],
  randomProducts: [],
  chosenProduct: null,
  bestSellerProducts: [],
  productReviews: [],
};

const ProductPageSlice = createSlice({
  name: "productPage",
  initialState,
  reducers: {
    setAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },
    setRandomProducts: (state, action) => {
      state.randomProducts = action.payload;
    },
    setChosenProduct: (state, action) => {
      state.chosenProduct = action.payload;
    },
    setBestSellerProducts: (state, action) => {
      state.bestSellerProducts = action.payload;
    },
    setProductReviews: (state, action) => {
      state.productReviews = action.payload;
    },
  },
});

export const {
  setAllProducts,
  setRandomProducts,
  setChosenProduct,
  setBestSellerProducts,
  setProductReviews,
} = ProductPageSlice.actions;

const ProductPageReducer = ProductPageSlice.reducer;
export default ProductPageReducer;
