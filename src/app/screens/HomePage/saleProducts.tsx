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
      .getSaleProducts({
        page: 1,
        limit: 4,
        order: "product_discount",
        product_collection: "coffee",
      })
      .then((data) => {
        setSaleProducts(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="home_sales">
      <Stack className="home_sale_box">
        <Box className="sale_title">
          <h2>Featured Beverages</h2>
        </Box>

        <Stack className="sale_box">
          {saleProducts &&
            saleProducts.map((pro: Product) => {
              const image_path = `${serverApi}/${pro.product_images[0]}`;
              const discountedPrice =
                pro.product_price -
                (pro.product_price * pro.product_discount) / 100;
              const originalPrice = pro.product_price;
              return (
                <Box className="sale_product">
                  <div className="sale_badge">
                    <p className="sale">-{pro.product_discount}%</p>
                  </div>
                  <img src={image_path} alt="" />
                  <Box className="product_info">
                    <Box className="product_review">
                      <Rating
                        className="rating"
                        name="rating"
                        defaultValue={5}
                        precision={0.5}
                        readOnly
                      />
                      <p className="text">{pro.product_review} Reviews</p>
                    </Box>
                    <Box className="pro_name">{pro.product_name}</Box>
                    <Box className="pro_basket">
                      <div className="price">
                        <span className="discounted">₩ {discountedPrice}</span>
                        <span className="original">₩ {originalPrice}</span>
                      </div>
                      <div className="basket">
                        <p>Add to Cart</p>
                        <ShoppingCartIcon />
                      </div>
                    </Box>
                  </Box>
                </Box>
              );
            })}
        </Stack>
      </Stack>
    </div>
  );
}
