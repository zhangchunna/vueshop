<template>
    <div class="product">
      <div class="top">
        <img :src="productData.img"/>
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
          <span class="van-manjian">满减</span>
          <span class="promotion-item">全场满100减5,满199减10</span>
        </div>
      </div>
     
      <!-- <div class="goods-bar-group van-cell-group" @click="cartshow">
        <div class="van-cell">
          <div class="van-cell__title"><span>选择: {{showtaocan}}</span></div>
          <i class="el-icon-arrow-right"></i>
        </div>
      </div> -->
      <!-- 选择套餐 -->
      <van-cell-group>
        <van-cell title="选择: 颜色,尺寸" is-link />
      </van-cell-group>
      <!-- 选择套餐 -->
      
      <!-- 官方 -->
      <div>
        <div class="goods-shop van-cell"  @click="show=!show">
          <img src="https://img.alicdn.com/imgextra/i3/2445381426/O1CN011MP9FH3btiq9z9n_!!2445381426.jpg" class="goods-shop__logo">
          <div class="goods-shop__content">
            <div class="goods-shop__top">
              <h3 class="goods-shop__title">好彩商城</h3>
              <div class="goods-shop__tags">
                <span class="goods-shop__tag van-tag ">官方</span>
              </div>
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
        </div>

        <div>
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
      </div>
      <!-- 隐藏 -->
      <el-collapse-transition>
      <div class="tag-van" style="z-index: 1000;" v-show="show">
        <div class="van-popup van-popup--bottom">
          <div class="tag-intro">
            <div class="tag-intro__tag">
              <p class="tag-intro__tag-name"><i class="icongou iconfont icon-xuan"></i>官字店认证</p>
              <p class="tag-intro__tag-desc">该店铺已通过官字店-旗舰店认证，商家已公示经营证照</p>
            </div>
            <div class="tag-intro__tag">
              <p class="tag-intro__tag-name"><i class="icongou iconfont icon-xuan"></i>担保交易</p>
              <p class="tag-intro__tag-desc">该店铺交易资金担保，买家确认收货后才结算给商家</p>
            </div>
          </div>
          <button class="van-button" v-show="show" @click="boxclose">
            <span class="van-button__text">我知道了</span>
          </button>
        </div>
      </div> 
      </el-collapse-transition>
     
      <div class="van-modal"  v-show="show" style="z-index: 999;"></div>
      
      <!-- 隐藏 -->
      <!-- 官方 -->
      <!-- tabs -->
      <div class="goods-detail">
         <el-tabs v-model="activeName"  class="goods-tabs">
          <el-tab-pane label="商品详情" name="first">
            <div class="goods-detail-img" v-for="(goods,index) in productData.content" :key="index">
              <img :src="goods"/>
            </div>
          </el-tab-pane>
          <el-tab-pane label="本店成交" name="second">
            <chengjiao></chengjiao>
          </el-tab-pane>
        </el-tabs>
      </div>
      <!-- tabs -->
      <!-- button -->
      <div class="goods-bottom content">
          <div class="goods-buttons__mini">
            <router-link :to="{name:'home'}" tag="a" class="goods-buttons_icon">
              <i class="iconfont icon-dianpu" style="color:#f44;"></i>
              <span>店铺</span>
            </router-link>
            <router-link :to="{name:'cart'}" tag="a" class="goods-buttons_icon">
              <i class="iconfont icon-tubiaozhizuomoban"></i>
              <span>购物车</span>
            </router-link>
          </div>
          <a class="goods-action-big-btn" @click="add">
            <span class="goods-button__text">加入购物车</span>
          </a>
          <a class="goods-action-big-btn" @click="pay">
            <span class="goods-button__text">立即购买</span>
          </a>
      </div>
      <!-- button -->
      <!-- 购物车 -->
    <el-collapse-transition>
      <div class="van-sku-container van-popup van-popup--bottom" style="z-index: 1000;" v-show="iscart">
        <!-- header -->
        <div class="van-sku-header">
          <div class="van-sku-header__img-wrap">
            <img :src="showimg">
          </div>
          <div class="van-sku-header__goods-info">
            <div class="van-sku__goods-name van-ellipsis">{{showtaocan}}</div>
            <div class="van-sku__goods-price">
              <span>￥{{showprice}}.00</span>
            </div>
            <i class="el-icon-circle-close-outline icon-close"  @click="cartclose" v-show="iscart"></i>
          </div>
        </div>
        <!-- header -->
        <!-- body -->
        <div class="van-sku-body" style="max-height: 651px;">
          <div class="van-line"></div>
          <div class="van-sku-group-container">
            <!-- 产品套餐 -->
            <div class="van-sku-row">
              <div class="van-sku-row__title">产品套餐:</div>
                <template  v-for="(productPackage,index) in productTaocan" >
                  <span class="van-sku-row__item" :key="index" :class="[index==cur?'van-sku-row__item--active' :'']" @click="selecttaocan(index)">{{productPackage.taocan}}</span>
                </template>
            </div>
            <!-- 产品套餐 -->
            <!-- 产品规格 -->
            
            <template  v-for="(productSx,sx) in productShuxing">
              <div class="van-sku-row" :key="sx">
                  <div class="van-sku-row__title">{{productSx.texttexing}}</div>
                    <template v-for="(productTx,tx) in productSx.texing"> 
                        <label  type="radio" :value='productTx.tx' :checked='productTx.check' class="van-sku-row__item" :key="tx" :class="[productTx.checked ? 'van-sku-row__item--active' :'']" @click="selecttx(tx,sx)">{{productTx.tx}}</label>
                    </template> 
              </div>
            </template>
            <!-- 产品规格 -->
          </div>  
          <div class="van-line"></div>
          <div class="van-sku-stepper-stock">
            <div class="van-sku-stepper-container">
              <div class="van-sku__stepper-title">购买数量：</div>
              <div class="van-sku__stepper van-stepper">
                <button class="van-stepper__minus" @click="minus"></button>
                <input type="text" class="van-stepper__input"   v-model="count">
                <button class="van-stepper__plus" @click="plus" ></button>
              </div>
            </div>
          </div>
          <div class="van-sku-messages"></div>
        </div>
        <!-- body -->
        <div class="van-sku-actions">
          <button class="van-button" :class="[ispay ? 'none':'block']" @click="addcart(productData.id)">
            <span class="van-button__text">加入购物车</span>
          </button>
          <button class="van-button" :class="[isadd ? 'none':'block']" @click="paycart">
            <span class="van-button__text">立即购买</span>
          </button>
        </div>
      </div>
    </el-collapse-transition>
      <!-- 购物车 -->
      <div class="van-modal" style="z-index: 999;" v-show="iscart"></div>
      
    </div>
    
