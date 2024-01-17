import { Box, Button, Container, Stack } from "@mui/material";
import React, { useRef } from "react";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import { CardOverflow, IconButton } from "@mui/joy";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import { CssVarsProvider } from "@mui/joy/styles";
import { Favorite } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";

export function TopCafes() {
  return (
    <div className="top_cafes">
      <Container>
        <Stack
          flexDirection={"column"}
          alignItems={"center"}
          sx={{ mt: "45px" }}
        >
          {/* 1.1 Top Cafes: Text Title */}
          <Box className="topCafes_title">Popular Coffee Sops</Box>

          {/* 1.2 Top Cafes: Text Label */}

          {/* 1.3 Top Cafes: See All Brands*/}
          <Stack
            flexDirection={"row"}
            justifyContent={"flex-end"}
            style={{ width: "100%" }}
          >
            <Button
              style={{
                background: "#1976d2",
                color: "#ffffff",
                marginTop: "16px",
              }}
            >
              Barchasini Ko'rish
            </Button>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
