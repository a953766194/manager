export default class Utils{
    static timeList=[];
    static randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    static randomCountNum(count, min, max) {
        var arr = [];
        if (min === undefined) min = 0;
        if (max === undefined) max = 100;
        if(count>max-min) count=max-min;
        while (arr.length < count) {
            var item = Utils.randomNum(min, max);
            if (arr.indexOf(item) < 0) arr.push(item);
        }
        return arr;
    }
    static getRandomColor(a, r, g, b) {
        var col = "rgba(";
        for (var i = 0; i < 4; i++) {
            if (i < 3) col += ((arguments[i + 1] === undefined ? Math.floor(Math.random() * 256) : arguments[i + 1]) + ",");
            else col += ((a === undefined ? Math.random().toFixed(2) : a) + ")");
        }
        return col
    }
    static timeStart(){
        Utils.timeList.length=0;
        Utils.timeList[0]=new Date().getTime();
    }
    static showTime(){
        if(Utils.timeList.length===0) return 0;
        Utils.timeList.push(new Date().getTime());
        console.log(Utils.timeList[Utils.timeList.length-1]-Utils.timeList[Utils.timeList.length-2])
        return Utils.timeList[Utils.timeList.length-1]-Utils.timeList[Utils.timeList.length-2];
    }
    static  showStart(){
        if(Utils.timeList.length===0) return 0;
        Utils.timeList.push(new Date().getTime());
        console.log(Utils.timeList[Utils.timeList.length-1]-Utils.timeList[0]);
        return Utils.timeList[Utils.timeList.length-1]-Utils.timeList[0];
    }
    static  timeStop(){
        if(Utils.timeList.length===0) return 0;
        if(Utils.timeList.length===1) return new Date().getTime()-Utils.timeList[0];
        var time=Utils.timeList[Utils.timeList.length-1]-Utils.timeList[Utils.timeList.length-2];
        Utils.timeList.length=0;
        console.log(time)
        return time;
    }
    static ce(type,style,parent,props){
        var elem=document.createElement(type);
        if(style)Object.assign(elem.style,style);
        if(typeof parent==="string") parent=document.querySelector(parent);
        if(parent)parent.appendChild(elem);
        if(props)Object.assign(elem,props);
        return elem;
    }
    static  getStyle(elem,prop){
        var style;
        if(getComputedStyle) style=getComputedStyle(elem);
        else style=elem.currentStyle;
        if(prop===undefined) return style;
        return style[prop];
    }
    static  addCSS(selector,style,title){
        if(title===undefined) title="xietian";
        var arr=Array.from(document.styleSheets);
        var  styleSheet=arr.reduce(function(value,item){
            if(item.title===title)return item;
            return value;
        },null);
        if(!styleSheet){
            var s=document.createElement("style");
            s.title=title;
            document.head.appendChild(s);
            styleSheet=document.styleSheets[document.styleSheets.length-1];
        }
        var str="";
        for(var prop in style){
            str+=prop.replace(/[A-Z]/g,function(value){
                return "-"+value.toLowerCase();
            })+":"+(typeof style[prop]==="number" ? style[prop]+"px" : style[prop])+";";
        }
        if(styleSheet.addRule){
            styleSheet.addRule(selector,str,styleSheet.cssRules.length);
        }else{
            styleSheet.insertRule(selector+"{ "+str+" }",styleSheet.cssRules.length);
        }
    }
    static  loadImg(list,callBack){
        var img=new Image();
        img.i=0;
        img.arr=[];
        img.list=list;
        img.callBack=callBack;
        img.addEventListener("load",Utils.loadHandler);
        img.src=list[img.i];
    }
    static  loadHandler(e){
        this.arr.push(this.cloneNode(false));
        if(this.i<this.list.length-1){
            this.i++;
            this.src=this.list[this.i];
        }else{
            this.removeEventListener("load",Utils.loadHandler);
            this.callBack(this.arr);
        }
    }
    // 万恶的this
    static  dragOn(elem){
        elem.obj=this;
        elem.addEventListener("mousedown",Utils.mouseHandler);
    }
    static dragOff(elem){
        elem.removeEventListener("mousedown",Utils.mouseHandler);
    }
    static  mouseHandler(e){
        if(e.type==="mousedown"){
            // this--->elem
            e.preventDefault();//取消默认行为事件，这里处理取消拖拽文本和图片时的禁止拖拽图标
             var offset={x:0,y:0};
             offset.x=e.offsetX;
             offset.y=e.offsetY;
             document.target=this;
             document.offset=offset;
             document.addEventListener("mousemove",Utils.mouseHandler);
             document.addEventListener("mouseup",Utils.mouseHandler);
         }else if(e.type==="mousemove"){
            //  this  document
             document.target.style.left=e.clientX-document.offset.x+"px";
             document.target.style.top=e.clientY-document.offset.y+"px";
         }else if(e.type==="mouseup"){
            //  this document
             document.removeEventListener("mousemove",Utils.mouseHandler);
             document.removeEventListener("mouseup",Utils.mouseHandler);
         }
    }
    static styleTransform(str){
            str=str.replace(/-\w/g,function(item){
                return item.slice(1).toUpperCase();
            }).replace(/(?<=:).*?;/g,function(item){
                return "'"+item.slice(0,-1).trim()+"',";
            });
            return str;
        }
}
