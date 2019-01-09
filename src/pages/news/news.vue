<template>
    <div class="coupons">
      <cartheader title='更多好物'></cartheader>
      <ul class="goods">
        <li class="goods-list" v-for="item in product" :key="item.id" @click="open(item.id,cid)">
          <img :src="item.img" v-lazy="item.img"/>
          <div class="goods-info">
            <h3 class="title">{{item.title}}</h3>
            <p class="sale-info">
              <span class="sale-price">￥{{item.price}}.00</span>
            </p>
          </div>
          <div class="goods-buy">
            <button class="buy-btn">
              <span class="buy-txt">购买</span>
            </button>
          </div>

        </li>
      </ul>
    </div>
</template>

<script>
import cartheader from '../../common/header'
import { Lazyload } from 'vant';
export default {
  name:'coupon',
  data() {
    return {
       product:''
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
              _this.product=res.data.product
        })
     },
      //根据id进入单品页
     open:function(id,cid){
       this.$router.push({path:'product',query:{id:id,cid:cid}})
     } 

  }
}
</script>

<style scoped>
.coupons{
  background: #ffffff;
}
.goods{
  overflow: hidden;
  padding: 0 5px;
  margin-bottom: 60px;
}
.goods-list{
  float: left;
  width: 50%;
  padding:  0 2px;
  position: relative;
}
.goods-list img{
  width: 100%;
  height: 100%;
}
.goods-info{
  padding-bottom: 36px;
  text-align: left;
  padding: 10px;
  padding-bottom: 36px;
}
.goods-info .title{
  font-size: 14px;
  height: 22px;
  overflow: hidden;
  word-break: break-all;
  margin-bottom: 6px;
}
.sale-info{
  height: 26px;
  line-height: 26px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: #f44;
  font-size: 16px;
}
.goods-buy{
  bottom: 10px;
  right: 10px;
  position: absolute;
}
.buy-btn{
  font-size: 14px;
  line-height: 24px;
  height: 26px;
  border-color: #f44;
  color: #f44;
  min-width: 48px;
  cursor: pointer;
  border-radius: 2px;
}
button{
  position: relative;
  padding: 0;
  display: inline-block;
  height: 44px;
  line-height: 42px;
  border-radius: 2px;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  font-size: 16px;
  text-align: center;
  -webkit-appearance: none;
  -webkit-text-size-adjust: 100%;
  background-color: #fff;
  border: 1px solid #eee;
}
button::before{
    content: " ";
    position: absolute;
    top: 50%;
    left: 50%;
    opacity: 0;
    width: 100%;
    height: 100%;
    border: inherit;
    border-color: #000;
    background-color: #000;
    border-radius: inherit;
    -webkit-transform: translate(-50%,-50%);
    -moz-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
}
</style>
