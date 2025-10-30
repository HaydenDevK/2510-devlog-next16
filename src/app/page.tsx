"use client";
import { Pagination } from "@/components/common/Pagination";
import MainPostLoader from "@/components/skeleton/MainPostLoader";
import { Clock, Tag } from "lucide-react";
import { useState } from "react";

const mockPosts = [
  {
    id: 1,
    title: "Getting Started with React 19",
    excerpt:
      "Explore the new features and improvements in React 19, including the new compiler and server components.",
    author: "John Doe",
    date: "2025-10-20",
    tags: ["React", "JavaScript"],
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Building Modern UI with Tailwind CSS",
    excerpt:
      "Learn how to create beautiful, responsive interfaces using utility-first CSS framework.",
    author: "Jane Smith",
    date: "2025-10-18",
    tags: ["CSS", "Design"],
    readTime: "8 min read",
  },
  {
    id: 3,
    title: "TypeScript Best Practices",
    excerpt:
      "Discover the best practices for writing maintainable and type-safe TypeScript code.",
    author: "Mike Johnson",
    date: "2025-10-15",
    tags: ["TypeScript", "Programming"],
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "Mastering Async JavaScript",
    excerpt:
      "Deep dive into promises, async/await, and handling asynchronous operations effectively.",
    author: "Sarah Lee",
    date: "2025-10-12",
    tags: ["JavaScript", "Async"],
    readTime: "10 min read",
  },
  {
    id: 5,
    title: "State Management in 2025",
    excerpt:
      "Compare different state management solutions and find the right one for your project.",
    author: "David Kim",
    date: "2025-10-10",
    tags: ["React", "State Management"],
    readTime: "7 min read",
  },
];
export default function Page() {
  const [page, setPage] = useState(1);

  return (
    <>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-light tracking-tight">Latest Posts</h1>
          <p className="text-gray-400 text-sm">Thoughts, stories and ideas</p>
        </div>
        <div className="space-y-6">
          <MainPostLoader />

          {mockPosts.map((post) => (
            <article key={post.id} className="group">
              <a href={`/post/${post.id}`} className="block">
                <div className="border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors bg-gray-900/30">
                  <div className="space-y-3">
                    <h2 className="text-2xl font-light group-hover:text-gray-300 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-400 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{post.author}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{post.date}</span>
                      </div>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Tag size={14} className="text-gray-600" />
                      <div className="flex gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 rounded bg-gray-800 text-gray-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </article>
          ))}
        </div>
        <Pagination
          currentPage={page}
          totalPosts={100}
          postsPerPage={10}
          visibleRange={2}
          onPageChange={(newPage) => setPage(newPage)}
        />
        ;
      </div>
    </>
  );
}
