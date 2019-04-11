import Vue from 'vue'
import Vuex from 'vuex'
import auth0 from 'auth0-js';
import router from './router'

Vue.use(Vuex) 

export default new Vuex.Store({
  state: {
    userIsAuthorized:false,
    auth0: new auth0.WebAuth({
      domain: "vuejs-auth0.auth0.com", 
      clientID: "ArhqWZ5uzU_pKTHmcBMId9DlZcoSgYQr",
      redirectUri: 'http://localhost:8080/auth0callback',  
      responseType: "token id_token",
      scope: "openid profile email",
    }),
  },
  mutations: {
    setUserIsAuthenticated(state, replacement){
      state.userIsAuthorized = replacement;
    },

  },
  actions: {
    auth0Login(context){
      context.state.auth0.authorize()
    },
    auth0HandleAuthentication (context) {
      context.state.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          let expiresAt = JSON.stringify(
            authResult.expiresIn * 1000 + new Date().getTime()
          )
          // save the tokens locally
          localStorage.setItem('access_token', authResult.accessToken);
          localStorage.setItem('id_token', authResult.idToken);
          localStorage.setItem('expires_at', expiresAt);  

          router.replace('dashboard');
        } 
        else if (err) {
          alert('login failed. Error #KJN838');
          router.replace('/login');
          console.log(err);
        }
      })
    },

  }
})
