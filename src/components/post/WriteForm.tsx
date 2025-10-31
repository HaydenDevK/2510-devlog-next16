"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function WriteForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handlePublish = async () => {
    if (!title || !content) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    // 태그 배열을 문자열로
    const tagsString = tags.join(",");

    try {
      setIsSubmitting(true);
      const supabase = await createClient();
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        alert("로그인이 필요합니다.");
        setIsSubmitting(false);
        return;
      }

      const { data, error } = await supabase
        .from("posts")
        .insert([
          {
            profile_id: user.id,
            title: title.trim(),
            content: content.trim(),
            tags: tagsString,
          },
        ])
        .select("id")
        .single();

      if (error) {
        alert("게시글 등록 중 오류가 발생했습니다.");
        setIsSubmitting(false);
        return;
      }

      const newPostId = data.id;
      if (newPostId) {
        alert("게시글 등록 완료했습니다.");
        router.push(`/post/${newPostId}`);
      } else {
        alert("게시글 등록 실패했습니다.");
        router.push("/");
      }
    } catch (e) {
      alert("게시글 등록 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-light tracking-tight">
            Write a New Post
          </h1>
          <p className="text-gray-400 text-sm">
            Share your thoughts with the world
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full px-4 py-3 rounded-lg bg-gray-900/30 border border-gray-800 focus:border-gray-700 focus:outline-none font-light placeholder:text-gray-600"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-gray-400">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post in markdown...
  
  ## Heading 2
  ### Heading 3
  
  **bold text**
  *italic text*
  
  - List item 1
  - List item 2"
              rows={20}
              className="w-full px-4 py-3 rounded-lg bg-gray-900/30 border border-gray-800 focus:border-gray-700 focus:outline-none text-sm font-mono resize-none leading-relaxed"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm text-gray-400">Tags</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a tag"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
                className="flex-1 px-4 py-2 rounded-lg bg-gray-900/30 border border-gray-800 focus:border-gray-700 focus:outline-none text-sm"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-sm"
              >
                Add
              </button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 px-2 py-1 rounded bg-gray-800 text-gray-300 text-xs"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-white"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={handlePublish}
              disabled={isSubmitting}
              className="px-6 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-sm"
            >
              {isSubmitting ? "Publishing..." : "Publish"}
            </button>
            <button className="px-6 py-2 rounded-lg border border-gray-800 hover:border-gray-700 hover:bg-gray-900/50 transition-colors text-sm">
              Save Draft
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
