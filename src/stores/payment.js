import { defineStore } from 'pinia'
import { useGeoStore } from '../stores/geoData'
import axios from 'axios'

export const usePaymentStore = defineStore("payment", {
  state(){ 
    return {
      baseUrl: 'http://localhost:3000',
      // baseUrl: 'https://zig-zag-delivery-production.up.railway.app',
      transactionToken:{},
      packageType:{
        letter:false,
        document:false,
        box: false
      },
      packageDetail:{
        type: '',
        note:'',
        dimension:0,
        lon: 0,
        lat: 0,
        duration:3600,
        paymentAmount:0,
        paymentIdentifier:''
      }
    }
  },
  stores: { geoStore: useGeoStore },
  actions: {
    async createPayment(){
      try {
        // console.log('masuk payment')
        this.packageDetail.paymentAmount=10000
        this.packageDetail.paymentIdentifier = new Date().toDateString()
        const { data } = await axios({ method:'POST', url: this.baseUrl + '/payments', data: this.packageDetail })
        console.log(data)
        this.router.push('/m/destination')
      } catch (error) {
        console.log(error)
      }
    },


    async handlePayment(){
      // do something
      try {
        const { data } = await axios({ method:'GET', url: this.baseUrl + '/payments' })        
        
        window.snap.pay(`${data.transactionToken}`, {
          onSuccess: async (result) => {
            this.router.push('/')
            console.log(result)
        },
        onPending: function (result) {
            this.router.push('/')
            console.log(result, "wating your payment!");
          },
          onError: function (result) {
            this.router.push('/')
            console.log(result, "payment failed!");
          },
          onClose: function () {
            this.router.push('/')
            console.log('you closed the popup without finishing the payment');
          }
      })


      } catch (error) {
        console.log(error)
      }
    },
  },
});
