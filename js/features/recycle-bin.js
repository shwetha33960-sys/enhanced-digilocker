/* Recycle bin: deleted uploads are kept 30 days and can be restored (bin.html). Replaces the normal "Delete" action. */
const bin=()=>FX.get('bin',[]);
FX.link('Recycle bin','bin.html');
acts.delete=function(id){if(!confirm('Move this document to the recycle bin? You can restore it for 30 days.'))return;const D=DV.docs(),d=D.find(x=>x.id===id);
 FX.set('bin',[{...d,deletedAt:Date.now()},...bin()]);DV.set('docs',D.filter(x=>x.id!==id));DV.log(me().email,'Moved document to bin',d.title,'document');sessionStorage.setItem('dv_msg','Moved to the recycle bin.');location.href='uploaded.html'};
acts.restore=id=>{const b=bin(),d=b.find(x=>x.id===id);delete d.deletedAt;DV.set('docs',[d,...DV.docs()]);FX.set('bin',b.filter(x=>x.id!==id));toast('Document restored.');redraw()};
acts.purge=id=>{if(confirm('Delete this document forever?')){FX.set('bin',bin().filter(x=>x.id!==id));redraw()}};
FX.page('bin',()=>{const u=me();FX.set('bin',bin().filter(d=>Date.now()-d.deletedAt<2592e6));
 redraw=()=>{main().innerHTML='<div class="wrap pg"><h1>Recycle bin</h1><p class="note">Deleted uploads are kept for 30 days, then removed.</p><div id="list"></div></div>';
  pager($('#list'),bin().filter(d=>d.owner===u.id),rows=>tbl(['Document','Category','Deleted','Actions'],rows.map(d=>[esc(d.title),d.cat,new Date(d.deletedAt).toISOString().slice(0,10),`<button class="btn sm alt" data-act="restore" data-id="${d.id}">Restore</button> <button class="btn sm danger" data-act="purge" data-id="${d.id}">Delete forever</button>`])),8)};redraw()});
