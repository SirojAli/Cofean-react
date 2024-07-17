import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Container, TextField } from "@mui/material";
import { Avatar, Input } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { verifiedMemberData } from "../../apiServices/verify";
import assert from "assert";
import { Definer } from "../../../lib/definer";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import MemberApiService from "../../apiServices/memberApiService";
import "../../../scss/account.scss";
import { AddAPhoto } from "@mui/icons-material";

export function MyProfile() {
  /** INITIALIZATIONS */
  const pathname = useLocation();
  const navigate = useNavigate();
  const [file, setFile] = useState(verifiedMemberData?.mb_image);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    scrollTop();
  }, [pathname]);
  const [memberUpdate, setMemberUpdate] = useState<any>({
    mb_nick: "",
    mb_email: "",
    mb_phone: "",
    mb_address: "",
    mb_description: "",
    mb_image: "",
  });

  // HANDLERS
  const changeUsernameHandler = (e: any) => {
    memberUpdate.mb_nick = e.target.value;
    setMemberUpdate({ ...memberUpdate });
  };
  const changeEmailHandler = (e: any) => {
    memberUpdate.mb_email = e.target.value;
    setMemberUpdate({ ...memberUpdate });
  };
  const changePhoneHandler = (e: any) => {
    memberUpdate.mb_phone = e.target.value;
    setMemberUpdate({ ...memberUpdate });
  };
  const changeAddressHandler = (e: any) => {
    memberUpdate.mb_address = e.target.value;
    setMemberUpdate({ ...memberUpdate });
  };
  const changeDescriptionHandler = (e: any) => {
    memberUpdate.mb_description = e.target.value;
    setMemberUpdate({ ...memberUpdate });
  };
  const imageHandler = (e: any) => {
    try {
      const file = e.target.files[0];
      const fileType = file["type"],
        validTypes = ["image/jpg", "image/jpeg", "image/png"];
      assert.ok(validTypes.includes(fileType) && file, Definer.input_err2);
      memberUpdate.mb_image = file;
      setMemberUpdate({ ...memberUpdate });
      setFile(URL.createObjectURL(file));
    } catch (err) {
      console.log(`ERROR >>> handleImagePreviewer ${err}`);
      sweetErrorHandling(err).then();
    }
  };

  const submitHandler = async (e: any) => {
    try {
      const memberService = new MemberApiService();
      const result = await memberService.updateMemberData(memberUpdate);
      assert.ok(result, Definer.general_err1);
      await sweetTopSmallSuccessAlert(
        "Information modified successfully",
        700,
        false
      );
      window.location.reload();
    } catch (err) {
      console.log(`ERROR >>> handleSubmitButton ${err}`);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <Container className="profile_container">
      <div className="account_set">
        <Box className="set_title">
          <span>Profile Settings</span>
        </Box>
        <div className="text_boxes">
          <Box className="info_box">
            <span className="span">Username</span>
            <Input
              type="text"
              placeholder={verifiedMemberData?.mb_nick}
              className="input"
              onChange={changeUsernameHandler}
              style={{
                background: "#F4F4F4",
                color: "#000",
                height: "40px",
                width: "80%",
                border: "1px solid grey",
                borderRadius: "5px",
              }}
            />
          </Box>

          <Box className="info_box">
            <span className="span">Email</span>
            <Input
              type="text"
              placeholder={verifiedMemberData?.mb_email}
              className="input"
              onChange={changeEmailHandler}
              style={{
                background: "#F4F4F4",
                color: "#000",
                height: "40px",
                width: "80%",
                border: "1px solid grey",
                borderRadius: "5px",
              }}
            />
          </Box>

          <Box className="info_box">
            <span className="span">Phone</span>
            <Input
              type="text"
              placeholder={verifiedMemberData?.mb_phone}
              className="input"
              onChange={changePhoneHandler}
              style={{
                background: "#F4F4F4",
                color: "#000",
                height: "40px",
                width: "80%",
                border: "1px solid grey",
                borderRadius: "5px",
              }}
            />
          </Box>

          <Box className="info_box">
            <span className="span">Address</span>
            <Input
              type="text"
              placeholder={verifiedMemberData?.mb_address}
              className="input"
              onChange={changeAddressHandler}
              style={{
                background: "#F4F4F4",
                color: "#000",
                height: "40px",
                width: "80%",
                border: "1px solid grey",
                borderRadius: "5px",
              }}
            />
          </Box>

          <Box className="info_box_desc">
            <span className="span">Description</span>
            <textarea
              className="desc"
              // name="blog"
              placeholder={verifiedMemberData?.mb_description}
              onChange={changeDescriptionHandler}
              rows={5}
              cols={33}
              style={{
                background: "#F4F4F4",
                color: "#000",
                height: "140px",
                width: "80%",
                border: "1px solid grey",
                borderRadius: "5px",
              }}
            ></textarea>
          </Box>

          <Box className="info_box_img">
            <span className="span">Picture</span>
            <Box className="upload_img">
              <img
                src={file || "/icons/user-profile-icon.svg"}
                alt="user profile"
              />
              <Button
                className="add_img_btn"
                // onChange={imageHandler}
                component="label"
                style={{ minWidth: "0" }}
              >
                <span>Change Photo</span>
                <input type="file" hidden onChange={imageHandler} />
              </Button>
            </Box>
          </Box>

          {/* <Box className="card_info">
            <span className="span">Account</span>
            <div className="card_info_boxes">
              <TextField
                // error={!!nickError}
                className="input_area"
                id="outlined-basic"
                label="Account Number"
                variant="outlined"
                // onChange={nameChangeHandler}
                size="small"
                // helperText={nickError}
                // value={nickName}
              />
              <div className="card2_box">
                <TextField
                  // error={!!nickError}
                  className="input_area"
                  id="outlined-basic"
                  label="Expire Date "
                  variant="outlined"
                  // onChange={nameChangeHandler}
                  size="small"
                  // helperText={nickError}
                  // value={nickName}
                />
                <TextField
                  // error={!!nickError}
                  className="input_area"
                  id="outlined-basic"
                  label="CVV "
                  variant="outlined"
                  // onChange={nameChangeHandler}
                  size="small"
                  // helperText={nickError}
                  // value={nickName}
                />
              </div>
              <TextField
                // error={!!nickError}
                className="input_area"
                id="outlined-basic"
                label="Sam William"
                variant="outlined"
                // onChange={nameChangeHandler}
                size="small"
                // helperText={nickError}
                // value={nickName}
              />
              <div className="card_types">
                <img className="card" src="/icons/western_union.svg" />
                <img className="card" src="/icons/master_card.png" />
                <img className="card" src="/icons/visa.png" />
                <img className="card" src="/icons/kakao.svg" />
                <img className="card" src="/icons/samsung1.svg" />
              </div>
            </div>
          </Box> */}
        </div>
        <Button className="save_btn" onClick={submitHandler}>
          <span>Save the Changes</span>
        </Button>
      </div>
    </Container>
  );
}
