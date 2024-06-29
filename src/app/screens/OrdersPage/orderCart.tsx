import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
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
import { MakeOrderCont } from "../../context/MakeOrder";
import assert from "assert";
import { Definer } from "../../../lib/definer";
import "../../../scss/account.scss";

const OrderCart = ({ order, setOrderRebuild }: any) => {
  /*INITIALIZATIONS*/
  const setOrders = MakeOrderCont();
  const [classColor, setClassColor] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  useEffect(() => {
    switch (order.order_status) {
      case "PENDING":
        setClassColor("status status_pending");
        setStatus("Pending");
        break;
      case "FINISHED":
        setClassColor("status status_delivered");
        setStatus("Delivered");
        break;

      default:
        setClassColor("status status_process");
        setStatus("Process");
        break;
    }
  }, [order.order_status]);
  /*HANDLERS*/
  const payHandler = async (e: any) => {
    try {
      assert(verifiedMemberData?.mb_address, Definer.general_err1);
      const order_id = e.target.value;
      const data = { order_id: order_id, order_status: "PROCESS" };
      if (!verifiedMemberData) {
        sweetFailureProvider("Please login first", true);
      }
      const orderService = new OrderApiService();
      await orderService.updateOrderStatus(data);
      await sweetTopSmallSuccessAlert("Payment successful!", 700, false);
      setOrders[1](2);
      setOrderRebuild(new Date());
    } catch (err) {
      console.log("payHandler, ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <Box key={order._id} className="order_box">
      <Box className="order_header">
        <Box className="header_left_box">
          <Box className="title_wrap">
            <h3 className="bold_head">
              Order ID: #{order._id.slice(-8).toUpperCase()}{" "}
            </h3>
            <p className={classColor}> {status}</p>
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
            &#8361; {order.order_total_amount + order.order_delivery_cost}{" "}
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
                id % 2 === 0 ? "table_body" : "table_body table_body_active"
              }
            >
              <Box className="product_wrap">
                <img src={image_path} alt="product" />
                <p>{product.product_name}</p>
              </Box>
              <Box className="product_price">
                &#8361;{" "}
                {Math.round(
                  (product.product_price * (100 - product.product_discount)) /
                    1000
                ) * 10}
              </Box>
              <Box className="product_quantity">{item.item_quantity} item</Box>
            </Box>
          );
        })}
      </Box>
      {order.order_status === "PENDING" && (
        <Box className="order_btn_wrap">
          <Button value={order._id} onClick={payHandler} className="pay_btn">
            Pay
          </Button>
        </Box>
      )}
      {order.order_status === "PROCESS" && (
        <Box className="order_btn_wrap"></Box>
      )}
    </Box>
  );
};

export default OrderCart;
