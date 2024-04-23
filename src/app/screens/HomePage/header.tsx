import React from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "../../../scss/home.scss";
import { useNavigate } from "react-router-dom";

export function Header() {
  /*INITIALIZATIONS*/
  const navigate = useNavigate();
  return (
    <div className="home_header">
      <Swiper
        className="mySwiper"
        spaceBetween={30}
        centeredSlides={false}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        // navigation={true}
        modules={[Autoplay, Pagination]}
      >
        <SwiperSlide
          className="swiper_slide"
          style={{
            backgroundImage: "url(/images/headers/home1.jpg)",
            backgroundSize: "cover",
          }}
        >
          <Box className="text_box1">
            <Box className="text_wrap">
              <h1 className="header_title">WE DELIVER GOOD MOOD</h1>
              <h5 className="header_subtitle">
                Here to bring your life style to the next level
              </h5>
              <h3 className="header_sale">DON'T MISS TODAY'S HOT SALES</h3>
              <Button
                onClick={() => navigate("/products")}
                className="header_btn"
              >
                SHOP NOW
              </Button>
            </Box>
          </Box>
        </SwiperSlide>

        <SwiperSlide
          className="swiper_slide"
          style={{
            backgroundImage: "url(/images/headers/home2.jpg)",
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
              <Button
                onClick={() => navigate("/products")}
                className="header_btn"
              >
                SHOP NOW
              </Button>
            </Box>
          </Box>
        </SwiperSlide>

        <SwiperSlide
          className="swiper_slide"
          style={{
            backgroundImage: "url(/images/headers/home3.jpg)",
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
              <Button
                onClick={() => navigate("/products")}
                className="header_btn"
              >
                SHOP NOW
              </Button>
            </Box>
          </Box>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
