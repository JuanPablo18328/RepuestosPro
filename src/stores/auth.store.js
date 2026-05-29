import { ref } from "vue";
import { defineStore } from "pinia";
import { supabase } from "@/lib/supabase";
import { loginUser, logoutUser } from "@/services/auth.service";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const user = ref(null);
    const loading = ref(false);

    async function login(email, password) {
      loading.value = true;

      try {
        const { data, error } =
          await loginUser(email, password);

        if (error) throw error
        
        user.value = data.user;

      } finally {
        loading.value = false;
      }
    }

    async function logout() {
      await logoutUser();

      user.value = null;
    }

    async function getSession() {
      const {
          data: { session }
        } = await supabase.auth.getSession();

        user.value = session?.user ?? null;
    }

    return {
      user,
      loading,
      login,
      logout,
      getSession
    }
  }
);