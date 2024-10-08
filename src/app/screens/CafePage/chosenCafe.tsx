import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Container, Rating, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useParams } from "react-router-dom";
import assert from "assert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";

import "../../../scss/cafe.scss";
import { Header } from "./header";
import { Product } from "../../../types/product";
import { Cafe } from "../../../types/user";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Dispatch } from "@reduxjs/toolkit";
import { setChosenCafe, setRandomCafes, setTargetProducts } from "./slice";
import {
  retrieveChosenCafe,
  retrieveRandomCafes,
  retrieveTargetProducts,
} from "./selector";
import { ProductSearchObj } from "../../../types/product";
import CafeApiService from "../../apiServices/cafeApiService";
import ProductApiService from "../../apiServices/productApiService";
import { Collections, Favorite } from "@mui/icons-material";
import { verifiedMemberData } from "../../apiServices/verify";
import { Definer } from "../../../lib/definer";
import MemberApiService from "../../apiServices/memberApiService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import { serverApi } from "../../../lib/config";

//** REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({
  setChosenCafe: (data: Cafe) => dispatch(setChosenCafe(data)),
  setRandomCafes: (data: Cafe[]) => dispatch(setRandomCafes(data)),
  setTargetProducts: (data: Product[]) => dispatch(setTargetProducts(data)),
});

// REDUX SELECTOR
const chosenCafeRetriever = createSelector(
  retrieveChosenCafe,
  (chosenCafe) => ({
    chosenCafe,
  })
);
const randomCafesRetriever = createSelector(
  retrieveRandomCafes,
  (randomCafes) => ({
    randomCafes,
  })
);
const targetProductsRetriever = createSelector(
  retrieveTargetProducts,
  (targetProducts) => ({
    targetProducts,
  })
);

