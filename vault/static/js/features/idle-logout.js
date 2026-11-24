/* Auto sign-out: warns after 5 minutes without activity, signs out 60 seconds later. */
(()=>{const WARN=300,GRACE=60;let last=Date.now();
 ['click','keydown','mousemove','touchstart'].forEach(e=>document.addEventListener(e,()=>{const d=$('#fxidle');if(!d||!d.open)last=Date.now()}));
 setInterval(()=>{const s=DV.session();if(!s)return;const idle=(Date.now()-last)/1000;
  if(idle>=WARN+GRACE){DV.logout();location.href=s.role==='admin'?'admin-login.html':'login.html';return}
  if(idle>=WARN){let d=$('#fxidle');if(!d){d=document.createElement('dialog');d.id='fxidle';document.body.appendChild(d)}
   d.innerHTML=`<h2 style="margin-top:0">Are you still there?</h2><p>You will be signed out in ${Math.ceil(WARN+GRACE-idle)} seconds.</p><div class="row"><button class="btn" id="fxstay">Stay signed in</button></div>`;
   if(!d.open)d.showModal();$('#fxstay').onclick=()=>{last=Date.now();d.close()}}},1000)})();
