/* Admin settings (admin-settings.html): upload size limit and allowed file types, enforced on the Uploaded page. */
FX.admlink('Settings','admin-settings.html');
const SET=()=>({maxMb:2,types:['pdf','png','jpg','jpeg','txt'],...FX.get('settings',{})});
FX.page('adminSettings',()=>{const s=SET();main().innerHTML=`<div class="wrap pg"><h1>System settings</h1><form id="sf" class="card" novalidate>${fld('sm','Maximum upload size (MB, 1 to 2)','number',`min="1" max="2" value="${s.maxMb}"`)}<fieldset style="border:0;padding:0"><legend><b>Allowed file types</b></legend>${['pdf','png','jpg','jpeg','txt'].map(t=>`<label class="chk" style="display:inline-block;margin-right:14px;font-weight:400"><input type="checkbox" name="ty" value="${t}" ${s.types.includes(t)?'checked':''}>${t.toUpperCase()}</label>`).join('')}</fieldset><p class="err" id="ty-e" role="alert"></p><button class="btn">Save settings</button></form></div>`;
 $('#sf').onsubmit=e=>{e.preventDefault();const m=+$('#sm').value,t=$$('[name=ty]:checked').map(x=>x.value);if(bad('sm',!(m>=1&&m<=2)&&'Enter a number from 1 to 2.'))return;
  $('#ty-e').textContent=t.length?'':'Allow at least one file type.';if(!t.length)return;FX.set('settings',{maxMb:m,types:t});DV.log(ADMIN,'Changed settings',m+' MB, '+t.join(', '),'admin');toast('Settings saved.')}});
FX.watch(()=>{const f=$('#uf');if(!f||f.dataset.s)return;f.dataset.s=1;f.addEventListener('submit',e=>{const file=$('#ufile').files[0],s=SET();if(!file)return;const ext=file.name.split('.').pop().toLowerCase();
 const m=!s.types.includes(ext)?'This file type is not allowed. Allowed: '+s.types.join(', ').toUpperCase()+'.':file.size>s.maxMb*1048576?'The file is larger than '+s.maxMb+' MB.':'';
 if(m){e.preventDefault();e.stopImmediatePropagation();bad('ufile',m)}},true)});
