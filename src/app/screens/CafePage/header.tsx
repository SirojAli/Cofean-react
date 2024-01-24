import React from "react";
import { Box, Button, Container, Stack } from "@mui/material";

import "../../../scss/home.scss";

export function Header() {
  return (
    <Stack
      className="cafe_header"
      sx={{ backgroundImage: "url(/images/headers/y2.png)" }}
    >
      {/* <Box className="header_sort" /> */}
    </Stack>
  );
}
