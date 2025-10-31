import { AlertCircle, ArrowLeft, Link } from "lucide-react";

export default function AuthCodeError() {
  return (
    <div className="max-w-md mx-auto mt-16">
      <div className="space-y-8">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
              <AlertCircle size={32} className="text-red-500" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-light tracking-tight">
              Auth Code Error
            </h1>
            <p className="text-gray-400 text-sm">
              We couldn`t sign you in. Please try again.
            </p>
          </div>
        </div>

        <div className="border border-gray-800 rounded-lg p-6 bg-gray-900/30">
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-sm font-medium text-gray-300">
                Common issues:
              </h2>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-gray-600 mt-0.5">•</span>
                  <span>Your account credentials may be incorrect</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-600 mt-0.5">•</span>
                  <span>Network connection issues</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-600 mt-0.5">•</span>
                  <span>Third-party authentication service unavailable</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <a
            href="/auth/login"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-white text-black hover:bg-gray-200 transition-colors text-sm font-medium"
          >
            Try Again
          </a>

          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-gray-700 hover:border-gray-600 hover:bg-gray-800/50 transition-all text-sm"
          >
            <ArrowLeft size={16} />
            Go to Home
          </Link>
        </div>

        <p className="text-center text-xs text-gray-500">
          Need help? Contact our support team
        </p>
      </div>
    </div>
  );
}
