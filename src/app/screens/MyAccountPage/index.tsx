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
import "../../../scss/account.scss";
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
import { Textarea } from "@mui/joy";

export function MyAccount() {
  /** INITIALIZATIONS */

  return (
    <div className="account_page">
      <Container className="account_page_box">
        <div className="title">
          <span>My account</span>
        </div>
        <div className="main_page">
          <div className="menu_tables">
            <Box className="menu">
              <span>Settings</span>
            </Box>
            <Box className="menu">
              <span>Orders</span>
            </Box>
            <Box className="menu">
              <span>Wishlist</span>
            </Box>
          </div>
          <div className="menu_parts">
            {/* for account settings */}
            <div className="account_set">
              <Box className="set_title">
                <span>Account Settings</span>
              </Box>
              <div className="text_boxes">
                <Box className="info_box">
                  <span className="span">Username</span>
                  <input
                    type="text"
                    placeholder="Sam"
                    className="input"
                    style={{
                      background: "#F4F4F4",
                      color: "#000",
                      height: "40px",
                      width: "80%",
                      border: "1px solid grey",
                      borderRadius: "5px",
                    }}
                  />
                </Box>

                <Box className="info_box">
                  <span className="span">Email</span>
                  <input
                    type="text"
                    placeholder="sam@gmail.com"
                    className="input"
                    style={{
                      background: "#F4F4F4",
                      color: "#000",
                      height: "40px",
                      width: "80%",
                      border: "1px solid grey",
                      borderRadius: "5px",
                    }}
                  />
                </Box>

                <Box className="info_box">
                  <span className="span">Phone</span>
                  <input
                    type="text"
                    placeholder="+8210 7777-2332"
                    className="input"
                    style={{
                      background: "#F4F4F4",
                      color: "#000",
                      height: "40px",
                      width: "80%",
                      border: "1px solid grey",
                      borderRadius: "5px",
                    }}
                  />
                </Box>

                <Box className="info_box">
                  <span className="span">Address</span>
                  <input
                    type="text"
                    placeholder="Busan, South Korea"
                    className="input"
                    style={{
                      background: "#F4F4F4",
                      color: "#000",
                      height: "40px",
                      width: "80%",
                      border: "1px solid grey",
                      borderRadius: "5px",
                    }}
                  />
                </Box>

                <Box className="info_box_desc">
                  <span className="span">Description</span>
                  <textarea
                    className="desc"
                    // name="blog"
                    placeholder="User Description"
                    rows={5}
                    cols={33}
                    style={{
                      background: "#F4F4F4",
                      color: "#000",
                      height: "140px",
                      width: "80%",
                      border: "1px solid grey",
                      borderRadius: "5px",
                    }}
                  ></textarea>
                </Box>

                <Box className="info_box_img">
                  <span className="span">Picture</span>
                  <div className="account_img_box">
                    <Box className="acc_img">
                      <img src="/icons/user-profile-icon.svg" />
                    </Box>
                    <Box className="upload_img">
                      <div className="change">
                        <span>Change Photo</span>
                      </div>
                      <div className="delete">
                        <span>Delete</span>
                      </div>
                    </Box>
                  </div>
                </Box>

                <Box className="card_info">
                  <span className="span">Account</span>
                  <div className="card_info_boxes">
                    <TextField
                      // error={!!nickError}
                      className="input_area"
                      id="outlined-basic"
                      label="Account Number"
                      variant="outlined"
                      // onChange={nameChangeHandler}
                      size="small"
                      // helperText={nickError}
                      // value={nickName}
                    />
                    <div className="card2_box">
                      <TextField
                        // error={!!nickError}
                        className="input_area"
                        id="outlined-basic"
                        label="Expire Date "
                        variant="outlined"
                        // onChange={nameChangeHandler}
                        size="small"
                        // helperText={nickError}
                        // value={nickName}
                      />
                      <TextField
                        // error={!!nickError}
                        className="input_area"
                        id="outlined-basic"
                        label="CVV "
                        variant="outlined"
                        // onChange={nameChangeHandler}
                        size="small"
                        // helperText={nickError}
                        // value={nickName}
                      />
                    </div>
                    <TextField
                      // error={!!nickError}
                      className="input_area"
                      id="outlined-basic"
                      label="Sam William"
                      variant="outlined"
                      // onChange={nameChangeHandler}
                      size="small"
                      // helperText={nickError}
                      // value={nickName}
                    />
                    <div className="card_types">
                      <img className="card" src="/icons/western_union.svg" />
                      <img className="card" src="/icons/master_card.png" />
                      <img className="card" src="/icons/visa.png" />
                      <img className="card" src="/icons/kakao.svg" />
                      <img className="card" src="/icons/samsung1.svg" />
                    </div>
                  </div>
                </Box>
              </div>

              <Button className="save_btn">
                <span>Save the Changes</span>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
