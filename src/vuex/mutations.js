import state from './state'
import * as type from './type.js'
import {Dialog} from 'vant';

const mutations ={
    //购物车
    [type.SET_CARTS](state,data){
        state.carts.push(data)
        localStorage.setItem('carts',JSON.stringify(state.carts));
    },
    //选中的商品
    [type.SET_SELECTCARTS](state,data){
        localStorage.setItem("selectcarts",JSON.stringify(data));
    },
    //编辑地址
    [type.SET_ADDRESS](state,data){
        localStorage.setItem("address",JSON.stringify(data));
    },
    //购物车删除
    shanchu:(state,index)=>{
        Dialog.confirm({
            title: '确定删除该商品么？',
        }).then(() => {
            state.carts.splice(index,1)
            localStorage.setItem("carts",JSON.stringify(state.carts));
            var  selectcarts=[];
            state.carts.forEach(cart => {
                if(cart.danxuan){
                selectcarts.push(cart)
                console.log('selectcarts',selectcarts)
                }
                else{
                }
            });
            localStorage.setItem("selectcarts",JSON.stringify(selectcarts));
        }).catch(() => {
            console.log('取消')
        });
    },
    //数量加
    add(state,index){
        state.carts[index].value++
        localStorage.setItem("carts",JSON.stringify(state.carts));
        var  selectcarts=[];
        state.carts.forEach(cart => {
            if(cart.danxuan){
               selectcarts.push(cart)
               console.log('selectcarts',selectcarts)
            }
            else{
            }
        });
        localStorage.setItem("selectcarts",JSON.stringify(selectcarts));
    },
    //数量减
    reduce(state,index){
        //1.怎么通过数量的减来控制页面的样式
        //思考点，怎么把页面data的值传入到vuex中(已解决,似乎还有更好的方案)
        state.carts[index].value==1?state.carts[index].value=1: state.carts[index].value--
        localStorage.setItem("carts",JSON.stringify(state.carts));
        var  selectcarts=[];
        state.carts.forEach(cart => {
            if(cart.danxuan){
               selectcarts.push(cart)
               console.log('selectcarts',selectcarts)
            }
            else{
            }
        });
        localStorage.setItem("selectcarts",JSON.stringify(selectcarts));
    },
    //单选
    danxuan(state,index){     
        state.carts[index].danxuan =!state.carts[index].danxuan
        localStorage.setItem("carts",JSON.stringify(state.carts));
        var  selectcarts=[];
        state.carts.forEach(cart => {
            if(cart.danxuan){
               selectcarts.push(cart)
               console.log('selectcarts',selectcarts)
            }
            else{
            }
        });
        localStorage.setItem("selectcarts",JSON.stringify(selectcarts));
    },
    
}

export default mutations