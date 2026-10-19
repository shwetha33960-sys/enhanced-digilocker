/* Admin announcements (admin-announcements.html). Each one becomes a notification for every user. */
FX.admlink('Announcements','admin-announcements.html');
const AN=()=>FX.get('ann',[]);
acts.anndel=id=>{FX.set('ann',AN().filter(a=>a.id!==id));redraw()};
FX.page('adminAnn',()=>{redraw=()=>{main().innerHTML=`<div class="wrap pg"><h1>Announcements</h1><p class="note">Each announcement appears in every user's notifications the next time they open a page.</p><form id="af" class="card" novalidate>${fld('at','Title','text','maxlength="60"')}<div class="fld"><label for="am">Message</label><textarea id="am" rows="3" maxlength="240" aria-describedby="am-e"></textarea><p class="err" id="am-e" role="alert"></p></div><button class="btn">Send announcement</button></form><h2>Sent announcements</h2><div id="list"></div></div>`;
 pager($('#list'),AN(),rows=>tbl(['Sent','Title','Message','Action'],rows.map(a=>[a.time,esc(a.title),esc(a.text),`<button class="btn sm danger" data-act="anndel" data-id="${a.id}">Delete</button>`])),6);
 $('#af').onsubmit=e=>{e.preventDefault();const t=$('#at').value.trim(),m=$('#am').value.trim();if([bad('at',t.length<3&&'Enter a title (at least 3 characters).'),bad('am',m.length<5&&'Write a message (at least 5 characters).')].some(Boolean))return;
  FX.set('ann',[{id:DV.uid('a'),time:DV.now(),title:t,text:m},...AN()]);DV.log(ADMIN,'Sent announcement',t,'admin');toast('Announcement sent.');redraw()}};redraw()});
document.addEventListener('DOMContentLoaded',()=>setTimeout(()=>{const u=me();if(!u)return;const k='annd_'+u.id,done=FX.get(k,[]),fresh=AN().filter(a=>!done.includes(a.id));if(!fresh.length)return;
 fresh.slice().reverse().forEach(a=>DV.note(u.id,'Announcement: '+a.title+'. '+a.text));FX.set(k,[...done,...fresh.map(a=>a.id)]);header()},0));
