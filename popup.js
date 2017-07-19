define(['jquery'],
function($) {
  /**
	 * Created by Administrator on 2015/9/28.
	 */
  var Popup = function(ele, options) {
    this.wrap = ele;
    this.options = options;
    this.oClose = $(this.options.closeBtn, this.wrap);
    this.oPen = $(this.options.openBtn);
    this.popWidth = this.wrap.outerWidth(true);
    this.popHeight = this.wrap.outerHeight(true);
    this.winWidth = $(window).width();
    this.winHeight = $(window).height();
    this.popLeft = this.winWidth / 2 - this.popWidth / 2;
    this.popTop = this.winHeight / 2 - this.popHeight / 2;
    this.mask = $(this.options.mask);
    this.title = $(this.options.title, this.wrap)
  };
  Popup.prototype = {
    constructor: Popup,
    defaults: {
      'closeBtn': '',
      'openBtn': '',
      'showTimes': 400,
      'moveTimes': 300,
      'mask': '.mask',
      'title': '.pop_tit'
    },
    init: function(_this) {
      this.options = $.extend(this.defaults, this.options || {}) this.openBtn(this);
      this.closeBtn(this);
      //this.scroll(this);
      this.resize(this);
      this.drag(this);
    },
    openBtn: function(_this) {
      _this.wrap.css({
        'left': _this.popLeft,
        top: -_this.popHeight
      });
      this.oPen.on('click',function() {
        _this.wrap.show().animate({
          'left': _this.popLeft,
          top: _this.popTop
        },
        _this.options.showTimes);
        var maskWidth = $(document).width();
        var maskHeight = $(document).height();
        _this.mask = _this.options.mask.split('.')[1];
        $('body').prepend('<div class="' + _this.mask + '"></div>');
        $(_this.options.mask).width(maskWidth).height(maskHeight).show();
      });
    },
    scroll: function(_this) {
      $(window).scroll(function() {
        if (_this.wrap.is(':visible')) {
          var scrollTop = $(window).scrollTop();
          var scrollLeft = $(window).scrollLeft();
          _this.popLeft = _this.winWidth / 2 - _this.popWidth / 2 + scrollLeft;
          _this.popTop = _this.winHeight / 2 - _this.popHeight / 2 + scrollTop;
          _this.wrap.animate({
            'left': _this.popLeft,
            top: _this.popTop
          },
          _this.options.moveTimes).dequeue();
        }
      });
    },
    resize: function(_this) {
      $(window).resize(function() {
        if (_this.wrap.is(':visible')) {
          _this.winWidth = $(window).width();
          _this.winHeight = $(window).height();
          var scrollTop = $(window).scrollTop();
          var scrollLeft = $(window).scrollLeft();
          _this.popLeft = _this.winWidth / 2 - _this.popWidth / 2 + scrollLeft;
          _this.popTop = _this.winHeight / 2 - _this.popHeight / 2 + scrollTop;
          _this.wrap.show().animate({
            'left': _this.popLeft,
            top: _this.popTop
          },
          _this.options.moveTimes).dequeue();
        }
      });
    },
    closeBtn: function(_this) {
      this.oClose.click(function() {
        $(_this.options.mask).remove();
        _this.wrap.css({
          'left': _this.popLeft,
          top: -_this.popHeight,
          'display': 'none'
        });
      });
    },
    drag: function(_this) {
      _this.title.mousedown(function(e) {
        var pos = _this.wrap.offset();
        var disX = e.pageX - pos.left;
        var disY = e.pageY - pos.top;
        $(document).mousemove(function(e) {
          var x = e.pageX - disX;
          var y = e.pageY - disY;
          _this.wrap.css({
            'left': x + 'px',
            'top': y + 'px'
          })
        });
        $(document).mouseup(function() {
          $(document).off('mousemove');
          $(document).off('mouseup');
        });
      });
    }
  };

  $.fn.popup = function(options) {
    return this.each(function() {
      new Popup($(this), options).init();
    });
  };
})
