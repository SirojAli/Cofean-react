import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "../../../scss/blog.scss";

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

// ALL BLOGS section
export function Blog() {
  /** INITIALIZATIONS */

  return (
    <div className="blog_container">
      <Container className="all_articles">
        <div className="blog_title">
          <Box className="text">
            <span>* OUR BLOG *</span>
          </Box>
          <Box className="title">
            <div>
              <span>
                More than a Cup of Coffee. <br />
                Discover the world of Coffee from out insight
              </span>
            </div>
          </Box>
        </div>
        <div className="blog_filter_search">
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
              <input
                type="search"
                className="search_input"
                name="SearchCafe"
                placeholder="Search Article"
              />
              <Button className="search_btn">
                <SearchIcon />
              </Button>
            </form>
          </Box>
        </div>
        <div className="blog_boxes">
          <Box className="event">
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
            <Box className="read">
              <span>Read more...</span>
            </Box>
          </Box>

          <Box className="event">
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
            <Box className="read">
              <span>Read more...</span>
            </Box>
          </Box>

          <Box className="event">
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
            <Box className="read">
              <span>Read more...</span>
            </Box>
          </Box>

          <Box className="event">
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
            <Box className="read">
              <span>Read more...</span>
            </Box>
          </Box>

          <Box className="event">
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
            <Box className="read">
              <span>Read more...</span>
            </Box>
          </Box>
          <Box className="event">
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
            <Box className="read">
              <span>Read more...</span>
            </Box>
          </Box>

          <Box className="event">
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
            <Box className="read">
              <span>Read more...</span>
            </Box>
          </Box>

          <Box className="event">
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
            <Box className="read">
              <span>Read more...</span>
            </Box>
          </Box>

          <Box className="event">
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
            <Box className="read">
              <span>Read more...</span>
            </Box>
          </Box>
        </div>
        <Stack className="pagination" spacing={2}>
          <Pagination count={3} variant="outlined" shape="rounded" />
        </Stack>
      </Container>
    </div>
  );
}
