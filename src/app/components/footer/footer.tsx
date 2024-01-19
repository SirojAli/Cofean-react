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

export function Footer() {
  const navigate = useNavigate;
  return (
    <div className="footer">
      <Stack className="footer_box">
        {/* Footer  1 */}
        <Box className="footer1">
          <Box className="f1_top">
            <Box className="f1_icon">
              <img src="/icons/money_back.svg" alt="icons" />
            </Box>
            <Box className="f1_text">
              <p>100% Money back</p>
            </Box>
          </Box>
          <div className="f1_divider"></div>
          <Box className="f1_top">
            <Box className="f1_icon">
              <img src="/icons/delivery.svg" alt="icons" />
            </Box>
            <Box className="f1_text">
              <p> Free delivery for order over $50</p>
            </Box>
          </Box>
          <div className="f1_divider"></div>
          <Box className="f1_top">
            <Box className="f1_icon">
              <img src="/icons/quality.svg" alt="icons" />
            </Box>
            <Box className="f1_text">
              <p> Quality Guarantee</p>
            </Box>
          </Box>
        </Box>

        {/* Footer 2 */}
        <Box className="footer2">
          {/* f2 Left */}
          <Box className="f2_left">
            <Box className="f2_left_side">
              <Box className="f2_left_boxes">
                <Box className="f2_left_title">COMPANY</Box>
                <Box className="f2_left_text">
                  <div>Cofean</div>
                  <div>About Us</div>
                  <div>Cofean</div>
                  <div>About Us</div>
                  <div>Cofean</div>
                </Box>
              </Box>
              <Box className="f2_left_boxes">
                <Box className="f2_left_title">COMPANY</Box>
                <Box className="f2_left_text">
                  <div>Cofean</div>
                  <div>About Us</div>
                  <div>Cofean</div>
                  <div>About Us</div>
                  <div>Cofean</div>
                </Box>
              </Box>
              <Box className="f2_left_boxes">
                <Box className="f2_left_title">COMPANY</Box>
                <Box className="f2_left_text">
                  <div>Cofean</div>
                  <div>About Us</div>
                  <div>Cofean</div>
                  <div>About Us</div>
                  <div>Cofean</div>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* f2 divider */}
          <div className="f2_divider"></div>

          {/* f2 Right */}
          <Box className="f2_right">
            {/* contact */}
            <Box className="f2_contact">
              <Box className="f2_right_title">COMPANY</Box>
              <Box className="f2_right_contact">
                <Box className="f2_icon">
                  <p>
                    <RoomIcon />
                    Busan, South Korea
                  </p>
                  <p>
                    <PhoneIcon /> + 82 10 0777 2332
                  </p>
                  <p>
                    <EmailIcon />
                    cofean@gmail.com
                  </p>
                </Box>
              </Box>
            </Box>

            {/* divider */}
            <Box className="f2_divider2"></Box>

            {/* social */}
            <Box className="f2_social">
              <a href="https://github.com">
                <FacebookIcon className="sns_icon" />
              </a>
              <a href="https://t.me">
                <TelegramIcon className="sns_icon" />
              </a>
              <a href="https://www.linkedin.com/in">
                <LinkedInIcon className="sns_icon" />
              </a>
              <a href="https://www.instagram.com">
                <InstagramIcon className="sns_icon" />
              </a>
              <a href="https://github.com">
                <GitHubIcon className="sns_icon" />
              </a>
            </Box>
          </Box>
        </Box>

        {/* Footer 3 */}
        <Box className="footer3">
          <Box className="f3_left">
            <img src="/icons/visa.svg" className="card" />
            <img src="/icons/master_card.svg" className="card" />
            <img src="/icons/paypal.svg" className="card" />
            <img src="/icons/kakao.svg" className="card" />
            <img src="/icons/toss.svg" className="card" />
            <img src="/icons/naver.png" className="card2" />
            <img src="/icons/samsung.png" className="card2" />
          </Box>

          <Box className="f3_right">
            <p>Copyright © 2024 Cofean. All Rights Reserved</p>
          </Box>
        </Box>
      </Stack>
    </div>
  );
}
