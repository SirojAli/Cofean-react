import React, { useEffect, useRef, useState } from "react";
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
  const [likeCounts, setLikeCounts] = useState<{ [key: string]: number }>({});
  const [likedProducts, setLikedProducts] = useState<string[]>([]);

  useEffect(() => {
    // Fetch initial like counts
    trendProducts.forEach((pro: Product) => {
      refs.current[pro._id] = pro.product_likes;
      setLikeCounts((prevCounts) => ({
        ...prevCounts,
        [pro._id]: pro.product_likes,
      }));
      if (pro.me_liked && pro.me_liked[0]?.my_favorite) {
        setLikedProducts((prevLikedProducts) => [
          ...prevLikedProducts,
          pro._id,
        ]);
      }
    });
  }, [trendProducts]);

  useEffect(() => {
    const productService = new ProductApiService();

    productService
      .getTrendProducts({
        page: 1,
        limit: 4,
        order: "product_likes",
        product_collection: "coffee",
      })
      .then((data) => {
        setTrendProducts(data);
      })
      .catch((err) => console.log(err));
  }, []);

  /** HANDLERS */
  const chosenProductHandler = (id: string) => {
    navigate(`/products/${id}`);
  };

  const targetLikeHandler = async (id: string) => {
    try {
      const memberService = new MemberApiService();
      const data = { like_ref_id: id, group_type: "product" };
      const like_result: any = await memberService.memberLikeTarget(data);
      assert.ok(like_result, "An error occurred while processing the like.");

      // Update like count
      setLikeCounts((prevCounts) => ({
        ...prevCounts,
        [id]:
          like_result.like_status > 0 ? prevCounts[id] + 1 : prevCounts[id] - 1,
      }));

      // Update liked products
      if (like_result.like_status > 0) {
        setLikedProducts((prevLikedProducts) => [...prevLikedProducts, id]);
      } else {
        setLikedProducts((prevLikedProducts) =>
          prevLikedProducts.filter((productId) => productId !== id)
        );
      }

      await sweetTopSmallSuccessAlert("success", 700, false);
    } catch (err: any) {
      console.log("targetLikeHandler, ERROR:::", err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <Container className="home_trends">
      <Box className="trend_title">
        <h2>Popular Coffee</h2>
      </Box>

      <Stack className="trend_box">
        {trendProducts &&
          trendProducts.map((pro: Product) => {
            const image_path = `${serverApi}/${pro.product_images[0]}`;
            return (
              <Box
                className="product_box"
                onClick={() => chosenProductHandler(pro._id)}
              >
                <div className="sale_product">
                  <div className="sale_badge">
                    <p className="sale">-{pro.product_discount}%</p>
                  </div>
                  <img src={image_path} alt="coffee photo" />
                  <Favorite
                    className="like_btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      targetLikeHandler(pro._id);
                    }} // Pass product id to targetLikeHandler
                    style={{
                      fill: likedProducts.includes(pro._id) ? "red" : "white",
                      padding: "5px",
                      cursor: "pointer",
                    }}
                  />

                  <Box className="product_info">
                    <Box className="pro_name">
                      <span>{pro.product_name}</span>
                      <div className="basket">
                        <img src="icons/basket.svg" alt="" />
                      </div>
                    </Box>

                    <Box className="pro_basket">
                      <div className="price">
                        <span className="discounted">
                          ₩{" "}
                          {pro.product_price -
                            pro.product_price * (pro.product_discount / 100)}
                        </span>
                        <span className="original">₩ {pro.product_price}</span>
                      </div>
                    </Box>

                    <Box className="product_review">
                      <Rating
                        className="rating"
                        name="rating"
                        defaultValue={5}
                        precision={0.5}
                        readOnly
                      />
                      <p className="text">({pro.product_review})</p>
                      <div className="rating_2">
                        <Box className="rating_2">
                          <Box className="like">
                            <div className="like_cnt">
                              {likeCounts[pro._id] !== undefined
                                ? likeCounts[pro._id]
                                : pro.product_likes}
                            </div>
                            <div className="like_img">
                              <FavoriteIcon
                                style={{
                                  width: "15px",
                                  height: "15px",
                                  color: "#666666",
                                  marginTop: "8px",
                                }}
                              />{" "}
                            </div>
                          </Box>
                          <div className="dvr"></div>
                          <Box className="view">
                            <div className="view_cnt">{pro.product_views}</div>
                            <div className="view_img">
                              <VisibilityIcon
                                style={{
                                  width: "15px",
                                  height: "15px",
                                  color: "#666666",
                                  marginTop: "8px",
                                }}
                              />{" "}
                            </div>
                          </Box>
                        </Box>
                      </div>
                    </Box>
                  </Box>
                </div>
              </Box>
            );
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
