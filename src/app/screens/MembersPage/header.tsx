import React from "react";
import { Stack } from "@mui/material";

import "../../../scss/cafe.scss";

export function Header() {
  return (
    <Stack
      className="myPage_header"
      sx={{ backgroundImage: "url(/images/headers/y2.png)" }}
    >
      {/* <Box className="header_sort" /> */}
    </Stack>
  );
}
