import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Contact from './views/Contact.vue'
import Members from './views/Members.vue'
import Login from './views/Login.vue'
import store from './store';

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
      component: Contact,
      meta: { requiresAuth: true }
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

router.beforeEach( (to,from,next) => {
  
  let routerAuthCheck = true;  // TODO: finish later

  if( to.matched.some(record => record.meta.requiresAuth)){
    // check for authorization
    if (routerAuthCheck){
      //store.commit('setuserIsAuthenticated', true);  //TOTO: finish later
      next();
    }
    // not authorized
    else{
      router.replace('/login');
    }
  }
  else{
    //  No Authorization Required
    //  allow page loade
    next();
  }

});

export default router;


