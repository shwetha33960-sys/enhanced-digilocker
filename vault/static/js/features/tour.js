/* Onboarding tour: opens once on the first dashboard visit; reopen it from More > Take the tour. */
FX.link('Take the tour','#tour');
const TOUR=[['Dashboard','See your documents, categories and recent activity at a glance.'],['Issued and uploaded','Issued holds sample documents from fictional issuers. Uploaded holds your own dummy files.'],['Get documents','Add sample documents by choosing an issuer and a made-up reference number.'],['Share and check','Create expiring share links and check document numbers.']];
const runTour=n=>{let d=$('#fxtour');if(!d){d=document.createElement('dialog');d.id='fxtour';document.body.appendChild(d)}const last=n===TOUR.length-1;
 d.innerHTML=`<h2 style="margin-top:0">${TOUR[n][0]}</h2><p>${TOUR[n][1]}</p><p class="muted small">Step ${n+1} of ${TOUR.length}</p><div class="row"><button class="btn alt" id="t0">${n?'Back':'Skip'}</button><button class="btn" id="t1">${last?'Finish':'Next'}</button></div>`;
 if(!d.open)d.showModal();$('#t0').onclick=()=>n?runTour(n-1):d.close();$('#t1').onclick=()=>last?d.close():runTour(n+1)};
document.addEventListener('click',e=>{if(e.target.closest('a[href="#tour"]')){e.preventDefault();runTour(0)}});
document.addEventListener('DOMContentLoaded',()=>setTimeout(()=>{if(FX.pathIs('dashboard.html')&&me()&&!FX.get('toured',false)){FX.set('toured',true);runTour(0)}},50));
