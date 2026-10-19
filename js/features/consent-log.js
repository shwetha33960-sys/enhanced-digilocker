/* Consent and access log: records when share links are opened and lets you withdraw consent (consent.html). */
FX.link('Consent log','consent.html');
FX.watch(()=>{if(!FX.pathIs('verify.html'))return;const t=new URLSearchParams(location.search).get('share');if(!t||sessionStorage.getItem('fx_v'+t))return;
 const s=DV.shares().find(x=>x.token===t);if(!s||shareState(s)!=='Active')return;sessionStorage.setItem('fx_v'+t,1);FX.set('views',[{token:t,time:DV.now()},...FX.get('views',[])].slice(0,200))});
FX.page('consent',()=>{const u=me();redraw=()=>{const S=DV.shares().filter(s=>s.owner===u.id),V=FX.get('views',[]);
 main().innerHTML='<div class="wrap pg"><h1>Consent and access log</h1><p class="note">See when your share links were opened and withdraw consent at any time. Views are recorded in this browser only (demo).</p><div id="list"></div></div>';
 pager($('#list'),S,rows=>tbl(['Document','Status','Times opened','Last opened','Action'],rows.map(s=>{const v=V.filter(x=>x.token===s.token);return[esc(s.title),shareState(s),v.length,v[0]?v[0].time:'Never',shareState(s)==='Active'?`<button class="btn sm danger" data-act="revoke" data-id="${s.id}">Withdraw consent</button>`:'-']})),8)};redraw()});
