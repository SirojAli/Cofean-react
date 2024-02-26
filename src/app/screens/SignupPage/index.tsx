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
import "../../../scss/signup.scss";

export function Signup() {
  /** INITIALIZATIONS */

  return (
    <div className="signup_page">
      <Container className="signup_box">
        <h3>Create account</h3>

        <Box className="input_form">
          <TextField
            // error={!!nickError}
            className="input_area"
            id="outlined-basic"
            label="User name"
            variant="outlined"
            // onChange={nameChangeHandler}
            size="small"
            // helperText={nickError}
            // value={nickName}
          />
        </Box>

        <Box className="input_form">
          <TextField
            className="input_area"
            // onChange={emailChangeHandler}
            id="outlined-basic"
            label="Email Address"
            variant="outlined"
            size="small"
            type="email"
            // error={!!emailError}
            // helperText={emailError}
            // value={email}
          />
        </Box>

        <Box className="input_form">
          <TextField
            className="input_area"
            // onChange={passwordChangeHandler}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            size="small"
            type="password"
            // error={!!passwordError}
            // helperText={passwordError}
            // value={password}
            // onKeyPress={paasswordKeyPressHandler}
          />
        </Box>

        <Button className="sign_up_btn">Sign Up</Button>

        <p className="login_text">
          Already have an account? <span>Log in</span>
        </p>
      </Container>
    </div>
  );
}
