import PostClient from "@/components/post/PostClient";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: postRows, error: postError } = await supabase
    .from("posts")
    .select(
      `
    id,
    title,
    content,
    tags,
    created_at,
    profile_id,
    profiles(*),
    comments(*)
    `
    )
    .eq("id", parseInt(id))
    .single();

  if (postError || !postRows) {
    redirect("/");
  }
  return (
    <>
      <PostClient postRows={postRows} userId={user?.id} />
    </>
  );
}
