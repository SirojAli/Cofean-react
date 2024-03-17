import React, { useEffect } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import Rating from "@mui/material/Rating";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import "../../../scss/home.scss";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { retrieveTrendProducts } from "./selector";
import { serverApi } from "../../../lib/config";
import { setTrendProducts } from "./slice";
import ProductApiService from "../../apiServices/productApiService";
import { Blog } from "../../../types/blog";
import { Product } from "../../../types/product";
// import { useHistory, useParams } from "react-router-dom";

// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setTrendProducts: (data: Product[]) => dispatch(setTrendProducts(data)),
});

// REDUX SELECTOR
const trendProductsRetriever = createSelector(
  retrieveTrendProducts,
  (trendProducts) => ({
    trendProducts,
  })
);

export function TrendProducts() {
  /** INITIALIZATIONS */
  const { setTrendProducts } = actionDispatch(useDispatch());
  const { trendProducts } = useSelector(trendProductsRetriever);
  console.log("trendProducts>>>", trendProducts);

  useEffect(() => {
    const productService = new ProductApiService();

    productService
      .getTrendProducts({ page: 1, limit: 4, order: "mb_point" })
      .then((data) => {
        setTrendProducts(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container className="home_trends">
      <Box className="trend_title">
        <h2>Popular Coffee</h2>
      </Box>

      <Stack className="trend_box">
        {trendProducts.map((ele: Product) => {
          const image_path = `${serverApi}/${ele.product_image}`;
          return (
            
          )
        })}
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
                <ShoppingCartIcon />
              </div>
            </Box>
          </Box>
        </Box>
      </Stack>

      <Stack className="trend_btn">
        <Button className="br_btn">See More</Button>
      </Stack>
    </Container>
  );
}

// d2691e
// a76c47
