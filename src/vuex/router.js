import Vuex from 'vuex'
import Router from 'vue-router'
Vuex.use(Router)

export default new Router({
    linkActiveClass:'active',
    mode: 'history', 
    routes:[
        {
            path:'',
            name:'home',
            component:home,
        },
    ]
})
