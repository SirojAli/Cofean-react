import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Container,
  Pagination,
  Modal,
  Stack,
  Tab,
} from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import { Settings } from "@mui/icons-material";
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
import {
  retrieveChosenMember,
  retrieveChosenMemberBlogs,
  retrieveChosenBlog,
} from "./selector";
import { setChosenMember, setChosenMemberBlogs, setChosenBlog } from "./slice";
import {
  sweetErrorHandling,
  sweetFailureProvider,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import BlogApiService from "../../apiServices/blogApiService";
import MemberApiService from "../../apiServices/memberApiService";
import { Member } from "../../../types/user";
import { Blog, SearchMemberBlogsObj } from "../../../types/blog";
import { Header } from "./header";
import "../../../scss/blog.scss";
import "../../../scss/members.scss";
import { verifiedMemberData } from "../../apiServices/verify";
// import { TuiEditor } from "./tuiEditor";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { CreateBlog } from "./createBlog";
import { ChosenBlogPage } from "./chosenBlog";
import { MemberBlogs } from "./memberBlogs";
import FollowList from "./followList";
import { serverApi } from "../../../lib/config";

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
  const editorRef = useRef<Editor>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [openFollow, setOpenFollow] = useState<boolean>(false);
  const dispatch = useDispatch();

  const { chosenMember } = useSelector(chosenMemberRetriever);

  const [value, setValue] = useState("1");
  const [blogRebuild, setBlogRebuild] = useState<Date>(new Date());
  const [followRebuild, setFollowRebuild] = useState<Date>(new Date());
  const [createBlog, setCreateBlog] = useState(false);
  const [blogCreated, setBlogCreated] = useState(false);
  const [user, setUser] = useState<Member>(verifiedMemberData);
  const [followCase, setFollowCase] = useState<string>("");
  const userImage = chosenMember?.mb_image
    ? `${serverApi}/${chosenMember?.mb_image}`
    : "/icons/default_user.jpg";

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

    blogService
      .getMemberBlogs(memberBlogSearchObj)
      .then((data) => dispatch(setChosenMemberBlogs(data)))
      .catch((err) => console.log(err));

    memberService
      .getChosenMember(verifiedMemberData._id)
      .then((data) => dispatch(setChosenMember(data)))
      .catch((err) => console.log(err));
  }, [memberBlogSearchObj, blogRebuild, followRebuild, dispatch]);

  /** HANDLERS **/
  const changeHandler = (event: any, newValue: any) => {
    setValue(newValue);
  };

  const paginationHandler = async (_: any, value: any) => {
    try {
      setMemberBlogSearchObj((prev) => ({ ...prev, page: value }));

      const blogService = new BlogApiService();
      const data = await blogService.getMemberBlogs({
        ...memberBlogSearchObj,
        page: value,
      });
      dispatch(setChosenMemberBlogs(data));
    } catch (error) {
      console.error("Pagination Error>>>", error);
    }
  };

  // renderChosenBlogHandler
  const renderChosenBlogHandler = async (blog_id: any) => {
    try {
      const blogService = new BlogApiService();
      blogService
        .getChosenBlog(blog_id)
        .then((data) => {
          dispatch(setChosenBlog(data));
          setValue("2");
          navigate(`/blogs/${blog_id}`);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const createBlogHandler = () => {
    setCreateBlog(true);
    setBlogCreated(false);
  };

  const blogCreatedHandler = () => {
    setCreateBlog(false);
    setBlogCreated(true);
  };

  const viewBlogsHandler = () => {
    setValue("1");
    setBlogCreated(false);
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

  return (
    <div className="members_page">
      {/* <Header /> */}
      <Container className="my_page_box">
        <Stack className="my_page_frame">
          <TabContext value={value}>
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
                <div className="social_media">
                  <FacebookIcon className="icon" />
                  <LinkedInIcon className="icon" />
                  <InstagramIcon className="icon" />
                  <GitHubIcon className="icon" />
                  <TelegramIcon className="icon" />
                </div>
                <p className="desc">
                  Here to share stories, connect with friends, and make every
                  blog count
                </p>

                <div className="blog_buttons">
                  <Button
                    className="blog_btn"
                    onClick={createBlogHandler}
                    variant="contained"
                  >
                    Create blog
                  </Button>
                  {blogCreated ? (
                    <Button className="blog_btn" onClick={viewBlogsHandler}>
                      View all blogs
                    </Button>
                  ) : (
                    <Button
                      className="blog_btn"
                      onClick={() => {
                        if (value === "create") {
                          setValue("1");
                        } else {
                          setCreateBlog(false); // Close the create blog component if open
                        }
                      }}
                    >
                      View all blogs
                    </Button>
                  )}
                </div>
              </Box>
            </Stack>

            <Stack className="my_page_left">
              <TabPanel value="1">
                <Box className="menu_name">My Blogs</Box>
                <Box className="menu_content">
                  <MemberBlogs
                    chosenMemberBlogs={chosenMemberBlogs}
                    renderChosenBlogHandler={renderChosenBlogHandler}
                    setBlogRebuild={setBlogRebuild}
                  />
                  <Stack
                    sx={{ my: "40px" }}
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Stack className="bottom_box" spacing={2}>
                      <Pagination
                        count={3}
                        page={memberBlogSearchObj.page}
                        variant="outlined"
                        shape="rounded"
                        onChange={paginationHandler}
                        boundaryCount={1}
                        siblingCount={0}
                      />
                    </Stack>
                  </Stack>
                </Box>
              </TabPanel>
              <TabPanel value="2">
                {/* <Box className="menu_name">Create Blog</Box> */}
                <Box className="menu_content">
                  <CreateBlog
                    setValue={setValue}
                    setBlogRebuild={setBlogRebuild}
                  />
                </Box>
              </TabPanel>
            </Stack>
          </TabContext>
        </Stack>
      </Container>
    </div>
  );
}
