import { createSlice } from "@reduxjs/toolkit";
import { ProductPageState } from "../../../types/screen";

const initialState: ProductPageState = {
  allProducts: [],
  randomProducts: [],
  chosenProduct: null,
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
  },
});

export const { setAllProducts, setRandomProducts, setChosenProduct } =
  ProductPageSlice.actions;

const ProductPageReducer = ProductPageSlice.reducer;
export default ProductPageReducer;
