/* Accessibility panel (bottom-left): text size and high contrast. Choices are remembered. Text size uses CSS zoom. */
FX.css('.fxa{position:fixed;left:14px;bottom:14px;z-index:40}.fxa .card{margin-bottom:8px;width:230px}html.hc{--blue:#003a9e;--muted:#222;--line:#000;--text:#000}html.hc a{text-decoration:underline}html.hc .btn.alt{border-width:3px}');
const applyA11y=()=>{document.body.style.zoom=FX.get('zoom',1);document.documentElement.classList.toggle('hc',FX.get('hc',false))};
document.addEventListener('DOMContentLoaded',()=>{applyA11y();const w=document.createElement('div');w.className='fxa';
 w.innerHTML='<div class="card" id="fxap" hidden><p><b>Text size</b></p><div class="row"><button class="btn sm alt" data-z="-0.1" aria-label="Smaller text">A-</button><button class="btn sm alt" data-z="0" aria-label="Reset text size">Reset</button><button class="btn sm alt" data-z="0.1" aria-label="Larger text">A+</button></div><label class="chk"><input type="checkbox" id="fhc"> High contrast</label></div><button class="btn sm" id="fxab" aria-expanded="false" aria-controls="fxap">Accessibility</button>';
 document.body.append(w);$('#fhc').checked=FX.get('hc',false);
 $('#fxab').onclick=()=>{const p=$('#fxap');p.hidden=!p.hidden;$('#fxab').setAttribute('aria-expanded',!p.hidden)};
 $('#fhc').onchange=e=>{FX.set('hc',e.target.checked);applyA11y()};
 w.addEventListener('click',e=>{const z=e.target.dataset.z;if(z===undefined)return;FX.set('zoom',z==='0'?1:Math.min(1.5,Math.max(.8,+(FX.get('zoom',1)+ +z).toFixed(2))));applyA11y()})});
