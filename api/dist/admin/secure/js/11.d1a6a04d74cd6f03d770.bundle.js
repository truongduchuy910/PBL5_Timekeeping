(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{372:function(e,t,i){"use strict";var a=i(7),l=i(40),s=i(14),r=i(371),n=i.n(r),u=["label","path","type","access","isOrderable","isPrimaryKey","isRequired","isReadOnly","adminDoc","defaultValue"];t.a=function e(t,i,r){var c=this,h=i.readViews,o=i.preloadViews,b=i.getListByKey,p=t.label,f=t.path,d=t.type,y=t.access,g=t.isOrderable,O=t.isPrimaryKey,V=t.isRequired,w=t.isReadOnly,j=t.adminDoc,v=t.defaultValue,I=Object(a.a)(t,u);Object(l.a)(this,e),Object(s.a)(this,"getQueryFragment",(function(){return c.path})),Object(s.a)(this,"serialize",(function(e){return e[c.path]||null})),Object(s.a)(this,"validateInput",(function(){})),Object(s.a)(this,"deserialize",(function(e){return e[c.path]})),Object(s.a)(this,"hasChanged",(function(e,t){return!n()(e[c.path],t[c.path])})),Object(s.a)(this,"getDefaultValue",(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.originalInput,i=void 0===t?{}:t,a=e.prefill,l=void 0===a?{}:a;return c._getDefaultValue({originalInput:i,prefill:l})})),Object(s.a)(this,"initCellView",(function(){var e=c.views.Cell;e&&c.readViews([e])})),Object(s.a)(this,"initFieldView",(function(){var e=c.views.Field;e&&c.readViews([e])})),Object(s.a)(this,"initFilterView",(function(){var e=c.views.Filter;e&&c.readViews([e])})),Object(s.a)(this,"getFilterTypes",(function(){return[]})),Object(s.a)(this,"getFilterValue",(function(e){return e})),this.config=I,this.label=p,this.path=f,this.type=d,this.maybeAccess=y,this.isOrderable=g,this.isPrimaryKey=O,this.isRequired=V,this.isReadOnly=w,this.adminDoc=j,this.readViews=h,this.preloadViews=o,this.getListByKey=b,this.views=r,this._getDefaultValue="function"!=typeof v?function(e){return e.prefill[c.path]||v}:v}},543:function(e,t,i){"use strict";i.r(t);var a=i(14),l=i(574),s=i(544),r=i(372);i(170),i(250),i(371);class n extends r.a{constructor(...e){super(...e),Object(a.a)(this,"getFilterGraphQL",({type:e,value:t})=>({["is"===e?""+this.path:`${this.path}_${e}`]:t})),Object(a.a)(this,"getFilterLabel",({label:e})=>`${this.label} ${e.toLowerCase()}`),Object(a.a)(this,"formatFilter",({label:e,value:t})=>{const i=this.config.format;let a=t;return i&&(a=Object(l.a)(Object(s.a)(t),i)),`${this.getFilterLabel({label:e})}: "${a}"`}),Object(a.a)(this,"serialize",e=>{let t=e[this.path];return"string"!=typeof t?null:t.trim()||null}),Object(a.a)(this,"getFilterTypes",()=>[{type:"is",label:"Is exactly",getInitialValue:()=>""},{type:"not",label:"Is not exactly",getInitialValue:()=>""},{type:"gt",label:"Is after",getInitialValue:()=>""},{type:"lt",label:"Is before",getInitialValue:()=>""},{type:"gte",label:"Is after or equal to",getInitialValue:()=>""},{type:"lte",label:"Is before or equal to",getInitialValue:()=>""}])}}t.default=n}}]);