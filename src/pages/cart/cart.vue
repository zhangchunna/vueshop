<template>
    <div class="cart">
        <cartheader title='购物车'></cartheader>
        <div class="box">
            <div class="box_li"  v-for="(cart,index) in carts" :key="index">
                <!-- 购物车单选 -->
                <div class="cart_icon cart_danxuan"  @click="danxuan(index)">
                    <van-icon name="check"   v-show='!carts[index].danxuan' class="check" />
                    <van-icon name="success" v-show='carts[index].danxuan' class="success" />
                </div>
                <!-- 购物车商品信息 -->
                <div class="box_li_img">
                    <img :src="cart.img"/>
                </div>
                <div class="box_li_name">
                    <span class="box_li_taocan">
                        {{cart.taocan}}
                    </span>
                    <span class="box_li_price">
                        ￥{{cart.price}}
                    </span>
                    <!-- 购物车商品数量 -->
                    <div class="van-stepper" value="1" style="float: right;">
                        <button class="van-stepper__minus" :class="{ 'van-stepper__minus--disabled': disabled }"  @click="reduce(index)"></button>
                        <input type="number" class="van-stepper__input" v-model="cart.value" readonly="readonly">
                        <button class="van-stepper__plus" @click="add(index)"></button>
                    </div>
                </div>
                <!-- 删除 -->
                <div class="box_li_shanchu">
                    <i class="iconfont icon-chacha" @click="shanchu(index)"></i>
                </div>
            </div> 
            <!-- 底部 -->
            <div class="van-submit-bar" v-if="carts.length">
                <div class="van-submit-bar__bar">
                    <div class="cart_icon"  @click="quanxuan()">
                        <van-icon name="check"  v-show='!Allchecked' class="check" />
                        <van-icon name="success" v-show='Allchecked' class="success" />
                        <span class="van-checkbox__label">全选</span>
                    </div>
                    <div class="van-submit-bar__text">
                        <span>合计：</span>
                        <span class="van-submit-bar__price">¥ {{sum}}.00</span>
                    </div>
                    <button class="van-button van-button--danger van-button--large van-button--square" @click="settlement">
                        <span class="van-button__text">提交订单</span>
                    </button>
                </div>
            </div>        
            
            <!-- 空购物车 -->
            <div class="cartImg" v-if="!carts.length">
                <img src="http://img11.360buyimg.com/jdphoto/s180x180_jfs/t18163/292/540553659/74408/adeb7463/5a93c51cN3bb5e37b.png">
                <h1>购物车是空的哦，快去购物吧</h1>
                <router-link :to="{name:'home',query:{cid:this.$route.query.cid}}">逛一逛</router-link>
            </div>
        </div>

     </div>
    
</template>

<script>
import { SubmitBar,Checkbox,Dialog} from 'vant';
import { mapState, mapMutations, mapGetters } from "vuex";
import cartheader from '../../common/header'
export default {
    name:'cart',
    data(){
       return{
          select:true,
          Allchecked:false,
          disabled:false
       }
    },
    components:{
        cartheader
    },
    computed:{
        carts(){
            return this.$store.state.carts
            console.log(this.$store.state.carts)
        },
        //计算总价格
        sum:function(){
           var sum = 0;
           this.$store.state.carts.forEach(cart=>{
               if(cart.danxuan){
                   sum+=cart.price*cart.value
               }
           })
           return sum;
        },
        //计算总数量
        sumValue:function(){
            var sumValue=0;
            this.$store.state.carts.forEach(cart=>{
                if(cart.danxuan){
                    sumValue += parseInt(cart.value);
                }
            });
            return sumValue;
        },
        
    },
    methods:{
        ...mapMutations(["shanchu", "add", "reduce","danxuan"]),
        settlement(state){
            var cid=this.$route.query.cid
            var _this=this;
            if(this.sum ==''){
                Dialog.alert({
                    title: '温馨提示',
                    message: '您还没有选中商品噢~'
                }).then(() => {
                    // on close
                });
            }else{
                 _this.$router.push({path:'/pay',query:{cid:cid}})
            }
        },
        //全选
        quanxuan(){
            var  selectcarts=[];
            this.Allchecked=!this.Allchecked
            //如果点击全选,则全部选中
            if(this.Allchecked){
                this.$store.state.carts.forEach(cart=>{
                    cart.danxuan=true;
                    selectcarts.push(cart)
                })
            }else{
                this.$store.state.carts.forEach(cart=>{
                    cart.danxuan=false;
                    selectcarts=[]
                })
            }
            this.$store.commit("SET_SELECTCARTS",selectcarts);
        },
        
       
    }
    
}
</script>

