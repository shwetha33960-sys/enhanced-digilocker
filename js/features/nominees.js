/* Nominees (nominees.html): add a fictional family member and choose which documents they may view. Nobody is notified. */
FX.link('Nominees','nominees.html');
const nk=()=>'nom_'+me().id;
acts.nomdel=id=>{FX.set(nk(),FX.get(nk(),[]).filter(x=>x.id!==id));redraw()};
FX.page('nominees',()=>{const u=me();redraw=()=>{const N=FX.get(nk(),[]),D2=DV.docs().filter(d=>d.owner===u.id);
 main().innerHTML=`<div class="wrap pg"><h1>Nominees</h1><p class="note">Add a fictional family member and choose which documents they may view. Demo only: nobody is actually notified.</p><form id="nf" class="card two" novalidate>${fld('nn','Nominee name','text','maxlength="40"')}${fld('ne','Nominee email','email')}<div class="fld"><label for="nr">Relationship</label><select id="nr">${['Parent','Spouse','Sibling','Child','Friend'].map(r=>`<option>${r}</option>`).join('')}</select></div><fieldset class="full" style="border:1px solid var(--line);border-radius:8px;margin-bottom:14px"><legend><b>Documents they may view</b></legend>${D2.map(d=>`<label class="chk" style="font-weight:400"><input type="checkbox" name="nd" value="${d.id}">${esc(d.title)} (${esc(d.number)})</label>`).join('')}</fieldset><p class="err full" id="nd-e" role="alert"></p><div><button class="btn">Add nominee</button></div></form><h2>Your nominees</h2><div id="list"></div></div>`;
 pager($('#list'),N,rows=>tbl(['Name','Email','Relationship','Documents','Action'],rows.map(n=>[esc(n.name),esc(n.email),n.rel,n.docs.length,`<button class="btn sm danger" data-act="nomdel" data-id="${n.id}">Remove</button>`])),8);
 $('#nf').onsubmit=e=>{e.preventDefault();const n=$('#nn').value.trim(),em=$('#ne').value.trim(),ch=$$('[name=nd]:checked').map(x=>x.value);
  if([bad('nn',n.length<2&&'Enter the nominee name.'),bad('ne',!emailOk(em)&&'Enter a valid email address.')].some(Boolean))return;
  $('#nd-e').textContent=ch.length?'':'Choose at least one document.';if(!ch.length)return;
  FX.set(nk(),[{id:DV.uid('n'),name:n,email:em,rel:$('#nr').value,docs:ch},...FX.get(nk(),[])]);DV.log(u.email,'Added nominee',n,'profile');toast('Nominee added.');redraw()}};redraw()});
