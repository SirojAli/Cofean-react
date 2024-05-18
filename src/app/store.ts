import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import HomePageReducer from "./screens/HomePage/slice";
import reduxLogger from "redux-logger";
import CafePageReducer from "./screens/CafePage/slice";
import ProductPageReducer from "./screens/ProductPage/slice";
import MemberPageReducer from "./screens/MembersPage/slice";

// import OrdersPageReducer from "./screens/OrdersPage/slice";
// import CommunityPageReducer from "./screens/CommunityPage/slice";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    // @ts-ignore
    getDefaultMiddleware().concat(reduxLogger),
  reducer: {
    homePage: HomePageReducer,
    cafePage: CafePageReducer,
    productPage: ProductPageReducer,
    memberPage: MemberPageReducer,

    // ordersPage: OrdersPageReducer,
    // communityPage: CommunityPageReducer,
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
