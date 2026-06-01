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
      import("@/layouts/AdminLayout.vue"),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: "",
        component: () =>
          import("@/views/RepuestosView.vue")
      },
      {
        path: "repuestos",
        component: () =>
          import("@/views/RepuestosView.vue")
      },
    ]
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