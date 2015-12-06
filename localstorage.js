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
        var localStorage={};
        localStorage.setItem=function(key,value){
            if(!window.localStorage){
                UserData.setItem(key,value);
            }else{
                localStorage.setItem(key,value);
            }
        },
        localStorage.getItem=function(key){
            var value="";
            if(!window.localStorage){
                if(UserData.getItem(key)==undefined) {
                   //Do Nothing!
                }else{
                    value=UserData.getItem(key);
                }
            }else{
                if(localStorage.getItem(key)!=null){
                    value=localStorage.getItem(key);
                }else{
                    //Do Nothing!
                }
            }
            return value;
        },
        localStorage.remove=function(key){
            if(!window.localStorage){
                UserData.remove(key);
            }else{
                localStorage.removeItem(key);
            }
        }
        module.exports=localStorage;
});

