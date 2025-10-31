import AdditionalInfoForm from "@/components/auth/AdditionalInfoForm";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function AdditionalInfoPage({
  searchParams,
}: {
  searchParams: Promise<{ url: string }>;
}) {
  const { url } = await searchParams;
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect(url ? url : "/"); // or redirect("/login")
    // return
  }

  // 프로필 조회 에러 나거나 프로필이 없거나
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single(); // 배열을 객체로

  if (profileError) {
    redirect("/auth/login-failed");
  }

  // 서버 액션 (form 요소의 action 함수)
  async function updateProfile(
    prevState: FormState,
    formData: FormData
  ): Promise<FormState> {
    "use server";

    // 각 요소에 name 속성 값 매칭해야한다
    const displayName = formData.get("display_name")?.toString();
    const bio = formData.get("bio")?.toString();

    if (!bio) {
      return { success: false, error: "입력 값을 채워주세요." };
    }

    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return { success: false, error: "로그인이 필요합니다." };
    }

    const { error } = await supabase
      .from("profiles")
      .update({ display_name: displayName, bio })
      .eq("id", user.id);

    if (error) {
      return { success: false, error: "서버 오류가 발생했습니다." };
    }

    return { success: true, error: null };
  }

  return (
    <div className="max-w-md mx-auto mt-16">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-light tracking-tight">
            Complete Your Profile
          </h1>
          <p className="text-gray-400 text-sm">
            Tell us a bit more about yourself
          </p>
        </div>

        <div className="border border-gray-800 rounded-lg p-8 bg-gray-900/30">
          <AdditionalInfoForm profile={profile} action={updateProfile} />
        </div>
      </div>
    </div>
  );
}
