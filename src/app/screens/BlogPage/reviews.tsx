import { MapsUgcOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, TextField } from "@mui/material";
import { Dropdown } from "antd";
import React, { useState } from "react";

// REDUX
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setBlogReviews } from "./slice";
import { retrieveBlogReviews } from "./selector";

import ReviewApiService from "../../../app/apiServices/reviewApiService";
import { Review } from "../../../types/review";
import {
  sweetErrorHandling,
  sweetFailureProvider,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import { Definer } from "../../../lib/definer";
import { verifiedMemberData } from "../../../app/apiServices/verify";
import assert from "assert";
import Moment from "react-moment";
import { serverApi } from "../../../lib/config";
// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setBlogReviews: (data: Review[]) => dispatch(setBlogReviews(data)),
});
// REDUX SELECTOR
const blogReviewsRetriever = createSelector(
  retrieveBlogReviews,
  (blogReviews) => ({
    blogReviews,
  })
);

const Reviews = ({ blogId, setBlogRebuild }: any) => {
  /*INITIALIZATIONS*/
  const { setBlogReviews } = actionDispatch(useDispatch());
  const { blogReviews } = useSelector(blogReviewsRetriever);
  const [textValue, setTextValue] = useState<string>("");

  /*HANDLERS*/
  const commentHandler = async () => {
    try {
      const reviewService = new ReviewApiService();
      const result = await reviewService.getTargetReviews({
        page: 1,
        limit: 20,
        review_ref_id: blogId,
      });
      setBlogReviews(result);
      setBlogRebuild(new Date());
    } catch (err) {
      console.log(err);
    }
  };

  const submitHandler = async () => {
    try {
      assert.ok(verifiedMemberData, Definer.auth_err1);
      const reviewService = new ReviewApiService();
      await reviewService.createReview({
        review_ref_id: blogId,
        group_type: "blog",
        title: textValue,
      });
      await sweetTopSmallSuccessAlert("success", 700, false);
      setTextValue("");
      setBlogRebuild(new Date());
      commentHandler();
    } catch (err) {
      console.log(err);
      textValue === ""
        ? sweetFailureProvider(Definer.input_err1)
        : sweetFailureProvider(Definer.general_err1);
    }
  };

  return (
    <Dropdown
      trigger={["click"]}
      className="account_dropdown"
      placement="bottomLeft"
      overlayClassName="shopcart_root"
      dropdownRender={(menu) => (
        <Box className="comment_container">
          <Box className="comment_wrap">
            {blogReviews.map((review) => {
              const avatar_img = review.member_data?.mb_image
                ? `${serverApi}/${review.member_data?.mb_image}`
                : "/icons/default_user.svg";
              return (
                <Box key={review._id} className="comment_item">
                  <Box className="commentor_wrap">
                    <Avatar src={avatar_img} alt="comment" />
                    <Box className="text_wrap">
                      <Box className="user_name_wrap">
                        <p className="commentor_name">
                          {review.member_data?.mb_nick}
                        </p>
                        <p className="comment_time">
                          • <Moment fromNow>{review.createdAt}</Moment>
                        </p>
                      </Box>
                      <p className="comment_content">{review.content}</p>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
          <Box className="comment_input">
            <TextField
              className="comment_textfield"
              id="standard-basic"
              label="Add a comment"
              variant="standard"
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
            />
            <Button onClick={submitHandler} className="post_btn">
              post
            </Button>
          </Box>
        </Box>
      )}
    >
      <MapsUgcOutlined onClick={commentHandler} className="post_icon" />
    </Dropdown>
  );
};

export default Reviews;
