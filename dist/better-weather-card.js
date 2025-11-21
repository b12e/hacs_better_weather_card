function t(t,e,i,o){var s,n=arguments.length,r=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(r=(n<3?s(r):n>3?s(e,i,r):s(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),s=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=s.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1],t[0]);return new n(i,t,o)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,o))(e)})(t):t,{is:c,defineProperty:l,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,f=globalThis,g=f.trustedTypes,y=g?g.emptyScript:"",m=f.reactiveElementPolyfillSupport,_=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?y:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},$=(t,e)=>!c(t,e),b={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:$};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(t,i,e);void 0!==o&&l(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){const{get:o,set:s}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:o,set(e){const n=o?.call(this);s?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,o)=>{if(i)t.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of o){const o=document.createElement("style"),s=e.litNonce;void 0!==s&&o.setAttribute("nonce",s),o.textContent=i.cssText,t.appendChild(o)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,i);if(void 0!==o&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(e,i.type);this._$Em=t,null==s?this.removeAttribute(o):this.setAttribute(o,s),this._$Em=null}}_$AK(t,e){const i=this.constructor,o=i._$Eh.get(t);if(void 0!==o&&this._$Em!==o){const t=i.getPropertyOptions(o),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=o;const n=s.fromAttribute(e,t.type);this[o]=n??this._$Ej?.get(o)??n,this._$Em=null}}requestUpdate(t,e,i){if(void 0!==t){const o=this.constructor,s=this[t];if(i??=o.getPropertyOptions(t),!((i.hasChanged??$)(s,e)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:o,wrapped:s},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==s||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===o&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,o=this[e];!0!==t||this._$AL.has(e)||void 0===o||this.C(e,void 0,i,o)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[_("elementProperties")]=new Map,w[_("finalized")]=new Map,m?.({ReactiveElement:w}),(f.reactiveElementVersions??=[]).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,A=x.trustedTypes,E=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,k="?"+S,P=`<${k}>`,U=document,T=()=>U.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,D=Array.isArray,N="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,M=/-->/g,R=/>/g,z=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),W=/'/g,j=/"/g,L=/^(?:script|style|textarea|title)$/i,I=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),V=Symbol.for("lit-noChange"),B=Symbol.for("lit-nothing"),F=new WeakMap,q=U.createTreeWalker(U,129);function J(t,e){if(!D(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const K=(t,e)=>{const i=t.length-1,o=[];let s,n=2===e?"<svg>":3===e?"<math>":"",r=H;for(let e=0;e<i;e++){const i=t[e];let a,c,l=-1,h=0;for(;h<i.length&&(r.lastIndex=h,c=r.exec(i),null!==c);)h=r.lastIndex,r===H?"!--"===c[1]?r=M:void 0!==c[1]?r=R:void 0!==c[2]?(L.test(c[2])&&(s=RegExp("</"+c[2],"g")),r=z):void 0!==c[3]&&(r=z):r===z?">"===c[0]?(r=s??H,l=-1):void 0===c[1]?l=-2:(l=r.lastIndex-c[2].length,a=c[1],r=void 0===c[3]?z:'"'===c[3]?j:W):r===j||r===W?r=z:r===M||r===R?r=H:(r=z,s=void 0);const d=r===z&&t[e+1].startsWith("/>")?" ":"";n+=r===H?i+P:l>=0?(o.push(a),i.slice(0,l)+C+i.slice(l)+S+d):i+S+(-2===l?e:d)}return[J(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),o]};class Z{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let s=0,n=0;const r=t.length-1,a=this.parts,[c,l]=K(t,e);if(this.el=Z.createElement(c,i),q.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(o=q.nextNode())&&a.length<r;){if(1===o.nodeType){if(o.hasAttributes())for(const t of o.getAttributeNames())if(t.endsWith(C)){const e=l[n++],i=o.getAttribute(t).split(S),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:s,name:r[2],strings:i,ctor:"."===r[1]?tt:"?"===r[1]?et:"@"===r[1]?it:Y}),o.removeAttribute(t)}else t.startsWith(S)&&(a.push({type:6,index:s}),o.removeAttribute(t));if(L.test(o.tagName)){const t=o.textContent.split(S),e=t.length-1;if(e>0){o.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],T()),q.nextNode(),a.push({type:2,index:++s});o.append(t[e],T())}}}else if(8===o.nodeType)if(o.data===k)a.push({type:2,index:s});else{let t=-1;for(;-1!==(t=o.data.indexOf(S,t+1));)a.push({type:7,index:s}),t+=S.length-1}s++}}static createElement(t,e){const i=U.createElement("template");return i.innerHTML=t,i}}function G(t,e,i=t,o){if(e===V)return e;let s=void 0!==o?i._$Co?.[o]:i._$Cl;const n=O(e)?void 0:e._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),void 0===n?s=void 0:(s=new n(t),s._$AT(t,i,o)),void 0!==o?(i._$Co??=[])[o]=s:i._$Cl=s),void 0!==s&&(e=G(t,s._$AS(t,e.values),s,o)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,o=(t?.creationScope??U).importNode(e,!0);q.currentNode=o;let s=q.nextNode(),n=0,r=0,a=i[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new X(s,s.nextSibling,this,t):1===a.type?e=new a.ctor(s,a.name,a.strings,this,t):6===a.type&&(e=new ot(s,this,t)),this._$AV.push(e),a=i[++r]}n!==a?.index&&(s=q.nextNode(),n++)}return q.currentNode=U,o}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,o){this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=G(this,t,e),O(t)?t===B||null==t||""===t?(this._$AH!==B&&this._$AR(),this._$AH=B):t!==this._$AH&&t!==V&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>D(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==B&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(U.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,o="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Z.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(e);else{const t=new Q(o,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=F.get(t.strings);return void 0===e&&F.set(t.strings,e=new Z(t)),e}k(t){D(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const s of t)o===e.length?e.push(i=new X(this.O(T()),this.O(T()),this,this.options)):i=e[o],i._$AI(s),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Y{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,o,s){this.type=1,this._$AH=B,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=B}_$AI(t,e=this,i,o){const s=this.strings;let n=!1;if(void 0===s)t=G(this,t,e,0),n=!O(t)||t!==this._$AH&&t!==V,n&&(this._$AH=t);else{const o=t;let r,a;for(t=s[0],r=0;r<s.length-1;r++)a=G(this,o[i+r],e,r),a===V&&(a=this._$AH[r]),n||=!O(a)||a!==this._$AH[r],a===B?t=B:t!==B&&(t+=(a??"")+s[r+1]),this._$AH[r]=a}n&&!o&&this.j(t)}j(t){t===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends Y{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===B?void 0:t}}class et extends Y{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==B)}}class it extends Y{constructor(t,e,i,o,s){super(t,e,i,o,s),this.type=5}_$AI(t,e=this){if((t=G(this,t,e,0)??B)===V)return;const i=this._$AH,o=t===B&&i!==B||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==B&&(i===B||o);o&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){G(this,t)}}const st=x.litHtmlPolyfillSupport;st?.(Z,X),(x.litHtmlVersions??=[]).push("3.3.1");const nt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class rt extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const o=i?.renderBefore??e;let s=o._$litPart$;if(void 0===s){const t=i?.renderBefore??null;o._$litPart$=s=new X(e.insertBefore(T(),t),t,void 0,i??{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}}rt._$litElement$=!0,rt.finalized=!0,nt.litElementHydrateSupport?.({LitElement:rt});const at=nt.litElementPolyfillSupport;at?.({LitElement:rt}),(nt.litElementVersions??=[]).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ct=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},lt={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:$},ht=(t=lt,e,i)=>{const{kind:o,metadata:s}=i;let n=globalThis.litPropertyMetadata.get(s);if(void 0===n&&globalThis.litPropertyMetadata.set(s,n=new Map),"setter"===o&&((t=Object.create(t)).wrapped=!0),n.set(i.name,t),"accessor"===o){const{name:o}=i;return{set(i){const s=e.get.call(this);e.set.call(this,i),this.requestUpdate(o,s,t)},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===o){const{name:o}=i;return function(i){const s=this[o];e.call(this,i),this.requestUpdate(o,s,t)}}throw Error("Unsupported decorator location: "+o)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function dt(t){return(e,i)=>"object"==typeof i?ht(t,e,i):((t,e,i)=>{const o=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),o?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function pt(t){return dt({...t,state:!0,attribute:!1})}var ut,ft;!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(ut||(ut={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(ft||(ft={}));var gt=["closed","locked","off"],yt=function(t,e,i,o){o=o||{},i=null==i?{}:i;var s=new Event(e,{bubbles:void 0===o.bubbles||o.bubbles,cancelable:Boolean(o.cancelable),composed:void 0===o.composed||o.composed});return s.detail=i,t.dispatchEvent(s),s},mt=function(t){yt(window,"haptic",t)},_t=function(t,e,i,o){if(o||(o={action:"more-info"}),!o.confirmation||o.confirmation.exemptions&&o.confirmation.exemptions.some(function(t){return t.user===e.user.id})||(mt("warning"),confirm(o.confirmation.text||"Are you sure you want to "+o.action+"?")))switch(o.action){case"more-info":(i.entity||i.camera_image)&&yt(t,"hass-more-info",{entityId:i.entity?i.entity:i.camera_image});break;case"navigate":o.navigation_path&&function(t,e,i){void 0===i&&(i=!1),i?history.replaceState(null,"",e):history.pushState(null,"",e),yt(window,"location-changed",{replace:i})}(0,o.navigation_path);break;case"url":o.url_path&&window.open(o.url_path);break;case"toggle":i.entity&&(function(t,e){(function(t,e,i){void 0===i&&(i=!0);var o,s=function(t){return t.substr(0,t.indexOf("."))}(e),n="group"===s?"homeassistant":s;switch(s){case"lock":o=i?"unlock":"lock";break;case"cover":o=i?"open_cover":"close_cover";break;default:o=i?"turn_on":"turn_off"}t.callService(n,o,{entity_id:e})})(t,e,gt.includes(t.states[e].state))}(e,i.entity),mt("success"));break;case"call-service":if(!o.service)return void mt("failure");var s=o.service.split(".",2);e.callService(s[0],s[1],o.service_data,o.target),mt("success");break;case"fire-dom-event":yt(t,"ll-custom",o)}},vt=function(t,e,i,o){var s;"double_tap"===o&&i.double_tap_action?s=i.double_tap_action:"hold"===o&&i.hold_action?s=i.hold_action:"tap"===o&&i.tap_action&&(s=i.tap_action),_t(t,e,i,s)};function $t(t){return void 0!==t&&"none"!==t.action}const bt={"clear-night":"mdi:weather-night",cloudy:"mdi:weather-cloudy",exceptional:"mdi:alert-circle-outline",fog:"mdi:weather-fog",hail:"mdi:weather-hail",lightning:"mdi:weather-lightning","lightning-rainy":"mdi:weather-lightning-rainy",partlycloudy:"mdi:weather-partly-cloudy",pouring:"mdi:weather-pouring",rainy:"mdi:weather-rainy",snowy:"mdi:weather-snowy","snowy-rainy":"mdi:weather-snowy-rainy",sunny:"mdi:weather-sunny",windy:"mdi:weather-windy","windy-variant":"mdi:weather-windy-variant"};console.info("%c  BETTER-WEATHER-CARD  \n%c  Version 1.0.1  ","color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray"),window.customCards=window.customCards||[],window.customCards.push({type:"better-weather-card",name:"Better Weather Card",description:"A beautiful weather card with Mushroom-inspired design"});let wt=class extends rt{constructor(){super(...arguments),this._forecast=[]}static async getConfigElement(){return await Promise.resolve().then(function(){return At}),document.createElement("better-weather-card-editor")}static getStubConfig(){return{entity:"",show_current:!0,show_forecast:!0,forecast_items:0,forecast_type:"daily",colored_icons:!0,show_forecast_humidity:!0}}getCardSize(){return 3}connectedCallback(){super.connectedCallback(),this._fetchForecast()}disconnectedCallback(){super.disconnectedCallback(),this._forecastSubscription&&(this._forecastSubscription(),this._forecastSubscription=void 0)}setConfig(t){const e=this.config;this.config={show_current:!0,show_forecast:!0,forecast_items:0,forecast_type:"daily",colored_icons:!0,show_forecast_humidity:!0,...t},!e||e.entity===this.config.entity&&e.forecast_type===this.config.forecast_type||(this._forecast=[],this._forecastSubscription&&(this._forecastSubscription(),this._forecastSubscription=void 0),this.hass&&this._fetchForecast())}async _fetchForecast(){if(!this.hass||!this.config.entity)return;const t=this.config.forecast_type||"daily";try{const e=this.weatherEntity;if(e?.attributes?.forecast)return this._forecast=e.attributes.forecast,void this.requestUpdate();try{const e=await this.hass.callWS({type:"execute_script",sequence:[{action:"weather.get_forecasts",data:{type:t},target:{entity_id:this.config.entity},response_variable:"forecast_data"}]});if(e){const t=e.forecast_data;if(t&&t[this.config.entity]?.forecast)return this._forecast=t[this.config.entity].forecast,void this.requestUpdate()}}catch(t){}try{const e=await this.hass.callWS({type:"call_service",domain:"weather",service:"get_forecasts",service_data:{type:t},target:{entity_id:this.config.entity},return_response:!0});if(e&&"object"==typeof e){const t=e,i=t.response?.[this.config.entity]?.forecast||t[this.config.entity]?.forecast;if(i&&Array.isArray(i))return this._forecast=i,void this.requestUpdate()}}catch(t){}if(e?.attributes){const i=e.attributes,o="hourly"===t?i.forecast_hourly:i.forecast_daily;if(o&&Array.isArray(o))return this._forecast=o,void this.requestUpdate()}this._forecast=[],this.requestUpdate()}catch(t){this._forecast=[],this.requestUpdate()}}updated(t){super.updated(t),t.has("hass")&&this.hass&&!this._forecast.length&&this.config?.show_forecast&&this._fetchForecast()}get weatherEntity(){return this.hass.states[this.config.entity]}getWeatherIcon(t){return bt[t]||"mdi:weather-cloudy"}getWeatherIconColor(t){if(!this.config.colored_icons)return"var(--primary-color)";return{"clear-night":"#4A90E2",cloudy:"#95A5A6",fog:"#BDC3C7",hail:"#E8F4F8",lightning:"#F39C12","lightning-rainy":"#3498DB",partlycloudy:"#7F8C8D",pouring:"#2980B9",rainy:"#3498DB",snowy:"#ECF0F1","snowy-rainy":"#5DADE2",sunny:"#F39C12",windy:"#95A5A6","windy-variant":"#95A5A6",exceptional:"#E74C3C"}[t]||"var(--primary-color)"}formatTemperature(t){return`${Math.round(t)}°`}formatDay(t){const e=new Date(t),i=new Date,o=new Date(i);o.setDate(o.getDate()+1);return"hourly"===this.config.forecast_type?e.toLocaleTimeString(void 0,{hour:"numeric",hour12:!0}):e.toDateString()===i.toDateString()?"Today":e.toDateString()===o.toDateString()?"Tomorrow":e.toLocaleDateString(void 0,{weekday:"short"})}_handleTap(){this.hass&&this.config&&$t(this.config.tap_action)&&vt(this,this.hass,this.config,"tap")}_handleHold(){this.hass&&this.config&&$t(this.config.hold_action)&&vt(this,this.hass,this.config,"hold")}_handleDoubleClick(){this.hass&&this.config&&$t(this.config.double_tap_action)&&vt(this,this.hass,this.config,"double_tap")}render(){if(!this.config||!this.hass)return I``;if(!this.config.entity)return I`
        <ha-card>
          <div class="warning">Please select a weather entity in the card configuration</div>
        </ha-card>
      `;const t=this.weatherEntity;if(!t)return I`
        <ha-card>
          <div class="warning">Entity not found: ${this.config.entity}</div>
        </ha-card>
      `;const e=this.config.forecast_items||0,i=e>0?this._forecast.slice(0,e):this._forecast;return I`
      <div class="weather-card-container">
        ${this.config.show_current?I`
              <ha-card>
                <div class="card-content compact">
                  ${this.renderCompactCurrent(t)}
                </div>
              </ha-card>
            `:""}
        ${this.config.show_forecast?this.renderForecast(i):""}
      </div>
    `}renderCompactCurrent(t){const e=this.config.name||t.attributes.friendly_name||"Weather",i=t.state,o=t.attributes.temperature,s=t.attributes.humidity,n=this.getWeatherIconColor(i);return I`
      <div
        class="compact-weather"
        @click=${this._handleTap}
        @dblclick=${this._handleDoubleClick}
        @contextmenu=${t=>{t.preventDefault(),this._handleHold()}}
      >
        <div class="compact-main">
          <div class="icon-container" style="background: ${n}">
            <ha-icon .icon=${this.getWeatherIcon(i)}></ha-icon>
          </div>
          <div class="compact-info">
            <div class="name">${e}</div>
            <div class="condition">${this.getConditionText(i)}</div>
          </div>
          <div class="compact-temp">${this.formatTemperature(o)}</div>
          <div class="compact-humidity">
            <ha-icon icon="mdi:water-percent"></ha-icon>
            <span>${s}%</span>
          </div>
        </div>
      </div>
    `}renderForecast(t){return t&&0!==t.length?I`
      <div class="forecast-container">
        ${t.map(t=>{const e=this.getWeatherIconColor(t.condition);return I`
              <ha-card class="forecast-day-card">
                <div class="forecast-day">
                  <div class="day-name">${this.formatDay(t.datetime)}</div>
                  <ha-icon
                    .icon=${this.getWeatherIcon(t.condition)}
                    style="color: ${e}"
                  ></ha-icon>
                  <div class="temperature">${this.formatTemperature(t.temperature)}</div>
                  ${void 0!==t.templow?I`<div class="temp-low">${this.formatTemperature(t.templow)}</div>`:""}
                  ${this.config.show_forecast_humidity&&void 0!==t.humidity?I`
                        <div class="forecast-humidity">
                          <ha-icon icon="mdi:water-percent"></ha-icon>
                          <span>${t.humidity}%</span>
                        </div>
                      `:""}
                </div>
              </ha-card>
            `})}
      </div>
    `:I``}getConditionText(t){return{"clear-night":"Clear night",cloudy:"Cloudy",fog:"Foggy",hail:"Hail",lightning:"Lightning","lightning-rainy":"Lightning & rain",partlycloudy:"Partly cloudy",pouring:"Pouring",rainy:"Rainy",snowy:"Snowy","snowy-rainy":"Snow & rain",sunny:"Sunny",windy:"Windy","windy-variant":"Windy",exceptional:"Exceptional"}[t]||t}static get styles(){return r`
      :host {
        --spacing: 12px;
        --border-radius: 12px;
        --icon-size: 40px;
      }

      .weather-card-container {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      ha-card {
        background: var(--ha-card-background, var(--card-background-color, #fff));
        border-radius: var(--ha-card-border-radius, var(--border-radius));
        box-shadow: var(
          --ha-card-box-shadow,
          0px 2px 1px -1px rgba(0, 0, 0, 0.2),
          0px 1px 1px 0px rgba(0, 0, 0, 0.14),
          0px 1px 3px 0px rgba(0, 0, 0, 0.12)
        );
        padding: 0;
        height: auto;
      }

      .card-content {
        display: flex;
        flex-direction: column;
        gap: 0;
        padding: 12px 16px;
      }

      .compact-weather {
        display: flex;
        flex-direction: column;
        gap: 0;
        cursor: pointer;
      }

      .compact-main {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 0;
      }

      .compact-main .icon-container {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        transition: background 0.3s ease;
      }

      .compact-main .icon-container ha-icon {
        --mdc-icon-size: 24px;
        color: white;
      }

      .compact-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 0;
      }

      .compact-info .name {
        font-weight: 500;
        font-size: 14px;
        color: var(--primary-text-color);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .compact-info .condition {
        font-size: 12px;
        color: var(--secondary-text-color);
        opacity: 0.7;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .compact-temp {
        font-size: 24px;
        font-weight: 300;
        color: var(--primary-text-color);
        margin-right: 8px;
      }

      .compact-humidity {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 14px;
        color: var(--secondary-text-color);
      }

      .compact-humidity ha-icon {
        --mdc-icon-size: 16px;
      }

      .forecast-container {
        display: flex;
        gap: 8px;
        overflow-x: auto;
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE and Edge */
      }

      .forecast-container::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera */
      }

      .forecast-day-card {
        flex: 1 1 85px;
        min-width: 85px;
        max-width: 150px;
        padding: 0;
        background: var(--ha-card-background, var(--card-background-color, #fff));
      }

      .forecast-day {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        padding: 8px 6px;
        text-align: center;
      }

      .day-name {
        font-size: 11px;
        font-weight: 500;
        color: var(--secondary-text-color);
        text-transform: uppercase;
        letter-spacing: 0.1px;
      }

      .forecast-day ha-icon {
        --mdc-icon-size: 24px;
      }

      .forecast-day .temperature {
        font-size: 16px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .temp-low {
        font-size: 13px;
        color: var(--secondary-text-color);
        opacity: 0.6;
        font-weight: 400;
      }

      .forecast-humidity {
        display: flex;
        align-items: center;
        gap: 2px;
        font-size: 11px;
        color: var(--secondary-text-color);
        margin-top: 2px;
      }

      .forecast-humidity ha-icon {
        --mdc-icon-size: 12px;
      }

      .warning {
        display: block;
        color: var(--error-color, #f44336);
        padding: 16px;
      }
    `}};t([dt({attribute:!1})],wt.prototype,"hass",void 0),t([pt()],wt.prototype,"config",void 0),t([pt()],wt.prototype,"_forecast",void 0),wt=t([ct("better-weather-card")],wt);let xt=class extends rt{setConfig(t){this.config=t}getWeatherEntities(){return this.hass?Object.keys(this.hass.states).filter(t=>t.startsWith("weather.")):[]}valueChanged(t){const e=t.target;let i;if("checkbox"===e.type)i=e.checked;else if("number"===e.type){const t=parseInt(e.value,10);i=isNaN(t)?0:t}else i=e.value;if(this.config[e.configValue]===i)return;const o={...this.config,[e.configValue]:i};yt(this,"config-changed",{config:o})}actionChanged(t){const e=t.target,i=e.configValue,o=e.value;if("none"===o){const t={...this.config,[i]:{action:"none"}};yt(this,"config-changed",{config:t})}else{const t={...this.config,[i]:{action:o}};yt(this,"config-changed",{config:t})}}render(){if(!this.hass||!this.config)return I``;const t=this.getWeatherEntities();return I`
      <div class="card-config">
        <div class="option">
          <label for="entity">Entity (Required)</label>
          <select
            id="entity"
            .value=${this.config.entity||""}
            .configValue=${"entity"}
            @change=${this.valueChanged}
          >
            <option value="">Select a weather entity</option>
            ${t.map(t=>I`
                <option value=${t} ?selected=${t===this.config.entity}>
                  ${this.hass.states[t]?.attributes?.friendly_name||t}
                </option>
              `)}
          </select>
        </div>

        <div class="option">
          <label for="name">Name (Optional)</label>
          <input
            id="name"
            type="text"
            .value=${this.config.name||""}
            .configValue=${"name"}
            @input=${this.valueChanged}
            placeholder="Leave empty to use entity name"
          />
        </div>

        <div class="option">
          <label>
            <input
              type="checkbox"
              .checked=${!1!==this.config.show_current}
              .configValue=${"show_current"}
              @change=${this.valueChanged}
            />
            Show current weather
          </label>
        </div>

        <div class="option">
          <label>
            <input
              type="checkbox"
              .checked=${!1!==this.config.show_forecast}
              .configValue=${"show_forecast"}
              @change=${this.valueChanged}
            />
            Show forecast
          </label>
        </div>

        <div class="option">
          <label for="forecast-type">Forecast type</label>
          <select
            id="forecast-type"
            .value=${this.config.forecast_type||"daily"}
            .configValue=${"forecast_type"}
            @change=${this.valueChanged}
          >
            <option value="daily">Daily</option>
            <option value="hourly">Hourly</option>
          </select>
        </div>

        <div class="option">
          <label for="forecast-items">Number of forecast ${"hourly"===this.config.forecast_type?"hours":"days"}</label>
          <input
            id="forecast-items"
            type="number"
            min="0"
            max="48"
            .value=${this.config.forecast_items||0}
            .configValue=${"forecast_items"}
            @input=${this.valueChanged}
            placeholder="0 = all"
          />
          <span style="font-size: 12px; color: var(--secondary-text-color);">0 = show all available</span>
        </div>

        <div class="option">
          <label>
            <input
              type="checkbox"
              .checked=${!1!==this.config.colored_icons}
              .configValue=${"colored_icons"}
              @change=${this.valueChanged}
            />
            Colored weather icons
          </label>
        </div>

        <div class="option">
          <label>
            <input
              type="checkbox"
              .checked=${!1!==this.config.show_forecast_humidity}
              .configValue=${"show_forecast_humidity"}
              @change=${this.valueChanged}
            />
            Show humidity in forecast
          </label>
        </div>

        <div class="option">
          <label for="tap-action">Tap action</label>
          <select
            id="tap-action"
            .value=${this.config.tap_action?.action||"more-info"}
            .configValue=${"tap_action"}
            @change=${this.actionChanged}
          >
            <option value="more-info">More info</option>
            <option value="toggle">Toggle</option>
            <option value="navigate">Navigate</option>
            <option value="url">URL</option>
            <option value="call-service">Call service</option>
            <option value="none">None</option>
          </select>
        </div>

        <div class="option">
          <label for="hold-action">Hold action</label>
          <select
            id="hold-action"
            .value=${this.config.hold_action?.action||"more-info"}
            .configValue=${"hold_action"}
            @change=${this.actionChanged}
          >
            <option value="more-info">More info</option>
            <option value="toggle">Toggle</option>
            <option value="navigate">Navigate</option>
            <option value="url">URL</option>
            <option value="call-service">Call service</option>
            <option value="none">None</option>
          </select>
        </div>

        <div class="option">
          <label for="double-tap-action">Double tap action</label>
          <select
            id="double-tap-action"
            .value=${this.config.double_tap_action?.action||"none"}
            .configValue=${"double_tap_action"}
            @change=${this.actionChanged}
          >
            <option value="more-info">More info</option>
            <option value="toggle">Toggle</option>
            <option value="navigate">Navigate</option>
            <option value="url">URL</option>
            <option value="call-service">Call service</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
    `}static get styles(){return r`
      .card-config {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 16px;
      }

      .option {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .option label {
        font-weight: 500;
        color: var(--primary-text-color);
        font-size: 14px;
      }

      .option input[type='checkbox'] {
        margin-right: 8px;
        cursor: pointer;
      }

      .option label:has(input[type='checkbox']) {
        display: flex;
        align-items: center;
        cursor: pointer;
      }

      .option input[type='text'],
      .option input[type='number'],
      .option select {
        padding: 8px 12px;
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        border-radius: 4px;
        background: var(--card-background-color, #fff);
        color: var(--primary-text-color);
        font-size: 14px;
        font-family: inherit;
        outline: none;
        transition: border-color 0.2s;
      }

      .option input[type='text']:focus,
      .option input[type='number']:focus,
      .option select:focus {
        border-color: var(--primary-color);
      }

      .option input[type='number'] {
        width: 120px;
      }

      .option select {
        cursor: pointer;
      }
    `}};t([dt({attribute:!1})],xt.prototype,"hass",void 0),t([pt()],xt.prototype,"config",void 0),xt=t([ct("better-weather-card-editor")],xt);var At=Object.freeze({__proto__:null,get BetterWeatherCardEditor(){return xt}});export{wt as BetterWeatherCard};
//# sourceMappingURL=better-weather-card.js.map
