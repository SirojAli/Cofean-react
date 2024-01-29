import React from "react";
import { Box, Button, Container, Stack } from "@mui/material";

import "../../../scss/products.scss";

export function Header() {
  return (
    <Stack
      className="product_header"
      sx={{ backgroundImage: "url(/images/headers/y2.png)" }}
    ></Stack>
  );
}
