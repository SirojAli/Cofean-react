import React, { useEffect } from "react";
import { Header } from "./header";
import { AllProducts } from "./allProducts";

import "../../../scss/products.scss";

export function ProductPage() {
  /** INITIALIZATIONS */

  return (
    <div>
      <Header />
      <AllProducts />
    </div>
  );
}
