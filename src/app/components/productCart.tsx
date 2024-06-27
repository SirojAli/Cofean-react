import React, { useEffect, useRef, useState } from "react";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Checkbox, Container, Radio, Stack } from "@mui/material";
import "../../scss/cafe.scss";
import Favorite from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Rating from "@mui/material/Rating";
import { ProductCartCont } from "../context/ProductCart";
import "../../scss/products.scss";
import assert from "assert";
import MemberApiService from "../apiServices/memberApiService";
import { useNavigate, useParams } from "react-router-dom";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../lib/sweetAlert";
import { serverApi } from "../../lib/config";
import { Product } from "../../types/product";
import { verifiedMemberData } from "../apiServices/verify";
import { Definer } from "../../lib/definer";
import { setTrendProducts } from "../screens/HomePage/slice";
import { retrieveTrendProducts } from "../screens/HomePage/selector";

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

const ProductCart = ({ cartData }: any) => {
  /*INITIALIZATIONS*/
  const {
    _id,
    product_name,
    product_images,
    product_price,
    product_discount,
    product_likes,
    product_views,
    product_reviews,
    product_rating,
    me_liked,
  } = cartData;

  const [cartChange, setCartChange] = useState<number>(-1);
  const navigate = useNavigate();
  const refs: any = useRef([]);
  const setAddToCart = ProductCartCont();

  const { setTrendProducts } = actionDispatch(useDispatch());
  const { trendProducts } = useSelector(trendProductsRetriever);
  console.log("trendProducts>>>", trendProducts);

  const ratingValue = 4;

  // const [sliderValue, setSliderValue] = useState<number[]>([0, 50]);
  // const [price, setPrice] = useState<number[]>([0, 9900]);

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

  /*HANDLERS*/
  const addToCartHandler = () => {
    setAddToCart[1]([cartData, 1, new Date()]);
  };

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
      console.log("likeHandler, ERROR:::", err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <div className="product_box" onClick={() => navigate(`/products/${_id}`)}>
      <Box className="sale_product">
        {product_discount > 0 && (
          <div className="sale_badge">
            <p className="sale">-{product_discount}%</p>
          </div>
        )}
        <img src={`${serverApi}/${product_images[0]}`} alt="coffee photo" />
        <Favorite
          className="like_btn"
          onClick={(e) => {
            e.stopPropagation();
            likeHandler(e, _id);
          }}
          style={{
            fill: likedProducts.includes(_id) ? "red" : "white",
            padding: "5px",
            cursor: "pointer",
          }}
        />
        <Box className="product_info">
          <Box className="pro_name">
            <span>{product_name}</span>
            <div className="basket">
              <img src="icons/basket.svg" alt="" />
            </div>
          </Box>

          <Box className="pro_basket">
            <div className="price">
              {product_discount > 0 ? (
                <>
                  <span className="discounted">
                    ₩ {product_price - product_price * (product_discount / 100)}
                  </span>
                  <span className="original">₩ {product_price}</span>
                </>
              ) : (
                <span className="discounted">₩ {product_price}</span>
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
                    {likeCounts[_id] !== undefined
                      ? likeCounts[_id]
                      : product_likes}
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
                  <div className="view_cnt">{product_views}</div>
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
};

export default ProductCart;
