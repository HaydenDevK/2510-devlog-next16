"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function signInWithGithub() {
  const supabase = await createClient();
  const { data } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  });

  if (data.url) {
    redirect(data.url);
  }
}

async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/"); // 페이지 다시 불러오기
}

export { signInWithGithub, signOut };
