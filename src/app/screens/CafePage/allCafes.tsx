import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "../../../scss/home.scss";

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

const cafeData = [
  {
    imageSrc: "/images/brands/s2.jpg",
    name: "Ediya Coffee",
    address: "Busan, South Korea",
    phoneNumber: "+82 10-8240-5559",
    rating: 5,
    likeCount: 7,
    viewCount: 7,
  },
  // Add data for 7 more cafes
  {
    imageSrc: "/images/brands/s2.jpg",
    name: "Ediya Coffee",
    address: "Busan, South Korea",
    phoneNumber: "+82 10-8240-5559",
    rating: 5,
    likeCount: 7,
    viewCount: 7,
  },
  {
    imageSrc: "/images/brands/s2.jpg",
    name: "Ediya Coffee",
    address: "Busan, South Korea",
    phoneNumber: "+82 10-8240-5559",
    rating: 5,
    likeCount: 7,
    viewCount: 7,
  },
  {
    imageSrc: "/images/brands/s2.jpg",
    name: "Ediya Coffee",
    address: "Busan, South Korea",
    phoneNumber: "+82 10-8240-5559",
    rating: 5,
    likeCount: 7,
    viewCount: 7,
  },
  {
    imageSrc: "/images/brands/s2.jpg",
    name: "Ediya Coffee",
    address: "Busan, South Korea",
    phoneNumber: "+82 10-8240-5559",
    rating: 5,
    likeCount: 7,
    viewCount: 7,
  },
  {
    imageSrc: "/images/brands/s2.jpg",
    name: "Ediya Coffee",
    address: "Busan, South Korea",
    phoneNumber: "+82 10-8240-5559",
    rating: 5,
    likeCount: 7,
    viewCount: 7,
  },
  {
    imageSrc: "/images/brands/s2.jpg",
    name: "Ediya Coffee",
    address: "Busan, South Korea",
    phoneNumber: "+82 10-8240-5559",
    rating: 5,
    likeCount: 7,
    viewCount: 7,
  },
  {
    imageSrc: "/images/brands/s2.jpg",
    name: "Ediya Coffee",
    address: "Busan, South Korea",
    phoneNumber: "+82 10-8240-5559",
    rating: 5,
    likeCount: 7,
    viewCount: 7,
  },
];

export function AllCafes() {
  /** INITIALIZATIONS */

  return (
    <div className="all_cafes">
      <Container className="cafe_box">
        {/* High part: Text and Search box */}
        <Box className="filter_search_box">
          <Box className="filter_box">
            <div className="f_box">
              <p>Top</p>
            </div>
            <div className="f_box">
              <p>Popular</p>
            </div>
            <div className="f_box">
              <p>New</p>
            </div>
            <div className="f_box">
              <p>Best</p>
            </div>
          </Box>
          <Box className="search_box">
            <form className="search_forms" action="" method="">
              <Button className="search_btn">
                <img src="/icons/search.svg" alt="" />
              </Button>
              <input
                type="search"
                className="search_input"
                name="SearchCafe"
                placeholder="Search Cafe"
              />
            </form>
          </Box>
        </Box>

        {/* Middle part: Cards and Restaurant Pictures */}
        <div className="all_cafe_box">
          <div className="cafe_boxes">
            {cafeData.map((cafe, index) => (
              <Box key={index} className="cafe_box">
                <Box className="cafe_img">
                  <img src={cafe.imageSrc} alt={`cafe_img_${index}`} />
                </Box>
                <Box className="cafe_info">
                  <div className="main_info">
                    <Box className="cafe_name">
                      <div>{cafe.name}</div>
                    </Box>
                    <div className="cafe_address">
                      <LocationOnIcon />
                      <div>{cafe.address}</div>
                    </div>
                    <Box className="cafe_number">
                      <Phone />
                      <div>{cafe.phoneNumber}</div>
                    </Box>
                  </div>
                  <div className="rating_info">
                    <div className="rating">
                      <Rating
                        name={`rating_${index}`}
                        value={cafe.rating}
                        precision={0.5}
                        readOnly
                      />
                    </div>
                    <div className="rating_2">
                      <Box className="rating_2">
                        <Box className="like">
                          <div className="like_cnt">{cafe.likeCount}</div>
                          <div className="like_img">
                            <img src="icons/like.svg" alt={`like_${index}`} />
                          </div>
                        </Box>
                        <div className="dvr"></div>
                        <Box className="view">
                          <div className="view_cnt">{cafe.viewCount}</div>
                          <div className="view_img">
                            <img src="icons/view.svg" alt={`view_${index}`} />
                          </div>
                        </Box>
                      </Box>
                    </div>
                  </div>
                </Box>
              </Box>
            ))}
          </div>
        </div>

        {/* column 3 Pagination */}
        <Stack className="pagination" spacing={2}>
          <Pagination count={3} variant="outlined" shape="rounded" />
        </Stack>
      </Container>
    </div>
  );
}
