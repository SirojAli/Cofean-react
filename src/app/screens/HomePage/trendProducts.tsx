import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import Rating from "@mui/material/Rating";
import "../../../scss/home.scss";
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
import ProductApiService from "../../apiServices/productApiService";
import { serverApi } from "../../../lib/config";
import { Product } from "../../../types/product";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { retrieveTrendProducts } from "./selector";
import { setTrendProducts } from "./slice";

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

export function TrendProducts(props: any) {
  /** INITIALIZATIONS */
  const navigate = useNavigate();
  const refs: any = useRef([]);

  const { setTrendProducts } = actionDispatch(useDispatch());
  const { trendProducts } = useSelector(trendProductsRetriever);
  console.log("trendProducts>>>", trendProducts);

  const ratingValue = 4;
  const [likeCounts, setLikeCounts] = useState<{ [key: string]: number }>({});
  const [likedProducts, setLikedProducts] = useState<string[]>([]);

  // for Targetting Products
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

  // For Counting Likes
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

  /** HANDLERS */
  const likeHandler = async (e: any, id: string) => {
    try {
      assert.ok(verifiedMemberData, Definer.auth_err1);
      const memberService = new MemberApiService();
      const data = { like_ref_id: id, group_type: "product" };
      const like_result: any = await memberService.memberLikeTarget(data);
      assert.ok(like_result, Definer.general_err1);

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
      console.log("likeHandler, ERROR >>>", err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <Container className="home_trends">
      <Box className="trend_title">
        <h2>Popular Drinks</h2>
      </Box>

      <Stack className="trend_box">
        {trendProducts.map((pro: Product) => {
          return (
            <div
              className={"product_box"}
              onClick={() => navigate(`/products/${pro._id}`)}
            >
              <Box className="sale_product">
                {pro.product_discount > 0 && (
                  <div className="sale_badge">
                    <p className="sale">-{pro.product_discount}%</p>
                  </div>
                )}
                <img
                  src={`${serverApi}/${pro.product_images[0]}`}
                  alt="coffee photo"
                />
                <Favorite
                  className="like_btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    likeHandler(e, pro._id);
                  }}
                  style={{
                    fill: likedProducts.includes(pro._id) ? "red" : "white",
                    padding: "5px",
                    cursor: "pointer",
                  }}
                />
                <Box className="product_info">
                  <Box className="pro_name">
                    <span>{pro.product_name}</span>
                    <div
                      className="basket"
                      onClick={(e) => {
                        e.stopPropagation();
                        props.onAdd(pro);
                      }}
                    >
                      <img src="icons/basket.svg" alt="" />
                    </div>
                  </Box>

                  <Box className="pro_basket">
                    <div className="price">
                      {pro.product_discount > 0 ? (
                        <>
                          <span className="discounted">
                            ₩{" "}
                            {pro.product_price -
                              pro.product_price * (pro.product_discount / 100)}
                          </span>
                          <span className="original">
                            ₩ {pro.product_price}
                          </span>
                        </>
                      ) : (
                        <span className="discounted">
                          ₩ {pro.product_price}
                        </span>
                      )}
                    </div>
                  </Box>

                  <Box className="product_reviews">
                    <Rating
                      className="rating"
                      name="rating"
                      value={ratingValue}
                      precision={0.5}
                      readOnly
                    />
                    <p className="text">(4)</p>
                    {/* <p className="text">({product_reviews})</p> */}
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
                                marginTop: "5px",
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
                                marginTop: "5px",
                              }}
                            />{" "}
                          </div>
                        </Box>
                      </Box>
                    </div>
                  </Box>
                </Box>
              </Box>
            </div>
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
