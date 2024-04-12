import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Container, TextField } from "@mui/material";
import "../../../scss/signup.scss";
import { useLocation, useNavigate } from "react-router-dom";
import assert from "assert";
import { Definer } from "../../../lib/definer";
import MemberApiService from "../../apiServices/memberApiService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";

export function Login() {
  /*INSTALIZATIONS*/
  const pathname = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);
  // const [loginPage, setLoginPage] = useContext(FullContext);
  const [reset, setReset] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [rePasswordError, setRePasswordError] = useState<string>("");
  const navigate = useNavigate();

  /*HANDLERS*/
  const usernameHandler = (e: any) => {
    setUsername(e.target.value);
    setUsernameError("");
  };

  const passwordHandler = (e: any) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const rePasswordHandler = (e: any) => {
    setRePassword(e.target.value);
    setRePasswordError("");
  };
  const loginHandler = async (e: any) => {
    e.preventDefault();
    try {
      if (username === "" || password === "") {
        if (username === "") setUsernameError("Fill out this field");

        if (password === "") setPasswordError("Fill out this field");
      }
      const is_fulfilled = username !== "" && password !== "";
      assert.ok(is_fulfilled, Definer.input_err1);
      const login_data = {
        mb_nick: username,
        mb_password: password,
      };
      const memberApiService = new MemberApiService();
      await memberApiService.loginRequest(login_data);
      navigate("/");

      sweetTopSmallSuccessAlert("Login Successfully", 1000, true);
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const resetHandler = async () => {
    if (username !== "" && password !== "" && password === rePassword) {
      try {
        const memberService = new MemberApiService();
        await memberService.updatePassword({
          mb_email: username,
          mb_password: rePassword,
        });
        setUsername("");
        setPassword("");
        setRePassword("");
        sweetTopSmallSuccessAlert("Password changed successfully", 700, false);
        setReset(false);
      } catch (err) {
        console.log(err);
        sweetErrorHandling(err).then();
      }
    } else {
      if (username === "") setUsernameError("Fill out this field");

      if (password === "") {
        setPasswordError("Fill out this field");
      } else {
        if (rePassword !== password)
          setRePasswordError("Passwords do not match");
      }
    }
  };
  const passwordKeyPressHandler = (e: any) => {
    if (e.key === "Enter") loginHandler(e).then();
  };

  return (
    <div className="login_page">
      <Container className="login_box">
        <h3>Login</h3>

        <Box className="input_form">
          <TextField
            error={!!usernameError}
            className="input_area"
            id="outlined-basic"
            label="User name"
            variant="outlined"
            onChange={usernameHandler}
            size="small"
            helperText={usernameError}
            value={username}
          />
        </Box>

        <form className="input_form">
          <TextField
            className="input_area"
            onChange={passwordHandler}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            size="small"
            type="password"
            error={!!passwordError}
            helperText={passwordError}
            value={password}
            onKeyPress={passwordKeyPressHandler}
          />
        </form>

        {/* <button className="sign_up_btn" onClick={loginHandler}>
          Login
        </button> */}
        <form onSubmit={(e) => e.preventDefault()}>
          <Button className="sign_up_btn" onClick={loginHandler}>
            Login
          </Button>
        </form>

        <p className="login_text">
          Not registered yet?{" "}
          <span
            onClick={() => {
              navigate("/signup");
            }}
          >
            Create Account
          </span>
        </p>
      </Container>
    </div>
  );
}
