(function(window,undefined){
	var jQuip=function(vArg) {
		return new jQuip.fn.init(vArg);
	};
    function likeArray(obj) { return typeof obj.length == 'number' };
    function filtered(nodes, selector) {
        return selector == null ? $(nodes) : $(nodes).filter(selector)
    }
    function children(element) {
        return 'children' in element ?
            slice.call(element.children) :
            $.map(element.childNodes, function(node){ if (node.nodeType == 1) return node })
    }
    jQuip.extend= function(out) {
        out = out || {};
        for (var i = 1; i < arguments.length; i++) {
            var obj = arguments[i];
            if (!obj)
               continue;
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (typeof obj[key] === 'object')
                        jQuip.extend(out[key], obj[key])
                    else
                        out[key] = obj[key];
                 }
            }
        }
        return out;
    };
    jQuip.each=function(elements,callback){
        var i,key;
        if(likeArray(elements)){
            for(i=0;i<elements.length;i++){
                if(callback.call(elements[i],i,elements[i])===false) return elements;
            }
        }else{
            for(key in elements){
                if(callback.call(elements[key],key,elements[key])===false) return elements;
            }
        }
        return elements;
    };
    jQuip.map = function(elements, callback){
        var value, values = [], i, key
        if (likeArray(elements))
            for (i = 0; i < elements.length; i++) {
                value = callback(elements[i], i)
                if (value != null) values.push(value)
            }
        else
            for (key in elements) {
                value = callback(elements[key], key)
                if (value != null) values.push(value)
            }
        return flatten(values)
    };
    jQuip.trim=function(str){
        return str.replace(/(^\s*)|(\s*$)/g, "");
    };
	jQuip.fn=jQuip.prototype={
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
        children: function(selector){
            return filtered(this.map(function(){ return children(this) }), selector)
        },
        map: function(fn){
            return $($.map(this, function(el, i){ return fn.call(el, i, el) }))
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
        each: function(callback) {
            if(typeof Array.prototype.every=='function'){
                [].every.call(this.elements, function(el, idx) {
                    return callback.call(el, idx, el) !== false;
                })
            }else{
                for(var i=0;i<this.elements.length;i++){
                    callback.call(this.elements[i],i,this.elements[i]);
                }
            }
            return this
        },
        html:function(str){
            var i;
            if(str){
                for(i=0;i<this.elements.length;i++){
                    this.elements[i].innerHTML= $.trim(str);
                }
            }else{
                return $.trim(this.elements[0].innerHTML);
            }
        },
        val:function(value){
            var i;
            if(value){
                for(i=0;i<this.elements.length;i++){
                    this.elements[i].value= $.trim(value);
                }
            }else{
                return $.trim(this.elements[0].value);
            }
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

        },
        fadeIn:function(options){
            this.animate({opacity:1},options);
        },
        fadeOut:function(options){
            this.animate({opacity:0},options);
        },
        animate:function(json,times,fx,fn){
            var that=this;
            if( typeof times == 'undefined' ){
                times = 400;
                fx = 'linear';
            }
            if( typeof times == 'string' ){
                if(typeof fx == 'function'){
                    fn = fx;
                }
                fx = times;
                times = 400;
            }
            else if(typeof times == 'function'){
                fn = times;
                times = 400;
                fx = 'linear';
            }
            else if(typeof times == 'number'){
                if(typeof fx == 'function'){
                    fn = fx;
                    fx = 'linear';
                }
                else if(typeof fx == 'undefined'){
                    fx = 'linear';
                }
            }
            var iCur = {};
            for(var attr in json){
                iCur[attr] = 0;
                if( attr == 'opacity' ){
                    iCur[attr] = Math.round(css(this.elements[0],attr)*100);
                }
                else{
                    iCur[attr] = parseInt(css(this.elements[0],attr));
                }
            }
            var startTime = now();
            clearInterval(that.elements.timer);
            that.elements.timer = setInterval(function(){
                var changeTime = now();
                var t = times - Math.max(0,startTime - changeTime + times);  //0到2000
                for(var attr in json){
                    var value =that.Tween[fx](t,iCur[attr],json[attr]-iCur[attr],times);
                    console.log(value)
                    if(attr == 'opacity'){
                        for(var i=0;i<that.elements.length;i++){
                            that.elements[i].style.opacity = value;
                            that.elements[i].style.filter = 'alpha(opacity='+value+')';
                        }
                    }
                    else{
                        for(var i=0;i<that.elements.length;i++){
                            that.elements[i].style[attr] = value + 'px';
                        }
                    }
                }
                if(t== times){
                    clearInterval(that.elements.timer);
                    if(fn){
                        fn.call(that.elements);
                    }
                }
            },13);
            function now(){
                return (new Date()).getTime();
            }
            function css(obj, attr) {
                if (obj.currentStyle){
                    return obj.currentStyle[attr];
                } else {
                    return getComputedStyle(obj, false)[attr];
                }
            }
        },
        Tween:{
            linear: function (t, b, c, d){  //匀速
                return c*t/d + b;
            },
            easeIn: function(t, b, c, d){  //加速曲线
                return c*(t/=d)*t + b;
            },
            easeOut: function(t, b, c, d){  //减速曲线
                return -c *(t/=d)*(t-2) + b;
            },
            easeBoth: function(t, b, c, d){  //加速减速曲线
                if ((t/=d/2) < 1) {
                    return c/2*t*t + b;
                }
                return -c/2 * ((--t)*(t-2) - 1) + b;
            },
            easeInStrong: function(t, b, c, d){  //加加速曲线
                return c*(t/=d)*t*t*t + b;
            },
            easeOutStrong: function(t, b, c, d){  //减减速曲线
                return -c * ((t=t/d-1)*t*t*t - 1) + b;
            },
            easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
                if ((t/=d/2) < 1) {
                    return c/2*t*t*t*t + b;
                }
                return -c/2 * ((t-=2)*t*t*t - 2) + b;
            },
            elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
                if (t === 0) {
                    return b;
                }
                if ( (t /= d) == 1 ) {
                    return b+c;
                }
                if (!p) {
                    p=d*0.3;
                }
                if (!a || a < Math.abs(c)) {
                    a = c;
                    var s = p/4;
                } else {
                    var s = p/(2*Math.PI) * Math.asin (c/a);
                }
                return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            },
            elasticOut: function(t, b, c, d, a, p){    //正弦增强曲线（弹动渐出）
                if (t === 0) {
                    return b;
                }
                if ( (t /= d) == 1 ) {
                    return b+c;
                }
                if (!p) {
                    p=d*0.3;
                }
                if (!a || a < Math.abs(c)) {
                    a = c;
                    var s = p / 4;
                } else {
                    var s = p/(2*Math.PI) * Math.asin (c/a);
                }
                return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
            },
            elasticBoth: function(t, b, c, d, a, p){
                if (t === 0) {
                    return b;
                }
                if ( (t /= d/2) == 2 ) {
                    return b+c;
                }
                if (!p) {
                    p = d*(0.3*1.5);
                }
                if ( !a || a < Math.abs(c) ) {
                    a = c;
                    var s = p/4;
                }
                else {
                    var s = p/(2*Math.PI) * Math.asin (c/a);
                }
                if (t < 1) {
                    return - 0.5*(a*Math.pow(2,10*(t-=1)) *
                        Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
                }
                return a*Math.pow(2,-10*(t-=1)) *
                    Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
            },
            backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
                if (typeof s == 'undefined') {
                    s = 1.70158;
                }
                return c*(t/=d)*t*((s+1)*t - s) + b;
            },
            backOut: function(t, b, c, d, s){
                if (typeof s == 'undefined') {
                    s = 3.70158;  //回缩的距离
                }
                return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
            },
            backBoth: function(t, b, c, d, s){
                if (typeof s == 'undefined') {
                    s = 1.70158;
                }
                if ((t /= d/2 ) < 1) {
                    return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
                }
                return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
            },
            bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
                return c - Tween['bounceOut'](d-t, 0, c, d) + b;
            },
            bounceOut: function(t, b, c, d){
                if ((t/=d) < (1/2.75)) {
                    return c*(7.5625*t*t) + b;
                } else if (t < (2/2.75)) {
                    return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
                } else if (t < (2.5/2.75)) {
                    return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
                }
                return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
            },
            bounceBoth: function(t, b, c, d){
                if (t < d/2) {
                    return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
                }
                return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
            }
        },
	};
    jQuip.fn.init.prototype=jQuip.fn;
    if ( typeof module === "object" && module && typeof module.exports === "object" ) {
        //seaJs cmd加载模式
        module.exports = jQuip;
    } else {
        //requireJs amd加载模式
        if ( typeof define === "function" && define.amd ) {
            define( "jquip", [], function () { return jQuip; } );
        }
    }
    //如果有一个窗口对象，至少有一个文档属性
    //定义jQuip和$标识符
    if ( typeof window === "object" && typeof window.document === "object" ) {
        window.jQuip = window.$ = jQuip;
    }
})(window);

