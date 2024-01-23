import React from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "../../../scss/home.scss";

export function Header() {
  return (
    <div className="home_header">
      <Swiper
        className="mySwiper"
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination]}
      >
        <SwiperSlide
          className="swiper_slide"
          style={{
            backgroundImage: "url(/images/headers/e1.jpg)",
            backgroundSize: "cover",
            // backgroundRepeat: "no-repeat",
          }}
        >
          <Box className="text_box1">
            <Box className="text_wrap">
              <h1 className="header_title">WE DELIVER GOOD MOOD</h1>
              <h5 className="header_subtitle">
                Here to bring your life style to the next level
              </h5>
              <h3 className="header_sale">DON'T MISS TODAY'S HOT SALES</h3>
              <Button className="header_btn">SHOP NOW</Button>
            </Box>
          </Box>
        </SwiperSlide>

        <SwiperSlide
          className="swiper_slide"
          style={{
            backgroundImage: "url(/images/headers/a5.jpg)",
            backgroundSize: "cover",
          }}
        >
          <Box className="text_box2">
            <Box className="text_wrap">
              <h1 className="header_title">WE DELIVER GOOD MOOD</h1>
              <h5 className="header_subtitle">
                Here to bring your life style to the next level
              </h5>
              <h3 className="header_sale">DON'T MISS TODAY'S HOT SALES</h3>
              <Button className="header_btn">SHOP NOW</Button>
            </Box>
          </Box>
        </SwiperSlide>

        <SwiperSlide
          className="swiper_slide"
          style={{
            backgroundImage: "url(/images/headers/w.jpg)",
            backgroundSize: "cover",
          }}
        >
          <Box className="text_box3">
            <Box className="text_wrap">
              <h1 className="header_title">WE DELIVER GOOD MOOD</h1>
              <h5 className="header_subtitle">
                Here to bring your life style to the next level
              </h5>
              <h3 className="header_sale">DON'T MISS TODAY'S HOT SALES</h3>
              <Button className="header_btn">SHOP NOW</Button>
            </Box>
          </Box>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
