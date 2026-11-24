/* Dark mode: toggle button in the header, choice is remembered. */
document.documentElement.dataset.theme=FX.get('theme','light');
const D='html[data-theme=dark] ';
FX.css(`${D}body{background:#071a30}${D}h1,${D}h2{color:#d9b8ff}${D}.card,${D}.top,${D}.bar,${D}.tw,${D}details,${D}.notes li,${D}.paper,${D}dialog,${D}input,${D}select,${D}textarea,${D}.btn.alt,${D}.more div{background:#0e2a4a;color:#e6edf8}${D}a:not(.btn){color:#d2a8ff}${D}.btn.alt{color:#d2a8ff;border-color:#d2a8ff}${D}.stat b,${D}.steps .card b{color:#d2a8ff}${D}.tag{color:#e5ccff}${D}th{color:#e5ccff}${D}.notes li.unread{background:#163a63}${D}.muted,${D}dt{color:#a3b3cf}${D}input,${D}select,${D}textarea{border-color:#4a6290}${D}.hero h1{color:#fff}`);
FX.hdr(()=>{const dk=()=>document.documentElement.dataset.theme==='dark',b=document.createElement('button');b.type='button';b.className='btn sm alt';
 const draw=()=>{b.textContent=dk()?'Light mode':'Dark mode';b.setAttribute('aria-pressed',dk())};draw();
 b.onclick=()=>{const t=dk()?'light':'dark';document.documentElement.dataset.theme=t;FX.set('theme',t);draw()};$('.bar-in').append(b)});
