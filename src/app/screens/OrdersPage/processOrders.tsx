import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { retrieveProcessOrders } from "./selector";
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
const processOrdersRetriever = createSelector(
  retrieveProcessOrders,
  (processOrders) => ({
    processOrders,
  })
);

export function ProcessOrders(props: any) {
  /*INITIALIZATION*/
  const { processOrders } = useSelector(processOrdersRetriever);
  const [orderRebuild, setOrderRebuild] = useState<Date>(new Date());

  useEffect(() => {
    setOrderRebuild(new Date());
  }, [processOrders]);

  /*HANDLERS*/
  const payOrderHandler = async (order_id: any) => {
    try {
      const data = { order_id: order_id, order_status: "FINISHED" };
      let confirmation = window.confirm("Do you want to complete your order?");
      if (confirmation) {
        const orderService = new OrderApiService();
        await orderService.updateOrderStatus(data);
        props.setOrderRebuild(new Date());
        props.moveToDeliver();
      }
    } catch (err) {
      console.log("processOrderHandler, ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <Stack className="orders_wrap">
      {processOrders?.map((order: Order) => {
        return (
          <Box key={order._id} className="order_box">
            <Box className="order_header">
              <Box className="header_left_box">
                <Box className="title_wrap">
                  <h3 className="bold_head">
                    Order ID: #{order._id.slice(-8).toUpperCase()}{" "}
                  </h3>
                  <p className="status status_process">Process</p>
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
                onClick={() => payOrderHandler(order._id)}
                className="pay_btn"
              >
                Complete Payment
              </Button>
            </Box>
          </Box>
        );
      })}
    </Stack>
  );
}
