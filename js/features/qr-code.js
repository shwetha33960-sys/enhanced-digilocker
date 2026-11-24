/* QR code on the details page. It points to the demo "Check document" page. Needs internet once to load the small QR library. */
FX.watch(()=>{
 const d=$('.detail .card');
 if(d&&!$('#qr')){const doc=DV.docs().find(x=>x.id===new URLSearchParams(location.search).get('id'));if(doc){
  d.insertAdjacentHTML('beforeend','<h2>QR code</h2><div id="qr" class="muted small">Loading QR code (needs internet)...</div>');
  const url=new URL('verify.html?no='+encodeURIComponent(doc.number),location.href).href;
  const make=()=>{$('#qr').textContent='';new QRCode($('#qr'),{text:url,width:128,height:128});$('#qr').insertAdjacentHTML('beforeend','<p class="small muted">Opens the demo "Check document" page. Not an official QR code.</p>')};
  if(window.QRCode)make();else{const s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';s.onload=make;s.onerror=()=>{$('#qr').textContent='The QR library could not load. Check your internet connection.'};document.head.appendChild(s)}}}
 if(FX.pathIs('verify.html')&&!$('#vq')){const n=new URLSearchParams(location.search).get('no'),i=$('#vn');if(n&&i){i.value=n;i.insertAdjacentHTML('afterend','<span id="vq"></span>');$('#vf').requestSubmit()}}});
