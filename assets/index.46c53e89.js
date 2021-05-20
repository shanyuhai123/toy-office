import{d as e,c as t,a as l,r as a,b as n,w as s,n as o,o as i,e as c,v as r,f as h,g as u}from"./vendor.f2a9198c.js";var d=e({name:"ExcelStatusBar",setup:()=>()=>t("div",{class:"excel-status-bar"},[t("span",{class:"current-coordinate"},[l("A1")]),t("input",{type:"text",class:"calc-function"},null)])});const f=()=>((e,t=1)=>Array.from({length:e-t}).map(((e,l)=>t+l)))(91,65).map((e=>String.fromCharCode(e))),v="#0E6409",p=60,g=30;var x=e({name:"ExcelCore",setup(){const e=n(null),l=a({width:-99999,height:-99999}),h=n(null),u=n(null),d=n("你好");i((async()=>{const{width:t,height:n}=function(e){const t=a({width:0,height:0});if(e){const{clientWidth:l,clientHeight:a}=e;t.width=l,t.height=a}return t}(e.value);l.width=t,l.height=n})),s(u,(async e=>{await o(),(async(e,t)=>{if(!e)return;const l=f();e.strokeStyle="#DDDDDD";let a=0,n=0;for(e.font="20px serif",e.textBaseline="middle",e.textAlign="center";t.width>p*a;){const n=p*a;e.moveTo(n,0),e.lineTo(n,t.height),e.stroke(),e.fillText(l[a]||"UN",n+1.5*p,g/2,p),a++}for(;t.height>g*n;){const l=g*n;e.moveTo(0,l),e.lineTo(t.width,l),e.stroke(),e.fillText((n+1).toString(),p/2,l+1.5*g,p),n++}e.strokeStyle="#b2b2b2",e.beginPath(),e.moveTo(p-5,g-5),e.lineTo(p-5,7.5),e.lineTo(15,g-5),e.fillStyle="#b4b4b4",e.fill(),e.closePath()})(e,l)}));const{handleCanvasClick:x}=((e,t)=>{const l=n(((...e)=>{}));return s(e,(async e=>{await o(),l.value=l=>{const{offsetX:a,offsetY:n}=l,s=Math.floor(a/p),o=Math.floor(n/g);s&&o&&(e.clearRect(0,0,t.width,t.height),e.strokeStyle=v,e.lineWidth=2,e.strokeRect(p*s,g*o,p,g))}})),{handleCanvasClick:l}})(h,l),{handleCanvasDoubleClick:m,top:y,left:w}=((e,t)=>{const l=n(((...e)=>{})),a=n(-9999),i=n(-9999);return s(e,(async e=>{await o(),l.value=e=>{const{offsetX:t,offsetY:l}=e,n=Math.floor(t/p),s=Math.floor(l/g);n&&s&&(a.value=g*s,i.value=p*n,console.log(a.value))}})),{top:a,left:i,handleCanvasDoubleClick:l}})(h);return()=>t("div",{class:"excel-core",ref:e},[t("canvas",{class:"content-layer",width:l.width,height:l.height,ref:e=>{u.value=e&&e.getContext("2d")}},null),t("canvas",{class:"event-layer",width:l.width,height:l.height,ref:e=>{h.value=e&&e.getContext("2d")},onClick:x.value,onDblclick:m.value},null),c(t("input",{class:"canvas-input",type:"text","onUpdate:modelValue":e=>d.value=e,style:{width:p+"px",height:g+"px",top:y.value+"px",left:w.value+"px"}},null),[[r,d.value]])])}}),m=e({name:"ExcelContainer",setup:()=>()=>t("div",{class:"excel-container"},[t(d,null,null),t(x,null,null)])});u(e({name:"App",setup(){const e=n("未命名"),l=h((()=>{const t=(l=e.value,Array.from(l).reduce(((e,t)=>(t.match(/[^\x00-\xff]/gi)?e+=2:e+=1,e)),0));var l;return 9.6*(t>10?t:10)+"px"}));return()=>t("div",{id:"toy-sheet"},[t("header",{class:"toy-sheet-header"},[c(t("input",{type:"text",class:"sheet-name","onUpdate:modelValue":t=>e.value=t,style:{width:l.value},placeholder:"请输入名称"},null),[[r,e.value]])]),t(m,null,null)])}})).mount("#app");