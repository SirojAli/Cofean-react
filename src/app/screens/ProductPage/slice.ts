import { createSlice } from "@reduxjs/toolkit";
import { ProductPageState } from "../../../types/screen";

const initialState: ProductPageState = {
  targetProducts: [],
  randomProducts: [],
  chosenProduct: null,
};

const ProductPageSlice = createSlice({
  name: "productPage",
  initialState,
  reducers: {
    setTargetProducts: (state, action) => {
      state.targetProducts = action.payload;
    },
    setRandomProducts: (state, action) => {
      state.randomProducts = action.payload;
    },
    setChosenProduct: (state, action) => {
      state.chosenProduct = action.payload;
    },
  },
});

export const { setTargetProducts, setRandomProducts, setChosenProduct } =
  ProductPageSlice.actions;

const ProductPageReducer = ProductPageSlice.reducer;
export default ProductPageReducer;
