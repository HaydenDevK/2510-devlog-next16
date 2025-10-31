import { Clock, Tag, Edit, Mail, Calendar, LogOut } from "lucide-react";
import { signOut } from "@/utils/actions";

const mockUser = {
  username: "johndoe",
  displayName: "John Doe",
  email: "john@example.com",
  bio: "Software developer passionate about web technologies and open source.",
  joinedDate: "2025-01-15",
  postCount: 12,
};

const mockUserPosts = [
  {
    id: 1,
    title: "Getting Started with React 19",
    excerpt: "Explore the new features and improvements in React 19.",
    date: "2025-10-20",
    tags: ["React", "JavaScript"],
    readTime: "5 min read",
  },
  {
    id: 5,
    title: "State Management in 2025",
    excerpt: "Compare different state management solutions.",
    date: "2025-10-10",
    tags: ["React", "State Management"],
    readTime: "7 min read",
  },
];

export default function MyPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-light tracking-tight">My Page</h1>
          <p className="text-gray-400 text-sm">Manage your profile and posts</p>
        </div>

        <div className="border border-gray-800 rounded-lg p-8 bg-gray-900/30">
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div className="space-y-4 flex-1">
                <div>
                  <h2 className="text-2xl font-light">
                    {mockUser.displayName}
                  </h2>
                  <p className="text-gray-400 text-sm">@{mockUser.username}</p>
                </div>
                <p className="text-gray-300 leading-relaxed max-w-2xl">
                  {mockUser.bio}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700 hover:border-gray-600 hover:bg-gray-800/50 transition-colors text-sm">
                  <Edit size={14} />
                  <span>Edit</span>
                </button>
                <form action={signOut}>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700 hover:border-gray-600 hover:bg-gray-800/50 transition-colors text-sm">
                    <LogOut size={14} />
                    <span>Logout</span>
                  </button>
                </form>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-800">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                  <Mail size={16} />
                  <span>{mockUser.email}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                  <Calendar size={16} />
                  <span>Joined {mockUser.joinedDate}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                  <Edit size={16} />
                  <span>{mockUser.postCount} posts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-light">My Posts</h2>
          <a
            href="/write"
            className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-sm"
          >
            New Post
          </a>
        </div>

        <div className="space-y-4">
          {mockUserPosts.map((post) => (
            <article key={post.id} className="group">
              <a href={`/post/${post.id}`} className="block">
                <div className="border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors bg-gray-900/30">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl font-light group-hover:text-gray-300 transition-colors flex-1">
                        {post.title}
                      </h3>
                      <button className="p-2 rounded hover:bg-gray-800 transition-colors">
                        <Edit size={16} className="text-gray-500" />
                      </button>
                    </div>
                    <p className="text-gray-400 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
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
      </div>
    </div>
  );
}
