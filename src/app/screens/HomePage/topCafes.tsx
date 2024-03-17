import React, { useEffect } from "react";
import { Box, Button, Container, Stack } from "@mui/material";

import "../../../scss/home.scss";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setTopCafes } from "./slice";
import { retrieveTopCafes } from "./selector";
import { Cafe } from "../../../types/user";
import { Product } from "../../../types/product";
import { Blog } from "../../../types/blog";

import CafeApiService from "../../apiServices/cafeApiService";
import ProductApiService from "../../apiServices/productApiService";
import BlogApiService from "../../apiServices/blogApiService";
import { serverApi } from "../../../lib/config";

//** REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({
  setTopCafes: (data: Cafe[]) => dispatch(setTopCafes(data)),
});

//** REDUX SELECTOR */
const topCafesRetriever = createSelector(retrieveTopCafes, (topCafes) => ({
  topCafes,
}));

export function TopCafes() {
  /** INITIALIZATIONS */
  const { setTopCafes } = actionDispatch(useDispatch());
  const { topCafes } = useSelector(topCafesRetriever);
  console.log("topCafes>>>", topCafes);

  useEffect(() => {
    const cafeService = new CafeApiService();

    cafeService
      .getTopCafes()
      .then((data) => {
        setTopCafes(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container className="home_brands">
      <Box className="brands_title">
        <h2>Top Coffee Shops</h2>
      </Box>

      <Stack className="brands_box">
        {topCafes.map((ele: Cafe) => {
          const image_path = `${serverApi}/${ele.mb_image}`;
          return (
            <Box className="top_brand">
              <img src={image_path} alt="cafe photo" />
            </Box>
          );
        })}
      </Stack>

      <Stack className="brands_btn">
        <Button className="br_btn">See More</Button>
      </Stack>
    </Container>
  );
}
