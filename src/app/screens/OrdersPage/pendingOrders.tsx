import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { retrievePendingOrders } from "./selector";
import { Order } from "../../../types/order";
import { Box, Button } from "@mui/material";
import Moment from "react-moment";
import { Product } from "../../../types/product";
import { serverApi } from "../../../lib/config";
import { verifiedMemberData } from "../../apiServices/verify";
import {
  sweetErrorHandling,
  sweetFailureProvider,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import OrderApiService from "../../apiServices/orderApiService";
import assert from "assert";
import { Definer } from "../../../lib/definer";
import "../../../scss/orders.scss";

// REDUX SELECTOR
const pendingOrdersRetriever = createSelector(
  retrievePendingOrders,
  (pendingOrders) => ({
    pendingOrders,
  })
);
export function PendingOrders(props: any) {
  /*INITIALIZATION*/
  const { pendingOrders } = useSelector(pendingOrdersRetriever);
  const [classColor, setClassColor] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    const updateOrderStatus = (order: Order) => {
      switch (order.order_status) {
        case "PENDING":
          setClassColor("status status_pending");
          setStatus("Pending");
          break;
        case "PROCESS":
          setClassColor("status status_process");
          setStatus("Process");
          break;
        default:
          setClassColor("status status_process");
          setStatus("Process");
          break;
      }
    };

    if (pendingOrders) {
      pendingOrders.forEach((order: Order) => {
        updateOrderStatus(order);
      });
    }
  }, [pendingOrders]);

  /*HANDLERS*/
  const processOrderHandler = async (orderId: any) => {
    try {
      const data = { order_id: orderId, order_status: "PROCESS" };
      if (!verifiedMemberData) {
        sweetFailureProvider("Please, Login first", true);
      }
      let confirmation = window.confirm("Are you sure to make this order?");
      if (confirmation) {
        const orderService = new OrderApiService();
        await orderService.updateOrderStatus(data);
        props.setOrderRebuild(new Date());
        props.moveToProcess();
      }
    } catch (err) {
      console.log("processOrderHandler, ERROR >>>", err);
      sweetErrorHandling(err).then();
    }
  };

  const cancelOrderHandler = async (orderId: any) => {
    try {
      const data = { order_id: orderId, order_status: "CANCELLED" };
      let confirmation = window.confirm("Do you want to cancel the order?");
      if (confirmation) {
        const orderService = new OrderApiService();
        await orderService.updateOrderStatus(data);

        // Update local state to remove canceled order
        const updatedOrders = pendingOrders.filter(
          (order) => order._id !== orderId
        );
        props.setPendingOrders(updatedOrders);
        props.setOrderRebuild(new Date());
      }
    } catch (err) {
      console.log("cancelOrderHandler, ERROR >>>", err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <Stack className="orders_wrap">
      {pendingOrders?.map((order: Order) => {
        return (
          <Box key={order._id} className="order_box">
            <Box className="order_header">
              <Box className="header_left_box">
                <Box className="title_wrap">
                  <h3 className="bold_head">
                    Order ID: #{order._id.slice(-8).toUpperCase()}{" "}
                  </h3>
                  <p className="status status_pending">Pending</p>
                </Box>

                <p>
                  Proceed on{" "}
                  <span>
                    <Moment format="D MMM YYYY">{order.createdAt}</Moment>
                  </span>
                </p>
              </Box>
              <Box className="header_right_box">
                <h3 className="bold_head">
                  &#8361; {order.order_total_amount}{" "}
                </h3>
                <p>Total amount</p>
              </Box>
            </Box>
            <Box className="margin">
              <Box className="marginer" />
            </Box>
            <Box className="table_head">
              <Box className="head_product">Product</Box>
              <Box className="head_item">Price</Box>
              <Box className="head_item">Quantity</Box>
            </Box>
            <Box className="tbody_wrap">
              {order.order_items.map((item: any, id: number) => {
                const product: Product = order.product_data.filter(
                  (ele: any) => ele._id === item.product_id
                )[0];
                const image_path = `${serverApi}/${product.product_images[0]}`;
                return (
                  <Box
                    key={item._id}
                    className={
                      id % 2 === 0
                        ? "table_body"
                        : "table_body table_body_active"
                    }
                  >
                    <Box className="product_wrap">
                      <img src={image_path} alt="product" />
                      <p>{product.product_name}</p>
                    </Box>
                    <Box className="product_price">
                      &#8361;{" "}
                      {Math.round(
                        (product.product_price *
                          (100 - product.product_discount)) /
                          1000
                      ) * 10}
                    </Box>
                    <Box className="product_quantity">
                      {item.item_quantity} item
                    </Box>
                  </Box>
                );
              })}
            </Box>
            <Box className="order_btn_wrap">
              <Button
                value={order._id}
                onClick={() => processOrderHandler(order._id)}
                className="pay_btn"
              >
                Make Payment
              </Button>
              <Button
                value={order._id}
                onClick={() => cancelOrderHandler(order._id)}
                className="cancel_btn"
              >
                Cancel
              </Button>
            </Box>
          </Box>
        );
      })}
    </Stack>
  );
}
