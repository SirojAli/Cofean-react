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
import "../../../scss/cafe.scss";

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
import Typography from "@mui/joy/Typography";
import Link from "@mui/joy/Link";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import CallIcon from "@mui/icons-material/Call";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Phone from "@mui/icons-material/Phone";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

import "../../../scss/products.scss";
import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TelegramIcon from "@mui/icons-material/Telegram";
import assert from "assert";
import { verifiedMemberData } from "../../apiServices/verify";
import { Definer } from "../../../lib/definer";
import MemberApiService from "../../apiServices/memberApiService";
import { useNavigate, useParams } from "react-router-dom";
import {
  sweetErrorHandling,
  sweetFailureProvider,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import CafeApiService from "../../apiServices/cafeApiService";
import ProductApiService from "../../apiServices/productApiService";
import { Collections } from "@mui/icons-material";
import { serverApi } from "../../../lib/config";
import { Product } from "../../../types/product";
import ReactImageMagnify from "react-image-magnify";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Dispatch } from "@reduxjs/toolkit";
import { setChosenProduct } from "./slice";
import { retrieveChosenProduct } from "./selector";
import axios from "axios";
import ReviewApiService from "../../apiServices/reviewApiService";
import { setProductReviews } from "./slice";
import { retrieveProductReviews } from "./selector";
import { Review } from "../../../types/review";

//** REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({
  setChosenProduct: (data: Product | null) => dispatch(setChosenProduct(data)),
  setProductReviews: (data: Review[]) => dispatch(setProductReviews(data)),
});

// REDUX SELECTOR
const chosenProductRetriever = createSelector(
  retrieveChosenProduct,
  (chosenProduct) => ({
    chosenProduct,
  })
);

