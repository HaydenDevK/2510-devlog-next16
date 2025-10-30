"use client";

import { X } from "lucide-react";
import { useState } from "react";

export default function WritePage() {
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-light tracking-tight">Write a Post</h1>
          <p className="text-gray-400 text-sm">
            Share your thoughts with the world
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Title"
              className="w-full px-4 py-3 rounded-lg bg-gray-900/30 border border-gray-800 focus:border-gray-700 focus:outline-none font-light placeholder:text-gray-600"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-gray-400">
              Content (Markdown)
            </label>
            <textarea
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
            <button className="px-6 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-sm">
              Publish
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
