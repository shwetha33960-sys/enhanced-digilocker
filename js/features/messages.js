/* Support messages: shows what you sent from the Help page (and any admin reply) plus an admin inbox (admin-messages.html). */
const MS=()=>FX.get('msgs',[]),msgBy=()=>{const u=me();return u?u.email:'visitor'};
FX.link('My messages','help.html#msgs',true);FX.admlink('Messages','admin-messages.html');
const drawMine=()=>{const b=$('#myMsgs');if(!b)return;const L=MS().filter(m=>m.by===msgBy());
 if(!L.length){b.innerHTML='<p class="empty">You have not sent any messages yet.</p>';return}
 pager(b,L,rows=>rows.map(m=>`<article class="card" style="margin-bottom:10px"><p class="small muted">${m.time} UTC | To: Support | <span class="tag ${m.status==='Replied'?'ok':'warn'}">${esc(m.status)}</span></p><p>${esc(m.text)}</p>${m.reply?`<p class="note"><b>Reply from support:</b> ${esc(m.reply)}</p>`:''}</article>`).join(''),5)};
FX.watch(()=>{const f=$('#hf');if(!f||f.dataset.m)return;f.dataset.m=1;f.insertAdjacentHTML('afterend','<h2 id="msgs">Your sent messages</h2><div id="myMsgs"></div>');
 f.addEventListener('submit',()=>{const n=$('#hn',f).value.trim(),e=$('#he',f).value.trim(),t=$('#hm',f).value.trim();if(n.length<2||!emailOk(e)||t.length<10)return;
  FX.set('msgs',[{id:DV.uid('m'),time:DV.now(),by:msgBy(),name:n,email:e,text:t,status:'Sent',reply:''},...MS()]);setTimeout(drawMine,0)},true);drawMine()});
acts.msgread=id=>{const M=MS();M.find(m=>m.id===id).status='Read';FX.set('msgs',M);redraw()};
acts.msgrep=id=>{const M=MS(),m=M.find(x=>x.id===id),r=prompt('Write your reply to '+m.name);if(!r||r.trim().length<2)return;m.reply=r.trim().slice(0,300);m.status='Replied';FX.set('msgs',M);
 const u=DV.users().find(x=>x.email===m.by);if(u)DV.note(u.id,'Support replied to your message: '+m.reply);DV.log(ADMIN,'Replied to message',m.email,'admin');toast('Reply saved.');redraw()};
acts.msgdel=id=>{if(confirm('Delete this message?')){FX.set('msgs',MS().filter(m=>m.id!==id));redraw()}};
FX.page('adminMsgs',()=>{main().innerHTML=`<div class="wrap pg"><h1>Support messages</h1><form class="bar" role="search" onsubmit="return false">${txt('q','Search messages','Name, email or text')}${sel('st','Status',['Sent','Read','Replied'],'All statuses')}</form><div id="list"></div></div>`;
 redraw=()=>{const q=$('#q').value.toLowerCase(),st=$('#st').value;
  pager($('#list'),MS().filter(m=>(!st||m.status===st)&&(m.name+m.email+m.text).toLowerCase().includes(q)),rows=>tbl(['Time','From','Message','Status','Actions'],rows.map(m=>[m.time,esc(m.name)+'<br><span class="small muted">'+esc(m.email)+'</span>',esc(m.text)+(m.reply?'<br><span class="small muted">Reply: '+esc(m.reply)+'</span>':''),`<span class="tag ${m.status==='Sent'?'warn':'ok'}">${m.status}</span>`,`<button class="btn sm alt" data-act="msgread" data-id="${m.id}">Mark read</button> <button class="btn sm" data-act="msgrep" data-id="${m.id}">Reply</button> <button class="btn sm danger" data-act="msgdel" data-id="${m.id}">Delete</button>`])),6)};wire();redraw()});
