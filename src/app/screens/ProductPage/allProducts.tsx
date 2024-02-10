import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Checkbox, Container, Stack } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "../../../scss/cafe.scss";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { CssVarsProvider } from "@mui/joy/styles";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import IconButton from "@mui/joy/IconButton";
import Favorite from "@mui/icons-material/Favorite";
import Typography from "@mui/joy/Typography";
import Link from "@mui/joy/Link";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import CallIcon from "@mui/icons-material/Call";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Rating from "@mui/material/Rating";
import Phone from "@mui/icons-material/Phone";

import "../../../scss/products.scss";
import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TelegramIcon from "@mui/icons-material/Telegram";

export function AllProducts() {
  /** INITIALIZATIONS */

  return (
    <div className="all_products">
      <Container className="all_products_box">
        {/* for filter and main box */}
        <Stack className="top_section">
          {/* right: filter */}
          <Stack className="filter_box">
            {/*  1: search box */}
            <Box className="search_box">
              <form className="search_forms" action="" method="">
                <input
                  type="search"
                  className="search_input"
                  name="SearchProduct"
                  placeholder="Search Product"
                />
                <Button className="search_btn">
                  <SearchIcon />
                </Button>
              </form>
            </Box>

            {/*  2: product filter - category box */}
            <Box className="category_box">
              <Box className="ctg_title">
                <div>Categories</div>
              </Box>
              <Box className="ctg_types">
                <div>All Products</div>
                <div>Coffee</div>
                <div>Smoothie</div>
                <div>Tea</div>
                <div>Food</div>
                <div>Goods</div>
              </Box>
            </Box>

            {/* 3. price filter */}
            <Box className="price_box">
              <Box className="price_title">
                <div className="title">Price Filter</div>
              </Box>
              <Box className="price_line">
                <img src="/icons/point.svg" />
                <div className="line1"></div>
                <img src="/icons/point.svg" />
                <div className="line2"></div>
              </Box>
              <Box className="price_sum_filter">
                <Box className="price">
                  <div>Price: $0 - $20</div>
                </Box>
                <Box className="filter">
                  <div>Filter</div>
                </Box>
              </Box>
            </Box>

            {/* 4. product sorting */}
            <Box className="sorting_box">
              <div className="sorting_title">Sorting products</div>
              <Box className="sort_item">
                <Checkbox
                  // {...label}
                  defaultChecked
                  className="checkbox"
                />
                <div className="item_name">New (12)</div>
              </Box>
              <Box className="sort_item">
                <Checkbox
                  // {...label}
                  className="checkbox"
                />
                <div className="item_name">Like (22)</div>
              </Box>
              <Box className="sort_item">
                <Checkbox
                  // {...label}
                  className="checkbox"
                />
                <div className="item_name">View (7)</div>
              </Box>
              <Box className="sort_item">
                <Checkbox
                  // {...label}
                  className="checkbox"
                />
                <div className="item_name">Sale (5)</div>
              </Box>
              <Box className="sort_item">
                <Checkbox
                  // {...label}
                  className="checkbox"
                />
                <div className="item_name">Review (10)</div>
              </Box>
            </Box>

            {/* 5. best sellers: popular -> rating or views */}
            <Box className="bestseller_box">
              <div className="best_title">Best Sellers</div>
              <div className="best_boxes">
                <div className="best_box">
                  <Box className="best_img">
                    <img src="/images/products/a1.jpg" />
                  </Box>
                  <Box className="best_info">
                    <Rating
                      className="rating"
                      name="rating"
                      defaultValue={5}
                      precision={0.5}
                      readOnly
                    />
                    <div className="title">Coffee Latte</div>
                    <div className="price">$4.00</div>
                  </Box>
                </div>
                <div className="best_box">
                  <Box className="best_img">
                    <img src="/images/products/a1.jpg" />
                  </Box>
                  <Box className="best_info">
                    <Rating
                      className="rating"
                      name="rating"
                      defaultValue={5}
                      precision={0.5}
                      readOnly
                    />
                    <div className="title">Coffee Latte</div>
                    <div className="price">$4.00</div>
                  </Box>
                </div>
                <div className="best_box">
                  <Box className="best_img">
                    <img src="/images/products/a1.jpg" />
                  </Box>
                  <Box className="best_info">
                    <Rating
                      className="rating"
                      name="rating"
                      defaultValue={5}
                      precision={0.5}
                      readOnly
                    />
                    <div className="title">Coffee Latte</div>
                    <div className="price">$4.00</div>
                  </Box>
                </div>
              </div>
            </Box>

            {/* 5. tags */}
            <Box className="tag_box">
              <div className="tag_title">Tags</div>
              <div className="tag_texts">
                <p>Coffee</p>
                <p>Juicy</p>
                <p>Food</p>
                <p>Tea</p>
                <p>Latte</p>
                <p>Mocha</p>
                <span>Smoothie</span>
                <span>Americano</span>
              </div>
            </Box>

            {/* 5. follow us */}
            <Box className="follow_box">
              <div className="follow_title">Follow Us</div>
              <div className="social_icons">
                <Facebook className="icon" />
                <LinkedInIcon className="icon" />
                <Instagram className="icon" />
                <GitHubIcon className="icon" />
                <TelegramIcon className="icon" />
              </div>
            </Box>
          </Stack>

          <div className="left_box">
            {/* left: main box top */}
            <Stack className="main_box">
              <div className="sale_box">
                <div className="sale_texts">
                  <div className="sale_text_box">
                    <div className="sale_title">
                      <h2>Get Up to 15% Off Coffee Latte</h2>
                    </div>
                    <div className="sale_subtitle">
                      <h5>
                        Treat yourself to the delightful experience of our
                        coffee lattes
                      </h5>
                    </div>
                    <Button className="sale_btn">
                      <p>SHOP NOW</p>
                    </Button>
                  </div>
                </div>
                <div className="sale_img">
                  <img src="/images/products/a3.png" />
                </div>
              </div>

              <div className="product_box">
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
                        readOnly
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
                        <ShoppingCartIcon />
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
                        readOnly
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
                        <ShoppingCartIcon />
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
                        readOnly
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
                        <ShoppingCartIcon />
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
                        readOnly
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
                        <ShoppingCartIcon />
                      </div>
                    </Box>
                  </Box>
                </Box>

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
                        readOnly
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
                        <ShoppingCartIcon />
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
                        readOnly
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
                        <ShoppingCartIcon />
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
                        readOnly
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
                        <ShoppingCartIcon />
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
                        readOnly
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
                        <ShoppingCartIcon />
                      </div>
                    </Box>
                  </Box>
                </Box>

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
                        readOnly
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
                        <ShoppingCartIcon />
                      </div>
                    </Box>
                  </Box>
                </Box>
              </div>
            </Stack>

            {/* left: main box bottom */}
            <Stack className="pagination_box" spacing={2}>
              <Pagination count={3} variant="outlined" shape="rounded" />
            </Stack>
          </div>
        </Stack>
      </Container>

      {/* for featured products */}
      <div className="bottom_section">
        <Stack className="container_box">
          <div className="title_box">
            <h2>You might also like</h2>
          </div>
          <div className="box">
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
                    readOnly
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
                    <ShoppingCartIcon />
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
                    readOnly
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
                    <ShoppingCartIcon />
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
                    readOnly
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
                    <ShoppingCartIcon />
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
                    readOnly
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
                    <ShoppingCartIcon />
                  </div>
                </Box>
              </Box>
            </Box>
          </div>
        </Stack>
      </div>
    </div>
  );
}
