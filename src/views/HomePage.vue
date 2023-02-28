<script>

  import OrderHistoryCard from "../components/OrderHistoryCard.vue";
  import ActiveOrderCard from "../components/ActiveOrderCard.vue";
  import OrderDetail from "../components/modals/OrderDetail.vue";
  import Recipient from "../components/modals/Recipient.vue";
  import Summary from "../components/modals/Summary.vue";
  
  export default {
    components:{
    ActiveOrderCard,
    OrderHistoryCard,
    OrderDetail,
    Recipient,
    Summary
},
    data(){
      return {
        // Web
        open: true,
        currentModal:{
          orderDetail:false,
          recipient:false,
          summary:false,
        }
      }
    },
    created() {},
    mounted() {},
    methods: {
      openModal(modalName){
        this.currentModal[modalName] = true;
      },
      prevModal(modalName){
        this.currentModal[modalName] = false;
      },
      closeModal(){
        this.currentModal.orderDetail = false;
        this.currentModal.recipient = false;
        this.currentModal.summary = false;
      },
      
    },
    watch:{},
    computed: {}
  };
</script>

<template>
  <!-- Desktop View -->
  <div class="h-screen w-full bg-cyan-600 relative max-md:hidden">
    <div class="h-full w-full">
      <div class="bg-slate-500 h-full w-full flex float-left realtive">
        <div class="h-full w-20 bg-[#252830]"></div>
        <div class="h-full w-96 bg-[#b6c8c9]">
          <div class="h-full w-full pt-8 relative">

            <div class="h-20 w-full px-8 pb-8">
              <span class="text-4xl font-bold">Zig Zag Delivery</span>
            </div>

            <div class="h-[calc(100%-6rem)] w-full overflow-auto scrollbar-hide px-8">
              <div class="w-full">
                <span class="text-xl font-semibold mb-4">Active orders</span>
                <div class="my-4">
                  <span class="text-sm grid justify-center my-2">You don't have any active order</span>
                  <ActiveOrderCard />
                  <ActiveOrderCard />
                  <ActiveOrderCard />
                  <ActiveOrderCard />
                  <ActiveOrderCard />
                  <ActiveOrderCard />
                </div>
              </div>
    
              <!-- Order History -->
              <div class="w-full ">
                <span class="text-xl font-semibold mb-4">Order History</span>
                <div class="my-4">
                  <OrderHistoryCard />
                  <OrderHistoryCard />
                  <OrderHistoryCard />
                  <OrderHistoryCard />
                  <OrderHistoryCard />
                  <OrderHistoryCard />
                </div>
              </div>
            </div>

            <div class="w-full absolute bottom-0 pb-8 pt-24 flex justify-center bg-gradient-to-t from-[#b6c8c9] via-[#b6c8c9]">
              <button :disabled="currentModal.orderDetail" @click="openModal('orderDetail')" :class="`w-[calc(100%-4rem)] flex justify-center p-2 ${currentModal.orderDetail? 'bg-gray-400':'bg-[#252830]'}`">
                <span class="w-full text-xl font-semibold text-white"><i class="fa-solid fa-bus-simple mr-2"></i>Create Order</span>
              </button>
            </div>
            
          </div>
        </div>
        <div class="h-full w-[calc(100%-29rem)]">
          <img src="../assets/images/staticBackground.png" alt="static" class="h-full w-full object-cover z-0"/>
        </div>

        
        <OrderDetail v-if="currentModal.orderDetail" :modalName="`orderDetail`" :currentModal="currentModal" @closeModal="closeModal" @openModal="openModal" @prevModal="prevModal" :class="`z-10 absolute right-4 duration-100 ${currentModal.recipient?(currentModal.summary?`opacity-80`:`opacity-90`):``}`"></OrderDetail>
        <Recipient v-if="currentModal.recipient" :modalName="`recipient`" :currentModal="currentModal" @closeModal="closeModal" @openModal="openModal" @prevModal="prevModal" :class="`z-20 absolute right-8 duration-100 ${currentModal.summary?`opacity-90`:``}`"></Recipient>
        <Summary v-if="currentModal.summary" :modalName="`summary`" :currentModal="currentModal" @closeModal="closeModal" @openModal="openModal" @prevModal="prevModal" :class="`z-30 absolute right-12 duration-100`"></Summary>
        
      </div>
      
      <!-- <div class="bg-slate-500 h-full w-full"></div> -->
    </div>
  </div>
</template>

<style scoped>
/* For Webkit-based browsers (Chrome, Safari and Opera) */
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

/* For IE, Edge and Firefox */
.scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}
</style>