/* Favourites: star button on every document card + a Favourites page (favourites.html). */
const favs=()=>FX.get('fav',[]);
FX.css('.star{background:none;border:0;font-size:22px;cursor:pointer;color:#b8860b;margin-left:auto;align-self:flex-start}');
FX.link('Favourites','favourites.html');
FX.watch(()=>$$('.doc').forEach(c=>{if(c.querySelector('.star'))return;const id=FX.docId(c);if(!id)return;const b=document.createElement('button'),on=()=>favs().includes(id);b.className='star';b.type='button';
 const draw=()=>{b.textContent=on()?'★':'☆';b.setAttribute('aria-pressed',on());b.setAttribute('aria-label',(on()?'Remove from':'Add to')+' favourites')};draw();
 b.onclick=()=>{FX.set('fav',on()?favs().filter(x=>x!==id):[...favs(),id]);draw()};c.appendChild(b)}));
FX.page('favourites',()=>{const u=me(),f=favs();main().innerHTML=`<div class="wrap pg"><h1>Favourite documents</h1><div class="grid">${DV.docs().filter(d=>d.owner===u.id&&f.includes(d.id)).map(card).join('')||'<p class="empty">No favourites yet. Tap the star on any document.</p>'}</div></div>`});
