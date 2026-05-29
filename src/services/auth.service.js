import { supabase } from "@/lib/supabase";

export const loginUser = (email, password) =>
  supabase.auth.signInWithPassword({
    email,
    password
  });

export const logoutUser = () =>
  supabase.auth.signOut();