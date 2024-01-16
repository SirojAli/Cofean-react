import React from "react";
import { Box, Link, Stack } from "@mui/material";
import RemovedRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Checkbox from "@mui/material/Checkbox";
import moment from "moment";
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

export function TargetArticles(props: any) {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  // alert(props.test);
  const { setArticlesRebuild } = props;

  /*HANDLERS*/
  const targetLikeHandler = async (e: any) => {
    try {
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
    <Stack className="article_wrap">
      {props.targetBoArticles?.map((article: BoArticle) => {
        const art_img_url = article?.art_image
          ? `${serverApi}/${article.art_image}`
          : "/community/cute_girl.jpg";
        return (
          <Link
            className={"article_box"}
            href={`/member-page/other?mb_id=${article.mb_id}&art_id=${article._id}`}
          >
            {/* for article photo  */}
            <Box
              className={"all_art_img"}
              sx={{ backgroundImage: `url(${art_img_url})` }}
            ></Box>

            {/* for article container  */}
            <Box className={"all_art_container"}>
              {/* 1: for art_user_info */}
              <Box className={"art_user_info"}>
                <img src={"/auth/default_user.svg"} />
                <span className={"art_user_name"}>
                  {article?.member_data.mb_nick}
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
                  {moment().format("YY-DD-MM HH:MM")}
                </span>
                <div className={"art_date_box"}>
                  <div className={"art_likes"}>
                    <Checkbox
                      // sx={{ ml: "40px" }}
                      {...label}
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite style={{ color: "red" }} />}
                      id={article?._id}
                      onClick={targetLikeHandler}
                      /*@ts-ignore*/
                      checked={
                        article?.me_liked && article.me_liked[0]?.my_favorite
                          ? true
                          : false
                      }
                    />
                    <span style={{ marginRight: "18px" }}>
                      {article?.art_likes}
                    </span>
                    <RemovedRedEyeIcon />
                    <span style={{ marginLeft: "18px" }}>
                      {article?.art_views}
                    </span>
                  </div>
                </div>
              </Box>
            </Box>
          </Link>
        );
      })}
    </Stack>
  );
}
