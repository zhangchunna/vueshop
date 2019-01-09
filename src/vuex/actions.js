const actions={
    //加入购物车
    setCart({commit},data){
        commit('SET_CARTS',data)
    },
    //删除单个产品
    deletToShop({commit},data){
        commit('deletShop',data)
    },
    //选中的商品
    setSelectCarts({commit},data){
        commit('SET_SELECTCARTS',data)
    },
    //编辑地址
    address({commit},data){
        commit('address',data)
    },

}
export default actions