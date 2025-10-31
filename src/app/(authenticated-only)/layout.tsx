import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  // 경로 보호 : 로그인 안되어 있으면 로그인 페이지로 리다이렉트
  if (!user || userError) {
    redirect("/auth/login");
  }

  return <>{children}</>;
}
