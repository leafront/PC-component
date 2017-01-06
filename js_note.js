Promise.resolve([1,2,34,5])
.then((result) => {
  alert(result)
})



var promise = new Promise((resolve,reject) => {
	resolve('success');
})
promise.then((result) => {
  return result;
}).then((value) => {
  console.log(value)
})


DOMString、Document、FormData、Blob、File、ArrayBuffer


var xhr = new XMLHttpRequest();    
xhr.open("get", "mm1.jpg", true);
xhr.responseType = "blob";
xhr.onload = function() {
    if (this.status == 200) {
        var blob = this.response;  // this.response也就是请求的返回就是Blob对象
        var img = document.createElement("img");
        img.onload = function(e) {
          window.URL.revokeObjectURL(img.src); // 清除释放
        };
        img.src = window.URL.createObjectURL(blob);
        eleAppend.appendChild(img);    
    }
}
xhr.send();

var obj = {
    a:5,
    getLocation () {
      var promise = new Promise((resolve,reject) => {
      	console.log(this.a)
      })
      return promirse;
    }
}



function encodeFormData(data){
	if(!data) return "";
	var pairs = [];
	for (var name in data) {
		if(!data.hasOwnProperty(name)) continue;
		if(typeof data[name] === 'function') continue;
		var value = data[name].toString();
		name = encodeURIComponent(name.replace("%20","+"));
		value = encodeURIComponent(value.replace("%20","+"));
		pairs.push(name + "=" + value);
	}
	return pairs.join('&')

}


function formData (data) {
  var formdata = new FormData();
  for(var name in data) {
  	if(!data.hasOwnProperty(name)) continue;
  	var value = data[name];
  	if(typeof value === 'function') continue;
  	formdata.append(name,value);

  }
}


var MyModules = (function Manager() {
	var modules = {};
	function define(name, deps, impl) {
	  for (var i=0; i<deps.length; i++) {
	    deps[i] = modules[deps[i]];
	  }
	  modules[name] = impl.apply( impl, deps );
	}
	function get(name) {
	  return modules[name];
	}
	return {
	  define: define,
      get: get
	};
})();

MyModules.define( "bar", [], function() {
  function hello(who) {
	return "Let me introduce: " + who; 
  }
  return {
    hello: hello
  }; 
});

MyModules.define( "foo", ["bar"], function(bar) {
  var hungry = "hippo";
  function awesome() {
    console.log( bar.hello( hungry ).toUpperCase() );
  }
  return {
    awesome: awesome
  }; 
});

var bar = MyModules.get( "bar" );
var foo = MyModules.get( "foo" );
console.log(bar.hello( "hippo" )); // Let me introduce: hippo 
foo.awesome(); // LET ME INTRODUCE: HIPPO


function foo(num) {
   console.log(this);
	// 记录 foo 被调用的次数
   this.count++; 
}
foo.count = 0;
var i;
for (i=0; i<10; i++) { 
	if (i > 5) {
		foo( i ); 
	}
}




if (typeof Object.assign != 'function') {
  Object.assign = function(target) {
    'use strict';
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }

    target = Object(target);
    for (var index = 1; index < arguments.length; index++) {
      var source = arguments[index];
      if (source != null) {
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
    }
    return target;
  };
}

var lost = {
    a : 2
};    
Object.defineProperty(lost,'sum',{
	get () {
	    return this.a;
	},
	set (val) {
	    this.a = val * this.a;
	}
})



var myObject = {
 a: 2,
 b: 3 
};
Object.defineProperty( Object.prototype, Symbol.iterator, {
 enumerable: false,
 writable: false,
 configurable: true,
 value: function() { 
 	var o = this;
    var idx = 0;
    var ks = Object.keys( o );
    return {
	    next: function() { 
			return {
		        value: o[ks[idx++]],
		        done: (idx > ks.length)
		     };
		}
	};
  } 
});
// 用 for..of 遍历 myObject 
for (var v of myObject) {
 console.log( v );
}

　　function deepCopy(p, c) {
　　　　var c = c || {};
　　　　for (var i in p) {
　　　　　　if (typeof p[i] === 'object') {
　　　　　　　　c[i] = (p[i].constructor === Array) ? [] : {};
　　　　　　　　deepCopy(p[i], c[i]);
　　　　　　} else {
　　　　　　　　　c[i] = p[i];
　　　　　　}
　　　　}
　　　　return c;
　　}



