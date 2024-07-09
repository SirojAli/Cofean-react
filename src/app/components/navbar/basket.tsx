import React, { useEffect, useState } from "react";
import "../../../scss/navbar.scss";
import { Badge, Box, Button, IconButton, Stack } from "@mui/material";
import { Add, DeleteOutline, Remove, ShoppingCart } from "@mui/icons-material";
import { Dropdown } from "antd";
import { CartItem } from "../../../types/others";
import { serverApi } from "../../../lib/config";
import { ShoppingCartCont } from "../../context/ShoppingCart";
import { MakeOrderCont } from "../../context/MakeOrder";
import { useNavigate } from "react-router-dom";
import { verifiedMemberData } from "../../apiServices/verify";
import { Definer } from "../../../lib/definer";
import OrderApiService from "../../apiServices/orderApiService";
import assert from "assert";
import { sweetErrorHandling } from "../../../lib/sweetAlert";

export default function Basket(props: any) {
  /*INITIALIZATIONS*/
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll, setOrderRebuild } =
    props;
  console.log(cartItems);

  const itemsPrice = cartItems.reduce(
    (a: number, c: CartItem) => a + c.price * c.quantity,
    0
  );
  const [basketOpen, setBasketOpen] = useState<boolean>(false);

  /*HANDLERS*/
  const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closeHandler = () => {
    setAnchorEl(null);
  };

  const orderHandler = async () => {
    try {
      assert.ok(verifiedMemberData, Definer.auth_err1);
      const order = new OrderApiService();
      await order.createOrder(cartItems);
      onDeleteAll();
      navigate("/orders");
      onDeleteAll();
      setBasketOpen(false);
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <Dropdown
      open={basketOpen}
      className="account_dropdown"
      placement="bottomRight"
      arrow={{ pointAtCenter: true }}
      overlayClassName="shopcart_root"
      dropdownRender={(menu) => (
        <Stack
          onMouseLeave={() => setBasketOpen(false)}
          className="shopcart_container_wrap"
        >
          <Box className="shopcart_container">
            <Box className="carts_wrap">
              <p
                className={
                  cartItems.length === 0 ? "no_product" : "display_none"
                }
              >
                No product in Shopping cart
              </p>
              {cartItems.map((item: any) => {
                const image_path = `${serverApi}/${item.image}`;
                return (
                  <Box key={item._id} className="cart_item_box">
                    <img src={image_path} alt="product" />
                    <Box className="title_price_wrap">
                      <p className="item_title">{item.name}</p>
                      <p className="item_price">
                        Price: &#8361;{" "}
                        {item.discount > 0
                          ? Math.round(
                              (item.price -
                                (item.price * item.discount) / 100) /
                                10
                            ) * 10
                          : item.price}
                      </p>
                    </Box>
                    <Box className="item_counter">
                      <Box
                        onClick={() => {
                          onRemove(item);
                        }}
                        className="count_btn"
                      >
                        <Remove className="count_icon" />
                      </Box>
                      <Box className="count_number">{item.quantity}</Box>
                      <Box
                        onClick={() => {
                          onAdd(item, 1);
                        }}
                        className="count_btn"
                      >
                        <Add className="count_icon" />
                      </Box>
                    </Box>
                    <DeleteOutline
                      onClick={() => {
                        onDelete(item);
                      }}
                      className="delete_icon"
                    />
                  </Box>
                );
              })}
            </Box>
            {cartItems.length > 0 && (
              <Box className="cart_bottom">
                <p className="total_price">Total: &#8361;{itemsPrice}</p>
                <Button onClick={orderHandler} className="order_btn">
                  Make an order
                </Button>
              </Box>
            )}
          </Box>
        </Stack>
      )}
    >
      <Badge badgeContent={cartItems.length} color="primary" className="badge">
        <IconButton
          onMouseEnter={() => setBasketOpen(!basketOpen)}
          className="icon_box cart_icon"
        >
          <ShoppingCart className="icon" />
        </IconButton>
      </Badge>
    </Dropdown>
  );
}
