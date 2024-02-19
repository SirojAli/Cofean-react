import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Rating,
  Stack,
  TextField,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Favorite, FavoriteBorder, Settings } from "@mui/icons-material";
import "../../../scss/blog.scss";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import TelegramIcon from "@mui/icons-material/Telegram";
import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ReplyIcon from "@mui/icons-material/Reply";
import { TabContext, TabPanel } from "@mui/lab";

import "../../../scss/members.scss";
import { Header } from "./header";

export function MyPage() {
  /** INITIALIZATIONS */

  return (
    <div className="members_page">
      <Header />
      <Container className="my_page_box">
        <Stack className="my_page_frame">
          <TabContext value="value">
            {/* 1/2 Left Side */}
            <Stack className="my_page_left">
              <Box className="all_blogs"></Box>
            </Stack>

            {/* 2/2 Right Side */}
            <Stack className="my_page_right">
              <Box className="account_info">
                <div className="img_settings">
                  <div className="account_img">
                    <img src="/icons/default_user.svg" />
                  </div>
                  <a className="settings_btn">
                    <Settings />
                  </a>
                </div>
                <p className="user_name">Siroj Ali</p>
                <div className="follow">
                  <p className="followers">
                    <span>12</span> Followers
                  </p>
                  <p className="followings">
                    <span>32</span> Followings
                  </p>
                </div>
                <div className="social_media">
                  <Facebook className="icon" />
                  <LinkedInIcon className="icon" />
                  <Instagram className="icon" />
                  <GitHubIcon className="icon" />
                  <TelegramIcon className="icon" />
                </div>
                <p className="desc">
                  No additional information! <br />
                  Here to share stories, connect with friends, and make every
                  post count
                </p>
                <div className="post_buttons">
                  <Button className="post_btn">Create post</Button>
                  <Button className="post_btn">View my posts</Button>
                </div>
              </Box>
            </Stack>
          </TabContext>
        </Stack>
      </Container>
    </div>
  );
}
