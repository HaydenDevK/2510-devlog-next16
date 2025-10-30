import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPosts: number;
  postsPerPage: number;
  visibleRange?: number; // 현재 페이지 기준으로 양쪽 몇 개씩 보여줄지
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPosts,
  postsPerPage,
  visibleRange = 1,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  // 시작/끝 페이지 계산
  const startPage = Math.max(1, currentPage - visibleRange);
  const endPage = Math.min(totalPages, currentPage + visibleRange);

  // 페이지 배열 생성
  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  // 페이지 이동 핸들러
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex justify-center gap-2 pt-4">
      {/* 이전 버튼 */}
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded text-sm transition-colors ${
          currentPage === 1
            ? "bg-gray-900 text-gray-600 cursor-not-allowed"
            : "bg-gray-800 text-gray-400 hover:bg-gray-700"
        }`}
      >
        Previous
      </button>

      {/* 페이지 번호 버튼 */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded text-sm transition-colors ${
            page === currentPage
              ? "bg-gray-700 text-white"
              : "bg-gray-800 text-gray-400 hover:bg-gray-700"
          }`}
        >
          {page}
        </button>
      ))}

      {/* 다음 버튼 */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded text-sm transition-colors ${
          currentPage === totalPages
            ? "bg-gray-900 text-gray-600 cursor-not-allowed"
            : "bg-gray-800 text-gray-400 hover:bg-gray-700"
        }`}
      >
        Next
      </button>
    </div>
  );
}
