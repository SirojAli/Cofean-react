import { createSlice } from "@reduxjs/toolkit";
import { OrdersPageState } from "../../../types/screen";
const initialState: OrdersPageState = {
  // allOrders: [],
  pendingOrders: [],
  processOrders: [],
  finishedOrders: [],
};

const ordersPageSlice = createSlice({
  name: "ordersPage",
  initialState,
  reducers: {
    // setAllOrders: (state, action) => {
    //   state.allOrders = action.payload;
    // },
    setPendingOrders: (state, action) => {
      state.pendingOrders = action.payload;
    },
    setProcessOrders: (state, action) => {
      state.processOrders = action.payload;
    },
    setFinishedOrders: (state, action) => {
      state.finishedOrders = action.payload;
    },
  },
});

export const {
  // setAllOrders,
  setPendingOrders,
  setProcessOrders,
  setFinishedOrders,
} = ordersPageSlice.actions;

const OrdersPageReducer = ordersPageSlice.reducer;
export default OrdersPageReducer;
