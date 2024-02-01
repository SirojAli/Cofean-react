import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Container, Rating, Stack } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import "../../../scss/products.scss";
import { Header } from "./header";

export function ChosenProduct() {
  /** INITIALIZATIONS */

  return (
    <div>
      <Header />
      <Container className="chosen_product">
        <Stack className="chosen_product_box">
          <div className="img_info_box">
            {/* {for images} */}
            <Box className="img_box">
              {/* big img */}
              <div className="big_img">
                <img src="/images/products/pin7.jpg" />
              </div>

              {/* small img */}
              <div className="small_img_box">
                <img src="/images/products/a1.jpg" />
                <img src="/images/products/a1.jpg" />
                <img src="/images/products/a1.jpg" />
                <img src="/images/products/a1.jpg" />
                <img src="/images/products/a1.jpg" />
              </div>
            </Box>

            {/* {for info} */}
            <Box className="info_box">
              {/* div 1: name-star-price */}
              <div className="product_info">
                <Box className="name">
                  <div>Coffee Latte</div>
                </Box>
                <Box className="reviews">
                  <Rating
                    className="rating"
                    name="rating"
                    defaultValue={5}
                    precision={0.5}
                    readOnly
                  />
                  <p className="text">123 Reviews</p>
                </Box>
                <Box className="price">
                  <span className="discounted">$4.00</span>
                  <span className="original">$5.00</span>
                </Box>
              </div>

              <div className="divider"></div>

              {/* div 2: order methods */}
              <div className="short_desc">
                <span>Free Delivery: on Orders over $50</span>
                <span>Steeping Time: 2-3 min</span>
                <span>Temperature: 190 F / 87 C</span>
                <div className="desc">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Reiciendis autem libero dignissimos ratione nemo sed
                  repudiandae, debitis incidunt voluptatibus? Recusandae debitis
                  vitae vero enim, ipsam repudiandae ex nihil doloribus labore.
                </div>
              </div>

              <div className="divider"></div>

              {/* div 3: cart-wishlist */}
              <div className="cart_wish">
                <Box className="quantity">
                  <div className="count">
                    <div className="math">-</div>
                    <div className="math">1</div>
                    <div className="math">+</div>
                  </div>
                  <div className="cart"></div>
                </Box>

                <Box className="wish">
                  <div className="icon"></div>
                  <div className="title"></div>
                </Box>
              </div>

              {/* div 4: category-tags */}
              <div className=""></div>

              {/* div 5: description-ingredients-shipping-returns */}
              <div className=""></div>
            </Box>
          </div>
        </Stack>
      </Container>
    </div>
  );
}
