import React, { useMemo } from "react";
import { Route, Routes, useLocation, useParams } from "react-router-dom";

import { MyPage } from "./myPage";
import { OtherPage } from "./otherPage";
import "../../../css/my_page.css";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export function MembersPage() {
  let member = useParams();

  const query = useQuery();
  const chosen_mb_id: string | null = query.get("mb_id") ?? null;
  const chosen_blog_id: string | null = query.get("blog_id") ?? null;

  return (
    <div className="restaurant_page">
      <Routes>
        <Route
          path={`${member.path}/other`}
          element={
            <OtherPage
              chosen_mb_id={chosen_mb_id}
              chosen_blog_id={chosen_blog_id}
            />
          }
        />
        <Route path={member.path} element={<MyPage />} />
      </Routes>
    </div>
  );
}
