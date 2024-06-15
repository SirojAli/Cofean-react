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
import Slider, { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import CoffeeIcon from "@mui/icons-material/Coffee";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Dispatch } from "@reduxjs/toolkit";
import { setAllProducts } from "./slice";
import { retrieveAllProducts } from "./selector";
import { ProductSearchObj } from "../../../types/others";
import CafeApiService from "../../apiServices/cafeApiService";
import ProductApiService from "../../apiServices/productApiService";
import { Collections } from "@mui/icons-material";
import { serverApi } from "../../../lib/config";
import { Product } from "../../../types/product";
import ProductCart from "../../components/productCart";

//** REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({
  setAllProducts: (data: Product[]) => dispatch(setAllProducts(data)),
});

// REDUX SELECTOR
const allProductsRetriever = createSelector(
  retrieveAllProducts,
  (allProducts) => ({
    allProducts,
  })
);

const AirbnbSlider = styled(Slider)(({ theme }) => ({
  color: "#fc9823",
  height: 3,
  padding: "13px 0",
  "& .MuiSlider-thumb": {
    height: 27,
    width: 27,
    backgroundColor: "#fff",
    border: "1px solid currentColor",
    "&:hover": {
      boxShadow: "0 0 0 8px rgba(58, 133, 137, 0.16)",
    },
    "& .airbnb-bar": {
      height: 9,
      width: 1,
      backgroundColor: "currentColor",
      marginLeft: 1,
      marginRight: 1,
    },
  },
  "& .MuiSlider-track": {
    height: 3,
  },
  "& .MuiSlider-rail": {
    color: theme.palette.mode === "dark" ? "#bfbfbf" : "#d8d8d8",
    opacity: theme.palette.mode === "dark" ? undefined : 1,
    height: 3,
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#fc9823",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&::before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
}));

interface AirbnbThumbComponentProps extends React.HTMLAttributes<unknown> {}

function AirbnbThumbComponent(props: AirbnbThumbComponentProps) {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <CoffeeIcon />
    </SliderThumb>
  );
}

export function AllProducts(props: any) {
  /** INITIALIZATIONS */
  const navigate = useNavigate();
  const refs: any = useRef([]);
  // let { product_id } = useParams<{ cafe_id: string }>();

  const { setAllProducts } = actionDispatch(useDispatch());
  const { allProducts } = useSelector(allProductsRetriever);
  const [sliderValue, setSliderValue] = useState<number[]>([0, 50]);
  const [price, setPrice] = useState<number[]>([0, 12000]);

  const [likeCounts, setLikeCounts] = useState<{ [key: string]: number }>({});
  const [likedProducts, setLikedProducts] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [sortedItem, setSortedItem] = useState(0);
  const [bestsellers, setBestSellers] = useState<Product[]>([]);
  const [chosenTag, setChosenTag] = useState("");

  const [searchProductsObj, setSearchProductsObj] = useState<ProductSearchObj>({
    page: 1,
    limit: 12,
    order: "product_views",
    product_collection: ["all"],
    search: "",
    price: [0, 12000],
  });

  // Product Likes
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

  useEffect(() => {
    const productService = new ProductApiService();
    productService
      .getAllProducts(searchProductsObj)
      .then((data) => setAllProducts(data))
      .catch((err) => console.log(err));
  }, [searchProductsObj, price]);

  /** HANDLERS */
  const chosenProductHandler = (id: string) => {
    navigate(`/products/${id}`);
  };

  const productHandler = (category: string) => {
    searchProductsObj.page = 1;
    switch (category) {
      case "New":
        searchProductsObj.order = "createdAt";
        break;
      case "Popular":
        searchProductsObj.order = "product_likes";
        break;
      case "Best":
        searchProductsObj.order = "product_views";
        break;
      case "Sale":
        searchProductsObj.order = "product_discount";
        break;
      case "Featured":
        searchProductsObj.order = "product_rating";
        break;
      default:
        searchProductsObj.order = "product_likes";
    }
    setSearchProductsObj({ ...searchProductsObj });
  };

  const paginationHandler = (event: any, value: number) => {
    searchProductsObj.page = value;
    setSearchProductsObj({ ...searchProductsObj });
  };

  const productCollectionHandler = (collection: string[]) => {
    searchProductsObj.page = 1;
    searchProductsObj.product_collection = collection;
    setSearchProductsObj({ ...searchProductsObj });
  };

  const filterProductHandler = (order: string) => {
    searchProductsObj.page = 1;
    searchProductsObj.order = order;
    setSearchProductsObj({ ...searchProductsObj });
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

  const priceHandler = (event: Event, value: number | number[]) => {
    if (Array.isArray(value)) {
      setSliderValue(value); //
      setPrice(value.map((val) => Math.floor((val / 50) * 12000)));
    }
  };

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
          (a, b) => b.product_reviews - a.product_reviews
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
  const formatPrice = (price: number) => `₩ ${price.toLocaleString()}`;

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
              <Box
                className="price_line"
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <AirbnbSlider
                  className="price_change"
                  valueLabelDisplay="auto"
                  value={sliderValue}
                  onChange={priceHandler}
                  max={50}
                  min={0}
                  step={1}
                  valueLabelFormat={(value) => `${value}`}
                  slots={{ thumb: AirbnbThumbComponent }}
                  getAriaLabel={(index) =>
                    index === 0 ? "Minimum price" : "Maximum price"
                  }
                />
              </Box>
              <Box className="price_sum_filter">
                <Box className="price">
                  <div>
                    {formatPrice(price[0])} - {formatPrice(price[1])}
                  </div>
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
              <Box className="product_boxes">
                {allProducts.map((ele) => {
                  return (
                    <ProductCart
                      className="product_box"
                      key={ele._id}
                      cartData={ele}
                    />
                  );
                })}
              </Box>
            </Stack>

            <Stack className="pagination_box" spacing={2}>
              <Pagination
                count={3}
                page={searchProductsObj.page}
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
    </div>
  );
}
