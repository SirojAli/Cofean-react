import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Checkbox, Container, Radio, Stack } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "../../../scss/cafe.scss";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { CssVarsProvider } from "@mui/joy/styles";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import IconButton from "@mui/joy/IconButton";
import Favorite from "@mui/icons-material/Favorite";
import Typography from "@mui/joy/Typography";
import Link from "@mui/joy/Link";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import CallIcon from "@mui/icons-material/Call";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Rating from "@mui/material/Rating";
import Phone from "@mui/icons-material/Phone";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

import "../../../scss/products.scss";
import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TelegramIcon from "@mui/icons-material/Telegram";
import assert from "assert";
import { verifiedMemberData } from "../../apiServices/verify";
import { Definer } from "../../../lib/definer";
import MemberApiService from "../../apiServices/memberApiService";
import { useNavigate, useParams } from "react-router-dom";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Dispatch } from "@reduxjs/toolkit";
import {
  setAllProducts,
  setRandomProducts,
  setBestSellerProducts,
} from "./slice";
import {
  retrieveAllProducts,
  retrieveRandomProducts,
  retrieveBestSellerProducts,
} from "./selector";
import { ProductSearchObj } from "../../../types/others";
import CafeApiService from "../../apiServices/cafeApiService";
import ProductApiService from "../../apiServices/productApiService";
import { Collections } from "@mui/icons-material";
import { serverApi } from "../../../lib/config";
import { Product } from "../../../types/product";

//** REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({
  setAllProducts: (data: Product[]) => dispatch(setAllProducts(data)),
  setRandomProducts: (data: Product[]) => dispatch(setRandomProducts(data)),
  setBestSellerProducts: (data: Product[]) =>
    dispatch(setBestSellerProducts(data)),
});

// REDUX SELECTOR
const allProductsRetriever = createSelector(
  retrieveAllProducts,
  (allProducts) => ({
    allProducts,
  })
);
const randomProductsRetriever = createSelector(
  retrieveRandomProducts,
  (randomProducts) => ({
    randomProducts,
  })
);
const bestSellerProductsRetriever = createSelector(
  retrieveBestSellerProducts,
  (bestSellerProducts) => ({
    bestSellerProducts,
  })
);

