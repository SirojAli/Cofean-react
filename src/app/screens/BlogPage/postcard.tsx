import { Avatar, Box } from "@mui/material";
import React, { useRef, useState } from "react";
import Moment from "react-moment";
import { Favorite, FavoriteBorder, RemoveRedEye } from "@mui/icons-material";
import assert from "assert";
import { verifiedMemberData } from "../../../app/apiServices/verify";
import { Definer } from "../../../lib/definer";
import MemberApiService from "../../apiServices/memberApiService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import BlogApiService from "../../apiServices/blogApiService";
import { serverApi } from "../../../lib/config";
import Reviews from "./reviews";
const Postcard = ({ cartData, setBlogRebuild, blogRebuild, setUser }: any) => {
  /*INITIALIZATIONS*/
  const refs: any = useRef([]);
  const {
    _id,
    blog_title,
    blog_content,
    blog_image,
    blog_likes,
    blog_views,
    blog_reviews,
    createdAt,
    member_data,
    me_liked,
  } = cartData;
  const [open, setOpen] = useState<boolean>(false);
  const user_image = member_data?.mb_image
    ? `${serverApi}/${member_data.mb_image}`
    : "/icons/default_user.svg";
  const art_picture = `${serverApi}/${blog_image}`;
  const back_image = blog_image
    ? `${serverApi}/${blog_image}`
    : "/images/blogs/default_image.png";

  /*HANDLERS*/
  const targetLikeHandler = async (e: any, id: string) => {
    try {
      assert.ok(verifiedMemberData, Definer.auth_err1);
      const memberService = new MemberApiService();
      const data = { like_ref_id: id, group_type: "blog" };
      const like_result: any = await memberService.memberLikeTarget(data);
      assert.ok(like_result, Definer.general_err1);
      if (like_result.like_status > 0) {
        e.target.style.fill = "#FF3040";
        refs.current[like_result.like_ref_id].innerHTML++;
      } else {
        e.target.style.fill = "white";
        refs.current[like_result.like_ref_id].innerHTML--;
      }
      setBlogRebuild(new Date());
      await sweetTopSmallSuccessAlert("success", 700, false);
    } catch (err: any) {
      console.log("targetLikeArticle, ERROR >>>", err);
      sweetErrorHandling(err).then();
    }
  };

  const seenHandler = async (e: any) => {
    try {
      const blogService = new BlogApiService();
      await blogService.getChosenBlog(e.target.id);
      setOpen(true);
      setBlogRebuild(new Date());
    } catch (err: any) {
      console.log("getChosenBlog, ERROR >>>", err);
      sweetErrorHandling(err).then();
    }
  };
  const chooseMemberHandler = async () => {
    try {
      const memberService = new MemberApiService();
      const data = await memberService.getChosenMember(member_data._id);
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box key={_id} className="post_card">
      <Box className="auth_box">
        <Box onClick={chooseMemberHandler} className="user_info">
          <Avatar className="post_avatar" alt="user" src={user_image} />
          <h4 className="user_name">{member_data.mb_nick}</h4>
        </Box>
        <p className="post_time">
          • <Moment fromNow>{createdAt}</Moment>
        </p>
      </Box>
      <Box
        sx={{ backgroundImage: `url(${back_image})` }}
        className="img_swiper"
      >
        <Box className="inner_box">
          {blog_image && <img src={art_picture} alt="post" />}
        </Box>
      </Box>
      <Box className="main_bottom_wrap">
        <Box className="like_box">
          <Box className="left_icons">
            <Box className="num_col">
              {me_liked && me_liked[0]?.my_favorite ? (
                <Favorite
                  onClick={(e) => targetLikeHandler(e, _id)}
                  sx={{
                    fill: "#FF3040",
                  }}
                  className="post_icon"
                />
              ) : (
                <FavoriteBorder
                  onClick={(e) => targetLikeHandler(e, _id)}
                  className="post_icon"
                />
              )}
              <p ref={(element) => (refs.current[_id] = element)}>
                {blog_likes}
              </p>
            </Box>
            <Box className="num_col">
              <Reviews
                blogId={_id}
                setBlogRebuild={setBlogRebuild}
                blogRebuild={blogRebuild}
              />
              <p>{blog_reviews}</p>
            </Box>
          </Box>
          <Box className="num_col col_left ">
            <RemoveRedEye className="post_icon" />
            <p>{blog_views}</p>
          </Box>
        </Box>
        <Box className="article_box">
          <h4 className="article_title">{blog_title}</h4>

          <p
            style={open ? { height: "auto" } : { height: "20px" }}
            className="article_content"
          >
            {blog_content}
          </p>
          <p
            style={open ? { display: "none" } : { display: "block" }}
            className="sign_more"
          >
            ...
          </p>

          <p
            id={_id}
            style={open ? { display: "none" } : { display: "block" }}
            onClick={seenHandler}
            className="see_all"
          >
            Read more
          </p>
        </Box>
      </Box>
    </Box>
  );
};

export default Postcard;
