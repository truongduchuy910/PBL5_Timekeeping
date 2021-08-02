(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{571:function(e,t,a){"use strict";a.r(t);var s=a(5),i=a(1),l=a(0),r=a(92),n=a(357),c=a(88),o=a(9),u=a(2),d=a(8),b=a(71),f=a(4),m=a(7),g=a(122),j=a(11),h=(a(374),a(198));const p=["children"];const O=e=>function({value:t,label:a}){return t[e.file]?Object(i.jsx)("img",{src:t[e.file].publicUrl,style:{maxHeight:100,maxWidth:200}}):Object(i.jsx)("small",null,t[e.search]?t[e.search]:a)},y=(e=[],t)=>e.find(e=>e.value.id===t.id)||{label:t._label_,value:t},v=Object(l.forwardRef)(({data:e,loading:t,value:a,currentValue:n,refList:c,canRead:o,isMulti:u,search:d,autoFocus:b,serverErrors:h,onChange:v,htmlID:x,setSearch:$,selectProps:_,fetchMore:N,isDisabled:D,options:k,config:C},M)=>{const R=h&&h.find(e=>e instanceof Error&&"AccessDeniedError"===e.name);null!==a&&o&&(u?n=(Array.isArray(a)?a:[]).map(e=>y(k,e)):a&&(n=y(k,a)));const q=e&&e[c.gqlNames.listQueryMetaName]?e[c.gqlNames.listQueryMetaName].count:0,I=Object(l.useMemo)(()=>({MenuList:e=>{let{children:t}=e,a=Object(m.a)(e,p);const n=Object(l.useRef)(null),o=r.a`
            query RelationshipSelectMore($search: String!, $first: Int!, $skip: Int!) {
              ${c.gqlNames.listQueryName}(where: { ${C.search}_contains_i: $search }, first: $first, skip: $skip) {
                _label_
                id
                ${C.file} {
                  publicUrl
                }
              }
            }
          `;return function(e,t){Object(l.useEffect)(()=>{let a=new IntersectionObserver(e,{}),s=t.current;if(null!==s)return a.observe(s),()=>a.unobserve(s)})}(([{isIntersecting:e}])=>{!a.isLoading&&e&&a.options.length<q&&N({query:o,variables:{search:d,first:50,skip:a.options.length},updateQuery:(e,{fetchMoreResult:t})=>t?Object(s.a)(Object(s.a)({},e),{},{[c.gqlNames.listQueryName]:[...e[c.gqlNames.listQueryName],...t[c.gqlNames.listQueryName]]}):e})},n),Object(i.jsx)(j.f.MenuList,a,t,Object(i.jsx)("div",{css:{textAlign:"center"},ref:n},a.options.length<q&&Object(i.jsx)("span",{css:{padding:8}},"Loading...")))}}),[q,c.gqlNames.listQueryName]);return Object(i.jsx)(g.a,Object(f.a)({onInputChange:e=>$(e),isLoading:t,autoFocus:b,isMulti:u,components:I,formatOptionLabel:O(C),getOptionValue:e=>e.value.id,value:n,placeholder:o?void 0:R&&R.message,options:k,onChange:v,id:"react-select-"+x,isClearable:!0,instanceId:x,inputId:x,innerRef:M,menuPortalTarget:document.body,isDisabled:D,styles:{padding:0}},_))}),x=({innerRef:e,autoFocus:t,field:a,errors:s,renderContext:c,htmlID:o,onChange:u,isMulti:d,value:b,isDisabled:f})=>{const[m,g]=Object(l.useState)(""),j=a.getRefList(),{config:h}=a,p=r.a`
    query RelationshipSelect($search: String!, $ids:[ID] $first: Int!, $skip: Int!) {
      ${j.gqlNames.listQueryName}(
        where: { 
          id_in: $ids 
        }, first: $first, skip: $skip) {
        _label_
        id
        ${h.file} {
          publicUrl
        }
      }
      search:${j.gqlNames.listQueryName}(
        where: { 
          ${h.search}_contains_i: $search
        }, first: $first, skip: $skip) {
        _label_
        id
        ${h.file} {
          publicUrl
        }
      }

      ${j.gqlNames.listQueryMetaName}(where: { 
        id_in: $ids 
      }) {
        count
      }
    }
  `,O=!s||s.every(e=>!(e instanceof Error&&"AccessDeniedError"===e.name)),x="dialog"===c?{menuShouldBlockScroll:!0}:null,$=(Array.isArray(b)?b:[b]).map(e=>e.id),{data:_,error:N,loading:D,fetchMore:k}=Object(n.a)(p,{fetchPolicy:"network-only",variables:{search:m,first:10,skip:0,ids:$}});if(N)return console.log("ERROR!!!",N),"Error";var C=_&&_[j.gqlNames.listQueryName]?_[j.gqlNames.listQueryName].map(e=>({value:e,label:e._label_})):[];_&&_.search&&(C=C.concat(_.search.map(e=>({value:e,label:e._label_}))));var M=null;return null!==b&&O&&(d?M=(Array.isArray(b)?b:[]).map(e=>y(C,e)):b&&(M=y(C,b))),Object(i.jsx)(v,{data:_,loading:D,value:b,currentValue:M,refList:j,canRead:O,isMulti:d,search:m,autoFocus:t,serverErrors:s,onChange:u,htmlID:o,setSearch:g,selectProps:x,fetchMore:k,ref:e,isDisabled:f,options:C,config:h})};function $({listKey:e,value:t,onAddUser:a,many:s,isDisabled:l}){const c="authenticated"+e,{data:f}=Object(n.a)(r.a`
    query User {
      ${c} {
        _label_
        id
      }
    }
  `);if(f&&f[c]){const e=f[c].id;if(null!==t&&(s?t.some(t=>t.id===e):t.id===e))return null;const r=`${s?"Add":"Set as"} ${f[c]._label_}`;return Object(i.jsx)(b.a,{placement:"top",content:r},e=>Object(i.jsx)(d.b,{css:{marginLeft:u.d},variant:"ghost",ref:e,onClick:()=>{a(f[c])},icon:o.o,"aria-label":r,isDisabled:l}))}return null}function _({field:e,value:t}){const{many:a}=e.config,{fullPath:s}=e.getRefList();let l,r=!1,n=s;return a?(l="View List of Related Items",t.length||(r=!0),n=`${n}?!id_in="${t.slice(0,100).map(({id:e})=>e).join(",")}"`):(l="View Item Details",t?n=`${n}/${t.id}`:r=!0),Object(i.jsx)(b.a,{placement:"top",content:l},e=>Object(i.jsx)(d.b,{ref:e,icon:o.l,"aria-label":l,variant:"ghost",css:{marginLeft:u.d},target:"_blank",to:n,isDisabled:r}))}function N({field:e,item:t,onCreate:a,isDisabled:r}){const{list:n,openCreateItemModal:c}=Object(h.f)();let f,m=e.getRefList(),g="Create and add "+m.singular;return t&&t.id&&(f=m.fields.filter(t=>"Relationship"===t.type&&t.config.ref===n.key&&t.config.refFieldPath===e.path).reduce((e,a)=>{const i={_label_:t._label_||"<link to parent>",id:t.id};return Object(s.a)(Object(s.a)({},e),{},{[a.path]:a.config.many?[i]:i})},{})),Object(i.jsx)(l.Fragment,null,Object(i.jsx)(b.a,{placement:"top",content:g},e=>Object(i.jsx)(d.b,{ref:e,onClick:c,icon:o.p,"aria-label":g,variant:"ghost",css:{marginLeft:u.d},isDisabled:r})),Object(i.jsx)(h.b,{prefillData:f,onCreate:({data:e})=>{a(e[m.gqlNames.createMutationName])}}))}t.default=({autoFocus:e,field:t,value:a=[],renderContext:s,errors:l,onChange:r,item:n,list:o,isDisabled:u})=>{const{many:d,ref:b}=t.config,{authStrategy:f}=Object(h.e)(),m="ks-input-"+t.path,g=t.getRefList();return Object(i.jsx)(c.a,null,Object(i.jsx)(c.d,{htmlFor:m,field:t,errors:l}),Object(i.jsx)(c.b,{text:t.adminDoc}),Object(i.jsx)(c.c,null,Object(i.jsx)("div",{css:{flex:1}},Object(i.jsx)(x,{autoFocus:e,isMulti:d,field:t,value:a,errors:l,renderContext:s,htmlID:m,onChange:e=>{const{many:a}=t.config;r(a?e?e.map(e=>e.value):[]:e?e.value:null)},isDisabled:u})),Object(i.jsx)(h.c,{list:g},Object(i.jsx)(N,{onCreate:e=>{r(d?a.concat(e):e)},field:t,item:n,list:o,isDisabled:u})),f&&b===f.listKey&&Object(i.jsx)($,{many:d,onAddUser:e=>{r(d?a.concat(e):e)},value:a,listKey:f.listKey,isDisabled:u}),Object(i.jsx)(_,{field:t,value:a})))}}}]);