export function AllProducts(props: any) {
  /** INITIALIZATIONS */
  const navigate = useNavigate();
  const refs: any = useRef([]);
  // let { product_id } = useParams<{ cafe_id: string }>();

  const { setAllProducts, setRandomProducts, setBestSellerProducts } =
    actionDispatch(useDispatch());
  const { allProducts } = useSelector(allProductsRetriever);
  const { randomProducts } = useSelector(randomProductsRetriever);
  const { bestSellerProducts } = useSelector(bestSellerProductsRetriever);

  const [likeCounts, setLikeCounts] = useState<{ [key: string]: number }>({});
  const [likedProducts, setLikedProducts] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [selectPrice, setSelectPrice] = useState(null);
  const [sortedItem, setSortedItem] = useState(0);
  const [bestsellers, setBestSellers] = useState<Product[]>([]);
  const [chosenTag, setChosenTag] = useState("");
  const [followSocial, setFollowSocial] = useState(null);

  // For All & Random Products
  useEffect(() => {
    const productService = new ProductApiService();

    productService
      .getAllProducts({
        page: 1,
        limit: 12,
        order: "product_likes",
        product_collection: ["coffee", "smoothie", "tea", "food", "card"],
      })
      .then((data) => {
        setAllProducts(data);
      })
      .catch((err) => console.log(err));

    productService
      .getAllProducts({
        page: 1,
        limit: 4,
        order: "random",
        product_collection: ["coffee", "smoothie", "tea"],
      })
      .then((data) => {
        setRandomProducts(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [allProductsObj, setAllProductsObj] = useState<ProductSearchObj>({
    page: 1,
    limit: 12,
    order: "mb_point",
    product_collection: ["coffee", "smoothie", "tea", "food", "card"],
  });

  // For best seller Products
  useEffect(() => {
    // Fetch top 3 best-selling products from the backend
    fetchBestSellers();
  }, []);

  // Fetch initial like counts
  useEffect(() => {
    allProducts.forEach((pro: Product) => {
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
  }, [allProducts]);

  // Filter Products based on searchValue
  useEffect(() => {
    if (searchValue.trim() === "") {
      setFilteredProducts(allProducts);
    } else {
      const filtered = allProducts.filter((product) =>
        product.product_name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [allProducts, searchValue]);

  const fetchBestSellers = async () => {
    try {
      const productService = new ProductApiService();
      const data = await productService.getAllProducts({
        page: 1,
        limit: 3,
        order: "product_views",
        product_collection: ["coffee", "smoothie", "tea", "food", "goods"],
      });
      setBestSellers(data);
    } catch (error) {
      console.error("Error fetching best sellers:", error);
    }
  };

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

  const productHandler = (category: string) => {
    allProductsObj.page = 1;
    switch (category) {
      case "New":
        allProductsObj.order = "createdAt";
        break;
      case "Popular":
        allProductsObj.order = "product_likes";
        break;
      case "Best":
        allProductsObj.order = "product_views";
        break;
      case "Sale":
        allProductsObj.order = "product_discount";
        break;
      case "Featured":
        allProductsObj.order = "product_rating";
        break;
      default:
        allProductsObj.order = "product_likes"; // default to Popular
    }
    setAllProductsObj({ ...allProductsObj });
  };

  const paginationHandler = async (_: any, value: any) => {
    try {
      setAllProductsObj((prev) => ({ ...prev, page: value }));

      const productService = new ProductApiService();
      const data = await productService.getAllProducts({
        ...allProductsObj,
        page: value,
      });
      setAllProducts(data);
    } catch (error) {
      console.error("Pagination Error>>>", error);
    }
  };

  const productCollectionHandler = (collection: string[]) => {
    allProductsObj.page = 1;
    allProductsObj.product_collection = collection;
    setAllProductsObj({ ...allProductsObj });
  };

  const filterProductHandler = (order: string) => {
    allProductsObj.page = 1;
    allProductsObj.order = order;
    setAllProductsObj({ ...allProductsObj });
  };

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const categoryHandler = (category: string) => {
    setSelectedCategory(category);
    let filteredProducts: Product[] = [];

    if (category === "All Products") {
      filteredProducts = allProducts;
    } else {
      filteredProducts = allProducts.filter((product) =>
        product.product_collection.includes(category.toLowerCase())
      );
    }

    setFilteredProducts(filteredProducts);
  };

  // const priceHandler = (index: any) => {
  //   setSelectPrice(index === sortedItem ? null : index);
  // };

  const sortItemHandler = (index: any) => {
    let sortedProducts: Product[] = [];
    switch (index) {
      case 0:
        sortedProducts = [...allProducts].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 1:
        sortedProducts = [...allProducts].sort(
          (a, b) => b.product_likes - a.product_likes
        );
        break;
      case 2:
        sortedProducts = [...allProducts].sort(
          (a, b) => b.product_views - a.product_views
        );
        break;
      case 3:
        sortedProducts = [...allProducts].sort(
          (a, b) => b.product_discount - a.product_discount
        );
        break;
      case 4:
        sortedProducts = [...allProducts].sort(
          (a, b) => b.product_review - a.product_review
        );
        break;
      default:
        break;
    }
    setAllProducts(sortedProducts);
    setSortedItem(index === sortedItem ? null : index);
  };

  const chosenTagHandler = (tag: string) => {
    setChosenTag(tag);
    let filteredProducts: Product[] = [];

    if (tag === "") {
      filteredProducts = allProducts;
    } else {
      filteredProducts = allProducts.filter((product) =>
        product.product_name.toLowerCase().includes(tag.toLowerCase())
      );
    }

    setFilteredProducts(filteredProducts);
  };

  // const followHandler = (index: any) => {
  //   setFollowSocial (index === sortedItem ? null : index);
  // };

  return (
    <div className="all_products">
      <Container className="all_products_box">
        <Stack className="top_section">
          <Stack className="filter_box">
            <Box className="search_box">
              <form
                className="search_forms"
                action=""
                method=""
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="search"
                  className="search_input"
                  name="SearchProduct"
                  placeholder="Search Product"
                  value={searchValue}
                  onChange={searchHandler}
                />
                <Button className="search_btn">
                  <SearchIcon />
                </Button>
              </form>
            </Box>

            <Box className="category_box">
              <Box className="ctg_title">
                <div>Categories</div>
              </Box>
              <Box className="ctg_types">
                <div
                  className="category_item"
                  style={{
                    backgroundColor:
                      selectedCategory === "All Products" ? "#ffa500" : "",
                  }}
                  onClick={() => categoryHandler("All Products")}
                >
                  All Products
                </div>
                <div
                  className="category_item"
                  style={{
                    backgroundColor:
                      selectedCategory === "Coffee" ? "#ffa500" : "",
                  }}
                  onClick={() => categoryHandler("Coffee")}
                >
                  Coffee
                </div>
                <div
                  className="category_item"
                  style={{
                    backgroundColor:
                      selectedCategory === "Smoothie" ? "#ffa500" : "",
                  }}
                  onClick={() => categoryHandler("Smoothie")}
                >
                  Smoothie
                </div>
                <div
                  className="category_item"
                  style={{
                    backgroundColor:
                      selectedCategory === "Tea" ? "#ffa500" : "",
                  }}
                  onClick={() => categoryHandler("Tea")}
                >
                  Tea
                </div>
                <div
                  className="category_item"
                  style={{
                    backgroundColor:
                      selectedCategory === "Food" ? "#ffa500" : "",
                  }}
                  onClick={() => categoryHandler("Food")}
                >
                  Food
                </div>
                <div
                  className="category_item"
                  style={{
                    backgroundColor:
                      selectedCategory === "Goods" ? "#ffa500" : "",
                  }}
                  onClick={() => categoryHandler("Goods")}
                >
                  Goods
                </div>
              </Box>
            </Box>

            <Box className="price_box">
              <Box className="price_title">
                <div className="title">Price Filter</div>
              </Box>
              <Box className="price_line">
                <img src="/icons/point.svg" />
                <div className="line1"></div>
                <img src="/icons/point.svg" />
                <div className="line2"></div>
              </Box>
              <Box className="price_sum_filter">
                <Box className="price">
                  <div>Price: $0 - $20</div>
                </Box>
                <Box className="filter">
                  <div>Filter</div>
                </Box>
              </Box>
            </Box>

            <Box className="sorting_box">
              <div className="sorting_title">Sorting products</div>
              <Box className="sort_item" onClick={() => sortItemHandler(0)}>
                <Radio
                  className="checkbox"
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={
                    <RadioButtonCheckedIcon
                      style={{
                        color:
                          sortedItem === 0 ? "#ffa500" : "rgba(0, 0, 0, 0)",
                      }}
                    />
                  }
                  checked={sortedItem === 0}
                />
                <div className="item_name">New (12)</div>
              </Box>
              <Box className="sort_item" onClick={() => sortItemHandler(1)}>
                <Radio
                  className="checkbox"
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={
                    <RadioButtonCheckedIcon
                      style={{
                        color:
                          sortedItem === 1 ? "#ffa500" : "rgba(0, 0, 0, 0)",
                      }}
                    />
                  }
                  checked={sortedItem === 1}
                />
                <div className="item_name">Like (22)</div>
              </Box>
              <Box className="sort_item" onClick={() => sortItemHandler(2)}>
                <Radio
                  className="checkbox"
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={
                    <RadioButtonCheckedIcon
                      style={{
                        color:
                          sortedItem === 2 ? "#ffa500" : "rgba(0, 0, 0, 0)",
                      }}
                    />
                  }
                  checked={sortedItem === 2}
                />
                <div className="item_name">View (7)</div>
              </Box>
              <Box className="sort_item" onClick={() => sortItemHandler(3)}>
                <Radio
                  className="checkbox"
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={
                    <RadioButtonCheckedIcon
                      style={{
                        color:
                          sortedItem === 3 ? "#ffa500" : "rgba(0, 0, 0, 0)",
                      }}
                    />
                  }
                  checked={sortedItem === 3}
                />
                <div className="item_name">Sale (5)</div>
              </Box>
              <Box className="sort_item" onClick={() => sortItemHandler(4)}>
                <Radio
                  className="checkbox"
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={
                    <RadioButtonCheckedIcon
                      style={{
                        color:
                          sortedItem === 4 ? "#ffa500" : "rgba(0, 0, 0, 0)",
                      }}
                    />
                  }
                  checked={sortedItem === 4}
                />
                <div className="item_name">Review (10)</div>
              </Box>
            </Box>

            <Box className="bestseller_box">
              <div className="best_title">Best Sellers</div>
              <div className="best_boxes">
                {bestsellers.map((pro: Product) => {
                  const image_path = `${serverApi}/${pro.product_images[0]}`;
                  return (
                    <div
                      className="best_box"
                      onClick={() => chosenProductHandler(pro._id)}
                    >
                      <Box className="best_img">
                        <img src={image_path} alt="coffee photo" />
                      </Box>
                      <Box className="best_info">
                        <Rating
                          className="rating"
                          name="rating"
                          defaultValue={5}
                          precision={0.5}
                          readOnly
                        />
                        <div className="title">{pro.product_name}</div>
                        <div className="price">₩ {pro.product_price}</div>
                      </Box>
                    </div>
                  );
                })}
              </div>
            </Box>

            <Box className="tag_box">
              <div className="tag_title">Tags</div>
              <div className="tag_texts">
                <p
                  style={{
                    backgroundColor: chosenTag === "Espresso" ? "#ffca03" : "",
                  }}
                  onClick={() => chosenTagHandler("Espresso")}
                >
                  Espresso
                </p>
                <p
                  style={{
                    backgroundColor: chosenTag === "Latte" ? "#ffca03" : "",
                  }}
                  onClick={() => chosenTagHandler("Latte")}
                >
                  Latte
                </p>
                <p
                  style={{
                    backgroundColor:
                      chosenTag === "Cappuccino" ? "#ffca03" : "",
                  }}
                  onClick={() => chosenTagHandler("Cappuccino")}
                >
                  Cappuccino
                </p>
                <p
                  style={{
                    backgroundColor: chosenTag === "Americano" ? "#ffca03" : "",
                  }}
                  onClick={() => chosenTagHandler("Americano")}
                >
                  Americano
                </p>
                <p
                  style={{
                    backgroundColor: chosenTag === "Mocha" ? "#ffca03" : "",
                  }}
                  onClick={() => chosenTagHandler("Mocha")}
                >
                  Mocha
                </p>
                <p
                  style={{
                    backgroundColor:
                      chosenTag === "Choco Latte" ? "#ffca03" : "",
                  }}
                  onClick={() => chosenTagHandler("Choco Latte")}
                >
                  Choco Latte
                </p>
                <p
                  style={{
                    backgroundColor: chosenTag === "Smoothie" ? "#ffca03" : "",
                  }}
                  onClick={() => chosenTagHandler("Smoothie")}
                >
                  Smoothie
                </p>
                <p
                  style={{
                    backgroundColor:
                      chosenTag === "Frappuccino" ? "#ffca03" : "",
                  }}
                  onClick={() => chosenTagHandler("Frappuccino")}
                >
                  Frappuccino
                </p>
              </div>
            </Box>

            <Box className="follow_box">
              <div className="follow_title">Follow Us</div>
              <div className="social_icons">
                <a href="https://facebook.com/sirojiddinsamadov">
                  <Facebook className="icon" />
                </a>

                <a href="https://www.linkedin.com/in/sirojiddin-samadov-124985278">
                  <LinkedInIcon className="icon" />
                </a>

                <a href="https://www.instagram.com/sirojiddin_samadov_asn">
                  <Instagram className="icon" />
                </a>

                <a href="https://github.com/SirojAli">
                  <GitHubIcon className="icon" />
                </a>

                <a href="https://t.me/siroj_samadov">
                  <TelegramIcon className="icon" />
                </a>
              </div>
            </Box>
          </Stack>

          <div className="left_box">
            <Stack className="main_box">
              <div className="sale_box">
                <div className="sale_texts">
                  <div className="sale_text_box">
                    <div className="sale_title">
                      <h2>Get Up to 15% Off Coffee Latte</h2>
                    </div>
                    <div className="sale_subtitle">
                      <h5>
                        Treat yourself to the delightful experience of our
                        coffee lattes
                      </h5>
                    </div>
                    <Button
                      className="sale_btn"
                      onClick={() => chosenTagHandler("Latte")}
                    >
                      <p>SHOP NOW</p>
                    </Button>
                  </div>
                </div>
                <div className="sale_img">
                  <img src="/images/products/a3.png" />
                </div>
              </div>
              <div className="product_boxes">
                {filteredProducts.map((pro: Product) => {
                  const image_path = `${serverApi}/${pro.product_images[0]}`;
                  return (
                    <div
                      className="product_box"
                      onClick={() => chosenProductHandler(pro._id)}
                    >
                      <Box className="sale_product">
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
                  );
                })}
              </div>
            </Stack>

            <Stack className="pagination_box" spacing={2}>
              <Pagination
                count={3}
                page={allProductsObj.page}
                variant="outlined"
                shape="rounded"
                onChange={paginationHandler}
                boundaryCount={1}
                siblingCount={0}
              />
            </Stack>
          </div>
        </Stack>
      </Container>

      <div className="bottom_section">
        <Stack className="container_box">
          <div className="title_box">
            <h2>You might also like</h2>
          </div>
          <div className="product_boxes">
            {randomProducts.map((pro: Product) => {
              const image_path = `${serverApi}/${pro.product_images[0]}`;
              return (
                <div
                  className="product_box"
                  onClick={() => chosenProductHandler(pro._id)}
                >
                  <Box className="sale_product">
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
              );
            })}
          </div>
        </Stack>
      </div>
    </div>
  );
}
