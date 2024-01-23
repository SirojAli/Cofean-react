import React from "react";
import { Box, Button, Container, Stack } from "@mui/material";

import "../../../scss/home.scss";

export function Brands() {
  return (
    // if need it, change <> to <div>
    <Container className="home_brands">
      {/* 1. Text title */}
      <Box className="brands_title">
        <h2>Top Coffee Shops</h2>
      </Box>

      {/* 2. Top Cafes */}
      <Stack className="brands_box">
        <Box className="top_brand">
          <img src="/images/brands/compose.png" alt="" />
        </Box>
        <Box className="top_brand">
          <img src="/images/brands/aTwosomePlace.png" alt="" />
        </Box>
        <Box className="top_brand">
          <img src="/images/brands/Hollys.png" alt="" />
        </Box>
        <Box className="top_brand">
          <img src="/images/brands/tomnToms.png" alt="" />
        </Box>
        <Box className="top_brand">
          <img src="/images/brands/paiks.png" alt="" />
        </Box>
      </Stack>

      {/* 3. See All Cafes */}
      <Stack className="brands_btn">
        <Button className="br_btn">See More</Button>
      </Stack>
    </Container>
  );
}
