<template>
    <div class="product">
      <div class="top">
        <img :src="productData.img"  v-lazy="productData.img"/>
      </div>
      <div class="goods-header">
        <div class="goods-title">
          <div class="goods-title__main">{{productData.title}}</div>
          <h3 class="goods-title__sub">{{productData.twotitle}}</h3>
        </div>

        <div class="goods-price">
          <div class="goods-price__current theme__color">
            <span>¥&nbsp;</span>
            <i class="goods-price__current-price-text">{{productData.price}}.00</i>
          </div>
        </div>

        <div class="goods-stock van-row">
          <div class="van-col van-col--8">
            运费:<span class="goods-stock__postage">全国包邮</span>
          </div>
          <div class="van-col van-col--8">
            付款:<span class="goods-stock__postage">货到付款</span>
          </div>
        </div>
      </div>

      <div class="promotion-block">
        <div class="promotion-block__content">
          <van-tag color="#f44" plain>满减</van-tag>
          <span class="promotion-item">全场满100减5,满199减10</span>
        </div>
      </div>

      <!-- 选择套餐 -->
      <van-cell-group style="margin:10px 0;">
        <van-cell title="选择: 颜色,尺寸" is-link  @click="cartshow"/>
      </van-cell-group>
      <!-- 选择套餐 -->

      <!-- 官方 -->
      <div class="goods-detail" @click="boxshow">
        <div class="goods-shop van-cell">
          <img src="https://img.alicdn.com/imgextra/i3/2445381426/O1CN011MP9FH3btiq9z9n_!!2445381426.jpg" class="goods-shop__logo">
          <div class="goods-shop__content">
            <div class="goods-shop__top">
              <h3 class="goods-shop__title">好彩商城</h3>
              <!-- <div class="goods-shop__tags">
                <span class="goods-shop__tag van-tag ">官方</span>
              </div> -->
              <van-tag type="danger">官方</van-tag>
              <van-icon name="arrow" style="color: #999;font-size: 12px;line-height: 24px;float:right;margin-right:15px"/>
            </div>
          </div>
        </div>

          <div class="van-cell goods-certification">
            <span class="goods-certification__item">
              <i class="el-icon-circle-check-outline"></i>
              <span class="goods-certification__txt">官字店认证</span>
            </span>
            <span class="goods-certification__item">
              <i class="el-icon-circle-check-outline"></i>
              <span class="goods-certification__txt">担保交易</span>
            </span>
        </div>
      </div>  
      <!-- 官方 -->
      <!-- tabs -->
        <van-tabs style="margin-top:10px;z-index:1">
          <van-tab title="商品详情">
            <div class="goods-detail-img" v-for="(goods,index) in productData.content" :key="index">
              <img :src="goods"/>
            </div>
          </van-tab>
          <van-tab title="本店成交"><chengjiao></chengjiao></van-tab>
        </van-tabs>
      <!-- tabs -->
      <!-- button -->
      <van-goods-action style="z-index:18">
          <van-goods-action-mini-btn icon="shop" text="店铺" :to="{name:'home',query:{cid:this.$route.query.cid}}" />
          <van-goods-action-mini-btn icon="cart" text="购物车" :to="{name:'cart',query:{cid:this.$route.query.cid}}" :info='this.$store.state.carts.length' />
          <van-goods-action-big-btn  text="加入购物车" @click="add"  style="background-color:#f85" />
          <van-goods-action-big-btn text="立即购买" @click="pay" primary />
      </van-goods-action>
      <!-- button -->
      <!-- 购物车 -->
      <div class="van-sku-container van-popup van-popup--bottom" style="z-index: 20;" v-show="iscart">
        <div class="van-sku-header">
          <div class="van-sku-header__img-wrap">
            <img :src="showimg">
          </div>
          <div class="van-sku-header__goods-info">
            <div class="van-sku__goods-name van-ellipsis">{{showtaocan}}</div>
            <div class="van-sku__goods-price">
              <span>￥{{showprice}}.00</span>
            </div>
            <van-icon name="close" class="van-sku__close-icon" @click="cartclose" />
          </div>
        </div>
        <div class="van-sku-body" style="max-height:300px;overflow-y: auto;">
          <div class="van-line"></div>
          <div class="van-sku-group-container">
            <div class="van-sku-row">
              <div class="van-sku-row__title">产品套餐:</div>
                <template  v-for="(productPackage,index) in productTaocan" >
                  <span class="van-sku-row__item" :key="index" :class="[index==cur?'van-sku-row__item--active' :'']" @click="selecttaocan(index)">{{productPackage.taocan}}</span>
                </template>
            </div>
            <template  v-for="(productSx,sx) in productShuxing">
              <div class="van-sku-row" :key="sx">
                  <div class="van-sku-row__title">{{productSx.texttexing}}</div>
                    <template v-for="(productTx,tx) in productSx.texing"> 
                        <label  type="radio" :value='productTx.tx' :checked='productTx.check' class="van-sku-row__item" :key="tx" :class="[productTx.checked ? 'van-sku-row__item--active' :'']" @click="selecttx(tx,sx)">{{productTx.tx}}</label>
                    </template> 
              </div>
            </template>
          </div>  
          <div class="van-line"></div>
          <div class="van-sku-stepper-stock">
            <div class="van-sku-stepper-container">
              <div class="van-sku__stepper-title">购买数量：</div>
              <van-stepper style="float:right"/>
            </div>
          </div>
          <div class="van-sku-messages"></div>
        </div>
        <div class="van-sku-actions">
          <button class="sku-button" :class="[ispay ? 'none':'block']" @click="addcart(productData.id)" style="background-color:#f85">
            <span class="van-button__text">加入购物车</span>
          </button>

          <button class="sku-button" :class="[isadd ? 'none':'block']" @click="paycart(productData.id)">
            <span class="van-button__text">立即购买</span>
          </button>
        </div>
      </div>
      <div class="sku-modal"  v-show="iscart" style="z-index: 19;"></div>
    </div>  
