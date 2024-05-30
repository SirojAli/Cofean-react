import { CloudUpload } from "@mui/icons-material";
import React, { useRef, useState, useCallback } from "react";
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
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

export const CreateBlog = (props: any) => {
  /*INITIALIZATIONS*/
  const editorRef = useRef([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { setBlogRebuild, setValue } = props;
  const [img, setImg] = useState<string>("/images/blog/c1.png");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const [blogData, setBlogData] = useState<BlogInput>({
    blog_title: "",
    blog_content: "",
    blog_types: "",
    blog_image: null,
  });

  //HANDLERS
  const titleHandler = (e: any) => {
    setTitle(e.target.value);
    blogData.blog_title = e.target.value;
    setBlogData({ ...blogData });
  };

  const changeCategoryHandler = async (e: any) => {
    blogData.blog_types = e.target.value;
    setBlogData({ ...blogData });
  };

  const contentHandler = () => {
    // @ts-ignore
    const editorInstance = editorRef.current?.getInstance();
    const editorContent = editorInstance?.getMarkdown() || "";
    setContent(editorContent);
    setBlogData({ ...blogData, blog_content: editorContent });
  };

  const imageUploadHandler = (e: any) => {
    try {
      const file = e.target.files[0];
      const fileType = file["type"];
      const validTypes = ["image/jpg", "image/jpeg", "image/png"];
      assert.ok(validTypes.includes(fileType) && file, Definer.input_err2);
      setBlogData({ ...blogData, blog_image: [file] });
      setImg(URL.createObjectURL(file));
    } catch (err) {
      console.log(`ERROR imageUploadHandler >>> ${err}`);
      sweetErrorHandling(err).then();
    }
  };

  const submitBlogHandler = async () => {
    try {
      console.log("Submitting blog >>>");

      const editor: any = editorRef.current;
      const blog_content = editor?.getInstance().getHTML();
      blogData.blog_content = blog_content;
      console.log("blogData >>>", blogData);

      assert.ok(
        blogData.blog_types !== "" &&
          blogData.blog_title !== "" &&
          blogData.blog_content !== "" &&
          blogData.blog_image !== null,
        Definer.input_err1
      );

      console.log("Creating blog post >>>");
      const blogService = new BlogApiService();
      await blogService.createBlog(blogData);
      console.log("Blog post created successfully!");
      await sweetTopSmallSuccessAlert("Blog is created successfully!");

      console.log("Updating state variables >>>");
      setBlogRebuild(new Date());
      setValue("1");
      navigate("/blogs");
    } catch (err) {
      console.log(`ERROR, submitBlogHandler >>> ${err}`);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <Stack
      className="blog_section"
      sx={{
        width: "700px",
        height: "600px",
        background: "#fff",
        border: "1px solid red",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginBottom: "20px",
        }}
      >
        <TextField
          style={{ width: "70%", background: "#fff", marginRight: "10px" }}
          id="outlined-basic"
          label="Blog Title"
          variant="outlined"
          value={title}
          className="input_title"
          onChange={titleHandler}
        />
        <FormControl sx={{ width: "30%", background: "#fff" }}>
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
      </div>
      {/* @ts-ignore */}
      <Editor
        ref={editorRef}
        initialValue="Type here..."
        placeholder="Type here"
        previewStyle="vertical"
        height="250px"
        initialEditType="WYSIWYG"
        toolbarItems={[
          ["heading", "bold", "italic", "strike"],
          ["table", "link"],
          ["ul", "ol", "task"],
        ]}
        // hooks={{
        //   addImageBlobHook: async (image: any, callback: any) => {
        //     const uploadImageUrl = await uploadImageHandler(image);
        //     console.log("uploadImageUrl >>>", uploadImageUrl);
        //     callback(uploadImageUrl);
        //     return false;
        //   },
        // }}
        // events={{
        //   load: function (param: any) {},
        // }}
        hideModeSwitch={true}
        onChange={contentHandler}
      />

      <Box
        className="upload_box"
        style={{
          width: "100%",
          height: "200px",
          // border: "1px solid red",
          marginTop: "10px",
        }}
      >
        <h4
          className="upload_title"
          style={{
            width: "100%",
            height: "40px",
            // border: "1px solid green",
            margin: "0",
          }}
        >
          Upload image
        </h4>
        <div
          style={{
            width: "auto",
            height: "120px",
            // border: "1px solid red",
            display: "flex",
            flexDirection: "row",
            textAlign: "center",
          }}
        >
          <label htmlFor="file-input" style={{ minWidth: "0" }}>
            <Button component="label">
              <CloudUpload
                style={{
                  width: "70px",
                  height: "50px",
                  marginRight: "50px",
                  // border: "1px solid red",
                }}
                className="img_icon"
              />
              <input
                id="file-input"
                type="file"
                hidden
                onChange={imageUploadHandler}
              />
            </Button>
          </label>
          <img
            src={img}
            style={{
              width: "140px",
              height: "100%",
              border: "1px solid grey",
              borderRadius: "10px",
            }}
            className="image_box"
            alt="post"
          />
        </div>
      </Box>

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