function extend(sourceObj,targetObj){
	var targetObj = targetObj || {};
	for (var attr in sourceObj) {
		if(typeof sourceObj[attr] === 'object'){
			targetObj[attr] = (sourceObj[attr].constructor === Array) ? [] : {};
			extend(sourceObj[attr],targetObj[attr])
		} else {
			targetObj[attr] = sourceObj[attr];
		}
	}
	return targetObj;
}


　　function extendCopy(p) {
　　　　var c = {};
　　　　for (var i in p) { 
　　　　　　c[i] = p[i];
　　　　}
　　　　c.uber = p;
　　　　return c;
　　}


    jQuip.extend= function(out) {
        out = out || {};
        for (var i = 1; i < arguments.length; i++) {
            var obj = arguments[i];
            if (!obj)
               continue;
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (typeof obj[key] === 'object')
                        jQuip.extend(out[key], obj[key])
                    else
                        out[key] = obj[key];
                 }
            }
        }
        return out;
    };


       location / {
            root   /Users/leafrontye/desktop/webApp-master;
            index  /public/index.html;
            rewrite "/webapp/*" /public/index.html;
            #proxy_pass http://127.0.0.1:8080;
        }


   define([
  'validate',
  'user',
  'wx',
  'model',
  'Promise'
],
(
  validate,
  user,
  wx,
  model,
  Promise
) => {
  const common = {
    //倒计时提醒语音验证码
    countTimeCode () {
      this.disabled = true;
      this.btnMsg = "60 秒";
      var number = 60;
      var timer = this.pageView.setInterval(() => {
        if (number--) {
          this.btnMsg = number +" 秒";
          if(number === 30 && !this.code){
            Lizard.alert({
              msg:'还没收到短信验证码？试试语音验证码吧。',
              btns:[{
                text:'继续等待'
              },{
                text:'语音验证码',
                callback: () => {
                  console.log(this)
                  common.voiceCheckAction.call(this);
                  this.hide();
                }
              }]
            });
          }
        } else {
          clearInterval(timer);
          this.btnMsg = "获取验证码";
          this.disabled = false;
        }
      }, 1000);
    },
    // 发送短信验证码
    sendCode (obj,self) {
      //是否需要图片验证码逻辑
      var data = {mobile: self.mobile};
      if(obj){
        _.extend(data,obj);
      }
      Lizard.ajax({
        url: 'user/sendSecurityLoginVoiceSms',
        data: data
      }).then(() => {
        common.countTimeCode.call(self);
        if (this.hide) {
          this.hide();
        }
      }).catch((error) => {
        //需要图片验证码
        if (error && error.statusCode == 9135) {
          common.codePopup.call(self,error);
        } else {
          Lizard.hint(error.msg);
        }
      })
    },
    //显示图像验证
    codePopup (result) {
      var self = this;
      Lizard.alert({
        events: {
          'click .js-imgcode-change' : () => {
            Lizard.ajax({
              url: 'user/getCaptchaToken',
              data: {mobile: this.mobile, msgType: 1},
            }).then(() => {
              common.codePopup.call(this, {"result": result});
            })
          }
        },
        title: '需要确认您的身份',
        msg: '<div class="clearfix"><input class="js-securitycode fl-input fix-content" type="tel" placeholder="请输入右图的数字"><span class="js-img-code fl-code-wrap"><div class = "fl-loading-code"><div class="fl-loading-code-code"></div></div></span></div>',
        btns: [{
          text: '取消',
          callback: function() {
            this.hide();
          }
        },{
          text: '确定',
          callback :function (){
            var code = this.$('.js-securitycode').val().trim();
            var data = {
              captchaCode: code
            };
            if(result && result.result){
              _.extend(data, {captchaToken: result.result});
            }
            common.sendCode.call(this,data,self);
          }
        }]
      });
      if(result && result.result){
        var img = document.createElement("img");
        img.className += 'img js-imgcode-change';
        img.setAttribute('src', Lizard.config.gateway + "captcha/"+ result.result );
        img.onload = function (){
          $('.js-img-code').html('')[0].appendChild(img);
        };
      }
    },
    //短信验证码功能
    commonCodeAction () {
      if(this.disabled){
        return;
      }
      if(!this.mobile){
        Lizard.hint('请输入手机号码');
        return;
      }
      if(!validate.isMobile(this.mobile)){
        Lizard.hint('手机号码格式不正确');
        return;
      }
      common.sendCode.call(null,null, this);

    },
    //语音验证码功能
    voiceCheckAction () {
      if(!this.mobile){
        Lizard.hint('请输入手机号码');
        return;
      }
      if(!validate.isMobile(this.mobile)){
        Lizard.hint('手机号码格式不正确');
        return;
      }
      common.sendCode.call(null,null, this);
    },
    //短信验证码功能
    getCodeAction () {
      if(this.disabled){
        return;
      }
      if(!this.mobile){
        Lizard.hint('请输入手机号码');
        return;
      }
      if(!validate.isMobile(this.mobile)){
        Lizard.hint('手机号码格式不正确');
        return;
      }
      let sendCodeUrl = "user/sendSecurityLoginSms";
      // 如果授权过就是绑定手机
      if (user.isAuth()) {
        sendCodeUrl = "user/sendSecurityBindSms";
      }
      //是否需要图片验证码逻辑
      Lizard.ajax({
        url: sendCodeUrl,
        data: {
          mobile: this.mobile
        }
      }).then(() => {
        this.disabled = true;
        this.btnMsg = "60 秒";
        var number = 60;
        var timer = this.pageView.setInterval(() => {
          if (number--) {
            this.btnMsg = "重发" + number ;
          } else {
            clearInterval(timer);
            this.btnMsg = "获取验证码";
            this.disabled = false;
          }
        }, 1000);
      }).catch((error) => {
        Lizard.hint(error.msg);
      })
    },
    // 分享操作
    shareObject (options) {
      const nowDate = new Date().getTime();
      const pathname = location.pathname.replace(/\d+/,'');
      let shareUrl = location.protocol + '//' + location.host + pathname + nowDate + location.search;
      const share = {
        jsSignUrl: 'wechat/oauth/get-js-sign',
        title: options.title,
        desc: options.desc,
        showtitle: options.showtitle,
        link: shareUrl,
        imgUrl: options.imgUrl,
        thumb: options.thumb, //图片名,不能是url
        thumburl: options.thumburl
      };
      return share;
    },
    getLocation () {
      var promise = new Promise((resolve,reject) => {
        this.wxConfig(['getLocation']);
        wx.ready(() => {
          wx.getLocation({
            success (res) {
              resolve(res);
            },
            fail (error) {
              reject(error);
            }
          })
        })
      })
      return promise;
    },
    wxConfig (apiList) {
      model.getShareSign({
        jsSignUrl: 'wechat/oauth/get-js-sign',
        href: location.href
      }, (result) => {
        wx.config({
          debug: false,
          appId: result.appid,
          timestamp: result.timestamp,
          nonceStr: result.noncestr,
          signature: result.signature,
          jsApiList:  apiList
        });
      })
    },
    shareReady (share) {
      const options = this.shareObject(share);
      const jsApiList = [
        // 所有要调用的 API 都要加到这个列表中
        'checkJsApi',
        'onMenuShareAppMessage',
        'onMenuShareTimeline',
        'onMenuShareWeibo',
        'onMenuShareQQ',
        'onMenuShareQZone',
      ]
      this.wxConfig(jsApiList);
      wx.ready(() => {
        var shareApi = ['onMenuShareAppMessage','onMenuShareTimeline','onMenuShareWeibo','onMenuShareQQ','onMenuShareQZone'];
        shareApi.forEach((item) => {
          wx[item]({
            title: options.title,
            desc: options.desc,
            link: options.link,
            imgUrl: options.imgUrl,
            success () {
            }
          })
        })
        wx.showOptionMenu();
      });
    },
  }
  return common;
});





