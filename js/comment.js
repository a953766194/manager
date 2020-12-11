let script,ids
let searchSubmit=document.querySelector("#searchSubmit")
let forms=document.querySelector("#forms")
searchSubmit.addEventListener("click",submitClickHandler)
function submitClickHandler(e){
    if(ids) return
    ids=setTimeout(function(){
        clearTimeout(ids)
        ids=0;
        var fd=new FormData(forms)
        script=document.createElement("script")
        script.src="https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+fd.get("index1_none_search_ss2")+"&json=1&p=3&sid=22084_1436_13548_21120_22036_22073&req=2&csor=0&cb=callback"
        document.body.appendChild(script)
    },500)

    function callback(obj){
        var ul=document.querySelector(".ulSearch")
        ul.innerHTML="1"
        
        for(var i=0;i<obj.s.length;i++){
            var li=document.createElement("li")
            li.textContent=obj.s[i]
            ul.appendChild(li)
        }
        script.remove()
        script=null
    }
    
}
