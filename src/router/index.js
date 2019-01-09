import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home/home'
import product from '@/pages/product/product'
import cart from '@/pages/cart/cart'
import news from '@/pages/news/news'
import pay  from '@/pages/pay/pay'
import addedit  from '@/pages/addedit/addedit'
Vue.use(Router)

export default new Router({
    linkActiveClass:'active',
    mode: 'history', 
    routes:[
        {
            path:'',
            name:'home',
            component:home,
            meta:{navshow:true}
        },
        {
            path:'/product',
            name:'product',
            component:product,
            meta:{index:0,navshow:false}
        },
        {
            path:'/cart',
            name:'cart',
            component:cart,
            meta:{navshow:false}
        },
        {
            path:'/pay',
            name:'pay',
            component:pay,
            meta:{navshow:false}
        },
        {
            path:'/news',
            name:'news',
            component:news,
            meta:{navshow:true}
        },
        {
            path:'/addedit',
            name:'addedit',
            component:addedit,
            meta:{navshow:false}
        }
    ]
})
