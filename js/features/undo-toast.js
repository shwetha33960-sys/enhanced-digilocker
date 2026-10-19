/* Undo bar after deleting an upload. Needs recycle-bin.js listed BEFORE this file in features.js. */
if(typeof bin==='function'){const del=acts.delete;acts.delete=function(id){const n=bin().length;del(id);if(bin().length>n)sessionStorage.setItem('fx_undo',id)}}
FX.watch(()=>{const id=sessionStorage.getItem('fx_undo');if(!id||!FX.pathIs('uploaded.html')||$('#fxu'))return;const h=$('#main .wrap h1');if(!h)return;
 h.insertAdjacentHTML('afterend','<div class="note row" id="fxu" role="status">Document moved to the recycle bin. <button class="btn sm" id="fxub" type="button">Undo</button></div>');
 $('#fxub').onclick=()=>{const b=bin(),d=b.find(x=>x.id===id);if(d){delete d.deletedAt;DV.set('docs',[d,...DV.docs()]);FX.set('bin',b.filter(x=>x.id!==id))}sessionStorage.removeItem('fx_undo');location.reload()};
 setTimeout(()=>{sessionStorage.removeItem('fx_undo');const x=$('#fxu');if(x)x.remove()},10000)});
