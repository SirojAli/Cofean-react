import {
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import EmailIcon from "@mui/icons-material/Email";
import RoomIcon from "@mui/icons-material/Room";
import PhoneIcon from "@mui/icons-material/Phone";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import TelegramIcon from "@mui/icons-material/Telegram";

import "../../../scss/navbar.scss";
import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";

export function Footer() {
  const navigate = useNavigate;
  return (
    <div className="footer">
      <Stack className="footer_box">
        {/* Footer  1 */}
        <Box className="footer1">
          <div className="f1_top">
            <Box className="f1_icon">
              <img src="/icons/money1.png" alt="icons" />
            </Box>
            <Box className="f1_text">
              <p>100% Money back</p>
            </Box>
          </div>
          <div className="f1_divider"></div>
          <div className="f1_top">
            <Box className="f1_icon">
              <img src="/icons/free.png" alt="icons" />
            </Box>
            <Box className="f1_text">
              <p> Free delivery for order over $50</p>
            </Box>
          </div>
          <div className="f1_divider"></div>
          <div className="f1_top">
            <Box className="f1_icon">
              <img src="/icons/call.svg" alt="icons" />
            </Box>
            <Box className="f1_text">
              <p>24/7 Customer Support</p>
            </Box>
          </div>
        </Box>

        <Box className="footer2_3">
          {/* Footer 2 */}
          <Box className="footer2">
            <div className="f2_box">
              <Box className="f2_contents">
                {/* 1-QATOR */}
                <Box className="content">
                  <p className="title">COMPANY</p>
                  <Box className="content_texts">
                    <p className="text">About us</p>
                    <p className="text">Blog</p>
                    <p className="text">Events</p>
                    <p className="text">Contact Us</p>
                  </Box>
                </Box>

                {/* 2-QATOR */}
                <Box className="content">
                  <p className="title">COFEAN SHOP</p>
                  <Box className="content_texts">
                    <p className="text">All Products</p>
                    <p className="text">Bestsellers</p>
                    <p className="text">Sale</p>
                    <p className="text">Latest Products</p>
                  </Box>
                </Box>

                {/* 3-QATOR */}
                <Box className="content">
                  <p className="title">HELP</p>
                  <Box className="content_texts">
                    <p className="text">My Account</p>
                    <p className="text">My Orders</p>
                    <p className="text">Wishlist</p>
                    <p className="text">Legal & Privacy</p>
                  </Box>
                </Box>
              </Box>

              <Box className="f2_bottom">
                <Box className="f2_cards">
                  <img className="icon" src="/icons/visa.svg" />
                  <img className="icon" src="/icons/master_card.png" />
                  <img className="icon_w" src="/icons/western_union.svg" />
                  <img className="icon_p" src="/icons/paypal.svg" />
                  <img className="icon" src="/icons/toss.svg" />
                  <img className="icon" src="/icons/kakao.svg" />
                  <img className="icon_n" src="/icons/naver3.png" />
                  <img className="icon_s" src="/icons/samsung1.svg" />
                </Box>

                <Box className="f2_rights">
                  <p>Copyright © 2024 Cofean. All Rights Reserved</p>
                </Box>
              </Box>
            </div>
          </Box>

          <div className="f2_divider"></div>

          {/* Footer 3 */}
          <Box className="footer3">
            <div className="f3_box">
              {/* for logo */}
              <div className="f3_logo">
                <img className="logo" src="/images/navbar/logo1.png" />
              </div>

              {/* for sending email */}
              <Box className="f3_send_email">
                <h4>Join Cofean Cafe Club and Get $50 for your visit.</h4>
                <Box className="email_wrap">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="f3_input"
                  />
                  <Button className="f3_btn">
                    <img className="send_email" src="/icons/email1.svg" />
                  </Button>
                </Box>
                {/* divider */}
                <div className="f3_divider"></div>
              </Box>

              {/* social media */}
              <div className="f3_social_media">
                <Facebook className="icon" />
                <LinkedInIcon className="icon" />
                <Instagram className="icon" />
                <GitHubIcon className="icon" />
                <TelegramIcon className="icon" />
              </div>

              {/* for number & email */}
              <div className="f3_num_email">
                <Box className="number">
                  <span>+82 10-8240-5559</span>
                </Box>
                <Box className="email">
                  <span>cofean@gmail.com</span>
                </Box>
              </div>
            </div>
          </Box>
        </Box>
      </Stack>
    </div>
  );
}
