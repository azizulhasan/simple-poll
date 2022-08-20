(()=>{var e={184:(e,t)=>{var s;!function(){"use strict";var r={}.hasOwnProperty;function a(){for(var e=[],t=0;t<arguments.length;t++){var s=arguments[t];if(s){var l=typeof s;if("string"===l||"number"===l)e.push(s);else if(Array.isArray(s)){if(s.length){var o=a.apply(null,s);o&&e.push(o)}}else if("object"===l)if(s.toString===Object.prototype.toString)for(var n in s)r.call(s,n)&&s[n]&&e.push(n);else e.push(s.toString())}}return e.join(" ")}e.exports?(a.default=a,e.exports=a):void 0===(s=function(){return a}.apply(t,[]))||(e.exports=s)}()},703:(e,t,s)=>{"use strict";var r=s(414);function a(){}function l(){}l.resetWarningCache=a,e.exports=function(){function e(e,t,s,a,l,o){if(o!==r){var n=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw n.name="Invariant Violation",n}}function t(){return e}e.isRequired=e;var s={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:l,resetWarningCache:a};return s.PropTypes=s,s}},697:(e,t,s)=>{e.exports=s(703)()},414:e=>{"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},251:(e,t,s)=>{"use strict";var r=s(196),a=Symbol.for("react.element"),l=Symbol.for("react.fragment"),o=Object.prototype.hasOwnProperty,n=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,i={key:!0,ref:!0,__self:!0,__source:!0};function c(e,t,s){var r,l={},c=null,p=null;for(r in void 0!==s&&(c=""+s),void 0!==t.key&&(c=""+t.key),void 0!==t.ref&&(p=t.ref),t)o.call(t,r)&&!i.hasOwnProperty(r)&&(l[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps)void 0===l[r]&&(l[r]=t[r]);return{$$typeof:a,type:e,key:c,ref:p,props:l,_owner:n.current}}t.Fragment=l,t.jsx=c,t.jsxs=c},893:(e,t,s)=>{"use strict";e.exports=s(251)},473:e=>{"use strict";e.exports=function(){}},196:e=>{"use strict";e.exports=window.React}},t={};function s(r){var a=t[r];if(void 0!==a)return a.exports;var l=t[r]={exports:{}};return e[r](l,l.exports,s),l.exports}s.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return s.d(t,{a:t}),t},s.d=(e,t)=>{for(var r in t)s.o(t,r)&&!s.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";const e=window.wp.element;var t=s(196);const r=window.wp.i18n;var a=s(184),l=s.n(a),o=s(697),n=s.n(o),i=s(893);const c={type:n().string,tooltip:n().bool,as:n().elementType},p=t.forwardRef((({as:e="div",className:t,type:s="valid",tooltip:r=!1,...a},o)=>(0,i.jsx)(e,{...a,ref:o,className:l()(t,`${s}-${r?"tooltip":"feedback"}`)})));p.displayName="Feedback",p.propTypes=c;const d=p,u=t.createContext({}),m=t.createContext({prefixes:{},breakpoints:["xxl","xl","lg","md","sm","xs"]}),{Consumer:f,Provider:y}=m;function b(e,s){const{prefixes:r}=(0,t.useContext)(m);return e||r[s]||s}const x=t.forwardRef((({id:e,bsPrefix:s,className:r,type:a="checkbox",isValid:o=!1,isInvalid:n=!1,as:c="input",...p},d)=>{const{controlId:m}=(0,t.useContext)(u);return s=b(s,"form-check-input"),(0,i.jsx)(c,{...p,ref:d,type:a,id:e||m,className:l()(r,s,o&&"is-valid",n&&"is-invalid")})}));x.displayName="FormCheckInput";const h=x,v=t.forwardRef((({bsPrefix:e,className:s,htmlFor:r,...a},o)=>{const{controlId:n}=(0,t.useContext)(u);return e=b(e,"form-check-label"),(0,i.jsx)("label",{...a,ref:o,htmlFor:r||n,className:l()(s,e)})}));v.displayName="FormCheckLabel";const w=v,g=t.forwardRef((({id:e,bsPrefix:s,bsSwitchPrefix:r,inline:a=!1,disabled:o=!1,isValid:n=!1,isInvalid:c=!1,feedbackTooltip:p=!1,feedback:m,feedbackType:f,className:y,style:x,title:v="",type:g="checkbox",label:N,children:_,as:C="input",...j},E)=>{s=b(s,"form-check"),r=b(r,"form-switch");const{controlId:P}=(0,t.useContext)(u),k=(0,t.useMemo)((()=>({controlId:e||P})),[P,e]),S=!_&&null!=N&&!1!==N||function(e,s){return t.Children.toArray(e).some((e=>t.isValidElement(e)&&e.type===s))}(_,w),I=(0,i.jsx)(h,{...j,type:"switch"===g?"checkbox":g,ref:E,isValid:n,isInvalid:c,disabled:o,as:C});return(0,i.jsx)(u.Provider,{value:k,children:(0,i.jsx)("div",{style:x,className:l()(y,S&&s,a&&`${s}-inline`,"switch"===g&&r),children:_||(0,i.jsxs)(i.Fragment,{children:[I,S&&(0,i.jsx)(w,{title:v,children:N}),m&&(0,i.jsx)(d,{type:f,tooltip:p,children:m})]})})})}));g.displayName="FormCheck";const N=Object.assign(g,{Input:h,Label:w});s(473);const _=t.forwardRef((({bsPrefix:e,type:s,size:r,htmlSize:a,id:o,className:n,isValid:c=!1,isInvalid:p=!1,plaintext:d,readOnly:m,as:f="input",...y},x)=>{const{controlId:h}=(0,t.useContext)(u);let v;return e=b(e,"form-control"),v=d?{[`${e}-plaintext`]:!0}:{[e]:!0,[`${e}-${r}`]:r},(0,i.jsx)(f,{...y,type:s,size:a,ref:x,readOnly:m,id:o||h,className:l()(n,v,c&&"is-valid",p&&"is-invalid","color"===s&&`${e}-color`)})}));_.displayName="FormControl";const C=Object.assign(_,{Feedback:d});var j=/-(.)/g;const E=e=>{return e[0].toUpperCase()+(t=e,t.replace(j,(function(e,t){return t.toUpperCase()}))).slice(1);var t},P=function(e,{displayName:s=E(e),Component:r,defaultProps:a}={}){const o=t.forwardRef((({className:t,bsPrefix:s,as:a=r||"div",...o},n)=>{const c=b(s,e);return(0,i.jsx)(a,{ref:n,className:l()(t,c),...o})}));return o.defaultProps=a,o.displayName=s,o}("form-floating"),k=t.forwardRef((({controlId:e,as:s="div",...r},a)=>{const l=(0,t.useMemo)((()=>({controlId:e})),[e]);return(0,i.jsx)(u.Provider,{value:l,children:(0,i.jsx)(s,{...r,ref:a})})}));k.displayName="FormGroup";const S=k;const I=t.forwardRef(((e,s)=>{const[{className:r,...a},{as:o="div",bsPrefix:n,spans:c}]=function({as:e,bsPrefix:s,className:r,...a}){s=b(s,"col");const o=function(){const{breakpoints:e}=(0,t.useContext)(m);return e}(),n=[],i=[];return o.forEach((e=>{const t=a[e];let r,l,o;delete a[e],"object"==typeof t&&null!=t?({span:r,offset:l,order:o}=t):r=t;const c="xs"!==e?`-${e}`:"";r&&n.push(!0===r?`${s}${c}`:`${s}${c}-${r}`),null!=o&&i.push(`order${c}-${o}`),null!=l&&i.push(`offset${c}-${l}`)})),[{...a,className:l()(r,...n,...i)},{as:e,bsPrefix:s,spans:n}]}(e);return(0,i.jsx)(o,{...a,ref:s,className:l()(r,!c.length&&n)})}));I.displayName="Col";const O=I,R=t.forwardRef((({as:e="label",bsPrefix:s,column:r,visuallyHidden:a,className:o,htmlFor:n,...c},p)=>{const{controlId:d}=(0,t.useContext)(u);s=b(s,"form-label");let m="col-form-label";"string"==typeof r&&(m=`${m} ${m}-${r}`);const f=l()(o,s,a&&"visually-hidden",r&&m);return n=n||d,r?(0,i.jsx)(O,{ref:p,as:"label",className:f,htmlFor:n,...c}):(0,i.jsx)(e,{ref:p,className:f,htmlFor:n,...c})}));R.displayName="FormLabel",R.defaultProps={column:!1,visuallyHidden:!1};const F=R,T=t.forwardRef((({bsPrefix:e,className:s,id:r,...a},o)=>{const{controlId:n}=(0,t.useContext)(u);return e=b(e,"form-range"),(0,i.jsx)("input",{...a,type:"range",ref:o,className:l()(s,e),id:r||n})}));T.displayName="FormRange";const $=T,L=t.forwardRef((({bsPrefix:e,size:s,htmlSize:r,className:a,isValid:o=!1,isInvalid:n=!1,id:c,...p},d)=>{const{controlId:m}=(0,t.useContext)(u);return e=b(e,"form-select"),(0,i.jsx)("select",{...p,size:r,ref:d,className:l()(a,e,s&&`${e}-${s}`,o&&"is-valid",n&&"is-invalid"),id:c||m})}));L.displayName="FormSelect";const A=L,q=t.forwardRef((({bsPrefix:e,className:t,as:s="small",muted:r,...a},o)=>(e=b(e,"form-text"),(0,i.jsx)(s,{...a,ref:o,className:l()(t,e,r&&"text-muted")}))));q.displayName="FormText";const V=q,G=t.forwardRef(((e,t)=>(0,i.jsx)(N,{...e,ref:t,type:"switch"})));G.displayName="Switch";const z=Object.assign(G,{Input:N.Input,Label:N.Label}),D=t.forwardRef((({bsPrefix:e,className:t,children:s,controlId:r,label:a,...o},n)=>(e=b(e,"form-floating"),(0,i.jsxs)(S,{ref:n,className:l()(t,e),controlId:r,...o,children:[s,(0,i.jsx)("label",{htmlFor:r,children:a})]}))));D.displayName="FloatingLabel";const U=D,H={_ref:n().any,validated:n().bool,as:n().elementType},W=t.forwardRef((({className:e,validated:t,as:s="form",...r},a)=>(0,i.jsx)(s,{...r,ref:a,className:l()(e,t&&"was-validated")})));W.displayName="Form",W.propTypes=H;const B=Object.assign(W,{Group:S,Control:C,Floating:P,Check:N,Switch:z,Label:F,Text:V,Range:$,Select:A,FloatingLabel:U}),{InspectorControls:M}=wp.blockEditor,{PanelBody:Y}=wp.components;wp.blocks.registerBlockType("pvs/poll",{title:(0,r.__)("Poll System"),description:(0,r.__)("This is simple poll discription."),icon:"chart-bar",category:"design",keywords:["poll","vote","epoll","booth","wpolls","polls"],example:{},attributes:{panelCSS:{type:"object",default:{item:{paddingTop:"20px"}}},question:{type:"string",default:"How is my site?"},answers:{type:"array",default:["Good","Well","Excellent"]},id:{type:"string"},polls:{type:"array",default:[]},customclass:{type:"string",default:""},customcss:{type:"string",default:""}},edit:function(s){return(0,t.useEffect)((()=>{let e=new FormData;e.append("nonce",pvs.nonce),e.append("action","get_polls"),async function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const s=await fetch(e,{headers:{},credentials:"same-origin",method:"POST",body:t});return await s.json()}(pvs_block.ajax_url,e).then((e=>{e.data&&s.setAttributes({polls:e.data})}))}),[]),[(0,e.createElement)(M,null,(0,e.createElement)(Y,null,(0,e.createElement)(B,null,(0,e.createElement)(B.Group,{style:s.attributes.panelCSS.item},(0,e.createElement)(B.Label,null,(0,r.__)("All Polls")),(0,e.createElement)(B.Select,{style:{width:"100%"},defaultValue:s.attributes.question,onChange:e=>{let t=s.attributes.polls.filter((t=>t.id===e.target.value));s.setAttributes({question:t[0].question});let r=[];t[0].answers.map((e=>{r.push(e.pvs_answers)})),s.setAttributes({id:e.target.value}),s.setAttributes({answers:r})},"aria-label":"Default select example"},(0,e.createElement)("option",{disabled:!0},"Select question"),s.attributes.polls.length&&s.attributes.polls.map((t=>(0,e.createElement)("option",{value:t.id}," ",t.question," "))))),(0,e.createElement)(B.Group,{style:s.attributes.panelCSS.item},(0,e.createElement)(B.Label,null,(0,r.__)("Add Custom Class")),(0,e.createElement)(B.Control,{style:{width:"100%"},as:"textarea",rows:"2",placeholder:"space separated",name:"address",value:s.attributes.customclass,onChange:e=>{s.setAttributes({customclass:e.target.value})}})),(0,e.createElement)(B.Group,{style:s.attributes.panelCSS.item},(0,e.createElement)(B.Label,null,(0,r.__)("Add Custom CSS")),(0,e.createElement)(B.Control,{style:{width:"100%"},as:"textarea",rows:"3",placeholder:"selector .poll_system_block",name:"address",value:s.attributes.customcss,onChange:e=>{s.setAttributes({customcss:e.target.value})}}))))),(0,e.createElement)("style",{dangerouslySetInnerHTML:{__html:s.attributes.customcss}}),(0,e.createElement)("div",{className:"poll_system_block "+s.attributes.customclass},(0,e.createElement)(B,{id:"poll_form"},(0,e.createElement)(B.Group,{className:"",controlId:"poll.question"},(0,e.createElement)("div",null,(0,e.createElement)(B.Label,null,(0,r.__)("Add Question"))),(0,e.createElement)("div",{className:"poll_question"},(0,e.createElement)(B.Control,{type:"text",name:"question",style:{width:"100%"},onChange:e=>{s.setAttributes({question:e.target.value}),s.setAttributes({answers:["Yes","No"]})},value:s.attributes.question,placeholder:"question"})),(0,e.createElement)("div",{className:"poll_answers"},s.attributes.answers.length&&s.attributes.answers.map((t=>(0,e.createElement)(B.Check,{inline:!0,type:"radio",id:`${t}`,label:t,value:t})))))))]},save:function(e){return null}})})()})();