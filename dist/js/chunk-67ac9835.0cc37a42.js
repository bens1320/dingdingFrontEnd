(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-67ac9835"],{"095c":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"users-show"},[e("div",{staticClass:"col-md-3 main-col"},[e("div",{staticClass:"box"},[e("div",{staticClass:"padding-md"},[e("div",{staticClass:"list-group text-center"},t._l(t.links,(function(a){return e("router-link",{key:a.name,staticClass:"list-group-item",attrs:{to:"/users/1/"+a.name}},[e("i",{class:"text-md fa fa-"+a.icon}),t._v(" "+t._s(a.title)+" ")])})),1)])])]),e("router-view")],1)},i=[],r={name:"UsersEdit",data:function(){return{links:[{name:"edit",title:"第一季度报",icon:"list-alt"},{name:"edit_mid",title:"年中报",icon:"list-alt"},{name:"edit_third",title:"第三季度报",icon:"list-alt"},{name:"edit_annual",title:"年报",icon:"list-alt"}]}}},o=r,n=e("2877"),l=Object(n["a"])(o,s,i,!1,null,"d5826c4c",null);a["default"]=l.exports},5326:function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-4 col-md-offset-4 floating-box"},[e("Message",{attrs:{show:t.msgShow,type:t.msgType,msg:t.msg},on:{"update:show":function(a){t.msgShow=a}}}),e("div",{staticClass:"panel panel-default"},[t._m(0),e("div",{staticClass:"panel-body",attrs:{"data-validator-form":""}},[e("div",{staticClass:"form-group"},[e("label",{staticClass:"control-label"},[t._v("邮箱")]),e("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.email,expression:"email",modifiers:{trim:!0}},{name:"validator",rawName:"v-validator.required",value:{title:"邮箱"},expression:"{ title: '邮箱' }",modifiers:{required:!0}}],staticClass:"form-control",attrs:{type:"text",placeholder:"请填写邮箱"},domProps:{value:t.email},on:{input:function(a){a.target.composing||(t.email=a.target.value.trim())},blur:function(a){return t.$forceUpdate()}}})]),e("div",{staticClass:"form-group"},[e("label",{staticClass:"control-label"},[t._v("密码")]),e("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.password,expression:"password",modifiers:{trim:!0}},{name:"validator",rawName:"v-validator.required",value:{title:"密码"},expression:"{ title: '密码' }",modifiers:{required:!0}}],staticClass:"form-control",attrs:{id:"password",type:"password",placeholder:"请填写密码"},domProps:{value:t.password},on:{input:function(a){a.target.composing||(t.password=a.target.value.trim())},blur:function(a){return t.$forceUpdate()}}})]),e("br"),e("button",{staticClass:"btn btn-lg btn-success btn-block",attrs:{type:"submit"},on:{click:t.login}},[e("i",{staticClass:"fa fa-btn fa-sign-in"}),t._v(" 登录 ")])])])],1)])},i=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"panel-heading"},[e("h3",{staticClass:"panel-title"},[t._v("请登录")])])}],r=e("bc3a"),o=e.n(r),n={name:"Login",data:function(){return{email:"",password:"",msg:"",msgType:"",msgShow:!1}},methods:{login:function(t){var a=this;setTimeout((function(){var e="submit"===t.target.type?t.target:t.target.parentElement;e.canSubmit&&a.submit()}))},submit:function(){var t=this,a={email:this.email,password:this.password,action:"login"};o.a.post("http://121.43.179.224:8000/api/users/",a).then((function(a){var e=parseInt(a.data["code"]),s=a.data["token"];1e3===e?(localStorage.setItem("useremail",t.email),localStorage.setItem("token",s),t.$store.dispatch("login")):1001===e&&t.showMsg("邮箱或密码错误")}))},showMsg:function(t){var a=this,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"warning";this.msg=t,this.msgType=e,this.msgShow=!1,this.$nextTick((function(){a.msgShow=!0}))}}},l=n,c=e("2877"),d=Object(c["a"])(l,s,i,!1,null,"370087f0",null);a["default"]=d.exports},8742:function(t,a,e){},"935e":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-4 col-md-offset-4 floating-box"},[e("Message",{attrs:{show:t.msgShow,type:t.msgType,msg:t.msg},on:{"update:show":function(a){t.msgShow=a}}}),e("div",{staticClass:"panel panel-default"},[t._m(0),e("div",{staticClass:"panel-body",attrs:{"data-validator-form":""}},[e("div",{staticClass:"form-group"},[e("label",{staticClass:"control-label"},[t._v("邮箱")]),e("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.email,expression:"email",modifiers:{trim:!0}},{name:"validator",rawName:"v-validator:input.required",value:{regex:/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,error:"邮箱不合法"},expression:"{ regex: /^[A-Za-z\\d]+([-_.][A-Za-z\\d]+)*@([A-Za-z\\d]+[-.])+[A-Za-z\\d]{2,4}$/, error: '邮箱不合法' }",arg:"input",modifiers:{required:!0}}],staticClass:"form-control",attrs:{type:"text",placeholder:"请填写邮箱"},domProps:{value:t.email},on:{input:function(a){a.target.composing||(t.email=a.target.value.trim())},blur:function(a){return t.$forceUpdate()}}})]),e("div",{staticClass:"form-group"},[e("label",{staticClass:"control-label"},[t._v("密码")]),e("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.password,expression:"password",modifiers:{trim:!0}},{name:"validator",rawName:"v-validator.required",value:{regex:/^\w{6,16}$/,error:"密码要求 6 ~ 16 个单词字符"},expression:"{ regex: /^\\w{6,16}$/, error: '密码要求 6 ~ 16 个单词字符' }",modifiers:{required:!0}}],staticClass:"form-control",attrs:{id:"password",type:"password",placeholder:"请填写密码"},domProps:{value:t.password},on:{input:function(a){a.target.composing||(t.password=a.target.value.trim())},blur:function(a){return t.$forceUpdate()}}})]),e("div",{staticClass:"form-group"},[e("label",{staticClass:"control-label"},[t._v("确认密码")]),e("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.cpassword,expression:"cpassword",modifiers:{trim:!0}},{name:"validator",rawName:"v-validator.required",value:{target:"#password"},expression:"{ target: '#password' }",modifiers:{required:!0}}],staticClass:"form-control",attrs:{type:"password",placeholder:"请填写确认密码"},domProps:{value:t.cpassword},on:{input:function(a){a.target.composing||(t.cpassword=a.target.value.trim())},blur:function(a){return t.$forceUpdate()}}})]),e("div",{staticClass:"form-group"},[e("label",{staticClass:"control-label"},[t._v("图片验证码")]),e("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.captcha,expression:"captcha",modifiers:{trim:!0}},{name:"validator",rawName:"v-validator.required",value:{title:"图片验证码"},expression:"{ title: '图片验证码' }",modifiers:{required:!0}}],staticClass:"form-control",attrs:{type:"text",placeholder:"请填写验证码"},domProps:{value:t.captcha},on:{input:function(a){a.target.composing||(t.captcha=a.target.value.trim())},blur:function(a){return t.$forceUpdate()}}})]),e("div",{staticClass:"thumbnail",attrs:{title:"点击图片重新获取验证码"},on:{click:t.getCaptcha}},[e("div",{staticClass:"captcha vcenter",domProps:{innerHTML:t._s(t.captchaTpl)}})]),e("button",{staticClass:"btn btn-lg btn-success btn-block",attrs:{type:"submit"},on:{click:t.register}},[e("i",{staticClass:"fa fa-btn fa-sign-in"}),t._v(" 注册 ")])])])],1)])},i=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"panel-heading"},[e("h3",{staticClass:"panel-title"},[t._v("请注册")])])}],r=(e("4160"),e("a15b"),e("d81d"),e("159b"),e("2909")),o=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:6,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"QWERTYUIOPLKJHGFDSAZXCVBNM1234567890",e="",s=[];try{s=Object(r["a"])(Array(t)).map((function(){return a[Math.floor(Math.random()*a.length)]}))}catch(i){}return s.forEach((function(t){e+='<span class="flex1 hcenter">'.concat(t,"</span>")})),s=s.join(""),{tpl:e,captcha:s}},n=e("bc3a"),l=e.n(n),c={name:"Register",data:function(){return{captchaTpl:"",email:"",password:"",cpassword:"",captcha:"",msg:"",msgType:"",msgShow:!1}},created:function(){this.getCaptcha()},methods:{getCaptcha:function(){var t=o(4),a=t.tpl,e=t.captcha;this.captchaTpl=a,this.localCaptcha=e},register:function(t){var a=this;setTimeout((function(){var e="submit"===t.target.type?t.target:t.target.parentElement;e.canSubmit&&a.submit()}))},submit:function(){var t=this;if(this.captcha.toUpperCase()!==this.localCaptcha)this.showMsg("验证码不正确"),this.getCaptcha();else{var a={email:this.email,password:this.password,action:"register"};l.a.post("http://121.43.179.224:8000/api/users/",a).then((function(e){var s=parseInt(e.data["code"]);1e3===s?t.login(a):1004===s&&t.showMsg("邮箱已存在")}))}},login:function(t){localStorage.setItem("useremail",this.email),this.$store.dispatch("login",t),this.showMsg("注册成功","success")},showMsg:function(t){var a=this,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"warning";this.msg=t,this.msgType=e,this.msgShow=!1,this.$nextTick((function(){a.msgShow=!0}))}}},d=c,m=(e("d6c5"),e("2877")),u=Object(m["a"])(d,s,i,!1,null,"dc333ace",null);a["default"]=u.exports},a15b:function(t,a,e){"use strict";var s=e("23e7"),i=e("44ad"),r=e("fc6a"),o=e("a640"),n=[].join,l=i!=Object,c=o("join",",");s({target:"Array",proto:!0,forced:l||!c},{join:function(t){return n.call(r(this),void 0===t?",":t)}})},d6c5:function(t,a,e){"use strict";var s=e("8742"),i=e.n(s);i.a}}]);
//# sourceMappingURL=chunk-67ac9835.0cc37a42.js.map