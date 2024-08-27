import React, { useEffect, useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Modal,
  Pagination,
  PaginationItem,
  Stack,
  styled,
} from "@mui/material";
import {
  Close,
  Home,
  Facebook,
  Instagram,
  Telegram,
  YouTube,
  WhatsApp,
  Settings,
  ArrowBack,
  ArrowForward,
  LinkedIn,
  GitHub,
} from "@mui/icons-material";

import "../../../scss/blog.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { Blog, BlogSearchObj } from "../../../types/blog";
import BlogApiService from "../../apiServices/blogApiService";

// REDUX
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setChosenMember, setAllBlogs } from "./slice";
import { retrieveChosenMember, retrieveAllBlogs } from "./selector";
import Postcard from "./postcard";
import { verifiedMemberData } from "../../../app/apiServices/verify";
import CreateBlog from "./createBlog";
import { Member } from "../../../types/user";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import MemberApiService from "../../apiServices/memberApiService";
import FollowList from "./followList";
import { serverApi } from "../../../lib/config";

// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setAllBlogs: (data: Blog[]) => dispatch(setAllBlogs(data)),
  setChosenMember: (data: Member) => dispatch(setChosenMember(data)),
});
// REDUX SELECTOR
const allBlogsRetriever = createSelector(retrieveAllBlogs, (allBlogs) => ({
  allBlogs,
}));
const chosenMemberRetriever = createSelector(
  retrieveChosenMember,
  (chosenMember) => ({
    chosenMember,
  })
);

