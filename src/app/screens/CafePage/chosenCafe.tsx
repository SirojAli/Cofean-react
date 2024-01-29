import React, { useEffect, useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import StarIcon from "@mui/icons-material/Star";
import { Swiper, SwiperSlide } from "swiper/react";
import EastIcon from "@mui/icons-material/East";

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import MonetizationOn from "@mui/icons-material/MonetizationOn";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import { useParams } from "react-router-dom";
// import assert from "assert";
import Rating from "@mui/material/Rating";

import "../../../scss/cafe.scss";
import { Header } from "./header";

export function ChosenCafe() {
  /** INITIALIZATIONS */

  return (
    <div>
      <Header />
      <Container className="chosen_cafe">
        <Stack className="chosen_cafe_box">
          {/* Name & Search */}
          <Stack className="name_search_box">
            <Box className="cafe_name">
              <p>Ediya Coffee</p>
            </Box>
            <Box className="search_cafe">
              <form className="search_form" action="">
                <input
                  className="search_input"
                  type="search"
                  name="single_search"
                  placeholder="Search cafe"
                />

                <Button
                  className="search_btn"
                  variant="contained"
                  endIcon={<SearchIcon />}
                ></Button>
              </form>
            </Box>
          </Stack>

          {/* Swiper for other cafes */}
          <Stack className="other_cafe_swiper">
            <Box className="prev_btn cafe-prev">
              <ArrowBackIosNewIcon />
            </Box>

            <Swiper
              className="other_cafe"
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              slidesPerView={7}
              centeredSlides={false}
              spaceBetween={30}
              navigation={{
                nextEl: ".cafe-next",
                prevEl: ".cafe-prev",
              }}
              // pagination={{ clickable: true }}
              // scrollbar={{ draggable: true }}
            >
              <SwiperSlide className="cafe_avatar">
                <img src="/images/brands/angelinUs.png" />
                <p>Angel in Us</p>
              </SwiperSlide>
              <SwiperSlide className="cafe_avatar">
                <img src="/images/brands/venti.png" />
                <p>Ediya</p>
              </SwiperSlide>

              <SwiperSlide className="cafe_avatar">
                <img src="/images/brands/aTwosomePlace.png" />
                <p>A Twosome Place</p>
              </SwiperSlide>
              <SwiperSlide className="cafe_avatar">
                <img src="/images/brands/compose.png" />
                <p>Compose</p>
              </SwiperSlide>

              <SwiperSlide className="cafe_avatar">
                <img src="/images/brands/paiks.png" />
                <p>Paik's</p>
              </SwiperSlide>
              <SwiperSlide className="cafe_avatar">
                <img src="/images/brands/Hollys.png" />
                <p>Hollys</p>
              </SwiperSlide>

              <SwiperSlide className="cafe_avatar">
                <img src="/images/brands/starbucks.jpg" />
                <p>Starbucks</p>
              </SwiperSlide>
              <SwiperSlide className="cafe_avatar">
                <img src="/images/brands/tomnToms.png" />
                <p>Tom n Toms</p>
              </SwiperSlide>

              <SwiperSlide className="cafe_avatar">
                <img src="/images/brands/compose.png" />
                <p>Compose</p>
              </SwiperSlide>
              <SwiperSlide className="cafe_avatar">
                <img src="/images/brands/tomnToms.png" />
                <p>Tom n Toms</p>
              </SwiperSlide>
            </Swiper>

            <Box className="next_btn cafe-next">
              <ArrowForwardIosIcon />
            </Box>
          </Stack>

          {/* filter box1 buttons */}
          <Stack className="filter_box1">
            <div className="filter_1">
              <Button className="filter_btn" variant="contained">
                Drink
              </Button>
              <Button className="filter_btn" variant="contained">
                Food
              </Button>
              <Button className="filter_btn" variant="contained">
                Goods
              </Button>
            </div>
          </Stack>

          {/* filter box1 buttons */}
          <Stack className="product_types">
            <Stack className="filter_box2">
              <div className="filter_2">
                <Button className="filter_btn" variant="contained">
                  New
                </Button>
                <Button className="filter_btn" variant="contained">
                  Price
                </Button>
                <Button className="filter_btn" variant="contained">
                  Best
                </Button>
                <Button className="filter_btn" variant="contained">
                  Popular
                </Button>
              </div>
            </Stack>

            <Stack className="cafe_all_products">
              <Box className="cafe_product">
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

              <Box className="cafe_product">
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

              <Box className="cafe_product">
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

              <Box className="cafe_product">
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
              <Box className="cafe_product">
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

              <Box className="cafe_product">
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

              <Box className="cafe_product">
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

              <Box className="cafe_product">
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
              <Box className="cafe_product">
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

              <Box className="cafe_product">
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

              <Box className="cafe_product">
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

              <Box className="cafe_product">
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
              <Box className="cafe_product">
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

              <Box className="cafe_product">
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

              <Box className="cafe_product">
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

              <Box className="cafe_product">
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
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
