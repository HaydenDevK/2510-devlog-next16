import { signInWithGithub } from "@/utils/actions";
import { Github } from "lucide-react";

export default function Login() {
  return (
    <div className="max-w-md mx-auto mt-16">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-light tracking-tight">LOGIN</h1>
          <p className="text-gray-400 text-sm">Sign in to continue</p>
        </div>

        <div className="border border-gray-800 rounded-lg p-8 bg-gray-900/30">
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg border border-gray-700 hover:border-gray-600 hover:bg-gray-800/50 transition-all text-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              Continue with Google
            </button>

            <form action={signInWithGithub}>
              <button className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg border border-gray-700 hover:border-gray-600 hover:bg-gray-800/50 transition-all text-sm">
                <Github size={20} />
                Continue with GitHub
              </button>
            </form>

            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg border border-gray-700 hover:border-gray-600 hover:bg-gray-800/50 transition-all text-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2z" />
              </svg>
              Continue with Naver
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-gray-500">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
