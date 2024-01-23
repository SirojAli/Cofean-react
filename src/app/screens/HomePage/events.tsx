import React from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import Rating from "@mui/material/Rating";
import "../../../scss/home.scss";

export function Events() {
  return (
    // if need it, change <> to <div>
    <Container className="home_events">
      {/* 1. Text title */}
      <Box className="event_title">
        <img src="/images/navbar/logo1.png" alt="" />
        <div className="main_title">Blog & News</div>
        <div className="sub_title">Let's explore our amazing articles</div>
      </Box>

      {/* 2. Products in Trends */}
      <Stack className="event_boxes">
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
              reprehenderit quam pariatur quos official.
            </p>
          </Box>
          <Box className="date">
            <span>2024-07-07</span>
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
              reprehenderit quam pariatur quos official.
            </p>
          </Box>
          <Box className="date">
            <span>2024-07-07</span>
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
              reprehenderit quam pariatur quos official.
            </p>
          </Box>
          <Box className="date">
            <span>2024-07-07</span>
          </Box>
        </Box>
      </Stack>

      {/* 3. See All Products */}
      <Stack className="event_btn">
        <Button className="br_btn">View All Articles</Button>
      </Stack>
      <Box className="blank"></Box>
    </Container>
  );
}
