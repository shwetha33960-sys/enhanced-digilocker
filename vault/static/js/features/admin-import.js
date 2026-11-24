/* Admin CSV user import (admin-import.html): preview and validate before importing. Header row: name,email */
FX.admlink('Import users','admin-import.html');
FX.page('adminImport',()=>{main().innerHTML='<div class="wrap pg"><h1>Import users from CSV</h1><p class="note">Upload a CSV with the header <b>name,email</b>. Use fictional people only. You can preview before importing.</p><div class="card"><div class="fld"><label for="cf">CSV file (up to 200 KB)</label><input type="file" id="cf" accept=".csv,text/csv"><p class="err" id="cf-e" role="alert"></p></div><a class="small" id="cs" href="#">Download a sample CSV</a></div><div id="pv"></div></div>';
 $('#cs').onclick=e=>{e.preventDefault();const a=document.createElement('a');a.href=URL.createObjectURL(new Blob(['name,email\nNeha Varma,neha.demo@example.test\nTarun Joshi,tarun.demo@example.test\n'],{type:'text/csv'}));a.download='sample-users.csv';a.click()};
 $('#cf').onchange=e=>{const f=e.target.files[0];if(!f)return;if(bad('cf',!/\.csv$/i.test(f.name)?'Choose a .csv file.':f.size>204800?'The file is larger than 200 KB.':''))return;const r=new FileReader();
  r.onload=()=>{const have=new Set(DV.users().map(u=>u.email)),seen=new Set(),lines=r.result.split(/\r?\n/).filter(x=>x.trim());
   const rows=lines.slice(1,201).map(l=>{const p=l.split(',').map(x=>x.trim().replace(/^"|"$/g,'')),n=p[0],email=(p[1]||'').toLowerCase();let err='';
    if(!n||n.length<3)err='Name too short';else if(!emailOk(email))err='Invalid email';else if(have.has(email)||seen.has(email))err='Duplicate email';seen.add(email);return{n,email,err}});
   const good=rows.filter(x=>!x.err);
   $('#pv').innerHTML=`<h2>Preview</h2><p>${good.length} valid, ${rows.length-good.length} with problems.</p><div id="pl"></div><button class="btn" id="ci" ${good.length?'':'disabled'}>Import valid rows</button>`;
   pager($('#pl'),rows,rs=>tbl(['Name','Email','Result'],rs.map(x=>[esc(x.n||''),esc(x.email),x.err?`<span class="tag bad">${x.err}</span>`:'<span class="tag ok">OK</span>'])),8);
   $('#ci').onclick=()=>{const U=DV.users();good.forEach(x=>U.push({id:DV.uid('u'),name:x.n,email:x.email,phone:'',city:'',status:'Active',joined:DV.now().slice(0,10),settings:{email:true,activity:true,lang:'English'}}));
    DV.set('users',U);DV.log(ADMIN,'Imported users',good.length+' users','admin');toast(good.length+' users imported.');$('#pv').innerHTML='<p class="note">Import finished. See User management.</p>'}};r.readAsText(f)}});
