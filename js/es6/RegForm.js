export default class RegForm{
    static REG_INFO = {
        user: {
          reg: "^\\w{6,30}$",
          flag: "",
          msg: "用户名必须是6-30位字符数字下划线组成",
        },
        password: {
          reg: "^(?=\\D+\\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,16}$",
          flag: "",
          msg: ".",
        },
        name: {
          reg: "^[\\u4e00-\\u9fd5]{2,4}$",
          flag: "",
          msg: "名字必须是中文，2-4位",
        },
        age: {
          reg: "^\\d$|^[1-9]\\d$|^1[0-4]\\d$|^150$",
          flag: "",
          msg: "年龄是0-150岁",
        },
        tel: { reg: "^1[3-9]\\d{9}$", flag: "", msg: "电话号码必须11位" },
        email: {
          reg: "^\\w+@\\w+\\.(com|net|cn|edu)(\\.(cn|hk|tw|jp|kr))?$",
          flag: "",
          msg: "邮箱必须格式正确",
        },
      };

    //   判断所有文本框内容是否符合对应的正则表达式
      static  verifyReg(key, value) {
        var regs=new RegExp(RegForm.REG_INFO[key].reg,RegForm.REG_INFO[key].flag);
        return regs.test(value) ? "" : RegForm.REG_INFO[key].msg;
      }

      /* 
        设置对应的表单样式
        参数
            elem   需要判断的表单元素
            info   显示错误信息的容器span
            key    需要判断的关键词
            value   需要判断正则的输入文本内容

            如果判断后符合正则，则设置绿色，清空错误信息容器内容
            如果判断不符合正则，则设置文本框为红色，并且将错误信息内容填充，聚焦
      */
      static setFormStyle(elem,info,key, value) {
        // var elem = document.getElementsByName(key)[0];
        var msg=RegForm.verifyReg(key, value);
        if (msg) {
          elem.style.border = "1px solid #FF0000";
          elem.style.outline = "1px solid #FF0000";
          elem.focus();
          info.textContent=msg;
          return false;
        }
        elem.style.border = "1px solid #00FF00";
        elem.style.outline = "none";
        info.textContent="";
        return true;
      }

      /* 
        判断提交表单时所有的表单是否符合正则表达式
        elem是当前提交的表单对应数据元素，如果没有required则不验证表单
        info是错误信息的容器
        如果判断验证表单信息设置样式返回为false，则返回出去，用于阻止默认提交事件
      
      */
      static allFormVerify(form){
        var fd = new FormData(form);
        for (var [key, value] of fd) {
            var elem=document.getElementsByName(key)[0];
            var info=elem.nextElementSibling;
          if (!elem.getAttribute("required")) continue;
          if (!RegForm.setFormStyle(elem,info,key, value)) return false;
        }
        return true;
      }
      /* 
        用于边输入边判断是否符合正则表达式
      */
      static inputVerify(input,span){
        if (input.ids) return;
            input.ids = setTimeout(() => {
              clearTimeout(input.ids);
              input.ids = 0;
              RegForm.setFormStyle(input,span,input.getAttribute("name"), input.value);
            }, 500);
      }
}