<template>
    <div>
        <!-- <cartheader title='提交订单'></cartheader> -->
        <!-- 联系人卡片 -->
        <van-contact-card
        :type="cardType"
        :name="currentContact.name"
        :tel="currentContact.tel"
        @click="address"
        style="margin-bottom: 10px;"
        />
        <!-- 商品详情信息 -->
        <div type="goods-block">
            <div class="goods-list">
                <div class="goods-list-header van-cell van-cell--borderless">
                    <i class="van-icon van-icon-shop van-cell__left-icon"></i>
                    <div class="van-cell__value van-cell__value--alone">
                        <a href="">好彩商城</a>
                    </div>
                </div>
                <div class="goods-list-card">
                    <div class="van-card">
                        <a href="javascript:;" class="van-card__thumb">
                            <img src="https://img.yzcdn.cn/upload_files/2018/10/11/Fi1X7PEi4DSrb52d-8_qbmt_UsEU.jpg?imageView2/2/w/180/h/180/q/75/format/jpg" class="van-card__img">
                        </a>
                        <div class="van-card__content">
                            <div class="van-card__left">
                                <div class="van-card__title">【不锈钢清洁膏】 除锈除垢，去焦渍！光亮如新！</div>
                                <div class="van-card__desc van-ellipsis">【特惠装】2瓶清洁膏138元</div>
                            </div>
                            <div class="van-card__right">
                                <div>¥138.00</div>
                                <div class="van-card__origin-price"></div>
                                <div class="van-card__num">x 1</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="goods-list-price van-cell">
                    <div class="van-cell__value van-cell__value--alone">
                        <span class="goods-list-price__count">共1件商品</span>小计：
                        <span class="goods-list-price__amount">¥138.00</span>
                    </div>
                </div>
             </div>
        </div>

        <!-- 优惠券单元格 -->
        <van-coupon-cell
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        @click="showList = true"
        style="margin: 10px 0;"
        />

        <!-- 优惠券列表 -->
        <van-popup v-model="showList" position="bottom">
        <van-coupon-list
            :coupons="coupons"
            :chosen-coupon="chosenCoupon"
            :disabled-coupons="disabledCoupons"
            @change="onChange"
            @exchange="onExchange"
        />
        </van-popup>
        <!-- 货到付款 -->
        <div class="delivery" @click="delivery">
            <van-cell-group >
                <van-cell title="付款方式" is-link value="货到付款" />
            </van-cell-group>
        </div>
        <!-- 卖家留言 -->
        <van-cell-group>
            <van-field
                v-model="message"
                label="卖家留言"
                type="textarea"
                placeholder="建议留言前先与商家沟通确认"
                rows="1"
                autosize
            />
        </van-cell-group>
        <!-- copyright -->
        <div class="copyright" type="copyright-block">
           <a>@好彩商城官方旗舰店</a>
        </div>
        <!-- 合计     -->
        <div class="van-submit-bar">
            <div class="van-submit-bar__bar">
                <div class="van-submit-bar__text">
                    <span>合计：</span>
                    <span class="van-submit-bar__price">¥ {{sum}}.00</span>
                </div>
                <button class="van-button van-button--danger van-button--large van-button--square" @click="settlement">
                    <span class="van-button__text">提交订单</span>
                </button>
            </div>
        </div> 
    </div>
</template>

<script>
import { CouponCell, CouponList,Cell, CellGroup,Dialog,SubmitBar} from 'vant';
import { mapState, mapMutations, mapGetters } from "vuex";
import cartheader from '../../com/header'
const coupon = {
  available: 1,
  discount: 0,
  denominations: 150,
  originCondition: 0,
  reason: '',
  value: 150,
  name: '优惠券名称',
  startAt: 1489104000,
  endAt: 1514592000
};
export default {
  name:'pay',
  data() {
    return {
      chosenContactId: null,
      showList: false,
      chosenCoupon: -1,
      coupons: [coupon],
      disabledCoupons: [coupon]

    };
  },

  computed: {
    cardType() {
      return this.chosenContactId !== null ? 'edit' : 'add';
    },
    currentContact() {
      const id = this.chosenContactId;
      return id !== null ? this.list.filter(item => item.id === id)[0] : {};
    },
  },
  methods:{
    address(){
        console.log('address')
    },
    delivery(){
        console.log('aaa')
        Dialog.alert({
            title: '温馨提示',
            message: '您所下单的商品采用货到付款的支付方式,满意后签收付款！我们为您提供7天无理由退换货服务'
        }).then(() => {
            // on close
        });
    },
    onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
    },
    onExchange(code) {
      this.coupons.push(coupon);
    }
  },
  components:{
    cartheader
  },
}
</script>

<style>
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
    color: #999;
    font-size: 12px;
    text-align: center;
    line-height: 16px;
    padding: 50px 0 20px;
}
.copyright a{
    color: #bfbfc3;
}
</style>
