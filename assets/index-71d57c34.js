(function(){const A=document.createElement("link").relList;if(A&&A.supports&&A.supports("modulepreload"))return;for(const L of document.querySelectorAll('link[rel="modulepreload"]'))I(L);new MutationObserver(L=>{for(const N of L)if(N.type==="childList")for(const O of N.addedNodes)O.tagName==="LINK"&&O.rel==="modulepreload"&&I(O)}).observe(document,{childList:!0,subtree:!0});function R(L){const N={};return L.integrity&&(N.integrity=L.integrity),L.referrerpolicy&&(N.referrerPolicy=L.referrerpolicy),L.crossorigin==="use-credentials"?N.credentials="include":L.crossorigin==="anonymous"?N.credentials="omit":N.credentials="same-origin",N}function I(L){if(L.ep)return;L.ep=!0;const N=R(L);fetch(L.href,N)}})();const RE={};function tA(E){RE.context=E}const lA=(E,A)=>E===A,rE=Symbol("solid-proxy"),VE={equals:lA};let AA=OA;const LE=1,tE=2,RA={owned:null,cleanups:null,context:null,owner:null};var w=null;let SE=null,h=null,$=null,NE=null,fE=0;function aA(E,A){const R=h,I=w,L=E.length===0,N=L?RA:{owned:null,cleanups:null,context:null,owner:A||I},O=L?E:()=>E(()=>YE(()=>iE(N)));w=N,h=null;try{return WE(O,!0)}finally{h=R,w=I}}function e(E,A){A=A?Object.assign({},VE,A):VE;const R={value:E,observers:null,observerSlots:null,comparator:A.equals||void 0},I=L=>(typeof L=="function"&&(L=L(R.value)),LA(R,L));return[IA.bind(R),I]}function o(E,A,R){const I=mE(E,A,!1,LE);FE(I)}function KE(E,A,R){AA=dA;const I=mE(E,A,!1,LE);I.user=!0,NE?NE.push(I):FE(I)}function J(E,A,R){R=R?Object.assign({},VE,R):VE;const I=mE(E,A,!0,0);return I.observers=null,I.observerSlots=null,I.comparator=R.equals||void 0,FE(I),IA.bind(I)}function YE(E){const A=h;h=null;try{return E()}finally{h=A}}function CE(E){KE(()=>YE(E))}function NA(E){return w===null||(w.cleanups===null?w.cleanups=[E]:w.cleanups.push(E)),E}function IA(){const E=SE;if(this.sources&&(this.state||E))if(this.state===LE||E)FE(this);else{const A=$;$=null,WE(()=>aE(this),!1),$=A}if(h){const A=this.observers?this.observers.length:0;h.sources?(h.sources.push(this),h.sourceSlots.push(A)):(h.sources=[this],h.sourceSlots=[A]),this.observers?(this.observers.push(h),this.observerSlots.push(h.sources.length-1)):(this.observers=[h],this.observerSlots=[h.sources.length-1])}return this.value}function LA(E,A,R){let I=E.value;return(!E.comparator||!E.comparator(I,A))&&(E.value=A,E.observers&&E.observers.length&&WE(()=>{for(let L=0;L<E.observers.length;L+=1){const N=E.observers[L],O=SE&&SE.running;O&&SE.disposed.has(N),(O&&!N.tState||!O&&!N.state)&&(N.pure?$.push(N):NE.push(N),N.observers&&SA(N)),O||(N.state=LE)}if($.length>1e6)throw $=[],new Error},!1)),A}function FE(E){if(!E.fn)return;iE(E);const A=w,R=h,I=fE;h=w=E,sA(E,E.value,I),h=R,w=A}function sA(E,A,R){let I;try{I=E.fn(A)}catch(L){E.pure&&(E.state=LE,E.owned&&E.owned.forEach(iE),E.owned=null),TA(L)}(!E.updatedAt||E.updatedAt<=R)&&(E.updatedAt!=null&&"observers"in E?LA(E,I):E.value=I,E.updatedAt=R)}function mE(E,A,R,I=LE,L){const N={fn:E,state:I,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:A,owner:w,context:null,pure:R};return w===null||w!==RA&&(w.owned?w.owned.push(N):w.owned=[N]),N}function lE(E){const A=SE;if(E.state===0||A)return;if(E.state===tE||A)return aE(E);if(E.suspense&&YE(E.suspense.inFallback))return E.suspense.effects.push(E);const R=[E];for(;(E=E.owner)&&(!E.updatedAt||E.updatedAt<fE);)(E.state||A)&&R.push(E);for(let I=R.length-1;I>=0;I--)if(E=R[I],E.state===LE||A)FE(E);else if(E.state===tE||A){const L=$;$=null,WE(()=>aE(E,R[0]),!1),$=L}}function WE(E,A){if($)return E();let R=!1;A||($=[]),NE?R=!0:NE=[],fE++;try{const I=E();return iA(R),I}catch(I){$||(NE=null),TA(I)}}function iA(E){if($&&(OA($),$=null),E)return;const A=NE;NE=null,A.length&&WE(()=>AA(A),!1)}function OA(E){for(let A=0;A<E.length;A++)lE(E[A])}function dA(E){let A,R=0;for(A=0;A<E.length;A++){const I=E[A];I.user?E[R++]=I:lE(I)}for(RE.context&&tA(),A=0;A<R;A++)lE(E[A])}function aE(E,A){const R=SE;E.state=0;for(let I=0;I<E.sources.length;I+=1){const L=E.sources[I];L.sources&&(L.state===LE||R?L!==A&&lE(L):(L.state===tE||R)&&aE(L,A))}}function SA(E){const A=SE;for(let R=0;R<E.observers.length;R+=1){const I=E.observers[R];(!I.state||A)&&(I.state=tE,I.pure?$.push(I):NE.push(I),I.observers&&SA(I))}}function iE(E){let A;if(E.sources)for(;E.sources.length;){const R=E.sources.pop(),I=E.sourceSlots.pop(),L=R.observers;if(L&&L.length){const N=L.pop(),O=R.observerSlots.pop();I<L.length&&(N.sourceSlots[O]=I,L[I]=N,R.observerSlots[I]=O)}}if(E.owned){for(A=0;A<E.owned.length;A++)iE(E.owned[A]);E.owned=null}if(E.cleanups){for(A=0;A<E.cleanups.length;A++)E.cleanups[A]();E.cleanups=null}E.state=0,E.context=null}function nA(E){return E instanceof Error||typeof E=="string"?E:new Error("Unknown error")}function TA(E){throw E=nA(E),E}function P(E,A){return YE(()=>E(A||{}))}function ZE(){return!0}const JA={get(E,A,R){return A===rE?R:E.get(A)},has(E,A){return A===rE?!0:E.has(A)},set:ZE,deleteProperty:ZE,getOwnPropertyDescriptor(E,A){return{configurable:!0,enumerable:!0,get(){return E.get(A)},set:ZE,deleteProperty:ZE}},ownKeys(E){return E.keys()}};function nE(E){return(E=typeof E=="function"?E():E)?E:{}}function UE(...E){let A=!1;for(let I=0;I<E.length;I++){const L=E[I];A=A||!!L&&rE in L,E[I]=typeof L=="function"?(A=!0,J(L)):L}if(A)return new Proxy({get(I){for(let L=E.length-1;L>=0;L--){const N=nE(E[L])[I];if(N!==void 0)return N}},has(I){for(let L=E.length-1;L>=0;L--)if(I in nE(E[L]))return!0;return!1},keys(){const I=[];for(let L=0;L<E.length;L++)I.push(...Object.keys(nE(E[L])));return[...new Set(I)]}},JA);const R={};for(let I=E.length-1;I>=0;I--)if(E[I]){const L=Object.getOwnPropertyDescriptors(E[I]);for(const N in L)N in R||Object.defineProperty(R,N,{enumerable:!0,get(){for(let O=E.length-1;O>=0;O--){const T=(E[O]||{})[N];if(T!==void 0)return T}}})}return R}const oA=["allowfullscreen","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","indeterminate","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected"],cA=new Set(["className","value","readOnly","formNoValidate","isMap","noModule","playsInline",...oA]),rA=new Set(["innerHTML","textContent","innerText","children"]),uA=Object.assign(Object.create(null),{className:"class",htmlFor:"for"}),hE=Object.assign(Object.create(null),{class:"className",formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly"}),fA=new Set(["beforeinput","click","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),mA={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};function bA(E,A,R){let I=R.length,L=A.length,N=I,O=0,T=0,G=A[L-1].nextSibling,M=null;for(;O<L||T<N;){if(A[O]===R[T]){O++,T++;continue}for(;A[L-1]===R[N-1];)L--,N--;if(L===O){const U=N<I?T?R[T-1].nextSibling:R[N-T]:G;for(;T<N;)E.insertBefore(R[T++],U)}else if(N===T)for(;O<L;)(!M||!M.has(A[O]))&&A[O].remove(),O++;else if(A[O]===R[N-1]&&R[T]===A[L-1]){const U=A[--L].nextSibling;E.insertBefore(R[T++],A[O++].nextSibling),E.insertBefore(R[--N],U),A[L]=R[N]}else{if(!M){M=new Map;let K=T;for(;K<N;)M.set(R[K],K++)}const U=M.get(A[O]);if(U!=null)if(T<U&&U<N){let K=O,W=1,d;for(;++K<L&&K<N&&!((d=M.get(A[K]))==null||d!==U+W);)W++;if(W>U-T){const n=A[O];for(;T<U;)E.insertBefore(R[T++],n)}else E.replaceChild(R[T++],A[O++])}else O++;else A[O++].remove()}}}const XE="_$DX_DELEGATE";function vA(E,A,R,I={}){let L;return aA(N=>{L=N,A===document?E():D(A,E(),A.firstChild?null:void 0,R)},I.owner),()=>{L(),A.textContent=""}}function i(E,A,R){const I=document.createElement("template");I.innerHTML=E;let L=I.content.firstChild;return R&&(L=L.firstChild),L}function HE(E,A=window.document){const R=A[XE]||(A[XE]=new Set);for(let I=0,L=E.length;I<L;I++){const N=E[I];R.has(N)||(R.add(N),A.addEventListener(N,pA))}}function _(E,A,R){R==null?E.removeAttribute(A):E.setAttribute(A,R)}function xA(E,A,R,I){I==null?E.removeAttributeNS(A,R):E.setAttributeNS(A,R,I)}function AE(E,A){A==null?E.removeAttribute("class"):E.className=A}function IE(E,A,R,I){if(I)Array.isArray(R)?(E[`$$${A}`]=R[0],E[`$$${A}Data`]=R[1]):E[`$$${A}`]=R;else if(Array.isArray(R)){const L=R[0];E.addEventListener(A,R[0]=N=>L.call(E,R[1],N))}else E.addEventListener(A,R)}function QA(E,A,R={}){const I=Object.keys(A||{}),L=Object.keys(R);let N,O;for(N=0,O=L.length;N<O;N++){const T=L[N];!T||T==="undefined"||A[T]||(gE(E,T,!1),delete R[T])}for(N=0,O=I.length;N<O;N++){const T=I[N],G=!!A[T];!T||T==="undefined"||R[T]===G||!G||(gE(E,T,!0),R[T]=G)}return R}function X(E,A,R){if(!A)return R?_(E,"style"):A;const I=E.style;if(typeof A=="string")return I.cssText=A;typeof R=="string"&&(I.cssText=R=void 0),R||(R={}),A||(A={});let L,N;for(N in R)A[N]==null&&I.removeProperty(N),delete R[N];for(N in A)L=A[N],L!==R[N]&&(I.setProperty(N,L),R[N]=L);return R}function hA(E,A={},R,I){const L={};return I||o(()=>L.children=GE(E,A.children,L.children)),o(()=>A.ref&&A.ref(E)),o(()=>XA(E,A,R,!0,L,!0)),L}function TE(E,A,R){return YE(()=>E(A,R))}function D(E,A,R,I){if(R!==void 0&&!I&&(I=[]),typeof A!="function")return GE(E,A,I,R);o(L=>GE(E,A(),L,R),I)}function XA(E,A,R,I,L={},N=!1){A||(A={});for(const O in L)if(!(O in A)){if(O==="children")continue;L[O]=pE(E,O,null,L[O],R,N)}for(const O in A){if(O==="children"){I||GE(E,A.children);continue}const T=A[O];L[O]=pE(E,O,T,L[O],R,N)}}function gA(E){return E.toLowerCase().replace(/-([a-z])/g,(A,R)=>R.toUpperCase())}function gE(E,A,R){const I=A.trim().split(/\s+/);for(let L=0,N=I.length;L<N;L++)E.classList.toggle(I[L],R)}function pE(E,A,R,I,L,N){let O,T,G;if(A==="style")return X(E,R,I);if(A==="classList")return QA(E,R,I);if(R===I)return I;if(A==="ref")N||R(E);else if(A.slice(0,3)==="on:"){const M=A.slice(3);I&&E.removeEventListener(M,I),R&&E.addEventListener(M,R)}else if(A.slice(0,10)==="oncapture:"){const M=A.slice(10);I&&E.removeEventListener(M,I,!0),R&&E.addEventListener(M,R,!0)}else if(A.slice(0,2)==="on"){const M=A.slice(2).toLowerCase(),U=fA.has(M);if(!U&&I){const K=Array.isArray(I)?I[0]:I;E.removeEventListener(M,K)}(U||R)&&(IE(E,M,R,U),U&&HE([M]))}else if((G=rA.has(A))||!L&&(hE[A]||(T=cA.has(A)))||(O=E.nodeName.includes("-")))A==="class"||A==="className"?AE(E,R):O&&!T&&!G?E[gA(A)]=R:E[hE[A]||A]=R;else{const M=L&&A.indexOf(":")>-1&&mA[A.split(":")[0]];M?xA(E,M,A,R):_(E,uA[A]||A,R)}return R}function pA(E){const A=`$$${E.type}`;let R=E.composedPath&&E.composedPath()[0]||E.target;for(E.target!==R&&Object.defineProperty(E,"target",{configurable:!0,value:R}),Object.defineProperty(E,"currentTarget",{configurable:!0,get(){return R||document}}),RE.registry&&!RE.done&&(RE.done=!0,document.querySelectorAll("[id^=pl-]").forEach(I=>{for(;I&&I.nodeType!==8&&I.nodeValue!=="pl-"+E;){let L=I.nextSibling;I.remove(),I=L}I&&I.remove()}));R;){const I=R[A];if(I&&!R.disabled){const L=R[`${A}Data`];if(L!==void 0?I.call(R,L,E):I.call(R,E),E.cancelBubble)return}R=R._$host||R.parentNode||R.host}}function GE(E,A,R,I,L){for(RE.context&&!R&&(R=[...E.childNodes]);typeof R=="function";)R=R();if(A===R)return R;const N=typeof A,O=I!==void 0;if(E=O&&R[0]&&R[0].parentNode||E,N==="string"||N==="number"){if(RE.context)return R;if(N==="number"&&(A=A.toString()),O){let T=R[0];T&&T.nodeType===3?T.data=A:T=document.createTextNode(A),R=DE(E,R,I,T)}else R!==""&&typeof R=="string"?R=E.firstChild.data=A:R=E.textContent=A}else if(A==null||N==="boolean"){if(RE.context)return R;R=DE(E,R,I)}else{if(N==="function")return o(()=>{let T=A();for(;typeof T=="function";)T=T();R=GE(E,T,R,I)}),()=>R;if(Array.isArray(A)){const T=[],G=R&&Array.isArray(R);if(uE(T,A,R,L))return o(()=>R=GE(E,T,R,I,!0)),()=>R;if(RE.context){if(!T.length)return R;for(let M=0;M<T.length;M++)if(T[M].parentNode)return R=T}if(T.length===0){if(R=DE(E,R,I),O)return R}else G?R.length===0?yE(E,T,I):bA(E,R,T):(R&&DE(E),yE(E,T));R=T}else if(A instanceof Node){if(RE.context&&A.parentNode)return R=O?[A]:A;if(Array.isArray(R)){if(O)return R=DE(E,R,I,A);DE(E,R,null,A)}else R==null||R===""||!E.firstChild?E.appendChild(A):E.replaceChild(A,E.firstChild);R=A}}return R}function uE(E,A,R,I){let L=!1;for(let N=0,O=A.length;N<O;N++){let T=A[N],G=R&&R[N];if(T instanceof Node)E.push(T);else if(!(T==null||T===!0||T===!1))if(Array.isArray(T))L=uE(E,T,G)||L;else if(typeof T=="function")if(I){for(;typeof T=="function";)T=T();L=uE(E,Array.isArray(T)?T:[T],Array.isArray(G)?G:[G])||L}else E.push(T),L=!0;else{const M=String(T);G&&G.nodeType===3&&G.data===M?E.push(G):E.push(document.createTextNode(M))}}return L}function yE(E,A,R=null){for(let I=0,L=A.length;I<L;I++)E.insertBefore(A[I],R)}function DE(E,A,R,I){if(R===void 0)return E.textContent="";const L=I||document.createTextNode("");if(A.length){let N=!1;for(let O=A.length-1;O>=0;O--){const T=A[O];if(L!==T){const G=T.parentNode===E;!N&&!O?G?E.replaceChild(L,T):E.insertBefore(L,R):G&&T.remove()}else N=!0}}else E.insertBefore(L,R);return[L]}const yA=!1;const wA=i('<svg fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg"></svg>'),$A=i("<title></title>");function BE(E,A){const R=UE(E.a,A);return(()=>{const I=wA.cloneNode(!0);return hA(I,R,!0,!0),D(I,()=>yA,null),D(I,(()=>{const L=J(()=>!!A.title,!0);return()=>L()&&(()=>{const N=$A.cloneNode(!0);return D(N,()=>A.title),N})()})(),null),o(L=>{const N=E.a.stroke,O={...A.style,overflow:"visible",color:A.color||"currentColor"},T=A.size||"1em",G=A.size||"1em",M=E.c;return N!==L._v$&&_(I,"stroke",L._v$=N),L._v$2=X(I,O,L._v$2),T!==L._v$3&&_(I,"height",L._v$3=T),G!==L._v$4&&_(I,"width",L._v$4=G),M!==L._v$5&&(I.innerHTML=L._v$5=M),L},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0,_v$5:void 0}),I})()}function kA(E){return BE({a:{viewBox:"0 0 24 24"},c:'<path fill="none" d="M0 0h24v24H0z"/><path d="M12 15l-4.243-4.243 1.415-1.414L12 12.172l2.828-2.829 1.415 1.414z"/>'},E)}function _A(E){return BE({a:{viewBox:"0 0 24 24"},c:'<path fill="none" d="M0 0h24v24H0z"/><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"/>'},E)}function jA(E){return BE({a:{baseProfile:"tiny",version:"1.2",viewBox:"0 0 24 24"},c:'<path d="M16.972 6.251a1.999 1.999 0 00-2.72.777l-3.713 6.682-2.125-2.125a2 2 0 10-2.828 2.828l4 4c.378.379.888.587 1.414.587l.277-.02a2 2 0 001.471-1.009l5-9a2 2 0 00-.776-2.72z"/>'},E)}const p=E=>`${E instanceof Error?E.message:E}`,zA=i("<div><div></div><p></p></div>"),JE=i("<div></div>"),qA=E=>{const[A,R]=e(!1),I=O=>{E.choiceDisabled||(E.onItemClicked(E.item),O.stopPropagation())};KE(()=>{const O=E.index===E.highlightedIndex();O!==A()&&R(O)});const L=O=>{try{return O.text??(E.itemText?E.itemText(O):O)}catch{console.log(`Object type either does not implement Choice, the property getters (itemText | itemValue) or is not a string, error: ${p}`)}return""},N=O=>O?E.choiceHoverStyle??{color:"var(--solidjsSelectHighlightedFontColor)","background-color":"var(--solidjsSelectHighlightedBackgroundColor, lightgray)","background-image":"var(--solidjsSelectHighlightedBackgroundImage)"}:E.isSelected&&E.selectionType==="Background"?{"background-color":"var(--solidjsSelectSelectedBackgroundBackgroundColor,Gainsboro)","border-radius":"5px"}:E.choiceDisabled?E.choiceDisabledStyle??{color:"var(--solidjsSelectDisabledFontColor, darkgray)","background-color":"var(--solidjsSelectDisabledBackgroundColor)","background-image":"var(--solidjsSelectDisabledBackgroundImage)"}:E.isSelected?E.choiceSelectedStyle??{color:"var(--solidjsSelectSelectedFontColor)","background-color":"var(--solidjsSelectSelectedBackgroundColor)","background-image":"var(--solidjsSelectSelectedBackgroundImage)"}:{"background-color":"var(--solidjsSelectBackgroundColor)","background-image":"var(--solidjsSelectChoiceBackgroundImage)"};return(()=>{const O=zA.cloneNode(!0),T=O.firstChild,G=T.nextSibling;return O.$$click=I,D(O,(()=>{const M=J(()=>!!(E.isSelected&&E.selectionType==="Border"));return()=>M()&&[(()=>{const U=JE.cloneNode(!0);return U.style.setProperty("border-left","var(--solidjsSelectSelectedColor,green) 3px solid"),U.style.setProperty("position","absolute"),U.style.setProperty("top","15%"),U.style.setProperty("height","70%"),U})(),(()=>{const U=JE.cloneNode(!0);return U.style.setProperty("margin-left","3px"),U})()]})(),T),D(T,(()=>{const M=J(()=>!!(E.isSelected&&(!E.selectionType||E.selectionType==="Icon")));return()=>M()&&(()=>{const U=JE.cloneNode(!0);return D(U,(()=>{const K=J(()=>!!E.choiceSelectedIcon);return()=>K()?P(E.choiceSelectedIcon,{}):P(jA,{})})()),o(K=>{const W=E.choiceSelectedIconClassName,d=E.choiceSelectedIconStyle??{"font-size":"var(--solidjsSelectSelectedIconSize, large)",color:"var(--solidjsSelectSelectedIconColor, green)"};return W!==K._v$3&&AE(U,K._v$3=W),K._v$4=X(U,d,K._v$4),K},{_v$3:void 0,_v$4:void 0}),U})()})()),G.style.setProperty("margin","2px"),D(G,()=>L(E.item)),o(M=>{const U=E.choiceDisabled?E.choiceDisabledClassName:A()?E.choiceHoverClassName:E.isSelected?E.choiceSelectedClassName:E.choiceClassName,K={"user-select":"none",display:"flex","flex-direction":"row","align-items":"center",position:"relative",border:"var(--solidjsSelectChoiceSelectedIndicatorBorder)",...E.choiceStyle,...N(A())};return U!==M._v$&&AE(O,M._v$=U),M._v$2=X(O,K,M._v$2),M},{_v$:void 0,_v$2:void 0}),O})()};HE(["click"]);const ER=i("<div></div>"),AR=E=>{const[A,R]=e(),[I,L]=e();let N;CE(()=>{R(N?.clientHeight),L(N?.clientWidth)});const O=(T,G,M,U,K)=>{switch(T){case"above":return{top:U?`-${U+5}px`:"-120%",left:"0px",width:`${G??80}px`};case"left":return{top:"0px",left:G?`${G+5}px`:"110%","max-width":`${G??80}px`};case"right":return{top:"0px",left:K?`-${K+5}px`:"-90px","max-width":`${G??80}px`};default:return{top:M?`${M+5}px`:"120%",left:"0%",width:`${G??80}px`}}};return(()=>{const T=ER.cloneNode(!0),G=N;return typeof G=="function"?TE(G,T):N=T,D(T,()=>E.tip),o(M=>{const U=E.toolTipClassName,K={position:"absolute","z-index":999,padding:"3px",color:"var(--solidjsSelectToolTipFontColor, black)","font-weight":"var(--solidjsSelectToolTipFontWeight)","font-family":"var(--solidjsSelectFontFamily)","font-size":"var(--solidjsSelectToolTipFontSize, small)","font-style":"var(--solidjsSelectToolTipFontStyle)","border-radius":"5px","text-align":"var(--solidjsSelectToolTipTextAlign, center)",border:"var(--solidjsSelectToolTipBorder)","background-color":"var(--solidjsSelectToolTipBackgroundColor, white)","background-image":"var(--solidjsSelectToolTipBackgroundImage)",...E.toolTipStyle,...O(E.toolTipPosition??"below",E.parentWidth,E.parentHeight,A(),I())};return U!==M._v$&&AE(T,M._v$=U),M._v$2=X(T,K,M._v$2),M},{_v$:void 0,_v$2:void 0}),T})()},RR=i("<p></p>"),NR=E=>{const A=E.selected.length===0&&(!E.choicesShown||!E.selectType||E.selectType==="switch")?{"font-weight":"var(--solidjsSelectTitleFontWeight, 100)"}:{"font-weight":"var(--solidjsSelectSelectedItemFontWeight, bold)"},R=E.disabled?E.displayDisabledStyle??{color:"var(--solidjsSelectDisabledFontColor, darkgray)"}:E.displayStyle??{};return(()=>{const I=RR.cloneNode(!0);return D(I,()=>E.selected.length===0&&(!E.choicesShown||!E.selectType||E.selectType==="switch")?E.title:E.text),o(L=>{const N=E.disabled?E.displayDisabledClassName:E.displayClassName,O={"margin-left":"3px","margin-block-start":"0px","margin-block-end":"0px","-moz-user-select":"none","-webkit-user-select":"none","-ms-user-select":"none","user-select":"none",...E.displayStyle,...A,...R};return N!==L._v$&&AE(I,L._v$=N),L._v$2=X(I,O,L._v$2),L},{_v$:void 0,_v$2:void 0}),I})()},CA=()=>{const E=()=>Math.floor((1+Math.random())*65536).toString(16).substring(1);return`${E()}${E()}-${E()}-${E()}-${E()}-${E()}${E()}${E()}`},IR=20,LR=(E,A,R,I,L,N,O,T,G,M,U,K,W,d,n,F,c,m,l,r,u,z)=>{const C={getItemText:S=>{try{return S.text??(E.itemText?E.itemText(S):S)}catch(H){console.log(`Object type either does not implement Choice, the property getters (itemText | itemValue) or is not a string, error: ${p(H)}`)}return""},getItemValue:S=>{try{return S.value??(E.itemValue?E.itemValue(S):S)}catch(H){console.log(`Object type either does not implement Choice, the property getter (itemText) or is not a string, error: ${p(H)}`)}return""},getItemValueString:S=>{try{const H=S.value??(E.itemValue?E.itemValue(S):S);return typeof H=="string"?H:H.toString()}catch(H){console.log(`Object type either does not implement Choice, the property getter (itemValue) or is not a string, error: ${p(H)}`)}return""},isDisabled:S=>{try{return S.disabled??(E.itemDisabled?E.itemDisabled(S):!1)}catch(H){console.log(`Object type either does not implement Choice, the property getter (disabled) or is not a string, error: ${p(H)}`)}return!1},toolTipLimit:()=>E.toolTipValueLimit??IR,onChange:S=>{E.onChange&&E.onChange([...S])},fetchChoices:S=>{if(E.typeAheadLookUp&&(S!==""||!E.noEmptyStringLookUp)){if(n(void 0),r())try{const B=r()?.getCachedItems(S);if(B){C.updateChoices(B);return}}catch(B){console.log(`Failed to fetch items from cache, reason: ${p(B)}`)}const H=CA();l(H),E.typeAheadLookUp(S,M()).then(B=>{try{r()&&r()?.cacheItems(S,B),H===m()&&C.updateChoices(B)}catch(a){console.log(`Failed to fetch items from item source, reason: ${p(a)}`)}})}},shouldFilter:S=>C.getMatchItem(S).includes(E.caseSensitive?L():L()?.toLowerCase()),getVisibleChoices:()=>{try{return!d()&&!E.choices?M():M().filter(S=>!L()||C.shouldFilter(S)).concat((d()??E.choices??[]).filter(S=>M().indexOf(S)===-1&&(!L()||C.shouldFilter(S))))}catch(S){console.log(`Failed to get visible choices, reason: ${p(S)}`)}return[]},updateDisplayText:()=>{try{I(C.getDisplayText(M())),R(C.getCaption(M()))}catch(S){console.log(`Failed to fetch update display text, reason: ${p(S)}`)}},updateVisibleChoices:()=>{const S=C.getVisibleChoices();W(S),K().length===0?C.adjustHighlightedIndex(-1):F()>=K().length?C.adjustHighlightedIndex(K().length-1):F()===-1&&C.adjustHighlightedIndex(0),C.updateDisplayText()},updateChoices:S=>{n(S),C.updateVisibleChoices()},updateSelected:()=>{C.onChange(M()),C.updateVisibleChoices()},hideList:()=>{T(!1)},showList:()=>{n(void 0),N(""),C.updateVisibleChoices(),T(!0),C.hideToolTip()},clickedAway:S=>{if(!(!O()||z()))try{const H=document.getElementById("csInput"+A),B=document.getElementById("csList"+A);S.target!==null&&!H?.contains(S.target)&&!B?.contains(S.target)&&C.hideList()}catch(H){console.log(`Failed to handle click away, reason: ${p(H)}`)}},textInputClicked:()=>{if(!E.disabled&&!O()){if(E.selectType==="switch"){try{if(E.choices){var S=M().length>0?E.choices.indexOf(M()[0])+1:0;S+1>E.choices.length&&(S=0),U([E.choices[S]]),C.updateSelected()}}catch(H){console.log(`Failed to switch to next item, reason: ${p(H)}`)}return}N(""),E.typeAheadLookUp?C.fetchChoices(""):C.updateVisibleChoices(),C.showList()}},textChanged:S=>{const H=S.target.value;N(H),E.typeAheadLookUp?C.fetchChoices(H):C.updateVisibleChoices()},itemClicked:S=>{M().includes(S)?C.deselectItem(S):C.selectItem(S)},selectItem:S=>{(E.maximumSelections===1&&(E.minimumSelections===1||E.selectType==="dropdown")||E.hideListOnSelect)&&C.hideList(),!E.maximumSelections||M().length<E.maximumSelections?(M().push(S),U([...M()]),C.updateSelected()):E.maximumSelections===1&&(U([S]),C.updateSelected())},deselectItem:S=>{try{if(M().length>(E.minimumSelections??0)){const H=M().indexOf(S);M().splice(H,1),U([...M()]),E.hideListOnSelect&&C.hideList(),C.updateSelected()}}catch(H){console.log(`Failed to de selecte item, reason: ${p(H)}`)}},clearSelection:S=>{E.disabled||(U([]),C.updateSelected(),S.stopPropagation())},makeItemVisible:S=>{const H=u();H&&H.scrollToItem(S)},adjustHighlightedIndex:S=>{S!==-1&&C.makeItemVisible(S),c(S)},inputKeyPressed:S=>{try{switch(S.code){case"ArrowDown":if(O()&&K().length>0){const H=F()===-1||F()>=K().length-1?0:F()+1;C.adjustHighlightedIndex(H)}S.preventDefault();break;case"ArrowUp":if(O()&&K().length>0){const H=F()<=0?K().length-1:F()-1;C.adjustHighlightedIndex(H)}S.preventDefault();break;case"Home":O()&&K().length>0&&C.adjustHighlightedIndex(0),S.preventDefault();break;case"End":if(O()&&K().length>0){const H=K().length-1;C.adjustHighlightedIndex(H)}S.preventDefault();break;case"PageDown":if(O()&&K().length>0){const H=F()===-1||F()>=K().length-10?0:F()+10;C.adjustHighlightedIndex(H)}S.preventDefault();break;case"PageUp":if(O()&&K().length>0){const H=F()===-1||F()<=10?K().length-1:F()-10;C.adjustHighlightedIndex(H)}S.preventDefault();break;case"NumpadEnter":case"Enter":F()>-1&&F()<K().length&&(M().indexOf(K()[F()])===-1?C.selectItem(K()[F()]):C.deselectItem(K()[F()]),E.clearInputOnSelect&&N("")),S.preventDefault();break}}catch(H){console.log(`Failed to hanle key press, reason: ${p(H)}`)}},pasteText:S=>{try{const H=S.clipboardData?.getData("text");if(!H||H.indexOf(",")===-1)return;S.preventDefault();const B=H.split(",").map(a=>a.trim());if(E.choices&&E.choices.length>0){const a=E.caseSensitive?B:B.map(b=>b.toLowerCase()),t=M().concat(E.choices.filter(b=>a.indexOf(E.caseSensitive?C.getItemValueString(b):C.getItemValueString(b).toLowerCase())!==-1&&M().indexOf(b)===-1));E.maximumSelections&&t.length>=E.maximumSelections&&t.splice(E.maximumSelections),U(t),C.updateSelected()}else E.itemSearch&&E.itemSearch(B).then(a=>{const t=M().concat(a.filter(b=>!M().find(y=>C.getItemValue(y)===C.getItemValue(b))));E.maximumSelections&&t.length>=E.maximumSelections&&t.splice(E.maximumSelections),U(t),C.updateSelected()})}catch(H){console.log(`Failed to paste items, reason: ${p(H)}`)}},checkToolTip:()=>{O()||G(!0)},hideToolTip:()=>{G(!1)},getDisplayText:S=>{try{return S.length>1?`${S.length} items`:S.length===1?C.getItemText(S[0]):""}catch(H){return console.log(`Failed to fetch display text, reason: ${p(H)}`),""}},getCaption:S=>{try{return S.length>1?S.slice(0,C.toolTipLimit()).map(H=>C.getItemText(H)).join(", ")+(S.length>C.toolTipLimit()?` + ${S.length-C.toolTipLimit()} more items`:""):""}catch(H){return console.log(`Failed to fetch caption text, reason: ${p(H)}`),""}},getMatchItem:S=>E.caseSensitive?C.getItemText(S):C.getItemText(S).toLowerCase()};return C},wE=new Map,OR=(E,A,R)=>{const I=wE.get(E);if(I)return I;const L=new Map,O=A?setInterval(G=>{const M=new Date(Date.now());M.setSeconds(M.getSeconds()-G),Array.from(L).filter(U=>U[1].created<M).forEach(U=>L.delete(U[0]))},R?R*1e3:5*60*1e3,A):void 0,T={itemCache:L,getCachedItems:G=>L.get(G)?.items,cacheItems:(G,M)=>{L.set(G,{created:new Date(Date.now()),items:M})},dispose:()=>{O&&clearInterval(O),L.clear()}};return wE.set(E,T),T},v="Vertical",oE="Horizontal",SR=i("<canvas></canvas>"),TR=E=>{const I=E.hideArrows?0:17,L=E.hideArrows?0:17*2;let N;const O=J(()=>({position:E.hideArrows?0:17,item:0,thumbSize:0,itemsPerThumb:0,tracking:!1,hover:"None",orientation:v,itemCount:0})),[T,G]=e(0);CE(()=>{if(document.addEventListener("mousedown",W,!0),document.addEventListener("mouseup",d,!0),document.addEventListener("mousemove",m,!0),E.ref){const C={scrollToItem:H=>{N&&(console.log(`${O().item} =  ${H}`),H!==O().item&&(console.log(`scrolling to ${H}`),K(H,N.height,N.width)))}},S=E.ref&&E.ref;S?S(C):E.ref=C}}),NA(async()=>{document.removeEventListener("mousedown",W,!0),document.removeEventListener("mouseup",d,!0),document.removeEventListener("mousemove",m,!0)});const M=()=>{if(N){N.height=N.clientHeight,N.width=N.clientWidth;const C=E.orientation===v?N.height:N.width;O().thumbSize=Math.floor((C-L)/(E.itemCount-(E.itemsPerPage??1)+1))<10?10:Math.floor((C-L)/(E.itemCount-(E.itemsPerPage??1)+1)),O().itemsPerThumb=(E.itemCount-(E.itemsPerPage??1))/(C-O().thumbSize-L)}};KE(()=>{(E.orientation!==O().orientation||E.itemCount!==O().itemCount||E.itemsPerPage!==O().itemsPerPage)&&(O().orientation=E.orientation,O().itemCount=E.itemCount,O().itemsPerPage=E.itemsPerPage,setTimeout(()=>{M(),G(performance.now()),O().item>=E.itemCount&&setTimeout(()=>{N&&K(E.itemCount-1,N.height,N.width)},1)},1))}),KE(()=>{r(T())});const U=C=>{O().repeatingTimeInterval=200;const S=()=>{if(C()){const H=O().repeatingTimeInterval;H&&(O().repeatingTimeInterval=H>5?H-5:5,setTimeout(S,H))}};setTimeout(S,O().repeatingTimeInterval)},K=(C,S,H)=>{O().item=C;const B=E.orientation===v?S:H;O().position=Math.ceil((B-O().thumbSize-L)/(E.itemCount-(E.itemsPerPage??1))*C+I),G(performance.now()),E.onScroll(C)},W=C=>{if(N){const S=C.clientY-N.getClientRects()[0].top,H=C.clientX-N.getClientRects()[0].left,B=N;!E.hideArrows&&n(H,S,N.clientHeight,N.clientWidth)?(U(()=>O().item>0?(K(O().item-1,B.height,B.width),!0):!1),C.preventDefault(),C.stopImmediatePropagation()):!E.hideArrows&&F(H,S,N.clientHeight,N.clientWidth)?(U(()=>O().item+(E.itemsPerPage??1)<E.itemCount?(K(O().item+1,B.height,B.width),!0):!1),C.preventDefault(),C.stopImmediatePropagation()):C.target!==null&&N.contains(C.target)===!0&&(O().tracking=!0,E.onTracking&&E.onTracking(!0),C.preventDefault(),C.stopImmediatePropagation())}},d=C=>{O().tracking&&(m(C),C.preventDefault(),C.stopImmediatePropagation(),setTimeout(()=>{E.onTracking&&E.onTracking(!1)},10)),O().repeatingTimeInterval&&(O().repeatingTimeInterval=void 0,C.preventDefault(),C.stopImmediatePropagation()),O().tracking=!1},n=(C,S,H,B)=>E.orientation===v&&S>0&&S<=17&&C>0&&C<B||E.orientation===oE&&C>0&&C<=17&&S>0&&S<H,F=(C,S,H,B)=>E.orientation===v&&S<H&&S>=H-17&&C>0&&C<B||E.orientation===oE&&C<B&&C>=B-17&&S>0&&S<H,c=(C,S,H,B)=>E.orientation===v&&S>O().position&&S<=O().position+O().thumbSize&&C>0&&C<B||E.orientation===oE&&C>O().position&&C<=O().position+O().thumbSize&&S>0&&S<H,m=C=>{if(N){let S=!1;if(O().hover!=="None"&&(!O().tracking||O().hover!=="Thumb")&&(O().hover="None",S=!0),O().tracking){const H=O().position;let B=O().position=(E.orientation===v?C.clientY-N.getClientRects()[0].top:C.clientX-N.getClientRects()[0].left)-O().thumbSize;B<I?O().position=I:B+O().thumbSize>(E.orientation===v?N.clientHeight:N.clientWidth)-I?O().position=(E.orientation===v?N.clientHeight:N.clientWidth)-O().thumbSize-I:O().position=B,H!==O().position&&(O().item=Math.round((O().position-I)*O().itemsPerThumb)>=E.itemCount-(E.itemsPerPage??1)?E.itemCount-(E.itemsPerPage??1):Math.round((O().position-I)*O().itemsPerThumb),O().timer&&clearTimeout(O().timer),O().timer=setTimeout(()=>E.onScroll(O().item),2),G(performance.now())),C.preventDefault(),C.stopImmediatePropagation()}else{const H=C.clientY-N.getClientRects()[0].top,B=C.clientX-N.getClientRects()[0].left;let a=!1;if(c(B,H,N.clientHeight,N.clientWidth)?(O().hover="Thumb",a=!0):!E.hideArrows&&n(B,H,N.clientHeight,N.clientWidth)&&O().item>0?(O().hover="Up",a=!0):!E.hideArrows&&F(B,H,N.clientHeight,N.clientWidth)&&O().item<E.itemCount-(E.itemsPerPage??1)&&(O().hover="Down",a=!0),a){G(performance.now()),C.preventDefault(),C.stopImmediatePropagation();return}}S&&G(performance.now())}},l=C=>{const H=getComputedStyle(document.documentElement).getPropertyValue(C).trim();return H===""?void 0:H},r=C=>{if(N){const S=N.getContext("2d");if(S){const H=l("--scrollbarColor")??"white",B=l("--scrollbarArrowColor")??"#6f6e6e",a=l("--scrollbarArrowHoverColor")??"#6f6e6e",t=l("--scrollbarArrowHoverBackground")??"#a9a9a9",b=l("--scrollbarThumbColor")??"#a9a9a9",y=l("--scrollbarThumbHoverColor")??"#6f6e6e";S.fillStyle=H,S.fillRect(0,0,N.clientWidth,N.height),S.fillStyle=O().hover==="Thumb"?y:b,E.orientation===v?S.fillRect(2,O().position,N.clientWidth-4,O().thumbSize):S.fillRect(O().position,2,O().thumbSize-4,N.clientHeight),E.hideArrows||O().hover==="Up"&&(S.fillStyle=t,E.orientation===v?S.fillRect(0,0,N.clientWidth,15):S.fillRect(0,0,15,N.clientHeight)),E.hideArrows||O().hover==="Down"&&(S.fillStyle=t,E.orientation===v?S.fillRect(0,N.clientHeight-15,N.clientWidth,N.clientHeight):S.fillRect(N.clientWidth-15,0,N.clientWidth,N.clientHeight)),E.hideArrows||(S.beginPath(),E.orientation===v?(S.moveTo(N.clientWidth/2,5),S.lineTo(N.clientWidth/2+3,10),S.lineTo(N.clientWidth/2-3,10)):(S.moveTo(5,N.clientHeight/2),S.lineTo(10,N.clientHeight/2+3),S.lineTo(10,N.clientHeight/2-3)),S.closePath(),S.lineWidth=1,S.strokeStyle=O().hover==="Up"?a:B,S.stroke(),S.fillStyle=O().hover==="Up"?a:B,S.fill(),S.beginPath(),E.orientation===v?(S.moveTo(N.clientWidth/2,N.clientHeight-5),S.lineTo(N.clientWidth/2+3,N.clientHeight-10),S.lineTo(N.clientWidth/2-3,N.clientHeight-10)):(S.moveTo(N.clientWidth-5,N.clientHeight/2),S.lineTo(N.clientWidth-10,N.clientHeight/2+3),S.lineTo(N.clientWidth-10,N.clientHeight/2-3)),S.closePath(),S.lineWidth=1,S.strokeStyle=O().hover==="Down"?a:B,S.stroke(),S.fillStyle=O().hover==="Down"?a:B,S.fill())}}},u={width:E.width??"20px",height:"100%"},z={height:E.width??"20px",width:"100%"};return(()=>{const C=SR.cloneNode(!0),S=N;return typeof S=="function"?TE(S,C):N=C,o(H=>X(C,E.orientation===v?u:z,H)),C})()},CR=i("<div><div><div></div></div></div>"),$E=i("<div></div>"),HA=E=>{let A;const[R,I]=e(),[L,N]=e(0),[O,T]=e(0),[G,M]=e([]),[U,K]=e(),[W,d]=e(E.itemSize??20);CE(()=>{if(F(E.orientation,E.items,W()),E.ref){const S={scrollToItem:B=>{if(R()){if(B<L())R()?.scrollToItem(B);else if(B>=L()+O()-1)if(console.log("showing"),B>=E.items.length-O()-1){const a=E.items.length-O();console.log(`To ${a}`),a!==L()&&R()?.scrollToItem(a)}else{const a=L()+(B-(L()+O()-1));R()?.scrollToItem(a)}}}},H=E.ref&&E.ref;H?H(S):E.ref=S}});const n=S=>{if(A){const H=U()??(E.orientation===v?A.clientHeight:A.clientWidth)??0,B=W()??5,a=Math.floor(H/(B+2))+2,t=E.items.slice(S,S+a).map((b,y)=>({index:S+y,item:b}));(t.length!==G().length||t.length>0&&t[0].item!==G()[0])&&M(t)}},F=(S,H,B)=>{if(A){const a=(S===v?A.clientHeight:A.clientWidth)??0;B&&(B+2)*H.length<a&&K((B+2)*H.length);const t=U();t&&B&&(B+2)*H.length>t&&K(void 0);const b=B?Math.floor((U()??a)/(B+2)):1;T(b),setTimeout(()=>{n(L())},1)}};KE(()=>{F(E.orientation,E.items,W())});const c=S=>{N(S),n(S)},m=S=>{setTimeout(()=>{E.orientation===v?S.clientHeight!=0&&S.clientHeight!=W()&&d(S.clientHeight):!E.itemSize&&S.clientWidth!=0&&S.clientWidth!=W()&&d(S.clientWidth)},1)},l={flex:"1",display:"flex","flex-direction":"column","row-gap":"2px",overflow:"hidden"},r={flex:"1",display:"flex","flex-direction":"row","column-gap":"2px",overflow:"hidden"},u={display:"flex",overflow:"hidden","flex-direction":"row",height:"100%",width:"100%"},z={display:"flex",overflow:"hidden","flex-direction":"column",width:"100%",height:"100%"},C=(S,H,B)=>S===v?{height:H?`${B??H}px`:"100%",width:"100%"}:{width:H?`${B??H}px`:"100%",height:"100%"};return(()=>{const S=CR.cloneNode(!0),H=S.firstChild,B=H.firstChild,a=A;return typeof a=="function"?TE(a,H):A=H,D(B,()=>G().map((t,b)=>b===0?(()=>{const y=$E.cloneNode(!0);return TE(m,y),D(y,()=>E.render(t.item,t.index)),y})():(()=>{const y=$E.cloneNode(!0);return D(y,()=>E.render(t.item,t.index)),y})())),D(H,(()=>{const t=J(()=>!U());return()=>t()&&P(TR,{ref:I,get orientation(){return E.orientation},get itemCount(){return E.items.length},get itemsPerPage(){return O()},onScroll:c,get hideArrows(){return E.hideArrows},onTracking:b=>{E.onTracking&&E.onTracking(b)}})})(),null),o(t=>{const b=C(E.orientation,E.listSize,U()),y=E.orientation===v?u:z,dE=E.orientation===v?l:r;return t._v$=X(S,b,t._v$),t._v$2=X(H,y,t._v$2),t._v$3=X(B,dE,t._v$3),t},{_v$:void 0,_v$2:void 0,_v$3:void 0}),S})()},HR=i("<p></p>"),MR=E=>{const[A,R]=e(0);let I;CE(()=>{R(I?.clientHeight??0)});const L=N=>N?{color:"var(--solidjsSelectDisabledFontColor, darkgray)"}:{};return(()=>{const N=HR.cloneNode(!0),O=I;return typeof O=="function"?TE(O,N):I=N,D(N,()=>E.title),o(T=>{const G=E.disabled?E.titleDisabledClassName:E.titleClassName,M={position:"absolute",top:A()!==0?`-${A()+1}px`:"-15px","font-size":"var(--solidjsSelectTitleFontSize, small)","font-weight":"var(--solidjsSelectTitleFontWeight, 100)","margin-block-start":"0px","margin-block-end":"0px",...E.titleStyle,...L(E.disabled)};return G!==T._v$&&AE(N,T._v$=G),T._v$2=X(N,M,T._v$2),T},{_v$:void 0,_v$2:void 0}),N})()},PE=i("<div></div>"),DR=i("<div><div><div><div></div></div></div></div>"),UR=i('<input autocapitalize="off" autocomplete="off">'),kE=i("<p></p>"),MA=E=>{let A;const R=CA(),I=Y=>{try{return Y.selectType==="switch"||Y.maximumSelections===1&&Y.minimumSelections===1?Y.selected&&Array.isArray(Y.selected)&&Y.selected.length>0?[Y.selected[0]]:Y.selected&&typeof Y.selected=="string"?[Y.selected]:Y.choices&&Y.choices.length>0?[Y.choices[0]]:[]:Y.selected&&Array.isArray(Y.selected)?Y.selected:Y.selected&&!Array.isArray(Y.selected)?[Y.selected]:[]}catch(f){console.log(`Failed to fetch selection, reason: ${p(f)}`)}return[]},[L,N]=e(),[O,T]=e(!1),[G,M]=e(I(E)),[U,K]=e(""),[W,d]=e(""),[n,F]=e(""),[c,m]=e(!1),[l,r]=e(!1),[u,z]=e([]),[C,S]=e(),[H,B]=e(0),[a,t]=e(""),[b,y]=e(!1),dE=J(()=>E.cacheLookUp?OR(E.title,E.cacheTimeToLive,E.cacheExpiryCheck):void 0),j=J(()=>LR(E,R,K,d,n,F,c,m,r,G,M,u,z,C,S,H,B,a,t,dE,L,b));CE(()=>{document.addEventListener("mouseup",j().clickedAway,!0),j().updateDisplayText()}),NA(()=>{document.removeEventListener("mouseup",j().clickedAway,!0)});const UA=()=>{T(!0)},KA=()=>{T(!1)},GA=Y=>{setTimeout(()=>{Y&&Y.focus()},10)},BA=()=>A?`${A.clientWidth}px`:void 0,PA=()=>A?`${A.clientHeight+4}px`:void 0,vE=(Y,f,k)=>({itemText:E.itemText,item:Y,index:f,isSelected:k,highlightedIndex:H,onItemClicked:j().itemClicked,choiceDisabled:j().isDisabled(Y),...E}),YA=(Y,f,k)=>E.choiceComponent?(()=>{const ME=PE.cloneNode(!0);return D(ME,()=>E.choiceComponent({...vE(Y,f,k)})),ME})():P(qA,UE(()=>vE(Y,f,k))),FA=()=>E.toolTipComponent?E.toolTipComponent({parentHeight:A?.clientHeight,parentWidth:A?.clientWidth,tip:U(),...E}):P(AR,UE({get parentHeight(){return A?.clientHeight},get parentWidth(){return A?.clientWidth},get tip(){return U()}},E)),WA=Y=>Y?{"background-color":"var(--solidjsSelectDisabledBackgroundColor, Gainsboro)","background-image":"var(--solidjsSelectDisabledBackgroundImage)"}:{"background-color":"var(--solidjsSelectBackgroundColor, white)","background-image":"var(--solidjsSelectBackgroundImage)"},ZA=(Y,f,k)=>Y?f??{color:"var(--solidjsSelectDisabledFontColor)"}:k??{},eA=(Y,f)=>Y?f??{color:"var(--solidjsSelectDisabledFontColor, darkgray)"}:O()?{color:"var(--solidjsSelectFontColor, darkgray)"}:{},VA=(Y,f)=>Y?f??{color:"var(--solidjsSelectDisabledFontColor, darkgray)"}:{};return(()=>{const Y=DR.cloneNode(!0),f=Y.firstChild,k=f.firstChild,ME=k.firstChild,xE=A;return typeof xE=="function"?TE(xE,Y):A=Y,IE(Y,"click",j().textInputClicked,!0),IE(Y,"paste",j().pasteText),IE(Y,"mouseleave",j().hideToolTip),IE(Y,"mouseenter",j().checkToolTip),D(Y,(()=>{const g=J(()=>!!(l()&&U()!==""));return()=>g()&&FA()})(),f),f.style.setProperty("display","flex"),f.style.setProperty("flex-direction","row"),f.style.setProperty("align-items","center"),f.style.setProperty("width","100%"),D(f,(()=>{const g=J(()=>(!E.maximumSelections||E.maximumSelections<1)&&G().length>0&&E.selectType!=="switch");return()=>g()&&(()=>{const V=PE.cloneNode(!0);return V.addEventListener("mouseleave",KA),V.addEventListener("mouseenter",UA),IE(V,"click",j().clearSelection,!0),D(V,(()=>{const Z=J(()=>!!E.clearSelectionIcon);return()=>Z()?P(E.clearSelectionIcon,{}):P(_A,{})})()),o(Z=>{const x=E.disabled?E.clearSelectionDisabledClassName:E.clearSelectionClassName,q={"font-size":"var(--solidjsSelectClearSelectionIconSize, small)","align-content":"center",display:"flex",color:"var(--solidjsSelectFontColor, black)",...E.clearSelectionStyle,...eA(E.disabled,E.clearSelectionDisabledStyle)};return x!==Z._v$3&&AE(V,Z._v$3=x),Z._v$4=X(V,q,Z._v$4),Z},{_v$3:void 0,_v$4:void 0}),V})()})(),k),k.style.setProperty("display","flex"),k.style.setProperty("flex-direction","row"),k.style.setProperty("align-items","center"),k.style.setProperty("flex","1"),ME.style.setProperty("flex","1"),ME.style.setProperty("flex-basis","100%"),D(ME,(()=>{const g=J(()=>!!(c()&&(!E.selectType||E.selectType==="standard")));return()=>g()?(()=>{const V=UR.cloneNode(!0);return IE(V,"keydown",j().inputKeyPressed,!0),IE(V,"input",j().textChanged,!0),TE(GA,V),_(V,"id","csInput"+R),_(V,"spellcheck",!1),o(Z=>{const x=E.disabled?E.inputDisabledClassName:E.inputClassName,q={"margin-left":"3px","background-color":"transparent",border:"none","max-width":"var(--solidjsSelectInputTextMaxWidth,100%)",color:"var(--solidjsSelectFontColor, black)",width:"100%",outline:"none",...E.inputStyle,...VA(E.disabled,E.inputDisabledStyle)},OE=c()&&n()===""?W():void 0,QE=E.disabled;return x!==Z._v$5&&AE(V,Z._v$5=x),Z._v$6=X(V,q,Z._v$6),OE!==Z._v$7&&_(V,"placeholder",Z._v$7=OE),QE!==Z._v$8&&(V.disabled=Z._v$8=QE),Z},{_v$5:void 0,_v$6:void 0,_v$7:void 0,_v$8:void 0}),o(()=>V.value=c()?n():W()===""?E.title:W()),V})():(()=>{const V=J(()=>!!E.displayComponent);return()=>V()?E.displayComponent({title:E.title,text:W(),choicesShown:c(),selected:G(),selectType:E.selectType,disabled:E.disabled,...E}):P(NR,UE({get title(){return E.title},get text(){return W()},get choicesShown(){return c()},get selected(){return G()},get selectType(){return E.selectType},get disabled(){return E.disabled}},E))})()})()),D(k,(()=>{const g=J(()=>!E.hideDropdownIcon&&E.selectType!=="switch");return()=>g()&&(()=>{const V=PE.cloneNode(!0);return D(V,(()=>{const Z=J(()=>!!E.dropdownIcon);return()=>Z()?P(E.dropdownIcon,{}):P(kA,{})})()),o(Z=>{const x=E.disabled?E.dropIconDisabledClassName:E.dropIconClassName,q={"font-size":"var(--solidjsSelectDropDownIconSize, small)",...ZA(E.disabled,E.dropdownIconDisabledStyle,E.dropdownIconStyle)};return x!==Z._v$9&&AE(V,Z._v$9=x),Z._v$10=X(V,q,Z._v$10),Z},{_v$9:void 0,_v$10:void 0}),V})()})(),null),D(f,(()=>{const g=J(()=>!!((c()||W()!=="")&&!E.hideTitle));return()=>g()&&P(MR,UE({get title(){return E.title},get disabled(){return E.disabled}},E))})(),null),D(f,(()=>{const g=J(()=>!!(!E.disabled&&c()));return()=>g()&&(()=>{const V=PE.cloneNode(!0);return _(V,"id","csList"+R),D(V,(()=>{const Z=J(()=>u().length>0);return()=>Z()&&P(HA,{ref:N,orientation:"Vertical",get items(){return u()},get listSize(){return E.maxListHeight??300},onTracking:y,render:(x,q)=>(()=>{const OE=PE.cloneNode(!0);return OE.$$mouseover=()=>j().adjustHighlightedIndex(q),_(OE,"id",`item_${q}`),D(OE,()=>YA(x,q,G().includes(x))),OE})()})})(),null),D(V,(()=>{const Z=J(()=>u().length===0&&!E.choices&&!C());return()=>Z()&&(()=>{const x=kE.cloneNode(!0);return D(x,()=>E.loadingText??"Loading..."),x})()})(),null),D(V,(()=>{const Z=J(()=>!!(E.choices?.length===0&&C()));return()=>Z()&&(()=>{const x=kE.cloneNode(!0);return D(x,()=>E.noItemText??"No items."),x})()})(),null),o(Z=>{const x=E.choiceListClassName,q={"max-height":E.maxListHeight?`${E.maxListHeight}px`:"300px",position:"absolute",top:PA()??"30px",width:BA()??"-webkit-fill-available",overflow:"auto","border-radius":"5px","z-index":1,border:"var(--solidjsSelectBorder, 2px solid WhiteSmoke)","background-color":"var(--solidjsSelectBackgroundColor, white)","background-image":"var(--solidjsSelectBackgroundImage)",...E.choiceListStyle};return x!==Z._v$11&&AE(V,Z._v$11=x),Z._v$12=X(V,q,Z._v$12),Z},{_v$11:void 0,_v$12:void 0}),V})()})(),null),o(g=>{const V=E.disabled?E.disabledClassName:E.className,Z={height:E.height,"min-height":E.minHeight,"max-height":E.maxHeight,width:E.width,"min-width":E.minWidth,"max-width":E.maxWidth,display:"flex","flex-direction":"row","align-items":"center",position:"relative","font-weight":"var(--solidjsSelectFontWeight)","font-family":"var(--solidjsSelectFontFamily)","font-size":"var(--solidjsSelectFontSize)","font-style":"var(--solidjsSelectFontStyle)",color:"var(--solidjsSelectFontColor, black)","border-radius":"5px",border:"var(--solidjsSelectBorder, 2px solid WhiteSmoke)",...E.style,...WA(E.disabled)};return V!==g._v$&&AE(Y,g._v$=V),g._v$2=X(Y,Z,g._v$2),g},{_v$:void 0,_v$2:void 0}),Y})()};HE(["click","input","keydown","mouseover"]);const KR=i(`<div class="started"><div><h2 class="no-space-after">Getting Started</h2><p>Install SolidJs-Select by npm i --save solidjs-select or yarn add solidjs-select Add the control to your projec</p><pre>import SolidJsSelect from "solidjs-select";
 
 &lt;SolidJsSelect
 	title="title"
 	choices=<!>
import { choices } from "./data";
import "./styles.css";

export default function App() {
  return (
    <div class="Space">
      <SolidJsSelect
        title="test"
        choices={choices}
      />
    </div>
  );
}`,sandbox:"https://codesandbox.io/s/string-binding-9jlrb0"}),null),D(E,P(s,{title:"Object binding",description:"Binding to an array of JSON objects is possible, but requires itemValue and itemText properties to be supplied..",props:{width:"300px",title:"Object Bind",choices:eE,itemValue:A=>A.name,itemText:A=>A.name,itemDisabled:A=>A.disabled},code:`import SolidJsSelect from "compact-select";
import { objectChoices } from "./data";
import "./styles.css";

export default function App() {
  return (
    <div class="Space">
      <SolidJsSelect
        title="test"
        choices={objectChoices}
        itemValue={(item) => item.name} 
        itemText={(item) => item.name}
        itemDisabled={(item) => item.disabled}
      />
    </div>
  );
}`,sandbox:"https://codesandbox.io/s/object-binding-forked-d54u70"}),null),D(E,P(s,{title:"Typed object binding",description:"If the objects support the choice interface, then the itemValue and itemText properties are not required.",props:{width:"300px",title:"Typed Bind",choices:jE},code:`import SolidJsSelect from "compact-select";
import { typedObjectChoices } from "./data";
import "./styles.css";

export default function App() {
return (
<div class="Space">
  <SolidJsSelect
    title="test"
    choices={typedObjectChoices}
  />
</div>
);
}`,sandbox:"https://codesandbox.io/s/typed-binding-cdhsme"}),null),E})()},{name:"Single selection",demo:()=>(()=>{const E=EE.cloneNode(!0);return D(E,P(s,{title:"Single value",description:"The below example demonstrates a control where the user has to select at least 1 item.",props:{width:"300px",title:"One item",choices:Q,maximumSelections:1,minimumSelections:1},code:`import SolidJsSelect from "compact-select";
import { choices } from "./data";
import "./styles.css";

export default function App() {
  return (
    <div class="Space">
      <SolidJsSelect
        title="test"
        choices={choices},
        maximumSelections={1} 
        minimumSelections={1}
      />
    </div>
  );
}`,sandbox:"https://codesandbox.io/s/simple-single-string-compact-select-j6hpei"}),null),D(E,P(s,{title:"Single or none",description:"It is possible to configure the control to allow the user to select 1 or no items.",props:{width:"300px",title:"One Or None",choices:eE,maximumSelections:1,itemValue:A=>A.name,itemText:A=>A.name},code:`import SolidJsSelect from "compact-select";
import { objectChoices } from "./data";
import "./styles.css";

export default function App() {
  return (
    <div class="Space">
      <SolidJsSelect
        title="test"
        choices={objectChoices}
        maximumSelections={1}
        itemValue={(item) => item.name} 
        itemText={(item) => item.name}
      />
    </div>
  );
}`,sandbox:"https://codesandbox.io/s/simple-single-no-value-compact-select-oskfme"}),null),D(E,P(s,{title:"Single on change",description:"The below example demonstrates listening to the onChange for a single selection.",props:{width:"300px",title:"Single Change",choices:Q,maximumSelections:1,minimumSelections:1},bindSelection:"single",code:`import SolidJsSelect from "compact-select";
          import { useState } from "react";
          import { choices } from "./data";
          import "./styles.css";
          
          export default function App() {
            const [selected, setSelected] = useState<String[]>([]);
            return (
              <div class="Space">
                <SolidJsSelect
                  title="test"
                  choices={choices}
                  selected={selected}
                  maximumSelections={1}
                  minimumSelections={1}
                  onChange={setSelected}
                />
              </div>
            );
          }`,sandbox:"https://codesandbox.io/s/simple-single-string-compact-select-bound-to-sate-tlbmhf"}),null),E})()},{name:"Multi select",demo:()=>(()=>{const E=EE.cloneNode(!0);return D(E,P(s,{title:"Multiple selection",description:"The below example demonstrates a contorl configured for ultimate number of selections.",props:{width:"300px",title:"Multiple",choices:Q},code:`import SolidJsSelect from "compact-select";
import { choices } from "./data";
import "./styles.css";

export default function App() {
  return (
    <div class="Space">
      <SolidJsSelect
        title="test"
        choices={choices}
      />
    </div>
  );
}`,sandbox:"https://codesandbox.io/s/multi-string-compact-select-2wbrc2"}),null),D(E,P(s,{title:"Limited selection",description:"If there is a requirement to limit the number of selections that is possible. In this case the max is 3.",props:{width:"300px",title:"Three Items",choices:eE,maximumSelections:3,itemValue:A=>A.name,itemText:A=>A.name},code:`import SolidJsSelect from "compact-select";
import { objectChoices } from "./data";
import "./styles.css";

export default function App() {
  return (
    <div class="Space">
      <SolidJsSelect
        title="test"
        choices={objectChoices}
        maximumSelections={3}
        itemValue={(item) => item.name} 
        itemText={(item) => item.name}
      />
    </div>
  );
}`,sandbox:"https://codesandbox.io/s/multi-string-compact-select-bound-gr13pq"}),null),D(E,P(s,{title:"Multiple on change",description:"The below example demonstrates listening to the onchange of mutiple selection control.",props:{width:"300px",title:"Multiple Change",choices:Q},bindSelection:"multi",code:`import { useState } from "react";
          import SolidJsSelect from "compact-select";
          import { choices } from "./data";
          import "./styles.css";
          
          export default function App() {
            const [selected, setSelected] = useState<String[]>([]);
            
            return (
              <div class="Space">
                <SolidJsSelect
                  title="test"
                  choices={choices}
                  selected={selected}
                  onChange={setSelected}
                />
              </div>
            );
          }`,sandbox:"https://codesandbox.io/s/multi-string-compact-select-2wbrc2"}),null),E})()},{name:"Font Size",demo:()=>(()=>{const E=EE.cloneNode(!0);return D(E,P(s,{title:"Extra large font",description:"Font size is variable and the control can potentially handle any size. It is also possible to change the tooltip and title size, but hasn't been done for these examples.",fontSize:"x-large",props:{width:"400px",title:"Extra Large Font",choices:Q},code:`import { useState } from "react";
          import SolidJsSelect from "compact-select";
          import { choices } from "./data";
          import "./styles.css";
          
          export default function App() {
            const [selected, setSelected] = useState<String[]>([]);
            
            return (
              <div class="Space">
                <SolidJsSelect
                  title="test"
                  choices={choices}
                  selected={selected}
                  onChange={setSelected}
                />
              </div>
            );
          }`,sandbox:"https://codesandbox.io/s/multi-string-compact-select-2wbrc2"}),null),D(E,P(s,{title:"Large font",description:"Some sizes are better than others.",fontSize:"large",props:{width:"300px",title:"Large Font",choices:Q},code:`import { useState } from "react";
          import SolidJsSelect from "compact-select";
          import { choices } from "./data";
          import "./styles.css";
          
          export default function App() {
            const [selected, setSelected] = useState<String[]>([]);
            
            return (
              <div class="Space">
                <SolidJsSelect
                  title="test"
                  choices={choices}
                  selected={selected}
                  onChange={setSelected}
                />
              </div>
            );
          }`,sandbox:"https://codesandbox.io/s/multi-string-compact-select-2wbrc2"}),null),D(E,P(s,{title:"Meduium font",description:"Meduium font",fontSize:"medium",props:{width:"300px",title:"Meduium Font",choices:Q},code:`import { useState } from "react";
          import SolidJsSelect from "compact-select";
          import { choices } from "./data";
          import "./styles.css";
          
          export default function App() {
            const [selected, setSelected] = useState<String[]>([]);
            
            return (
              <div class="Space">
                <SolidJsSelect
                  title="test"
                  choices={choices}
                  selected={selected}
                  onChange={setSelected}
                />
              </div>
            );
          }`,sandbox:"https://codesandbox.io/s/multi-string-compact-select-2wbrc2"}),null),D(E,P(s,{title:"Small font",description:"Small font",fontSize:"small",props:{width:"300px",title:"Small Font",choices:Q},code:`import SolidJsSelect from "compact-select";
import { objectChoices } from "./data";
import "./styles.css";

export default function App() {
  return (
    <div class="Space">
      <SolidJsSelect
        title="test"
        choices={objectChoices}
        maximumSelections={3}
        itemValue={(item) => item.name} 
        itemText={(item) => item.name}
      />
    </div>
  );
}`,sandbox:"https://codesandbox.io/s/multi-string-compact-select-bound-gr13pq"}),null),D(E,P(s,{title:"Very Small font",description:"Very small font",fontSize:"x-small",props:{width:"300px",title:"Very small font",choices:Q},code:`import SolidJsSelect from "compact-select";
import { choices } from "./data";
import "./styles.css";

export default function App() {
  return (
    <div class="Space">
      <SolidJsSelect
        title="test"
        choices={choices}
      />
    </div>
  );
}`,sandbox:"https://codesandbox.io/s/multi-string-compact-select-2wbrc2"}),null),E})()},{name:"Tooltip",demo:()=>(()=>{const E=EE.cloneNode(!0);return D(E,P(s,{title:"Tooltip default",description:"By default the tooltip is place beneath the control.",props:{width:"400px",title:"Tooltip Default",choices:Q,selected:["Nuala","Sarah","Jane","Dianna"]},code:`import { useState } from "react";
          import SolidJsSelect from "compact-select";
          import { choices } from "./data";
          import "./styles.css";
          
          export default function App() {
            const [selected, setSelected] = useState<String[]>([]);
            
            return (
              <div class="Space">
                <SolidJsSelect
                  title="test"
                  choices={choices}
                  selected={selected}
                  onChange={setSelected}
                />
              </div>
            );
          }`,sandbox:"https://codesandbox.io/s/multi-string-compact-select-2wbrc2"}),null),D(E,P(s,{title:"Tooltip above",description:"It is possible to place the tooltip above.",props:{width:"400px",title:"Tooltip Above",choices:Q,selected:["Nuala","Sarah","Jane","Dianna"],toolTipPosition:"above"},code:`import { useState } from "react";
          import SolidJsSelect from "compact-select";
          import { choices } from "./data";
          import "./styles.css";
          
          export default function App() {
            const [selected, setSelected] = useState<String[]>([]);
            
            return (
              <div class="Space">
                <SolidJsSelect
                  title="test"
                  choices={choices}
                  selected={selected}
                  onChange={setSelected}
                />
              </div>
            );
          }`,sandbox:"https://codesandbox.io/s/multi-string-compact-select-2wbrc2"}),null),D(E,P(s,{title:"Tooltip left",description:"Or to the left of the control.",props:{width:"400px",title:"Tooltip Left",choices:Q,selected:["Nuala","Sarah","Jane","Dianna"],toolTipPosition:"left"},code:`import { useState } from "react";
          import SolidJsSelect from "compact-select";
          import { choices } from "./data";
          import "./styles.css";
          
          export default function App() {
            const [selected, setSelected] = useState<String[]>([]);
            
            return (
              <div class="Space">
                <SolidJsSelect
                  title="test"
                  choices={choices}
                  selected={selected}
                  onChange={setSelected}
                />
              </div>
            );
          }`,sandbox:"https://codesandbox.io/s/multi-string-compact-select-2wbrc2"}),null),D(E,P(s,{title:"Tooltip right",description:"Or to the right of the control. In this instance the tooltip is trimming by the containing div's overflow setting.",props:{width:"400px",title:"Tooltip Right",choices:Q,selected:["Nuala","Sarah","Jane","Dianna"],toolTipPosition:"right"},code:`import { useState } from "react";
          import SolidJsSelect from "compact-select";
          import { choices } from "./data";
          import "./styles.css";
          
          export default function App() {
            const [selected, setSelected] = useState<String[]>([]);
            
            return (
              <div class="Space">
                <SolidJsSelect
                  title="test"
                  choices={choices}
                  selected={selected}
                  onChange={setSelected}
                />
              </div>
            );
          }`,sandbox:"https://codesandbox.io/s/multi-string-compact-select-2wbrc2"}),null),E})()},{name:"Select style",demo:()=>(()=>{const E=EE.cloneNode(!0);return D(E,P(s,{title:"Icon style",description:"There are a few options fot the selection indication. The default is a tick icon, which can be changed.",props:{width:"300px",title:"Icon Style",choices:Q},code:`import SolidJsSelect from "compact-select";
import { choices } from "./data";
import "./styles.css";

export default function App() {
  return (
    <div class="Space">
      <SolidJsSelect
        title="test"
        choices={choices}
      />
    </div>
  );
}`,sandbox:"https://codesandbox.io/s/multi-string-compact-select-2wbrc2"}),null),D(E,P(s,{title:"Border style",description:"If a change of icon isn't what you are after, you can use a border indicator.",props:{width:"300px",title:"Border Style",selectionType:"Border",choices:Q},code:`import SolidJsSelect from "compact-select";
import { objectChoices } from "./data";
import "./styles.css";

export default function App() {
  return (
    <div class="Space">
      <SolidJsSelect
        title="test"
        choices={objectChoices}
        maximumSelections={3}
        itemValue={(item) => item.name} 
        itemText={(item) => item.name}
      />
    </div>
  );
}`,sandbox:"https://codesandbox.io/s/multi-string-compact-select-bound-gr13pq"}),null),D(E,P(s,{title:"Background Style",description:"Or the options background colour.",props:{width:"300px",title:"Background Style",selectionType:"Background",choices:Q},code:`import { useState } from "react";
          import SolidJsSelect from "compact-select";
          import { choices } from "./data";
          import "./styles.css";
          
          export default function App() {
            const [selected, setSelected] = useState<String[]>([]);
            
            return (
              <div class="Space">
                <SolidJsSelect
                  title="test"
                  choices={choices}
                  selected={selected}
                  onChange={setSelected}
                />
              </div>
            );
          }`,sandbox:"https://codesandbox.io/s/multi-string-compact-select-2wbrc2"}),null),E})()},{name:"Dropdown lists",demo:()=>(()=>{const E=EE.cloneNode(!0);return D(E,P(s,{title:"Single dropdown list",description:"As well as combo controls, simple dropdowns are available.",props:{width:"300px",title:"Dropdown",choices:Q,maximumSelections:1,selectType:"dropdown"},code:`import SolidJsSelect from "compact-select";
import { choices } from "./data";
import "./styles.css";

export default function App() {
  return (
    <div class="Space">
      <SolidJsSelect
        title="test"
        choices={choices}
        maximumSelections={1}
        selectType="dropdown"
      />
    </div>
  );
}`,sandbox:"https://codesandbox.io/s/single-string-dropdown-er55j4"}),null),D(E,P(s,{title:"Multiple value dropdown",description:"It is also possible to have multiple value dropdowns.",props:{width:"300px",title:"Values Dropdown",choices:eE,selectType:"dropdown",itemValue:A=>A.name,itemText:A=>A.name},code:`import SolidJsSelect from "compact-select";
import { objectChoices } from "./data";
import "./styles.css";

export default function App() {
  return (
    <div class="Space">
      <SolidJsSelect
        title="test"
        choices={objectChoices}
        selectType="dropdown" 
        itemValue={(item) => item.name} 
        itemText={(item) => item.name}
      />
    </div>
  );
}`,sandbox:"https://codesandbox.io/s/multi-value-dropdown-z5sbbo"}),null),E})()},{name:"Switches",demo:()=>(()=>{const E=EE.cloneNode(!0);return D(E,P(s,{title:"Switch",description:"Switches are also possible. Useful if there are a limited number of options.",props:{width:"120px",hideTitle:!0,title:"Switch",choices:Q,selectType:"switch",minimumSelections:1},code:`import SolidJsSelect from "compact-select";
import { choices } from "./data";
import "./styles.css";

export default function App() {
  return (
    <div class="Space">
      <SolidJsSelect
        title="test"
        choices={choices}
        selectType="switch"
        minimumSelections={1}
      />
    </div>
  );
}`,sandbox:"https://codesandbox.io/s/string-switch-0zf049"})),E})()},{name:"Typeahead Look-ups",demo:()=>(()=>{const E=EE.cloneNode(!0);return D(E,P(s,{title:"Typeahead look-up",description:"If you can't access all avaiable options, then options can be provied by a promise.",props:{width:"300px",title:"Typeahead Look-up",typeAheadLookUp:zE},code:`import SolidJsSelect from "compact-select";
import { fetchItems } from "./data";
import "./styles.css";

export default function App() {
  return (
    <div class="Space">
      <SolidJsSelect
        title="test"
        typeAheadLookUp={fetchItems}
      />
    </div>
  );
}`,sandbox:"https://codesandbox.io/s/string-look-up-go9qds"}),null),D(E,P(s,{title:"Cached look-up",description:"If the source of the options is not performant, then there is the option to cache.",props:{width:"300px",title:"Cached Look-up",typeAheadLookUp:dR,itemValue:A=>A.name,itemText:A=>A.name,cacheLookUp:!0},code:`import SolidJsSelect from "compact-select";
import { slowFetchObjects } from "./data";
import "./styles.css";

export default function App() {
  return (
    <div class="Space">
      <SolidJsSelect
        title="test"
        typeAheadLookUp={slowFetchObjects}
        itemValue={(item) => item.name} 
        itemText={(item) => item.name}
        cacheLookUp={true}
      />
    </div>
  );
}`,sandbox:"https://codesandbox.io/s/cached-value-look-up-t40j5f"}),null),D(E,P(s,{title:"Expiring Cached string look-up",description:"To avoid a build up of memory, the cached items can be given a time to live.",props:{width:"300px",title:"Expiring Cache",typeAheadLookUp:sR,cacheLookUp:!0,cacheTimeToLive:10,cacheExpiryCheck:10},code:`import SolidJsSelect from "compact-select";
import { slowFetchItems } from "./data";
import "./styles.css";

export default function App() {
  return (
    <div class="Space">
      <SolidJsSelect
        title="test"
        typeAheadLookUp={slowFetchItems}
        cacheLookUp={true}
        cacheTimeToLive={10}
        cacheExpiryCheck={10}
      />
    </div>
  );
}`,sandbox:"https://codesandbox.io/s/cache-string-and-expire-6yz4cg"}),null),E})()},{name:"Disabled",demo:()=>(()=>{const E=EE.cloneNode(!0);return D(E,P(s,{title:"Disbaled Control",description:"Controls can be completely disabled.",props:{width:"300px",title:"Disabled",choices:Q,selected:["Sarah","Dianna"],disabled:!0},code:`import SolidJsSelect from "compact-select";
import { choices } from "./data";
import "./styles.css";

export default function App() {
  return (
    <div class="Space">
      <SolidJsSelect
        title="test"
        choices={choices}
        selected={["Sarah", "Dianna"]}
        disabled={true}
      />
    </div>
  );
}`,sandbox:"https://codesandbox.io/s/disabled-string-1tl6jk"}),null),D(E,P(s,{title:"Disbaled items",description:"Or if using an array of objects that implement the Choice interface, indivual items can be disabled.",props:{width:"300px",title:"Disabled Items",choices:jE},code:`import SolidJsSelect from "compact-select";
import { choices } from "./data";
import "./styles.css";

export default function App() {
  return (
    <div class="Space">
      <SolidJsSelect
        title="test"
        choices={choices}
      />
    </div>
  );
}`,sandbox:"https://codesandbox.io/s/disabled-items-8e2h2h"}),null),E})()},{name:"Paste Selections",demo:()=>(()=>{const E=uR.cloneNode(!0),A=E.firstChild;A.firstChild;const R=A.nextSibling;return R.firstChild,D(A,P(_E,{text:tR}),null),D(E,P(s,{title:"Paste items 1",description:"It's possible to paste a comma delimited list of strings into the control.",props:{width:"300px",title:"String paste",typeAheadLookUp:zE,itemSearch:nR},code:`import SolidJsSelect from "compact-select";
import { fetchItems, searchItems } from "./data";
import "./styles.css";

export default function App() {
  return (
    <div class="Space">
      <SolidJsSelect
        title="test"
        typeAheadLookUp={fetchItems}
        itemSearch={searchItems}
      />
    </div>
  );
}`,sandbox:"https://codesandbox.io/s/paste-strings-vebiz6"}),R),D(R,P(_E,{text:lR}),null),D(E,P(s,{title:"Pasting for typed objects",description:"The paste option also works for arrays of objects.",props:{width:"300px",title:"Object paste",typeAheadLookUp:iR,itemSearch:JR},code:`import SolidJsSelect from "compact-select";
import { fetchTyped,searchTyped } from "./data";
import "./styles.css";

export default function App() {
  return (
    <div class="Space">
      <SolidJsSelect
        title="test"
        typeAheadLookUp={fetchTyped}
        itemSearch={searchTyped}
      />
    </div>
  );
}`,sandbox:"https://codesandbox.io/s/paste-vales-sccd7y"}),null),E})()},{name:"Virtualised",demo:()=>(()=>{const E=EE.cloneNode(!0);return D(E,P(s,{title:"virtualised",description:"The only limit to the number of options is memory. The control uses virtualisation, so most options are not rendered until required.",props:{width:"300px",title:"Style",choices:aR},code:`import SolidJsSelect from "compact-select";
import { choices } from "./data";
import "./styles.css";

export default function App() {
  return (
    <div class="Space">
      <SolidJsSelect
        title="test"
        choices={choices}
        selected={["Nuala", "Andrew"]}
        selectStyle={{
          boxShadow: "5px 5px 10px 2px rgba(0,0,0,.8)"
        }}
        clearSelectionclass="icon-spin"
        choiceStyle={{
          textShadow: "2px 2px black"
        }}
        choiceSelectedIconclass="icon-blink"
      />
    </div>
  );
}`,sandbox:"https://codesandbox.io/s/custom-styles-dwlc5y"})),E})()}],fR=i("<div></div>"),mR=i('<div class="examples"><div class="controls"></div></div>'),bR=()=>{const[E,A]=e(cE[0].name),R=I=>{const L=cE.find(N=>N.name===I);return L?L?.demo():fR.cloneNode(!0)};return(()=>{const I=mR.cloneNode(!0),L=I.firstChild;return I.style.setProperty("color","var(--pageFont)"),D(I,P(YR,{title:"Catagories",get options(){return cE.map(N=>N.name)},onSelect:A}),L),D(L,()=>E&&R(E())),I})()};const vR=i('<div class="item"><img><pre>Item </pre></div>'),xR=E=>{const A=L=>L==="Horizontal"?{height:"40px"}:{width:"170px"},R=(L,N,O)=>L&&N==="Vertical"?40+O%5*10:"40px",I=(L,N,O)=>L&&N==="Horizontal"?40+O%5*10:"40px";return(()=>{const L=vR.cloneNode(!0),N=L.firstChild,O=N.nextSibling;return O.firstChild,D(O,()=>E.index.toLocaleString(),null),o(T=>{const G=A(E.orientation),M=R(E.variableSize,E.orientation,E.index),U=I(E.variableSize,E.orientation,E.index),K=E.index.toString(),W=`https://picsum.photos/id/${E.index%10+1}/200/300`;return T._v$=X(L,G,T._v$),M!==T._v$2&&_(N,"height",T._v$2=M),U!==T._v$3&&_(N,"width",T._v$3=U),K!==T._v$4&&_(N,"alt",T._v$4=K),W!==T._v$5&&_(N,"src",T._v$5=W),T},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0,_v$5:void 0}),L})()},QR=i(`<div class="main"><p>SolidJs is fast, because rather than keeping a virtual DOM, it only updates elements in response to a reaction. In SolidJs-Select the options are rendered by a single reaction. This would typically cause SolidJs a lot of work. The issues is overcome by virtualising the options. That way only the visible items are rendered and performance isn't impacted.</p><div class="settings"><div class="columns"><p class="entry">Orientation</p><p class="entry">Item Size</p><p class="entry">Item count</p></div><div class="columns"><p class="entryValue"></p><p class="entryValue"></p><input class="entryInput" type="number" min="1" max="10000000"></div></div><div class="containerCenter"><div></div></div></div>`),hR=E=>{const[A,R]=e("Vertical"),[I,L]=e("Fixed"),[N,O]=e([]),[T,G]=e(1e7),M=()=>{R(A()==="Vertical"?"Horizontal":"Vertical")};CE(()=>{U(1e7)}),KE(()=>{console.log(`theme = ${E.theme}`),setTimeout(()=>{M(),M()},1)});const U=d=>{if(Number.isNaN(d)||d===0)return;d>1e7&&(d=1e7),G(d);const n=[];for(let F=1;F<=d;F++)n.push(F);O(n)},K=()=>{L(I()==="Fixed"?"Variable":"Fixed")},W=()=>A()==="Horizontal"?{width:"500px",height:"80px"}:{height:"400px",width:"200px"};return(()=>{const d=QR.cloneNode(!0),n=d.firstChild,F=n.nextSibling,c=F.firstChild,m=c.nextSibling,l=m.firstChild,r=l.nextSibling,u=r.nextSibling,z=F.nextSibling,C=z.firstChild;return l.$$click=M,D(l,A),r.$$click=K,D(r,I),u.addEventListener("change",S=>U(Number(S.target.value))),D(C,P(HA,{get orientation(){return A()},get items(){return N()},render:S=>P(xR,{index:S,get orientation(){return A()},get variableSize(){return I()==="Variable"}})})),o(S=>X(C,W(),S)),o(()=>u.value=T()),d})()};HE(["click"]);var sE=(E=>(E.Plain="Plain",E.Dark="Dark",E.Light="Light",E.Blue="Blue",E))(sE||{});const XR=Object.keys(sE).filter(E=>isNaN(Number(E))),EA=E=>{switch(E){case"Blue":document.documentElement.style.setProperty("--solidjsSelectBackgroundColor","#4646B5"),document.documentElement.style.setProperty("--solidjsSelectFontColor","White"),document.documentElement.style.setProperty("--solidjsSelectToolTipFontColor","White"),document.documentElement.style.setProperty("--solidjsSelectFonHighlightColor","LightGray"),document.documentElement.style.setProperty("--solidjsSelectDisabledBackgroundColor","#5555ad"),document.documentElement.style.setProperty("--solidjsSelectToolTipBackgroundColor","#5555ad"),document.documentElement.style.setProperty("--solidjsSelectHighlightedBackgroundColor","#6161e1"),document.documentElement.style.setProperty("--solidjsSelectSelectedBackgroundBackgroundColor","#7676b0"),document.documentElement.style.setProperty("--solidjsSelectBorder","none"),document.documentElement.style.setProperty("--solidjsSelectBorder","#0d0d7a 2px Solid"),document.documentElement.style.setProperty("--pageColor1","#9dbbe0"),document.documentElement.style.setProperty("--pageColor2","#4646B5"),document.documentElement.style.setProperty("--pageColor3","#6161e1"),document.documentElement.style.setProperty("--pageColor4","#1d1d85"),document.documentElement.style.setProperty("--pageFont","Black"),document.documentElement.style.setProperty("--scrollbarColor","#4646B5"),document.documentElement.style.setProperty("--scrollbarArrowColor","White"),document.documentElement.style.setProperty("--scrollbarArrowHoverColor","darkgray"),document.documentElement.style.setProperty("--scrollbarArrowHoverBackground","#4646B5"),document.documentElement.style.setProperty("--scrollbarThumbColor","White"),document.documentElement.style.setProperty("--scrollbarThumbHoverColor","darkgray");break;case"Dark":document.documentElement.style.setProperty("--solidjsSelectBackgroundColor","#873BC2"),document.documentElement.style.setProperty("--solidjsSelectFontColor","lightgray"),document.documentElement.style.setProperty("--solidjsSelectToolTipFontColor","lightgray"),document.documentElement.style.setProperty("--solidjsSelectFonHighlightColor","DarkGray"),document.documentElement.style.setProperty("--solidjsSelectDisabledBackgroundColor","#512E6B"),document.documentElement.style.setProperty("--solidjsSelectToolTipBackgroundColor","#512E6B"),document.documentElement.style.setProperty("--solidjsSelectHighlightedBackgroundColor","#B65FF9"),document.documentElement.style.setProperty("--solidjsSelectSelectedBackgroundBackgroundColor","#823bb8"),document.documentElement.style.setProperty("--solidjsSelectBorder","#873ac1 2px Solid"),document.documentElement.style.setProperty("--pageColor1","black"),document.documentElement.style.setProperty("--pageColor2","#873BC2"),document.documentElement.style.setProperty("--pageColor3","#B65FF9"),document.documentElement.style.setProperty("--pageColor4","#6e21aa"),document.documentElement.style.setProperty("--pageFont","lightgray"),document.documentElement.style.setProperty("--scrollbarColor","#873BC2"),document.documentElement.style.setProperty("--scrollbarArrowColor","lightgray"),document.documentElement.style.setProperty("--scrollbarArrowHoverColor","white"),document.documentElement.style.setProperty("--scrollbarArrowHoverBackground","#873BC2"),document.documentElement.style.setProperty("--scrollbarThumbColor","lightgray"),document.documentElement.style.setProperty("--scrollbarThumbHoverColor","white");break;case"Light":document.documentElement.style.setProperty("--solidjsSelectBackgroundColor","#F7E575"),document.documentElement.style.setProperty("--solidjsSelectFontColor","#3D350B"),document.documentElement.style.setProperty("--solidjsSelectToolTipFontColor","#3D350B"),document.documentElement.style.setProperty("--solidjsSelectFonHighlightColor","DarkGray"),document.documentElement.style.setProperty("--solidjsSelectDisabledBackgroundColor","#edde87"),document.documentElement.style.setProperty("--solidjsSelectToolTipBackgroundColor","#d5b70e"),document.documentElement.style.setProperty("--solidjsSelectHighlightedBackgroundColor","#EFD233"),document.documentElement.style.setProperty("--solidjsSelectSelectedBackgroundBackgroundColor","#eadb85"),document.documentElement.style.setProperty("--solidjsSelectBorder","#EFD233 2px Solid"),document.documentElement.style.setProperty("--pageColor1","#FFFADB"),document.documentElement.style.setProperty("--pageColor2","#F7E575"),document.documentElement.style.setProperty("--pageColor3","#EFD233"),document.documentElement.style.setProperty("--pageColor4","#ddc73d"),document.documentElement.style.setProperty("--pageFont","#3D350B"),document.documentElement.style.setProperty("--scrollbarColor","#F7E575"),document.documentElement.style.setProperty("--scrollbarArrowColor","#d5b70e"),document.documentElement.style.setProperty("--scrollbarArrowHoverColor","#d5b70e"),document.documentElement.style.setProperty("--scrollbarArrowHoverBackground","#e0cd60"),document.documentElement.style.setProperty("--scrollbarThumbColor","#d5b70e"),document.documentElement.style.setProperty("--scrollbarThumbHoverColor","#e0cd60");break;case"Plain":document.documentElement.style.setProperty("--solidjsSelectBackgroundColor",null),document.documentElement.style.setProperty("--solidjsSelectFontColor",null),document.documentElement.style.setProperty("--solidjsSelectToolTipFontColor",null),document.documentElement.style.setProperty("--solidjsSelectFonHighlightColor",null),document.documentElement.style.setProperty("--solidjsSelectDisabledBackgroundColor",null),document.documentElement.style.setProperty("--solidjsSelectToolTipBackgroundColor",null),document.documentElement.style.setProperty("--solidjsSelectHighlightedBackgroundColor",null),document.documentElement.style.setProperty("--solidjsSelectSelectedBackgroundBackgroundColor",null),document.documentElement.style.setProperty("--solidjsSelectBorder",null),document.documentElement.style.setProperty("--pageColor1","White"),document.documentElement.style.setProperty("--pageColor2","#dce916"),document.documentElement.style.setProperty("--pageColor3","#eaff5c"),document.documentElement.style.setProperty("--pageColor4","#b1bc11"),document.documentElement.style.setProperty("--pageFont","Black"),document.documentElement.style.setProperty("--scrollbarColor",null),document.documentElement.style.setProperty("--scrollbarArrowColor",null),document.documentElement.style.setProperty("--scrollbarArrowHoverColor",null),document.documentElement.style.setProperty("--scrollbarArrowHoverBackground",null),document.documentElement.style.setProperty("--scrollbarThumbColor",null),document.documentElement.style.setProperty("--scrollbarThumbHoverColor",null);break}},gR=i('<div class="frame"><div class="page"><div class="body"><div class="header"><h1 class="title">SolidJs-Select</h1><p class="statement">A compact, highly functional select control for SolidJs</p></div><div class="menu-bar"><div class="menu"></div><div class="theme"></div></div><div class="context"></div><div class="footer"><p>Created by Mark Gregg</p></div></div></div></div>'),pR=i('<div class="menu-item"></div>'),yR=i('<u><p class="menu-text"></p></u>'),wR=i('<p class="menu-text"></p>'),$R=["Getting Started","Examples","Virtual Container"],kR=()=>{const[E,A]=e(sE.Plain.toString()),[R,I]=e("Getting Started");CE(()=>{EA(sE.Plain)});const L=N=>{A(N[0]),EA(N[0])};return(()=>{const N=gR.cloneNode(!0),O=N.firstChild,T=O.firstChild,G=T.firstChild,M=G.nextSibling,U=M.firstChild,K=U.nextSibling,W=M.nextSibling,d=W.nextSibling;return D(U,()=>$R.map(n=>(()=>{const F=pR.cloneNode(!0);return F.$$click=()=>I(n),D(F,(()=>{const c=J(()=>n===R());return()=>c()?(()=>{const m=yR.cloneNode(!0),l=m.firstChild;return D(l,n),m})():(()=>{const m=wR.cloneNode(!0);return D(m,n),m})()})()),F})())),D(K,P(MA,{maximumSelections:1,minimumSelections:1,selectType:"dropdown",title:"themes",choices:XR,get selected(){return E()},onChange:L})),D(W,(()=>{const n=J(()=>R()==="Examples");return()=>n()&&P(bR,{})||R()==="Getting Started"&&P(GR,{})||R()==="Virtual Container"&&P(hR,{get theme(){return E()}})})()),d.style.setProperty("background-color","var(--pageColor2)"),d.style.setProperty("color","var(--solidjsSelectFontColor)"),N})()};HE(["click"]);vA(()=>P(kR,{}),document.getElementById("root"));