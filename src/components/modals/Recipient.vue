<script>
  export default {
    components:{},
    props:['modalName', 'currentModal'],
    emits:['openModal','closeModal', 'prevModal'],
    data(){
      return {}
    },
    created() {},
    mounted() {},
    methods: {
      openModal(nextModal){
        this.$emit('openModal', nextModal);
      },
      closeModal(){
        this.$emit('closeModal');
      },
      prevModal(){
        this.$emit('prevModal', this.modalName);
      },
    },
    watch:{},
    computed: {}
  };

</script>

<template>
  <div class="h-full w-96 py-8">
    <div class="h-full w-full bg-white shadow-xl relative">
      <div class="h-16 w-full bg-[#252830] flex justify-between px-6 items-center select-none">
        <i v-if="modalName!='orderDetail'" class="fa-solid fa-arrow-left-long text-white text-2xl cursor-pointer" @click="prevModal"></i>
        <i v-if="modalName=='orderDetail'" class="fa-solid fa-square-full text-[#252830] text-2xl"></i>
        <span class="text-xl font-semibold text-white">Recipient Details</span>
        <i v-if="!currentModal.summary" class="fa-solid fa-xmark text-2xl text-white cursor-pointer" @click="closeModal"></i>
      </div>

      <div class="w-full absolute bottom-0 pb-8 pt-24 flex justify-center bg-gradient-to-t from-white via-white">
        <button @click="openModal('summary')" class="w-[calc(100%-4rem)] flex justify-center bg-[#252830] p-2">
          <span class="w-full text-lg text-white">
            <i class="fa-solid fa-magnifying-glass-location mr-2"></i>
            Next: Summary
          </span>
        </button>
      </div>
    </div>

  </div>
</template>