<style>
.box{
    margin-bottom: 60px;
}
.box_li {
    height:140px;
    background:#fff;
    border-bottom:1px solid #eee;
    position:relative;
    padding-top:20px;
}
.cart_danxuan {
    position:absolute;
    top:55px;
}
.cart_icon{
    margin-left: 10px
}
.cart_icon i{
    font-size: 12px;
    color: transparent;
    text-align: center;
    line-height: inherit;
    border: 1px solid #aaa;
    width: 20px;
    height: 20px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 100%;
    position: relative;
    display: inline-block;
    font: normal normal normal 14px/1 vant-icon;
    font-size: inherit;
    text-rendering: auto;
}
.cart_icon .success{
    color: #fff;
    border-color: #06bf04;
    background-color: #06bf04;
    border-radius: 100%;
    display: inline-block;
    font-size:12px;
    padding-top:3px;
}
.box_li_img {
    width: 80px;
    height:80px;
    left:12%;
    position:absolute;
}
.box_li_img img{
    width: 100%;
    height: 100%;
}
.box_li_name {
    width: 54%;
    right:25px;
    color:#333;
    position:absolute;
    font-size:15px;
    height:100px;
}
.box_li_taocan {
    height:60px;
    overflow:hidden;
    display:inline-block;
}
.box_li_price {
    color:#f10215;
    font-size:15px;
    display:block;
    position: absolute;
    top:70px;
}
.box_li_goods {
    right: 5px;
    position: absolute;
    top:70px;
}
.cart_reduce, .cart_add {
  display:inline-block;
  width: 40px;
  height: 26px;
  line-height:26px;
  text-align: center;
  border: 1px solid #ccc;
}

.cart_add{
  border: 1rpx solid #f10215;
  color: #f10215;
}
.box_li_shanchu{
  float: right;
  position: absolute;
  right: 8px;
}
.box_li_shanchu i{
  font-size: 16px
}
.footer {
  width: 100%;
  height: 50px;
  background: white;
  position: fixed;
  bottom:0;
  left: 0;
}
.footer::after{
  content: ' ';
  position: absolute;
  pointer-events: none;
  box-sizing: border-box;
  top: -50%;
  left: -50%;
  right: -50%;
  bottom: -50%;
  -webkit-transform: scale(.5);
  transform: scale(.5);
  border: 0 solid #eee;
}

.footer_01 {
  float: left;
  position: absolute;
  left: 10px;
}

.footer_02 {
  float: right;
  position: absolute; 
  line-height: 50px;
  font-size: 16px;
  right: 90px;
}

.cart-icon {
  position: relative; 
  top: 5px;
  left: 9px;
}
.cart_text {
  display:inline-block;
  width: 40px;
  height: 50px;
  line-height: 50px;
  text-align: center;
}

.footer_03 {
  width: 80px;
  height: 100%;
  line-height: 50px;
  text-align: center;
  color: white;
  background: #f44;
  float: right;
  font-size: 14px;
}
.total{
  color: #f44;
  font-size: 16px;
}
.cartImg img {
  width: 140px;
  height: 140px;
  display: block;
  margin:0 auto;
  margin-top:80px;
}
.cartImg h1 {
  margin-top: 20px;
  text-align: center;
  color: #959595;
  font-size: 14px;
}
.cartImg a {
  display: block;
  text-align: center;
  margin: 20px auto;
  width: 110px;
  height: 37px;
  line-height: 37px;
  border-radius: 4px;
  text-align: center;
  background: #e0524b;
  color: white;
  font-weight: 800;
  font-size: 12px;
}
.van-dialog__message {
  text-align: center
}
</style>
 