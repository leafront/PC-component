(function(window,undefined){
	var Zepto = function(vArg) {
		return new Zepto.fn.init(vArg);
	};
	Zepto.fn =jQuip.prototype = {
    elements:[],
    length:0,
		init:function(vArg){
			switch(typeof vArg){
				case 'function':
					this.addEvent(window,'load',vArg);
					break;
				case 'string':
                    if(vArg.split(' ').length>1){
                        this.elements=document.querySelectorAll(vArg);
                    }else{
                        switch(vArg.charAt(0)){
                            case '#'://ID
                                var obj=document.getElementById(vArg.substring(1));
                                this.elements.push(obj);
                                break;
                            case '.'://className
                                this.elements=this.getByClass(document,vArg.substring(1));;
                                break;
                            default://TagName
                                this.elements=document.getElementsByTagName(vArg);
                        }
                    }
					break;
				case 'object':
                    this.elements=[];
					this.elements.push(vArg);
			}
            this.length=this.elements.length;
		},
		getByClass:function(node,classname){
			if(node.getElementsByClassName){
				return node.getElementsByClassName(classname)
			}else{
				var aElements=node.getElementsByTagName('*');
				var aResult=[];
				var i=0;
				var reg=new RegExp('\\b'+classname+'\\b','i');
				for(i=0;i<aElements.length;i++){
					if(reg.test(aElements[i].className)){
						aResult.push(aElements[i]);
					}
				}
				return aResult;
			}
		},
		addEvent:function(obj,sEv,fn){
			if(obj.attchEvent){
				obj.attchEvent('on'+sEv,fn);
			}else{
				obj.addEventListener(sEv,fn,false)
			}
		},
		getStyle:function(obj,attr){
			if(obj.currentStyle){
				return obj.currentStyle[attr];
			}else{
				return getComputedStyle(obj,false)[attr];
			}
		},
		click:function(fn) {
			var i = 0;
			for (i = 0; i < this.elements.length; i++) {

				this.addEvent(this.elements[i], 'click', fn);
			}
		},
    on:function(sEv,fn){
        for(var i=0;i<this.elements.length;i++){
            this.addEvent(this.elements[i],sEv,fn);
        }
    },
		css:function(attr,value){
            var attr=attr|| null;
            var value=value||null;
            console.log(typeof json=='object')
			if(arguments.length==2){//设置css的样式
				var i=0;
				for(i=0;i<this.elements.length;i++){
					this.elements[i].style[attr]=value;
				}
			}else{//获取css的样式
				return this.getStyle(this.elements[0],attr);
			}
		},
    first:function () {
        var ele=this.elements[0];
        this.elements=[];
        this.elements[0]=ele;
        return this;
    },
    last:function(){
        var ele=this.elements[this.elements.length-1];
        this.elements=[];
        this.elements.push(ele);
        return this;
    },
    prev:function(){
        var ele=[];
        for(var i=0;i<this.elements.length;i++){
            ele.push(this.elements[i].previousElementSibling||this.elements[i].previousSibling);
        }
        this.elements=ele;
        return this;
    },
    next:function(){
        var ele=[];
        for(var i=0;i<this.elements.length;i++){
           ele.push(this.elements[i].nextElementSibling||this.elements[i].nextSibling);
        }
        this.elements=ele;
        return this;
    },
    eq:function(n){
        var ele=this.elements[n];
        this.elements=[];
        this.elements[0]=ele;
        return this;
    },
    show:function(){
        for(var i=0;i<this.elements.length;i++){
            this.elements[i].style.display='block';
        }
        return this;
    },
    hide:function(){
        for(var i=0;i<this.elements.length;i++){
            this.elements[i].style.display='none';
        }
        return this;
    },
    attr:function(attr,value){
        if(arguments.length==2){
            for(var i=0;i<this.elements.length;i++){
                this.elements[i].setAttribute(attr,value);
            }
        }else{
           return this.elements[0].getAttribute(attr);
        }
    },
    hover:function(fnOver,fnOut){
        for(var i=0;i<this.elements.length;i++){
            this.addEvent(this.elements[i],'mouseenter',fnOver);
            thise.addEvent(this.elements[i],'mouseleave',fnOut);
        }
    },
    addClass:function(sClass){
        if(this.elements[0].classList){
            for(var i=0;i<this.elements.length;i++){
               this.elements[i].classList.add(sClass);
            }
        }else{
            for(var i=0;i<this.elements.length;i++){
                this.elements[i].className+=' '+sClass;
            }
        }
        return this;
    },
    removeClass:function(sClass){
        if (this.elements[0].classList) {
            for(var i=0;i<this.elements.length;i++){
                this.elements[i].classList.remove(sClass);
            }
        }else {
            var reg=new RegExp('(\\s\\b|^)' +sClass +'(\\s\\b|$)','gi');
            for(var i=0;i<this.elements.length;i++){
                this.elements[i].className = this.elements[i].className.replace(reg,'');
            }
        }
        return this;
    },
    siblings:function(aEle){
        var ele=this.elements[0];
        var aResult=[];
        this.elements=[];
        if(aEle){
           bEle=this.getByClass(document,aEle.substring(1));
            for(var i=0;i<bEle.length;i++){
                if(ele!==bEle[i]){
                    aResult.push(bEle[i]);
                }
            }
            this.elements=aResult;
        }else{
            if(typeof Array.prototype.filter == "function"){
                //IE9+
                aResult= Array.prototype.filter.call(ele.parentNode.children, function(child){
                    return child !== ele;
                });
                this.elements=aResult;
            }else{
                var bEle=ele.parentNode.children;
                for(var i=0;i<bEle.length;i++){
                    if(ele!==bEle[i]){
                        aResult.push(bEle[i]);
                    }
                }
                this.elements=aResult;
            }
        }
        //console.log(this.elements)
        return this;
    },
    index:function(){
        var aBrother=this.elements[0].parentNode.children;
        var i=0;
        for(i=0;i<aBrother.length;i++){
            if(aBrother[i]==this.elements[0]){
                return i;
            }
        }
    },
    html:function(str){
        var i;
        if(str){
            for(i=0;i<this.elements.length;i++){
                this.elements[i].innerHTML= str.toString().trim();
            }
        }else{
            return this.elements[0].innerHTML.toString().trim();
        }
    },
		append: function(el, html) {
			var divTemp = document.createElement("ul"), nodes = null
				, fragment = document.createDocumentFragment();
			divTemp.innerHTML = html;
			nodes = divTemp.childNodes;
			for (var i = 0, length = nodes.length; i < length; i+=1) {
				fragment.appendChild(nodes[i].cloneNode(true));
			}
			for(j = 0;j < this.elements.length; j++){
					this.elements[j].appendChild(fragment)
			}
			// 据说下面这样子世界会更清净
			nodes = null;
			fragment = null;
    },
    find:function(ele){
        var i=0;
        var aResult=[];
        for(i=0;i<this.elements.length;i++) {
            switch(ele.charAt(0))
            {
                case '.':	//class
                    var aEle=getByClass(this.elements[i], ele.substring(1));
                    aResult=aEle;
                    break;
                default:	//Tag
                    var aEle=this.elements[i].getElementsByTagName(ele);
                    aResult=aEle;
            }
        }
        this.elements=[];
        this.elements=aResult;
        return this;

    }
 };
  Zepto.fn.init.prototype = Zepto.fn;
  if ( typeof module === "object" && module && typeof module.exports === "object" ) {
      //seaJs cmd加载模式
      module.exports = Zepto;
  } else {
      //requireJs amd加载模式
      if ( typeof define === "function" && define.amd ) {
          define( "Zepto", [], function () { return Zepto; } );
      }
  }
  //如果有一个窗口对象，至少有一个文档属性
  //定义Zepto和$标识符
  if ( typeof window === "object" && typeof window.document === "object" ) {
      window.Zepto = window.$ = Zepto;
  }
})(window);
