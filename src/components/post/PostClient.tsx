"use client";
import DeleteModal from "@/components/common/DeleteModal";
import type { PostDetail } from "@/types";
import { estimateReadTime } from "@/utils/helper";
import { createClient } from "@/utils/supabase/client";
import { format } from "date-fns";
import { Clock, Edit, Trash2, Send } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PostClient({
  postRows,
  userId,
}: {
  postRows: PostDetail;
  userId: string | undefined;
}) {
  const router = useRouter();
  const supabase = createClient();

  const [commentList, setCommentList] = useState(postRows.comments);
  const [newComment, setNewComment] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);

  const [isDeletePostModalOpen, setIsDeletePostModalOpen] = useState(false);
  const [deleteCommentId, setDeleteCommentId] = useState<number | null>(null);

  const handleSumbitComment = async () => {
    if (!userId) {
      alert("로그인 후 댓글을 달 수 있습니다.");
      return;
    }

    setSubmittingComment(true);

    // 댓글 Insert
    const { data, error } = await supabase
      .from("comments")
      .insert([
        {
          post_id: postRows.id,
          profile_id: userId,
          content: newComment.trim(),
        },
      ])
      .select()
      .single();

    if (error) {
      alert("댓글 등록에 실패했습니다.");
      return;
    }

    setCommentList((comment) => [...comment, data]);
    setNewComment("");
    setSubmittingComment(false);
  };

  const handleDeletePost = async () => {
    if (userId !== postRows.profile_id) {
      alert("본인의 게시글만 삭제할 수 있습니다.");
      return;
    }
    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", postRows.id);

    if (error) {
      alert("게시글 삭제 중 에러가 발생하였습니다.");
      setIsDeletePostModalOpen(false);
      return;
    }

    router.replace("/");
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
              {postRows.tags?.split(",").map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded bg-gray-800 text-gray-400"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-4xl font-light tracking-tight leading-tight">
              {postRows.title}
            </h1>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>{postRows.profiles?.display_name}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>
                    {" "}
                    {format(new Date(postRows.created_at), "yyyy.MM.dd")}
                  </span>
                </div>
                <span>•</span>
                <span>{estimateReadTime(postRows.content || "")}</span>
              </div>

              <div className="flex items-center gap-2">
                {userId === postRows.profile_id && (
                  <>
                    <Link href={`/write?post_id=${postRows.id}`}>
                      <button className="p-2 rounded hover:bg-gray-800 transition-colors">
                        <Edit size={16} className="text-gray-400" />
                      </button>
                    </Link>
                    <button
                      className="p-2 rounded hover:bg-gray-800 transition-colors"
                      onClick={() => setIsDeletePostModalOpen(true)}
                    >
                      <Trash2 size={16} className="text-gray-400" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="prose prose-invert prose-sm max-w-none">
              {postRows.content?.split("\n\n").map((paragraph, idx) => {
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
            Comments ({postRows.comments.length})
          </h2>

          <div className="border border-gray-800 rounded-lg p-4 bg-gray-900/30">
            <textarea
              placeholder="Add a comment..."
              rows={3}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-gray-600 focus:outline-none text-sm resize-none"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <div className="flex justify-end mt-3">
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-sm"
                onClick={handleSumbitComment}
                disabled={submittingComment}
              >
                <Send size={14} />
                <span>{submittingComment ? "Post..." : "Post"}</span>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {commentList.map((comment) => (
              <div
                key={comment.id}
                className="border border-gray-800 rounded-lg p-4 bg-gray-900/30"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3 text-sm">
                      <span className="font-medium text-gray-300">
                        {/* {comment.author} */}
                      </span>
                      <span className="text-gray-500">
                        {format(new Date(comment.created_at), "yyyy.MM.dd")}
                      </span>
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
