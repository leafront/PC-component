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
function countdownTime(time,text){
        var endtime=new Date(time);//结束时间
        var nowtime = new Date();//当前时间
        var getTime=parseInt((endtime.getTime()-nowtime.getTime())/1000);
        d=parseInt(getTime/3600/24);
        h=parseInt((getTime/3600)%24);
        m=parseInt((getTime/60)%60);
        s=parseInt(getTime%60);
          return d+"天"+h+"小时"+m+"分"+s+"秒";
        if(getTime<=0){
          return text;
          clearInterval(this.timer);
        }
        countdownTime(time,text);
        this.timer=setInterval(function(){
          console.log(1)
          countdownTime(time,text);
        },1000);
}
