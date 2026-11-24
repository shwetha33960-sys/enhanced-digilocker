/* Expiry reminders: set an expiry date on the details page; cards show badges; dashboard creates notifications. */
const ex=()=>FX.get('exp',{}),daysTo=s=>Math.ceil((new Date(s)-new Date())/864e5);
FX.watch(()=>{
 $$('.doc').forEach(c=>{if(c.dataset.x)return;c.dataset.x=1;const s=ex()[FX.docId(c)];if(!s)return;const n=daysTo(s);c.querySelector('div').insertAdjacentHTML('beforeend',`<p><span class="tag ${n<0?'bad':n<=30?'warn':'ok'}">${n<0?'Expired':'Expires in '+n+' days'}</span></p>`)});
 const d=$('.detail .card');if(!d||$('#xd'))return;const id=new URLSearchParams(location.search).get('id');
 d.insertAdjacentHTML('beforeend',`<h2>Expiry reminder</h2><div class="fld"><label for="xd">Expiry date (optional)</label><input type="date" id="xd" value="${ex()[id]||''}"></div><button class="btn alt" id="xs" type="button">Save expiry date</button>`);
 $('#xs').onclick=()=>{const a=ex();if($('#xd').value)a[id]=$('#xd').value;else delete a[id];FX.set('exp',a);toast('Expiry date saved.')}});
document.addEventListener('DOMContentLoaded',()=>setTimeout(()=>{const u=me();if(!u||!FX.pathIs('dashboard.html'))return;const done=FX.get('expn',{});
 DV.docs().filter(d=>d.owner===u.id&&ex()[d.id]&&daysTo(ex()[d.id])<=30&&!done[d.id]).forEach(d=>{const n=daysTo(ex()[d.id]);DV.note(u.id,`${d.title} ${n<0?'has expired':'expires in '+n+' days'}.`);done[d.id]=1});FX.set('expn',done);header()},0));
