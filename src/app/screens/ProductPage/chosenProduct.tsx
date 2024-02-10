import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Rating,
  Stack,
  TextField,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import "../../../scss/products.scss";
import { Header } from "./header";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export function ChosenProduct() {
  /** INITIALIZATIONS */

  return (
    <div>
      <Header />
      <Container className="chosen_product">
        <Stack className="chosen_product_box">
          {/* for image & product info */}
          <div className="img_info_box">
            {/* {for images} */}
            <Box className="img_box">
              {/* big img */}
              <div className="big_img">
                <div className="wish">
                  <Checkbox
                    className="icon"
                    // {...label}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite style={{ color: "red" }} />}
                    /*@ts-ignore*/
                  />
                  <span className="title">Add to Wishlist</span>
                </div>
                <img src="/images/products/pin7.jpg" />
              </div>

              {/* small img */}
              <div className="small_img_box">
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
                <Box className="name_sort">
                  <div className="name">Coffee Latte</div>
                  <Box className="reviews">
                    <Rating
                      className="rating"
                      name="rating"
                      defaultValue={5}
                      precision={0.5}
                      readOnly
                    />
                  </Box>
                </Box>

                <Box className="price">
                  <span className="discounted">$4.00</span>
                  <span className="original">$5.00</span>
                </Box>
              </div>

              {/* <div className="divider_1"></div> */}

              {/* div 2: order methods */}
              <div className="description">
                <div className="desc">
                  Café latte with a smooth blend of vanilla bean syrup
                  exclusively for reserve. Café latte with a smooth blend of
                  vanilla bean syrup exclusively for reserve.
                </div>
                <div className="nutr_title_btn">
                  <Box className="nutr_title">
                    <div className="title">Nutritional Information</div>
                  </Box>
                  <Box className="nutr_btn">
                    <div className="btn">HOT</div>
                    <div className="btn">ICE</div>
                  </Box>
                </div>

                <div className="nutr_info">
                  <div className="left">
                    <Box className="nutr_item">
                      <p className="name">Calories (kcal)</p>
                      <p className="quantity">110</p>
                    </Box>
                    <Box className="nutr_item">
                      <p className="name">Caffeine (mg)</p>
                      <p className="quantity">75</p>
                    </Box>
                    <Box className="nutr_item">
                      <p className="name">Sugar (g)</p>
                      <p className="quantity">8</p>
                    </Box>
                  </div>

                  <div className="divider_3"></div>

                  <div className="right">
                    <Box className="nutr_item">
                      <p className="name">Protein (g)</p>
                      <p className="quantity">6</p>
                    </Box>
                    <Box className="nutr_item">
                      <p className="name">Saturated Fat (g)</p>
                      <p className="quantity">3</p>
                    </Box>
                    <Box className="nutr_item">
                      <p className="name">Sodium (mg)</p>
                      <p className="quantity">70</p>
                    </Box>
                  </div>
                </div>

                <div className="allergy">
                  <p>Allergy trigger: Milk, Soybean</p>
                </div>
              </div>

              {/* div 3: cart-wishlist */}
              <div className="cart_wish">
                <div className="count">
                  <p>-</p>
                  <p>1</p>
                  <p>+</p>
                </div>

                <Button className="cart">
                  <p>Add to cart</p>
                  <ShoppingCartIcon style={{ color: "black" }} />
                </Button>
              </div>
            </Box>
          </div>

          {/* for review & comments */}
          <div className="review_box">
            <div className="review_title">
              <span>Product Reviews</span>
            </div>

            <div className="review_summary">
              <div className="rating_box">
                <Box className="stats_1">
                  <div className="star_points">
                    <Box className="point">
                      <span>5.0</span>
                    </Box>
                    <Rating
                      className="rating"
                      name="rating"
                      defaultValue={5}
                      precision={0.5}
                      readOnly
                    />
                  </div>

                  <div className="rating_reviews">
                    <p>Based on 12 Reviews</p>
                  </div>
                </Box>
                <div className="divider_rating"></div>
                <Box className="stats_2">
                  <div className="star">
                    <Rating
                      className="rating"
                      // name="rating"
                      defaultValue={5}
                      precision={0.5}
                      readOnly
                    />
                    <div className="line"></div>
                    <div className="count">
                      <p>(12)</p>
                    </div>
                  </div>
                  <div className="star">
                    <Rating
                      className="rating"
                      // name="rating"
                      defaultValue={4}
                      precision={0.5}
                      readOnly
                    />
                    <div className="line"></div>
                    <div className="count">
                      <p>(0)</p>
                    </div>
                  </div>
                  <div className="star">
                    <Rating
                      className="rating"
                      // name="rating"
                      defaultValue={3}
                      precision={0.5}
                      readOnly
                    />
                    <div className="line"></div>
                    <div className="count">
                      <p>(0)</p>
                    </div>
                  </div>
                  <div className="star">
                    <Rating
                      className="rating"
                      // name="rating"
                      defaultValue={2}
                      precision={0.5}
                      readOnly
                    />
                    <div className="line"></div>
                    <div className="count">
                      <p>(0)</p>
                    </div>
                  </div>
                  <div className="star">
                    <Rating
                      className="rating"
                      // name="rating"
                      defaultValue={1}
                      precision={0.5}
                      readOnly
                    />
                    <div className="line"></div>
                    <div className="count">
                      <p>(0)</p>
                    </div>
                  </div>
                </Box>
                <div className="divider_rating"></div>
              </div>

              <div className="write_review">
                <div className="write_review_div">
                  <p>Write a Review</p>
                </div>
              </div>
            </div>

            <div className="submit_review">
              <Box className="rate">
                <div className="rating_text">
                  <span className="rating_name">Rating</span>
                  <span className="star">*</span>
                </div>
                <div className="rating_box">
                  <Rating
                    className="rating"
                    name="rating"
                    defaultValue={0}
                    precision={0.5}
                  />
                </div>
              </Box>
              <Box className="title_review">
                <div className="title">
                  <span className="title_name">Title of Review</span>
                  <span className="star">*</span>
                </div>
                <div className="title_form">
                  <TextField
                    type="text"
                    variant="outlined"
                    color="primary"
                    label="Give a title for your review"
                    fullWidth
                    InputProps={{ style: { height: "50px" } }}
                  />
                </div>
              </Box>
              <div className="review_text">
                <span className="review_name">Review</span>
                <TextField
                  type="text"
                  variant="outlined"
                  color="primary"
                  label="Type your comment here..."
                  fullWidth
                  InputProps={{ style: { height: "150px" } }}
                />
              </div>
              <Button className="submit_btn">
                <span>Submit Review</span>
              </Button>
            </div>

            <div className="review_list">
              <div className="review_title_box">
                <Box className="title">
                  <span>Reviews</span>
                </Box>
              </div>
              <div className="comment_box">
                <Box className="comment">
                  <div className="info">
                    <Box className="user_img">
                      <img src="/icons/default_user.svg" />
                    </Box>
                    <div className="star_name">
                      <Box className="name">
                        <span>Sirojiddin Samadov</span>
                      </Box>
                      <Box className="star">
                        <Rating
                          className="rating"
                          name="rating"
                          defaultValue={5}
                          precision={0.5}
                          readOnly
                        />
                      </Box>
                    </div>
                    <Box className="date">
                      <span>07/07/2024</span>
                    </Box>
                  </div>
                  <div className="commented">
                    <Box className="c_title">
                      <span>Delicious!</span>
                    </Box>
                    <Box className="c_text">
                      <span>
                        Highly recommend. Has a beautiful leafy flavor to it.
                        Sometime it’s almost floral. Highly recommend. Has a
                        beautiful leafy flavor to it. Sometime it’s almost
                        floral. Highly recommend.
                      </span>
                    </Box>
                  </div>
                </Box>

                <Box className="comment">
                  <div className="info">
                    <Box className="user_img">
                      <img src="/icons/default_user.svg" />
                    </Box>
                    <div className="star_name">
                      <Box className="name">
                        <span>David Believer</span>
                      </Box>
                      <Box className="star">
                        <Rating
                          className="rating"
                          name="rating"
                          defaultValue={5}
                          precision={0.5}
                          readOnly
                        />
                      </Box>
                    </div>
                    <Box className="date">
                      <span>12/12/2024</span>
                    </Box>
                  </div>
                  <div className="commented">
                    <Box className="c_title">
                      <span>Wonderful flavor!</span>
                    </Box>
                    <Box className="c_text">
                      <span>I just wish you had it in larger quantities!</span>
                    </Box>
                  </div>
                </Box>

                <Box className="comment">
                  <div className="info">
                    <Box className="user_img">
                      <img src="/icons/default_user.svg" />
                    </Box>
                    <div className="star_name">
                      <Box className="name">
                        <span>Shon Azizov</span>
                      </Box>
                      <Box className="star">
                        <Rating
                          className="rating"
                          name="rating"
                          defaultValue={1}
                          precision={0.5}
                          readOnly
                        />
                      </Box>
                    </div>
                    <Box className="date">
                      <span>17/07/2024</span>
                    </Box>
                  </div>
                  <div className="commented">
                    <Box className="c_title">
                      <span>Not good!</span>
                    </Box>
                    <Box className="c_text">
                      <span>I was disappointed in the flavors</span>
                    </Box>
                  </div>
                </Box>
              </div>
            </div>
          </div>
        </Stack>
      </Container>
    </div>
  );
}
