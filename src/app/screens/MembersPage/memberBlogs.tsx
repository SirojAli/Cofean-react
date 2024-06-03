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
import { setChosenMember, setChosenMemberBlogs, setChosenBlog } from "./slice";
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

const truncateText = (
  text: string,
  maxLength: 150,
  blogId: any,
  onReadMore: (blogId: any) => void
) => {
  if (text.length <= maxLength) return text;
  const truncatedText = text.substr(0, maxLength);
  const lastSpaceIndex = truncatedText.lastIndexOf(" ");
  const truncatedWithEllipsis = `${truncatedText.substr(0, lastSpaceIndex)}...`;

  return (
    <>
      <span dangerouslySetInnerHTML={{ __html: truncatedWithEllipsis }} />
      <a
        href="#"
        style={{ fontWeight: "bold" }}
        onClick={(e) => {
          e.preventDefault();
          onReadMore(blogId);
        }}
      >
        Read more...
      </a>
    </>
  );
};

export function MemberBlogs(props: any) {
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
  const renderChosenBlogHandler = async (blog_id: any) => {
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
    <Stack className="my_page_left" style={{ margin: "0" }}>
      {/* <div className="blog_title">
        <span>{`${verifiedMemberData?.mb_nick}'s all blogs`}</span>
      </div> */}
      <Box className="all_blogs">
        {chosenMemberBlogs.length > 0 ? (
          chosenMemberBlogs.map((blog) => (
            <div className="blog_box" key={blog._id}>
              <img
                className="blog_img"
                src={
                  Array.isArray(blog?.blog_image) && blog.blog_image.length > 0
                    ? blog.blog_image[0]
                    : "/public/images/blog/default_image.png"
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
              <Box className="context">
                {truncateText(
                  blog.blog_content,
                  150,
                  blog._id,
                  renderChosenBlogHandler
                )}
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
  );
}
