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
import "../../../scss/order.scss";

export function Login() {
  /** INITIALIZATIONS */

  return (
    <div className="login_page">
      <Container className="login_box">
        <h3>Login</h3>

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

        <Button className="sign_up_btn">Login</Button>

        <p className="login_text">
          Not registered yet? <span>Create Account</span>
        </p>
      </Container>
    </div>
  );
}
