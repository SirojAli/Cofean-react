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
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import TelegramIcon from "@mui/icons-material/Telegram";
import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import { TabContext, TabPanel } from "@mui/lab";
import moment from "moment";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Pagination from "@mui/material/Pagination";

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
              <div className="blog_title">
                <span>Siroj Ali's all posts</span>
              </div>
              <Box className="all_blogs">
                <div className="blog_box">
                  <img className="blog_img" src="/images/headers/q2.png" />
                  <div className="tag_target">
                    <Box className="tag">
                      <div className="first">
                        <span>Coffee</span>
                      </div>
                    </Box>
                    <Box className="target">
                      <div className="like">
                        <span>12</span>
                        <FavoriteBorderIcon />
                      </div>
                      <div className="view">
                        <span>32</span>
                        <RemoveRedEyeIcon />
                      </div>
                    </Box>
                  </div>
                  <Box className="title">
                    <span>
                      5 Reasons to Drink Americano 5 Reasons to Drink Americano
                      Americano
                    </span>
                  </Box>
                  <Box className="context">
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Nihil deserunt non, voluptatem vitae saepe molestias
                      soluta dicta
                    </p>
                  </Box>
                  <Box className="read">
                    <span>Read more...</span>
                  </Box>
                </div>
                <div className="blog_box">
                  <img className="blog_img" src="/images/headers/q2.png" />
                  <div className="tag_target">
                    <Box className="tag">
                      <div className="first">
                        <span>Coffee</span>
                      </div>
                    </Box>
                    <Box className="target">
                      <div className="like">
                        <span>12</span>
                        <FavoriteBorderIcon />
                      </div>
                      <div className="view">
                        <span>32</span>
                        <RemoveRedEyeIcon />
                      </div>
                    </Box>
                  </div>
                  <Box className="title">
                    <span>
                      5 Reasons to Drink Americano 5 Reasons to Drink Americano
                      Americano
                    </span>
                  </Box>
                  <Box className="context">
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Nihil deserunt non, voluptatem vitae saepe molestias
                      soluta dicta
                    </p>
                  </Box>
                  <Box className="read">
                    <span>Read more...</span>
                  </Box>
                </div>
                <div className="blog_box">
                  <img className="blog_img" src="/images/headers/q2.png" />
                  <div className="tag_target">
                    <Box className="tag">
                      <div className="first">
                        <span>Coffee</span>
                      </div>
                    </Box>
                    <Box className="target">
                      <div className="like">
                        <span>12</span>
                        <FavoriteBorderIcon />
                      </div>
                      <div className="view">
                        <span>32</span>
                        <RemoveRedEyeIcon />
                      </div>
                    </Box>
                  </div>
                  <Box className="title">
                    <span>
                      5 Reasons to Drink Americano 5 Reasons to Drink Americano
                      Americano
                    </span>
                  </Box>
                  <Box className="context">
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Nihil deserunt non, voluptatem vitae saepe molestias
                      soluta dicta
                    </p>
                  </Box>
                  <Box className="read">
                    <span>Read more...</span>
                  </Box>
                </div>
                <Stack className="pagination" spacing={2}>
                  <Pagination count={3} variant="outlined" shape="rounded" />
                </Stack>
              </Box>
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
                <div className="blog_buttons">
                  <Button className="blog_btn">Create post</Button>
                  <Button className="blog_btn">View all posts</Button>
                </div>
              </Box>
            </Stack>
          </TabContext>
        </Stack>
      </Container>
    </div>
  );
}
