import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/stores/auth.store";

export const initAuthListener = () => {

  const authStore = useAuthStore();

  supabase.auth.onAuthStateChange(
    (event, session) => {

      authStore.user =
        session?.user ?? null;
    }
  );
};