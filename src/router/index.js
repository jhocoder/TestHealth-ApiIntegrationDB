import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '@/views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'
import QuestionsView from '@/views/QuestionsView.vue'
import { auth } from '../../firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/questions',
      name: 'questions',
      component: QuestionsView
    }
  ],
})


router.beforeEach((to, from, next) => {
  const requireAuth = to.matched.some((record) => record.meta.requireAuth);

  onAuthStateChanged(auth, (user) => {
    if (!requireAuth && !user) {
      next({ name: "login" });
    } else if (requireAuth && user && !user.emailVerified) {
      next(false);
    } else {
      next();
    }
  });
});


export default router




