import { createSlice } from "@reduxjs/toolkit";
import { ProductPageState } from "../../../types/screen";

const initialState: ProductPageState = {
  allProducts: [],
  chosenProduct: null,
  productReviews: [],
};

const ProductPageSlice = createSlice({
  name: "productPage",
  initialState,
  reducers: {
    setAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },
    setChosenProduct: (state, action) => {
      state.chosenProduct = action.payload;
    },
    setProductReviews: (state, action) => {
      state.productReviews = action.payload;
    },
  },
});

export const { setAllProducts, setChosenProduct, setProductReviews } =
  ProductPageSlice.actions;

const ProductPageReducer = ProductPageSlice.reducer;
export default ProductPageReducer;
