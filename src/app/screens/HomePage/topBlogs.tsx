import React, { useEffect } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "../../../scss/home.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Autoplay } from "swiper/modules";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { retrieveTopBlogs } from "./selector";
import { Cafe } from "../../../types/user";
import { serverApi } from "../../../lib/config";
import { Blog } from "../../../types/blog";
import { setTopBlogs } from "./slice";
import BlogApiService from "../../apiServices/blogApiService";
import { useNavigate } from "react-router-dom";
// import { useHistory, useParams } from "react-router-dom";

// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setTopBlogs: (data: Blog[]) => dispatch(setTopBlogs(data)),
});
// REDUX SELECTOR
const topBlogsRetriever = createSelector(retrieveTopBlogs, (topBlogs) => ({
  topBlogs,
}));

export function TopBlogs() {
  /** INITIALIZATIONS */
  const navigate = useNavigate();
  const { setTopBlogs } = actionDispatch(useDispatch());
  const { topBlogs } = useSelector(topBlogsRetriever);
  console.log("topBlogs>>>", topBlogs);

  useEffect(() => {
    const blogService = new BlogApiService();

    blogService

      .getTopBlogs({
        blog_types: "all",
        page: 1,
        limit: 5,
        order: "blog_likes",
      })
      .then((data) => setTopBlogs(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container className="home_events">
      <Box className="event_title">
        <img src="/images/navbar/logo1.png" alt="" />
        <div className="main_title">Blog & News</div>
        <div className="sub_title">Let's explore our amazing articles</div>
      </Box>

      <Box className="event_boxes ">
        <Swiper
          spaceBetween={20}
          slidesPerView={3}
          loop={true}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="carts_wrap"
        >
          <SwiperSlide className="event">
            <img src="/images/products/e6.jpg" alt="" />
            <Box className="tags">
              <div className="first">
                <span>Coffee</span>
              </div>
              <div className="second">
                <span>Celebrity</span>
              </div>
            </Box>
            <Box className="title">
              <h4>5 Reasons to Drink Americano 5 Reasons to Drink Americano</h4>
            </Box>
            <Box className="context">
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil
                deserunt non, voluptatem vitae saepe molestias soluta dicta
              </p>
            </Box>
            <Box className="date">
              <span>2024-07-07</span>
            </Box>
          </SwiperSlide>

          <SwiperSlide className="event">
            <img src="/images/products/home1.jpg" alt="" />
            <Box className="tags">
              <div className="first">
                <span>Coffee</span>
              </div>
              <div className="second">
                <span>Celebrity</span>
              </div>
            </Box>
            <Box className="title">
              <h4>5 Reasons to Drink Americano 5 Reasons to Drink Americano</h4>
            </Box>
            <Box className="context">
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil
                deserunt non, voluptatem vitae saepe molestias soluta dicta
              </p>
            </Box>
            <Box className="date">
              <span>2024-07-07</span>
            </Box>
          </SwiperSlide>

          <SwiperSlide className="event">
            <img src="/images/products/s2.jpg" alt="" />
            <Box className="tags">
              <div className="first">
                <span>Coffee</span>
              </div>
              <div className="second">
                <span>Celebrity</span>
              </div>
            </Box>
            <Box className="title">
              <h4>5 Reasons to Drink Americano 5 Reasons to Drink Americano</h4>
            </Box>
            <Box className="context">
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil
                deserunt non, voluptatem vitae saepe molestias soluta dicta
              </p>
            </Box>
            <Box className="date">
              <span>2024-07-07</span>
            </Box>
          </SwiperSlide>

          <SwiperSlide className="event">
            <img src="/images/products/e6.jpg" alt="" />
            <Box className="tags">
              <div className="first">
                <span>Coffee</span>
              </div>
              <div className="second">
                <span>Celebrity</span>
              </div>
            </Box>
            <Box className="title">
              <h4>5 Reasons to Drink Americano 5 Reasons to Drink Americano</h4>
            </Box>
            <Box className="context">
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil
                deserunt non, voluptatem vitae saepe molestias soluta dicta
              </p>
            </Box>
            <Box className="date">
              <span>2024-07-07</span>
            </Box>
          </SwiperSlide>

          <SwiperSlide className="event">
            <img src="/images/products/home1.jpg" alt="" />
            <Box className="tags">
              <div className="first">
                <span>Coffee</span>
              </div>
              <div className="second">
                <span>Celebrity</span>
              </div>
            </Box>
            <Box className="title">
              <h4>5 Reasons to Drink Americano 5 Reasons to Drink Americano</h4>
            </Box>
            <Box className="context">
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil
                deserunt non, voluptatem vitae saepe molestias soluta dicta
              </p>
            </Box>
            <Box className="date">
              <span>2024-07-07</span>
            </Box>
          </SwiperSlide>
        </Swiper>
      </Box>

      {/* 3. See All Products */}
      <Stack className="event_btn">
        <Button onClick={() => navigate("/blog")} className="br_btn">
          View All Articles
        </Button>
      </Stack>
      <Box className="blank"></Box>
    </Container>
  );
}
