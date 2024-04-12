import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import HomePageReducer from "./screens/HomePage/slice";
import reduxLogger from "redux-logger";
// import CafePageReducer from "./screens/CafePage/slice";
// import OrdersPageReducer from "./screens/OrdersPage/slice";
// import CommunityPageReducer from "./screens/CommunityPage/slice";
// import MemberPageReducer from "./screens/MembersPage/slice";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reduxLogger),
  reducer: {
    homePage: HomePageReducer,
    // cafePage: CafePageReducer,
    // ordersPage: OrdersPageReducer,
    // communityPage: CommunityPageReducer,
    // memberPage: MemberPageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
