(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d2086b7"],{a55b:function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"container"},[s("div",{staticClass:"row justify-content-center align-items-center vh-100"},[s("div",{staticClass:"col-md-6"},[e._m(0),s("form",{attrs:{action:""},on:{submit:function(t){return t.preventDefault(),e.logIn(t)},keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.logIn(t)}}},[s("div",{staticClass:"form-group mt-4"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.user.username,expression:"user.username"}],staticClass:"form-control",attrs:{type:"email",id:"exampleInputEmail1","aria-describedby":"emailHelp",placeholder:"請輸入電子郵件地址",autofocus:""},domProps:{value:e.user.username},on:{input:function(t){t.target.composing||e.$set(e.user,"username",t.target.value)}}})]),s("div",{staticClass:"form-group"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.user.password,expression:"user.password"}],staticClass:"form-control",attrs:{type:"password",id:"exampleInputPassword1",placeholder:"請輸入密碼"},domProps:{value:e.user.password},on:{input:function(t){t.target.composing||e.$set(e.user,"password",t.target.value)}}})])]),s("div",{staticClass:"d-flex justify-content-center mt-4"},[s("router-link",{staticClass:"btn border-dark",attrs:{to:"/products"}},[e._v("返回賣場")]),s("button",{staticClass:"btn btn-dark ml-3",attrs:{type:"submit",disabled:e.isLoading},on:{click:e.logIn}},[e._v("登入")])],1)])])])},n=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"text-center h3"},[s("p",{staticClass:"mb-0"},[e._v("Bean Soul")]),s("p",[e._v("管理員登入")])])}],r=(s("99af"),s("d722")),o={data:function(){return{user:{username:"",password:""},isLoading:!1}},methods:{logIn:function(){var e=this;e.isLoading=!0,Object(r["a"])(e.user).then((function(t){if(e.isLoading=!1,t.data.success){var s=t.data,a=s.token,n=s.expired;document.cookie="BeanToken=".concat(a,"; expires=").concat(new Date(1e3*n),";"),e.$router.push("/admin/products")}}))}}},i=o,u=s("2877"),c=Object(u["a"])(i,a,n,!1,null,null,null);t["default"]=c.exports}}]);
//# sourceMappingURL=chunk-2d2086b7.f03d6d38.js.map