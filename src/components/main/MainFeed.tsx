import MainPostLoader from "@/components/skeleton/MainPostLoader";
import { Suspense } from "react";
import MainFeedItem from "./MainFeedItem";
import MainPageWrapper from "./MainPageWrapper";

export default function MainFeed() {
  return (
    <>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-light tracking-tight">Latest Posts</h1>
          <p className="text-gray-400 text-sm">Thoughts, stories and ideas</p>
        </div>
        <div className="space-y-6">
          <Suspense fallback={<MainPostLoader />}>
            <MainFeedItem />
          </Suspense>
        </div>
        <MainPageWrapper />
      </div>
    </>
  );
}
