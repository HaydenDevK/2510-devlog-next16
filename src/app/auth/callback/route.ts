import { NextResponse } from "next/server";
// The client you created from the Server-Side Auth instructions
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  let next = searchParams.get("next") ?? "/";
  if (!next.startsWith("/")) {
    // if "next" is not a relative URL, use the default
    next = "/";
  }

  // 깃허브 로그인 성공
  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    // 에러 나거나 유저가 없거나
    if (userError || !user) {
      return NextResponse.redirect(`${origin}/auth/auth-code-error`);
    }

    const { data: profileRows, error: profileError } = await supabase
      .from("profiles")
      .select("bio")
      .eq("id", user.id)
      .limit(1);

    // 에러 나거나 프로필이 없거나
    if (profileError || !profileRows) {
      return NextResponse.redirect(`${origin}/auth/auth-code-error`);
    }

    const profile = profileRows[0];
    let redirectPath = `${origin}${next}`;
    if (!profile || !profile.bio || profile.bio.trim() === "") {
      redirectPath = "/auth/additional-info";
    } else {
      redirectPath = next;
    }

    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${redirectPath}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${redirectPath}`);
      } else {
        return NextResponse.redirect(`${origin}${redirectPath}`);
      }
    }
  }

  // 깃허브 로그인 실패
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
