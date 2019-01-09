const  state={
    carts:localStorage['carts']?JSON.parse(localStorage["carts"]):[],
    selectcarts:localStorage['selectcarts']?JSON.parse(localStorage["selectcarts"]):[],
    address:localStorage['address']?JSON.parse(localStorage["address"]):[]
}

export default state