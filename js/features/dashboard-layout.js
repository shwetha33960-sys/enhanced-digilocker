/* Dashboard layout: left sidebar menu; header with the logo on the left and Accessibility, Language, Profile on the right;
   new dashboard (welcome, issued documents row, Digivault Utilities, documents you might need).
   Keep this file LAST in the FEATURES list in features.js. */
const SIDEICON={'dashboard.html':'🏠','issued.html':'📑','uploaded.html':'📤','get-documents.html':'📥','shares.html':'🔗','search.html':'🔍','notifications.html':'🔔','help.html':'❓','profile.html':'👤'};
const UTIL_ICON={'Favourites':'⭐','Recycle bin':'🗑️','Folders':'📁','eSign (demo)':'✍️','Consent log':'🛡️','Take the tour':'🧭','Demo guide':'📘','Feedback':'💬','Issuer directory':'🏛️','Nominees':'👪','My messages':'✉️'};
const T2='html[data-theme=dark] ';
FX.css(`:root{--hh:104px}
.hr{display:flex;align-items:center;gap:10px;margin-left:auto;order:90}
.hbtn{width:38px;height:38px;border-radius:50%;border:2px solid var(--blue);background:#fff;font-size:18px;cursor:pointer;color:var(--blue)}
.pmenu{position:relative}.pmenu summary{display:flex;align-items:center;gap:8px;cursor:pointer;list-style:none;font-weight:600}.pmenu summary::-webkit-details-marker{display:none}
.av{width:38px;height:38px;border-radius:50%;background:var(--blue);color:#fff;display:grid;place-items:center;font-weight:700;overflow:hidden}.av img{width:100%;height:100%;object-fit:cover}
.pmenu>div{position:absolute;right:0;top:calc(100% + 8px);background:#fff;border:1px solid var(--line);border-radius:8px;min-width:210px;padding:6px;z-index:40;box-shadow:0 6px 18px rgba(0,0,0,.12)}
.pmenu>div a,.pmenu>div button{display:block;width:100%;text-align:left;padding:8px 12px;border:0;background:none;border-radius:6px;text-decoration:none;color:var(--text);font:600 15px inherit;cursor:pointer}
.pmenu>div a:hover,.pmenu>div button:hover{background:var(--sky);color:var(--blue)}
body.hdr-a11y .more,body.hdr-a11y #fxab{display:none}
body.hdr-a11y .fxa{left:auto;right:14px;top:calc(var(--hh) + 6px);bottom:auto}
body.has-side #nav{display:none}
#side{position:fixed;left:0;top:var(--hh);bottom:0;width:232px;background:#fff;border-right:1px solid var(--line);padding:14px 10px;overflow:auto;z-index:15}
#side a{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:8px;text-decoration:none;color:var(--text);font-weight:600}
#side a:hover,#side a[aria-current]{background:var(--sky);color:var(--blue)}
body.has-side main,body.has-side footer{margin-left:232px}
.welcome{border-bottom:1px solid var(--line);padding-bottom:18px;margin-bottom:6px}.welcome p{margin:0;max-width:760px}
.sh{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap}.sh h2{margin:1.2em 0 .5em}
.hrow{display:flex;gap:14px;overflow-x:auto;scroll-snap-type:x mandatory;padding:6px 2px 12px}
.itile{flex:0 0 220px;scroll-snap-align:start;display:flex;flex-direction:column;gap:4px;background:#fff;border:1px solid var(--line);border-radius:var(--r);padding:16px;text-decoration:none;color:var(--text)}.itile:hover,.ut:hover{border-color:var(--blue)}
.utg{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:14px}
.ut{display:flex;flex-direction:column;align-items:center;gap:8px;text-align:center;background:#fff;border:1px solid var(--line);border-radius:var(--r);padding:18px 10px;text-decoration:none;color:var(--text);font-weight:600}.ui{font-size:30px}
${T2}#side,${T2}.pmenu>div,${T2}.hbtn,${T2}.itile,${T2}.ut{background:#15233b;color:#e6edf8}${T2}.pmenu>div a,${T2}.pmenu>div button,${T2}#side a{color:#e6edf8}
@media(max-width:820px){body.has-side main,body.has-side footer{margin-left:0}#side{transform:translateX(-100%);transition:transform .2s}body.side-open #side{transform:none}.btn.menu{order:-1;margin:0 8px 0 0}.pmenu .pn{display:none}}`);
FX.hdr(()=>{const u=me(),bar=$('.bar-in');if(!u||!bar||document.body.dataset.area==='bare')return;
 document.body.classList.add('hdr-a11y');const old=$('#side');if(old)old.remove();document.body.classList.remove('has-side');
 const photo=FX.get('avatar_'+u.id,''),ini=u.name.split(' ').slice(0,2).map(w=>w[0]).join('').toUpperCase(),
  dark=[...bar.children].find(x=>x.tagName==='BUTTON'&&/mode$/i.test(x.textContent)),lang=bar.querySelector('select[aria-label=Language]'),img=bar.querySelector(':scope>img'),g=document.createElement('div');
 g.className='hr';
 g.innerHTML=`<button type="button" class="hbtn" id="hdrA" aria-label="Accessibility options" title="Accessibility">♿</button><span id="hdrL"></span><details class="pmenu"><summary aria-label="Profile menu"><span class="av">${photo?`<img src="${photo}" alt="">`:esc(ini)}</span><span class="pn">${esc(u.name.split(' ')[0])}</span></summary><div><a href="profile.html">Profile and settings</a><a href="notifications.html">Notifications</a><span id="hdrD"></span><a href="#" data-act="logout">Sign out</a></div></details>`;
 if(lang)$('#hdrL',g).replaceWith(lang);else $('#hdrL',g).remove();
 if(dark){dark.className='';$('#hdrD',g).replaceWith(dark)}else $('#hdrD',g).remove();
 if(img)img.remove();bar.append(g);
 const nav=$('#nav');
 if(document.body.dataset.page!=='landing'&&nav){const s=document.createElement('aside');s.id='side';s.setAttribute('aria-label','Main menu');
  s.innerHTML=[...nav.querySelectorAll('a')].filter(a=>!a.dataset.act).map(a=>`<a href="${a.getAttribute('href')}"${a.getAttribute('aria-current')?' aria-current="page"':''}><span aria-hidden="true">${SIDEICON[a.getAttribute('href')]||'•'}</span><span>${a.innerHTML}</span></a>`).join('')+'<a href="dashboard.html#uh"><span aria-hidden="true">🧰</span><span>Utilities</span></a>';
  $('#hdr').after(s);document.body.classList.add('has-side');const m=$('.menu');if(m)m.onclick=()=>document.body.classList.toggle('side-open')}
 document.documentElement.style.setProperty('--hh',$('#hdr').offsetHeight+'px')});
