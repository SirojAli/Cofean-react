import React, { useEffect } from "react";
import { Header } from "./header";
import { AllProducts } from "./allProducts";

import "../../../scss/products.scss";

export function Product() {
  /** INITIALIZATIONS */

  return (
    <div>
      <Header />
      <AllProducts />
    </div>
  );
}
