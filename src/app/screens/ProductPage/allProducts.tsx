import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Checkbox, Container, Radio, Stack } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "../../../scss/cafe.scss";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@mui/material/Pagination";
import Rating from "@mui/material/Rating";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import "../../../scss/products.scss";
import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TelegramIcon from "@mui/icons-material/Telegram";
import { useNavigate } from "react-router-dom";
import Slider, { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import CoffeeIcon from "@mui/icons-material/Coffee";
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
import { Collections } from "@mui/icons-material";
import CafeApiService from "../../apiServices/cafeApiService";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Dispatch } from "@reduxjs/toolkit";
import { setAllProducts } from "./slice";
import { retrieveAllProducts } from "./selector";
import { ProductSearchObj } from "../../../types/product";

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
  const { setAllProducts } = actionDispatch(useDispatch());
  const { allProducts } = useSelector(allProductsRetriever);
  const [searchValue, setSearchValue] = useState<string>("");
  const [category, setCategory] = useState<string>("all");
  const [sortedItem, setSortedItem] = useState<number>(0);
  const [chosenTag, setChosenTag] = useState<string>("");
  const [sliderValue, setSliderValue] = useState<number[]>([0, 9900]);
  const [price, setPrice] = useState<number[]>([0, 9900]);
  const [filterProducts, setFilterProducts] = useState<Product[]>([]);

  const ratingValue = 4;
  const [likeCounts, setLikeCounts] = useState<{ [key: string]: number }>({});
  const [likedProducts, setLikedProducts] = useState<string[]>([]);
  const [bestsellers, setBestSellers] = useState<Product[]>([]);
  const [searchProductsObj, setSearchProductsObj] = useState<ProductSearchObj>({
    order: "product_views",
    page: 1,
    limit: 20,
    search: "",
    product_collection: ["coffee", "smoothie", "tea", "food", "goods"],
    price: [0, 9900],
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

  // Fetch products when searchProductsObj changes
  useEffect(() => {
    const productService = new ProductApiService();
    productService
      .getTargetProducts(searchProductsObj)
      .then((data) => setAllProducts(data))
      .catch((err) => console.log(err));
  }, [searchProductsObj]);

  // Filter products based on price when price state changes
  useEffect(() => {
    const filteredProducts = allProducts.filter((product) => {
      const productPrice = product.product_price;
      return productPrice >= price[0] && productPrice <= price[1];
    });
    setFilterProducts(filteredProducts);
  }, [allProducts, price]);

  /** HANDLERS */
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const categoryHandler = (selectedCategory: string) => {
    const productCollection =
      selectedCategory === "all"
        ? ["coffee", "smoothie", "tea", "food", "goods"]
        : [selectedCategory.toLowerCase()];
    setSearchProductsObj({
      ...searchProductsObj,
      product_collection: productCollection,
      page: 1,
    });
    setCategory(selectedCategory);
  };
  const sortItemHandler = (index: number) => {
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
    setSortedItem(index === sortedItem ? -1 : index);
  };
  const chosenProductHandler = (id: string) => {
    navigate(`/products/${id}`);
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
    setFilterProducts(filteredProducts);
  };
  const priceHandler = (event: Event, newValue: number | number[]) => {
    const newPrices = Array.isArray(newValue) ? newValue : [0, newValue];
    setSliderValue(newPrices);
    setPrice(newPrices);
  };
  const paginationHandler = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setSearchProductsObj({
      ...searchProductsObj,
      page: value,
    });
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

  useEffect(() => {
    if (searchValue.trim() === "") {
      setFilterProducts(allProducts);
    } else {
      const filtered = allProducts.filter((product) =>
        product.product_name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilterProducts(filtered);
    }
  }, [allProducts, searchValue]);

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
                    backgroundColor: category === "all" ? "#ffa500" : "",
                  }}
                  onClick={() => categoryHandler("all")}
                >
                  All Products
                </div>
                <div
                  className="category_item"
                  style={{
                    backgroundColor: category === "Coffee" ? "#ffa500" : "",
                  }}
                  onClick={() => categoryHandler("Coffee")}
                >
                  Coffee
                </div>
                <div
                  className="category_item"
                  style={{
                    backgroundColor: category === "Smoothie" ? "#ffa500" : "",
                  }}
                  onClick={() => categoryHandler("Smoothie")}
                >
                  Smoothie
                </div>
                <div
                  className="category_item"
                  style={{
                    backgroundColor: category === "Tea" ? "#ffa500" : "",
                  }}
                  onClick={() => categoryHandler("Tea")}
                >
                  Tea
                </div>
                <div
                  className="category_item"
                  style={{
                    backgroundColor: category === "Food" ? "#ffa500" : "",
                  }}
                  onClick={() => categoryHandler("Food")}
                >
                  Food
                </div>
                <div
                  className="category_item"
                  style={{
                    backgroundColor: category === "Goods" ? "#ffa500" : "",
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
                  min={0}
                  max={9900}
                  step={100}
                  valueLabelFormat={(value) => `${value.toLocaleString()}`}
                  slots={{ thumb: AirbnbThumbComponent }}
                  getAriaLabel={(index) =>
                    index === 0 ? "Minimum price" : "Maximum price"
                  }
                />
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
                {allProducts.map((pro: Product) => {
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