document.addEventListener('click',e=>{if(e.target.closest('#hdrA')){const p=$('#fxap');if(p)p.hidden=!p.hidden;return}
 $$('.pmenu[open]').forEach(d=>{if(!d.contains(e.target))d.removeAttribute('open')});
 if(document.body.classList.contains('side-open')&&!e.target.closest('#side,.menu'))document.body.classList.remove('side-open')});
window.addEventListener('resize',()=>{const h=$('#hdr');if(h)document.documentElement.style.setProperty('--hh',h.offsetHeight+'px')});
FX.page('dashboard',()=>{const u=me(),D=DV.docs().filter(d=>d.owner===u.id),iss=D.filter(d=>d.kind==='issued').sort((a,b)=>b.date.localeCompare(a.date)),have=new Set(D.map(d=>d.title)),need=[];
 ISS.forEach((i,ix)=>i[2].forEach(t=>{if(!have.has('Sample '+t))need.push({ix,t,issuer:i[0],cat:i[1]})}));
 main().innerHTML=`<div class="wrap pg"><section class="welcome"><h1>Welcome, ${esc(u.name)} !</h1><p class="muted">In the real DigiLocker service, Issued Documents are treated at par with original documents as per the IT Act, 2000. In this demo they are fictional samples with no legal value.</p></section>
 <section aria-labelledby="ih"><div class="sh"><h2 id="ih">Issued Documents</h2><span><button class="btn sm alt" type="button" data-sc="-1" aria-label="Scroll left">&lsaquo;</button> <button class="btn sm alt" type="button" data-sc="1" aria-label="Scroll right">&rsaquo;</button> <a href="issued.html">View all</a></span></div><div class="hrow" id="hrow" tabindex="0" aria-label="Issued documents, scroll sideways">${iss.map(d=>`<a class="itile" href="document.html?id=${d.id}"><span class="ico" aria-hidden="true">${DV.icons[d.cat]}</span><b>${esc(d.title)}</b><span class="muted small">${esc(d.issuer)}</span><span class="tag warn">Sample issued</span></a>`).join('')||'<p class="empty">No issued documents yet. Use Get documents to add one.</p>'}</div></section>
 <section aria-labelledby="uh"><h2 id="uh">Digivault Utilities</h2><div class="utg">${FX.more.map(l=>`<a class="ut" href="${l[1]}"><span class="ui" aria-hidden="true">${UTIL_ICON[l[0]]||'🔧'}</span><span>${esc(l[0])}</span></a>`).join('')}</div></section>
 <section aria-labelledby="nh"><h2 id="nh">Documents you might need</h2><div class="grid">${need.slice(0,6).map(n=>`<article class="card doc"><span class="ico" aria-hidden="true">${DV.icons[n.cat]}</span><div><h3>Sample ${esc(n.t)}</h3><p class="muted">${esc(n.issuer)}</p><a class="btn sm" href="get-documents.html?issuer=${n.ix}&type=${encodeURIComponent(n.t)}">Get document</a></div></article>`).join('')||'<p class="empty">You already have every sample document.</p>'}</div></section></div>`;
 $$('[data-sc]').forEach(b=>b.onclick=()=>$('#hrow').scrollBy({left:+b.dataset.sc*300,behavior:'smooth'}))});
/* Get documents page: preselect the issuer and type chosen on the dashboard. */
FX.watch(()=>{const gi=$('#gi');if(!FX.pathIs('get-documents.html')||!gi||gi.dataset.p)return;gi.dataset.p=1;const q=new URLSearchParams(location.search),i=q.get('issuer'),t=q.get('type');
 if(i===null)return;gi.value=i;gi.dispatchEvent(new Event('change'));if(t)$('#gt').value=t});
