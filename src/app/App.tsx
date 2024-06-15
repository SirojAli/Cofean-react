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
import { BlogPage } from "./screens/BlogPage";
import { MyProfile } from "./screens/MyProfilePage";
import { Help } from "./screens/HelpPage";
import { Member } from "../types/user";
import OrdersPage from "./screens/OrdersPage";

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
          <Route path="/products/:product_id" element={<ChosenProduct />} />

          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/help" element={<Help />} />

          <Route path="/my-account" element={<MyProfile />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Route>
        <Route path="*" element={<h1>404 Not Founded</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
