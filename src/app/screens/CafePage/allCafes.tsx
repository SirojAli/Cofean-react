import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@mui/material/Pagination";
import Favorite from "@mui/icons-material/Favorite";
import Rating from "@mui/material/Rating";
import Phone from "@mui/icons-material/Phone";
import assert from "assert";
import { useNavigate } from "react-router-dom";

import "../../../scss/cafe.scss";
import { verifiedMemberData } from "../../apiServices/verify";
import CafeApiService from "../../apiServices/cafeApiService";
import MemberApiService from "../../apiServices/memberApiService";
import { Definer } from "../../../lib/definer";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import { serverApi } from "../../../lib/config";
import { Cafe } from "../../../types/user";
import { CafeSearchObj } from "../../../types/others";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveAllCafes } from "./selector";
import { Dispatch } from "@reduxjs/toolkit";
import { setAllCafes } from "./slice";

//** REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({
  setAllCafes: (data: Cafe[]) => dispatch(setAllCafes(data)),
});

// REDUX SELECTOR
const allCafesRetriever = createSelector(retrieveAllCafes, (allCafes) => ({
  allCafes,
}));

export function AllCafes() {
  /** INITIALIZATIONS */
  const navigate = useNavigate();
  const refs: any = useRef([]);

  const [likeCounts, setLikeCounts] = useState<{ [key: string]: number }>({});
  const [likedCafes, setLikedCafes] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredCafes, setFilteredCafes] = useState<Cafe[]>([]);

  const { setAllCafes } = actionDispatch(useDispatch());
  const { allCafes } = useSelector(allCafesRetriever);
  console.log("allCafes>>>", allCafes);

  const [allCafesObj, setAllCafesObj] = useState<CafeSearchObj>({
    page: 1,
    limit: 12,
    order: "mb_point",
  });

  // Filter cafes based on searchValue
  useEffect(() => {
    if (searchValue.trim() === "") {
      setFilteredCafes(allCafes);
    } else {
      const filtered = allCafes.filter((cafe) =>
        cafe.mb_nick.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredCafes(filtered);
    }
  }, [allCafes, searchValue]);

  useEffect(() => {
    // TODO: Retrieve targetCafesData
    const cafeService = new CafeApiService();
    cafeService
      .getCafes(allCafesObj)
      .then((data) => setAllCafes(data))
      .catch((err) => console.log(err));
  }, [allCafesObj]);

  // Fetch initial like counts
  useEffect(() => {
    allCafes.forEach((ele: Cafe) => {
      refs.current[ele._id] = ele.mb_likes;
      setLikeCounts((prevCounts) => ({
        ...prevCounts,
        [ele._id]: ele.mb_likes,
      }));
      if (ele.me_liked && ele.me_liked[0]?.my_favorite) {
        setLikedCafes((prevLikedCafes) => [...prevLikedCafes, ele._id]);
      }
    });
  }, [allCafes]);

  /** HANDLERS */
  const chosenCafeHandler = (id: string) => {
    navigate(`/cafes/${id}`);
  };

  const cafeHandler = (category: string) => {
    allCafesObj.page = 1;
    switch (category) {
      case "Top":
        allCafesObj.order = "mb_point";
        break;
      case "Best":
        allCafesObj.order = "mb_likes";
        break;
      case "Popular":
        allCafesObj.order = "mb_views";
        break;
      case "New":
        allCafesObj.order = "createdAt";
        break;
      default:
        allCafesObj.order = "mb_point";
    }
    setAllCafesObj({ ...allCafesObj });
  };

  const paginationHandler = async (_: any, value: any) => {
    try {
      setAllCafesObj((prev) => ({ ...prev, page: value }));

      const cafeService = new CafeApiService();
      const data = await cafeService.getCafes({
        ...allCafesObj,
        page: value,
      });
      setAllCafes(data);
    } catch (error) {
      console.error("Pagination Error>>>", error);
    }
  };

  const targetLikeHandler = async (e: any, id: string) => {
    try {
      assert.ok(verifiedMemberData, Definer.auth_err1);

      const memberService = new MemberApiService();
      const data = { like_ref_id: id, group_type: "member" };
      const like_result: any = await memberService.memberLikeTarget(data);
      assert.ok(like_result, Definer.general_err1);

      // Update like count
      setLikeCounts((prevCounts) => ({
        ...prevCounts,
        [id]:
          like_result.like_status > 0 ? prevCounts[id] + 1 : prevCounts[id] - 1,
      }));

      // Update liked cafes
      if (like_result.like_status > 0) {
        setLikedCafes((prevLikedCafes) => [...prevLikedCafes, id]);
      } else {
        setLikedCafes((prevLikedCafes) =>
          prevLikedCafes.filter((cafeId) => cafeId !== id)
        );
      }

      await sweetTopSmallSuccessAlert("success", 700, false);
    } catch (err: any) {
      console.log("ERROR targetLikeHandler:", err);
      sweetErrorHandling(err).then();
    }
  };

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="all_cafes">
      <Container className="cafe_box">
        <Box className="filter_search_box">
          <Box className="filter_box">
            <div className="f_box" onClick={() => cafeHandler("Top")}>
              <p>Top</p>
            </div>
            <div className="f_box" onClick={() => cafeHandler("Best")}>
              <p>Best</p>
            </div>
            <div className="f_box" onClick={() => cafeHandler("Popular")}>
              <p>Popular</p>
            </div>
            <div className="f_box" onClick={() => cafeHandler("New")}>
              <p>New</p>
            </div>
          </Box>
          <Box className="search_box">
            <form
              className="search_forms"
              action=""
              method=""
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="search"
                className="search_input"
                name="SearchCafe"
                placeholder="Search Cafe"
                value={searchValue}
                onChange={searchHandler}
              />
              <Button className="search_btn" type="submit">
                <SearchIcon />
              </Button>
            </form>
          </Box>
        </Box>

        <div className="all_cafe_box">
          <div className="cafe_boxes">
            {filteredCafes.map((ele: Cafe, index: number) => (
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
                        onClick={(e) => {
                          e.stopPropagation();
                          targetLikeHandler(e, ele._id);
                        }}
                        style={{
                          fill: likedCafes.includes(ele._id) ? "red" : "white",
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
                          <div className="like_cnt">{likeCounts[ele._id]}</div>
                          <div className="like_img">
                            <FavoriteIcon
                              style={{
                                width: "20px",
                                height: "20px",
                                marginTop: "5px",
                              }}
                            />
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

        <Stack className="pagination" spacing={2}>
          <Pagination
            count={3}
            page={allCafesObj.page}
            variant="outlined"
            shape="rounded"
            onChange={paginationHandler}
            boundaryCount={1}
            siblingCount={0}
          />
        </Stack>
      </Container>
    </div>
  );
}
