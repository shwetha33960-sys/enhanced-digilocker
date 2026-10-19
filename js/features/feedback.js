/* Feedback form (feedback.html) and the admin feedback list (admin-feedback.html). */
FX.link('Feedback','feedback.html',true);FX.admlink('Feedback','admin-feedback.html');
FX.page('feedback',()=>{main().innerHTML=`<div class="wrap pg"><h1>Feedback</h1><form id="fb" class="card" novalidate><fieldset style="border:0;padding:0"><legend><b>Your rating</b></legend>${[1,2,3,4,5].map(n=>`<label class="chk" style="display:inline-block;margin-right:14px;font-weight:400"><input type="radio" name="r" value="${n}">${n} ★</label>`).join('')}</fieldset><p class="err" id="r-e" role="alert"></p><div class="fld"><label for="fc">Comment</label><textarea id="fc" rows="4" maxlength="400" aria-describedby="fc-e"></textarea><p class="err" id="fc-e" role="alert"></p></div><button class="btn">Send feedback</button></form></div>`;
 $('#fb').onsubmit=e=>{e.preventDefault();const r=$('input[name=r]:checked'),c=$('#fc').value.trim();$('#r-e').textContent=r?'':'Choose a rating.';
  if(bad('fc',c.length<5&&'Write at least 5 characters.')||!r)return;const u=me();
  FX.set('feedback',[{time:DV.now(),user:u?u.email:'visitor',rating:+r.value,comment:c},...FX.get('feedback',[])]);toast('Thank you for your feedback.');e.target.reset()}});
FX.page('adminFeedback',()=>{const F=FX.get('feedback',[]),avg=F.length?(F.reduce((a,x)=>a+x.rating,0)/F.length).toFixed(1):'-';
 main().innerHTML=`<div class="wrap pg"><h1>User feedback</h1><div class="row"><b>${F.length} responses</b><span class="tag">Average ${avg} / 5</span></div><div id="list"></div></div>`;
 pager($('#list'),F,rows=>tbl(['Time','User','Rating','Comment'],rows.map(f=>[f.time,esc(f.user),'★'.repeat(f.rating),esc(f.comment)])),8)});
