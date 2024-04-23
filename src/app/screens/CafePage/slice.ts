import { createSlice } from "@reduxjs/toolkit";
import { CafePageState } from "../../../types/screen";

const initialState: CafePageState = {
  targetCafes: [],
  randomCafes: [],
  chosenCafe: null,
};

const CafePageSlice = createSlice({
  name: "cafePage",
  initialState,
  reducers: {
    setTargetCafes: (state, action) => {
      state.targetCafes = action.payload;
    },
    setRandomCafes: (state, action) => {
      state.randomCafes = action.payload;
    },
    setChosenCafe: (state, action) => {
      state.chosenCafe = action.payload;
    },
  },
});

export const { setTargetCafes, setRandomCafes, setChosenCafe } =
  CafePageSlice.actions;

const CafePageReducer = CafePageSlice.reducer;
export default CafePageReducer;
