import React from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import Rating from "@mui/material/Rating";

import "../../../scss/home.scss";

export function Trends() {
  return (
    // if need it, change <> to <div>
    <Container className="home_trends">
      {/* 1. Text title */}
      <Box className="trend_title">
        <h2>Popular Coffee</h2>
      </Box>

      {/* 2. Products in Trends */}
      <Stack className="trend_box">
        <Box className="top_product">
          <img src="/images/products/a1.jpg" alt="" />
          <Box className="product_info">
            <Box className="product_review">
              <Rating
                className="rating"
                name="rating"
                defaultValue={5}
                precision={0.5}
                readOnly
              />
              <p className="text">123 Reviews</p>
            </Box>
            <Box className="pro_name">Latte</Box>
            <Box className="pro_basket">
              <div className="price">$7.00</div>
              <div className="basket">
                <p>Add to Cart</p>
                <img src="/icons/cart.svg" alt="cart" />
              </div>
            </Box>
          </Box>
        </Box>

        <Box className="top_product">
          <img src="/images/products/star6.jpg" alt="" />
          <Box className="product_info">
            <Box className="product_review">
              <Rating
                className="rating"
                name="rating"
                defaultValue={5}
                precision={0.5}
                readOnly
              />
              <p className="text">77 Reviews</p>
            </Box>
            <Box className="pro_name">Americano</Box>
            <Box className="pro_basket">
              <div className="price">$5.00</div>
              <div className="basket">
                <p>Add to Cart</p>
                <img src="/icons/cart.svg" alt="cart" />
              </div>
            </Box>
          </Box>
        </Box>

        <Box className="top_product">
          <img src="/images/products/home3.jpg" alt="" />
          <Box className="product_info">
            <Box className="product_review">
              <Rating
                className="rating"
                name="rating"
                defaultValue={5}
                precision={0.5}
                readOnly
              />
              <p className="text">23 Reviews</p>
            </Box>
            <Box className="pro_name">Mocha Latte</Box>
            <Box className="pro_basket">
              <div className="price">$12.00</div>
              <div className="basket">
                <p>Add to Cart</p>
                <img src="/icons/cart.svg" alt="cart" />
              </div>
            </Box>
          </Box>
        </Box>

        <Box className="top_product">
          <img src="/images/products/pin7.jpg" alt="" />
          <Box className="product_info">
            <Box className="product_review">
              <Rating
                className="rating"
                name="rating"
                defaultValue={5}
                precision={0.5}
                readOnly
              />
              <p className="text">32 Reviews</p>
            </Box>
            <Box className="pro_name">Choco Mint</Box>
            <Box className="pro_basket">
              <div className="price">$17.00</div>
              <div className="basket">
                <p>Add to Cart</p>
                <img src="/icons/cart.svg" alt="cart" />
              </div>
            </Box>
          </Box>
        </Box>
      </Stack>

      {/* 3. See All Products */}
      <Stack className="trend_btn">
        <Button className="br_btn">See More</Button>
      </Stack>
    </Container>
  );
}

// d2691e
// a76c47
