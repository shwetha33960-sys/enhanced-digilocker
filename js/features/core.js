/* Shared helpers for all features. Always keep this file enabled. */
const FX={
 more:[],
 css(t){const s=document.createElement('style');s.textContent=t;document.head.appendChild(s)},
 get(k,d){try{const v=JSON.parse(localStorage.getItem('fx_'+k));return v===null?d:v}catch(e){return d}},
 set(k,v){localStorage.setItem('fx_'+k,JSON.stringify(v))},
 page(name,fn){pages[name]=fn},
 link(label,href,pub){FX.more.push([label,href,pub])},
 hdr(fn){const h=header;header=function(){h();fn()}},
 pathIs:n=>location.pathname.endsWith(n),
 docId:c=>{const a=c.querySelector('a[href*="document.html?id="]');return a?a.getAttribute('href').split('id=')[1]:null},
 watch(fn){let t;const ob=new MutationObserver(()=>{clearTimeout(t);t=setTimeout(run,30)});
  function run(){ob.disconnect();try{fn()}finally{ob.observe(document.body,{childList:true,subtree:true})}}
  ob.observe(document.body,{childList:true,subtree:true});document.addEventListener('DOMContentLoaded',()=>setTimeout(run,0))}
};
FX.css('.more{position:relative;order:99}.more summary{width:38px;height:38px;border:2px solid var(--blue);border-radius:50%;display:grid;place-items:center;font-weight:800;font-size:20px;color:var(--blue);cursor:pointer;list-style:none;background:#fff}.more summary::-webkit-details-marker{display:none}.more[open] summary,.more summary:hover{background:var(--sky)}.more div{position:absolute;right:0;top:calc(100% + 8px);background:#fff;border:1px solid var(--line);border-radius:8px;min-width:200px;padding:6px;z-index:30;box-shadow:0 6px 18px rgba(0,0,0,.12)}.more div a{display:block;padding:8px 12px;border-radius:6px;text-decoration:none;color:var(--text);font-weight:600;font-size:15px}.more div a:hover{background:var(--sky);color:var(--blue)}');
/* Adds a round "!" button at the far right of the header. It opens the list of feature pages. */
FX.adm=[];FX.admlink=(l,h)=>FX.adm.push([l,h]);
FX.hdr(()=>{const bar=$('.bar-in');if(!bar)return;const L=document.body.dataset.area==='admin'?FX.adm:FX.more.filter(l=>l[2]||me());if(!L.length)return;
 const d=document.createElement('details');d.className='more';d.innerHTML='<summary aria-label="More features" title="More features">!</summary><div>'+L.map(l=>`<a href="${l[1]}">${l[0]}</a>`).join('')+'</div>';bar.append(d)});
