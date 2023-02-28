<script>
  export default {
    components:{},
    props:['modalName', 'currentModal'],
    emits:['openModal','closeModal', 'prevModal'],
    data(){
      return {
        deliveryCategory: '',
        packageDimension:{h:0,w:0,l:0,weight:0},
        deliveryType:'',
        activePackageDetail:'neutral',
        nextButton:false,
      }
    },
    created() {},
    mounted() {},
    methods: {
      focusPackageDetail(detail){
        this.activePackageDetail = detail
      },
      openModal(nextModal){
        this.$emit('openModal', nextModal);
      },
      closeModal(){
        this.$emit('closeModal');
      },
      prevModal(){
        this.$emit('prevModal', this.modalName);
      },
      selectDeliveryCategory(category){
        this.deliveryCategory = category
        if (category!='document') {
          this.packageDimension = {h:null,w:null,l:null,weight:null}
          this.deliveryType = 'personal'
        }
        else {
          this.packageDimension = {h:1,w:1,l:1,weight:1}
          this.deliveryType=''
        }
      },
      selectDeliveryType(type){
        this.deliveryType = type
      },
      // nextButtonStatus(){
      //   if (this.deliveryCategory=='document' && this.deliveryType!=''){
      //     this.nextButton = true
      //   } else if (this.deliveryCategory!='document') {
      //     if (this.packageDimension.h>0 && this.packageDimension.w>0 && this.packageDimension.l>0 && this.packageDimension.weight>0){
      //       this.nextButton = true
      //     } else this.nextButton = false
      //   } else this.nextButton = false
      // },
      checkNextButton() {
        console.log(this.deliveryCategory , this.packageDimension.h , this.packageDimension.w , this.packageDimension.l , this.packageDimension.weight , this.deliveryType)
        if (this.deliveryCategory && this.packageDimension.h && this.packageDimension.w && this.packageDimension.l && this.packageDimension.weight && this.deliveryType) {
          this.nextButton = true;
        } else {
          this.nextButton = false;
        }
      }
    },
    watch:{
      deliveryCategory(newVal, oldVal) {
        this.checkNextButton()
        // this.nextButtonStatus();
      },
      // packageDimension: {
      //   handler(newVal, oldVal) {
      //     this.checkNextButton()
      //     // this.nextButtonStatus();
      //   },
      //   deep: true
      // },
      deliveryType(newVal, oldVal) {
        this.checkNextButton()
        // this.nextButtonStatus();
      }
    },
    computed: {
      
    }
  };

</script>

