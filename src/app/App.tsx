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

import { CafePage } from "./screens/CafePage";
import { ProductPage } from "./screens/ProductPage";
import { BlogPage } from "./screens/BlogPage";
import { OrdersPage } from "./screens/OrdersPage";
import { MembersPage } from "./screens/MembersPage";
import { HelpPage } from "./screens/HelpPage";
import { LoginPage } from "./screens/LoginPage";
import { HomePage } from "./screens/HomePage";
import { Navbar } from "./components/navbar/navbar";
import { ChosenCafe } from "./screens/CafePage/chosenCafe";

function App() {
  // const [path, setPath] = useState();
  const main_path = window.location.pathname;
  console.log("main_path >>", main_path);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Navbar />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/cafe" element={<CafePage />} />
          <Route path="/cafe/:cafe_id" element={<ChosenCafe />} />

          <Route path="/products" element={<ProductPage />} />
          <Route path="/products/:product_id" element={<ProductPage />} />

          <Route path="/members" element={<MembersPage />} />
          <Route path="/members/other" element={<MembersPage />} />

          <Route path="/blog" element={<BlogPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/help" element={<HelpPage />} />
        </Route>
        <Route path="*" element={<h1>404 Not Founded</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
