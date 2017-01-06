function DatePicker(options){
  this.start = options.start;
  this.end = options.end;
  this.selectYear = options.selectValue[0] - options.start;
  this.selectMonth = options.selectValue[1] - 1;
  this.selectDate = options.selectValue[2] - 1;
  this.onConfirm = options.onConfirm;
}
DatePicker.prototype = {
  constructor: 'DatePicker',
  renderView: function (data) {
    var tpl = `
      <div class = "weui-picker__hd">
        <span data-action="cancel" class="weui-picker__action" id="weui-picker-cancel">取消</span>
        <span data-action="select" class="weui-picker__action" id="weui-picker-confirm">确定</sp>
      </div>
      <div class = "weui-picker__bd">
        <div class="weui-picker__group" id = "webui-year">
          <ul class="weui-picker__content">
            <% for (var num = 0; num < 3; num++){%>
              <li></li>
            <% }%>
            <% for (var i = 0; i < data.length; i++){%>
              <li data-date = "<%= data[i].value %>" class="weui-picker__item"><%= data[i].label%></li>
            <% }%>
            <% for (var num = 0; num < 3; num++){%>
              <li></li>
            <% }%>
          </ul>
          <div class="weui-picker__mask"></div>
          <div class="weui-picker__indicator"></div>
       </div>
       <div class="weui-picker__group" id = "webui-month">
         <ul class="weui-picker__content">
           <% for (var num = 0; num < 3; num++){%>
             <li></li>
           <% }%>
           <% for (var j = 0; j < data[selectYear].children.length; j++) {%>
             <li data-date = "<%= data[selectYear].children[j].value %>" class="weui-picker__item"><%=  data[selectYear].children[j].label%></li>
           <%}%>
           <% for (var num = 0; num < 3; num++){%>
             <li></li>
           <% }%>
         </ul>
         <div class="weui-picker__mask"></div>
         <div class="weui-picker__indicator"></div>
      </div>
      <div class="weui-picker__group" id = "webui-date">
        <ul class="weui-picker__content">
          <% for (var num = 0; num < 3; num++){%>
            <li></li>
          <% }%>
          <% for (var k = 0; k < data[selectYear].children[selectMonth].children.length; k++ ){%>
            <li  <li data-date = "<%= data[selectYear].children[selectMonth].children[k].value %>" class="weui-picker__item"> <%=  data[selectYear].children[selectMonth].children[k].label%></li>
          <%}%>
          <% for (var num = 0; num < 3; num++){%>
            <li></li>
          <% }%>
        </ul>
        <div class="weui-picker__mask"></div>
        <div class="weui-picker__indicator"></div>
     </div></div>`;
    var render = template.compile(tpl);
    var html = render({'data': data, selectYear: this.selectValue[0], selectMonth: this.selectValue[1]});
    $('.weui-picker').html(html);
  },
  showPicker: function () {
    document.addEventListener('touchmove', function (e) {
     //取消事件的默认动作
     e.preventDefault();
    }, false);
    var data = [];
    const daysTotal = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];           //所有月份的天数
    for (var i = this.start; i <= this.end; i++) {
        var months = [];
        if ((i % 4 == 0 && i % 100 != 0) || i % 400 == 0) {                     //判定为闰年
            daysTotal[1] = 29;
        } else {
            daysTotal[1] = 28;
        }
        for (let j = 0; j < 12; j++) {
            var dates = [];
            for (var k = 1; k < daysTotal[j] + 1; k++) {
                var date = {
                    label: k + '日',
                    value: k
                };
                dates.push(date);
            }
            months.push({
                label: j + 1 + '月',
                value: j + 1,
                children: dates,
            });
        }
        var year = {
            label: i + '年',
            value: i,
            children: months
        };
        data.push(year);
    }
    var self = this;
    this.selectValue = [this.selectYear, this.selectMonth, this.selectDate];
    this.renderView(data);
    this.scrollList(data);
    this.onCancel();
    this.confirm();
  },
  scrollList: function(data) {
    var self = this;
    var itemHeight = $('.weui-picker__item').eq(0).height();
      $('.weui-picker__group').each(function(idx,item) {
        var iscroll = new IScroll(this, {
          scrollX: false
        });
        iscroll.on('scrollEnd', function() {
          var result = ( -this.y / itemHeight);
          var index = parseInt(result, 10);
          var diff = result - index;
          if (diff > 0.5) index ++;
          self.selectValue[idx] = index;
          self.renderView(data);
          self.scrollList(data);
          iscroll.scrollTo(0, -index * itemHeight);
          self.confirm();
        })
        iscroll.scrollTo(0, -self.selectValue[idx] * itemHeight);
      })
  },
  onCancel: function () {
    $('#weui-picker-cancel').click(function(){
      $('.weui-picker').empty();
    })
  },
  confirm: function () {
    var value = []
    $('#weui-picker-confirm').click(() => {
      value = this.selectValue[0] + this.start + '年' + (this.selectValue[1] + 1) + '月' + (this.selectValue[2] + 1) + '日';
      this.onConfirm(value);
    })
  }
}