</template>

<script>
import { Toast,Lazyload,Dialog,Sku,Icon } from 'vant';
import chengjiao from "./component/chengjiao";
import { mapGetters,mapMutations } from  'vuex';
import axios from "axios";
export default {
  name:"product",
  components:{
    chengjiao
  },
  data(){
    return{
      show:false,
      activeName: 'first',
      productData:[],
      productTaocan:[],
      productShuxing:[],
      productTx:[],
      isChecked:[],
      cur:0,
      curtx:0,
      cursx:0,
      count:1,
      //弹窗
      iscart:false,
      ispay:false,
      isadd:false,
      // 选中套餐的参数
      showimg:'',
      showtaocan:'',
      showprice:'',
      showshuxing:'',
      transitionName:'',
    }
  },
  computed:{
    ...mapGetters(
      ['this.$store.state.carts']
    )
  },
  mounted() {
     console.log('参数',this.$route.query.cid)
  },
  methods: {
    //介绍弹窗
    boxshow(){
      console.log('111')
      Dialog.alert({
          title: '关于我们',
          message: '精选商品,为你提供正品好货的平台的商城'
      }).then(() => {
          // on close
      });
    },
 
    //购物车弹窗
    cartshow(){
      this.iscart=true
      this.isadd=false
      this.ispay=false
      this.productShuxing=this.productTaocan[this.cur].shuxing
    },
    //购物车弹窗关闭
    cartclose(){
      this.iscart=false
    },
    //底部加入购物车弹窗
    add(){
      this.iscart=true
      this.isadd=true
      this.ispay=false
      this.productShuxing=this.productTaocan[this.cur].shuxing
    },
    //底部立即购买弹窗
    pay(){
      this.iscart=true
      this.isadd=false
      this.ispay=true
      this.productShuxing=this.productTaocan[this.cur].shuxing
    },
    //加入购物车
    addcart(productid){
      var cartData={
        id:productid,
        value:this.count,
        taocan:this.showtaocan,
        shuxing:this.showshuxing,
        price:this.showprice,
        img:this.showimg,
        danxuan:false
      }
      this.$store.commit("SET_CARTS",cartData);
       Dialog.alert({
          title: '加入购物车成功',
       }).then(() => {
          this.iscart=false
       });
    },                
    //立即购买
    paycart(productid){
        var cid=this.$route.query.cid
        var payDataArr=[]
        var payData= {
          id:productid,
          value:this.count,
          taocan:this.showtaocan,
          shuxing:this.showshuxing,
          price:this.showprice,
          img:this.showimg,
          danxuan:false
        }
        payDataArr.push(payData)
       this.$store.commit("SET_SELECTCARTS",payDataArr);
       this.$router.push({path:'/pay',query:{cid:cid}})
    },
    //加
    plus(count){
      this.count++;
    },
    //减
    minus(count){
      if(this.count<=1){
        this.count=1
        
      }else{
        this.count--;
      }
    },
    //选择套餐
    selecttaocan(index){
      this.cur=index
      this.productShuxing=this.productTaocan[this.cur].shuxing
      this.showtaocan=this.productTaocan[this.cur].taocan
      this.showimg=this.productTaocan[this.cur].img
      this.showprice=this.productTaocan[this.cur].price
    },
    //选择特性
    selecttx(tx,sx){
      var _this=this
      _this.cursx=sx;
      _this.curtx=tx;
      _this.productTx=_this.productTaocan[_this.cur].shuxing[_this.cursx].texing
      _this.productTx.forEach(function(v,i){
         if(i==tx){
           v.checked=true
         }else{
           v.checked=false
         }
      })
      var shuxingarr = '';
      for(let i=0;i<_this.productShuxing.length;i++){
        for(let j=0;j<_this.productShuxing[i].texing.length;j++){
           if(_this.productShuxing[i].texing[j].checked){
              shuxingarr +=_this.productShuxing[i].texttexing+':'+_this.productShuxing[i].texing[j].tx
           }
        }
      }
       _this.showshuxing=shuxingarr   
    },

  },
  created(){
    var _this=this;
    var id=this.$route.query.id
    console.log("当前页面的id",id)
     _this.$axios.get("/api/js/shopData.json").then(res=>{
       console.table(res.data.product[id].profullnamea)
      _this.productData=res.data.product[id]
      _this.productTaocan=res.data.product[id].profullnamea
      //设置选中的参数(图片,价格,套餐)
      _this.showimg=_this.productTaocan[0].img
      _this.showprice=_this.productTaocan[0].price
      _this.showtaocan=_this.productTaocan[0].taocan
      //如果有属性的话,获取到默认属性的数组
      if(_this.productTaocan[0].shuxing !==undefined){
        console.log('有属性的进来')
        console.table(_this.productTaocan[0].shuxing)
         for(var i=0;i<_this.productTaocan[0].shuxing.length;i++){
            _this.productTaocan[0].shuxing[i].texttexing
            var texttexingTitele=_this.productTaocan[0].shuxing[i].texttexing;
            for(let j=0;j<_this.productTaocan[0].shuxing[i].texing.length;j++){
                if(_this.productTaocan[0].shuxing[i].texing[j].checked){
                    _this.showshuxing +=texttexingTitele+':'+ _this.productTaocan[0].shuxing[i].texing[j].tx
                }
                
            }
         }
      }else{
        console.log('没有属性')
      }
     
     })
  }
}
</script>

