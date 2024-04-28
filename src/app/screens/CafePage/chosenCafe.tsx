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
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
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
import { setChosenCafe, setRandomCafes, setCafeProducts } from "./slice";
import {
  retrieveChosenCafe,
  retrieveRandomCafes,
  retrieveCafeProducts,
} from "./selector";
import { ProductSearchObj } from "../../../types/others";
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
  setCafeProducts: (data: Product[]) => dispatch(setCafeProducts(data)),
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
const cafeProductsRetriever = createSelector(
  retrieveCafeProducts,
  (cafeProducts) => ({
    cafeProducts,
  })
);

export function ChosenCafe() {
  /** INITIALIZATIONS */
  const navigate = useNavigate();
  const refs: any = useRef([]);
  let { cafe_id } = useParams<{ cafe_id: string }>();

  const { setChosenCafe } = actionDispatch(useDispatch());
  const { chosenCafe } = useSelector(chosenCafeRetriever);
  console.log("chosenCafe>>>", chosenCafe);

  const { setRandomCafes } = actionDispatch(useDispatch());
  const { randomCafes } = useSelector(randomCafesRetriever);
  console.log("randomCafes>>>", randomCafes);

  const { setCafeProducts } = actionDispatch(useDispatch());
  const { cafeProducts } = useSelector(cafeProductsRetriever);
  console.log("cafeProducts>>>", cafeProducts);

  const [likeCounts, setLikeCounts] = useState<{ [key: string]: number }>({});
  const [likedProducts, setLikedProducts] = useState<string[]>([]);

  const [chosenCafeId, setChosenCafeId] = useState<string>(cafe_id || "");

  const [cafeProductsObj, setCafeProductsObj] = useState<ProductSearchObj>({
    page: 1,
    limit: 20,
    order: "product_likes",
    cafe_mb_id: cafe_id,
    product_collection: ["coffee", "smoothie", "tea", "food", "card"],
  });

  const [productRebuild, setProductRebuild] = useState<Date>(new Date());
  useEffect(() => {
    // TODO: Retrieve Restaurants and Products Data
    // from cafe
    const cafeService = new CafeApiService();
    cafeService
      .getCafes({ page: 1, limit: 10, order: "random" })
      .then((data) => setRandomCafes(data))
      .catch((err) => console.log(err));

    cafeService
      .getChosenCafe(chosenCafeId)
      .then((data) => setChosenCafe(data))
      .catch((err) => console.log(err));

    // from products
    const productService = new ProductApiService();
    productService
      .getCafeProducts(cafeProductsObj)
      .then((data) => setCafeProducts(data))
      .catch((err) => console.log(err));
  }, [setChosenCafeId, productRebuild, cafeProducts]);

  // For Like Logic
  useEffect(() => {
    cafeProducts.forEach((pro: Product) => {
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
  }, [cafeProducts]);

  /** HANDLERS */
  const chosenCafeHandler = (id: string) => {
    setChosenCafeId(id);
    cafeProductsObj.cafe_mb_id = id;
    setCafeProductsObj({ ...cafeProductsObj });
    navigate(`/cafes/${id}`);
    console.log("chosenCafe>>>", chosenCafe);
  };

  //  searchCollectionHandler = cafeProductsHandler
  // targetProductSearchObj = cafeProductsObj

  const productCollectionHandler = (collection: string[]) => {
    cafeProductsObj.page = 1;
    cafeProductsObj.product_collection = collection;
    setCafeProductsObj({ ...cafeProductsObj });
  };

  const filterProductHandler = (order: string) => {
    cafeProductsObj.page = 1;
    cafeProductsObj.order = order;
    setCafeProductsObj({ ...cafeProductsObj });
  };

  const chosenProductHandler = (id: string) => {
    navigate(`/products/${id}`);
  };

  const targetLikeHandler = async (e: any) => {
    try {
      assert.ok(verifiedMemberData, Definer.auth_err1);
      const memberService = new MemberApiService();
      const data = { like_ref_id: e.target.id, group_type: "product" };
      const like_result: any = await memberService.memberLikeTarget(data);
      assert.ok(like_result, Definer.general_err1);
      await sweetTopSmallSuccessAlert("success", 700, false);
      setProductRebuild(new Date());
    } catch (err: any) {
      console.log("targetLikeHandler, ERROR>>>", err);
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
                  name="SearchCafe"
                  placeholder="Search Cafe"
                />
                <Button className="search_btn">
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
              // pagination={{ clickable: true }}
              // scrollbar={{ draggable: true }}
            >
              {randomCafes.map((ele: Cafe) => {
                const image_path = `${serverApi}/${ele.mb_image}`;

                return (
                  <SwiperSlide
                    onClick={() => chosenCafeHandler(ele._id)}
                    style={{ cursor: "pointer" }}
                    key={ele._id}
                    className={"cafe_avatar"}
                  >
                    <img src={image_path} />
                    <span>{ele.mb_nick}</span>
                  </SwiperSlide>
                );
              })}

              {/* <SwiperSlide className="cafe_avatar">
                <img src="/images/brands/angelinUs.png" />
                <p>Angel in Us</p>
              </SwiperSlide> */}
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
                onClick={() =>
                  productCollectionHandler(["coffee", "smoothie", "tea"])
                }
              >
                Drink
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
                onClick={() => productCollectionHandler(["card"])}
              >
                Goods
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
                  Price
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
              {cafeProducts.map((pro: Product) => {
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
                          <div className="basket">
                            <img src="icons/basket.svg" alt="" />
                          </div>
                        </Box>

                        <Box className="pro_basket">
                          <div className="price">
                            <span className="discounted">
                              ₩{" "}
                              {pro.product_price -
                                pro.product_price *
                                  (pro.product_discount / 100)}
                            </span>
                            <span className="original">
                              ₩ {pro.product_price}
                            </span>
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
                                <div className="view_cnt">
                                  {pro.product_views}
                                </div>
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
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
