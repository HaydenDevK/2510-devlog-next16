import { Database } from "./supabase";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"] | null;
export type Post = Database["public"]["Tables"]["posts"]["Row"];
export type Comment = Database["public"]["Tables"]["comments"]["Row"];

export type MainDetail = Post & {
  profiles: Profile;
};

export type PostDetail = Post & {
  profiles: Profile;
} & {
  comments: Comment[];
};

export type FormState = {
  success: boolean;
  error: string | null;
};
