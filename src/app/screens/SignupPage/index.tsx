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

export function Signup() {
  /** INITIALIZATIONS */
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const navigate = useNavigate();
  const pathname = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  /*HANDLERS*/
  const usernameHandler = (e: any) => {
    setUsername(e.target.value);
    setUsernameError("");
  };
  const emailHandler = (e: any) => {
    setEmail(e.target.value);
    setEmailError("");
  };
  const passwordHandler = (e: any) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const signupHandler = async (e: any) => {
    e.preventDefault();
    try {
      if (
        username === "" ||
        password === "" ||
        email.length < 4 ||
        !email.includes("@") ||
        !email.includes(".")
      ) {
        if (username === "") setUsernameError("Fill out this field");
        if (email === "") {
          setEmailError("Fill out this field");
        } else {
          if (email.length <= 3 || !email.includes("@") || !email.includes("."))
            setEmailError("This is invalid email address");
        }
        if (password === "") setPasswordError("Fill out this field");
      } else {
        const is_fulfilled = username !== "" && password !== "" && email !== "";
        assert.ok(is_fulfilled, Definer.input_err1);
        const signup_data = {
          mb_nick: username,
          mb_email: email,
          mb_password: password,
        };

        const memberApiService = new MemberApiService();
        await memberApiService.signupRequest(signup_data);
        sweetTopSmallSuccessAlert("Success", 1000, true);
        await navigate("/"); // Wait for navigation to complete
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };
  const passwordKeyPressHandler = (e: any) => {
    if (e.key === "Enter") signupHandler(e).then();
  };

  return (
    <div className="signup_page">
      <Container className="signup_box">
        <h3>Create account</h3>

        <Box className="input_form">
          <TextField
            className="input_area"
            onChange={usernameHandler}
            id="outlined-basic"
            label="User name"
            variant="outlined"
            size="small"
            error={!!usernameError}
            helperText={usernameError}
            value={username}
          />
        </Box>

        <Box className="input_form">
          <TextField
            className="input_area"
            onChange={emailHandler}
            id="outlined-basic"
            label="Email Address"
            variant="outlined"
            size="small"
            type="email"
            error={!!emailError}
            helperText={emailError}
            value={email}
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
            autoComplete="new-password"
            error={!!passwordError}
            helperText={passwordError}
            value={password}
            onKeyPress={passwordKeyPressHandler}
          />
        </form>

        <button className="sign_up_btn" onClick={signupHandler}>
          Sign Up
        </button>

        <p className="login_text">
          Already have an account?{" "}
          <span
            onClick={() => {
              navigate("/login");
            }}
          >
            Log in
          </span>
        </p>
      </Container>
    </div>
  );
}