export function ChosenCafe(props: any) {
  /** INITIALIZATIONS */
  const navigate = useNavigate();
  const refs: any = useRef([]);
  const dispatch = useDispatch();
  let { cafe_id } = useParams<{ cafe_id: string }>();

  const { setChosenCafe, setRandomCafes, setTargetProducts } = actionDispatch(
    useDispatch()
  );
  const { chosenCafe } = useSelector(chosenCafeRetriever);
  const { randomCafes } = useSelector(randomCafesRetriever);
  const { targetProducts } = useSelector(targetProductsRetriever);

  const [chosenCafeId, setChosenCafeId] = useState<string>(cafe_id || "");
  const [targetProductSearchObj, setTargetProductSearchObj] =
    useState<ProductSearchObj>({
      order: "product_views",
      page: 1,
      limit: 32,
      search: "",
      product_collection: ["coffee", "smoothie", "tea", "food"],
      price: [0, 9900],
      cafe_mb_id: cafe_id || "",
    });
  const [productRebuild, setProductRebuild] = useState<Date>(new Date());

  useEffect(() => {
    // data from cafe
    const cafeService = new CafeApiService();
    cafeService
      .getChosenCafe(chosenCafeId)
      .then((data) => setChosenCafe(data))
      .catch((err) => console.log(err));
    cafeService
      .getCafes({ page: 1, limit: 10, order: "random" })
      .then((data) => setRandomCafes(data))
      .catch((err) => console.log(err));
    // data from products
    const productService = new ProductApiService();
    console.log("Requesting cafe products with>>> ", targetProductSearchObj);
    productService
      .getTargetProducts(targetProductSearchObj)
      .then((data) => {
        console.log("API Response:", data);
        if (Array.isArray(data)) {
          dispatch(setTargetProducts(data));
        } else {
          console.error("API response is not an array:", data);
        }
      })
      .catch((err) => console.error("API Error:", err));
  }, [chosenCafeId, productRebuild, targetProductSearchObj]);

  useEffect(() => {
    console.log("Redux state targetProducts:", targetProducts);
  }, [targetProducts]);

  const ratingValue = 4;
  const [likeCounts, setLikeCounts] = useState<{ [key: string]: number }>({});
  const [likedProducts, setLikedProducts] = useState<string[]>([]);

  // Product Likes
  useEffect(() => {
    targetProducts.forEach((pro: Product) => {
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
  }, [targetProducts]);

  /** HANDLERS */
  const chosenCafeHandler = (id: string) => {
    setChosenCafeId(id);
    setTargetProductSearchObj((prevState) => ({
      ...prevState,
      cafe_mb_id: id,
    }));
    navigate(`/cafes/${id}`);
  };
  // searchCollectionHandler
  const productCollectionHandler = (collection: string[]) => {
    targetProductSearchObj.page = 1;
    targetProductSearchObj.product_collection = collection;
    setTargetProductSearchObj({ ...targetProductSearchObj });
  };
  // searchOrderHandler
  const filterProductHandler = (order: string) => {
    targetProductSearchObj.page = 1;
    targetProductSearchObj.order = order;
    setTargetProductSearchObj({ ...targetProductSearchObj });
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
      console.log("likeHandler, ERROR >>>", err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <div>
      <Header />
      <Container className="chosen_cafe">
        <Stack className="chosen_cafe_box">
          <Stack className="name_search_box">
            <Box className="cafe_name">
              <p>{chosenCafe?.mb_nick}</p>
            </Box>
            <Box className="search_box">
              <form className="search_forms" action="" method="">
                <input
                  type="search"
                  className="search_input"
                  name="SearchProduct"
                  placeholder="Search Product"
                  // value={searchValue}
                  // onChange={handleSearch}
                />
                <Button className="search_btn" type="submit">
                  <SearchIcon />
                </Button>
              </form>
            </Box>
          </Stack>

          <Stack className="other_cafe_swiper">
            <Box className="prev_btn cafe-prev">
              <ArrowBackIosNewIcon />
            </Box>

            <Swiper
              className="other_cafe"
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              slidesPerView={7}
              centeredSlides={false}
              spaceBetween={30}
              navigation={{
                nextEl: ".cafe-next",
                prevEl: ".cafe-prev",
              }}
            >
              {randomCafes.map((cafe: Cafe) => {
                const image_path = `${serverApi}/${cafe.mb_image}`;

                return (
                  <SwiperSlide
                    onClick={() => chosenCafeHandler(cafe._id)}
                    style={{ cursor: "pointer" }}
                    key={cafe._id}
                    className={"cafe_avatar"}
                  >
                    <img src={image_path} alt={cafe.mb_nick} />
                    <span>{cafe.mb_nick}</span>
                  </SwiperSlide>
                );
              })}
            </Swiper>

            <Box className="next_btn cafe-next">
              <ArrowForwardIosIcon />
            </Box>
          </Stack>

          <Stack className="filter_box1">
            <div className="filter_1">
              <Button
                className="filter_btn"
                variant="contained"
                onClick={() => productCollectionHandler(["coffee"])}
              >
                Coffee
              </Button>
              <Button
                className="filter_btn"
                variant="contained"
                onClick={() => productCollectionHandler(["food"])}
              >
                Food
              </Button>
              <Button
                className="filter_btn"
                variant="contained"
                onClick={() => productCollectionHandler(["smoothie", "tea"])}
              >
                Beverage
              </Button>
            </div>
          </Stack>

          <Stack className="product_types">
            <Stack className="filter_box2">
              <div className="filter_2">
                <Button
                  className="filter_btn"
                  variant="contained"
                  onClick={() => filterProductHandler("createdAt")}
                >
                  New
                </Button>
                <Button
                  className="filter_btn"
                  variant="contained"
                  onClick={() => filterProductHandler("product_discount")}
                >
                  Sale
                </Button>
                <Button
                  className="filter_btn"
                  variant="contained"
                  onClick={() => filterProductHandler("product_likes")}
                >
                  Best
                </Button>
                <Button
                  className="filter_btn"
                  variant="contained"
                  onClick={() => filterProductHandler("product_views")}
                >
                  Popular
                </Button>
              </div>
            </Stack>

            <Stack className="cafe_all_products">
              {targetProducts.length > 0 ? (
                targetProducts.map((pro) => (
                  <div
                    className="product_box"
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
                          fill: likedProducts.includes(pro._id)
                            ? "red"
                            : "white",
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
                            <img src="/icons/basket.svg" alt="" />
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
                                <div className="view_cnt">
                                  {pro.product_views}
                                </div>
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
                ))
              ) : (
                <p>No products available</p>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
