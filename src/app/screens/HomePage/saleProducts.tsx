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

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { retrieveSaleProducts } from "./selector";
import { Product } from "../../../types/product";
import { setSaleProducts } from "./slice";
import { serverApi } from "../../../lib/config";

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

export function SaleProducts(props: any) {
  /** INITIALIZATIONS */
  const navigate = useNavigate();
  const refs: any = useRef([]);

  const { setSaleProducts } = actionDispatch(useDispatch());
  const { saleProducts } = useSelector(saleProductsRetriever);
  console.log("saleProducts>>>", saleProducts);

  const ratingValue = 4;
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

  useEffect(() => {
    // Fetch initial like counts
    saleProducts.forEach((pro: Product) => {
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
  }, [saleProducts]);

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
    <div className="home_sales">
      <Stack className="home_sale_box">
        <Box className="sale_title">
          <h2>Featured Beverages</h2>
        </Box>

        <Stack className="trend_box">
          {saleProducts.map((pro: Product) => {
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
                                pro.product_price *
                                  (pro.product_discount / 100)}
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
                      {/* <p className="text">(4)</p> */}
                      <p className="text">({pro.product_reviews})</p>
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
      </Stack>
    </div>
  );
}
