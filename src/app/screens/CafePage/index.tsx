import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { HelpPage } from "../HelpPage";
import { Footer } from "../../components/footer/footer";

export function CafePage() {
  /** INITIALIZATIONS */

  return (
    <>
      <div className="cafe_page">
        <h1>You are in CafePage</h1>
      </div>
      <Outlet />
      <Footer />
    </>
  );
}
