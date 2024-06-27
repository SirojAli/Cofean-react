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
import ProductCart from "../../components/productCart";
import { CategoryCont } from "../../context/Category";

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
      limit: 20,
      search: "",
      product_collection: ["coffee", "smoothie", "tea", "food", "goods"],
      price: [0, 12000],
      cafe_mb_id: cafe_id || "",
    });
  const [productRebuild, setProductRebuild] = useState<Date>(new Date());

  useEffect(() => {
    // TODO: Retrieve Cafe and Products Data
    // from cafe
    const cafeService = new CafeApiService();
    cafeService
      .getChosenCafe(chosenCafeId)
      .then((data) => setChosenCafe(data))
      .catch((err) => console.log(err));

    cafeService
      .getCafes({ page: 1, limit: 10, order: "random" })
      .then((data) => setRandomCafes(data))
      .catch((err) => console.log(err));

    // from products
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

  /** HANDLERS */
  // const chosenCafeHandler = (id: string) => {
  //   setChosenCafeId(id);
  //   targetProductSearchObj.cafe_mb_id = id;
  //   setTargetProductSearchObj({ ...targetProductSearchObj });
  //   navigate(`/cafes/${id}`);
  // };
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
      console.log("targetLikeHandler, ERROR >>>", err);
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
              {randomCafes.map((ele: Cafe) => {
                const image_path = `${serverApi}/${ele.mb_image}`;

                return (
                  <SwiperSlide
                    onClick={() => chosenCafeHandler(ele._id)}
                    style={{ cursor: "pointer" }}
                    key={ele._id}
                    className={"cafe_avatar"}
                  >
                    <img src={image_path} alt={ele.mb_nick} />
                    <span>{ele.mb_nick}</span>
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
                onClick={() => productCollectionHandler(["goods"])}
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
              {targetProducts.length > 0 ? (
                targetProducts.map((ele) => (
                  <ProductCart cartData={ele} key={ele._id} />
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
