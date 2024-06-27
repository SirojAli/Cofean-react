import { Stack } from "@mui/material";
import React from "react";
import OrderCart from "./orderCart";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { retrieveAllOrders } from "./selector";
import { Order } from "../../../types/order";
import "../../../scss/account.scss";

// REDUX SELECTOR
const allOrdersRetriever = createSelector(retrieveAllOrders, (allOrders) => ({
  allOrders,
}));
const AllOrders = ({ setOrderRebuild }: any) => {
  /*INITIALIZATION*/
  const { allOrders } = useSelector(allOrdersRetriever);
  return (
    <Stack className="orders_wrap">
      {allOrders?.map((order: Order) => {
        return (
          <OrderCart
            key={order._id}
            order={order}
            setOrderRebuild={setOrderRebuild}
          />
        );
      })}
    </Stack>
  );
};

export default AllOrders;
