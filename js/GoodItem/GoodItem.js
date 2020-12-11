let sfAllcate=document.querySelector(".sf-allcate")
sfAllcate.addEventListener("mouseenter",btnMouseEventHandler)
sfAllcate.addEventListener("mouseleave",btnMouseEventHandler)

function btnMouseEventHandler(e){
    if(e.type==="mouseenter"){
        sfAllcate.lastElementChild.style.display="block"
    }else{
        sfAllcate.lastElementChild.style.display="none"
    }
}