import React, { useEffect } from "react";
import { Header } from "./header";
import { TopCafes } from "./topCafes";
import { TrendProducts } from "./trendProducts";
import { Video } from "./video";
import { SaleProducts } from "./saleProducts";
import { TopPosts } from "./topPosts";
import "../../../scss/home.scss";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { Cafe } from "../../../types/user";
import { Product } from "../../../types/product";
import { Blog } from "../../../types/blog";

import CafeApiService from "../../apiServices/cafeApiService";
import ProductApiService from "../../apiServices/productApiService";
import BlogApiService from "../../apiServices/blogApiService";

//** REDUX SLICE */

//** REDUX SELECTOR */

export function Homepage() {
  return (
    <div className="homepage">
      <Header />
      <TopCafes />
      <TrendProducts />
      <Video />
      <SaleProducts />
      <TopPosts />
    </div>
  );
}
