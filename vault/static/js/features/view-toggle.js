/* Grid / list view switch on the document list pages. */
FX.css('.grid.list{grid-template-columns:1fr}');
const applyView=()=>{const l=FX.get('view','grid')==='list';$$('.grid').forEach(g=>g.classList.toggle('list',l));const b=$('.vt');if(b)b.textContent=l?'Switch to grid view':'Switch to list view'};
FX.watch(()=>{if($('#list .grid')&&!$('.vt')){const b=document.createElement('button');b.type='button';b.className='btn sm alt vt';b.style.margin='6px 0';b.onclick=()=>{FX.set('view',FX.get('view','grid')==='list'?'grid':'list');applyView()};$('#list').before(b)}applyView()});
