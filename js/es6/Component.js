export default class Component extends EventTarget{
    elem;
    constructor(){
        super();
        this.elem=this.createElem();
    }
    createElem(){
        if(this.elem) return this.elem;
        let div=document.createElement("div");
        return div;
    }
    appendTo(parent){
        if(typeof parent==="string")parent=document.querySelector(parent);
        parent.appendChild(this.elem);
    }
}