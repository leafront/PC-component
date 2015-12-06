define(function(require,exports,module){
    var UserData = {
        userData : null,
        name:location.hostname,
        init:function(){
            if (!UserData.userData) {
                try {
                    UserData.userData = document.createElement('INPUT');
                    UserData.userData.type = "hidden";
                    UserData.userData.style.display = "none";
                    UserData.userData.addBehavior ("#default#userData");
                    document.body.appendChild(UserData.userData);
                    var expires = new Date();
                    expires.setDate(expires.getDate()+365);
                    UserData.userData.expires = expires.toUTCString();
                } catch(e) {
                    return false;
                }
            }
            return true;
        },

        setItem : function(key, value) {

            if(UserData.init()){
                UserData.userData.load(UserData.name);
                UserData.userData.setAttribute(key, value);
                UserData.userData.save(UserData.name);
            }
        },

        getItem : function(key) {
            if(UserData.init()){
                UserData.userData.load(UserData.name);
                return UserData.userData.getAttribute(key)
            }
        },

        remove : function(key) {
            if(UserData.init()){
                UserData.userData.load(UserData.name);
                UserData.userData.removeAttribute(key);
                UserData.userData.save(UserData.name);
            }

        }
    };
    var storage={
        setItem:function(key,value){
            if(!window.localStorage){
                UserData.setItem(key,value);
            }else{
                if(Object.prototype.toString.call(value)=='[object Object]'){
                    var value=JSON.stringify(value);
                }
                localStorage.setItem(key,value);
            }
        },
        getItem:function(key){
            var value="";
            if(!window.localStorage){
                if(UserData.getItem(key)==undefined) {
                    //Do Nothing!
                }else{
                    value=UserData.getItem(key);
                }
            }else{
                if(localStorage.getItem(key)!=null){
                    if(localStorage.getItem(key).slice(0,1)=='{'){
                        value=JSON.parse(localStorage.getItem(key));
                    }
                    value=localStorage.getItem(key);
                }else{
                    //Do Nothing!
                }
            }
            return value;
        },
        remove:function(key){
            if(!window.localStorage){
                UserData.remove(key);
            }else{
                localStorage.removeItem(key);
            }
        }
    };
    module.exports=storage;
})