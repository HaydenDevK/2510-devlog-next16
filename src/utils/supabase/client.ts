/**
 * 클라이언트 사이드에서 사용하는 Supabase 클라이언트 함수
 */
import { Database } from "@/types/supabase";
import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const createClient = () =>
  createBrowserClient<Database>(supabaseUrl!, supabaseKey!);
