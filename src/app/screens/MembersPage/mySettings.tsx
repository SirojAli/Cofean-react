import { CloudDownload } from "@mui/icons-material";
import { Box, Button, Stack } from "@mui/material";
import React, { useState } from "react";
import { verifiedMemberData } from "../../apiServices/verify";
import { MemberUpdateData } from "../../../types/user";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import MemberApiService from "../../apiServices/memberApiService";

export function MySettings(props: any) {
  /** INITIALIZATIONS */
  const [file, setFile] = useState(verifiedMemberData?.mb_image);
  const [memberUpdate, setMemberUpdate] = useState<MemberUpdateData>({
    mb_nick: "",
    mb_phone: "",
    mb_address: "",
    mb_description: "",
    mb_image: "",
  });

  /** HANDLERS */
  const changeNickHandler = (e: any) => {
    memberUpdate.mb_nick = e.target.value;
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

  const handleImagePreview = (e: any) => {
    try {
      // console.log("file-image >>>", e.target.files);
      const file = e.target.files[0];

      const fileType = file["type"];
      const validTypes = ["image/jpg", "image/jpeg", "image/png"];

      assert.ok(validTypes.includes(fileType) && file, Definer.input_err2);

      memberUpdate.mb_image = file;
      setMemberUpdate({ ...memberUpdate });
      setFile(URL.createObjectURL(file));
    } catch (err) {
      console.log(`ERROR::: handleImagePreview ${err}`);
      sweetErrorHandling(err).then();
    }
  };

  const handleSubmitButton = async (e: any) => {
    try {
      // updateMember logic:
      const memberService = new MemberApiService();
      console.log("memberUpdate >>>", memberUpdate);

      const result = await memberService.updateMemberData(memberUpdate);

      assert.ok(result, Definer.general_err1);
      await sweetTopSmallSuccessAlert(
        "Information modified successfully!",
        700,
        false
      );
      window.location.reload();

      return result;
    } catch (err) {
      console.log(`ERROR::: handleSubmitButton ${err}`);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <Stack className="my_settings_page">
      <Box className="member_media_frame">
        <img
          src={file}
          alt="avatar"
          style={{ borderRadius: "50%" }}
          width={"100px"}
          height={"100px"}
        />
        <div className="media_change_box">
          <span>Rasm Yuklash</span>
          <p>JPG, JPEG, PNG rasmlarni yuklay olasiz!</p>
          <div className="up_del_box">
            <Button
              component="label"
              style={{ minWidth: "0" }}
              onChange={handleImagePreview}
            >
              <CloudDownload />
              <input type="file" hidden />
            </Button>
          </div>
        </div>
      </Box>
      <Box className="input_frame">
        <div className="log_input">
          <label className="spec_label">Ism</label>
          <input
            className="spec_input mb_nick"
            type="text"
            placeholder={verifiedMemberData?.mb_nick}
            name="mb_nick"
            onChange={changeNickHandler}
          />
        </div>
      </Box>
      <Box className="input_frame">
        <div className="short_input">
          <label className="spec_label">Telefon Raqam</label>
          <input
            type="text"
            className="spec_input mb_phone"
            placeholder={verifiedMemberData?.mb_phone}
            name="mb_phone"
            onChange={changePhoneHandler}
          />
        </div>
        <div className="short_input">
          <label className="spec_label">Manzil</label>
          <input
            type="text"
            className="spec_input mb_address"
            placeholder={
              verifiedMemberData?.mb_address ?? "Manzil kiritilmagan"
            }
            name="mb_address"
            onChange={changeAddressHandler}
          />
        </div>
      </Box>
      <Box className="input_frame">
        <div className="long_input">
          <label className="spec_label">Ma'lumot</label>
          <textarea
            className="spec_textarea mb_description"
            placeholder={
              verifiedMemberData?.mb_description ?? "Ma'lumot kiritilmagan"
            }
            name="mb_description"
            onChange={changeDescriptionHandler}
          ></textarea>
        </div>
      </Box>
      <Box display={"flex"} justifyContent={"flex-end"} sx={{ mt: "25px" }}>
        <Button variant={"contained"} onClick={handleSubmitButton}>
          Saqlash
        </Button>
      </Box>
    </Stack>
  );
}
