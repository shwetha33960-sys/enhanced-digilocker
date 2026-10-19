/* Storage meter on the Profile page: how much browser storage the demo uses. */
FX.watch(()=>{const f=$('#pf');if(!f||$('#sm'))return;let b=0;for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);b+=(k.length+localStorage.getItem(k).length)*2}
 const p=Math.min(100,Math.round(b/5242880*100));
 f.insertAdjacentHTML('afterend',`<section class="card" id="sm" style="margin-top:16px"><h2 style="margin-top:0">Storage used</h2><div class="track" role="progressbar" aria-valuenow="${p}" aria-valuemin="0" aria-valuemax="100" aria-label="Storage used"><i style="width:${p}%"></i></div><p class="small muted">${(b/1048576).toFixed(2)} MB of about 5 MB browser storage (${p}%). Uploaded images use the most.</p></section>`)});
