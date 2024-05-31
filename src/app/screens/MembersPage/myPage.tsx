import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Container, Pagination, Stack, Tab } from "@mui/material";
import { TabContext } from "@mui/lab";
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
import { setChosenMember, setChosenMemberBlogs } from "./slice";
import { setChosenBlog } from "../BlogPage/slice";
import {
  sweetErrorHandling,
  sweetFailureProvider,
} from "../../../lib/sweetAlert";
import BlogApiService from "../../apiServices/blogApiService";
import MemberApiService from "../../apiServices/memberApiService";
import { Member } from "../../../types/user";
import { Blog, SearchMemberBlogsObj } from "../../../types/blog";
import { retrieveChosenMember, retrieveChosenMemberBlogs } from "./selector";
import { retrieveChosenBlog } from "../BlogPage/selector";
import { Header } from "./header";
import "../../../scss/blog.scss";
import "../../../scss/members.scss";
import { verifiedMemberData } from "../../apiServices/verify";
// import { TuiEditor } from "./tuiEditor";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { CreateBlog } from "./createBlog";

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

  const dispatch = useDispatch();

  const [value, setValue] = useState("1");
  const [blogRebuild, setBlogRebuild] = useState<Date>(new Date());
  const [followRebuild, setFollowRebuild] = useState(false);
  const [createPost, setCreatePost] = useState(false);
  const [blogCreated, setBlogCreated] = useState(false);

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
    setCreatePost(true);
    setBlogCreated(false);
  };

  const blogCreatedHandler = () => {
    setCreatePost(false);
    setBlogCreated(true);
  };

  const viewBlogsHandler = () => {
    setValue("1");
    setBlogCreated(false);
  };

  return (
    <div className="members_page">
      <Header />
      <Container className="my_page_box">
        <Stack className="my_page_frame">
          <TabContext value={createPost ? "create" : "view"}>
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
                  Here to share stories, connect with friends, and make every
                  post count
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
                      View all posts
                    </Button>
                  ) : (
                    <Button className="blog_btn" onClick={() => setValue("1")}>
                      View all posts
                    </Button>
                  )}
                </div>
              </Box>
            </Stack>
            {/* Create Blog Section */}
            {createPost && (
              <Box className="editor_wrapper" sx={{ margin: 0 }}>
                <CreateBlog
                  ref={editorRef}
                  initialValue="Write something amazing..."
                  initialEditType="markdown"
                  previewStyle="vertical"
                  useCommandShortcut={true}
                  className="custom-editor"
                  setBlogRebuild={setBlogRebuild}
                  setValue={setValue}
                  onBlogCreated={blogCreatedHandler}
                />
                {/* <Button
                  className="blog_btn"
                  onClick={saveBlogHandler}
                  variant="contained"
                  style={{
                    backgroundColor: "#f98404",
                    width: "150px",
                    marginLeft: "300px",
                  }}
                >
                  Save post
                </Button> */}
              </Box>
            )}
            {/* Left Section: All Blogs */}
            {!createPost && (
              <Stack className="my_page_left">
                <div className="blog_title">
                  <span>{`${verifiedMemberData?.mb_nick}'s all posts`}</span>
                </div>
                <Box className="all_blogs">
                  {/* Check if chosenMemberBlogs is not empty before mapping */}
                  {chosenMemberBlogs.length > 0 ? (
                    chosenMemberBlogs.map((blog) => (
                      <div className="blog_box" key={blog._id}>
                        <img
                          className="blog_img"
                          src={
                            Array.isArray(blog?.blog_image) &&
                            blog.blog_image.length > 0
                              ? blog.blog_image[0]
                              : "/images/blog/default_image.png"
                          }
                          alt={blog?.blog_title}
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
                          <span>{blog.blog_title}</span>
                        </Box>
                        <Box
                          className="context"
                          dangerouslySetInnerHTML={{
                            __html: blog.blog_content,
                          }}
                        />
                        <Box className="read">
                          <span onClick={() => chosenBlogHandler(blog._id)}>
                            Read more...
                          </span>
                        </Box>
                      </div>
                    ))
                  ) : (
                    <div>No blogs found</div>
                  )}
                  <Stack className="pagination" spacing={2}>
                    <Stack className="pagination" spacing={2}>
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
              </Stack>
            )}
          </TabContext>
        </Stack>
      </Container>
    </div>
  );
}
