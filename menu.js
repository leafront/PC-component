; (function($) {
  $.fn.menu = function(options) {
    var defaults = {
      subNav: '.subNav',
      times: 800,
      menu: 'li',
      activeClass: 'active'
    }
    var options = $.extend(defaults, options);
    return this.each(function() {
      var _this = $(this);
      _this.find(options.menu).hover(function() {
        $(this).addClass(options.activeClass);
        $(this).children(options.subNav).stop(true).slideDown(options.times);
      },
      function() {
        $(this).removeClass(options.activeClass);
        $(this).children(options.subNav).stop(true).slideUp(options.times);
      })
    })
  }
})(jQuery);
