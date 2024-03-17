import React, { useEffect } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import Rating from "@mui/material/Rating";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "../../../scss/home.scss";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { retrieveSaleProducts } from "./selector";
import { Cafe } from "../../../types/user";
import { serverApi } from "../../../lib/config";
import { Product } from "../../../types/product";
import { setSaleProducts } from "./slice";
import ProductApiService from "../../apiServices/productApiService";
// import { useHistory, useParams } from "react-router-dom";

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
  const { setSaleProducts } = actionDispatch(useDispatch());
  const { saleProducts } = useSelector(saleProductsRetriever);
  console.log("saleProducts>>>", saleProducts);

  useEffect(() => {
    const productService = new ProductApiService();

    productService
      .getSaleProducts({ page: 1, limit: 4, order: "mb_point" })
      .then((data) => {
        setSaleProducts(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    // if need it, change <> to <div>
    <div className="home_sales">
      <Stack className="home_sale_box">
        {/* 1. Text title */}
        <Box className="sale_title">
          <h2>Featured Coffee</h2>
        </Box>

        {/* 2. Products in Trends */}
        <Stack className="sale_box">
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
        </Stack>
      </Stack>
    </div>
  );
}
