"use client";
import DeleteModal from "@/components/common/DeleteModal";
import { Clock, Edit, Trash2, Send } from "lucide-react";
import { useState } from "react";

const mockPost = {
  id: 1,
  title: "Getting Started with React 19",
  content: `React 19 introduces several exciting features that make building modern web applications easier and more efficient.

## What's New

The new React compiler automatically optimizes your components, reducing the need for manual memoization. This means better performance out of the box.

### Server Components

Server Components allow you to render components on the server, reducing the amount of JavaScript sent to the client.

### Improved Suspense

Suspense has been enhanced with better error boundaries and loading states.

## Conclusion

React 19 is a significant step forward for the framework, making it easier to build fast, modern applications.`,
  author: "John Doe",
  date: "2025-10-20",
  tags: ["React", "JavaScript"],
  readTime: "5 min read",
};

const mockComments = [
  {
    id: 1,
    author: "Alice Johnson",
    content:
      "Great article! Really helpful for understanding the new features.",
    date: "2025-10-21",
  },
  {
    id: 2,
    author: "Bob Smith",
    content:
      "Thanks for the detailed explanation. Looking forward to trying out the new compiler.",
    date: "2025-10-22",
  },
];

export default function PostDetailPage() {
  const [isDeletePostModalOpen, setIsDeletePostModalOpen] = useState(false);
  const [deleteCommentId, setDeleteCommentId] = useState<number | null>(null);

  const handleDeletePost = () => {
    setIsDeletePostModalOpen(false);
  };

  const handleDeleteComment = (commentId: number) => {
    console.log("Delete comment:", commentId);
    setDeleteCommentId(null);
  };

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <article className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {mockPost.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded bg-gray-800 text-gray-400"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-4xl font-light tracking-tight leading-tight">
              {mockPost.title}
            </h1>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>{mockPost.author}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{mockPost.date}</span>
                </div>
                <span>•</span>
                <span>{mockPost.readTime}</span>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2 rounded hover:bg-gray-800 transition-colors">
                  <Edit size={16} className="text-gray-400" />
                </button>
                <button
                  className="p-2 rounded hover:bg-gray-800 transition-colors"
                  onClick={() => setIsDeletePostModalOpen(true)}
                >
                  <Trash2 size={16} className="text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="prose prose-invert prose-sm max-w-none">
              {mockPost.content.split("\n\n").map((paragraph, idx) => {
                if (paragraph.startsWith("## ")) {
                  return (
                    <h2 key={idx} className="text-2xl font-light mt-8 mb-4">
                      {paragraph.replace("## ", "")}
                    </h2>
                  );
                }
                if (paragraph.startsWith("### ")) {
                  return (
                    <h3 key={idx} className="text-xl font-light mt-6 mb-3">
                      {paragraph.replace("### ", "")}
                    </h3>
                  );
                }
                return (
                  <p key={idx} className="text-gray-300 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </div>
        </article>

        <div className="mt-16 pt-8 border-t border-gray-800 space-y-6">
          <h2 className="text-2xl font-light">
            Comments ({mockComments.length})
          </h2>

          <div className="border border-gray-800 rounded-lg p-4 bg-gray-900/30">
            <textarea
              placeholder="Add a comment..."
              rows={3}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-gray-600 focus:outline-none text-sm resize-none"
            />
            <div className="flex justify-end mt-3">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-sm">
                <Send size={14} />
                <span>Post</span>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {mockComments.map((comment) => (
              <div
                key={comment.id}
                className="border border-gray-800 rounded-lg p-4 bg-gray-900/30"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3 text-sm">
                      <span className="font-medium text-gray-300">
                        {comment.author}
                      </span>
                      <span className="text-gray-500">{comment.date}</span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {comment.content}
                    </p>
                  </div>
                  <button
                    className="p-1 rounded hover:bg-gray-800 transition-colors"
                    onClick={() => setDeleteCommentId(comment.id)}
                  >
                    <Trash2 size={14} className="text-gray-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <DeleteModal
        isOpen={isDeletePostModalOpen}
        onClose={() => setIsDeletePostModalOpen(false)}
        onConfirm={handleDeletePost}
        title="Delete Post"
        message="Are you sure you want to delete this post? This action cannot be undone."
      />

      <DeleteModal
        isOpen={deleteCommentId !== null}
        onClose={() => setDeleteCommentId(null)}
        onConfirm={() =>
          deleteCommentId && handleDeleteComment(deleteCommentId)
        }
        title="Delete Comment"
        message="Are you sure you want to delete this comment? This action cannot be undone."
      />
    </>
  );
}
