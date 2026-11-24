/* Admin review queue (admin-review.html): approve or reject flagged documents with a comment. */
FX.admlink('Review queue','admin-review.html');
function reviewDoc(id,st,w){const c=prompt(w+': add a short comment (optional)');if(c===null)return;const D2=DV.docs(),d=D2.find(x=>x.id===id);d.status=st;DV.set('docs',D2);
 DV.log(ADMIN,w+' flagged document',d.title+(c?' - '+c:''),'admin');FX.set('rvc',[{time:DV.now(),title:d.title,w,c},...FX.get('rvc',[])].slice(0,100));toast(w+'.');redraw()}
acts.rvok=id=>reviewDoc(id,'Active','Approved');acts.rvno=id=>reviewDoc(id,'Archived','Rejected');
FX.page('adminReview',()=>{const O=Object.fromEntries(DV.users().map(u=>[u.id,u.name]));redraw=()=>{
 main().innerHTML='<div class="wrap pg"><h1>Review queue</h1><p class="note">Flagged documents wait here. Approve to mark them Active, or reject to archive them.</p><div id="list"></div><h2>Recent decisions</h2><div id="hist"></div></div>';
 pager($('#list'),DV.docs().filter(d=>d.status==='Flagged'),rows=>tbl(['Title','Owner','Category','Date','Actions'],rows.map(d=>[esc(d.title),esc(O[d.owner]||'Unknown'),d.cat,d.date,`<button class="btn sm" data-act="rvok" data-id="${d.id}">Approve</button> <button class="btn sm danger" data-act="rvno" data-id="${d.id}">Reject</button>`])),6);
 pager($('#hist'),FX.get('rvc',[]),rows=>tbl(['Time','Document','Decision','Comment'],rows.map(h=>[h.time,esc(h.title),h.w,esc(h.c||'-')])),6)};redraw()});