<style scoped>
/* 切换样式 */
.block{
  display: block !important;
}
.none{
  display: none !important;
}  
/* 切换样式 */
.product{
  max-width: 640px;
  height: 100%;
  margin: 0 auto;
}
.top img{
  width: 100%;
  height: 100%;
}
.van-cell__title span{
  font-size: 12px;
  color: #666
}
.goods-header {
  position: relative;
  background-color: #fff;
}
.goods-title {
  padding: 10px 10px 0;
}
.goods-title__main {
  display: inline;
  font-size: 16px;
  line-height: 22px;
  text-align: left;
  word-break: break-all;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.goods-title__sub {
  margin-top: 6px;
  font-size: 13px;
  color: #999;
  line-height: 18px;
}
.goods-price {
  padding: 10px;
  text-align: left;
}
.goods-price__current {
  display: inline-block;
  margin-right: 5px;
  vertical-align: middle;
  font-size: 14px;
  color: #f44;
}
.goods-price__current span {
  display: inline-block;
  vertical-align: middle;
  font-size: 16px;
}
.goods-price__current-price-text {
  display: inline-block;
  vertical-align: middle;
  font-size: 18px;
  font: inherit;
}
.promotion-block {
  line-height: 40px;
}
.promotion-block__content {
  position: relative;
  padding: 0 15px 0 10px;
  vertical-align: middle;
  background-color: #ffffff;
  margin-bottom: 10px;
}

.promotion-item {
  font-size: 12px;
  color: #666;
}
.goods-stock {
  position: relative;
  padding: 0 10px;
  line-height: 12px;
  background-color: #fff;
  font-size: 12px;
  color: #999;
  height: 32px;
}
.goods-stock .van-col {
  padding: 10px 0;
  float: left;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.van-col--8 {
  width: 33.33333%;
}
.goods-stock .van-col:nth-child(2) {
  text-align: center;
}
.goods-bar-group {
  margin: 10px 0;
  text-align: center;
  cursor: pointer;
}

.goods-shop{
  padding-left: 10px;
  padding-right: 10px;
  overflow: hidden;
}
.goods-shop__logo {
  float: left;
  width: 50px;
  height: 50px;
}
.goods-shop__content {
  position: absolute;
  top: 50%;
  left: 70px;
  right: 0;
  padding-right: 10px;
  min-height: 50px;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
}
.goods-shop__logo {
  float: left;
  width: 50px;
  height: 50px;
}
.goods-shop__top{
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
}
.goods-shop__title {
  display: inline-block;
  margin-right: 5px;
  font-size: 14px;
  color: #111;
}
.goods-shop__tags {
  display: inline-block;
}
.goods-shop__tag:first-child {
  margin-left: 0;
}
.goods-shop__tag {
  margin-left: 5px;
  vertical-align: middle;
  word-break: keep-all;
  background: #f44;
}
.van-tag {
  display: inline-block;
  padding: 2px 5px;
  line-height: normal;
  border-radius: 3px;
  font-size: 10px;
  color: #fff;
}
.goods-certification {
  position: relative;
  padding-top: 10px;
  line-height: 1.5;
  font-size: 12px;
  color: #666;
}
.goods-certification__item {
  padding-right: 16px;
  white-space: nowrap;
}

/* 图文详情 */

.goods-detail-img{
  font-size: 0;
}
.goods-detail-img img{
  width: 100%;
  height: 100%;
  display:block;
}
.sku-button{
  width: 100%;
  height: 50px;
  line-height: 50px;
  border: 0;
  border-radius: 0;
  font-size: 16px;
  color: #fff;
  background-color: #f44;
  position: relative;
  padding: 0 15px;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  display: inline-block;
  text-align: center;
}
.sku-button:before {
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
.sku-modal{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,.7);
}
/* 动画效果 */
.fold-left-enter-active {
 animation-name: fold-left-in;
 animation-duration: .3s;
 }
 .fold-left-leave-active {
 animation-name: fold-left-out;
 animation-duration: .3s;
 }
.fold-right-enter-active {
 animation-name: fold-right-in;
 animation-duration: .3s;
 }
 .fold-right-leave-active {
 animation-name: fold-right-out;
 animation-duration: .3s;
 }
</style>
