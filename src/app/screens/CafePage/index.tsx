import React, { useEffect } from "react";
import { Header } from "./header";
import { AllCafes } from "./allCafes";

import "../../../scss/cafe.scss";

export function Cafe() {
  /** INITIALIZATIONS */

  return (
    <div>
      {/* <Header /> */}
      <AllCafes />
    </div>
  );
}
