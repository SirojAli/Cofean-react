import React, { useState } from "react";
import "../css/App.css";
import "../css/navbar.css";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import {
  BrowserRouter as Router,
  Route,
  Link,
  BrowserRouter,
  Routes,
} from "react-router-dom";

import { Homepage } from "./screens/HomePage";
import { Signup } from "./screens/SignupPage";
import { Login } from "./screens/LoginPage";
import { Navbar } from "./components/navbar/navbar";

import { Cafe } from "./screens/CafePage";
import { ChosenCafe } from "./screens/CafePage/chosenCafe";

import { Product } from "./screens/ProductPage";
import { ChosenProduct } from "./screens/ProductPage/chosenProduct";

import { MyPage } from "./screens/MembersPage";

import { Blog } from "./screens/BlogPage";
import { MyAccount } from "./screens/MyAccountPage";
import { Help } from "./screens/HelpPage";
import { ChosenBlog } from "./screens/BlogPage/chosenBlog";
import { OtherPage } from "./screens/MembersPage/otherPage";
import { Member } from "../types/user";

function App() {
  /** INITIALIZATIONS */
  const [path, setPath] = useState();
  const main_path = window.location.pathname;
  console.log("main_path >>", main_path);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Navbar />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route path="/cafes" element={<Cafe />} />
          <Route path="/cafes/:cafe_id" element={<ChosenCafe />} />

          <Route path="/products" element={<Product />} />
          <Route path="/products/:products_id" element={<ChosenProduct />} />

          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:blog_id" element={<ChosenBlog />} />

          <Route path="/members" element={<MyPage />} />
          <Route path="/members/other" element={<OtherPage />} />

          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/help" element={<Help />} />
        </Route>
        <Route path="*" element={<h1>404 Not Founded</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
