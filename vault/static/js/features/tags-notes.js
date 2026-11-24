/* Tags and private notes: edit them on the document details page, tags also show on cards. */
const meta=()=>FX.get('meta',{});
FX.css('.tagx{background:#fff3d6;color:#7a4b00}');
FX.watch(()=>{
 $$('.doc').forEach(c=>{if(c.dataset.t)return;c.dataset.t=1;const m=meta()[FX.docId(c)];if(m&&m.tags&&m.tags.length)c.querySelector('div').insertAdjacentHTML('beforeend','<p>'+m.tags.map(t=>`<span class="tag tagx">${esc(t)}</span>`).join(' ')+'</p>')});
 const d=$('.detail .card');if(!d||$('#tg'))return;const id=new URLSearchParams(location.search).get('id'),m=meta()[id]||{};
 d.insertAdjacentHTML('beforeend',`<h2>Tags and notes</h2><div class="fld"><label for="tg">Tags (comma separated)</label><input id="tg" maxlength="80" value="${esc((m.tags||[]).join(', '))}"></div><div class="fld"><label for="nt">Private note</label><textarea id="nt" rows="3" maxlength="300">${esc(m.note||'')}</textarea></div><button class="btn alt" id="tsave" type="button">Save tags and note</button>`);
 $('#tsave').onclick=()=>{const a=meta();a[id]={tags:$('#tg').value.split(',').map(s=>s.trim()).filter(Boolean).slice(0,6),note:$('#nt').value.trim()};FX.set('meta',a);toast('Tags and note saved.')}});
