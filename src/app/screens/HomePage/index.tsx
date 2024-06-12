import React, { useEffect } from "react";
import { Header } from "./header";
import { TopCafes } from "./topCafes";
import { TrendProducts } from "./trendProducts";
import { Video } from "./video";
import { SaleProducts } from "./saleProducts";
import "../../../scss/home.scss";

export function Homepage() {
  return (
    <div className="homepage">
      <Header />
      <TopCafes />
      <TrendProducts />
      <Video />
      <SaleProducts />
    </div>
  );
}
