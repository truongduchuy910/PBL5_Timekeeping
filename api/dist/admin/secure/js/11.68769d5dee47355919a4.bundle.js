(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{372:function(e,t,i){"use strict";var a=i(7),n=i(40),s=i(14),r=i(370),l=i.n(r),u=["label","path","type","access","isOrderable","isPrimaryKey","isRequired","isReadOnly","adminDoc","defaultValue"];t.a=function e(t,i,r){var c=this,h=i.readViews,o=i.preloadViews,d=i.getListByKey,p=t.label,f=t.path,b=t.type,y=t.access,O=t.isOrderable,w=t.isPrimaryKey,g=t.isRequired,j=t.isReadOnly,V=t.adminDoc,v=t.defaultValue,m=Object(a.a)(t,u);Object(n.a)(this,e),Object(s.a)(this,"getQueryFragment",(function(){return c.path})),Object(s.a)(this,"serialize",(function(e){return e[c.path]||null})),Object(s.a)(this,"validateInput",(function(){})),Object(s.a)(this,"deserialize",(function(e){return e[c.path]})),Object(s.a)(this,"hasChanged",(function(e,t){return!l()(e[c.path],t[c.path])})),Object(s.a)(this,"getDefaultValue",(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.originalInput,i=void 0===t?{}:t,a=e.prefill,n=void 0===a?{}:a;return c._getDefaultValue({originalInput:i,prefill:n})})),Object(s.a)(this,"initCellView",(function(){var e=c.views.Cell;e&&c.readViews([e])})),Object(s.a)(this,"initFieldView",(function(){var e=c.views.Field;e&&c.readViews([e])})),Object(s.a)(this,"initFilterView",(function(){var e=c.views.Filter;e&&c.readViews([e])})),Object(s.a)(this,"getFilterTypes",(function(){return[]})),Object(s.a)(this,"getFilterValue",(function(e){return e})),this.config=m,this.label=p,this.path=f,this.type=b,this.maybeAccess=y,this.isOrderable=O,this.isPrimaryKey=w,this.isRequired=g,this.isReadOnly=j,this.adminDoc=V,this.readViews=h,this.preloadViews=o,this.getListByKey=d,this.views=r,this._getDefaultValue="function"!=typeof v?function(e){return e.prefill[c.path]||v}:v}},543:function(e,t,i){"use strict";i.r(t);var a=i(14),n=i(372);i(170),i(250),i(370);class s extends n.a{constructor(...e){super(...e),Object(a.a)(this,"serialize",e=>{const{path:t}=this;return e&&e[t]?e[t]:null}),Object(a.a)(this,"getQueryFragment",()=>`\n    ${this.path} {\n       id\n       path\n       filename\n       originalFilename\n       mimetype\n       encoding\n       publicUrl\n    }\n  `),Object(a.a)(this,"getFilterTypes",()=>[])}}t.default=s}}]);