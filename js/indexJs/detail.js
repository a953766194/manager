$(function(){
    const id=getCookie('goods_id')
    let info = null
    console.log(id)
    getGoodsInfo()
    async function getGoodsInfo(){
        const goodsInfo=await $.get('../../server/getGoodsInfo.php',{goods_id:id},null,"json")
        
        bindHtml(goodsInfo.info)
        info = goodsInfo.info
    }
    function bindHtml(info){
        $('.enlargeBox').html(`

        <div class="show">
        <div class="mask"></div>
          <img src="${ info.goods_big_logo }" alt="">
        </div>
        <div class="list">
          <p class="active">
            <img src="${ info.goods_small_logo }" alt="">
          </p>
        </div>
        <div class="showBigImg" style="background: url(${ info.goods_big_logo }) no-repeat;"></div>
      `)
        $('.goodsInfo').html(`
        <p class="desc"><span class="zy">自营</span><span class="goods-title">${ info.goods_name }</span></p>
        <div class="btn-group size">
        <i>型号</i>
          <button type="button" class="btn btn-default">S</button>
          <button type="button" class="btn btn-default">M</button>
          <button type="button" class="btn btn-default">L</button>
          <button type="button" class="btn btn-default">XL</button>
        </div>
        <p class="price">
        <i>价格</i>
          ￥ <span class="text-danger">${ info.goods_price }</span>
        </p>
        <div class="num">
          <button class="subNum">-</button>
          <input type="text" value="1" class="cartNum">
          <button class="addNum">+</button>
        </div>
        <div>
          <button class="btn btn-success addCart">加入购物车</button>
          <a href="./index.html"><button class="btn btn-warning continue">继续去购物</button></a>
        </div>
      `)
      $('.goodsDesc').html(info.goods_introduce)
      init()
    }
    $('.goodsInfo').on('click','.addCart',function(){
       const cart=JSON.parse(window.localStorage.getItem('cart'))||[]
       const flag=cart.some(item=>item.goods_id===id)
       if(flag){
        const cart_goods=cart.filter(item=>item.goods_id===id)[0]
        cart_goods.cart_number = cart_goods.cart_number - 0 + ($('.cartNum').val() - 0)
       }else{
           info.cart_number=1
           cart.push(info)
       }
       window.localStorage.setItem('cart',JSON.stringify(cart))
       const cartGoWarp=document.querySelector('.cart-go-warp')
       const fullBg=document.querySelector('.fullbg')
      
       Object.assign(fullBg.style,{
        height: 10800+"px",
        width: 1920+"px",
        display: "block"
       })
       cartGoWarp.style.display="block"
    })
    $('.goodsInfo').on("click",'.subNum',function(){
      let num =$('.cartNum').val()-0
      console.log(num)
      if(num===1) return
      $(".cartNum").val(num-1)
    })
    .on("click",".addNum",function(){
      let num =$('.cartNum').val()-0
      $(".cartNum").val(num+1)
    })
    
    
    function init(){
      var show=document.querySelector('.show')
     var mask=document.querySelector(".mask")
     var showBigImg=document.querySelector('.showBigImg')
     var rect=show.getBoundingClientRect()
     var addCart=document.querySelector('.addCart')
     mask.offsetW=101
     mask.offsetH=101
     show.addEventListener("mouseenter",mouseHandler)
     function mouseHandler(e){
         if(e.type==="mouseenter"){
             show.addEventListener("mousemove",mouseHandler)
             show.addEventListener("mouseleave",mouseHandler)
             mask.style.display="block"
             showBigImg.style.display="block"
         }else if(e.type==="mousemove"){
           var x=e.clientX-rect.x-mask.offsetW
           var y=e.clientY-rect.y-mask.offsetH
           if(x<0)x=0
           if(x>rect.width-mask.offsetW*2)x=rect.width-mask.offsetW*2
           if(y>rect.height-mask.offsetH*2)y=rect.height-mask.offsetH*2
           if(y<0)y=0
           mask.style.left=x+"px"
           mask.style.top=y+"px"
           showBigImg.style.backgroundPositionX=-x+"px"
           showBigImg.style.backgroundPositionY=-y+"px"

         }else {
             show.removeEventListener("mousemove",mouseHandler)
             show.removeEventListener("mouseleave",mouseHandler)
             mask.style.display="none"
             showBigImg.style.display="none"
         }
     }
      }
})