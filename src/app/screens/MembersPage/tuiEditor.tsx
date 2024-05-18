import React, { useRef, useState, useCallback } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Stack,
  Typography,
  Select,
  TextField,
} from "@mui/material";
import BlogApiService from "../../apiServices/blogApiService";
import { BlogInput } from "../../../types/blog";
import { serverApi } from "../../../lib/config";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import assert from "assert";
import { Definer } from "../../../lib/definer";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

export const TuiEditor = (props: any) => {
  /** INITIALIZATIONS **/
  const navigate = useNavigate();
  const editorRef = useRef([]);

  const dispatch = useDispatch();

  const [blogData, setBlogData] = useState<BlogInput>({
    blog_subject: "",
    blog_content: "",
    blog_image: "",
    blog_types: "",
  });

  /** HANDLERS **/
  const uploadImageHandler = async (image: any) => {
    try {
      const blogService = new BlogApiService();
      const image_name = await blogService.uploadImageToServer(image);

      blogData.blog_image = image_name;
      setBlogData({ ...blogData });

      const source = `${serverApi}/${image_name}`;
      return source;
    } catch (err) {
      console.log(`ERROR, uploadImage >>> ${err}`);
    }
  };

  const changeCategoryHandler = async (e: any) => {
    blogData.blog_types = e.target.value;
    setBlogData({ ...blogData });
  };

  // const changeTitleHandler = async (e: any) => {
  //   blogData.blog_subject = e.target.value;
  //   setBlogData({ ...blogData });
  // };

  const changeTitleHandler = useCallback(
    (e: any) => {
      blogData.blog_subject = e.target.value;
      setBlogData({ ...blogData });
    },
    [blogData.blog_subject]
  );

  const submitBlogHandler = async () => {
    try {
      const editor: any = editorRef.current;
      const blog_content = editor?.getInstance().getHTML();
      console.log("blog_content >>>", blog_content);

      blogData.blog_content = blog_content;
      console.log("blogData >>>", blogData);

      assert.ok(
        blogData.blog_content !== "" &&
          blogData.blog_types !== "" &&
          blogData.blog_subject !== "",
        Definer.input_err1
      );

      const blogService = new BlogApiService();
      await blogService.createBlog(blogData);
      await sweetTopSmallSuccessAlert("Article is created successfully!");

      props.setArticlesRebuild(new Date());
      props.setValue("1");
    } catch (err) {
      console.log(`ERROR, handleRegisterButton >>> ${err}`);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <Stack>
      <Stack
        direction={"row"}
        style={{ margin: "40px", justifyContent: "space-evenly" }}
      >
        <Box className="form_row">
          <Typography
            variant="h3"
            style={{ color: "rgb(255, 255, 233)", margin: "10px" }}
          >
            Category
          </Typography>
          <FormControl sx={{ width: "300px", background: "#fff" }}>
            <Select
              value={blogData.blog_types}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              onChange={changeCategoryHandler}
            >
              <MenuItem value="">
                <span>Category tanlang</span>
              </MenuItem>
              <MenuItem value="celebrity">Mashhurlar</MenuItem>
              <MenuItem value="evaluation">Restaurant baho</MenuItem>
              <MenuItem value="story">Mening Hikoyam</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box className="form_row" style={{ width: "300px" }}>
          <Typography
            variant="h3"
            style={{ color: "rgb(255, 255, 233)", margin: "10px" }}
          >
            Mavzu
          </Typography>
          <TextField
            id="filled-basic"
            label="Mavzu"
            variant="filled"
            style={{ width: "300px", background: "white" }}
            onChange={changeTitleHandler}
          />
        </Box>
      </Stack>
      {/* @ts-ignore */}
      <Editor
        ref={editorRef}
        initialValue="Type here"
        placeholder="Type here"
        previewStyle="vertical"
        height="640px"
        initialEditType="WYSIWYG"
        toolbarItems={[
          ["heading", "bold", "italic", "strike"],
          ["image", "table", "link"],
          ["ul", "ol", "task"],
        ]}
        hooks={{
          addImageBlobHook: async (image: any, callback: any) => {
            const uploadImageUrl = await uploadImageHandler(image);
            console.log("uploadImageUrl >>>", uploadImageUrl);
            callback(uploadImageUrl);
            return false;
          },
        }}
        events={{
          load: function (param: any) {},
        }}
      />
      <Stack direction={"row"} justifyContent={"center"}>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "30px", width: "250px", height: "45px" }}
          onClick={submitBlogHandler}
        >
          Register
        </Button>
      </Stack>
    </Stack>
  );
};
