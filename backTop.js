define(['jquery'],function($) {
	$.fn.backTop = function(options) {
		var defaults = {			
			showHeight:200,
			times:1000
		};
		var options = $.extend(defaults,options);
		return this.each(function(){
			$("body").prepend('<div id="top"><a>返回</a></div>');
			var _this = $(this);
			var $top = $("#top");
			$top.css({'position':'fixed','bottom':'40px','right':'10px','zIndex':'999','display':'none','cursor':'pointer'});
			var $btn = $("#top a");
			$btn.css({
				'display':'block',
				'width':'71px',
				'height':'24px',
				'padding-top':'48px',
				'background':'url(./images/toTop.gif) no-repeat',
				'text-align':'center',
				'color':'#888',
				'textDecoration':'none'
			});
			_this.scroll(function(){
				var scrollTop=$(this).scrollTop();	
				scrollTop>options.showHeight?$top.fadeIn(500):$top.fadeOut(500);
			});
			$btn.hover(function(){ 		
			    $btn.css({
					'backgroundPosition':'-88px 0',
					'color':'#3a9'
				});	
			},function(){			
				$btn.css({
					'backgroundPosition':'0 0',
					'color':'#888'
				});			
			});	
			$top.click(function(){
				$("html,body").animate({scrollTop: 0}, options.times);	
			});
		})	
	}
});