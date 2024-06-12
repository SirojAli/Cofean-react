import { CloudUpload } from "@mui/icons-material";
import { Box, Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import BlogApiService from "../../apiServices/blogApiService";
import { serverApi } from "../../../lib/config";
import assert from "assert";
import { Definer } from "../../../lib/definer";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import "../../../scss/blog.scss";

const CreateBlog = ({ setOpen, setBlogRebuild }: any) => {
  /*INITIALIZATIONS*/
  const [img, setImg] = useState<string>("/images/blog/default_image.png");
  const [subject, setSubject] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [data, setData] = useState<any>({ blog_title: "", blog_content: "" });
  //HANDLERS
  const titleHandler = (e: any) => {
    setSubject(e.target.value);
    data.blog_title = e.target.value;
    setData({ ...data });
  };
  const contentHandler = (e: any) => {
    setContent(e.target.value);
    data.blog_content = e.target.value;
    setData({ ...data });
  };
  const imageHandler = (e: any) => {
    try {
      const file = e.target.files[0];
      const fileType = file["type"],
        validTypes = ["image/jpg", "image/jpeg", "image/png"];
      assert.ok(validTypes.includes(fileType) && file, Definer.input_err2);
      data.blog_image = file;
      setData({ ...data });
      setImg(URL.createObjectURL(file));
    } catch (err) {
      console.log(`ERROR >>> imageHandler ${err}`);
      sweetErrorHandling(err).then();
    }
  };

  const submitHandler = async () => {
    try {
      const memberService = new BlogApiService();
      const result = await memberService.createBlog(data);
      assert.ok(result, Definer.general_err1);
      setOpen(false);
      setBlogRebuild(new Date());
      await sweetTopSmallSuccessAlert("Blog created successfully", 700, false);
    } catch (err) {
      console.log(`ERROR >>> submitHandler ${err}`);
      sweetErrorHandling(err).then();
    }
  };
  return (
    <Stack className="modal_content">
      <h4>Create Blog</h4>
      <TextField
        id="outlined-basic"
        label="Blog Title"
        variant="outlined"
        value={subject}
        className="input_title"
        onChange={titleHandler}
      />
      <TextField
        id="outlined-multiline-static"
        label="Blog Content"
        multiline
        rows={6}
        value={content}
        className="input_content"
        onChange={contentHandler}
      />
      <Box className="upload_box">
        <p className="upload_title">Upload image</p>
        <Button
          onChange={imageHandler}
          component="label"
          style={{ minWidth: "0" }}
        >
          <CloudUpload className="img_icon" />
          <input type="file" hidden />
        </Button>
        <img src={img} className="image_box" alt="post" />
      </Box>
      <Button onClick={submitHandler} className="create_btn">
        Submit
      </Button>
    </Stack>
  );
};

export default CreateBlog;
