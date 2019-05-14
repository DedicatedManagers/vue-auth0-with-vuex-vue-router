import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Contact from './views/Contact.vue'
import Members from './views/Members.vue'
import Auth0Callback from './views/Auth0Callback.vue'
import Login from './views/Login.vue'
import Store from './store'
import Auth0Callback from './views/Auth0Callback.vue'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/auth0callback',
      name: 'auth0callback',
      component: Auth0Callback,
    },
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
 // Allow finishing callback url for logging in
 if(to.matched.some(record=>record.path == "/auth0callback")){
  console.log("router.beforeEach found /auth0callback url");
  Store.dispatch('auth0HandleAuthentication');
  next(false);
}

 // check if user is logged in (start assuming the user is not logged in = false)
 let routerAuthCheck = false;  
 // Verify all the proper access variables are present for proper authorization
 if( localStorage.getItem('access_token') && localStorage.getItem('id_token') && localStorage.getItem('expires_at') ){
   console.log('found local storage tokens');
   // Check whether the current time is past the Access Token's expiry time
   let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
   // set localAuthTokenCheck true if unexpired / false if expired
   routerAuthCheck = new Date().getTime() < expiresAt;  
 }

  // set global ui understanding of authentication
  Store.commit('setUserIsAuthenticated', routerAuthCheck); 

  // check if the route to be accessed requires authorizaton
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if user is Authenticated
    if(routerAuthCheck){
      // user is Authenticated - allow access
      next();
    }
    else{
      // user is not authenticated - redirect to login
      router.replace('/login');
    }
    
  }
  // Allow page to load 
  else{
    next();
  }
});

export default router;
