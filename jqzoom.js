define(['jquery'],function($){
	$.fn.zoom=function(options){
		var defaults={
			disable:'on',
			activeClass:'active',
			zoomSmall:'.zoomSmall',
			zoomMiddle:'.zoomMiddle',
			zoomLarge:'.zoomLarge',
			mask:'.mask',
			prev:'#prev',
			next:'#next',
			smallImgLength:4
		}
		var options=$.extend(defaults,options||{});
		return this.each(function(){
			function Zoom(obj){
				this.wrap=obj;
				this.oSmallUl=$(options.zoomSmall,this.wrap).find('ul');
				this.oSmallLi=this.oSmallUl.find('li');
				this.oSmallUl.css('width',this.oSmallLi.length*this.oSmallLi.eq(0).outerWidth(true));
				this.oSmallLiWidth=this.oSmallLi.outerWidth(true);
				this.oMiddle=$(options.zoomMiddle,this.wrap);
				this.oLarge=$(options.zoomLarge,this.wrap);
				this.oLargeImg=this.oLarge.find('img');
				this.oPrev=$(options.prev,this.wrap);
				this.oNext=$(options.next,this.wrap);
				this.num=0;
				this.mask=$(options.mask,this.wrap);
				this.init();
			}
			Zoom.prototype={
				init:function(){
					this.oBtn(this);
					this.move(this);
					this.toggle(this);
				},
				oBtn:function(_this){
					this.oSmallLi.each(function(){
						$(this).append('<img src=""/>');
						var aThisSrc=$(this).attr('rel');
						aThisSrc=eval('(' +aThisSrc+')');
						var oSmallImg=aThisSrc.smImg;
						$(this).find('img').attr('src',oSmallImg);
					});
					var aFirstSrc=_this.oSmallLi.eq(0).attr('rel');
					aFirstSrc=eval('(' +aFirstSrc+')');
					_this.oMiddle.find('img').attr('src',aFirstSrc.bgImg);
					_this.oLarge.find('img').attr('src',aFirstSrc.artwork);
					this.oSmallLi.hover(function(){
						var index=$(this).index();
						$(this).addClass(options.activeClass).siblings().removeClass(options.activeClass);
						var aThisSrc=$(this).attr('rel');
						aThisSrc=eval('(' +aThisSrc+')');
						var oSmallImg=aThisSrc.smImg;
						var oMiddleImg=aThisSrc.bgImg;
						var oLargeImg=aThisSrc.artwork;
						_this.oSmallLi.find('img').eq(index).attr('src',oSmallImg);
						_this.oMiddle.find('img').attr('src',oMiddleImg);
						_this.oLarge.find('img').attr('src',oLargeImg);
					},function(){
						_this.mask.hide();
						_this.oLarge.hide();
					})
				},
				move:function(_this){
					this.oMiddle.mousemove(function(e){
						_this.mask.show();
						_this.oLarge.show();
						var oMiddleLeft=_this.oMiddle.offset().left;
						var oMiddleTop=_this.oMiddle.offset().top;
						var x=e.pageX-oMiddleLeft-_this.mask.width()/2;
						var y=e.pageY-oMiddleTop-_this.mask.height()/2;
						if(x<=0){
							x=0;
						}else if(x>=_this.oMiddle.width()-_this.mask.width()){
							x=_this.oMiddle.width()-_this.mask.width();
						}
						if(y<=0){
							y=0;
						}else if(y>=_this.oMiddle.height()-_this.mask.height()){
							y=_this.oMiddle.height()-_this.mask.height();
						}
						var oPercentageX=x/(_this.oMiddle.width()-_this.mask.width());
						var oPercentageY=y/(_this.oMiddle.height()-_this.mask.height());
						_this.mask.css({
							'left':x,
							'top':y
						});
						_this.oLargeImg.css({
							'left':-oPercentageX*(_this.oLargeImg.width()-_this.oLarge.width()),
							'top':-oPercentageY*(_this.oLargeImg.height()-_this.oLarge.height())
						});
					});
					this.oMiddle.mouseout(function(){
						_this.mask.hide();
						_this.oLarge.hide();
					})
				},
				toggle:function(_this){
					this.oPrev.click(function(){
						_this.num--;
						$(this).removeClass(options.disable);
						if(_this.num<0){
							_this.num=0;
							_this.oNext.addClass(options.disable);
						}
						_this.oSmallUl.animate({'left':-_this.num*_this.oSmallLiWidth},300);
					});
					this.oNext.click(function(){
						_this.num++;
						if(_this.num>_this.oSmallLi.length-options.smallImgLength){
							_this.num=_this.oSmallLi.length-options.smallImgLength;
							$(this).removeClass(options.disable);
							_this.oPrev.addClass(options.disable);
						}
						_this.oSmallUl.animate({'left':-_this.num*_this.oSmallLiWidth},300);
					});
				}
			}
			return new Zoom($(this));
		});
	}
})