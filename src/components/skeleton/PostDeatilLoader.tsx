export default function PostDeatilLoader() {
  return (
    <>
      <article className="space-y-8 animate-pulse">
        {/* 헤더 영역 */}
        <div className="space-y-4">
          {/* 태그들 */}
          <div className="flex items-center gap-2">
            <div className="h-5 w-12 rounded bg-gray-800" />
            <div className="h-5 w-16 rounded bg-gray-800" />
            <div className="h-5 w-10 rounded bg-gray-800" />
          </div>

          {/* 제목 */}
          <div className="space-y-2">
            <div className="h-8 w-3/4 rounded bg-gray-800" />
            <div className="h-8 w-1/2 rounded bg-gray-800" />
          </div>

          {/* 메타 정보 + 우측 버튼 */}
          <div className="flex items-center justify-between">
            {/* 작성자 / 날짜 / 읽는 시간 */}
            <div className="flex items-center gap-4 text-sm text-gray-400">
              {/* author */}
              <div className="h-4 w-20 rounded bg-gray-800" />
              {/* dot */}
              <div className="h-1.5 w-1.5 rounded-full bg-gray-800" />
              {/* date */}
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-gray-800" />
                <div className="h-4 w-24 rounded bg-gray-800" />
              </div>
              {/* dot */}
              <div className="h-1.5 w-1.5 rounded-full bg-gray-800" />
              {/* readTime */}
              <div className="h-4 w-12 rounded bg-gray-800" />
            </div>

            {/* 우측 액션 아이콘 영역 */}
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded bg-gray-800" />
              <div className="h-8 w-8 rounded bg-gray-800" />
            </div>
          </div>
        </div>

        {/* 본문 영역 */}
        <div className="border-t border-gray-800 pt-8">
          <div className="space-y-4">
            {/* h2 자리 */}
            <div className="h-6 w-1/3 rounded bg-gray-800" />

            {/* 문단 1 */}
            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-gray-800" />
              <div className="h-4 w-11/12 rounded bg-gray-800" />
              <div className="h-4 w-10/12 rounded bg-gray-800" />
            </div>

            {/* 소제목 (h3) */}
            <div className="h-5 w-1/4 rounded bg-gray-800 mt-6" />

            {/* 문단 2 */}
            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-gray-800" />
              <div className="h-4 w-9/12 rounded bg-gray-800" />
              <div className="h-4 w-10/12 rounded bg-gray-800" />
            </div>

            {/* 문단 3 */}
            <div className="space-y-2">
              <div className="h-4 w-11/12 rounded bg-gray-800" />
              <div className="h-4 w-full rounded bg-gray-800" />
              <div className="h-4 w-8/12 rounded bg-gray-800" />
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
