<template>
    <div class="home">
       <div class="home_top">
         <img :src="homedata.topimg">
         <div class="home_juan"  v-for="(juan,index) in homedata.juanimg" :key="index"  @click="tips">
           <img :src="juan"/>
         </div>
       </div>
       <div class="home_continer">
          <div class="home_box" v-for="item in homedata.product" :key="item.id" @click="open(item.id,cid)">
            <img :src="item.img"/>
            <p class="title">{{item.title}}</p>
            <p class="twotitle">{{item.twotitle}}</p>
            <div class="sale_info">
              <span class="sale_price">￥{{item.price}}</span>
              <button class="button_go">马上抢</button>
            </div>
          </div>
       </div>
       <p class="bottom">已经到底啦~</p>
    </div>
  
</template>

<script>
import axios from 'axios';
export default {
  name:'home',
  data(){
    return{
      homedata:[],
      cid:this.$route.query.cid
    }
  },
  mounted:function(){ 
    this.getData()
    console.log('参数',this.$route.query.cid)
  },
  methods:{
    //获取数据
     getData:function(){
        this.$axios.get("/api/js/shopData.json").then(res=>{
            console.log(res.data)
            this.homedata=res.data
        })
     },
     //领取成功提示
     tips() {
        this.$notify({
          title: '领取成功',
          message: '赶快去下单吧',
          type: 'success'
        });
      },
     //根据id进入单品页
     open:function(id,cid){
       this.$router.push({path:'product',query:{id:id,cid:cid}})
     } 
  },
  
}
</script>

<style>
.home{
  max-width: 640px;
  height: 100%;
  margin: 0 auto;
  margin-bottom: 80px;
}
.home_top img{
  width: 100%;
  height: 100%;
}
.home_juan{
  width: 50%;
  display: inline-block;
}
.home_juan img{
  padding: 8px;
}
.home_box{
  background:#fff;
  padding:10px 15px;
}
.home_box img{
  width: 100%;
  height: 100%;
}
.home_box .title{
  margin:5px 0;
  word-break:break-all;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  padding-left:5px;
  font-size:14px;
}
.home_box .twotitle{
  font-size:12px;
  color:#999;
  line-height:15px;
  height:15px;
  padding-left:5px;
  margin: 5px 0;
}
.home_box .sale_info{
  margin-top:10px;
  height:20px;
  line-height:20px;
  position:relative;
  padding-left:5px;
}
.home_box .sale_price{
  color:#f44;
  font-size:14px;
  position: absolute;
}
.home_box button{
  position:absolute;
  right:10px;
  color:#fff;
  background-color:#f44;
  border:1rpx solid #f44;
  border-radius:14px;
  font-size:12px;
  line-height:20px;
  height:20px;
  padding:0 10px;
  cursor:pointer;
  top:0;
  border: 0;
}
.bottom{
  text-align: center;
  color: #cccccc;
  line-height:50px;
  font-size: 14px;
}
</style>

