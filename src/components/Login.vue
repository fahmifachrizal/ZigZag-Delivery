<script>
  import { useInteractionStore } from '../stores/interaction.js';
  import { mapActions } from 'pinia';
  export default {
    data(){
      return {
        email:'',
        password:''
      }
    },
    computed:{},
    props:['login'],
    emits:['toggleLogin'],
    methods: {
      ...mapActions(useInteractionStore, ['handleSignInWithGoogle','handleSignInWithApple']),
      toggleLogin(){
        this.$emit('toggleLogin',!this.login)
      }
    },
    
  };
</script>


<template>
      <div class="bg-[#252830] flex px-4 justify-center items-center flex-wrap h-full text-gray-200">
        <div class="w-full">
          <form>
            <!-- Email input -->
            <div class="mb-6">
              <input v-model="email" type="text" class="block w-full px-4 py-1 text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Email address"/>
            </div>

            <!-- Password input -->
            <div class="mb-6">
              <input v-model="password" type="password" class="block w-full px-4 py-1 text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Password" />
            </div>

            <!-- Submit button -->
            <button @click.prevent="handleLogin({email, password})" type="submit" class="inline-block px-7 py-2 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full" data-mdb-ripple="true" data-mdb-ripple-color="light" > 
              Sign in
            </button>

            <!-- <button @click="toggleLogin">
              <div class="flex items-center my-4 justify-center" >
                Register Here
              </div>
            </button> -->

            <div class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5" >
              <p class="text-center font-semibold mx-4 mb-0">OR</p>
            </div>

            <!-- Facebook -->
            <a @click.prevent="handleSignInWithApple" class="px-7 py-2 text-gray-800 bg-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3" href="#!" role="button" data-mdb-ripple="true" data-mdb-ripple-color="light" >
              <i class="fa-brands fa-apple mr-4"></i>
              Sign In with Apple ID
            </a>
            <!-- Twitter -->
            <a @click.prevent="handleSignInWithGoogle" class="px-7 py-2 text-gray-800 bg-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center" href="#!" role="button" data-mdb-ripple="true" data-mdb-ripple-color="light" >
              <i class="fa-brands fa-google mr-4"></i>
              Continue with Google
            </a>
          </form>
        </div>
      </div>
</template>
