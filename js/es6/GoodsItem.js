import Component from "./Component.js"
import Utils from "./Utils.js"
export default class GoodsItem extends Component{
    data;
    iconCon;
    img;
    price;
    prev;
    tagClassList=new Map();
    static setStyleBool=false;
    constructor(_data){
     super();
     this.data=_data;
     this.elem.className="goodsIcon";
     this.elem.href="./index.html";
     this.tagClassList={
        "tag_1":["自营","本地仓","京尊达"],
        "tag_2":["放心购"],
        "tag_3":["秒杀","赠","券3000-200","券2000-100","券3000-300","免邮","京东物流","券99-5"],
        "tag_4":["新品"]
     }
     GoodsItem.setStyle();
     this.render();
     

 }
    createElem(){
        if(this.elem) return this.elem;
        let a=document.createElement("a");
        return a;

   }
   appendTo(parent){
       super.appendTo(parent);
       this.iconCon=this.elem.querySelector(".iconList");
       this.iconCon.addEventListener("mouseover",e=>this.mouseHandler(e));
       this.img=this.elem.querySelector(".img");
       this.price=this.elem.querySelector(".price");
       this.changePrev(this.iconCon.firstElementChild);
   }
   mouseHandler(e){
       if(e.target.constructor!==HTMLImageElement) return; 
       var url=e.target.src.split("/").pop();//找到小图索引
       var index=this.data.imgList.reduce((value,item,index)=>{
           if(item.includes(url)) value=index;//遍历小图索引
           return value;
       },-1)
       this.img.src=this.data.imgList[index];//使用小图索引到大图并改变图片
       this.price.textContent=Number(this.data.priceList[index]).toFixed(2);
       this.changePrev(e.target)//改变选中样式
   }

