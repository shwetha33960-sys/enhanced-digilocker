/* One-time, dismissible notice that the demo keeps data only in this browser. */
document.addEventListener('DOMContentLoaded',()=>{if(FX.get('notice',false))return;const b=document.createElement('div');b.className='card';b.setAttribute('role','region');b.setAttribute('aria-label','Demo notice');
 b.style.cssText='position:fixed;left:50%;transform:translateX(-50%);bottom:14px;z-index:50;max-width:560px;width:calc(100% - 28px)';
 b.innerHTML='<p style="margin-top:0">This demo saves your choices and sample data only in this browser. It does not collect personal data or send anything to a server.</p><button class="btn sm" id="fxok">Got it</button>';
 document.body.append(b);$('#fxok').onclick=()=>{FX.set('notice',true);b.remove()}});
