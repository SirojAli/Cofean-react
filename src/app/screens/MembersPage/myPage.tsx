import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  Tab,
  TextField,
} from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Favorite, FavoriteBorder, Settings } from "@mui/icons-material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import TelegramIcon from "@mui/icons-material/Telegram";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { setChosenMember, setChosenMemberBlogs, setChosenBlog } from "./slice";
import {
  sweetErrorHandling,
  sweetFailureProvider,
} from "../../../lib/sweetAlert";
import BlogApiService from "../../apiServices/blogApiService";
import MemberApiService from "../../apiServices/memberApiService";
import { Member } from "../../../types/user";
import { Blog, SearchMemberBlogsObj } from "../../../types/blog";
import {
  retrieveChosenMember,
  retrieveChosenMemberBlogs,
  retrieveChosenBlog,
} from "./selector";
import { Header } from "./header";
import "../../../scss/blog.scss";
import "../../../scss/members.scss";
import { verifiedMemberData } from "../../apiServices/verify";
// import { Editor } from "@toast-ui/react-editor";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// REDUX SELECTOR
const chosenMemberRetriever = createSelector(
  retrieveChosenMember,
  (chosenMember) => ({
    chosenMember,
  })
);
const chosenMemberBlogsRetriever = createSelector(
  retrieveChosenMemberBlogs,
  (chosenMemberBlogs) => ({
    chosenMemberBlogs,
  })
);
const chosenBlogRetriever = createSelector(
  retrieveChosenBlog,
  (chosenBlog) => ({
    chosenBlog,
  })
);

export function MyPage(props: any) {
  /** INITIALIZATIONS */
  const navigate = useNavigate();
  const refs = useRef([]);

  const dispatch = useDispatch();

  const [value, setValue] = useState("1");
  const [blogRebuild, setBlogRebuild] = useState(new Date());
  const [followRebuild, setFollowRebuild] = useState(false);
  const [createPost, setCreatePost] = useState(false);

  const { chosenMember } = useSelector(chosenMemberRetriever);
  const { chosenMemberBlogs } = useSelector(chosenMemberBlogsRetriever);
  const { chosenBlog } = useSelector(chosenBlogRetriever);

  const [memberBlogSearchObj, setMemberBlogSearchObj] =
    useState<SearchMemberBlogsObj>({
      mb_id: verifiedMemberData ? verifiedMemberData._id : "none",
      page: 1,
      limit: 4,
    });

  useEffect(() => {
    if (!verifiedMemberData) {
      sweetFailureProvider("Please, login first!", true, true);
      return;
    }
    const blogService = new BlogApiService();
    const memberService = new MemberApiService();
    // setChosenMemberBlogs
    blogService
      .getMemberBlogs(memberBlogSearchObj)
      .then((data) => dispatch(setChosenMemberBlogs(data)))
      .catch((err) => console.log(err));

    // setChosenMember
    memberService
      .getChosenMember(verifiedMemberData._id)
      .then((data) => dispatch(setChosenMember(data)))
      .catch((err) => console.log(err));
  }, [memberBlogSearchObj, blogRebuild, followRebuild, dispatch]);

  /** HANDLERS **/
  const changeHandler = (event: any, newValue: any) => {
    setValue(newValue);
  };

  const paginationHandler = (event: any, value: any) => {
    setMemberBlogSearchObj({ ...memberBlogSearchObj, page: value });
  };

  // renderChosenBlogHandler
  const chosenBlogHandler = async (blog_id: any) => {
    try {
      const blogService = new BlogApiService();
      blogService
        .getChosenBlog(blog_id)
        .then((data) => {
          dispatch(setChosenBlog(data));
          setValue("6");
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const createBlogHandler = () => {
    console.log(value);
    setCreatePost(true);
  };

  return (
    <div className="members_page">
      <Header />
      <Container className="my_page_box">
        <Stack className="my_page_frame">
          <TabContext value={createPost ? "create" : "view"}>
            {/* Left Section: All Blogs */}
            {!createPost && (
              <Stack className="my_page_left">
                <div className="blog_title">
                  <span>{`${verifiedMemberData?.mb_nick}'s all posts`}</span>
                </div>
                <Box className="all_blogs">
                  {chosenMemberBlogs.map((blog) => (
                    <div className="blog_box" key={blog._id}>
                      <img
                        className="blog_img"
                        src={blog?.blog_image || "/default_image.jpg"}
                        alt={blog?.blog_subject}
                      />
                      <div className="tag_target">
                        <Box className="tag">
                          <div className="first">
                            <span>{blog.blog_types}</span>
                          </div>
                        </Box>
                        <Box className="target">
                          <div className="like">
                            <span>{blog.blog_likes}</span>
                            <FavoriteBorderIcon />
                          </div>
                          <div className="view">
                            <span>{blog.blog_views}</span>
                            <RemoveRedEyeIcon />
                          </div>
                        </Box>
                      </div>
                      <Box className="title">
                        <span>{blog.blog_subject}</span>
                      </Box>
                      <Box className="context">
                        <p>{blog.blog_content}</p>
                      </Box>
                      <Box className="read">
                        <span onClick={() => chosenBlogHandler(blog._id)}>
                          Read more...
                        </span>
                      </Box>
                    </div>
                  ))}
                  <Stack className="pagination" spacing={2}>
                    <Pagination
                      count={Math.ceil(
                        chosenMemberBlogs.length / memberBlogSearchObj.limit
                      )}
                      page={memberBlogSearchObj.page}
                      shape="rounded"
                      onChange={paginationHandler}
                    />
                  </Stack>
                </Box>
              </Stack>
            )}
            {/* Right Section: Account Info */}
            <Stack className="my_page_right">
              <Box className="account_info">
                <div className="img_settings">
                  <div className="account_img">
                    <img
                      src={verifiedMemberData?.mb_image}
                      alt={verifiedMemberData?.mb_nick}
                    />
                  </div>
                  <a className="settings_btn">
                    <Settings />
                  </a>
                </div>
                <p className="user_name">{verifiedMemberData?.mb_nick}</p>
                <div className="follow">
                  <p className="followers">
                    <span>{verifiedMemberData?.mb_follow_count}</span> Followers
                  </p>
                  <p className="followings">
                    <span>{verifiedMemberData?.mb_subscriber_count}</span>{" "}
                    Followings
                  </p>
                </div>
                <div className="social_media">
                  <FacebookIcon className="icon" />
                  <LinkedInIcon className="icon" />
                  <InstagramIcon className="icon" />
                  <GitHubIcon className="icon" />
                  <TelegramIcon className="icon" />
                </div>
                <p className="desc">
                  {verifiedMemberData?.mb_description ||
                    "No additional information!"}
                  <br />
                  Here to share stories, connect with friends, and make every
                  post count
                </p>
                <div className="blog_buttons">
                  <Button
                    className="blog_btn"
                    onClick={createBlogHandler}
                    variant="contained"
                  >
                    Create post
                  </Button>
                  {!createPost && (
                    <Button className="blog_btn" onClick={() => setValue("1")}>
                      View all posts
                    </Button>
                  )}
                </div>
              </Box>
            </Stack>
            {/* Text Editor for Creating a Post */}
            {createPost && (
              <Box className="editor_wrapper">
                <ReactQuill
                  value={value}
                  onChange={setValue}
                  theme="snow"
                  style={{ height: "300px" }}
                />
                <Button
                  className="blog_btn"
                  onClick={createBlogHandler}
                  variant="contained"
                >
                  Create post
                </Button>
              </Box>
            )}
          </TabContext>
        </Stack>
      </Container>
    </div>
  );
}
