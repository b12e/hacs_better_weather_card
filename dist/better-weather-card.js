function t(t,e,i,s){var o,r=arguments.length,n=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(r<3?o(n):r>3?o(e,i,n):o(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;let r=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new r(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:c,defineProperty:h,getOwnPropertyDescriptor:l,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,f=globalThis,g=f.trustedTypes,y=g?g.emptyScript:"",m=f.reactiveElementPolyfillSupport,v=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?y:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},_=(t,e)=>!c(t,e),b={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:_};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&h(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const r=s?.call(this);o?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),o=e.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:$).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=s;const r=o.fromAttribute(e,t.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(t,e,i){if(void 0!==t){const s=this.constructor,o=this[t];if(i??=s.getPropertyOptions(t),!((i.hasChanged??_)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:o},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==o||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[v("elementProperties")]=new Map,w[v("finalized")]=new Map,m?.({ReactiveElement:w}),(f.reactiveElementVersions??=[]).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,A=x.trustedTypes,E=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+C,k=`<${P}>`,T=document,O=()=>T.createComment(""),U=t=>null===t||"object"!=typeof t&&"function"!=typeof t,M=Array.isArray,z="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,D=/>/g,N=RegExp(`>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,W=/"/g,L=/^(?:script|style|textarea|title)$/i,I=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),V=Symbol.for("lit-noChange"),B=Symbol.for("lit-nothing"),q=new WeakMap,F=T.createTreeWalker(T,129);function J(t,e){if(!M(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const K=(t,e)=>{const i=t.length-1,s=[];let o,r=2===e?"<svg>":3===e?"<math>":"",n=H;for(let e=0;e<i;e++){const i=t[e];let a,c,h=-1,l=0;for(;l<i.length&&(n.lastIndex=l,c=n.exec(i),null!==c);)l=n.lastIndex,n===H?"!--"===c[1]?n=R:void 0!==c[1]?n=D:void 0!==c[2]?(L.test(c[2])&&(o=RegExp("</"+c[2],"g")),n=N):void 0!==c[3]&&(n=N):n===N?">"===c[0]?(n=o??H,h=-1):void 0===c[1]?h=-2:(h=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?N:'"'===c[3]?W:j):n===W||n===j?n=N:n===R||n===D?n=H:(n=N,o=void 0);const d=n===N&&t[e+1].startsWith("/>")?" ":"";r+=n===H?i+k:h>=0?(s.push(a),i.slice(0,h)+S+i.slice(h)+C+d):i+C+(-2===h?e:d)}return[J(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Z{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,r=0;const n=t.length-1,a=this.parts,[c,h]=K(t,e);if(this.el=Z.createElement(c,i),F.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=F.nextNode())&&a.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(S)){const e=h[r++],i=s.getAttribute(t).split(C),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:n[2],strings:i,ctor:"."===n[1]?tt:"?"===n[1]?et:"@"===n[1]?it:Y}),s.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:o}),s.removeAttribute(t));if(L.test(s.tagName)){const t=s.textContent.split(C),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],O()),F.nextNode(),a.push({type:2,index:++o});s.append(t[e],O())}}}else if(8===s.nodeType)if(s.data===P)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(C,t+1));)a.push({type:7,index:o}),t+=C.length-1}o++}}static createElement(t,e){const i=T.createElement("template");return i.innerHTML=t,i}}function G(t,e,i=t,s){if(e===V)return e;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const r=U(e)?void 0:e._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),void 0===r?o=void 0:(o=new r(t),o._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(e=G(t,o._$AS(t,e.values),o,s)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??T).importNode(e,!0);F.currentNode=s;let o=F.nextNode(),r=0,n=0,a=i[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new X(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new st(o,this,t)),this._$AV.push(e),a=i[++n]}r!==a?.index&&(o=F.nextNode(),r++)}return F.currentNode=T,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=G(this,t,e),U(t)?t===B||null==t||""===t?(this._$AH!==B&&this._$AR(),this._$AH=B):t!==this._$AH&&t!==V&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>M(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==B&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(T.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Z.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Q(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=q.get(t.strings);return void 0===e&&q.set(t.strings,e=new Z(t)),e}k(t){M(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new X(this.O(O()),this.O(O()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Y{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=B,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=B}_$AI(t,e=this,i,s){const o=this.strings;let r=!1;if(void 0===o)t=G(this,t,e,0),r=!U(t)||t!==this._$AH&&t!==V,r&&(this._$AH=t);else{const s=t;let n,a;for(t=o[0],n=0;n<o.length-1;n++)a=G(this,s[i+n],e,n),a===V&&(a=this._$AH[n]),r||=!U(a)||a!==this._$AH[n],a===B?t=B:t!==B&&(t+=(a??"")+o[n+1]),this._$AH[n]=a}r&&!s&&this.j(t)}j(t){t===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends Y{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===B?void 0:t}}class et extends Y{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==B)}}class it extends Y{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=G(this,t,e,0)??B)===V)return;const i=this._$AH,s=t===B&&i!==B||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==B&&(i===B||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){G(this,t)}}const ot=x.litHtmlPolyfillSupport;ot?.(Z,X),(x.litHtmlVersions??=[]).push("3.3.1");const rt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class nt extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let o=s._$litPart$;if(void 0===o){const t=i?.renderBefore??null;s._$litPart$=o=new X(e.insertBefore(O(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}}nt._$litElement$=!0,nt.finalized=!0,rt.litElementHydrateSupport?.({LitElement:nt});const at=rt.litElementPolyfillSupport;at?.({LitElement:nt}),(rt.litElementVersions??=[]).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ct=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ht={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:_},lt=(t=ht,e,i)=>{const{kind:s,metadata:o}=i;let r=globalThis.litPropertyMetadata.get(o);if(void 0===r&&globalThis.litPropertyMetadata.set(o,r=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const o=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,o,t)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];e.call(this,i),this.requestUpdate(s,o,t)}}throw Error("Unsupported decorator location: "+s)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function dt(t){return(e,i)=>"object"==typeof i?lt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function pt(t){return dt({...t,state:!0,attribute:!1})}var ut,ft;!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(ut||(ut={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(ft||(ft={}));var gt=function(t,e,i,s){s=s||{},i=null==i?{}:i;var o=new Event(e,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return o.detail=i,t.dispatchEvent(o),o};const yt={"clear-night":"mdi:weather-night",cloudy:"mdi:weather-cloudy",exceptional:"mdi:alert-circle-outline",fog:"mdi:weather-fog",hail:"mdi:weather-hail",lightning:"mdi:weather-lightning","lightning-rainy":"mdi:weather-lightning-rainy",partlycloudy:"mdi:weather-partly-cloudy",pouring:"mdi:weather-pouring",rainy:"mdi:weather-rainy",snowy:"mdi:weather-snowy","snowy-rainy":"mdi:weather-snowy-rainy",sunny:"mdi:weather-sunny",windy:"mdi:weather-windy","windy-variant":"mdi:weather-windy-variant"};console.info("%c  BETTER-WEATHER-CARD  \n%c  Version 1.0.0  ","color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray"),window.customCards=window.customCards||[],window.customCards.push({type:"better-weather-card",name:"Better Weather Card",description:"A beautiful weather card with Mushroom-inspired design"});let mt=class extends nt{constructor(){super(...arguments),this._forecast=[]}static async getConfigElement(){return await Promise.resolve().then(function(){return $t}),document.createElement("better-weather-card-editor")}static getStubConfig(){return{entity:"",show_current:!0,show_forecast:!0,forecast_days:5,forecast_type:"daily",layout:"compact"}}getCardSize(){return 3}connectedCallback(){super.connectedCallback(),this._fetchForecast()}disconnectedCallback(){super.disconnectedCallback(),this._forecastSubscription&&(this._forecastSubscription(),this._forecastSubscription=void 0)}setConfig(t){const e=this.config;this.config={show_current:!0,show_forecast:!0,forecast_days:5,forecast_type:"daily",layout:"compact",...t},!e||e.entity===this.config.entity&&e.forecast_type===this.config.forecast_type||(this._forecast=[],this._forecastSubscription&&(this._forecastSubscription(),this._forecastSubscription=void 0),this.hass&&this._fetchForecast())}async _fetchForecast(){if(!this.hass||!this.config.entity)return;const t=this.config.forecast_type||"daily";try{const e=this.weatherEntity;if(e?.attributes?.forecast)return this._forecast=e.attributes.forecast,void this.requestUpdate();const i=await this.hass.callWS({type:"weather/get_forecasts",entity_id:[this.config.entity],forecast_type:t}),s=i?.[this.config.entity];s?.forecast&&(this._forecast=s.forecast,this.requestUpdate())}catch(t){console.error("Error fetching forecast:",t),this._forecast=[]}}updated(t){super.updated(t),t.has("hass")&&this.hass&&!this._forecast.length&&this.config?.show_forecast&&this._fetchForecast()}get weatherEntity(){return this.hass.states[this.config.entity]}getWeatherIcon(t){return yt[t]||"mdi:weather-cloudy"}formatTemperature(t){return`${Math.round(t)}°`}formatDay(t){const e=new Date(t),i=new Date,s=new Date(i);s.setDate(s.getDate()+1);return"hourly"===this.config.forecast_type?e.toLocaleTimeString(void 0,{hour:"numeric",hour12:!0}):e.toDateString()===i.toDateString()?"Today":e.toDateString()===s.toDateString()?"Tomorrow":e.toLocaleDateString(void 0,{weekday:"short"})}handleAction(t){t&&gt(this,"hass-action",{config:this.config,action:t})}render(){if(!this.config||!this.hass)return I``;if(!this.config.entity)return I`
        <ha-card>
          <div class="warning">Please select a weather entity in the card configuration</div>
        </ha-card>
      `;const t=this.weatherEntity;if(!t)return I`
        <ha-card>
          <div class="warning">Entity not found: ${this.config.entity}</div>
        </ha-card>
      `;const e="compact"===this.config.layout,i=this._forecast.slice(0,this.config.forecast_days||5);return I`
      <ha-card>
        <div class="card-content ${e?"compact":""}">
          ${this.config.show_current?e?this.renderCompactCurrent(t):this.renderCurrent(t):""}
          ${this.config.show_forecast?this.renderForecast(i):""}
        </div>
      </ha-card>
    `}renderCompactCurrent(t){const e=this.config.name||t.attributes.friendly_name||"Weather",i=t.state,s=t.attributes.temperature,o=t.attributes.humidity;return I`
      <div class="compact-weather">
        <div class="compact-main">
          <div class="icon-container">
            <ha-icon .icon=${this.getWeatherIcon(i)}></ha-icon>
          </div>
          <div class="compact-info">
            <div class="name">${e}</div>
            <div class="condition">${this.getConditionText(i)}</div>
          </div>
          <div class="compact-temp">${this.formatTemperature(s)}</div>
          <div class="compact-humidity">
            <ha-icon icon="mdi:water-percent"></ha-icon>
            <span>${o}%</span>
          </div>
        </div>
      </div>
    `}renderCurrent(t){const e=this.config.name||t.attributes.friendly_name||"Weather",i=t.state,s=t.attributes.temperature,o=t.attributes.humidity;return I`
      <div class="current-weather">
        <div class="current-header">
          <div class="icon-container">
            <ha-icon .icon=${this.getWeatherIcon(i)}></ha-icon>
          </div>
          <div class="current-info">
            <div class="name">${e}</div>
            <div class="condition">${this.getConditionText(i)}</div>
          </div>
        </div>
        <div class="current-details">
          <div class="temperature">${this.formatTemperature(s)}</div>
          <div class="humidity">
            <ha-icon icon="mdi:water-percent"></ha-icon>
            <span>${o}%</span>
          </div>
        </div>
      </div>
    `}renderForecast(t){return t&&0!==t.length?I`
      <div class="forecast">
        ${t.map(t=>I`
            <div class="forecast-day">
              <div class="day-name">${this.formatDay(t.datetime)}</div>
              <ha-icon .icon=${this.getWeatherIcon(t.condition)}></ha-icon>
              <div class="temperature">${this.formatTemperature(t.temperature)}</div>
              ${void 0!==t.templow?I`<div class="temp-low">${this.formatTemperature(t.templow)}</div>`:""}
            </div>
          `)}
      </div>
    `:I``}getConditionText(t){return{"clear-night":"Clear night",cloudy:"Cloudy",fog:"Foggy",hail:"Hail",lightning:"Lightning","lightning-rainy":"Lightning & rain",partlycloudy:"Partly cloudy",pouring:"Pouring",rainy:"Rainy",snowy:"Snowy","snowy-rainy":"Snow & rain",sunny:"Sunny",windy:"Windy","windy-variant":"Windy",exceptional:"Exceptional"}[t]||t}static get styles(){return n`
      :host {
        --spacing: 12px;
        --border-radius: 12px;
        --icon-size: 40px;
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
      }

      ha-card:has(.compact) {
        padding: 12px;
      }

      ha-card:not(:has(.compact)) {
        padding: var(--spacing);
      }

      .card-content {
        display: flex;
        flex-direction: column;
        gap: var(--spacing);
      }

      .card-content.compact {
        gap: 12px;
      }

      /* Compact Mode Styles */
      .compact-weather {
        display: flex;
        flex-direction: column;
        gap: 0;
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
        background: var(--primary-color);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
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

      /* Default Mode Styles */
      .current-weather {
        display: flex;
        flex-direction: column;
        gap: var(--spacing);
        padding: var(--spacing);
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: var(--border-radius);
      }

      .current-header {
        display: flex;
        align-items: center;
        gap: var(--spacing);
      }

      .icon-container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: var(--icon-size);
        height: var(--icon-size);
        background: var(--primary-color);
        border-radius: 50%;
        color: var(--primary-text-color, #fff);
        flex-shrink: 0;
      }

      .icon-container ha-icon {
        --mdc-icon-size: 24px;
      }

      .current-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .name {
        font-weight: 500;
        font-size: 16px;
        color: var(--primary-text-color);
      }

      .condition {
        font-size: 14px;
        color: var(--secondary-text-color);
        opacity: 0.7;
      }

      .current-details {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 8px;
        border-top: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      }

      .temperature {
        font-size: 32px;
        font-weight: 300;
        color: var(--primary-text-color);
      }

      .humidity {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 14px;
        color: var(--secondary-text-color);
      }

      .humidity ha-icon {
        --mdc-icon-size: 18px;
      }

      .forecast {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
        gap: 8px;
      }

      .forecast-day {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        padding: 12px 8px;
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: var(--border-radius);
        text-align: center;
      }

      .day-name {
        font-size: 12px;
        font-weight: 500;
        color: var(--secondary-text-color);
        text-transform: uppercase;
      }

      .forecast-day ha-icon {
        --mdc-icon-size: 28px;
        color: var(--primary-color);
      }

      .forecast-day .temperature {
        font-size: 18px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .temp-low {
        font-size: 14px;
        color: var(--secondary-text-color);
        opacity: 0.7;
      }

      .warning {
        display: block;
        color: var(--error-color, #f44336);
        padding: 16px;
      }
    `}};t([dt({attribute:!1})],mt.prototype,"hass",void 0),t([pt()],mt.prototype,"config",void 0),t([pt()],mt.prototype,"_forecast",void 0),mt=t([ct("better-weather-card")],mt);let vt=class extends nt{setConfig(t){this.config=t}getWeatherEntities(){return this.hass?Object.keys(this.hass.states).filter(t=>t.startsWith("weather.")):[]}valueChanged(t){const e=t.target;let i;if(i=void 0!==e.checked?e.checked:"number"===e.type?""===e.value?5:parseInt(e.value,10):e.value,this.config[e.configValue]===i)return;const s={...this.config,[e.configValue]:i};gt(this,"config-changed",{config:s})}render(){if(!this.hass||!this.config)return I``;const t=this.getWeatherEntities();return I`
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
          <label for="forecast-days">Forecast ${"hourly"===this.config.forecast_type?"hours":"days"}</label>
          <input
            id="forecast-days"
            type="number"
            min="1"
            max="48"
            .value=${this.config.forecast_days||5}
            .configValue=${"forecast_days"}
            @input=${this.valueChanged}
          />
        </div>

        <div class="option">
          <label for="layout">Layout</label>
          <select
            id="layout"
            .value=${this.config.layout||"compact"}
            .configValue=${"layout"}
            @change=${this.valueChanged}
          >
            <option value="compact">Compact (Mushroom style)</option>
            <option value="default">Default</option>
          </select>
        </div>
      </div>
    `}static get styles(){return n`
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
    `}};t([dt({attribute:!1})],vt.prototype,"hass",void 0),t([pt()],vt.prototype,"config",void 0),vt=t([ct("better-weather-card-editor")],vt);var $t=Object.freeze({__proto__:null,get BetterWeatherCardEditor(){return vt}});export{mt as BetterWeatherCard};
//# sourceMappingURL=better-weather-card.js.map
