(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{372:function(e,t,i){"use strict";var a=i(7),l=i(40),s=i(14),n=i(371),r=i.n(n),u=["label","path","type","access","isOrderable","isPrimaryKey","isRequired","isReadOnly","adminDoc","defaultValue"];t.a=function e(t,i,n){var c=this,h=i.readViews,o=i.preloadViews,p=i.getListByKey,b=t.label,y=t.path,d=t.type,g=t.access,f=t.isOrderable,O=t.isPrimaryKey,V=t.isRequired,I=t.isReadOnly,w=t.adminDoc,j=t.defaultValue,v=Object(a.a)(t,u);Object(l.a)(this,e),Object(s.a)(this,"getQueryFragment",(function(){return c.path})),Object(s.a)(this,"serialize",(function(e){return e[c.path]||null})),Object(s.a)(this,"validateInput",(function(){})),Object(s.a)(this,"deserialize",(function(e){return e[c.path]})),Object(s.a)(this,"hasChanged",(function(e,t){return!r()(e[c.path],t[c.path])})),Object(s.a)(this,"getDefaultValue",(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.originalInput,i=void 0===t?{}:t,a=e.prefill,l=void 0===a?{}:a;return c._getDefaultValue({originalInput:i,prefill:l})})),Object(s.a)(this,"initCellView",(function(){var e=c.views.Cell;e&&c.readViews([e])})),Object(s.a)(this,"initFieldView",(function(){var e=c.views.Field;e&&c.readViews([e])})),Object(s.a)(this,"initFilterView",(function(){var e=c.views.Filter;e&&c.readViews([e])})),Object(s.a)(this,"getFilterTypes",(function(){return[]})),Object(s.a)(this,"getFilterValue",(function(e){return e})),this.config=v,this.label=b,this.path=y,this.type=d,this.maybeAccess=g,this.isOrderable=f,this.isPrimaryKey=O,this.isRequired=V,this.isReadOnly=I,this.adminDoc=w,this.readViews=h,this.preloadViews=o,this.getListByKey=p,this.views=n,this._getDefaultValue="function"!=typeof j?function(e){return e.prefill[c.path]||j}:j}},549:function(e,t,i){"use strict";i.r(t);var a=i(14),l=i(372);i(170),i(250),i(371);class s extends l.a{constructor(...e){super(...e),Object(a.a)(this,"getFilterGraphQL",({path:e,type:t,value:i})=>{const a="is"===t?e:`${e}_${t}`;let l=i.replace(/\s/g,"");return l=["in","not_in"].includes(t)?l.split(",").map(e=>parseInt(e)):parseInt(l),{[a]:l}}),Object(a.a)(this,"getFilterLabel",({label:e,type:t})=>{const i=["in","not_in"].includes(t)?" (comma separated)":"";return`${this.label} ${e.toLowerCase()}${i}`}),Object(a.a)(this,"formatFilter",({label:e,type:t,value:i})=>`${this.getFilterLabel({label:e,type:t})}: "${i.replace(/\s/g,"")}"`),Object(a.a)(this,"serialize",e=>{const t=e[this.path];return"number"==typeof t?t:"string"==typeof t&&t.length>0?parseInt(t,10):null}),Object(a.a)(this,"getFilterTypes",()=>[{type:"is",label:"Is exactly",getInitialValue:()=>""},{type:"not",label:"Is not exactly",getInitialValue:()=>""},{type:"gt",label:"Is greater than",getInitialValue:()=>""},{type:"lt",label:"Is less than",getInitialValue:()=>""},{type:"gte",label:"Is greater than or equal to",getInitialValue:()=>""},{type:"lte",label:"Is less than or equal to",getInitialValue:()=>""},{type:"in",label:"Is one of",getInitialValue:()=>""},{type:"not_in",label:"Is not one of",getInitialValue:()=>""}])}}t.default=s}}]);