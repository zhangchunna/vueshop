<template>
    <div class="add">
        <cartheader title='修改地址'></cartheader>
        <van-address-edit
            :area-list="areaList"
            :address-info="addressInfo"
            show-postal
            show-search-result
            @save="onSave"
        />
       
    </div>
</template>

<script>
import { AddressEdit,Dialog } from 'vant';
import areaList   from '../../../config/area';
import cartheader from '../../common/header';
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
    name:"addedit",
    data() {
        return {
            areaList,
            addressInfo:{
                id:'1',
                name:this.$store.state.address.username,
                tel:this.$store.state.address.usertel,
                province:this.$store.state.address.province,
                city:this.$store.state.address.city,
                county:this.$store.state.address.county,
                addressDetail:this.$store.state.address.addressDetail,
                postalCode:this.$store.state.address.postalCode
            },
        }
    },
    components:{
       cartheader
    },
    computed:{
       addList(){
            return this.$store.state.address
       }    
    },
    methods:{
       
        onSave(content){
            var _this=this
            var cid=this.$route.query.cid
            var addDate={
                'username':content.name,
                'usertel':content.tel,
                'province':content.province,
                'city':content.city,
                'county':content.county,
                'addressDetail':content.addressDetail,
                'addressInfo':content.province + content.city + content.county + content.addressDetail,
                'postalCode':content.postalCode
            }
            if(content.name!=='' && content.tel!=='' && addDate.addressInfo !=='' ){
                this.$store.commit("SET_ADDRESS",addDate);
                Dialog.confirm({
                    title: '提交地址成功',
                }).then(() => {
                _this.$router.push({path:'/pay',query:{cid:cid}})
                  console.log('成功')
                }).catch(() => {
                  
                });
            }
           
            
        },
    }
    
}
</script>

<style>
.van-toast{
    top:20%;
}
</style>
