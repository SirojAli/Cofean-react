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

  const { setBlogRebuild, setValue } = props;

  const [blogData, setBlogData] = useState<BlogInput>({
    blog_title: "",
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
  //   blogData.blog_title = e.target.value;
  //   setBlogData({ ...blogData });
  // };

  const changeTitleHandler = useCallback(
    (e: any) => {
      blogData.blog_title = e.target.value;
      setBlogData({ ...blogData });
    },
    [blogData.blog_title]
  );

  // const submitBlogHandler = async () => {
  //   try {
  //     const editor: any = editorRef.current;
  //     const blog_content = editor?.getInstance().getHTML();
  //     console.log("blog_content >>>", blog_content);

  //     blogData.blog_content = blog_content;
  //     console.log("blogData >>>", blogData);

  //     assert.ok(
  //       blogData.blog_types !== "" &&
  //         blogData.blog_title !== "" &&
  //         blogData.blog_image !== "" &&
  //         blogData.blog_content !== "",
  //       Definer.input_err1
  //     );

  //     const blogService = new BlogApiService();
  //     await blogService.createBlog(blogData);
  //     await sweetTopSmallSuccessAlert("Blog is created successfully!");

  //     setBlogRebuild(new Date());
  //     setValue("1");
  //     navigate("/member");
  //   } catch (err) {
  //     console.log(`ERROR, handleRegisterButton >>> ${err}`);
  //     sweetErrorHandling(err).then();
  //   }
  // };

  const submitBlogHandler = async () => {
    try {
      console.log("Submitting blog post...");

      const editor: any = editorRef.current;
      const blog_content = editor?.getInstance().getHTML();
      // console.log("blog_content >>>", blog_content);

      blogData.blog_content = blog_content;
      // console.log("blogData >>>", blogData);

      assert.ok(
        blogData.blog_types !== "" &&
          blogData.blog_title !== "" &&
          blogData.blog_image !== "" &&
          blogData.blog_content !== "",
        Definer.input_err1
      );

      // console.log("Creating blog post >>>");
      const blogService = new BlogApiService();
      await blogService.createBlog(blogData);
      console.log("Blog post created successfully!");

      await sweetTopSmallSuccessAlert("Blog is created successfully!");

      // console.log("Updating state variables >>>");
      setBlogRebuild(new Date());
      setValue("1");
      navigate("/blogs");
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
          {/* <Typography variant="h3" style={{ color: "black", margin: "10px" }}>
            Category
          </Typography> */}
          <FormControl sx={{ width: "300px", background: "#fff" }}>
            <Select
              value={blogData.blog_types}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              onChange={changeCategoryHandler}
            >
              <MenuItem value="">
                <span>Choose Category</span>
              </MenuItem>
              <MenuItem value="news">News</MenuItem>
              <MenuItem value="evaluation">Evaluation</MenuItem>
              <MenuItem value="story">Story</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box className="form_row" style={{ width: "300px" }}>
          {/* <Typography variant="h3" style={{ color: "black", margin: "10px" }}>
            Mavzu
          </Typography> */}
          <TextField
            id="filled-basic"
            label="Blog Title"
            variant="filled"
            style={{ width: "300px", background: "white" }}
            onChange={changeTitleHandler}
          />
        </Box>
      </Stack>
      {/* @ts-ignore */}
      <Editor
        ref={editorRef}
        initialValue="Type here..."
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
        hideModeSwitch={true} // This will hide the mode switch button
      />

      <Stack direction={"row"} justifyContent={"center"}>
        <Button
          variant="contained"
          color="primary"
          style={{
            margin: "30px",
            width: "250px",
            height: "45px",
            backgroundColor: "#f98404",
          }}
          onClick={submitBlogHandler}
        >
          Register
        </Button>
      </Stack>
    </Stack>
  );
};
