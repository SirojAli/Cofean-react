import React, { useEffect } from "react";
import { Header } from "./header";
import { Brands } from "./brands";
import { Trends } from "./trends";
import { Video } from "./video";
import { OnSales } from "./onSales";
import { Events } from "./events";
import "../../../scss/home.scss";

export function Homepage() {
  /** INITIALIZATIONS */

  return (
    <div className="homepage">
      <Header />
      <Brands />
      <Trends />
      <Video />
      <OnSales />
      <Events />
    </div>
  );
}
