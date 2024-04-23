import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "../../../scss/cafe.scss";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { CssVarsProvider } from "@mui/joy/styles";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import IconButton from "@mui/joy/IconButton";
import Favorite from "@mui/icons-material/Favorite";
import Typography from "@mui/joy/Typography";
import Link from "@mui/joy/Link";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import CallIcon from "@mui/icons-material/Call";
import Rating from "@mui/material/Rating";
import Phone from "@mui/icons-material/Phone";
import assert from "assert";
import { verifiedMemberData } from "../../apiServices/verify";
import { Definer } from "../../../lib/definer";
import MemberApiService from "../../apiServices/memberApiService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import { useNavigate } from "react-router-dom";
import { CafeSearchObj } from "../../../types/others";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTargetCafes } from "./selector";
import { Cafe } from "../../../types/user";
import { Dispatch } from "@reduxjs/toolkit";
import { setTargetCafes } from "./slice";
import CafeApiService from "../../apiServices/cafeApiService";
import { serverApi } from "../../../lib/config";
import { retrieveTopCafes } from "../HomePage/selector";
import { setTopCafes } from "../HomePage/slice";

//** REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({
  setTargetCafes: (data: Cafe[]) => dispatch(setTargetCafes(data)),
  setTopCafes: (data: Cafe[]) => dispatch(setTopCafes(data)),
});

// REDUX SELECTOR
const targetCafesRetriever = createSelector(
  retrieveTargetCafes,
  (targetCafes) => ({
    targetCafes,
  })
);

const topCafesRetriever = createSelector(retrieveTopCafes, (topCafes) => ({
  topCafes,
}));

export function AllCafes() {
  /** INITIALIZATIONS */
  const navigate = useNavigate();
  const { setTargetCafes } = actionDispatch(useDispatch());
  const { targetCafes } = useSelector(targetCafesRetriever);
  const [targetSearchObj, setTargetSearchObj] = useState<CafeSearchObj>({
    page: 1,
    limit: 25,
    order: "mb_point",
  });
  const refs: any = useRef([]);

  const { setTopCafes } = actionDispatch(useDispatch());
  const { topCafes } = useSelector(topCafesRetriever);
  console.log("topCafes>>>", topCafes);

  useEffect(() => {
    // TODO: Retrieve targetCafesData
    const cafeService = new CafeApiService();
    cafeService
      .getCafes(targetSearchObj)
      .then((data) => setTargetCafes(data))
      .catch((err) => console.log(err));
  }, [targetSearchObj]);

  useEffect(() => {
    const cafeService = new CafeApiService();

    cafeService
      .getTopCafes()
      .then((data) => {
        setTopCafes(data);
      })
      .catch((err) => console.log(err));
  }, []);

  /** HANDLERS */
  const chosenCafeHandler = (id: string) => {
    navigate(`/restaurant/${id}`);
  };

  const searchHandler = (category: string) => {
    targetSearchObj.page = 1;
    targetSearchObj.order = category;
    setTargetSearchObj({ ...targetSearchObj });
  };

  const handlePaginationChange = (events: any, value: number) => {
    targetSearchObj.page = value;
    setTargetSearchObj({ ...targetSearchObj });
  };

  const targetLikeHandler = async (e: any, id: string) => {
    try {
      assert.ok(verifiedMemberData, Definer.auth_err1);

      const memberService = new MemberApiService();
      const like_result: any = await memberService.memberLikeTarget({
        like_ref_id: id,
        group_type: "member",
      });
      assert.ok(like_result, Definer.general_err1);

      if (like_result.like_status > 0) {
        e.target.style.fill = "red";
        refs.current[like_result.like_ref_id].innerHTML++;
      } else {
        e.target.style.fill = "white";
        refs.current[like_result.like_ref_id].innerHTML--;
      }

      await sweetTopSmallSuccessAlert("success", 700, false);
    } catch (err: any) {
      console.log("ERROR targetLikeTop:", err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <div className="all_cafes">
      <Container className="cafe_box">
        {/* High part: Text and Search box */}
        <Box className="filter_search_box">
          <Box className="filter_box">
            <div className="f_box">
              <p>Top</p>
            </div>
            <div className="f_box">
              <p>Best</p>
            </div>
            <div className="f_box">
              <p>Popular</p>
            </div>
            <div className="f_box">
              <p>New</p>
            </div>
          </Box>
          <Box className="search_box">
            <form className="search_forms" action="" method="">
              <input
                type="search"
                className="search_input"
                name="SearchCafe"
                placeholder="Search Cafe"
              />
              <Button className="search_btn">
                <SearchIcon />
              </Button>
            </form>
          </Box>
        </Box>

        {/* Middle part: Cards and cafe Pictures */}
        <div className="all_cafe_box">
          <div className="cafe_boxes">
            {targetCafes.map((ele: Cafe, index: number) => (
              <Box
                key={ele._id}
                className="cafe_box"
                onClick={() => chosenCafeHandler(ele._id)}
              >
                <Box className="cafe_img">
                  <img src={`${serverApi}/${ele.mb_image}`} alt="cafe img" />
                </Box>
                <Box className="cafe_info">
                  <div className="main_info">
                    <div className="main_stage">
                      <Box className="cafe_name">
                        <div>{ele.mb_nick}</div>
                      </Box>
                      <Favorite
                        className="like_btn"
                        onClick={(e) => targetLikeHandler(e, ele._id)}
                        style={{
                          fill:
                            ele?.me_liked && ele?.me_liked[0]?.my_favorite
                              ? "red"
                              : "white",
                          padding: "5px",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                    <div className="second_stage">
                      <Box className="cafe_address">
                        <LocationOnIcon />
                        <div>{ele.mb_address}</div>
                      </Box>
                      <Box className="cafe_number">
                        <Phone />
                        <div>{ele.mb_phone}</div>
                      </Box>
                    </div>
                  </div>
                  <div className="rating_info">
                    <div className="rating">
                      <Rating
                        name={`rating_${index}`}
                        value={ele.mb_top === "Y" ? 5 : 4}
                        precision={0.5}
                        readOnly
                      />
                    </div>
                    <div className="rating_2">
                      <Box className="rating_2">
                        <Box className="like">
                          <div className="like_cnt">{ele.mb_likes}</div>
                          <div className="like_img">
                            <FavoriteIcon
                              style={{
                                width: "20px",
                                height: "20px",
                                color: "#666666",
                                marginTop: "5px",
                              }}
                            />{" "}
                          </div>
                        </Box>
                        <div className="dvr"></div>
                        <Box className="view">
                          <div className="view_cnt">{ele.mb_views}</div>
                          <div className="view_img">
                            <VisibilityIcon
                              style={{
                                width: "20px",
                                height: "20px",
                                color: "#666666",
                                marginTop: "5px",
                              }}
                            />{" "}
                          </div>
                        </Box>
                      </Box>
                    </div>
                  </div>
                </Box>
              </Box>
            ))}
          </div>
        </div>

        {/* column 3 Pagination */}
        <Stack className="pagination" spacing={2}>
          <Pagination count={3} variant="outlined" shape="rounded" />
        </Stack>
      </Container>
    </div>
  );
}