export function BlogPage() {
  /*INITIALIZATIONS*/
  const { setAllBlogs, setChosenMember } = actionDispatch(useDispatch());
  const { allBlogs } = useSelector(allBlogsRetriever);
  const { chosenMember } = useSelector(chosenMemberRetriever);
  const pathname = useLocation();
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    scrollTop();
  }, [pathname]);
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [openFollow, setOpenFollow] = useState<boolean>(false);
  const [blogRebuild, setBlogRebuild] = useState<Date>(new Date());
  const [user, setUser] = useState<Member>(verifiedMemberData);
  const [followCase, setFollowCase] = useState<string>("");
  const userImage = chosenMember?.mb_image
    ? `${serverApi}/${chosenMember?.mb_image}`
    : "/icons/default_user.svg";
  const style_create = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "#fff",
    boxShadow: 24,
    borderRadius: "10px",
    p: 2,
    display: "flex",
    justifyContent: "center",
  };
  const [followRebuild, setFollowRebuild] = useState<Date>(new Date());
  const [searchBlogObject, setSearchBlogObject] = useState<BlogSearchObj>({
    page: 1,
    limit: 10,
    mb_id: "all",
  });
  const [blogs, setBlogs] = useState<boolean>(false);
  useEffect(() => {
    const blogService = new BlogApiService();
    blogService
      .getAllBlogs(searchBlogObject)
      .then((data) => setAllBlogs(data))
      .catch((err) => console.log(err));
  }, [searchBlogObject, blogRebuild]);

  useEffect(() => {
    if (verifiedMemberData?._id) {
      const memberService = new MemberApiService();
      memberService
        .getChosenMember(user?._id)
        .then((data) => setChosenMember(data))
        .catch((err) => console.log(err));
    }
  }, [user]);

  /*HANDLERS*/
  const paginationHandler = (event: any, value: number) => {
    searchBlogObject.page = value;
    setSearchBlogObject({ ...searchBlogObject });
    scrollTop();
  };
  const myBlogsHandler = () => {
    setBlogs(true);
    if (chosenMember?._id === verifiedMemberData?._id) {
      setSearchBlogObject({
        page: 1,
        limit: 10,
        mb_id: "none",
      });
    } else {
      setSearchBlogObject({
        page: 1,
        limit: 10,
        mb_id: chosenMember?._id || "all",
      });
    }
  };
  const allBlogsHandler = () => {
    setBlogs(false);
    setSearchBlogObject({
      page: 1,
      limit: 10,
      mb_id: "all",
    });
  };

  const userUpdate = async () => {
    try {
      const memberService = new MemberApiService();
      const data = await memberService.getChosenMember(chosenMember?._id);
      setChosenMember(data);
    } catch (err) {
      console.log(err);
    }
  };
  const followHandler = async (e: any) => {
    try {
      const blogService = new BlogApiService();
      await blogService.subscribeMember({ mb_id: e.target.id });
      userUpdate();
      sweetTopSmallSuccessAlert("followed successfully", 700, false);
      setFollowRebuild(new Date());
    } catch (err) {
      console.log(err);
    }
  };
  const unfollowHandler = async (e: any) => {
    try {
      const blogService = new BlogApiService();
      await blogService.unsubscribeMember({ mb_id: e.target.id });
      userUpdate();
      sweetTopSmallSuccessAlert("unfollowed successfully", 700, false);
      setFollowRebuild(new Date());
    } catch (err) {
      console.log(err);
    }
  };
  const showFollowersHandler = () => {
    setOpenFollow(true);
    setFollowCase("followers");
  };
  const showFollowingHandler = () => {
    setOpenFollow(true);
    setFollowCase("following");
  };

  /*MUI STYLES*/
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));
  return (
    <div className="blogs">
      {/* <Box
        sx={{ backgroundImage: "url(/images/header_img/blogs-page.jpg)" }}
        className="header_box"
      /> */}
      {/* <div className="mobile_note">
        Mobile version is on developing process. Please use laptop version
      </div> */}
      <Container className="blogs_page">
        {/* <Box className="dir_box">
          <Box onClick={() => navigate("/")} className="dir_link">
            <Home />
            <p>Home</p>
          </Box>
          <p className="link_div">/</p>
          <Box className="dir_link">
            <p className="before_icon">DaengGram</p>
            <Close onClick={() => navigate("/")} className="close" />
          </Box>
        </Box> */}
        <Stack className="main_box">
          {verifiedMemberData && (
            <Stack className="side_bar">
              <Box className="avatar_wrap">
                {verifiedMemberData._id === user._id && (
                  <Settings
                    className="setting_icon"
                    onClick={() => navigate("/profile")}
                  />
                )}
                {user._id === verifiedMemberData._id ? (
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                  >
                    <Avatar alt="user" src={userImage} className="avatar" />
                  </StyledBadge>
                ) : (
                  <Avatar alt="user" src={userImage} className="avatar" />
                )}
              </Box>
              <h4 className="user_name">{chosenMember?.mb_nick}</h4>
              <Box className="follow_box">
                <p onClick={showFollowersHandler} className="follow_text">
                  <span>{chosenMember?.mb_subscriber_count}</span>followers
                </p>
                <p onClick={showFollowingHandler} className="follow_text">
                  <span>{chosenMember?.mb_follow_count}</span>following
                </p>
                <Modal
                  open={openFollow}
                  onClose={() => setOpenFollow(false)}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <FollowList
                    followCase={followCase}
                    user={user}
                    unfollowHandler={unfollowHandler}
                    followRebuild={followRebuild}
                    followHandler={followHandler}
                  />
                </Modal>
              </Box>
              <Box className="icon_box">
                <a href="https://www.facebook.com/people/Sirojiddin-Samadov/pfbid021htWXCV3iAwbhpNsQfKv6vfjvBvCU6zux7fC4gnQZyM57BDFFS9Rpqyv6bJCSPHKl/">
                  <Facebook className="sns_icon" />
                </a>
                <a href="https://www.linkedin.com/in/sirojiddin-samadov-124985278/">
                  <LinkedIn className="sns_icon" />
                </a>
                <a href="https://www.instagram.com/sirojiddin_samadov_asn/">
                  <Instagram className="sns_icon" />
                </a>
                <a href="https://github.com/SirojAli">
                  <GitHub className="sns_icon" />
                </a>
                <a href="https://t.me/siroj_samadov">
                  <Telegram className="sns_icon" />
                </a>
              </Box>

              <p className="user_desc">
                Here to share stories, connect with friends, and make every blog
                count
                {chosenMember?.mb_description}
              </p>
              <Box className="btn_box">
                {chosenMember?._id === verifiedMemberData?._id ? (
                  <Button onClick={() => setOpen(true)} className="user_btn">
                    Create Blog
                  </Button>
                ) : chosenMember?.me_followed[0]?.my_following ? (
                  <Button
                    id={chosenMember?._id}
                    onClick={unfollowHandler}
                    className="user_btn"
                  >
                    Unfollow
                  </Button>
                ) : (
                  <Button
                    id={chosenMember?._id}
                    onClick={followHandler}
                    className="user_btn"
                  >
                    Follow
                  </Button>
                )}
                {blogs ? (
                  <Button onClick={allBlogsHandler} className="user_btn">
                    All Blogs
                  </Button>
                ) : (
                  <Button onClick={myBlogsHandler} className="user_btn">
                    {chosenMember?.mb_nick === verifiedMemberData?.mb_nick
                      ? "My Blogs"
                      : `${chosenMember?.mb_nick}'s posts`}
                  </Button>
                )}
                <Modal
                  open={open}
                  onClose={() => setOpen(false)}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style_create}>
                    <CreateBlog
                      setOpen={setOpen}
                      setBlogRebuild={setBlogRebuild}
                    />
                  </Box>
                </Modal>
              </Box>
              <Box className="follow_container"></Box>
            </Stack>
          )}
          <Stack className="main_posts">
            {allBlogs.map((post) => {
              return (
                <Postcard
                  key={post?._id}
                  cartData={post}
                  setBlogRebuild={setBlogRebuild}
                  blogRebuild={blogRebuild}
                  setUser={setUser}
                />
              );
            })}
            <Pagination
              count={searchBlogObject.page >= 3 ? searchBlogObject.page + 1 : 3}
              page={searchBlogObject.page}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBack,
                    next: ArrowForward,
                  }}
                  {...item}
                />
              )}
              onChange={paginationHandler}
            />
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
