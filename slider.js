/**
 * Created by Administrator on 2015/9/28.
 * name  //leafront
 */
define(['jquery'],function($){
	var Slider=function(elem,options){
		this.options=options;
		this.wrap=elem;
		this.now=0;
		this.aBtn=$(this.options.aBtn).find('a');
		this.oUl=this.wrap.find(this.options.ulElements);
		this.aLiWidth=this.oUl.find(this.options.liElements).eq(0).width();
		this.oImgList=this.oUl.find(this.options.liElements).eq(0).clone();
		this.oUl.append(this.oImgList);
		this.aLi=this.oUl.find(this.options.liElements);
		this.prev=this.wrap.find(this.options.prev);
		this.next=this.wrap.find(this.options.next);
	};
	Slider.prototype={
		constructor:'Slider',
		defaults:{
			activeClass:'active',//锟叫伙拷锟斤拷前锟斤拷class锟斤拷锟斤拷
			eventType:'mouseover',//锟斤拷锟斤拷锟斤拷锟斤拷锟?
			prev:'.prev',
			next:'.next',
			times:800,    //锟斤拷锟斤拷锟脚ワ拷谢锟斤拷锟绞憋拷锟?
			tabStyle:'move', //锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷
			autoTimes:2000, //锟皆讹拷锟叫伙拷锟斤拷时锟斤拷
			aBtn:'.banner_btn',//锟斤拷锟斤拷目锟斤拷瓢锟脚ワ拷锟絚lass锟斤拷锟斤拷
			ulElements:'ul',
			liElements:'li'
		},
		init:function(){
			this.btn(this);
			this.toggle(this);
			this.autoMove(this);
			this.options=$.extend(this.defaults,this.options||{});
		},
		btn:function(_this){
			this.aBtn.on(this.options.eventType,function(){
				var index=$(this).index();
				_this.now=index;
				_this.options.tabStyle=='fade'?_this.fade(index):_this.move(index);

			});
		},
		toggle:function(_this){
			if(this.options.prev!='' && this.options.next!=''){
				this.prev.click(function(e) {
					_this.now--;
					_this.page();
					_this.options.tabStyle=='move'?_this.move(_this.now):_this.fade(_this.now);
				});
				this.next.click(function(e) {
					_this.now++;
					_this.page();
					_this.options.tabStyle=='move'?_this.move(_this.now):_this.fade(_this.now);
				});
			}
		},
		move:function(index){
			if(this.options.tabStyle=='slider'){
				this.aLi.css({'position':'static','display':'block'});
			}
			this.aBtn.eq(index).addClass(this.options.activeClass).siblings().removeClass(this.options.activeClass);
			this.oUl.stop(true,true).animate({'left':-this.aLiWidth*index},this.options.times);
			this.oUl.css({'width':this.aLi.length*this.aLiWidth,'position':'absolute'});
		},
		fade:function(index){
			this.aLi.css({'position':'absolute'});
			this.oUl.css({'position':'static'});
			this.aBtn.eq(index).addClass(this.options.activeClass).siblings().removeClass(this.options.activeClass);
			this.aLi.eq(index).stop(true,true).fadeIn(this.options.times).siblings().stop(true,true).fadeOut(this.options.times);
		},
		page:function(){
			if(this.now<0){
				this.oUl.css('left',-(this.aLi.length-1)*this.aLiWidth);
				this.now=this.aLi.length-2;
			}
			if(this.now>this.aLi.length-1){
				this.oUl.css('left',0);
				this.now=1;
			}
			if(this.now==this.aBtn.length){
				this.aBtn.eq(0).addClass(this.options.activeClass).siblings().removeClass(this.options.activeClass);
			}
		},
		autoMove:function(_this){
			var timer=setInterval(auto,this.options.autoTimes);
			this.wrap.hover(function(){
				clearInterval(timer);
				_this.prev.fadeIn(_this.options.times);
				_this.next.fadeIn(_this.options.times);
			},function(){
				_this.prev.fadeOut(_this.options.times);
				_this.next.fadeOut(_this.options.times);
				timer=setInterval(auto,_this.options.autoTimes);
			});
			function auto(){
				_this.now++;
				_this.page();
				_this.options.tabStyle=='fade'?_this.fade(_this.now):_this.move(_this.now);
			}
		}
	};
	$.prototype.slider=function(options){
		return this.each(function(){
			new Slider($(this),options).init();
		})
	};
})
