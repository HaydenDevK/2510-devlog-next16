import { estimateReadTime } from "@/utils/helper";
import { createClient } from "@/utils/supabase/server";
import { format } from "date-fns";
import { Clock, Tag } from "lucide-react";
import Link from "next/link";

export default async function MainFeedItem() {
  const supabase = await createClient();
  const { data: postRows, error: PostError } = await supabase
    .from("posts")
    .select(
      `
    *,  
    profiles(*)
    `
    )
    .order("created_at", { ascending: false });

  if (!postRows || PostError) return null;
  return (
    <>
      {postRows.map((post) => (
        <article key={post.id} className="group">
          <Link href={`/post/${post.id}`} className="block">
            <div className="border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors bg-gray-900/30">
              <div className="space-y-3">
                <h2 className="text-2xl font-light group-hover:text-gray-300 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-400 leading-relaxed">{post.content}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{post.profiles?.display_name}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>
                      {format(new Date(post.created_at), "yyyy.MM.dd")}
                    </span>
                  </div>
                  <span>•</span>
                  <span>{estimateReadTime(post.content || "")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag size={14} className="text-gray-600" />
                  <div className="flex gap-2">
                    {post.tags?.split(",").map((tag) => (
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
          </Link>
        </article>
      ))}
    </>
  );
}
