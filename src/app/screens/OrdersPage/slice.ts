import { createSlice } from "@reduxjs/toolkit";
import { OrdersPageState } from "../../../types/screen";
const initialState: OrdersPageState = {
  pendingOrders: [],
  processOrders: [],
  finishedOrders: [],
  cancelledOrders: [],
  allOrders: [],
  wishlist: [],
};

const ordersPageSlice = createSlice({
  name: "ordersPage",
  initialState,
  reducers: {
    setPendingOrders: (state, action) => {
      state.pendingOrders = action.payload;
    },
    setProcessOrders: (state, action) => {
      state.processOrders = action.payload;
    },
    setFinishedOrders: (state, action) => {
      state.finishedOrders = action.payload;
    },
    setCancelledOrders: (state, action) => {
      state.cancelledOrders = action.payload;
    },
    setAllOrders: (state, action) => {
      state.allOrders = action.payload;
    },
    setWishList: (state, action) => {
      state.wishlist = action.payload;
    },
  },
});

export const {
  setPendingOrders,
  setProcessOrders,
  setFinishedOrders,
  setCancelledOrders,
  setAllOrders,
  setWishList,
} = ordersPageSlice.actions;

const OrdersPageReducer = ordersPageSlice.reducer;
export default OrdersPageReducer;
