/* Profile photo: pick an image, it is cropped to a square and shown in the header and on Profile. */
const avKey=()=>'avatar_'+me().id;
FX.hdr(()=>{const u=me(),bar=$('.bar-in');if(!u||!bar||document.body.dataset.area==='bare')return;const a=FX.get(avKey(),'');if(!a)return;
 const i=document.createElement('img');i.src=a;i.alt='Your profile photo';i.style.cssText='width:36px;height:36px;border-radius:50%;object-fit:cover;order:98';bar.append(i)});
FX.watch(()=>{const f=$('#pf');if(!f||$('#ph'))return;const a=FX.get(avKey(),'');
 f.insertAdjacentHTML('afterend',`<section class="card" id="ph" style="margin-top:16px"><h2 style="margin-top:0">Profile photo</h2>${a?`<img src="${a}" alt="Your profile photo" style="width:96px;height:96px;border-radius:50%;object-fit:cover"><br>`:''}<div class="fld"><label for="pi">Choose an image (PNG or JPG, fictional photos only)</label><input type="file" id="pi" accept="image/png,image/jpeg"><p class="err" id="pi-e" role="alert"></p></div>${a?'<button class="btn sm danger" id="prm" type="button">Remove photo</button>':''}</section>`);
 $('#pi').onchange=e=>{const f=e.target.files[0];if(!f)return;if(bad('pi',f.size>3145728&&'Image must be under 3 MB.'))return;const img=new Image(),r=new FileReader();
  r.onload=()=>{img.onload=()=>{const c=document.createElement('canvas');c.width=c.height=128;const s=Math.min(img.width,img.height);c.getContext('2d').drawImage(img,(img.width-s)/2,(img.height-s)/2,s,s,0,0,128,128);FX.set(avKey(),c.toDataURL('image/jpeg',.8));header();$('#ph').remove();toast('Photo saved.')};img.src=r.result};r.readAsDataURL(f)};
 if($('#prm'))$('#prm').onclick=()=>{localStorage.removeItem('fx_'+avKey());header();$('#ph').remove()}});
