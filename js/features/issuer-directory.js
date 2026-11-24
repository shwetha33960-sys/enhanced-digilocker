/* Issuer directory (issuers.html): browse the fictional issuers and what they offer. */
FX.link('Issuer directory','issuers.html');
FX.page('issuers',()=>{main().innerHTML='<div class="wrap pg"><h1>Issuer directory</h1><p class="note">Fictional issuers for this demo. None of them are real organisations.</p><div class="fld" style="max-width:340px"><label for="iq">Search issuers or document types</label><input id="iq" type="search"></div><div class="grid" id="ig"></div></div>';
 const draw=()=>{const q=$('#iq').value.toLowerCase();$('#ig').innerHTML=ISS.filter(i=>(i[0]+' '+i[2].join(' ')).toLowerCase().includes(q)).map(i=>`<article class="card"><span class="ico">${DV.icons[i[1]]}</span><h3>${esc(i[0])}</h3><p class="muted">${i[1]}</p><ul>${i[2].map(t=>`<li>${t}</li>`).join('')}</ul><a class="btn sm" href="get-documents.html">Get documents</a></article>`).join('')||'<p class="empty">No issuers match your search.</p>'};
 $('#iq').oninput=draw;draw()});
