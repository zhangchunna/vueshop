<template>
    <div class="tabs">
        <ul>
            <!-- <router-link :to="{name:'home',query:{cid:this.$route.query.cid}}" tag="li" exact>
                <div>
                    <i class="iconfont icon-yemian"></i>
                </div>
                <div>首页</div>
                  
            </router-link>
            <router-link :to="{name:'cart',query:{cid:this.$route.query.cid}}" tag="li">
                 <div>
                    <i class="iconfont icon-gouwuche"></i>
                 </div>
                 <div>购物车</div>
            </router-link>
            <router-link :to="{name:'news',query:{cid:this.$route.query.cid}}" tag="li">
                 <div>
                    <i class="iconfont icon-dongtai"></i>
                 </div>
                 <div>领劵</div>
            </router-link> -->
            <router-link :to="{name:'home',query:{cid:this.$route.query.cid}}" tag="li" exact>
                <a>首页</a>
            </router-link>
            <router-link :to="{name:'cart',query:{cid:this.$route.query.cid}}" tag="li">
                <a>购物车</a>
            </router-link>
            <router-link :to="{name:'news',query:{cid:this.$route.query.cid}}" tag="li">
                <a>更多商品</a>
            </router-link>
        </ul>
    </div>
</template>

<script>
export default {
   name:'AppFooter',
   data(){
       return {
           active:'home',
       }
   },
    mounted(){
      this.active = this.$route.path.slice(1);
    }
}
</script>

<style scoped>
.tabs{
    width: 100%;
    height: 49px;
    display: block;
    background-color: #fafafa;
    z-index: 101;
    position: fixed;
    bottom: 0;
    left: 0;
}
.tabs li{
    float: left;
    line-height: 49px;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    position: relative;
    color: #4b4b4b;
    width: 33.33333333%
}
.tabs li::after{
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 200%;
    -webkit-transform: scale(.5);
    -moz-transform: scale(.5);
    transform: scale(.5);
    -webkit-transform-origin: 0 0;
    -moz-transform-origin: 0 0;
    transform-origin: 0 0;
    pointer-events: none;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-left: 1px solid #eee;
}
.tabs a{
    font-size: 14px;
    color: #4b4b4b;
    display: block;
    text-align: center;
    -webkit-tap-highlight-color: transparent;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
/* .tabs {
    width: 100%;
    display: block;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #fff;
}
.tabs .router-link-exact-active{
    color: #f10215;
}    
.tabs  ul {
    display: table;
    width: 100%;
}    
.tabs ul > li {
    text-align: center;
    font-size: 16px;
    display: table-cell;
    padding: 5px 0;
    cursor: pointer;
    color: #ccc;
}    

.tabs div {
    font-size: 12px;
}
.tabs i {
    font-size: 26px;
} */

</style>
