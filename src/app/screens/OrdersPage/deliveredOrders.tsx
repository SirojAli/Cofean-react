import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { retrieveDeliveredOrders } from "./selector";
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
import { setDeliveredOrders } from "./slice";
import axios from "axios";

// REDUX SELECTOR
const deliveredOrdersRetriever = createSelector(
  retrieveDeliveredOrders,
  (deliveredOrders) => ({
    deliveredOrders,
  })
);
export function DeliveredOrders(props: any) {
  const dispatch = useDispatch();
  const { deliveredOrders } = useSelector(deliveredOrdersRetriever);
  const [classColor, setClassColor] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    const deliveredOrdersSubset = deliveredOrders
      ?.slice()
      .sort((a: Order, b: Order) => b._id.localeCompare(a._id))
      .slice(0, 5);

    localStorage.setItem("deliveredOrders", JSON.stringify(deliveredOrders));
    const updateOrderStatus = (order: Order) => {
      switch (order.order_status) {
        case "DELIVERED":
          setClassColor("status status_delivered");
          setStatus("Delivered");
          break;
        default:
          setClassColor("status status_process");
          setStatus("Process");
          break;
      }
    };

    if (deliveredOrdersSubset) {
      deliveredOrdersSubset.forEach((order: Order) => {
        updateOrderStatus(order);
      });
    }
  }, [deliveredOrders]);

  return (
    <Stack className="orders_wrap">
      {deliveredOrders
        ?.slice()
        .sort((a: Order, b: Order) => b._id.localeCompare(a._id))
        .slice(0, 5)
        ?.map((order: Order) => {
          return (
            <Box key={order._id} className="order_box">
              <Box className="order_header">
                <Box className="header_left_box">
                  <Box className="title_wrap">
                    <h3 className="bold_head">
                      Order ID: #{order._id.slice(-8).toUpperCase()}{" "}
                    </h3>
                    <p className="status status_delivered">Delivered</p>
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
              {/* <Box className="order_btn_wrap">
              <Button
                value={order._id}
                onClick={() => deleteOrderHandler(order._id)}
                className="pay_btn"
              >
                Delete
              </Button>
            </Box> */}
            </Box>
          );
        })}
    </Stack>
  );
}

export default DeliveredOrders;
