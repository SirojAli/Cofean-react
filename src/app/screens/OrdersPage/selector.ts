import { createSelector } from "reselect";
import { AppRootState } from "d:/Javascript Full Stack/puppy-home-react/puppy-home-react-develop/src/types/screen";

const selectOrdersPage = (state: AppRootState) => state.ordersPage;

export const retrievePendingOrders = createSelector(
  selectOrdersPage,
  (OrdersPage) => OrdersPage.pendingOrders
);

export const retrieveProcessOrders = createSelector(
  selectOrdersPage,
  (OrdersPage) => OrdersPage.processOrders
);
export const retrieveFinishedOrders = createSelector(
  selectOrdersPage,
  (OrdersPage) => OrdersPage.finishedOrders
);
export const retrieveCancelledOrders = createSelector(
  selectOrdersPage,
  (OrdersPage) => OrdersPage.cancelledOrders
);
export const retrieveAllOrders = createSelector(
  selectOrdersPage,
  (OrdersPage) => OrdersPage.allOrders
);
export const retrieveWishlist = createSelector(
  selectOrdersPage,
  (OrdersPage) => OrdersPage.wishList
);