   changePrev(elem){
    if(this.prev){
        this.prev.style.border="1px solid #ddd";
        this.prev.style.outline="1px solid transparent";
    }
    this.prev=elem;
    this.prev.style.border="1px solid #e4393c";
    this.prev.style.outline="1px solid #e4393c";
}
    render(){
     this.elem.innerHTML=`
     <div class="showImg">
            <img class="img" src='${this.data.imgList[0]}'>
            <div class="presell" style='display:${this.data.presell?"block":"none"}'>预售中</div>
     </div>

     <div class="iconList">
       ${(function(data){
       return data.imgList.map(function(item){
             return `<img src='${item}'>`
       }).join("");
       })(this.data)}
     </div>

     <div class="priceCon">
     <span class="priceTag">￥</span>
     <span class="price">${Number(this.data.priceList[0]).toFixed(2)}</span>
     </div>
     <div class='titleCon'>
     <div class='title'><span class='jpstyle' style='display:${this.data.jpBool ? "inline-block" : "none"}'>京品手机</span>${this.data.title}</div>
    </div>
     <div class="infoTagCon">
     ${function(data){
         return data.infoList.reduce((value,item)=>{//写${}时需要在字符串模板``下
            value+=`<span class='infoTag'>${item}</span>`
            return value;
         },"")
     }(this.data)} 
     </div>
     <div class="estimate">${this.data.estimate>10000?Math.floor(this.data.estimate/10000)+"万":this.data.estimate}<span class="estimateFont">条评价</span></div>   
    <div class="store"><span>${this.data.store}</span><img src="./img/store.png">
    </div>
    <div class=""tagCon> 
    ${(function(data,tagClassList){
        return data.tag.map(function(item){
              return `<span class='${(function(){
                   for(var prop in tagClassList){
                       if(tagClassList[prop].indexOf(item.name)>-1) return prop;
                   }
                   return "";
              })()}'>${item.name}</span>`
        }).join("");
        })(this.data,this.tagClassList)}
    </div>
     `
 }
 static setStyle(){
     if(GoodsItem.setStyleBool) return;
     GoodsItem.setStyleBool=true;
     Utils.addCSS(".goodsIcon",{
         width:'240px',
         height:'456px',
         position:'relative',
         marginTop:'10px',
         float:'left',
         paddingTop:'10px',
         display:'block',
         textDecoration:"none"
     });
     
     Utils.addCSS(".goodsIcon:hover", {
         boxShadow:'0px 0px 3px #CCCCCC',
     });
     
     Utils.addCSS(".goodsIcon>.showImg", {
     
         marginBottom:'5px',
         height:'220px',
         padding:'0',
         position:'relative',
         overflow:'hidden',
         font:'12px/150% tahoma, arial, Microsoft YaHei, Hiragino Sans GB, "宋体", sansSerif',
         color:'#666',
       
         left:'10px',
     });
     
     Utils.addCSS(".goodsIcon>.showImg>.img", {
         width:'220px',
         height:'220px',
         margin:'0',
         padding:'0',
     });
     
     Utils.addCSS(".goodsIcon>.showImg>.presell", {
         position:'absolute',
         height:'25px',
         width:'200px',
         padding:'0 10px',
         color:'#fff',
         background:'rgba(0, 0, 0, .6)',
         transition:'all .5s ease',
         bottom:'0',
         lineHeight:'25px',
     });
     
     Utils.addCSS(".goodsIcon>.iconList", {
         position:'relative',
         marginBottom:'10px',
         marginLeft:'5px',
         width:'100%',
         marginTop:'5px',
     });
     
     Utils.addCSS(".goodsIcon>.iconList>img", {
         width:'25px',
         height:'25px',
         verticalAlign:'middle',
         border:'1px solid #ddd',
         outline:'1px solid transparent',
         marginLeft:'5px',
     });
     

     
     Utils.addCSS(".goodsIcon>.priceCon", {
         position:'relative',
         width:'100%',
         color:'#e4393c',
         fontSize:'0',
         paddingLeft:'10px',
     });
     
     Utils.addCSS(".goodsIcon>.priceCon>.priceTag", {
         fontSize:'16px',
         fontWeight:'400',
         fontFamily:'Verdana',
         lineHeight:'22px',
     });
     
     Utils.addCSS(".goodsIcon>.priceCon>.price", {
         fontSize:'20px',
         fontWeight:'400',
         fontFamily:'Verdana',
         lineHeight:'22px',
     });
     
     Utils.addCSS(".goodsIcon>.titleCon", {
         position:'relative',
         width:'95%',
         font:'12px tahoma, arial, Microsoft YaHei, Hiragino Sans GB, "宋体", sansSerif',
         color:'#666',
         overflow:'hidden',
         paddingLeft:'5px',
         marginTop:'5px',
     });
     
     Utils.addCSS(".goodsIcon>.titleCon .jpstyle", {
         width:'50px',
         height:'16px',
         padding:'0 3px',
         marginTop:'2px',
         marginRight:'3px',
         overflow:'hidden',
         color:'#fff',
         font:'12px/16px "Helvetica Neue", "Hiragino Sans GB", SimSun, serif',
         background:'#838dc7',
         borderRadius:'2px',
         backgroundColor:'#c81623',
         display:'inlineBlock',
         position:'relative',
         top: '4px',
     });
     
     Utils.addCSS(".goodsIcon>.titleCon>.title", {
         height:'30px',
         lineHeight:'20px',
         overflow:'hidden',
         whiteSpace:'nowrap',
         textOverflow:'ellipsis',
     });
     
     Utils.addCSS(".goodsIcon>.titleCon>.title:hover", {
         color: '#c81623'
     });
     
     Utils.addCSS(".goodsIcon>.infoTagCon", {
         paddingLeft:'5px',
         height:'20px',
     });
     
     Utils.addCSS(".goodsIcon>.infoTagCon>span", {
         float:'left',
         height:'19px',
         lineHeight:'19px',
         padding:'0 4px',
         marginRight:'7px',
         background:'#f4f4f4',
         font:'12px/150% tahoma, arial, Microsoft YaHei, Hiragino Sans GB, "宋体", sansSerif',
         color:'#666',
     });
     
     Utils.addCSS(".goodsIcon>.infoTagCon>span:hover", {
         color:'#c81623',
     });
     
     Utils.addCSS(".goodsIcon>.estimate>.estimateFont", {
     
         font:'12px/150% tahoma, arial, Microsoft YaHei, Hiragino Sans GB, "宋体", sansSerif',
         color:'#666',
     });
     
     Utils.addCSS(".goodsIcon>.estimate", {
         marginTop:'10px',
         paddingLeft:'8px',
         height:'20px',
         color:'#646fb0',
         fontFamily:'verdana',
         font:'12px/150% tahoma, arial, Microsoft YaHei, Hiragino Sans GB, "宋体", sansSerif',
         fontWeight:'700',
     });
     
     Utils.addCSS(".goodsIcon>.estimate>a", {
         float:'right',
         font:'12px/18px "Helvetica Neue", "Hiragino Sans GB", SimSun, serif',
         color:'#6a78b5',
         textDecoration:'none',
         marginRight:'10px',
     });
     Utils.addCSS(".goodsIcon>.store",{
         width:'160px',
         marginTop:'10px',
         marginLeft:'10px',
     });
     Utils.addCSS(".goodsIcon>.store>span",{
         color:'#999',
         display:'inlineBlock',
         maxWidth:'122px',
         overflow:'hidden',
         textOverflow:'ellipsis',
         whiteSpace:'nowrap',
         lineHeight:'18px',
         marginRight:'10px',
         font:'12px/150% tahoma,arial,Microsoft YaHei,Hiragino Sans GB,"宋体",sansSerif',
     });
     Utils.addCSS(".goodsIcon>.tagCon",{
         marginLeft:'10px',
         marginTop:'10px',
     });
     Utils.addCSS(".tag_1",{
         float:'left',
         height:'16px',
         lineHeight:'16px',
         padding:'0 3px',
         marginRight:'3px',
         overflow:'hidden',
         textAlign:'center',
         fontStyle:'normal',
         fontSize:'12px',
         fontFamily:'"Helvetica Neue","Hiragino Sans GB",SimSun,serif',
         background:'#e23a3a',
         color:'#FFF',
         cursor:'default',
         borderRadius:'2px',
     });
     Utils.addCSS(".tag_2",{
         color:'#4d88ff',
         float:'left',
         height:'14px',
         lineHeight:'14px',
         padding:'0 3px',
         border:'1px solid #4d88ff',
         marginRight:'3px',
         overflow:'hidden',
         textAlign:'center',
         fontStyle:'normal',
         fontSize:'12px',
         fontFamily:'"Helvetica Neue","Hiragino Sans GB",SimSun,serif',
         borderRadius:'2px',
     });
     Utils.addCSS(".tag_3",{
         float:'left',
         height:'14px',
         lineHeight:'14px',
         padding:'0 3px',
         border:'1px solid #e23a3a',
         marginRight:'3px',
         overflow:'hidden',
         textAlign:'center',
         fontStyle:'normal',
         fontSize:'12px',
         fontFamily:'"Helvetica Neue","Hiragino Sans GB",SimSun,serif',
         borderRadius:'2px',
         color:'#e23a3a',
     });
     Utils.addCSS(".tag_4",{
         float:'left',
         height:'16px',
         lineHeight:'16px',
         padding:'0 3px',
         marginRight:'3px',
         overflow:'hidden',
         textAlign:'center',
         fontStyle:'normal',
         fontSize:'12px',
         fontFamily:'"Helvetica Neue","Hiragino Sans GB",SimSun,serif',
         background:'#31c19e',
         color:'#FFF',
         cursor:'default',
         borderRadius:'2px',
     });
 }
}
