import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "../../../scss/blog.scss";

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
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Rating from "@mui/material/Rating";
import Phone from "@mui/icons-material/Phone";
import assert from "assert";
import { verifiedMemberData } from "../../apiServices/verify";
import { Definer } from "../../../lib/definer";
import MemberApiService from "../../apiServices/memberApiService";
import { useNavigate, useParams } from "react-router-dom";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Dispatch } from "@reduxjs/toolkit";
import { setAllBlogs, setTopBlogs, setChosenBlog } from "./slice";
import {
  retrieveAllBlogs,
  retrieveTopBlogs,
  retrieveChosenBlog,
} from "./selector";
import { BlogInput, BlogSearchObj } from "../../../types/blog";
import BlogApiService from "../../apiServices/blogApiService";
import { Collections } from "@mui/icons-material";
import { serverApi } from "../../../lib/config";
import { Blog } from "../../../types/blog";

//** REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({
  setAllBlogs: (data: Blog[]) => dispatch(setAllBlogs(data)),
  setTopBlogs: (data: Blog[]) => dispatch(setTopBlogs(data)),
  setChosenBlog: (data: Blog) => dispatch(setChosenBlog(data)),
});

// REDUX SELECTOR
const allBlogsRetriever = createSelector(retrieveAllBlogs, (allBlogs) => ({
  allBlogs,
}));
const topBlogsRetriever = createSelector(retrieveTopBlogs, (topBlogs) => ({
  topBlogs,
}));
const chosenBlogRetriever = createSelector(
  retrieveChosenBlog,
  (chosenBlog) => ({
    chosenBlog,
  })
);

const truncateText = (text: any, maxLength: any) => {
  if (text.length <= maxLength) return text;
  const truncatedText = text.substr(0, maxLength);
  // Find the last space before the maxLength to avoid cutting off words
  const lastSpaceIndex = truncatedText.lastIndexOf(" ");
  // Add non-breaking space character before the ellipsis
  const truncatedWithEllipsis = `${truncatedText.substr(
    0,
    lastSpaceIndex
  )}&nbsp;...`;
  return truncatedWithEllipsis;
};

export function BlogPage() {
  /** INITIALIZATIONS */
  const navigate = useNavigate();
  const refs: any = useRef([]);

  const { setAllBlogs } = actionDispatch(useDispatch());
  const { allBlogs } = useSelector(allBlogsRetriever);
  const [value, setValue] = React.useState("1");

  // For All Blogs
  // useEffect(() => {
  //   const blogService = new BlogApiService();

  //   blogService
  //     .getAllBlogs({
  //       page: 1,
  //       limit: 9,
  //       order: "createdAt", // blog_likes
  //       blog_types: "all",
  //     })
  //     .then((data) => {
  //       setAllBlogs(data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  const [searchBlogsObj, setSearchBlogsObj] = useState<BlogSearchObj>({
    page: 1,
    limit: 6,
    blog_types: "all",
  });
  const [blogsRebuild, setBlogsRebuild] = useState<Date>(new Date());

  useEffect(() => {
    const blogService = new BlogApiService();
    blogService
      .getTargetBlogs(searchBlogsObj)
      .then((data) => setAllBlogs(data))
      .catch((err) => console.log(err));
  }, [searchBlogsObj, blogsRebuild]);

  /** HANDLERS */
  const chosenBlogHandler = (id: string) => {
    navigate(`/blogs/${id}`);
  };

  const blogChangeHandler = (event: any, newValue: string) => {
    searchBlogsObj.page = 1;
    switch (newValue) {
      case "1":
        searchBlogsObj.blog_types = "all";
        break;
      case "2":
        searchBlogsObj.blog_types = "story";
        break;
      case "3":
        searchBlogsObj.blog_types = "evaluation";
        break;
      case "4":
        searchBlogsObj.blog_types = "news";
        break;
    }
    setSearchBlogsObj({ ...searchBlogsObj });
    setValue(newValue);
  };

  const paginationHandler = (event: any, value: number) => {
    searchBlogsObj.page = value;
    setSearchBlogsObj({ ...searchBlogsObj });
  };

  return (
    <div className="blog_container">
      <Container className="all_articles">
        <div className="blog_title">
          <Box className="text">
            <span>* OUR BLOG *</span>
          </Box>
          <Box className="title">
            <div>
              <span>
                More than a Cup of Coffee. <br />
                Discover the world of Coffee from out insight
              </span>
            </div>
          </Box>
        </div>

        <div className="blog_filter_search">
          <Box className="filter_box">
            <div
              className="f_box"
              onClick={(event) => blogChangeHandler(event, "1")}
            >
              <p>All Blogs</p>
            </div>
            <div
              className="f_box"
              onClick={(event) => blogChangeHandler(event, "2")}
            >
              <p>Story</p>
            </div>
            <div
              className="f_box"
              onClick={(event) => blogChangeHandler(event, "3")}
            >
              <p>Evaluation</p>
            </div>
            <div
              className="f_box"
              onClick={(event) => blogChangeHandler(event, "4")}
            >
              <p>News</p>
            </div>
          </Box>
        </div>

        <div className="blog_boxes">
          {allBlogs && allBlogs.length > 0 ? (
            allBlogs.map((blog) => (
              <Box
                className="event"
                key={blog._id}
                onClick={() => chosenBlogHandler(blog._id)}
              >
                <img
                  src={blog.blog_image?.[0] || "/images/default-image.jpg"}
                  alt={blog.blog_title}
                />
                <Box className="tags">
                  <div className="first">
                    <span>{blog.blog_types}</span>
                  </div>
                </Box>
                <Box className="title">
                  <h4>{blog.blog_title}</h4>
                </Box>
                <Box
                  className="context"
                  dangerouslySetInnerHTML={{
                    __html: truncateText(blog.blog_content, 150),
                  }}
                />
                {/* <Box className="read">
                  <span>Read more...</span>
                </Box> */}
              </Box>
            ))
          ) : (
            <p>No blogs found</p>
          )}
        </div>

        <Stack className="pagination" spacing={2}>
          <Pagination
            count={3}
            page={searchBlogsObj.page}
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
