<script>
// import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";

export default {
  components: {
    Login,
    Register
  },
  data(){
    return {
      login:true
    }
  },
  methods:{
    toggleLogin(state){
      this.login=state
    }
  }
};
</script>

<template>
  <div class="grid grid-cols-4 w-screen h-screen max-md:hidden bg-black">
    <Login v-if="login" @toggleLogin="toggleLogin" :login="login" class=" bg-green-200 grid w-full h-full place-items-center"/>
    <Register v-if="!login" @toggleLogin="toggleLogin" :login="login" class=" bg-green-200 grid w-full h-full place-items-center"/>
    <div class="col-span-3 h-full" id="relative">
      <div id="indicators-carousel" class="relative w-full h-full" data-carousel="slide">
        <div class="overflow-hidden relative h-full">
          <div class="hidden duration-700 ease-in-out absolute inset-0 transition-all transform" data-carousel-item="active">
            <div id="slide1" class="snap-center shrink-0 bg-amber-200 grid w-full h-full place-items-center text-8xl"></div>
          </div>
          <div class="hidden duration-700 ease-in-out absolute inset-0 transition-all transform" data-carousel-item="">
            <div id="slide2" class="snap-center shrink-0 bg-blue-200 grid w-full h-full place-items-center text-8xl"> Slide 2 </div>
          </div>
          <div class="hidden duration-700 ease-in-out absolute inset-0 transition-all transform" data-carousel-item="">
            <div id="slide3" class="snap-center shrink-0 bg-orange-200 grid w-full h-full place-items-center text-8xl"> Slide 3 </div>
          </div>
        </div>
        <div class="flex absolute bottom-5 left-1/2 z-30 space-x-3 -translate-x-1/2">
          <button type="button" class="w-3 h-3 rounded-full bg-white dark:bg-gray-800" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
          <button type="button" class="w-3 h-3 rounded-full bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
          <button type="button" class="w-3 h-3 rounded-full bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
        </div>
      </div>
    </div>
  </div>
      
  <div class="flex snap-x snap-mandatory w-screen h-screen mx:auto overflow-scroll md:hidden">
    <div class="snap-center shrink-0 bg-white grid w-full h-full place-items-center text-8xl">
      <img src="../assets/images/delivery-man.svg" alt="images1">
    </div>
    <div class="snap-center shrink-0 bg-white grid w-full h-full place-items-center text-8xl">
      <img src="../assets/images/map-direction.svg" alt="images1">
    </div>
    <div class="snap-center shrink-0 bg-white grid w-full h-full place-items-center text-8xl">
      <img src="../assets/images/man-woman-delivery.svg" alt="images1">
    </div>
    <Login v-if="login" @toggleLogin="toggleLogin" :login="login" class="snap-center shrink-0 bg-white grid w-full h-full place-items-center"/>
    <Register v-if="!login" @toggleLogin="toggleLogin" :login="login" class="snap-center shrink-0 bg-white grid w-full h-full place-items-center"/>
  </div>
</template>