function requestUrl(queryString){
  var args = new Object();
    var query = location.search.substring(1).toLowerCase(); // Get query string
    var pairs = query.split("&"); // Break at ampersand
    for (var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('='); // Look for "name=value"
        if (pos == -1) continue; // If not found, skip
        var argname = pairs[i].substring(0, pos); // Extract the name
        var value = pairs[i].substring(pos + 1); // Extract the value
        value=decodeURIComponent(value); // Decode it, if needed
        args[argname] = value; // Store as a property
    }
    return args[queryString.toLowerCase()]; // Return the object
}
function countdown(val){
    var countdown=60;
    (function settime() {
        if (countdown == 0) {
            val.removeAttribute("disabled");
            val.value="发送验证码";
            countdown = 60;
            $(val).removeClass('login-code-active');
            return;
        } else {
            $(val).addClass('login-code-active');
            val.setAttribute("disabled", true);
            val.value="重新发送(" + countdown + ")";
            countdown--;
        }
        setTimeout(function() {
            settime(val);
        },1000);
    })();
};
var times={
    countdownTime:function(time,text) {
        var d, h, m,s;
        function checkTime(i) {
            if (i < 10) {
                i = "0" + i
            }
            return i;
        }
        function freshTime(time, text) {
            var endtime = new Date(time);//结束时间
            var nowtime = new Date();//当前时间
            var getTime = parseInt((endtime.getTime() - nowtime.getTime()) / 1000);
            d = parseInt(getTime / 3600 / 24);
            h = parseInt((getTime / 3600) % 24);
            m = parseInt((getTime / 60) % 60);
            s = parseInt(getTime % 60);
            if (getTime <= 0) {
                return text;
                clearInterval(timer);
            }
            document.getElementById('timer').innerHTML=d + "天" + checkTime(h) + "小时" + checkTime(m) + "分" + checkTime(s) + "秒";
        }
        freshTime(time, text)
        var timer = setInterval(function () {
            freshTime(time, text);
        }, 1000);
    }
 }
 Date.prototype.format = function(format){
    var o = {
        "M+" : this.getMonth()+1, //month
        "d+" : this.getDate(),    //day
        "h+" : this.getHours(),   //hour
        "m+" : this.getMinutes(), //minute
        "s+" : this.getSeconds(), //second
        "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
        "S" : this.getMilliseconds() //millisecond
    };
    if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
(this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o){
        if(new RegExp("("+ k +")").test(format))
            format = format.replace(RegExp.$1,RegExp.$1.length==1 ? o[k] :("00"+ o[k]).substr((""+ o[k]).length));
    }
    return format;
    //alert(new Date().format("yyyy-MM-dd hh:mm:ss"));
}

Array.prototype.unique=function(arr){
    arr.filter(function(item,index){
        return arr.indexOf(item)==index;
    })

}
Array.prototype.unique1 = function()
{
    var n = []; //一个新的临时数组
    for(var i = 0; i < this.length; i++) //遍历当前数组
    {
        //如果当前数组的第i已经保存进了临时数组，那么跳过，
        //否则把当前项push到临时数组里面
        if (n.indexOf(this[i]) == -1) n.push(this[i]);
    }
    return n;
}



Array.prototype.unique2 = function()
{
    var n = {},r=[]; //n为hash表，r为临时数组
    for(var i = 0; i < this.length; i++) //遍历当前数组
    {
        if (!n[this[i]]) //如果hash表中没有当前项
        {
            n[this[i]] = true; //存入hash表
            r.push(this[i]); //把当前数组的当前项push到临时数组里面
        }
    }
    return r;
}


Array.prototype.unique3 = function()
{
    var n = [this[0]]; //结果数组
    for(var i = 1; i < this.length; i++) //从第二项开始遍历
    {
        //如果当前数组的第i项在当前数组中第一次出现的位置不是i，
        //那么表示第i项是重复的，忽略掉。否则存入结果数组
        if (this.indexOf(this[i]) == i) n.push(this[i]);
    }
    return n;
}


Array.prototype.unique4 = function()
{
    this.sort();
    var re=[this[0]];
    for(var i = 1; i < this.length; i++)
    {
        if( this[i] !== re[re.length-1])
        {
            re.push(this[i]);
        }
    }
    return re;
}

function shuffle(arr) {
     var i,
        j,
        temp;
     for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
     return arr;
};




function formatCash(cash){
        var str_cash = cash + "";//转换成字符串
        var ret_cash = "";
        var counter = 0;
        for(var i=str_cash.length-1;i>=0;i--){
            ret_cash = str_cash.charAt(i) + ret_cash;
            counter++;
            if(counter==3){
                counter = 0;
                if(i!=0){
                ret_cash = "," + ret_cash;
                }
            }}
        return ret_cash;
    }





function hasClass(ele,cls) {
    return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}

// 给指定对象添加className
function addClass(ele,cls) {
    if (!this.hasClass(ele,cls)) ele.className += " "+cls;
}

// 删除className
function removeClass(ele,cls) {
    if (hasClass(ele,cls)) {
        var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
        ele.className=ele.className.replace(reg,' ');
    }
}

//解决滚动问题

function throttle(func, wait, mustRun) {
	var timeout,
		startTime = new Date();

	return function() {
		var context = this,
			args = arguments,
			curTime = new Date();

		clearTimeout(timeout);
		// 如果达到了规定的触发时间间隔，触发 handler
		if(curTime - startTime >= mustRun){
			func.apply(context,args);
			startTime = curTime;
		// 没达到触发间隔，重新设定定时器
		}else{
			timeout = setTimeout(func, wait);
		}
	};
};
// 实际想绑定在 scroll 事件上的 handler
function realFunc(){
	console.log("Success");
}
// 采用了节流函数
window.addEventListener('scroll',throttle(realFunc,500,1000));






var countdown = 5 * 24 * 3600;

// 立即显示还剩五天
console.log("还剩余5天0小时0分0秒");
// 倒计时
var countdownTimer = setInterval(function () {
    // 倒计时到零时，停止倒计时
    if (countdown <= 0)
        return clearInterval(countdownTimer);

    countdown -= 1;

    var rest = countdown;
    // 天
    var days = parseInt(rest / (24 * 3600), 10);
    rest -= days * 24 * 3600;
    // 时
    var hours = parseInt(rest / 3600, 10);
    rest -= hours * 3600;
    // 分
    var minutes = parseInt(rest / 60, 10);
    rest -= minutes * 60;
    // 秒
    var seconds = parseInt(rest, 10);

    console.log("还剩余" + days + "天" + hours + "小时" + minutes + "分" + seconds + "秒");
}, 1e3);
