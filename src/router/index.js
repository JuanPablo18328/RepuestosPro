import { createRouter, createWebHistory } from "vue-router";

import { supabase } from "@/lib/supabase";

const routes = [
  {
    path: "/",
    component: () =>
      import("@/views/HomeView.vue")
  },

  {
    path: "/login",
    component: () =>
      import("@/views/LoginView.vue")
  },

  {
    path: "/admin",
    component: () =>
      import("@/views/DashboardView.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/admin/repuestos',
    component: () =>
      import('@/views/RepuestosView.vue'),
    meta: {
      requiresAuth: true
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(
  async (to, from, next) => {

    const {
      data: { session }
    } = await supabase.auth.getSession();

    if (
      to.meta.requiresAuth &&
      !session
    ) {
      return next("/login");
    }

    // Ya autenticado
    if (to.path === "/login" && session) {
      return next("/admin");
    }

    next();
  }
);

export default router;