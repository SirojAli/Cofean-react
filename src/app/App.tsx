import React, { useState, useEffect } from "react";
import "../css/App.css";
import "../css/navbar.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Homepage } from "./screens/HomePage";
import { Signup } from "./screens/SignupPage";
import { Login } from "./screens/LoginPage";
import { Navbar } from "./components/navbar/navbar";
import { Cafe } from "./screens/CafePage";
import { ChosenCafe } from "./screens/CafePage/chosenCafe";
import { ProductPage } from "./screens/ProductPage";
import { ChosenProduct } from "./screens/ProductPage/chosenProduct";
import { BlogPage } from "./screens/BlogPage";
import { Help } from "./screens/HelpPage";
import { OrdersPage } from "./screens/OrdersPage";
import { MyProfile } from "./screens/ProfilePage";
import { CartItem } from "../types/others";
import { Product } from "../types/product";

function App() {
  /** INITIALIZATIONS */
  const [path, setPath] = useState();
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const cartJson: any = localStorage.getItem("cart_data");
  const current_cart = JSON.parse(cartJson) ?? [];
  const [cartItems, setCartItems] = useState<CartItem[]>(current_cart);
  const [basketOpen, setBasketOpen] = useState<boolean>(false);

  useEffect(() => {
    const scrollHandler = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const onAdd = (pro: Product) => {
    const exist: any = cartItems.find((item: CartItem) => item._id === pro._id);
    if (exist) {
      const cart_updated = cartItems.map((item: CartItem) =>
        item._id === pro._id ? { ...exist, quantity: exist.quantity + 1 } : item
      );
      setCartItems(cart_updated);
      localStorage.setItem("cart_data", JSON.stringify(cart_updated));
    } else {
      const new_item: CartItem = {
        _id: pro._id,
        quantity: 1,
        name: pro.product_name,
        price: pro.product_price,
        discount: pro.product_discount,
        image: pro.product_images[0],
      };
      const cart_updated = [...cartItems, { ...new_item }];
      setCartItems(cart_updated);
      localStorage.setItem("cart_data", JSON.stringify(cart_updated));
    }
  };
  const onRemove = (item: CartItem) => {
    const item_data: any = cartItems.find(
      (ele: CartItem) => ele._id === item._id
    );
    if (item_data.quantity === 1) {
      const cart_updated = cartItems.filter(
        (ele: CartItem) => ele._id !== item._id
      );
      setCartItems(cart_updated);
      localStorage.setItem("cart_data", JSON.stringify(cart_updated));
    } else {
      const cart_updated = cartItems.map((ele: CartItem) =>
        ele._id === item._id
          ? { ...item_data, quantity: item_data.quantity - 1 }
          : ele
      );
      setCartItems(cart_updated);
      localStorage.setItem("cart_data", JSON.stringify(cart_updated));
    }
  };
  const onDelete = (item: CartItem) => {
    const cart_updated = cartItems.filter(
      (ele: CartItem) => ele._id !== item._id
    );
    setCartItems(cart_updated);
    localStorage.setItem("cart_data", JSON.stringify(cart_updated));
  };
  const onDeleteAll = () => {
    setCartItems([]);
    localStorage.removeItem("cart_data");
  };
  const [orderRebuild, setOrderRebuild] = useState<Date>(new Date());

  return (
    <Router>
      <Routes>
        <Route
          element={
            <Navbar
              cartItems={cartItems}
              onAdd={onAdd}
              onRemove={onRemove}
              onDelete={onDelete}
              onDeleteAll={onDeleteAll}
              setOrderRebuild={setOrderRebuild}
            />
          }
        >
          <Route path="/" element={<Homepage onAdd={onAdd} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route path="/cafes" element={<Cafe />} />
          <Route
            path="/cafes/:cafe_id"
            element={<ChosenCafe onAdd={onAdd} />}
          />

          <Route path="/products" element={<ProductPage onAdd={onAdd} />} />
          <Route
            path="/products/:product_id"
            element={<ChosenProduct onAdd={onAdd} />}
          />

          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/help" element={<Help />} />

          <Route path="/profile" element={<MyProfile />} />
          <Route
            path="/orders"
            element={
              <OrdersPage
                orderRebuild={orderRebuild}
                setOrderRebuild={setOrderRebuild}
              />
            }
          />
        </Route>
        <Route path="*" element={<h1>404 Not Founded</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
