$(function(){
    let list=null
    const list_info = {
        cat_one: 'all',
        cat_two: 'all',
        cat_three: 'all',
        sort_method: '综合',
        sort_type: 'ASC',
        current: 1,
        pagesize: 12
      }
    setCartNum()
    getCateOne()
    async function getCateOne(){
        const cat_one_list=await $.get('../../server/getCateOne.php',null,null,'json')
        let str = `<span class="active" data-type="all" style="display:inline-block;font-size:16px" >全部</span>`

        cat_one_list.list.forEach(item=>{
            str +=`
            <span style="display:inline-block;margin-left:50px;font-size:16px" data-type="${ item.cat_one_id}">${ item.cat_one_id}</span>
            `
        })
        $('.cateOneBox')
        .html(str)
    }
   
    async function getCateTwo(){
        const cate_two_list=await $.get('../../server/getCateTwo.php',{cat_one:list_info.cat_one},null,'json')
        

        let str=`<span data-type="all" class="active" style="display:inline-block;font-size:16px">全部</span>`
        cate_two_list.list.forEach(item=>{
            str+=`<span data-type="${ item.cat_two_id}" style="display:inline-block;margin-left:50px;font-size:16px">${ item.cat_two_id}</span>`
        })
        $('.catTwoBox').html(str)
    
    }

    async function getCateThree() {
        // 1. 请求二级分类列表数据
        const cate_three_list = await $.get('../../server/getCateThree.php', { cat_one: list_info.cat_one, cat_two: list_info.cat_two }, null, 'json')
    
        // 2. 根据二级列表数据渲染页面
        let str = '<span data-type="all" class="active" style="display:inline-block;font-size:16px">全部</span>'
        cate_three_list.list.forEach(item => {
          str += `<span data-type="${ item.cat_three_id }" style="display:inline-block;margin-left:50px;font-size:16px">${ item.cat_three_id }</span>`
        })
        
        $('.catThreeBox').html(str)
    
      }
    

    getTotalPage()
    async function getTotalPage(){
        const totalInfo= await $.get('../../server/getTotalPage.php',list_info,null,'json')
        $('.pagination').pagination({
            pageCount: totalInfo.total,
            callback (index) {
              list_info.current = index.getCurrent()
              // 从新请求商品列表
              getGoodsList()
            }
          })
    }

    getGoodsList()
    async function getGoodsList(){
        let str=''
        const goodsList= await $.get('../../server/getGoodsList.php',list_info,null,'json')
        list=goodsList.list
        goodsList.list.forEach(item=>{
            str +=`
            <li class="thumbnail">
          <img src="${ item.goods_big_logo }" alt="..." data-id="${ item.goods_id }">
          <div class="caption">
            <h3 >${ item.goods_name }</h3>
            <p class="price">￥
              <span class="text-danger">${ item.goods_price }</span>
              <span> ID: ${ item.goods_id } </span>
            </p>
            <p>
              <a href="javascript:;" class="btn btn-danger addCart" role="button" data-id="${item.goods_id}">加入购物车</a>
              <a href="./cart.html" class="btn btn-warning" role="button">去结算</a>
            </p>
          </div>
        </li>
            `
        })
        $('.goodsList > ul').html(str)
    }
    


    $('.cateOneBox').on('click','span',function(){
        $(this).addClass('active').siblings().removeClass('active')
        const type = $(this).data('type')
     
        list_info.cat_two='all'
        list_info.cat_three='all'
        list_info.current = 1

        list_info.cat_one=type
        getTotalPage()
        getGoodsList()
        $('.catThreeBox').html('<span data-type="all" class="active" style="display:inline-block;font-size:16px">全部</span>')

        if(type==="all"){
            $('.catTwoBox').html(`<span data-type="all" class="active" style="display:inline-block;font-size:16px">全部</span>`)
        }else{
            getCateTwo()
        }
    })
    

    $('.catTwoBox').on('click','span',function(){
        const type=$(this).data('type')

        $(this).addClass('active').siblings().removeClass('active')

        list_info.cat_three = 'all'
        list_info.cat_two = type
        list_info.current = 1
        getTotalPage()
        getGoodsList()
        if(type==="all"){
            $('.catThreeBox').html(`<span data-type="all" class="active" style="display:inline-block;font-size:16px">全部</span>`)
        }else{
            getCateThree()
        }


    })
    $('.catThreeBox').on('click','span',function(){
        const type=$(this).data('type')
        $(this).addClass('active').siblings().removeClass('active')
        list_info.current = 1
        list_info.cat_three=type
        getTotalPage()
        getGoodsList()
    })

    $('.sortBox').on('click','span',function(){
        const method = $(this).attr('data-method')
        const type = $(this).attr('data-type')
        $(this).addClass('active').siblings().removeClass('active')
        list_info.sort_method=method
        list_info.sort_type=type
        list_info.current = 1
        getTotalPage()
        getGoodsList()
        $(this).attr('data-type',type==="ASC"?"DESC":"ASC")
        .siblings()
        .attr('data-type','ASC')
    })

   $('.goodsList ul').on('click','img',function(){
       console.log(this)
       const id=$(this).data('id')
       setCookie('goods_id',id)
       window.location.href='../../itemInfo.html'
   })


   $('.goodsList').on('click','.addCart',function(){
    const cart=JSON.parse(window.localStorage.getItem('cart'))||[]
    const id=$(this).data('id')
    const flag=cart.some(item=>item.goods_id==id)
    if(flag){
     const cart_goods=cart.filter(item=>item.goods_id==id)[0]
     cart_goods.cart_number = cart_goods.cart_number - 0 + 1
    }else{
        const info=list.filter(item=>item.goods_id == id)[0]
        info.cart_number=1
        cart.push(info)
    }
    window.localStorage.setItem('cart',JSON.stringify(cart))
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