export function ChosenProduct() {
  /** INITIALIZATIONS */
  const navigate = useNavigate();
  const { product_id } = useParams<{ product_id: string }>();
  const { setChosenProduct } = actionDispatch(useDispatch());
  const { chosenProduct } = useSelector(chosenProductRetriever);

  const [rating, setRating] = useState(0);
  const [value, setValue] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const review_text = useRef<any>();

  const productRelatedProcess = async () => {
    try {
      if (!product_id) return;
      // Fetching data from backend
      const productService = new ProductApiService();
      const product: Product = await productService.getChosenProduct(
        product_id
      );
      console.log("Fetched product:", product); // Log the fetched product

      // Check if the fetched product has nutritional information
      if (product && product.product_calories !== undefined) {
        setChosenProduct(product);
      } else {
        console.error("Nutritional information missing");
      }
    } catch (err) {
      console.log("productRelatedProcess>>>", err);
    }
  };

  const [productRebuild, setProductRebuild] = useState<Date>(new Date());

  useEffect(() => {
    productRelatedProcess();
  }, [productRebuild]);

  useEffect(() => {
    const reviewService = new ReviewApiService();
    reviewService
      .getTargetReviews({
        page: 1,
        limit: 20,
        review_ref_id: product_id || "",
      })
      .then((data) => setProductReviews(data))
      .catch((err) => console.log(err));
  }, [product_id]);

  /** HANDLERS */
  const chosenCafeHandler = (id: string) => {
    navigate(`/cafes/${id}`);
  };

  const submitHandler = async () => {
    try {
      const reviewService = new ReviewApiService();
      const result = await reviewService.createReview({
        review_ref_id: product_id || "",
        group_type: "product",
        title: title, // Capture the title value
        content: content, // Capture the review content value
        product_rating: rating,
      });
      console.log("state>>>", result.state);
      // After successful submission, navigate to the product page
      navigate(`/products/${product_id}`);
    } catch (error: any) {
      console.error("ERROR >>> createReviews", error.message);
      throw error;
    }
  };

  return (
    <div>
      <Header />
      <Container className="chosen_product">
        {chosenProduct !== null && (
          <Stack className="chosen_product_box">
            <div className="img_info_box">
              <Box className="img_box">
                <ReactImageMagnify
                  className="selected_item"
                  {...{
                    smallImage: {
                      alt: "Delicious coffee delivered by Cofean",
                      isFluidWidth: true,
                      src: `${serverApi}/${chosenProduct.product_images}`,
                    },
                    largeImage: {
                      width: 800,
                      height: 800,
                      src: `${serverApi}/${chosenProduct.product_images}`,
                    },
                  }}
                />
                <div
                  className="wish"
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "15px",
                    zIndex: "1",
                  }}
                >
                  <Checkbox
                    className="icon"
                    icon={
                      <FavoriteBorder
                        style={{ width: "30px", height: "30px" }}
                      />
                    }
                    checkedIcon={
                      <FavoriteIcon
                        style={{ color: "red", width: "30px", height: "30px" }}
                      />
                    }
                  />
                  <span className="title">Add to Wishlist</span>
                </div>
              </Box>

              <Box className="info_box">
                <div className="product_info">
                  <Box className="name_sort">
                    <div className="name">{chosenProduct.product_name}</div>
                    <Box className="reviews">
                      <Rating
                        className="rating"
                        name="rating"
                        value={4.0}
                        precision={0.5}
                        readOnly
                      />
                    </Box>
                  </Box>

                  <Box className="cafe_name">
                    <div
                      className="cafe"
                      onClick={() =>
                        chosenCafeHandler(chosenProduct?.cafe_mb_id?._id)
                      }
                    >
                      {chosenProduct?.cafe_mb_id?.mb_nick}
                    </div>
                  </Box>

                  <Box className="price">
                    {chosenProduct.product_discount > 0 ? (
                      <>
                        <span className="discounted">
                          ₩{" "}
                          {chosenProduct.product_price -
                            chosenProduct.product_price *
                              (chosenProduct.product_discount / 100)}
                        </span>
                        <span className="original">
                          ₩ {chosenProduct.product_price}
                        </span>
                      </>
                    ) : (
                      <span className="discounted">
                        ₩ {chosenProduct.product_price}
                      </span>
                    )}
                  </Box>
                </div>

                <div className="description">
                  <div className="desc">
                    {chosenProduct.product_description}
                  </div>
                  <div className="nutr_title_btn">
                    <Box className="nutr_title">
                      <div className="title">Nutritional Information</div>
                    </Box>
                    {/* <Box className="nutr_btn">
                      <div className="btn">HOT</div>
                      <div className="btn">ICE</div>
                    </Box> */}
                  </div>

                  <div className="nutr_info">
                    <div className="left">
                      <Box className="nutr_item">
                        <p className="name">Calories (kcal)</p>
                        <p className="quantity">
                          {chosenProduct.product_calories}
                        </p>
                      </Box>
                      <Box className="nutr_item">
                        <p className="name">Caffeine (mg)</p>
                        <p className="quantity">
                          {chosenProduct.product_caffeine}
                        </p>
                      </Box>
                      <Box className="nutr_item">
                        <p className="name">Sugar (g)</p>
                        <p className="quantity">
                          {chosenProduct.product_sugar}
                        </p>
                      </Box>
                    </div>

                    <div className="divider_3"></div>

                    <div className="right">
                      <Box className="nutr_item">
                        <p className="name">Protein (g)</p>
                        <p className="quantity">
                          {chosenProduct.product_protein}
                        </p>
                      </Box>
                      <Box className="nutr_item">
                        <p className="name">Saturated Fat (g)</p>
                        <p className="quantity">
                          {chosenProduct.product_saturated_fat}
                        </p>
                      </Box>
                      <Box className="nutr_item">
                        <p className="name">Sodium (mg)</p>
                        <p className="quantity">
                          {chosenProduct.product_sodium}
                        </p>
                      </Box>
                    </div>
                  </div>

                  <div className="allergy">
                    <p>Allergy trigger: {chosenProduct.product_allergy}</p>
                  </div>
                </div>

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

            <div className="review_box">
              <div className="review_title">
                <span>Product Reviews</span>
              </div>

              <div className="review_summary">
                <div className="rating_box">
                  <Box className="stats_1">
                    <div className="star_points">
                      <Box className="point">
                        <span>4.0</span>
                      </Box>
                      <Rating
                        className="rating"
                        name="rating"
                        value={4.0}
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
                        <p>(5)</p>
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
                        <p>(6)</p>
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
                        <p>(1)</p>
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
                      value={title} // Add value prop
                      onChange={(e) => setTitle(e.target.value)} // Add onChange handler
                    />
                  </div>
                </Box>
                <div className="review_text">
                  <span className="review_name">Content of Review</span>
                  <TextField
                    type="text"
                    variant="outlined"
                    color="primary"
                    label="Type your comment here..."
                    fullWidth
                    InputProps={{ style: { height: "150px" } }}
                    value={content} // Add value prop
                    onChange={(e) => setContent(e.target.value)} // Add onChange handler
                  />
                </div>
                <Button className="submit_btn" onClick={submitHandler}>
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
                        <span>
                          I just wish you had it in larger quantities!
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
        )}
      </Container>
    </div>
  );
}
