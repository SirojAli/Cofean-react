import { Box, Link } from "@mui/material";
import React from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Checkbox from "@mui/material/Checkbox";
import moment from "moment";
import RemovedRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { BoArticle } from "../../../types/boArticle";
import { serverApi } from "../../../lib/config";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import { verifiedMemberData } from "../../apiServices/verify";

export function MemberPosts(props: any) {
  const {
    chosenMemberBoArticles,
    renderChosenArticleHandler,
    setArticlesRebuild,
  } = props;

  /** HANDLERS **/

  // targetLikeHandler
  const targetLikeHandler = async (e: any) => {
    try {
      e.stopPropagation();
      assert.ok(verifiedMemberData, Definer.auth_err1);

      const memberService = new MemberApiService();
      const like_result = await memberService.memberLikeTarget({
        like_ref_id: e.target.id,
        group_type: "community",
      });

      assert.ok(like_result, Definer.general_err1);
      await sweetTopSmallSuccessAlert("success", 700, false);

      setArticlesRebuild(new Date());
    } catch (err: any) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <Box className="post_container">
      {chosenMemberBoArticles.map((article: BoArticle) => {
        const image_path = article.art_image
          ? `${serverApi}/${article.art_image}`
          : "/community/default_art_photo.svg";
        return (
          <Link
            className={"article_box"}
            sx={{ cursor: "pointer" }}
            onClick={() => renderChosenArticleHandler(article?._id)}
          >
            {/* for article photo  */}
            <Box
              className={"all_art_img"}
              sx={{
                backgroundImage: `url(${image_path})`,
              }}
            ></Box>

            {/* for article container  */}
            <Box className={"all_art_container"}>
              {/* 1: for art_user_info */}
              <Box className={"art_user_info"}>
                <img
                  src={
                    article.member_data?.mb_image
                      ? `${serverApi}/${article.member_data.mb_image}`
                      : "/auth/default_user.svg"
                  }
                />
                <span className={"art_user_name"}>
                  {article.member_data.mb_nick}
                </span>
              </Box>
              {/* 2: art_info */}
              <Box className={"art_info"}>
                <span className={"art_info_title"}>{article?.bo_id}</span>
                <p className={"art_info_desc"}>{article?.art_subject}</p>
              </Box>
              {/* 3: art date & likes & views */}
              <Box className={"art_date_views"}>
                <span className={"art_date"}>
                  {moment(article?.createdAt).format("YY-DD-MM HH:MM")}
                </span>
                <div className={"art_date_box"}>
                  <div className={"art_likes"}>
                    <Checkbox
                      // {...label}
                      icon={<FavoriteBorder />}
                      id={article._id}
                      checkedIcon={<Favorite style={{ color: "red" }} />}
                      /*@ts-ignore*/
                      checked={
                        article?.me_liked && article.me_liked[0]?.my_favorite
                          ? true
                          : false
                      }
                      onClick={targetLikeHandler}
                    />
                    <span>{article?.art_likes}</span>
                  </div>
                  <div className={"art_views"}>
                    <RemovedRedEyeIcon sx={{ mr: "10px" }} />
                    <span>{article?.art_views}</span>
                  </div>
                </div>
              </Box>
            </Box>
          </Link>
        );
      })}
    </Box>
  );
}
