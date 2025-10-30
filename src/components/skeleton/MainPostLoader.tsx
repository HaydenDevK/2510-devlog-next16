export default function MainPostLoader() {
  return (
    <>
      <div className="border border-gray-800 rounded-lg p-6 bg-gray-900/30 animate-pulse">
        <div className="space-y-3">
          {/* 제목 */}
          <div className="h-6 w-3/4 bg-gray-800 rounded" />
          {/* 요약 */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-800 rounded" />
            <div className="h-4 w-5/6 bg-gray-800 rounded" />
          </div>

          {/* 작성자 / 날짜 / 읽는 시간 */}
          <div className="flex items-center gap-4 text-sm text-gray-500 mt-4">
            <div className="h-4 w-16 bg-gray-800 rounded" />
            <div className="h-1.5 w-1.5 rounded-full bg-gray-800" />
            <div className="flex items-center gap-1">
              <div className="h-4 w-4 bg-gray-800 rounded" />
              <div className="h-4 w-20 bg-gray-800 rounded" />
            </div>
            <div className="h-1.5 w-1.5 rounded-full bg-gray-800" />
            <div className="h-4 w-16 bg-gray-800 rounded" />
          </div>

          {/* 태그 */}
          <div className="flex items-center gap-2 mt-4">
            <div className="h-4 w-4 bg-gray-800 rounded" />
            <div className="flex gap-2">
              <div className="h-5 w-12 bg-gray-800 rounded" />
              <div className="h-5 w-16 bg-gray-800 rounded" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
