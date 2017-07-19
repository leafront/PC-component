;(function($) {
  $.fn.myScroll = function(options) {
    var defaults = {
      prev: '',
      next: '',
      iSpeed: '-2',
      eventType: 'click',
      autoTimes: '40',
      arrowSpeed: '-2',
      scrollType: 'top'
    }
    var options = $.extend({},
    defaults, options);
    return this.each(function() {
      var _this = $(this);
      var timer = null;
      var oUl = _this.find('ul');
      var oUlHtml = oUl.html();
      oUl.html(oUlHtml + oUlHtml) var aLi = oUl.find('li');
      if (options.scrollType == 'left') {
        var aLiWidth = aLi.eq(0).outerWidth(true) var oUlWidth = aLiWidth * aLi.length;
        oUl.css('width', oUlWidth);
        var isWH = oUlWidth;
      } else {
        var aLiHeight = aLi.eq(0).outerHeight(true) var oUlHeight = aLiHeight * aLi.length;
        oUl.css('height', oUlHeight);
        var isWH = oUlHeight;
      }
      timer = setInterval(roll, options.autoTimes) function roll() {
        oUl.css(options.scrollType, '+=' + options.iSpeed + 'px');
        if (parseInt(oUl.css(options.scrollType)) < -isWH / 2) {
          oUl.css(options.scrollType, '0px');
        }
        if (parseInt(oUl.css(options.scrollType)) > '0') {
          oUl.css(options.scrollType, -isWH / 2 + 'px');
        }
      }
      if (options.prev != '' && options.next != '') {
        _this.find(options.prev).on(options.eventType,
        function() {
          options.iSpeed = options.arrowSpeed;
        });
        _this.find(options.next).on(options.eventType,
        function() {
          options.iSpeed = -options.arrowSpeed;
        });
      }
      oUl.hover(function(e) {
        clearInterval(timer);
      },
      function() {
        timer = setInterval(roll, options.autoTimes);
      });
    })
  }
})(jQuery);
