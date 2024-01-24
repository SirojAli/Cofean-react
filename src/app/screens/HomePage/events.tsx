import React from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import Rating from "@mui/material/Rating";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "../../../scss/home.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Autoplay } from "swiper/modules";

export function Events() {
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
                reprehenderit quam pariatur quos official.
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
                reprehenderit quam pariatur quos official.
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
                reprehenderit quam pariatur quos official.
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
                reprehenderit quam pariatur quos official.
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
                reprehenderit quam pariatur quos official.
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
        <Button className="br_btn">View All Articles</Button>
      </Stack>
      <Box className="blank"></Box>
    </Container>
  );
}
