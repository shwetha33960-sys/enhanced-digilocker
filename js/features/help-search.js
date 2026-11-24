/* Search box above the FAQ on the Help page. */
FX.watch(()=>{if(!FX.pathIs('help.html')||$('#hq'))return;const d=$$('details');if(!d.length)return;
 d[0].insertAdjacentHTML('beforebegin','<div class="fld"><label for="hq">Search the questions</label><input id="hq" type="search" placeholder="Type a word, for example upload"></div><p id="hcount" class="muted small" aria-live="polite"></p>');
 $('#hq').oninput=e=>{const q=e.target.value.toLowerCase();let n=0;d.forEach(x=>{const m=x.textContent.toLowerCase().includes(q);x.hidden=!m;n+=m});$('#hcount').textContent=q?n+' matching question(s).':''}});
