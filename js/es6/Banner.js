// 购物车数量获取
setCartNum()
function setCartNum(){
    const cart=JSON.parse(window.localStorage.getItem('cart'))||[]
    if(!cart.length){
        return
    }
    let count=0
    cart.forEach(item=>count+=item.cart_number-0)
    const totalNum=document.querySelector('.total-num')
    totalNum.textContent=count
   
    
}
// 轮播图实现
let imgList=[
    "./img/alLimg/lunbo1.png",
    "./img/alLimg/lunbo2.png",
    "./img/alLimg/lunbo3.png",
    "./img/alLimg/lunbo4.png",
    "./img/alLimg/lunbo5.jpg",
    "./img/alLimg/lunbo6.jpg",
    "./img/alLimg/lunbo7.png",
]
let index=1;
var timer=1;
let flag=true;
const banner = document.querySelector('.banner')
let btnLeft=document.querySelector('.btn-left')
let btnRight=document.querySelector('.btn-right')
let pointNum=imgList.length
let bannerNavWrapper=document.querySelector(".banner-nav-wrapper")
const bannerNav=document.querySelector(".banner-nav")
const ul = document.createElement("ul")
createBanner()
autoPlay()
function createBanner() {
   
    banner.addEventListener("mouseleave",mouseHandler)
    banner.addEventListener("mouseenter",mouseHandler)
    btnRight.addEventListener("click",clickHandler)
    btnLeft.addEventListener('click',clickHandler)

    for (let i = 0; i < 7; i++) {
        let li = document.createElement("li")
        Object.assign(li.style, {
            position: "absolute",
            top: 0,
            left: 0,
            width:"100%",
            height: 476+"px",
            display:"none",
            zIndex:"1",
            
        })
        li.setAttribute("index",i)
        if(i===0){
            li.classList.add(".active")
            li.style.display="block"
        }
        let a=document.createElement("a")
        Object.assign(a.style,{
            position:"absolute",
            top:0,
            left:"28%",
            width:794+"px",
            height:476+"px"
        })
        let img=document.createElement("img")
        img.src=imgList[i]
        Object.assign(img.style,{
            width:794+"px",
            height:476+"px",
        })
        a.appendChild(img)
        li.appendChild(a)
        ul.appendChild(li)
    }
    banner.appendChild(ul)

}

function clickHandler(e){
    e.preventDefault()
    e=e||window.event
    let target=e.target
    if(target.className==="btn-left"){
        if(!flag) return
        index--
        if(index<=0)index=6
        moveUp(index)
    }else if(target.className==="btn-right"){
        if(!flag) return
        index++
        if(index>7)index=1
        moveDown(index)
    }
}
function mouseHandler(e){
    if(e.type==="mouseenter"){
        clearInterval(timer)
        btnLeft.style.display="block"
        btnRight.style.display="block"
    }else if(e.type==="mouseleave"){
        autoPlay()
        btnLeft.style.display="none"
        btnRight.style.display="none"
    }
}

function moveUp(num){
    for(let i=0;i<pointNum;i++){
        bannerNav.children[i].classList.remove('current')
    }
    bannerNav.children[num-1].classList.add('current')
    ul.children[num].style.display="block"
    if(num+1>6)num=-1
    ul.children[num+1].style.display="none"
}
function moveDown(num){
    for(let i=0;i<pointNum;i++){
        bannerNav.children[i].classList.remove('current')
    }
    bannerNav.children[num-1].classList.add('current')
    ul.children[num-1].style.display="block"
    if(num-2<0)num=8
    ul.children[num-2].style.display="none"
}
function autoPlay(){
    if(!timer) return
    timer=setInterval(function(){
        index++
        if(index>7)index=1
        moveDown(index)
    },2000)
}
