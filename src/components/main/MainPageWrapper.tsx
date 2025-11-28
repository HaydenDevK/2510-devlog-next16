"use client";

import { useState } from "react";
import { Pagination } from "../common/Pagination";

export default function MainPageWrapper() {
  const [page, setPage] = useState(1);
  return (
    <>
      <Pagination
        currentPage={page}
        totalPosts={100}
        postsPerPage={10}
        visibleRange={2}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </>
  );
}
