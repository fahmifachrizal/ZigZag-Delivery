import { defineStore } from 'pinia'
// import { getAuth, signInWithPopup, signInWithRedirect, OAuthProvider } from 'firebase/auth'
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
// import { GoogleAuthProvider } from 'firebase/auth'
import axios from 'axios'

export const useInteractionStore = defineStore("interaction", {
  state(){ 
    return {
      baseUrl: 'http://localhost:3000',
      // baseUrl: 'https://zig-zag-delivery-production.up.railway.app',
      modalSetName:false,
    }
  },

  actions: {
    handleLogin({email, password}){
      signInUserWithEmailAndPassword(getAuth(), email, password)
      .then( async (data) => {
        const newUser = await axios({
          method: 'POST',
          url: this.baseURL +`/login`,
          data:{ email, password, source:'Email'}
        })
        localStorage.setItem('access_token', newUser.accessToken)
        this.router.push('/')
      })
      .catch((error)=>{
        console.log(error.code)
      })
    },

    async handleRegister({email, password}){
      createUserWithEmailAndPassword(getAuth(), email, password)
      .then((data)=>{
        localStorage.setItem('access_token',data.user.accessToken)
        this.router.push('/')
      })
      .catch((error)=>{
        console.log(error.code)
      })
    },

    async handleSignInWithGoogle(){
      try {
        const provider = new GoogleAuthProvider();
        const data = await signInWithPopup(getAuth(),provider)

        const reqData = {
          name: data.user.displayName,
          email: data.user.email,
          source: 'Google'
        }

        const newUser = await axios({
          method: 'POST',
          url: this.baseUrl + `/users/firebaseAuth`,
          data: reqData
        })

        console.log(newUser)
        localStorage.setItem('access_token',newUser.data.access_token)
        localStorage.setItem('name',newUser.data.name)
        this.router.push('/')
      } catch (error) {
        console.log(error)
        
      };
    },

    async handleSignInWithApple(){
      try {
        const provider = new OAuthProvider('apple.com');
        provider.addScope('email');
        provider.addScope('name');
        const data = await signInWithPopup(getAuth(),provider)
        
        const reqData = {
          name: 'temp',
          email: data.user.email,
          source: 'Apple'
        }

        const newUser = await axios({
          method: 'POST',
          url: this.baseUrl + `/users/firebaseAuth`,
          data: reqData
        })

        if (newUser.data.name === 'temp'){
          this.modalSetName = true
        }

        localStorage.setItem('access_token',newUser.data.access_token)
        localStorage.setItem('name',newUser.data.name)
        this.router.push('/')        
      } catch (error) {
        console.log(error)
      }
    },

    async handleSetName({name}){
      const newUser = await axios({
        method: 'PATCH',
        url: this.baseUrl + `/users/profile`,
        data: { name },
        headers: { access_token:localStorage.getItem('access_token') }
      })
      console.log(newUser)
      localStorage.setItem('name',newUser.data.name)
      this.modalSetName = false
    },
  },
});