define([
  'validate',
  'user',
  'wx',
  'model',
  'Promise'
],
(
  validate,
  user,
  wx,
  model,
  Promise
) => {
  const common = {
    //短信验证码功能
    commonCodeAction () {
      if(this.disabled){
        return;
      }
      if(!this.mobile){
        Lizard.hint('请输入手机号码');
        return;
      }
      if(!validate.isMobile(this.mobile)){
        Lizard.hint('手机号码格式不正确');
        return;
      }
      var self = this;
      //是否需要图片验证码逻辑
      var ajaxFn = function (obj){
        var data = {mobile: self.mobile};
        var self1 = this;
        if(obj){
          _.extend(data,obj);
        }
        var sendCodeUrl = "user/sendSecurityLoginSms";
        // 如果授权过就是绑定手机
        if (user.isAuth()) {
          sendCodeUrl = "user/sendSecurityBindSms";
        }
        Lizard.ajax({
          url: sendCodeUrl,
          data: data,
          success: function () {
            //不需要图片验证码
            cb();
            if (self1.hide) {
              self1.hide();
            }
          },
          error: function (result){
            //需要图片验证码
            if (result && result.statusCode == 9135) {
              codePopup(result);
            } else {
              Lizard.hint(result.msg);
            }
          }
        });
      };

      ajaxFn();

      var codePopup = function (result) {
        Lizard.alert({
          events: {
            'click .js-imgcode-change' : function (){
              Lizard.ajax({
                url: 'user/getCaptchaToken',
                data: {mobile: self.mobile, msgType: 1},
                success: function(result){
                  codePopup({"result": result});
                }
              });
            }
          },
          title: '需要确认您的身份',
          msg: '<div class="clearfix"><input class="js-securitycode fl-input fix-content" type="tel" placeholder="请输入右图的数字"><span class="js-img-code fl-code-wrap"><div class = "fl-loading-code"><div class="fl-loading-code-code"></div></div></span></div>',
          btns: [{
            text: '取消',
            callback: function() {
              this.hide();
            }
          },{
            text: '确定',
            callback :function (){
              var code = this.$('.js-securitycode').val().trim();
              var data = {
                captchaCode: code
              };
              if(result && result.result){
                _.extend(data, {captchaToken: result.result});
              }
              ajaxFn.call(this,data);
            }
          }]
        });
        if(result && result.result){
          var img = document.createElement("img");
          img.className += 'img js-imgcode-change';
          img.setAttribute('src', Lizard.config.gateway + "captcha/"+ result.result );
          img.onload = function (){
            $('.js-img-code').html('')[0].appendChild(img);
          };
        }
      };
      var cb = function () {
        self.disabled = true;
        self.btnMsg = "60 秒";
        var number = 60;
        var timer = self.pageView.setInterval(function() {
          console.log('Timer is setted.');
          if (number--) {
            self.btnMsg = number +" 秒";
            if(number === 30 && !self.code){
              Lizard.alert({
                msg:'还没收到短信验证码？试试语音验证码吧。',
                btns:[{
                  text:'继续等待'
                },{
                  text:'语音验证码',
                  callback:function(){
                    self.voiceCheckAction();
                    this.hide();
                  }
                }]
              });
            }
          } else {
            clearInterval(timer);
            self.btnMsg = "获取验证码";
            self.disabled = false;
          }
        }, 1000);
      };
    },
    //语音验证码功能
    voiceCheckAction () {
      if(!this.mobile){
        Lizard.hint('请输入手机号码');
        return;
      }
      if(!validate.isMobile(this.mobile)){
        Lizard.hint('手机号码格式不正确');
        return;
      }

      var  self = this;
      var ajaxFn = function (obj) {
        var self1 = this, data = {mobile: self.mobile};
        if(obj){
          _.extend(data,obj);
        }
        Lizard.ajax({
          url: 'user/sendSecurityLoginVoiceSms',
          data: data,
          success: function (result) {
            self.voicenum = result;
            self.voiceShow = 1;
            if(self1.hide){
              self1.hide();
            }
          },
          error: function (result) {
            if (result && result.statusCode == 9135) {
              codePopup(result);
            } else {
              Lizard.hint(result.msg);
            }
          }
        });
      };
      ajaxFn();

      var codePopup = function (result) {
        Lizard.alert({
          events: {
            'click .js-imgcode-change' : function () {
              Lizard.ajax({
                url: 'user/getCaptchaToken',
                data: {mobile: self.mobile, msgType: 1},
                success: function(result){
                  codePopup({"result": result});
                }
              });
            }
          },
          title: '需要确认您的身份',
          msg: '<div class="clearfix"><input class="js-securitycode fl-input fix-content" type="tel" placeholder="请输入右图的数字"><span class="js-img-code fl-code-wrap"><div class = "fl-loading-code"><div class="fl-loading-code-code"></div></div></span></div>',
          btns: [{
            text: '取消',
            callback: function() {
              this.hide();
            }
          },{
            text: '确定',
            callback :function (){
              var code = this.$('.js-securitycode').val().trim();
              var data = {
                captchaCode: code
              };
              if(result && result.result){
                _.extend(data, {captchaToken: result.result});
              }
              ajaxFn.call(this,data);
            }
          }]
        });
        if(result && result.result){
          var img = document.createElement("img");
          img.className += 'img js-imgcode-change';
          img.setAttribute('src', Lizard.gateway + "captcha/"+ result.result );
          img.onload = function (){
            $('.js-img-code').html('')[0].appendChild(img);
          };
        }
      };
    },
    //短信验证码功能
    getCodeAction () {
      if(this.disabled){
        return;
      }
      if(!this.mobile){
        Lizard.hint('请输入手机号码');
        return;
      }
      if(!validate.isMobile(this.mobile)){
        Lizard.hint('手机号码格式不正确');
        return;
      }
      //是否需要图片验证码逻辑
      var data = {mobile: self.mobile};
      Lizard.ajax({
        url: 'user/sendSecurityLoginSms',
        data: data,
        success () {
          this.disabled = true;
          this.btnMsg = "60 秒";
          var number = 60;
          var timer = this.pageView.setInterval(() => {
            if (number--) {
              this.btnMsg = "重发" + number ;
            } else {
              clearInterval(timer);
              this.btnMsg = "获取验证码";
              this.disabled = false;
            }
          }, 1000);
        },
        error (result) {
          Lizard.hint(result.msg);
        }
      });
    },
    // 分享操作
    shareObject (options) {
      const nowDate = new Date().getTime();
      const pathname = location.pathname.replace(/\d+/,'');
      let shareUrl = location.protocol + '//' + location.host + pathname + nowDate + location.search;
      const share = {
        jsSignUrl: 'wechat/oauth/get-js-sign',
        title: options.title,
        desc: options.desc,
        showtitle: options.showtitle,
        link: shareUrl,
        imgUrl: options.imgUrl,
        thumb: options.thumb, //图片名,不能是url
        thumburl: options.thumburl
      };
      return share;
    },
    getLocation () {
      var promise = new Promise((resolve,reject) => {
        this.wxConfig(['getLocation']);
        wx.ready(() => {
          wx.getLocation({
            success (res) {
              resolve(res);
            },
            fail (error) {
              reject(error);
            }
          })
        })
      })
      return promise;
    },
    wxConfig (apiList) {
      model.getShareSign({
        jsSignUrl: 'wechat/oauth/get-js-sign',
        href: location.href
      }, (result) => {
        wx.config({
          debug: false,
          appId: result.appid,
          timestamp: result.timestamp,
          nonceStr: result.noncestr,
          signature: result.signature,
          jsApiList:  apiList
        });
      })
    },
    shareReady (share) {
      const options = this.shareObject(share);
      const jsApiList = [
        // 所有要调用的 API 都要加到这个列表中
        'checkJsApi',
        'onMenuShareAppMessage',
        'onMenuShareTimeline',
        'onMenuShareWeibo',
        'onMenuShareQQ',
        'onMenuShareQZone',
      ]
      this.wxConfig(jsApiList);
      wx.ready(() => {
        var shareApi = ['onMenuShareAppMessage','onMenuShareTimeline','onMenuShareWeibo','onMenuShareQQ','onMenuShareQZone'];
        shareApi.forEach((item) => {
          wx[item]({
            title: options.title,
            desc: options.desc,
            link: options.link,
            imgUrl: options.imgUrl,
            success () {
            }
          })
        })
        wx.showOptionMenu();
      });
    },
  }
  return common;
});





