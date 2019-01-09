<template>
    <div class="coupons">
      <cartheader title='优惠券'></cartheader>
       
       
       <ul class="promote-card-list" style="margin-top:20px" @click="lingqu">
         <li>
           <img :src="juanimg[0]">
         </li>
         <li style="margin-top: 20px;">
           <img :src="juanimg[1]">
         </li>
       </ul>
    </div>
</template>

<script>
import cartheader from '../../com/header'
export default {
  name:'coupon',
  data() {
    return {
       juanimg:''
    }
  },
  components:{
    cartheader
  },
  mounted:function(){
   this.getData()
    console.log('参数',this.$route.query.cid)
  },
  methods: {
     //获取数据
     getData:function(){
        var _this=this;
        _this.$axios.get("/api/js/shopData.json").then(res=>{
            console.log(res.data)
              _this.juanimg=res.data.juanimg
        })
     },
     lingqu:function(){ 
        this.$notify({
          title: '领取成功',
          message: '赶快去下单吧',
          type: 'success'
        });
     }

  }
}
</script>

<style>

.promote-card-list {
    margin: 0 30px;
}
img{
  width: 90%;
  margin: 0 auto;
  height: 130px;
  display:block;
}

</style>
