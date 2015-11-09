define(['jquery'],function($){
	$.fn.tab=function(options){
		var defaults={
			activeClass:'active',
			tabBtn:'',
			tabCon:'',
			eventType:'mouseover',
			autoTimes:2000,
			auto:false
		}
		var options=$.extend(defaults,options);
		return this.each(function(){
			var _this=$(this);
			var timer=null;
			var index=0;
			var aBtn=_this.find(options.tabBtn);
			_this.find(options.tabCon).hide().eq(0).show();
			aBtn.on(options.eventType,function(){
				index=$(this).index();
				tab(index)

			})
			function tab(index){
				aBtn.eq(index).addClass(options.activeClass).siblings().removeClass(options.activeClass);
				_this.find(options.tabCon).eq(index).show().siblings(options.tabCon).hide(
				);
			}
			if(options.auto==false){
				return false;
			}
			timer=setInterval(auto,options.autoTimes);
			function auto(){
				index++;
				if(index>aBtn.length-1){
					index=0;
				}
				tab(index)
			}
			_this.hover(function(){
				clearInterval(timer);
			},function(){
				timer=setInterval(auto,options.autoTimes);
			})
		})
	}
})