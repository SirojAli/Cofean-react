import { createSlice } from "@reduxjs/toolkit";
import { CafePageState } from "../../../types/screen";

const initialState: CafePageState = {
  allCafes: [],
  chosenCafe: null,
  randomCafes: [],
  cafeProducts: [],
};

const CafePageSlice = createSlice({
  name: "cafePage",
  initialState,
  reducers: {
    setAllCafes: (state, action) => {
      state.allCafes = action.payload;
    },
    setChosenCafe: (state, action) => {
      state.chosenCafe = action.payload;
    },
    setRandomCafes: (state, action) => {
      state.randomCafes = action.payload;
    },
    setCafeProducts: (state, action) => {
      state.cafeProducts = action.payload;
    },
  },
});

export const { setAllCafes, setChosenCafe, setRandomCafes, setCafeProducts } =
  CafePageSlice.actions;

const CafePageReducer = CafePageSlice.reducer;
export default CafePageReducer;
