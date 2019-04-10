import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Contact from './views/Contact.vue'
import Members from './views/Members.vue'
import Login from './views/Login.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/members',
      name: 'members',
      component: Members,
      meta: { requiresAuth: true }
    },
  ]
});

router.beforeEach( (to,from,next)=>{
  let routerAuthCheck = true;  //TODO: add actual check

  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if user is Authenticated
    if(routerAuthCheck){
      // user is Authenticated
      // TODO: commmit to Store that the user is authenticated
      next();
    }
    else{
      // user is not authenticated
      router.replace('/login');
    }
    
  }
  // Allow page to load 
  else{
    next();
  }
});

export default router;
