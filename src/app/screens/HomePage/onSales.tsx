import React from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import Rating from "@mui/material/Rating";

import "../../../scss/home.scss";

export function OnSales() {
  return (
    // if need it, change <> to <div>
    <div className="home_sales">
      <Stack className="home_sale_box">
        {/* 1. Text title */}
        <Box className="sale_title">
          <h2>Hot Sales</h2>
        </Box>

        {/* 2. Products in Trends */}
        <Stack className="sale_box">
          <Box className="sale_product">
            <div className="sale_badge">
              <p className="sale">-20%</p>
            </div>
            <img src="/images/products/a1.jpg" alt="" />
            <Box className="product_info">
              <Box className="product_review">
                <Rating
                  className="rating"
                  name="rating"
                  defaultValue={5}
                  precision={0.5}
                />
                <p className="text">123 Reviews</p>
              </Box>
              <Box className="pro_name">Latte</Box>
              <Box className="pro_basket">
                <div className="price">
                  <span className="discounted">$4.00</span>
                  <span className="original">$5.00</span>
                </div>
                <div className="basket">
                  <p>Add to Cart</p>
                  <img src="/icons/cart.svg" alt="cart" />
                </div>
              </Box>
            </Box>
          </Box>

          <Box className="sale_product">
            <div className="sale_badge">
              <p className="new">New</p>
            </div>
            <img src="/images/products/star6.jpg" alt="" />
            <Box className="product_info">
              <Box className="product_review">
                <Rating
                  className="rating"
                  name="rating"
                  defaultValue={5}
                  precision={0.5}
                />
                <p className="text">77 Reviews</p>
              </Box>
              <Box className="pro_name">Americano</Box>
              <Box className="pro_basket">
                <div className="price">
                  <span className="discounted">$4.00</span>
                  <span className="original">$5.00</span>
                </div>
                <div className="basket">
                  <p>Add to Cart</p>
                  <img src="/icons/cart.svg" alt="cart" />
                </div>
              </Box>
            </Box>
          </Box>

          <Box className="sale_product">
            <img src="/images/products/home3.jpg" alt="" />
            <Box className="product_info">
              <Box className="product_review">
                <Rating
                  className="rating"
                  name="rating"
                  defaultValue={5}
                  precision={0.5}
                />
                <p className="text">23 Reviews</p>
              </Box>
              <Box className="pro_name">Mocha Latte</Box>
              <Box className="pro_basket">
                <div className="price">
                  <span className="discounted">$4.00</span>
                  <span className="original">$5.00</span>
                </div>
                <div className="basket">
                  <p>Add to Cart</p>
                  <img src="/icons/cart.svg" alt="cart" />
                </div>
              </Box>
            </Box>
          </Box>

          <Box className="sale_product">
            <img src="/images/products/pin7.jpg" alt="" />
            <Box className="product_info">
              <Box className="product_review">
                <Rating
                  className="rating"
                  name="rating"
                  defaultValue={5}
                  precision={0.5}
                />
                <p className="text">32 Reviews</p>
              </Box>
              <Box className="pro_name">Choco Mint</Box>
              <Box className="pro_basket">
                <div className="price">
                  <span className="discounted">$4.00</span>
                  <span className="original">$5.00</span>
                </div>
                <div className="basket">
                  <p>Add to Cart</p>
                  <img src="/icons/cart.svg" alt="cart" />
                </div>
              </Box>
            </Box>
          </Box>
        </Stack>
      </Stack>
    </div>
  );
}
