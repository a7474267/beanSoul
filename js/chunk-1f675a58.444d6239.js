(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1f675a58"],{1799:function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("nav",{attrs:{"aria-label":"Page navigation example"}},[e("ul",{staticClass:"pagination justify-content-end"},[e("li",{staticClass:"page-item",class:{disabled:!t.pages.has_pre}},[e("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(a){return a.preventDefault(),t.updatepage(t.pages.current_page-1)}}},[t._v("上一頁")])]),t._l(t.pages.total_pages,(function(a){return e("li",{key:a,staticClass:"page-item",class:{active:a===t.pages.current_page}},[e("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.updatepage(a)}}},[t._v(t._s(a))])])})),e("li",{staticClass:"page-item",class:{disabled:!t.pages.has_next}},[e("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(a){return a.preventDefault(),t.updatepage(t.pages.current_page+1)}}},[t._v("下一頁")])])],2)])])},i=[],n={props:["pages"],methods:{updatepage:function(t){this.$emit("update",t)}}},c=n,o=e("2877"),r=Object(o["a"])(c,s,i,!1,null,null,null);a["a"]=r.exports},4422:function(t,a,e){},"4b00":function(t,a,e){"use strict";e("4422")},efd9:function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"container"},[e("Loading",{attrs:{active:t.isLoading},on:{"update:active":function(a){t.isLoading=a}}}),e("div",{staticClass:"row"},[e("div",{staticClass:"col-12"},[e("div",{staticClass:"table-responsive"},[e("table",{staticClass:"table table-striped text-center font-weight-bold"},[t._m(0),e("tbody",t._l(t.orders,(function(a){return e("tr",{key:a.id},[e("td",{staticClass:"align-middle"},[t._v(t._s(a.create_at))]),e("td",{staticClass:"d-flex flex-column"},t._l(a.products,(function(a,s){return e("span",{key:s},[t._v(t._s(a.product.title)+" 數量:"+t._s(a.product.num)+" "+t._s(a.product.unit))])})),0),e("td",{staticClass:"align-middle"},[t._v(t._s(a.payment_method))]),e("td",{staticClass:"align-middle"},[t._v(t._s(a.total))]),e("td",{staticClass:"align-middle"},[e("div",{staticClass:"custom-control custom-checkbox"},[e("input",{directives:[{name:"model",rawName:"v-model",value:a.is_paid,expression:"order.is_paid"}],staticClass:"custom-control-input",attrs:{type:"checkbox",id:a.id},domProps:{checked:Array.isArray(a.is_paid)?t._i(a.is_paid,null)>-1:a.is_paid},on:{change:[function(e){var s=a.is_paid,i=e.target,n=!!i.checked;if(Array.isArray(s)){var c=null,o=t._i(s,c);i.checked?o<0&&t.$set(a,"is_paid",s.concat([c])):o>-1&&t.$set(a,"is_paid",s.slice(0,o).concat(s.slice(o+1)))}else t.$set(a,"is_paid",n)},function(e){return t.changePaidStatus(a,a.id)}]}}),e("label",{staticClass:"custom-control-label",attrs:{for:a.id}},[a.is_paid?e("span",{staticClass:"text-success"},[t._v("Yes")]):e("span",{staticClass:"text-danger"},[t._v("No")])])])])])})),0)])])])]),e("Pagination",{attrs:{pages:t.pagination},on:{update:t.getOrders}})],1)},i=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("thead",[e("tr",[e("th",{attrs:{scope:"col"}},[t._v("下單時間")]),e("th",{attrs:{scope:"col"}},[t._v("購買品項")]),e("th",{attrs:{scope:"col"}},[t._v("付款方式")]),e("th",{attrs:{scope:"col"}},[t._v("應付金額")]),e("th",{attrs:{scope:"col"}},[t._v("是否付款")])])])}],n=e("5530"),c=(e("99af"),e("1799")),o={data:function(){return{isLoading:!1,orders:[],pagination:{}}},components:{Pagination:c["a"]},methods:{getOrders:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,a=this;a.isLoading=!0;var e="".concat("https://vue-course-api.hexschool.io","/api/").concat("vietnaminsidersaigon","/admin/orders?page=").concat(t);a.$http.get(e).then((function(t){a.isLoading=!1,a.orders=t.data.orders,a.pagination=t.data.pagination}))},changePaidStatus:function(t,a){var e=this,s=Object(n["a"])({},t),i="".concat("https://vue-course-api.hexschool.io","/api/").concat("vietnaminsidersaigon","/admin/order/").concat(a);e.isLoading=!0,e.$http.put(i,{data:s}).then((function(){e.isLoading=!1,e.getOrders()}))}},created:function(){this.getOrders()}},r=o,l=(e("4b00"),e("2877")),d=Object(l["a"])(r,s,i,!1,null,"fffd89a8",null);a["default"]=d.exports}}]);
//# sourceMappingURL=chunk-1f675a58.444d6239.js.map