</template>

<script>
import { Toast } from 'vant';
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
      iscart:false,
      isadd:false,
      ispay:false,
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
      // 选中套餐的参数
      showimg:'',
      showtaocan:'',
      showprice:'',
      showshuxing:''
    
    }
  },
  computed:{
    ...mapGetters(
      ['this.$store.state.carts']
    )
  },
  methods: {
    //介绍弹窗
    boxclose(){
      this.show=false
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
    add(index){
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
        img:this.showimg
      }
      this.$store.commit("SET_CARTS",cartData);
      MessageBox("提示", "加入购物车成功!");

    },                
    //立即购买
    paycart(){

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
     _this.$axios.get("/js/shopData.json").then(res=>{
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

<style>
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
  background-color: #ffffff
}
.van-manjian{
  margin-right: 5px;
  background-color: #fff;
  color: #f44;
  border:1px solid #f44;
  display: inline-block;
  padding: 2px 5px;
  line-height: normal;
  border-radius: 3px;
  font-size: 10px;

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

.el-icon-arrow-right {
  color: #999;
  font-size: 16px;
  line-height: 24px;
  margin-left: 5px;
  position: absolute;
  right:10px;
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
  padding-top: 0;
  line-height: 1.5;
  font-size: 12px;
  color: #666;
}
.goods-certification__item {
  padding-right: 16px;
  white-space: nowrap;
}
/* tabs */
.goods-detail {
  margin-top: 10px;
}
.goods-tabs{
  height: 44px;
  background-color: #fff;
  -moz-box-sizing: content-box;
  box-sizing: content-box;
}
.el-tabs__header{
  margin: 0;
}
.el-tabs__content{
  margin-bottom: 50px;
}
.el-tabs__item{
  width: 50%;
  height: 44px;
}
.el-tabs__nav{
  float: none;
  text-align: center
}
.el-tabs__item.is-active{
  color: #f44;
}
.el-tabs__active-bar{
  background-color: #f44;
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
/* button */
.goods-bottom {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #fff;
  z-index: 100;
  max-width: 640px;
  margin: 0 auto;
  height: 50px;
  line-height: 50px;
}
.goods-buttons__mini {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  font: inherit;
  font-size: 100%;
  vertical-align: baseline;
  width: 25%;
  float: left;
}
.goods-buttons_icon{
  width: 48rem;
  color: #666;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: flex;
  height: 50px;
  font-size: 10px;
  min-width: 15%;
  line-height: 1;
  text-align: center;
  background-color: #fff;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -moz-box-orient: vertical;
  -moz-box-direction: normal;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -moz-box-pack: center;
  justify-content: center;
}
.goods-buttons_icon i{
  width: 1em;
  font-size: 20px;
  margin: 0 auto 5px;
  display: inline-block;
}
.goods-buttons_icon span{
  text-align: center;
  font-size: 12px;
}

.goods-action-big-btn{
  width: 37.5%;
  color: #ffffff;
  text-align: center;
  position: absolute;
  background-color: #f85;
}
.goods-action-big-btn:first-child{
  
  left: 0;
}
.goods-action-big-btn:last-child{
  background-color: #f44;
  right: 0;
  
}
.tag-van{
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
}
.van-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  max-height: 100%;
  overflow-y: auto;
  background-color: #fff;
  -webkit-transition: .3s ease-out;
  -moz-transition: .3s ease-out;
  transition: .3s ease-out;
  -webkit-overflow-scrolling: touch;
  -webkit-transform: translate3d(-50%,-50%,0);
  -moz-transform: translate3d(-50%,-50%,0);
  transform: translate3d(-50%,-50%,0);
}
.van-popup--bottom{
  width: 100%;
  top: auto;
  bottom: 0;
  right: auto;
  left: 50%;
  -webkit-transform: translate3d(-50%,0,0);
  -moz-transform: translate3d(-50%,0,0);
  transform: translate3d(-50%,0,0);
}
.tag-intro {
  padding: 15px;
}
.tag-intro__tag {
  padding: 10px 0;
}
.tag-intro__tag-name {
  font-size: 12px;
  color: #111;
}
.icongou::before {
  padding-right: 5px;
  display: inline-block;
  vertical-align: middle;
  width: 15px;
  height: 15px;
  color: #f44
}
.tag-intro__tag-desc {
  padding-top: 10px;
  padding-left: 20px;
  font-size: 12px;
  color: #666;
  line-height: 1.2;
}
.van-button{
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
.van-button:before {
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
.van-modal{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,.7);
}
/* 购物车 */
.van-sku-container {
  font-size: 14px;
  background: #fff;
  overflow-y: visible;
}
.van-sku-header {
  margin-left: 15px;
}
.van-sku-header__img-wrap {
  position: relative;
  float: left;
  margin-top: -10px;
  width: 80px;
  height: 80px;
  background: #f8f8f8;
  border-radius: 2px;
}
.van-sku-header__img-wrap img {
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  max-width: 100%;
  max-height: 100%;
}
.van-sku-header__goods-info {
  padding: 10px 60px 10px 10px;
  min-height: 82px;
  overflow: hidden;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.van-sku__goods-name {
  font-size: 14px;
}
.van-ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.van-sku__goods-price {
  color: #f44;
  margin-top: 10px;
  vertical-align: middle;
}
.van-sku__goods-price{
  font-size: 14px;
}
.icon-close{
  top: 10px;
  right: 15px;
  font-size: 20px;
  color: #999;
  position: absolute;
  text-align: center;
}
.van-sku-body {
  max-height: 350px;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
.van-sku-group-container {
  margin-left: 15px;
  padding: 12px 0 2px;
}
.van-sku-row:last-child {
  margin-bottom: 0;
}
.van-line{
  border-top: 1px solid #e5e5e5;
  filter:alpha(opacity=50);
  -moz-opacity:0.5;
  opacity: 0.5;
  margin-left: 15px;
}
.van-sku-row__title {
  padding-bottom: 10px;
}
.van-sku-row__item {
  display: inline-block;
  padding: 5px 9px;
  margin: 0 10px 10px 0;
  height: 28px;
  min-width: 52px;
  line-height: 16px;
  font-size: 12px;
  color: #333;
  text-align: center;
  border: 1px solid #999;
  border-radius: 3px;
  -moz-box-sizing: border-box;
  box-sizing: border-box; 
}
.van-sku-row__item--active {
  color: #fff;
  border-color: #f44;
  background: #f44;
}
.van-sku-stepper-stock {
  padding: 12px 0;
  margin-left: 15px;
}
.van-sku-stepper-container {
  height: 30px;
  margin-right: 20px;
}
.van-sku__stepper-title{
  float: left;
  line-height: 30px;
}
/* 选择数量 */
.van-sku__stepper {
  float: right;
}
.van-stepper {
    font-size: 0;
}
.van-stepper__minus {
  border-radius: 2px 0 0 2px;
}
.van-stepper__minus--disabled {
  background-color: #f8f8f8 !important;
}
.van-stepper__minus, .van-stepper__plus {
  width: 40px;
  height: 30px;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  position: relative;
  padding: 5px;
  vertical-align: middle;
}
.van-stepper__minus:after, 
.van-stepper__minus:before, 
.van-stepper__plus:after, 
.van-stepper__plus:before {
  content: "";
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #6c6c6c;
}
.van-stepper__minus:before, 
.van-stepper__plus:before {
  width: 9px;
  height: 1px;
}

.van-stepper__input {
  width: 33px;
  height: 26px;
  padding: 1px;
  border: 1px solid #e5e5e5;
  border-width: 1px 0;
  border-radius: 0;
  -moz-box-sizing: content-box;
  box-sizing: content-box;
  color: #666;
  font-size: 14px;
  vertical-align: middle;
  text-align: center;
  -webkit-appearance: none;
}
.van-stepper__plus {
  border-radius: 0 2px 2px 0;
}
.van-stepper__minus:after{
  width: 9px;
  height: 0;
}
.van-stepper__plus:after {
  width: 1px;
  height: 9px;
}
/* 选择数量 */

.van-sku-messages {
  padding-bottom: 10px;
  background: #f8f8f8;
}
.van-sku-actions {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: flex;
}
.van-button:before {
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
.van-button:first-child{
  background-color: #f85;
}
</style>
