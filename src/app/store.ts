import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import HomePageReducer from "./screens/HomePage/slice";
import reduxLogger from "redux-logger";
import CafePageReducer from "./screens/CafePage/slice";
import ProductPageReducer from "./screens/ProductPage/slice";
import BlogPageReducer from "./screens/BlogPage/slice";
import OrdersPageReducer from "./screens/OrdersPage/slice";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    // @ts-ignore
    getDefaultMiddleware().concat(reduxLogger),
  reducer: {
    homePage: HomePageReducer,
    cafePage: CafePageReducer,
    productPage: ProductPageReducer,
    blogPage: BlogPageReducer,
    ordersPage: OrdersPageReducer,
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
