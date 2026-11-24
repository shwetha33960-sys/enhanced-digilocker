/* Bulk actions: tick several document cards, then download, favourite or delete them together. */
FX.css('.doc .bsel{width:20px;height:20px;margin:2px 8px 0 0}');
FX.watch(()=>{const L=$('#list');if(!L||!$('#list .doc'))return;
 $$('.doc').forEach(c=>{if(c.dataset.b)return;c.dataset.b=1;const k=document.createElement('input');k.type='checkbox';k.className='bsel';k.value=FX.docId(c);k.setAttribute('aria-label','Select '+c.querySelector('h3').textContent);c.prepend(k)});
 if(!$('.bk'))L.insertAdjacentHTML('beforebegin','<div class="row bk"><button class="btn sm alt" data-bulk="dl">Download selected</button><button class="btn sm alt" data-bulk="fav">Favourite selected</button><button class="btn sm danger" data-bulk="del">Delete selected uploads</button></div>')});
document.addEventListener('click',e=>{const b=e.target.closest('[data-bulk]');if(!b)return;const ids=$$('.bsel:checked').map(x=>x.value);if(!ids.length)return toast('Select at least one document first.');
 const D=DV.docs().filter(d=>ids.includes(d.id)),k=b.dataset.bulk;
 if(k==='dl')D.forEach(d=>acts.download(d.id));
 if(k==='fav'){FX.set('fav',[...new Set([...FX.get('fav',[]),...ids])]);toast('Added to favourites. Reload to see the stars.')}
 if(k==='del'){const up=D.filter(d=>d.kind==='uploaded');if(!up.length)return toast('Only uploaded documents can be deleted.');if(!confirm(`Delete ${up.length} uploaded document(s)?`))return;
  if(acts.restore)FX.set('bin',[...up.map(d=>({...d,deletedAt:Date.now()})),...FX.get('bin',[])]);
  DV.set('docs',DV.docs().filter(d=>!up.some(x=>x.id===d.id)));DV.log(me().email,'Bulk deleted documents',up.length+' items','document');location.reload()}});
