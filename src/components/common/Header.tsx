import { Search } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-6">
        <Link
          href="/"
          className="text-xl  tracking-wide text-white hover:text-gray-300 transition-colors font-bold"
        >
          Blog
        </Link>

        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2  -translate-y-1/2 text-gray-500"
            />
            <input
              type="text"
              placeholder="Search posts..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800/50 border border-gray-800 focus:border-gray-700 focus:outline-none text-sm placeholder:text-gray-500"
            />
          </div>
        </div>

        <nav className="flex items-center gap-6">
          <Link
            href="/write"
            className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
          >
            <button className="inline-flex items-center justify-center font-medium transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 bg-[#21262D] hover:bg-[#30363d] text-white border border-[#30363d] text-xs px-2.5 py-1.5">
              Mypage
            </button>
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
          >
            <button className="inline-flex items-center justify-center font-medium transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 bg-[#21262D] hover:bg-[#30363d] text-white border border-[#30363d] text-xs px-2.5 py-1.5">
              Login
            </button>
          </Link>
          <Link
            href="/mypage"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-teal-500 flex items-center justify-center text-white text-sm font-medium">
              U
            </div>
          </Link>
        </nav>
      </div>
    </header>
  );
}
