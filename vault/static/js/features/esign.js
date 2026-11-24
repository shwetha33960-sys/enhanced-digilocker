/* Demo eSign: draw a signature, stamp it on a sample document, download a PNG (esign.html). No legal value. */
FX.link('eSign (demo)','esign.html');
FX.page('esign',()=>{const u=me(),D=DV.docs().filter(d=>d.owner===u.id);
 main().innerHTML=`<div class="wrap pg"><h1>Demo eSign</h1><p class="note">Draw a signature and stamp it on a sample document. This is a demo signature with no legal value.</p><div class="card"><div class="fld"><label for="sd">Document</label><select id="sd">${D.map(d=>`<option value="${d.id}">${esc(d.title)} (${esc(d.number)})</option>`).join('')}</select></div><p>Draw your signature below</p><canvas id="sc" width="480" height="160" style="border:2px solid var(--blue);border-radius:6px;background:#fff;max-width:100%;touch-action:none" aria-label="Signature drawing area"></canvas><div class="row"><button class="btn alt" id="sx" type="button">Clear</button><button class="btn" id="ss" type="button">Apply demo signature</button></div><div id="so"></div></div></div>`;
 const c=$('#sc'),g=c.getContext('2d');let dr=false,ink=false;g.lineWidth=2.5;g.lineCap='round';g.strokeStyle='#09305a';
 const pt=e=>{const r=c.getBoundingClientRect();return[(e.clientX-r.left)*c.width/r.width,(e.clientY-r.top)*c.height/r.height]};
 c.onpointerdown=e=>{dr=ink=true;g.beginPath();g.moveTo(...pt(e));c.setPointerCapture(e.pointerId)};c.onpointermove=e=>{if(dr){g.lineTo(...pt(e));g.stroke()}};c.onpointerup=()=>{dr=false};
 $('#sx').onclick=()=>{g.clearRect(0,0,c.width,c.height);ink=false};
 $('#ss').onclick=()=>{if(!ink)return toast('Draw your signature first.');const d=D.find(x=>x.id===$('#sd').value);if(!d)return;
  const o=document.createElement('canvas');o.width=640;o.height=380;const h=o.getContext('2d');h.fillStyle='#fff';h.fillRect(0,0,640,380);h.strokeStyle='#8f00ff';h.lineWidth=3;h.strokeRect(6,6,628,368);
  h.fillStyle='#09305a';h.font='bold 24px sans-serif';h.fillText(d.title,28,60);h.font='16px sans-serif';h.fillText(d.issuer,28,90);h.fillText('Document no. '+d.number,28,118);h.drawImage(c,80,170,480,160);
  h.fillStyle='#b42318';h.font='14px sans-serif';h.fillText('DEMO SIGNATURE - no legal value - '+DV.now()+' UTC',28,356);
  const url=o.toDataURL('image/png');DV.log(u.email,'Applied demo eSign',d.title,'document');
  $('#so').innerHTML=`<h2>Signed copy</h2><img alt="Signed sample document" style="max-width:100%;border:1px solid var(--line)" src="${url}"><p><a class="btn" download="signed-${esc(d.number)}.png" href="${url}">Download signed copy</a></p>`}});
