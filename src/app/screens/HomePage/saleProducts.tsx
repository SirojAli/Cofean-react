import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import "../../../scss/home.scss";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { retrieveSaleProducts } from "./selector";
import { Product } from "../../../types/product";
import { setSaleProducts } from "./slice";
import ProductApiService from "../../apiServices/productApiService";
import { useNavigate } from "react-router-dom";
import ProductCart from "../../components/productCart";

// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setSaleProducts: (data: Product[]) => dispatch(setSaleProducts(data)),
});
// REDUX SELECTOR
const saleProductsRetriever = createSelector(
  retrieveSaleProducts,
  (saleProducts) => ({
    saleProducts,
  })
);

export function SaleProducts() {
  /** INITIALIZATIONS */
  const navigate = useNavigate();
  const { setSaleProducts } = actionDispatch(useDispatch());
  const { saleProducts } = useSelector(saleProductsRetriever);
  console.log("saleProducts>>>", saleProducts);

  const refs: any = useRef([]);
  const [likeCounts, setLikeCounts] = useState<{ [key: string]: number }>({});
  const [likedProducts, setLikedProducts] = useState<string[]>([]);

  useEffect(() => {
    const productService = new ProductApiService();

    productService
      .getTargetProducts({
        page: 1,
        limit: 4,
        order: "product_discount",
        product_collection: ["coffee"],
        search: "",
        price: [0, 1000],
      })
      .then((data) => {
        setSaleProducts(data);
      })
      .catch((err) => console.log(err));
  }, []);

  /** HANDLERS */

  return (
    <div className="home_sales">
      <Stack className="home_sale_box">
        <Box className="sale_title">
          <h2>Featured Beverages</h2>
        </Box>

        <Stack className="trend_box">
          {saleProducts.map((ele) => {
            return <ProductCart cartData={ele} key={ele._id} />;
          })}
        </Stack>
      </Stack>
    </div>
  );
}
