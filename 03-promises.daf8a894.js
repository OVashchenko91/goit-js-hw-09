var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},t={},n=e.parcelRequired7c6;null==n&&((n=function(e){if(e in o)return o[e].exports;if(e in t){var n=t[e];delete t[e];var r={id:e,exports:{}};return o[e]=r,n.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,o){t[e]=o},e.parcelRequired7c6=n),n("7Y9D8");const r=document.querySelector(".form"),i=document.querySelector('[name="delay"]'),l=document.querySelector('[name="step"]'),u=document.querySelector('[name="amount"]');function d(e,o){return new Promise(((t,n)=>{setTimeout((()=>{Math.random()>.3?t({position:e,delay:o}):n({position:e,delay:o})}),o)}))}r.addEventListener("submit",(function(e){e.preventDefault();let o=i.valueAsNumber;for(let e=1;e<=u.valueAsNumber;e+=1)d(e,o).then((({position:o,delay:t})=>{Notify.success(`✅ Fulfilled promise ${e} in ${t}ms`)})).catch((({position:o,delay:t})=>{Notify.failure(`❌ Rejected promise ${e} in ${t}ms`)})),o+=l.valueAsNumber}));
//# sourceMappingURL=03-promises.daf8a894.js.map