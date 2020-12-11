$(function(){
  const cart=JSON.parse(window.localStorage.getItem('cart'))||[]
  
  if(!cart.length){
      return
  }else{
    $('.on').removeClass('hide')
    $('.off').addClass('hide')
  }
  setCartNum()
  bindHtml()
  function bindHtml() {
    // 5. 进行一些数据的准备
    // 5-1. 决定全选按钮是不是选中
    // every()
    const selectAll = cart.every(item => item.is_select === '1')
    // 5-2. 计算选中的商品数量和价格
    let total = 0
    let totalMoney = 0
    cart.forEach(item => {
      if (item.is_select === '1') {
        total += item.cart_number - 0
        totalMoney += item.cart_number * item.goods_price
      }
    })

    let str = `
      <div class="panel panel-info">
        <div class="panel-heading">
          <p class="selectAll">
            <span>全选:</span>
            <input type="checkbox" ${ selectAll ? 'checked' : '' }>
            <span class="text">购 物 清 单</span>
          </p>
        </div>
        <div class="panel-body">
          <ul class="goodsList">
    `

    cart.forEach(item => {
      str += `
        <li>
          <div class="select">
            <input data-id="${ item.goods_id }" type="checkbox" ${ item.is_select === '0' ? '' : 'checked' }>
          </div>
          <div class="goodsImg">
            <img src="${ item.goods_small_logo }" alt="">
          </div>
          <div class="goodsDesc">
            <p>${ item.goods_name }</p>
          </div>
          <div class="price">
            ￥ <span class="text-danger">${ item.goods_price }</span>
          </div>
          <div class="count">
            <button class="subNum" data-id="${ item.goods_id }">-</button>
            <input type="text" value="${ item.cart_number }">
            <button class="addNum" data-id="${ item.goods_id }">+</button>
          </div>
          <div class="xiaoji">
            ￥ <span class="text-danger">${ (item.goods_price * item.cart_number).toFixed(2) }</span>
          </div>
          <div class="operate">
            <button class="btn btn-danger del" data-id="${ item.goods_id }">删除</button>
          </div>
        </li>
      `
    })

    str += `
          </ul>
        </div>
        <div class="panel-footer">
          <div class="row buyInfo">
            <p class="col-sm-4 buyNum">
              购买总数量: <span class="text-danger cartNum">${ total }</span> 件商品
            </p>
            <p class="col-sm-4 buyMoney">
              购买总价格: <span class="text-danger total">${ totalMoney.toFixed(2) }</span> 元
            </p>
            <p class="col-sm-4 operate">
              <button class="btn btn-success goPay" ${ totalMoney === 0 ? 'disabled' : '' }>立即付款</button>
              <button class="btn btn-danger clearAll">清空购物车</button>
              <button class="btn btn-primary continueGo">继续购物</button>
            </p>
          </div>
        </div>
      </div>
    `

    // 添加到指定标签内
    $('.on').html(str)
  }
  $('.on').on('click','.select > input',function(){
      const type=this.checked
      const id=$(this).data('id')
      const info=cart.filter(item=>item.goods_id==id)[0]
      info.is_select=type?'1':'0'
      bindHtml()
      window.localStorage.setItem('cart',JSON.stringify(cart))
  })
  .on('click','.addNum',function(){
      const id=$(this).data('id')
      const info=cart.filter(item=>item.goods_id==id)[0]
      info.cart_number=info.cart_number-0+1
      bindHtml()
      window.localStorage.setItem('cart',JSON.stringify(cart))
  })
  $('.on').on('click','.subNum',function(){
    const id=$(this).data('id')
    const info=cart.filter(item=>item.goods_id==id)[0]
    if(info.cart_number===1)return
    info.cart_number=info.cart_number-0-1
    bindHtml()
    window.localStorage.setItem('cart',JSON.stringify(cart))
})

$('.on').on('click','.del',function(){
    const id=$(this).data('id')
    for(let i=0;i<cart.length;i++){
        if(cart[i].goods_id==id){
            cart.splice(i,1)
            break
        }
    }
    bindHtml()
    window.localStorage.setItem('cart',JSON.stringify(cart))
    if(!cart.length) return window.location.reload()
})

// $('.on').on('click','.selectAll > input',function(){
//     const type=this.checked
//     if(type){
//         for(let i=0;i<cart.length;i++){
//             cart[i].is_select=Number(cart[i].is_select)+1
//             this.checked="checked"
//         }
//     }else{
        
//     }
//     bindHtml()
//     window.localStorage.setItem('cart',JSON.stringify(cart))
// })


$('.on').on('click','.clearAll',function(){
    cart.splice(0,cart.length)
        bindHtml()
    window.localStorage.setItem('cart',JSON.stringify(cart))
    window.location.reload()
})
$('.on').on('click','.continueGo',function(){
    window.location.href='../../index.html'
})
$('.on').on('click','.goPay',function(){
    window.location.href='../../pay.html'
})
  function setCartNum(){
    const cart=JSON.parse(window.localStorage.getItem('cart'))||[]
    if(!cart.length){
        return
    }
    let count=0
    cart.forEach(item=>count+=item.cart_number-0)
    $(".total-num").html(count)
    console.log(count)
}
})