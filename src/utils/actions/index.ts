"use server";

import { createClient } from "@/utils/supabase/server";
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

export { signInWithGithub };
