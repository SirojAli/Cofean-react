import { createSlice } from "@reduxjs/toolkit";
import { CafePageState } from "../../../types/screen";

const initialState: CafePageState = {
  allCafes: [],
  chosenCafe: null,
  randomCafes: [],
  targetProducts: [],
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
    setTargetProducts: (state, action) => {
      state.targetProducts = action.payload;
    },
  },
});

export const { setAllCafes, setChosenCafe, setRandomCafes, setTargetProducts } =
  CafePageSlice.actions;

const CafePageReducer = CafePageSlice.reducer;
export default CafePageReducer;
