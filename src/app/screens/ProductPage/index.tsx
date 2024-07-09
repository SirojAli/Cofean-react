import React, { useEffect } from "react";
import { Header } from "./header";
import { AllProducts } from "./allProducts";

import "../../../scss/products.scss";

export function ProductPage(props: any) {
  /** INITIALIZATIONS */

  return (
    <div>
      <Header />
      <AllProducts onAdd={props.onAdd} />
    </div>
  );
}
