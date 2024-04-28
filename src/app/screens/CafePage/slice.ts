import { createSlice } from "@reduxjs/toolkit";
import { CafePageState } from "../../../types/screen";

const initialState: CafePageState = {
  allCafes: [],
  randomCafes: [],
  chosenCafe: null,
};

const CafePageSlice = createSlice({
  name: "cafePage",
  initialState,
  reducers: {
    setAllCafes: (state, action) => {
      state.allCafes = action.payload;
    },
    setRandomCafes: (state, action) => {
      state.randomCafes = action.payload;
    },
    setChosenCafe: (state, action) => {
      state.chosenCafe = action.payload;
    },
  },
});

export const { setAllCafes, setRandomCafes, setChosenCafe } =
  CafePageSlice.actions;

const CafePageReducer = CafePageSlice.reducer;
export default CafePageReducer;
