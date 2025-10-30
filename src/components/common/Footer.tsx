import { Github, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-900/50 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm text-gray-400">
              © 2025 Blog. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Github size={18} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Twitter size={18} />
            </a>
            <a
              href="mailto:contact@blog.com"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
