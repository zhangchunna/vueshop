<template>
    <div class="pay">
        <div class="pay_content">
            <!-- <cartheader title='提交订单'></cartheader> -->
            <!-- 联系人卡片 -->
            <div class="address_box">
                <div class="stripe-border--bottom index__block address__block">
                    <div class="address-card van-cell van-cell--center van-cell--clickable"  @click="address" v-if="addList.length==''">
                        <div class="van-cell__value van-cell__value--alone">
                            <i class="van-icon van-icon-add2 address-empty__add"></i>
                            <span class="address-empty__text">新建收货地址</span>
                        </div>
                        <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
                    </div>
                

                <div class="address-card van-cell van-cell--center van-cell--clickable"  @click="address" v-else>
                    <div class="van-cell__value van-cell__value--alone">
                        <i class="van-icon van-icon-location address__location"></i>
                        <div class="address__content">
                            <div class="address__info">
                                <p class="address__name van-ellipsis">收货人:{{addList.username}}</p>
                                <p class="address__tel van-ellipsis">{{addList.usertel}}</p>
                            </div>
                            <p class="address__detail">收货地址:{{addList.addressInfo}}</p>
                        </div>
                    </div>
                    <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
                </div>
              </div>  

            </div>
            <!-- 商品详情信息 -->
            <div type="goods-block">
                <div class="goods-list">
                    <div class="goods-list-header van-cell van-cell--borderless" @click="home" >
                        <i class="van-icon van-icon-shop van-cell__left-icon"></i>
                        <div class="van-cell__value van-cell__value--alone">
                            <a href="">好彩商城</a>
                        </div>
                    </div>
                    <div class="goods-list-card" v-for="(selectcart,index) in selectcarts" :key="index">
                        <div class="van-card">
                            <a href="javascript:;" class="van-card__thumb">
                                <img :src="selectcart.img" class="van-card__img">
                            </a>
                            <div class="van-card__content">
                                <div class="van-card__left">
                                    <div class="van-card__title">{{selectcart.taocan}}</div>
                                    <div class="van-card__desc van-ellipsis">{{selectcart.shuxing}}</div>
                                </div>
                                <div class="van-card__right">
                                    <div>¥{{selectcart.price}}.00</div>
                                    <div class="van-card__origin-price"></div>
                                    <div class="van-card__num">x {{selectcart.value}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="goods-list-price van-cell">
                        <div class="van-cell__value van-cell__value--alone">
                            <span class="goods-list-price__count">共 {{totalnumber}} 件商品</span>小计：
                            <span class="goods-list-price__amount">¥{{total}}.00</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 优惠券单元格 -->
            <!-- <van-coupon-cell
            style="margin: 10px 0;"
            /> -->
            <div class="coupon" style="margin: 10px 0;">
                <van-cell-group >
                    <van-cell title="优惠促销"  value="全场满100减5,满199减10"/>
                </van-cell-group>
            </div>
            <!-- 货到付款 -->
            <div class="delivery" @click="delivery">
                <van-cell-group >
                    <van-cell title="付款方式" is-link value="货到付款" />
                </van-cell-group>
            </div>
            <!-- 卖家留言 -->
           <div class="van-cell-group van-hairline--top-bottom">
               <div class="van-cell van-field">
                   <div class="van-cell__title"><span>卖家留言</span></div>
                   <div class="van-cell__value">
                       <div class="van-field__body">
                           <textarea placeholder="" rows="1" class="van-field__control" style="height: 24px;"  v-model="remark" >  </textarea>
                        </div>
                    </div>
                </div>
            </div>
            <!-- copyright -->
            <!-- <div class="copyright" type="copyright-block" :to="{name:'home'}">
              <a>@好彩商城官方旗舰店</a>
            </div> -->
            <!-- 合计     -->
            <div class="van-submit-bar">
                <div class="van-submit-bar__bar">
                    <div class="van-submit-bar__text">
                        <span>合计：</span>
                        <span class="van-submit-bar__price">¥ {{discount}}.00</span>
                    </div>
                    <button class="van-button van-button--danger van-button--large van-button--square" @click="submitForm">
                        <span class="van-button__text">提交订单</span>
                    </button>
                </div>
            </div> 
        </div>
    </div>
</template>

<script>
import { CouponCell, CouponList,Cell, CellGroup,Dialog,SubmitBar} from 'vant';
import { mapState, mapMutations, mapGetters } from "vuex";
import cartheader from '../../common/header'
import axios from 'axios';
export default {
  name:'pay',
  data() {
    return {
        remark:'',
        addList:'',
        selectcarts:''

    };
  },
  components:{
    cartheader
  },
  mounted:function () {
     this.addList =JSON.parse(localStorage.getItem("address") || '[]')
     this.selectcarts =JSON.parse(localStorage.getItem("selectcarts") || '[]')
  },
  //当前路由数据发生变化的时候才会更新
  computed: {
    //计算中数量
    totalnumber:function(){
        var totalnumber=0
        var selectcarts = JSON.parse(localStorage.getItem("selectcarts") || '[]')
        for(var i=0;i<selectcarts.length;i++){
           totalnumber+=selectcarts[i].value
        }
        return totalnumber
    },
     //计算总价格
    total:function(){
        var total = 0;
        var selectcarts = JSON.parse(localStorage.getItem("selectcarts") || '[]')
        for(var i=0;i<selectcarts.length;i++){
            total+=selectcarts[i].price*selectcarts[i].value
        }
        return total;
    },
    //计算打折后的价钱
    discount:function(){
        var discount=0
        var total = this.total
        if( total >= 100 && total < 199 ){
           console.log("大于等于100并且小于199",total,total-5)
           discount = total-5
        }else if( total >= 199){
           console.log("大于等于199",total,total-10)
           discount = total-10
        }else{
           console.log("不打折",total)
           discount=total
        }
        return discount
    }
  },
  methods:{
    address(){
        var cid=this.$route.query.cid
        this.$router.push({path:'/addedit',query:{cid:cid}})
    },
    home(){
        var cid=this.$route.query.cid
        this.$router.push({path:'/',query:{cid:cid}})
    },
    delivery(){
        Dialog.alert({
            title: '温馨提示',
            message: '您所下单的商品采用货到付款的支付方式,满意后签收付款！我们为您提供7天无理由退换货服务'
        }).then(() => {
            // on close
        });
    },
    submitForm(){
         if(this.addList==''){
            Dialog.alert({
            title: '请填写您的收货地址',
            }).then(() => {
                // on close
            });
         }else{
         var taocan = [];
         for(var i=0;i<this.selectcarts.length;i++){
            var taocanAll = this.selectcarts[i].taocan;
            var priceAll = this.selectcarts[i].price;
            var numAll = this.selectcarts[i].value;
            var imgAll = this.selectcarts[i].image;
            var cur = i + 1
            taocan.push({      
                "taocan": taocanAll,
                "price": priceAll,
                "num": numAll,
                "img": imgAll
            })
         }
         var remark = this.remark;
         console.log('remark',remark)
         var price = this.discount;
         var user = this.addList.username;
         var mobile = this.addList.usertel;
         var address = this.addList.addressInfo;
         var cid = this.$route.query.cid;
         var proname = "商城测试"
         var paytype = "货到付款"
         this.$axios({
            method:"post",
            url:"/test/order_wxxcx.php",
            data:{
                cid:cid,
                taocan:taocan,
                price:price,
                user:user,
                mobile:mobile,
                address:address,
                remark:remark,
                paytype:paytype,
                proname:proname
            }
        }).then((res)=>{
            console.log("成功",res.data);
            Dialog.alert({
                title: '下单成功',
                message: '订购成功后我们会尽快发货,请保持电话畅通'
            }).then(() => {
                //清空掉选中的数据
                var selectcarts=[]
                this.$store.commit("SET_SELECTCARTS",selectcarts);
                //清空掉购物车的数据,为啥不用id呢？就是一样的产品有不同的套餐,但是id是一样的
                //思路,根据购物车中的选择checked等于true去删除
                var cart = this.$store.state.carts;
                for(var j=0;j<cart.length;j++){
                    if(cart[j].danxuan){
                        this.$store.state.carts.splice(j,1)
                        localStorage.setItem("carts",JSON.stringify(cart));                
                    }  
                }
               this.$router.push({path:'/',query:{cid:cid}})

            });

            })
         }
    }
    
  },
}
</script>

<style>

.pay_content{
    height: 100%;
    margin-bottom: 100px
}
.goods-list {
    background: #fff;
}
.goods-list-card+.goods-list-card {
    margin-top: 6px;
}
.goods-list-price .van-cell__value {
    text-align: right;
}
.goods-list-price__count {
    color: #999;
    font-size: 12px;
    margin-right: 6px;
}
.goods-list-price__amount {
    color: #f44;
    font-weight: 700;
}
.copyright {
    width: 100%;
    color: #999;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    position: relative;
    top: 20px;
    bottom: 0px;
    left: 0;
}
.copyright a{
    color: #bfbfc3;
}
/* 收货地址 */
.address-card {
    padding: 15px;
}
.address-empty__add {
    font-size: 40px;
    color: #38f;
    vertical-align: middle;
}
.address-empty__text {
    line-height: 40px;
    margin-left: 10px;
    display: inline-block;
    vertical-align: middle;
}
.stripe-border--bottom, 
.stripe-border--top {
    position: relative;
}
.index__block {
    margin:0 0 10px 0;
}
.address__block {
    padding-bottom: 2px;
}
.stripe-border--bottom:after {
    bottom: 0;
}
.stripe-border--bottom:after, 
.stripe-border--top:before {
    left: 0;
    right: 0;
    content: "";
    height: 2px;
    position: absolute;
    background: -webkit-repeating-linear-gradient(135deg,#ff6d6d,#ff6d6d 20%,transparent 0,transparent 25%,#3283fa 0,#3283fa 45%,transparent 0,transparent 50%);
    background: repeating-linear-gradient(-45deg,#ff6d6d,#ff6d6d 20%,transparent 0,transparent 25%,#3283fa 0,#3283fa 45%,transparent 0,transparent 50%);
    background-size: 80px;
}
.index-view .van-icon {
    min-width: 1em;
}
.address__location {
    float: left;
    font-size: 16px;
    margin: 3px 5px 0 0;
}
.van-icon, .van-icon:before {
    display: inline-block;
}
.address__content, .address__content>div {
    overflow: hidden;
}
.address__info {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
}
.address__name, .address__tel {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    max-width: 60%;
    font-size: 16px;
    font-weight: 500;
    padding-bottom: 5px;
}
.address__tel {
    text-align: right;
}
.address__detail {
    color: #666;
    margin-top: 3px;
    font-size: 12px;
    line-height: 16px;
    word-break: break-all;
}
.van-cell__right-icon {
    color: #999;
    font-size: 12px;
    line-height: 24px;
}
</style>
