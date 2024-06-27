import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import Rating from "@mui/material/Rating";
import "../../../scss/home.scss";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { retrieveTrendProducts } from "./selector";
import { serverApi } from "../../../lib/config";
import { setTrendProducts } from "./slice";
import ProductApiService from "../../apiServices/productApiService";
import { Product } from "../../../types/product";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Favorite from "@mui/icons-material/Favorite";
import assert from "assert";
import { verifiedMemberData } from "../../apiServices/verify";
import { Definer } from "../../../lib/definer";
import MemberApiService from "../../apiServices/memberApiService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import ProductCart from "../../components/productCart";

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
  const navigate = useNavigate();
  const { setTrendProducts } = actionDispatch(useDispatch());
  const { trendProducts } = useSelector(trendProductsRetriever);
  console.log("trendProducts>>>", trendProducts);

  const refs: any = useRef([]);

  useEffect(() => {
    const productService = new ProductApiService();
    productService
      .getTargetProducts({
        page: 1,
        limit: 4,
        order: "product_likes",
        product_collection: ["coffee", "smoothie", "tea"],
        price: [0, 1000],
        search: "",
      })
      .then((data) => {
        setTrendProducts(data);
      })
      .catch((err) => console.log(err));
  }, []);

  /** HANDLERS */

  return (
    <Container className="home_trends">
      <Box className="trend_title">
        <h2>Popular Drinks</h2>
      </Box>

      <Stack className="trend_box">
        {trendProducts.map((ele) => {
          return <ProductCart cartData={ele} key={ele._id} />;
        })}
      </Stack>

      <Stack className="trend_btn">
        <Button onClick={() => navigate("/products")} className="br_btn">
          See More
        </Button>
      </Stack>
    </Container>
  );
}
