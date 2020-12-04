import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login'
import Register from '../views/Register'
import HostQuiz from '../views/quiz/HostQuiz'
import JoinQuiz from '../views/quiz/JoinQuiz'
import Quiz from '../views/quiz/Quiz'
import Admin from '../views/Admin';
import EditQuiz from '../views/quiz/EditQuiz';
import ListQuizzes from '../views/quiz/ListQuizzes';
import * as auth from '../services/AuthService';


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (!auth.isLoggedIn()) {
        next();
      } else {
        next('/');
      }
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: (to, from, next) => {
      if (!auth.isLoggedIn()) {
        next();
      } else {
        next('/');
      }
    }
  },
  {
    path: '/host',
    name: 'Host',
    component: HostQuiz,
    beforeEnter: (to, from, next) => {
      if (auth.isLoggedIn()) {
        next();
      } else {
        next('/login');
      }
    }
  },
  {
    path: '/join',
    name: 'Join',
    component: JoinQuiz,
    beforeEnter: (to, from, next) => {
      if (auth.isLoggedIn()) {
        next();
      } else {
        next('/login');
      }
    }
  },
  {
    path: '/join/:code',
    name: 'JoinCode',
    component: JoinQuiz,
    beforeEnter: (to, from, next) => {
      if (auth.isLoggedIn()) {
        next();
      } else {
        next('/login');
      }
    }
  },
  {
    path: '/quiz/:code',
    name: 'Quiz',
    component: Quiz,
    beforeEnter: (to, from, next) => {
      if (auth.isLoggedIn()) {
        next();
      } else {
        next('/login');
      }
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    beforeEnter: (to, from, next) => {
      if (auth.isAdmin()) {
        next();
      } else {
        next('/');
      }
    }
  },
  {
    path: '/admin/quiz/edit/:id',
    name: 'EditQuiz',
    component: EditQuiz,
    beforeEnter: (to, from, next) => {
      if (auth.isAdmin()) {
        next();
      } else {
        next('/');
      }
    }
  },
  {
    path: '/admin/quiz/new',
    name: 'NewQuiz',
    component: EditQuiz,
    beforeEnter: (to, from, next) => {
      if (auth.isAdmin()) {
        next();
      } else {
        next('/');
      }
    }
  },
  {
    path: '/admin/quiz/list',
    name: 'ListQuizzes',
    component: ListQuizzes,
    beforeEnter: (to, from, next) => {
      if (auth.isAdmin()) {
        next();
      } else {
        next('/');
      }
    }
  },
  {
    path: '/quiz',
    redirect: '/join'
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: '',
  routes
});

export default router
