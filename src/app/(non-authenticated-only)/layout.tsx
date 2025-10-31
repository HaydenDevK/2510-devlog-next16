import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function NonAuthenticatedOnlyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 경로 보호 : 로그인 안되어 있으면 로그인 페이지로 리다이렉트
  if (user) {
    console.log("User found");
    redirect("/");
  }

  return <>{children}</>;
}
