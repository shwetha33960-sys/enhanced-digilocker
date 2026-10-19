/* Sign-in history table on the Profile page. Devices and places are made-up examples. */
FX.watch(()=>{const f=$('#pf');if(!f||$('#sh'))return;const u=me(),dv=['Chrome on Windows','Safari on iPhone','Edge on Windows','Firefox on Linux'];
 const L=DV.logs().filter(l=>l.user===u.email&&l.action==='Signed in').slice(0,8);
 f.insertAdjacentHTML('afterend',`<section class="card" id="sh" style="margin-top:16px"><h2 style="margin-top:0">Sign-in history</h2><p class="small muted">Devices and places are made-up examples. A real version would record them on the server.</p>${L.length?tbl(['Time (UTC)','Device','Place'],L.map((l,i)=>[l.time,dv[(parseInt(l.time.slice(-2),10)+i)%4],'Sample City'])):'<p class="empty">No sign-ins recorded yet.</p>'}</section>`)});
