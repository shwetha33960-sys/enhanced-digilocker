/* Digital Vault Demo - sample data and storage layer (FICTIONAL DATA ONLY).
   BACKEND LATER: each DV.* method maps to a REST call, e.g. DV.docs() -> GET /api/documents.
   Sessions here live in sessionStorage for demo only; replace with a server-side session or JWT cookie. */
const DV={
 cats:['Identity','Education','Transport','Finance','Health','Certificates'],
 icons:{Identity:'🪪',Education:'🎓',Transport:'🚗',Finance:'💳',Health:'🩺',Certificates:'📜'},
 get(k){try{return JSON.parse(localStorage.getItem('dv_'+k))||[]}catch(e){return[]}},
 set(k,v){try{localStorage.setItem('dv_'+k,JSON.stringify(v))}catch(e){alert('Browser storage is full. Delete some uploads or reset demo data.')}},
 users(){return this.get('users')},docs(){return this.get('docs')},notes(){return this.get('notes')},shares(){return this.get('shares')},logs(){return this.get('logs')},
 now(){return new Date().toISOString().slice(0,16).replace('T',' ')},
 uid(p){return p+Date.now()+Math.random().toString(36).slice(2,5)},
 log(user,action,detail,type){const l=this.logs();l.unshift({id:this.uid('l'),time:this.now(),user,action,detail,type});this.set('logs',l.slice(0,500))},
 note(owner,text){const n=this.notes();n.unshift({id:this.uid('n'),owner,text,time:this.now(),read:false});this.set('notes',n)},
 session(){try{return JSON.parse(sessionStorage.getItem('dv_session'))}catch(e){return null}},
 login(role,id){sessionStorage.setItem('dv_session',JSON.stringify({role,id}))},
 logout(){sessionStorage.removeItem('dv_session')},
 reset(){Object.keys(localStorage).filter(k=>k.startsWith('dv_')).forEach(k=>localStorage.removeItem(k));this.seed()},
 seed(){
  if(localStorage.getItem('dv_seeded'))return;
  const F=['Asha','Rahul','Meera','Arjun','Fatima','Kiran','Nisha','Vivek','Anita','Sanjay'],L=['Menon','Nair','Iyer','Das','Khan','Rao','Pillai'];
  const users=[],docs=[],notes=[],logs=[];
  const T=[['Sample Identity Card','Identity','Demo Citizen Services (fictional)','ID'],['Sample Driving Licence','Transport','Sample Transport Dept (fictional)','DL'],['Sample Degree Certificate','Education','Demo University','DEG'],['Sample Marksheet - Semester 6','Education','Demo University','MS'],['Sample Insurance Policy','Finance','Demo Insurance Co. (fictional)','POL'],['Sample Vaccination Record','Health','Demo Health Dept (fictional)','VAC'],['Sample Vehicle Registration','Transport','Sample Transport Dept (fictional)','RC'],['Sample Course Completion','Certificates','Demo Skills Academy','CRS']];
  const U=[['My Resume (sample)','Certificates'],['Address Proof (sample)','Identity'],['Passport Photo (sample)','Identity']];
  const pad=n=>String(n).padStart(2,'0');
  let n=0;
  for(let i=0;i<24;i++){
   const f=F[i%10];
   const u={id:'u'+(i+1),name:f+' '+L[(i*3+Math.floor(i/10))%7],email:i?f.toLowerCase()+(i+1)+'.demo@example.test':'asha.demo@example.test',phone:'',city:'',status:i%7===3?'Suspended':'Active',joined:`2026-${pad(1+i%9)}-${pad(10+i%18)}`,settings:{email:true,activity:true,lang:'English'}};
   users.push(u);
   const ni=i?2:8,nu=i?1:2;
   for(let j=0;j<ni;j++,n++){const t=T[(i+j)%8];docs.push({id:'d'+n,owner:u.id,kind:'issued',cat:t[1],title:t[0],issuer:t[2],number:`DEMO-${t[3]}-${100000+n}`,date:`2026-${pad(1+(n*2)%9)}-${pad(1+(n*5)%27)}`,size:(120+n*7)+' KB',status:'Active'})}
   for(let j=0;j<nu;j++,n++){const t=U[(i+j)%3];docs.push({id:'d'+n,owner:u.id,kind:'uploaded',cat:t[1],title:t[0],issuer:'Uploaded by you',number:'-',date:`2026-${pad(1+(n*2)%9)}-${pad(1+(n*5)%27)}`,size:(80+n*5)+' KB',status:i%11===5?'Flagged':'Active',dataUrl:''})}
  }
  ['Welcome to Digital Vault Demo. All documents here are fictional samples.','A new sample document was added to your issued list.','Reminder: only upload dummy files in this demo.','Your profile is ready. You can edit it any time.'].forEach((t,i)=>notes.push({id:'n'+i,owner:'u1',text:t,time:`2026-10-1${i} 10:00`,read:i>1}));
  const A=[['Signed in','Demo sign-in','auth'],['Uploaded document','Sample file','document'],['Downloaded document','Sample download','document'],['Viewed document','Sample preview','document'],['Updated profile','Name or settings','profile']];
  for(let i=0;i<45;i++){const a=A[i%5];logs.push({id:'l'+i,time:`2026-10-${pad(1+i%16)} ${pad(8+i%10)}:${pad(i*7%60)}`,user:users[i%24].email,action:a[0],detail:a[1],type:a[2]})}
  logs.sort((a,b)=>b.time.localeCompare(a.time));
  this.set('users',users);this.set('docs',docs);this.set('notes',notes);this.set('logs',logs);
  localStorage.setItem('dv_seeded','1');
 }
};
