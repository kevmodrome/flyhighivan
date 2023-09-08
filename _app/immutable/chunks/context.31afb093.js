import{e as L,j as R}from"./singletons.8120d930.js";import{f as p,h as P,i as b}from"./scheduler.983df34f.js";import{p as F}from"./stores.be23618b.js";const u=Symbol.for("inlang"),x=(e,t)=>({...e||{},[u]:t}),J=e=>e[u],C=(e,t)=>(e.params[u]=t,e),D=e=>e.params[u],W=e=>new Promise(t=>setTimeout(t,e)),h=(e,t,r=!0)=>{for(const a of e)for(const n of t)if(n===a)return n;for(const a of e)if(r){const n=t.map(o=>(o.startsWith(a+"-")||a.startsWith(o+"-"))&&o).filter(Boolean).sort().sort((o,i)=>o.split("-").length-i.split("-").length);if(n.length)return n[0]}},w=async({referenceLanguage:e,languages:t,allowRelated:r=!0},...a)=>{const n=[];for(const o of a){const i=await o(),s=h(i,t,!1);if(s)return s;n.push(...i)}return r&&h(n,t)||e},j=e=>(t,r)=>{const a=e.body.find(n=>n.id.name===t);return a?a.pattern.elements.map(n=>S(n,r||{})).join(""):""},S=(e,t)=>{switch(e.type){case"Text":return e.value;case"Placeholder":return T(e,t)}},T=(e,t)=>{switch(e.body.type){case"VariableReference":return t[e.body.name]??""}},I=e=>!!e&&typeof e=="object"&&typeof e.then=="function",_=()=>"",$=({readResource:e},t={resources:new Map,language:void 0,i:void 0})=>{const r=new Map;let a=!1;const n=c=>{if(t.resources.has(c))return a?Promise.resolve():void 0;if(r.has(c))return r.get(c);const f=g=>g&&t.resources.set(c,g),l=e(c);if(!I(l)){f(l);return}a=!0;const m=new Promise(async g=>{const y=await l;f(y),r.delete(c),g()});return r.set(c,m),m},o=c=>{t.language=c,t.i=void 0},i=()=>t.language,s=()=>{if(t.i)return t.i;const c=t.resources.get(t.language);return c?t.i=j(c):_};return{loadResource:n,switchLanguage:o,get language(){return i()},get i(){return s()}}},k=e=>{const t=$(e);return{...t,get language(){return t.language},get i(){return t.i},get referenceLanguage(){return e.referenceLanguage},get languages(){return e.languages}}},A=async({fetch:e,language:t,referenceLanguage:r,languages:a,cache:n={}})=>{const o=k({readResource:async i=>n[i]??(n[i]=await e(`${L}/inlang/${i}.json`).then(s=>s.ok?s.json():void 0)),referenceLanguage:r,languages:a});return t&&(await o.loadResource(t),o.switchLanguage(t)),o},E={},d=async(e,t)=>{const r=D(e);if(r)return r;if(!t)return await W(0),d(e,t);let a;C(e,new Promise(o=>a=o));const n=await M(e,t,e.data["[inlang]"]);return a(n),n},M=async(e,t,r)=>{if(!r){const s=c=>()=>console.warn("inlang was not correctly set up on this page. Please check `routing.exclude` in your `inlang.config.js` file.")||c;return{i:s(""),loadResource:s(),switchLanguage:s(),languages:[]}}const{referenceLanguage:a,languages:n,language:o}=r,i=o||!t.initDetectors?o:await w({referenceLanguage:a,languages:n},...t.initDetectors(e));return A({fetch:e.fetch,language:i,referenceLanguage:a,languages:n,cache:E})},N=e=>({use:t=>async r=>{const a=await d(r,e),n=await t(r,a),{"[inlang]":o,...i}=n||r.data;return x(i,a)}}),O=e=>({use:t=>async r=>{const a=await r.parent(),n=a.language;if(!n&&e.browser){const{referenceLanguage:i,languages:s}=a;if((!n||!s.includes(n))&&e.redirect){const c=await w({referenceLanguage:i,languages:s},...e.initDetectors?e.initDetectors(r):[]);throw e.redirect.throwable(307,e.redirect.getPath(r,c).toString())}}const o=await d(r);return t(r,o)}}),z=()=>p(u),B=e=>P(u,e),K=R("goto"),Q=()=>z(),U=e=>{const{language:t,referenceLanguage:r,languages:a,i:n,loadResource:o}=e;B({language:t,referenceLanguage:r,languages:a,i:n,loadResource:o,switchLanguage:async s=>{if(e.language!==s)return localStorage.setItem("language",s),e.switchLanguage(s),K(b(F).url,{invalidateAll:!0,noScroll:!0})},route:V})},V=e=>e;export{u as a,U as b,Q as c,O as d,J as g,N as i};
