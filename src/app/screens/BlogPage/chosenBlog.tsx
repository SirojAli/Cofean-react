import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Rating,
  Stack,
  TextField,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import "../../../scss/blog.scss";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import PinterestIcon from "@mui/icons-material/Pinterest";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ReplyIcon from "@mui/icons-material/Reply";

export function ChosenBlog() {
  return (
    <div className="chosen_blog_box">
      <Container className="chosen_blog">
        <div className="blog_top">
          <div className="blog_top_box">
            <div className="top_texts">
              <Box className="text">
                <span>Recipe</span>
              </Box>
              <Box className="title">
                <div>
                  <span>
                    How coffee can help you stay motivated this winter
                  </span>
                </div>
              </Box>
              <Box className="author">
                <img src="/icons/default_user.svg" alt="" />
                <span className="by_author">By SirojAli Muhammad</span>
                <span className="dot"></span>
                <span className="time">5 min read</span>
                <span className="dot"></span>
                <span className="comments">3 comments</span>
              </Box>
            </div>
            <div className="top_img">
              <img src="/images/products/e6.jpg" alt="" />
            </div>
          </div>
        </div>

        <div className="blog_middle">
          <div className="main_blog">
            <div className="main_texts">
              <Box className="text">
                Being and staying well is on everyone’s mind right now
                considering the crazy times we live in with the global pandemic
                situation. In a nutshell, wellness is best defined as a state of
                being healthy in body and mind. Incorporating herbal teas for
                wellness goals in your everyday life is a great way to reduce
                stress, and get potential health benefits. Wellness teas are
                usually made from herbs, flowers, bark, or mushrooms and are
                quite easy to include in your daily routine. Partili enem amir.
                Cum soluta alteru, novut dicam te velid, vix ut des ert mltera
                indoctum. Ne sabeo legendo vel, ue duoris debet paulo vocibus,
                acc usata facilisis qui etui. Vivendo en reprehe ndunt his, ne
                igiure equidem vel. Singulis oratio mel, sea ei integredi disse
                ntias. In e vocent cetero omittam. Cum iuvaret deserui
                dissentiet at. Mei facete pertinax, at meliore sapientem
                deterruisset nam sumi tantas de nilidi. Vel case alterum
                senserit, vis harum graecis dissentias et. Ut vim impedit
                temporibus, eum in novum sensibus, rationi scriptorem.
              </Box>
              <Box className="tags">
                <span className="tag_name">Tags</span>
                <Box className="tag">
                  <span>Coffee</span>
                </Box>
                <Box className="tag">
                  <span>Latte</span>
                </Box>
                <Box className="tag">
                  <span>Americano</span>
                </Box>
              </Box>
            </div>

            <div className="share">
              <Box className="share_it">
                <div>
                  <FacebookIcon />
                </div>
                <span>Share</span>
              </Box>
              <Box className="share_it">
                <div>
                  <TwitterIcon />
                </div>
                <span>Tweet</span>
              </Box>
              <Box className="share_it">
                <div>
                  <PinterestIcon />
                </div>
                <span>Pin it</span>
              </Box>
            </div>

            <div className="about_author">
              <div className="author_img">
                <img src="/icons/default_user.svg" alt="" />
              </div>
              <div className="author_info">
                <span className="auth">Author</span>
                <span className="name">SirojAli Muhammad</span>
                <span className="desc">
                  A wonderful serenity has taken possession of my entire soul,
                  like these sweet mornings of spring which I enjoy with my
                  whole heart.
                </span>
              </div>
            </div>

            <div className="other_posts">
              <Box className="previous">
                <div>
                  <ArrowBackIcon className="icon" />
                  <span>previous post</span>
                </div>
                <span className="post_name">best event ticket deals</span>
              </Box>

              <Box className="next">
                <div>
                  <span>next post</span>
                  <ArrowForwardIcon className="icon" />
                </div>
                <span className="post_name">best event ticket deals</span>
              </Box>
            </div>
          </div>
        </div>

        <div className="blog_bottom">
          <div className="blog_bottom_box">
            <div className="commented">
              <span>3 Comments</span>

              <Box className="post">
                <div className="author_img">
                  <img src="/icons/default_user.svg" alt="" />
                </div>
                <div className="comment_info">
                  <div className="top_info">
                    <Box className="user_date">
                      <span className="name">SirojAli Muhammad</span>
                      <span className="date"> at 08:20am, 04/04/2024</span>
                    </Box>
                    <Box className="reply_btn">
                      <ReplyIcon className="icon" />
                      <span>Reply</span>
                    </Box>
                  </div>
                  <span className="com_text">
                    A wonderful serenity has taken possession of my entire soul,
                    like these sweet mornings of spring which I enjoy with my
                    whole heart.
                  </span>
                </div>
              </Box>

              <div className="reply">
                <div className="reply_box">
                  <div className="author_img">
                    <img src="/icons/default_user.svg" alt="" />
                  </div>
                  <div className="comment_info">
                    <div className="top_info">
                      <Box className="user_date">
                        <span className="name">Yusuf Alizoda</span>
                        <span className="date"> at 4:40am, 05/04/2024</span>
                      </Box>
                      <Box className="reply_btn">
                        <ReplyIcon className="icon" />
                        <span>Reply</span>
                      </Box>
                    </div>
                    <span className="com_text">
                      For me, the most important part of improving at
                      photography has been sharing it. Sign up for an Exposure
                      account, or post regularly to Tumblr, or both.
                    </span>
                  </div>
                </div>
              </div>

              <Box className="post">
                <div className="author_img">
                  <img src="/icons/default_user.svg" alt="" />
                </div>
                <div className="comment_info">
                  <div className="top_info">
                    <Box className="user_date">
                      <span className="name">SirojAli Muhammad</span>
                      <span className="date"> at 08:20am, 04/04/2024</span>
                    </Box>
                    <Box className="reply_btn">
                      <ReplyIcon className="icon" />
                      <span>Reply</span>
                    </Box>
                  </div>
                  <span className="com_text">
                    A wonderful serenity has taken possession of my entire soul,
                    like these sweet mornings of spring which I enjoy with my
                    whole heart.
                  </span>
                </div>
              </Box>
            </div>

            <div className="post_comment">
              <span>Leave a Comment</span>
              <div className="review_text">
                <textarea
                  className="blog"
                  name="blog"
                  rows={5}
                  cols={33}
                  style={{ background: "#F4F4F4", color: "#000" }}
                ></textarea>
              </div>
              <Button className="submit_btn">
                <span>Submit Review</span>
              </Button>
            </div>

            <div className="rel_posts">
              <span>Related Posts</span>
              <div className="blog_boxes">
                <Box className="event">
                  <img src="/images/products/e6.jpg" alt="" />
                  <div className="tags">
                    <span>Coffee</span>
                  </div>
                  <div className="title">
                    <span>
                      5 Reasons to Drink Americano 5 Reasons to Drink Americano
                    </span>
                  </div>
                  <div className="date">
                    <span>04/04/2024</span>
                  </div>
                </Box>

                <Box className="event">
                  <img src="/images/products/home1.jpg" alt="" />
                  <Box className="tags">
                    <div className="first">
                      <span>Coffee</span>
                    </div>
                  </Box>
                  <Box className="title">
                    <span>
                      5 Reasons to Drink Americano 5 Reasons to Drink Americano
                    </span>
                  </Box>
                  <Box className="date">
                    <span>08/04/2024</span>
                  </Box>
                </Box>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
