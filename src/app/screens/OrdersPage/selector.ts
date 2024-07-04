import { createSelector } from "reselect";
import { AppRootState } from "../../../types/screen";

const selectOrdersPage = (state: AppRootState) => state.ordersPage;
export const retrieveAllOrders = createSelector(
  selectOrdersPage,
  (OrdersPage) => OrdersPage.allOrders
);
export const retrievePendingOrders = createSelector(
  selectOrdersPage,
  (OrdersPage) => OrdersPage.pendingOrders
);
export const retrieveProcessOrders = createSelector(
  selectOrdersPage,
  (OrdersPage) => OrdersPage.processOrders
);
export const retrieveDeliveredOrders = createSelector(
  selectOrdersPage,
  (OrdersPage) => OrdersPage.deliveredOrders
);