<template>
  <div class="h-full w-96 py-8">
    <div class="h-full w-full bg-white shadow-xl relative">
      <div class="h-16 w-full bg-[#252830] flex justify-between px-6 items-center select-none">
        <i v-if="modalName!='orderDetail'" class="fa-solid fa-arrow-left-long text-white text-2xl cursor-pointer" @click="prevModal"></i>
        <i v-if="modalName=='orderDetail'" class="fa-solid fa-square-full text-[#252830] text-2xl"></i>
        <span class="text-xl font-semibold text-white">Input Order</span>
        <i v-if="!currentModal.recipient" class="fa-solid fa-xmark text-2xl text-white cursor-pointer" @click="closeModal"></i>
        <i v-if="currentModal.recipient" class="fa-solid fa-square-full text-[#252830] text-2xl"></i>
      </div>

      <div class="p-4">
        <div>
          <span class="text-lg font-semibold">Delivery type</span>
        </div>
        <div class="mt-4">
          <div class="flex flex-row justify-around">
            <button @click="selectDeliveryCategory('package')" :class="`h-24 w-24 border rounded-xl flex flex-col items-center justify-center duration-100 ${!deliveryCategory||deliveryCategory=='package'?'shadow':'bg-gray-100 shadow-inner'}`">
              <i class="fa-solid fa-box text-3xl"></i>
              <span class="text-xs my-1">Package</span>
            </button>
            <button @click="selectDeliveryCategory('product')" :class="`h-24 w-24 border rounded-xl flex flex-col items-center justify-center duration-100 ${!deliveryCategory||deliveryCategory=='product'?'shadow':'bg-gray-100 shadow-inner'}`">
              <i class="fa-solid fa-store text-3xl"></i>
              <span class="text-xs my-1">Product</span>
            </button>
            <button @click="selectDeliveryCategory('document')" :class="`h-24 w-24 border rounded-xl flex flex-col items-center justify-center duration-100 ${!deliveryCategory||deliveryCategory=='document'?'shadow':'bg-gray-100 shadow-inner'}`">
              <i class="fa-solid fa-file-contract text-3xl"></i>
              <span class="text-xs my-1">Document</span>
            </button>
          </div>
        </div>
        <div class="mt-4">
          <div v-if="deliveryCategory=='package'||deliveryCategory=='product'">
            <div class="w-full h-64 border flex items-center justify-center rounded-xl">
              <img v-if="activePackageDetail=='neutral'" src="../../assets/icons/box-neutral.svg" alt="box" class="h-48">
              <img v-if="activePackageDetail=='width'" src="../../assets/icons/box-width.svg" alt="box" class="h-48">
              <img v-if="activePackageDetail=='height'" src="../../assets/icons/box-height.svg" alt="box" class="h-48">
              <img v-if="activePackageDetail=='length'" src="../../assets/icons/box-length.svg" alt="box" class="h-48">
            </div>
            <div class="flex flex-row w-full gap-2 mt-4 h-12">
              <div class="relative">
                <label for="Width" class="absolute text-[0.7rem] -top-2 left-1 bg-white px-1">Width (cm)</label>
                <input v-model="packageDimension.w" type="number" min=1 name="Width" class="w-full h-8 border px-2 rounded" @focus="focusPackageDetail('width')" @change="checkNextButton">
              </div>
              <div class="relative">
                <label for="Length" class="absolute text-[0.7rem] -top-2 left-1 bg-white px-1">Length (cm)</label>
                <input v-model="packageDimension.l" type="number" min=1 name="Length" class="w-full h-8 border px-2 rounded" @focus="focusPackageDetail('length')" @change="checkNextButton">
              </div>
              <div class="relative">
                <label for="Height" class="absolute text-[0.7rem] -top-2 left-1 bg-white px-1">Height (cm)</label>
                <input v-model="packageDimension.h" type="number" min=1 name="Height" class="w-full h-8 border px-2 rounded" @focus="focusPackageDetail('height')" @change="checkNextButton">
              </div>
              <div class="relative">
                <label for="Weight" class="absolute text-[0.7rem] -top-2 left-1 bg-white px-1">Weight (kg)</label>
                <input v-model="packageDimension.weight" type="number" min=1 name="Weight" class="w-full h-8 border px-2 rounded" @focus="focusPackageDetail('neutral')" @change="checkNextButton">
              </div>
            </div>
          </div>
          <div v-if="deliveryCategory=='document'">
            <div class="w-full h-64 border flex items-center justify-center rounded-xl">
              <img src="../../assets/icons/document.svg" alt="doc" class="w-56">
            </div>
            <div class="w-full h-12 flex gap-4 mt-4">
              <button @click="selectDeliveryType('personal')" :class="`flex-1 h-8 border rounded-lg duration-100 ${!deliveryType||deliveryType=='personal'?'shadow-sm':'bg-gray-100 shadow-inner'}`">
                <span class="text-sm">Personal</span>
              </button>
              <button @click="selectDeliveryType('confidential')" :class="`flex-1 h-8 border rounded-lg duration-100 ${!deliveryType||deliveryType=='confidential'?'shadow-sm':'bg-gray-100 shadow-inner'}`">
                <span class="text-sm">Confidential</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full absolute bottom-0 pb-8 pt-24 flex justify-center bg-gradient-to-t from-white via-white">
        <button :disabled="!nextButton" @click="openModal('recipient')" :class="`w-[calc(100%-4rem)] flex justify-center p-2 ${!nextButton? 'bg-gray-400':'bg-[#252830]'}`">
          <span class="w-full text-lg text-white">
            <i class="fa-solid fa-person-walking-arrow-right mr-2"></i>
            Next: Recipient details
          </span>
        </button>
      </div>
    </div>

  </div>
</template>