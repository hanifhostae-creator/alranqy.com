/* =========================================================================
   ALRANQQY — site script
   Edit services / projects / FAQs in the DATA block below.
   ========================================================================= */
(function(){
'use strict';

/* ============ DATA ============ */
const SERVICES = [
  {icon:"s-window", tone:"", name:"Aluminium Sliding Windows", spec:"2-track • 3-track • casement", desc:"2 and 3-track sliding windows, casement windows, mosquito mesh and sound-proof options."},
  {icon:"s-door", tone:"silver", name:"Aluminium Doors", spec:"main • bathroom • sliding", desc:"Main doors, bathroom doors, sliding and casement doors with premium handles and locks."},
  {icon:"s-partition", tone:"", name:"Glass Partitions", spec:"10mm • 12mm toughened", desc:"10mm and 12mm toughened glass partitions for offices and homes — frameless or aluminium framed."},
  {icon:"s-shop", tone:"silver", name:"Shop Fronts & Fixed Glass", spec:"patch fittings • fixed panels", desc:"Showroom and shop fronts, toughened glass doors, patch fittings and fixed glass panels."},
  {icon:"s-facade", tone:"", name:"Facades & Curtain Walls", spec:"structural glazing", desc:"Structural glazing and aluminium facade work for commercial buildings and villas."},
  {icon:"s-shower", tone:"silver", name:"Shower Enclosures", spec:"frameless • SS hardware", desc:"Frameless toughened glass shower enclosures with premium stainless-steel hardware."},
  {icon:"s-railing", tone:"", name:"Glass Railings", spec:"balcony • staircase", desc:"Balcony and staircase glass railings with stainless-steel fittings — safe and stylish."},
  {icon:"s-mirror", tone:"silver", name:"Mirrors & Designer Glass", spec:"frosted • fluted • boards", desc:"Designer mirrors, glass shelves, frosted and fluted glass, and glass writing boards."},
  {icon:"i-wrench", tone:"", name:"Maintenance & Repair", spec:"rollers • locks • sealing", desc:"Roller, lock, handle and hinge replacement, rubber and channel change, sealing, and glass replacement for existing aluminium and glass work."},
];
const PROJECTS = [
  {img:"assets/img/sliding-window.jpg", t:"Flat Sliding Windows — Al Nahda", s:"Residential • Aluminium", c:"residential"},
  {img:"assets/img/office-partition.jpg", t:"Office Glass Partition", s:"Commercial • 12mm Toughened", c:"commercial glass"},
  {img:"assets/img/shop-front.jpg", t:"Shop Front Glass Work", s:"Commercial • Frameless Glass", c:"commercial glass"},
  {img:"assets/img/glass-railing.jpg", t:"Balcony Glass Railing", s:"Residential • SS Fittings", c:"residential glass"},
  {img:"assets/img/facade-blue.jpg", t:"Building Glass Facade", s:"Commercial • Curtain Wall", c:"commercial"},
  {img:"assets/img/shower-enclosure.jpg", t:"Glass Shower Enclosure", s:"Residential • Frameless Glass", c:"residential glass"},
  {img:"assets/img/office-glass-walls.jpg", t:"Office Glass Walls", s:"Commercial • Glass Partition", c:"commercial glass"},
  {img:"assets/img/technician-window.jpg", t:"Window Installation & Maintenance", s:"Maintenance • Fitting & Repair", c:"maintenance"},
];
const FAQS = [
  ["Is the site visit and measurement free?","Yes. Site visit, measurement and consultation are completely free anywhere in Dubai. You only pay when you approve the work."],
  ["Do you only do new work, or maintenance as well?","Both. Installation of new aluminium and glass work is our main service, and we also maintain and repair existing work — rollers, locks, handles, hinges, sealing and broken glass replacement."],
  ["How long does the work take?","Most residential jobs are fabricated and installed within 7–10 days of measurement. Timelines for larger commercial projects are confirmed clearly in the quotation."],
  ["How do payments work?","Typically an advance for materials, a second payment when fabrication is complete, and the balance after installation. Bank transfer, card and cash are accepted."],
  ["Which areas do you serve?","We are based in Al Nahda 1, Dubai, and serve customers across Dubai, UAE."],
];
const WA = "971521195673";
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const CAT_ICON = {Residential:"i-home", Commercial:"i-building", Maintenance:"i-wrench"};

/* ============ Render ============ */
$('#serviceGrid').innerHTML = SERVICES.map(s=>`
  <div class="svc-cell"><article class="svc glow">
    <div class="top"><span class="ico3d ${s.tone}"><svg><use href="#${s.icon}"/></svg></span></div>
    <span class="spec">${s.spec}</span>
    <h3>${s.name}</h3><p>${s.desc}</p>
    <a href="#contact" data-need="${s.name}">Ask for a quote<svg><use href="#i-arrow"/></svg></a>
  </article></div>`).join('');
$('#gallery').innerHTML = PROJECTS.map((p,i)=>{ const cat = p.s.split(' • ')[0]; return `
  <button type="button" class="w-card" data-cat="${p.c}" data-i="${i}" aria-label="View ${p.t}">
    <span class="w-media"><img src="${p.img}" alt="${p.t}" loading="lazy" />
      <span class="w-badge"><svg><use href="#${CAT_ICON[cat]||'i-grid'}"/></svg>${cat}</span>
      <span class="w-zoom"><svg><use href="#i-eye"/></svg></span></span>
    <span class="w-body"><b>${p.t}</b><small>${p.s}</small></span>
  </button>`; }).join('');
$('#faqList').innerHTML = FAQS.map((f,i)=>`
  <div class="faq${i===0?' open':''}"><button type="button" aria-expanded="${i===0}">${f[0]}<span class="pm" aria-hidden="true"></span></button>
  <div class="ans"><div><p>${f[1]}</p></div></div></div>`).join('');
$('#yr').textContent = new Date().getFullYear();

/* ============ Header, progress, active link ============ */
const header = $('#header'), prog = $('#progress');
const links = $$('.menu a');
const secs = links.map(a=>$(a.getAttribute('href')));
function onScroll(){
  header.classList.toggle('scrolled', scrollY > 20);
  const h = document.documentElement;
  prog.style.width = (scrollY/Math.max(1,h.scrollHeight-innerHeight)*100)+'%';
  let cur = -1; secs.forEach((s,i)=>{ if(s && s.getBoundingClientRect().top < innerHeight*.35) cur = i; });
  links.forEach((a,i)=>a.classList.toggle('active', i===cur));
}
addEventListener('scroll', onScroll, {passive:true}); onScroll();
const burger = $('#burger'), menu = $('#menu');
burger.addEventListener('click', ()=>{ const o = menu.classList.toggle('open'); burger.setAttribute('aria-expanded', o); });
links.forEach(a=>a.addEventListener('click', ()=>{ menu.classList.remove('open'); burger.setAttribute('aria-expanded', false); }));

/* ============ Button ripple ============ */
document.addEventListener('pointerdown', e=>{
  const b = e.target.closest('.btn'); if(!b || reduced) return;
  const r = b.getBoundingClientRect(), d = Math.max(r.width, r.height)*2.2, s = document.createElement('span');
  s.className = 'rip'; s.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX-r.left-d/2}px;top:${e.clientY-r.top-d/2}px`;
  b.appendChild(s); setTimeout(()=>s.remove(), 700);
});

/* ============ Aluminium particle field ============
   Window frames, aluminium profile sections (U, L, I, T, box, 2-track),
   glass panes and screws drift across the page. Each one "builds" itself
   line by line, holds, fades and is rebuilt elsewhere. Nearby pieces are
   linked by blueprint lines; the cursor pulls in links and pushes pieces. */
(function(){
  const cv = $('#fx'); if(!cv || !cv.getContext) return;
  const ctx = cv.getContext('2d');
  const R = (a,b)=>a+Math.random()*(b-a);
  const rect = (x,y,w,h)=>({pts:[[x,y],[x+w,y],[x+w,y+h],[x,y+h]],closed:true});
  const line = (x1,y1,x2,y2)=>({pts:[[x1,y1],[x2,y2]],closed:false});
  const poly = pts=>({pts,closed:true});
  const SHAPES = {
    window:[rect(-.5,-.4,1,.8),rect(-.42,-.32,.84,.64),line(0,-.32,0,.32),line(-.07,-.06,-.07,.06),line(.07,-.06,.07,.06)],
    slider:[rect(-.5,-.24,1,.48),line(-.5,-.08,.5,-.08),line(-.5,.08,.5,.08),line(-.1,-.24,-.1,-.08),line(.1,.08,.1,.24)],
    u:[poly([[-.4,-.4],[-.4,.4],[.4,.4],[.4,-.4],[.3,-.4],[.3,.3],[-.3,.3],[-.3,-.4]])],
    l:[poly([[-.4,-.4],[-.4,.4],[.4,.4],[.4,.3],[-.3,.3],[-.3,-.4]])],
    i:[poly([[-.4,-.45],[.4,-.45],[.4,-.35],[.07,-.35],[.07,.35],[.4,.35],[.4,.45],[-.4,.45],[-.4,.35],[-.07,.35],[-.07,-.35],[-.4,-.35]])],
    t:[poly([[-.45,-.4],[.45,-.4],[.45,-.3],[.06,-.3],[.06,.45],[-.06,.45],[-.06,-.3],[-.45,-.3]])],
    box:[rect(-.4,-.4,.8,.8),rect(-.3,-.3,.6,.6)],
    pane:[rect(-.4,-.5,.8,1),line(-.25,-.2,0,-.42),line(-.25,.05,.18,-.38)],
    screw:[]
  };
  for(const k in SHAPES){ SHAPES[k].len = SHAPES[k].reduce((L,p)=>{ let l=0; const n=p.pts.length;
    for(let i=1;i<n+(p.closed?1:0);i++){ const a=p.pts[i-1], b=p.pts[i%n]; l+=Math.hypot(b[0]-a[0],b[1]-a[1]); } return L+l; },0); }
  const BAG = ['window','window','window','slider','slider','u','u','l','l','i','i','t','box','box','pane','pane','pane','screw','screw','spark','spark','spark','spark'];
  let W=0, H=0, dpr=1, parts=[], raf=null, last=0, mouse={x:-9999,y:-9999,on:false}, sy=scrollY;

  function spawn(p, initial){
    p.type = BAG[(Math.random()*BAG.length)|0];
    p.z = R(.45,1);
    p.s = (p.type==='spark'? R(1,2.4) : p.type==='screw'? R(5,8) : R(16,36)) * (0.6+p.z*0.5);
    p.x = R(0,W); p.y = R(0,H);
    const sp = .12 + p.z*.22;
    p.vx = R(-sp,sp); p.vy = R(-sp*1.2,sp*.4);
    p.rot = R(0,Math.PI*2); p.vr = R(-.004,.004);
    p.build = p.type==='spark'||p.type==='screw' ? 0 : R(1.6,3.2);   // seconds to draw itself
    p.hold = R(7,15); p.fade = R(1.2,2.2);
    p.age = initial ? R(0,p.build+p.hold) : 0;
    p.blue = Math.random() < .35;
    return p;
  }
  function size(){
    dpr = Math.min(devicePixelRatio||1, 2);
    W = innerWidth; H = innerHeight;
    cv.width = W*dpr; cv.height = H*dpr; ctx.setTransform(dpr,0,0,dpr,0,0);
    const n = Math.round(Math.min(90, Math.max(26, W*H/15000)));
    while(parts.length < n) parts.push(spawn({}, true));
    parts.length = n;
  }
  function lifeAlpha(p){
    const t = p.age, end = p.build+p.hold;
    if(t < p.build) return Math.min(1, t/p.build*2.2);
    if(t < end) return 1;
    return Math.max(0, 1-(t-end)/p.fade);
  }
  function drawPart(p, a){
    const s = p.s;
    ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.rot);
    if(p.type==='spark'){
      const tw = .55+.45*Math.sin(p.age*3+p.x);
      ctx.fillStyle = `rgba(150,205,255,${.7*a*tw})`;
      ctx.beginPath(); ctx.arc(0,0,s,0,Math.PI*2); ctx.fill();
      ctx.restore(); return;
    }
    const col = p.blue ? `rgba(95,178,255,${.55*a*p.z})` : `rgba(205,218,232,${.42*a*p.z})`;
    ctx.lineWidth = p.type==='screw' ? 1.1 : 1.2; ctx.strokeStyle = col; ctx.lineJoin='round'; ctx.lineCap='round';
    if(p.type==='screw'){
      ctx.beginPath(); ctx.arc(0,0,s/2,0,Math.PI*2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-s*.28,0); ctx.lineTo(s*.28,0); ctx.moveTo(0,-s*.28); ctx.lineTo(0,s*.28); ctx.stroke();
      ctx.restore(); return;
    }
    const sh = SHAPES[p.type];
    if(p.type==='pane'){
      const g = ctx.createLinearGradient(-s*.4,-s*.5,s*.4,s*.5);
      g.addColorStop(0,`rgba(95,178,255,${.16*a*p.z})`); g.addColorStop(1,`rgba(47,123,255,${.04*a*p.z})`);
      ctx.fillStyle = g; ctx.fillRect(-s*.4,-s*.5,s*.8,s);
    }
    const prog = p.build ? Math.min(1, p.age/p.build) : 1;
    const L = sh.len*s;
    if(prog < 1){ ctx.setLineDash([L*prog, L]); }
    ctx.beginPath();
    sh.forEach(seg=>{ seg.pts.forEach((pt,i)=> i ? ctx.lineTo(pt[0]*s,pt[1]*s) : ctx.moveTo(pt[0]*s,pt[1]*s)); if(seg.closed) ctx.closePath(); });
    ctx.stroke();
    if(prog < 1){ // glowing "cutting head" at the tip of the line being drawn
      ctx.setLineDash([]);
      ctx.fillStyle = `rgba(140,200,255,${.9*a})`; ctx.shadowColor='#5fb2ff'; ctx.shadowBlur=8;
      const ang = prog*Math.PI*2; ctx.beginPath(); ctx.arc(Math.cos(ang)*s*.45, Math.sin(ang)*s*.4, 1.6, 0, Math.PI*2); ctx.fill();
    }
    ctx.restore();
  }
  function frame(t){
    const dt = Math.min(.05, (t-(last||t))/1000); last = t;
    const ds = scrollY - sy; sy = scrollY;
    ctx.clearRect(0,0,W,H);
    // update
    for(const p of parts){
      p.age += dt;
      if(p.age > p.build+p.hold+p.fade){ spawn(p,false); continue; }
      p.x += p.vx*dt*60; p.y += p.vy*dt*60 - ds*(p.z-.3)*.35; p.rot += p.vr*dt*60;
      if(mouse.on){ const dx=p.x-mouse.x, dy=p.y-mouse.y, d=Math.hypot(dx,dy); if(d<140 && d>0){ const f=(140-d)/140*.9; p.x+=dx/d*f; p.y+=dy/d*f; } }
      const m = 60; if(p.x<-m) p.x=W+m; else if(p.x>W+m) p.x=-m; if(p.y<-m) p.y=H+m; else if(p.y>H+m) p.y=-m;
      p.a = lifeAlpha(p);
    }
    // blueprint links
    ctx.lineWidth = 1;
    for(let i=0;i<parts.length;i++){ const a=parts[i]; if(a.type==='spark') continue;
      for(let j=i+1;j<parts.length;j++){ const b=parts[j]; if(b.type==='spark') continue;
        const dx=a.x-b.x, dy=a.y-b.y, d2=dx*dx+dy*dy; if(d2 > 150*150) continue;
        const al = (1-Math.sqrt(d2)/150)*.16*Math.min(a.a,b.a);
        ctx.strokeStyle=`rgba(95,178,255,${al})`; ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke(); } }
    if(mouse.on){ for(const p of parts){ const d=Math.hypot(p.x-mouse.x,p.y-mouse.y); if(d<210){
      ctx.strokeStyle=`rgba(120,190,255,${(1-d/210)*.35*p.a})`; ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(mouse.x,mouse.y); ctx.stroke(); } } }
    for(const p of parts) drawPart(p, p.a);
    raf = requestAnimationFrame(frame);
  }
  function start(){ if(!raf){ last=0; raf=requestAnimationFrame(frame); } }
  function stop(){ if(raf){ cancelAnimationFrame(raf); raf=null; } }
  size();
  addEventListener('resize', size);
  addEventListener('pointermove', e=>{ if(e.pointerType==='mouse'){ mouse.x=e.clientX; mouse.y=e.clientY; mouse.on=true; } }, {passive:true});
  document.addEventListener('pointerleave', ()=>{ mouse.on=false; });
  document.addEventListener('visibilitychange', ()=> document.hidden ? stop() : (reduced ? null : start()));
  if(reduced){ parts.forEach(p=>{ p.age=p.build+1; p.a=1; drawPart(p,1); }); }
  else start();
})();

/* ============ 3D window: scenes + sash + tilt ============ */
(function(){
  const win = $('#win'), imgs = $$('#heroSlides img'), dots = $('#heroDots');
  const no = $('#sceneNo'), name = $('#sceneName'), chip = $('#sceneChip'), bar = $('#sceneBar');
  const FX = ['t-wipe','t-circle','t-up','t-fade'];
  const DUR = 5200; let cur = 0, timer = null, busy = false;
  imgs.forEach((_,i)=>{ const b=document.createElement('button'); b.setAttribute('aria-label','Show scene '+(i+1)); if(!i) b.className='on'; b.onclick=()=>{ go(i); }; dots.appendChild(b); });
  function label(i){ chip.classList.add('swap'); setTimeout(()=>{ no.textContent = String(i+1).padStart(2,'0'); name.textContent = imgs[i].dataset.name; chip.classList.remove('swap'); }, 300); }
  function runBar(){ bar.classList.remove('run'); void bar.offsetWidth; bar.style.setProperty('--dur', DUR+'ms'); bar.classList.add('run'); }
  function show(i){
    const prev = imgs[cur]; cur = i;
    imgs.forEach(im=>im.classList.remove('prev','on',...FX));
    if(prev !== imgs[i]) prev.classList.add('prev');
    void imgs[i].offsetWidth;
    imgs[i].classList.add('on', FX[i % FX.length]);
    setTimeout(()=>prev.classList.remove('prev'), 1300);
    [...dots.children].forEach((d,j)=>d.classList.toggle('on', j===i));
    label(i);
  }
  // cycle: close sash -> change scene behind the glass -> open sash
  function go(i){
    if(busy) return; busy = true; clearTimeout(timer);
    win.classList.remove('open');
    setTimeout(()=>{ show(i); }, 650);
    setTimeout(()=>{ win.classList.add('open'); busy = false; runBar(); loop(); }, 1500);
  }
  function loop(){ clearTimeout(timer); if(!reduced) timer = setTimeout(()=>go((cur+1)%imgs.length), DUR); }
  if(!reduced){ runBar(); loop(); }
  // pointer tilt
  const vis = $('.visual');
  if(!reduced && matchMedia('(hover:hover)').matches){
    vis.addEventListener('pointermove', e=>{ const r=vis.getBoundingClientRect();
      win.style.setProperty('--ry', ((e.clientX-r.left)/r.width-.5)*12+'deg');
      win.style.setProperty('--rx', -((e.clientY-r.top)/r.height-.5)*9+'deg'); });
    vis.addEventListener('pointerleave', ()=>{ win.style.setProperty('--rx','0deg'); win.style.setProperty('--ry','0deg'); });
  }
})();

/* ============ Hero word rotator ============ */
(function(){
  const items = $$('#rotator span'); let i = 0;
  if(reduced) return;
  setInterval(()=>{
    const c = items[i]; i = (i+1)%items.length; const n = items[i];
    c.classList.remove('on'); c.classList.add('out');
    n.classList.remove('out'); n.classList.add('on');
    setTimeout(()=>c.classList.remove('out'), 650);
  }, 2200);
})();

/* ============ Scroll reveal (only below the fold) + counters ============ */
(function(){
  const below = el => el.getBoundingClientRect().top > innerHeight*.98;
  const groups = new Map();
  function mark(el, dir, delay){
    if(!below(el)) return;
    if(delay === undefined){ const p = el.parentElement, n = groups.get(p)||0; groups.set(p, n+1); delay = Math.min(n*90, 540); }
    el.style.transitionDelay = delay+'ms';
    el.classList.add('rv'); if(dir) el.classList.add('rv-'+dir);
  }
  // direction from column position (left column slides from left, right column from right)
  function byColumn(sel, gridSel){
    const grid = $(gridSel); if(!grid) return;
    const cols = getComputedStyle(grid).gridTemplateColumns.split(' ').filter(Boolean).length || 1;
    $$(sel).forEach((el,i)=>{
      const c = i % cols; let dir = cols===1 ? '' : c===0 ? 'l' : c===cols-1 ? 'r' : 'z';
      if(grid.children.length % cols && i === grid.children.length-1) dir = 'z';   // lone last card zooms in
      if(cols === 2 && sel === '.svc'){   // mobile / tablet: left column from left, right from right, replays on every pass
        el.classList.add('rv','rv-'+dir); el.dataset.replay = '1'; el.style.transitionDelay = (c*90)+'ms'; return;
      }
      mark(el, dir, Math.floor(i/cols)*120 + (dir==='z'?80:0));
    });
  }
  byColumn('.svc', '#serviceGrid');
  byColumn('.w-card', '#gallery');
  $$('.sec-head, .about-copy > *, .rev-score, .rev-slider, .faq, .cta-band, .c-card, form.quote, .f-grid > div').forEach(el=>mark(el));
  $$('.feat li').forEach((el,i)=>mark(el, i%2?'r':'l', i*90));
  $$('.ph-card').forEach((el,i)=>{ if(below(el)){ el.classList.add('rv'); el.style.transitionDelay = i*200+'ms'; } });
  $$('.est-form').forEach(el=>mark(el,'l',0)); $$('.est-out').forEach(el=>mark(el,'r',120));
  $$('.flow > *').forEach((el,i)=>mark(el, '', i*140));
  if(!('IntersectionObserver' in window)){ $$('.rv').forEach(e=>e.classList.add('in')); return; }
  const io = new IntersectionObserver(es=>es.forEach(e=>{
    // service cards start off-screen, so their fixed wrapper cell is what gets observed
    const el = e.target.classList.contains('svc-cell') ? e.target.firstElementChild : e.target;
    if(el.dataset.replay){   // slide in when entering, reset once it leaves through the bottom
      if(e.isIntersecting) el.classList.add('in');
      else if(e.boundingClientRect.top > 0) el.classList.remove('in');
      return;
    }
    if(!e.isIntersecting) return; el.classList.add('in'); io.unobserve(e.target);
    // once revealed, drop the reveal classes so hover / tilt transitions are quick again
    setTimeout(()=>{ el.classList.remove('rv','rv-l','rv-r','rv-z','in'); el.style.transitionDelay=''; }, 1800 + (parseFloat(el.style.transitionDelay)||0));
  }), {threshold:.12, rootMargin:'0px 0px -4% 0px'});
  $$('.rv').forEach(e=>io.observe(e.closest('.svc-cell') || e));
  const cio = new IntersectionObserver(es=>es.forEach(e=>{
    if(!e.isIntersecting) return; cio.unobserve(e.target);
    const el = e.target, to = +el.dataset.to; if(reduced) return;
    const t0 = performance.now(), dur = 1800;
    (function tick(t){ const p = Math.min((t-t0)/dur,1); el.textContent = Math.round(to*(1-Math.pow(1-p,3))); if(p<1) requestAnimationFrame(tick); })(t0);
  }), {threshold:.5});
  $$('.count').forEach(c=>cio.observe(c));
})();

/* ============ Card spotlight + 3D tilt ============ */
(function(){
  const fine = matchMedia('(hover:hover)').matches && !reduced;
  $$('.svc, .step').forEach(c=>{
    c.addEventListener('pointermove', e=>{
      const r = c.getBoundingClientRect(), x = e.clientX-r.left, y = e.clientY-r.top;
      c.style.setProperty('--mx', x+'px'); c.style.setProperty('--my', y+'px');
      if(fine && !c.classList.contains('rv')) c.style.transform = `perspective(900px) rotateX(${-(y/r.height-.5)*7}deg) rotateY(${(x/r.width-.5)*9}deg) translateY(-6px)`;
    });
    c.addEventListener('pointerleave', ()=>{ c.style.transform = ''; });
  });
})();
const NEED_MAP = {"Aluminium Sliding Windows":"Aluminium Windows","Aluminium Doors":"Aluminium Doors","Glass Partitions":"Glass Partition","Shop Fronts & Fixed Glass":"Shop Front","Shower Enclosures":"Shower Enclosure","Maintenance & Repair":"Maintenance / Repair"};
$$('[data-need]').forEach(a=>a.addEventListener('click', ()=>{ $('#need').value = NEED_MAP[a.dataset.need] || 'Other'; }));

/* ============ Gallery filter + lightbox ============ */
$$('.chip').forEach(chip=>chip.addEventListener('click', ()=>{
  $$('.chip').forEach(c=>c.classList.remove('on')); chip.classList.add('on');
  const f = chip.dataset.filter;
  $$('.w-card').forEach((it,i)=>{
    const show = f==='all' || it.dataset.cat.split(' ').includes(f);
    it.classList.toggle('hide', !show); it.classList.remove('pop','rv','rv-l','rv-r','rv-z');
    if(show){ void it.offsetWidth; it.style.animationDelay = (i*40)+'ms'; it.classList.add('pop'); }
  });
}));
(function(){
  const lb = $('#lightbox'), img = $('#lbImg'), cap = $('#lbCap'); let cur = 0, last = null;
  const visible = () => $$('.w-card:not(.hide)').map(e=>+e.dataset.i);
  function open(i){ cur=i; const p = PROJECTS[i]; img.src=p.img; img.alt=p.t; cap.innerHTML=`${p.t}<small>${p.s}</small>`; lb.hidden=false; document.body.style.overflow='hidden'; $('#lbClose').focus(); }
  function close(){ lb.hidden=true; document.body.style.overflow=''; if(last) last.focus(); }
  function step(d){ const v = visible(); const k = v.indexOf(cur); open(v[(k+d+v.length)%v.length]); }
  $$('.w-card').forEach(g=>g.addEventListener('click', ()=>{ last=g; open(+g.dataset.i); }));
  $('#lbClose').onclick = close; $('#lbPrev').onclick = ()=>step(-1); $('#lbNext').onclick = ()=>step(1);
  lb.addEventListener('click', e=>{ if(e.target===lb) close(); });
  addEventListener('keydown', e=>{ if(lb.hidden) return; if(e.key==='Escape') close(); if(e.key==='ArrowLeft') step(-1); if(e.key==='ArrowRight') step(1); });
})();

/* ============ Calculator (AED) ============ */
(function(){
  const prod = $('#product'), area = $('#area'), total = $('#total'), out = $('#areaVal');
  const FIN = {"1":"Standard","1.15":"Anodized +15%","1.25":"Wooden +25%"};
  let shown = 27500, raf;
  const fmt = n => 'AED ' + Math.round(n).toLocaleString('en-US');
  function animateTo(v){
    cancelAnimationFrame(raf); const from = shown, t0 = performance.now(), dur = reduced?1:550;
    (function tick(t){ const p = Math.min((t-t0)/dur,1), e = 1-Math.pow(1-p,3); shown = from+(v-from)*e; total.textContent = fmt(shown); if(p<1) raf=requestAnimationFrame(tick); })(t0);
    total.classList.remove('bump'); void total.offsetWidth; total.classList.add('bump');
  }
  function calc(){
    const rate = +prod.value, a = +area.value, fin = document.querySelector('input[name=finish]:checked'), m = +fin.value;
    out.innerHTML = a + '<small>sq.ft</small>';
    area.style.setProperty('--p', ((a-area.min)/(area.max-area.min)*100)+'%');
    $('#rProd').textContent = prod.options[prod.selectedIndex].text.split(' — ')[0];
    $('#rRate').textContent = `AED ${rate}/sq.ft`;
    $('#rArea').textContent = `${a} sq.ft`;
    $('#rFin').textContent = FIN[fin.value];
    animateTo(rate*a*m);
  }
  [prod, area, ...$$('input[name=finish]')].forEach(el=>el.addEventListener('input', calc));
  calc();
  $('#estCta').addEventListener('click', ()=>{
    $('#msg').value = `Estimate: ${$('#rProd').textContent}, ${area.value} sq.ft, ${$('#rFin').textContent}, ${total.textContent}.`;
  });
})();

/* ============ Reviews slider ============ */
(function(){
  const track = $('#revTrack'), dots = $('#revDots'), n = track.children.length; let cur = 0, t;
  for(let i=0;i<n;i++){ const b=document.createElement('button'); b.setAttribute('aria-label','Review '+(i+1)); if(!i) b.className='on'; b.onclick=()=>{go(i);loop();}; dots.appendChild(b); }
  function go(i){ cur=(i+n)%n; track.style.transform=`translateX(-${cur*100}%)`; [...dots.children].forEach((d,j)=>d.classList.toggle('on',j===cur)); }
  function loop(){ clearInterval(t); if(!reduced) t=setInterval(()=>go(cur+1), 5000); }
  $('#revPrev').onclick=()=>{go(cur-1);loop();}; $('#revNext').onclick=()=>{go(cur+1);loop();};
  loop();
})();

/* ============ FAQ accordion ============ */
$$('.faq button').forEach(btn=>btn.addEventListener('click', ()=>{
  const box = btn.parentElement, wasOpen = box.classList.contains('open');
  $$('.faq').forEach(f=>{ f.classList.remove('open'); f.querySelector('button').setAttribute('aria-expanded', false); });
  if(!wasOpen){ box.classList.add('open'); btn.setAttribute('aria-expanded', true); }
}));

/* ============ Chat assistant ============
   A simple rule-based helper. Every answer comes from the information on this
   website; anything it cannot answer is passed to a phone call or WhatsApp. */
(function(){
  const fab = $('#chatFab'), box = $('#chat'), log = $('#chatLog'), form = $('#chatForm'), input = $('#chatInput'), quick = $('#chatQuick');
  if(!fab || !box) return;
  const WA_LINK = `https://wa.me/${WA}?text=` + encodeURIComponent('Hi ALRANQQY, I need a quote for glass / aluminium work');
  const CALL = `<a href="tel:+971521195673">052 119 5673</a> or <a href="tel:+971547144114">054 714 4114</a>`;
  const go = id => `<a href="#${id}" data-go="${id}">`;
  const svcList = '<ul>' + SERVICES.map(s=>`<li>${s.name}</li>`).join('') + '</ul>';
  const KB = [
    {k:['hi','hello','hey','salam','assalam','salaam','namaste','good morning','good evening'], a:`Hello! 👋 Welcome to <b>ALRANQQY</b> — glass & aluminium installation and maintenance in Dubai. Ask me about our services, prices, free site visit or contact details.`},
    {k:['service','services','what do you do','offer','kaam','work do'], a:`We install and maintain glass & aluminium work for homes, offices, shops and buildings:${svcList}${go('services')}See all services →</a>`},
    {k:['window','windows','sliding','casement','mesh','khidki'], a:`<b>Aluminium Sliding Windows</b> — 2 and 3-track sliding windows, casement windows, mosquito mesh and sound-proof options. Starting from <b>AED 275/sq.ft</b> (installation included).`},
    {k:['door','doors','darwaza'], a:`<b>Aluminium Doors</b> — main doors, bathroom doors, sliding and casement doors with premium handles and locks. Starting from <b>AED 350/sq.ft</b>.`},
    {k:['partition','office glass','glass wall','toughened','12mm','10mm'], a:`<b>Glass Partitions</b> — 10mm and 12mm toughened glass partitions for offices and homes, frameless or aluminium framed. 12mm toughened partition starts from <b>AED 320/sq.ft</b>.`},
    {k:['shop','shopfront','shop front','showroom','fixed glass','patch'], a:`<b>Shop Fronts & Fixed Glass</b> — showroom and shop fronts, toughened glass doors, patch fittings and fixed glass panels. Starting from <b>AED 380/sq.ft</b>.`},
    {k:['shower','bathroom glass','enclosure'], a:`<b>Shower Enclosures</b> — frameless toughened glass with premium stainless-steel hardware. Starting from <b>AED 450/sq.ft</b>.`},
    {k:['railing','balcony','staircase','stair','handrail'], a:`<b>Glass Railings</b> — balcony and staircase glass railings with stainless-steel fittings. Starting from <b>AED 400/sq.ft</b>.`},
    {k:['facade','curtain','cladding','glazing','building'], a:`<b>Facades & Curtain Walls</b> — structural glazing and aluminium facade work for commercial buildings and villas. The price depends on the design, so we quote after a free site visit.`},
    {k:['mirror','frosted','fluted','shelf','shelves','writing board','designer'], a:`<b>Mirrors & Designer Glass</b> — designer mirrors, glass shelves, frosted and fluted glass, and glass writing boards. Ask us for a quotation.`},
    {k:['maintenance','repair','roller','rollers','lock','handle','hinge','sealing','broken','fix','rubber','channel','theek'], a:`<b>Maintenance & Repair</b> — roller, lock, handle and hinge replacement, rubber and channel change, sealing, and glass replacement for existing aluminium and glass work. Call ${CALL}.`},
    {k:['price','prices','cost','rate','rates','how much','kitna paisa','kitne paise','kitna kharcha','paisa','paise','estimate','budget','aed','charges'], a:`Starting rates per sq.ft (installation included):<ul><li>Sliding Window — AED 275</li><li>Door — AED 350</li><li>Glass Partition 12mm — AED 320</li><li>Shop Front / Fixed Glass — AED 380</li><li>Shower Enclosure — AED 450</li><li>Glass Railing — AED 400</li></ul>Premium Anodized +15%, Wooden / Texture finish +25%. ${go('calculator')}Try the instant estimate →</a><br><small>Final price after free site measurement.</small>`},
    {k:['site visit','visit','measure','measurement','free','consultation','inspection'], a:`Yes — the <b>site visit, measurement and consultation are completely free</b> anywhere in Dubai. You only pay when you approve the work.`},
    {k:['how long','time','days','duration','kab','kitne din','kitna time','kitna waqt','lagega','timeline','fast','quick'], a:`Most residential jobs are fabricated and installed within <b>7–10 days</b> of measurement. Timelines for larger commercial projects are confirmed in the quotation.`},
    {k:['payment','pay','cash','card','bank','transfer','advance','installment'], a:`Typically an advance for materials, a second payment when fabrication is complete, and the balance after installation. <b>Bank transfer, card and cash</b> are accepted.`},
    {k:['where','location','address','office','area','areas','kahan','dubai','sharjah','abu dhabi','serve','nahda'], a:`Our office: <b>Mai Tower, 1502, Al Nahda 1, Dubai, UAE</b>. We serve customers across Dubai.`},
    {k:['contact','phone','number','call','whatsapp','email','mail','reach','talk'], a:`📞 ${CALL}<br>💬 <a href="${WA_LINK}" target="_blank" rel="noopener">WhatsApp us</a><br>✉️ <a href="mailto:info@alranqy.com">info@alranqy.com</a><br>📍 Mai Tower, 1502, Al Nahda 1, Dubai`},
    {k:['quote','quotation','callback','call back','book','booking','appointment'], a:`Happy to help! Fill the ${go('contact')}callback form</a>, <a href="${WA_LINK}" target="_blank" rel="noopener">message us on WhatsApp</a>, or call ${CALL}. The site visit is free.`},
    {k:['project','portfolio','photos','previous work','gallery'], a:`See our ${go('work')}project gallery</a> — residential windows, office partitions, shop fronts, railings, facades and shower enclosures.`},
    {k:['review','reviews','customers','rating','trust'], a:`Our customers in Dubai rate us ★★★★★ — homeowners, offices and retail shops. ${go('reviews')}Read reviews →</a>`},
    {k:['thank','thanks','shukriya','ok','okay','great'], a:`You're welcome! 😊 Anything else? You can also call ${CALL}.`},
  ];
  const QUICK = ['Services','Prices','Free site visit','How long does it take?','Payment','Location','Contact','Get a quote'];
  quick.innerHTML = QUICK.map(q=>`<button type="button">${q}</button>`).join('');

  function add(html, who){
    const m = document.createElement('div'); m.className = 'msg ' + who;
    if(who === 'me') m.textContent = html; else m.innerHTML = html;
    log.appendChild(m); log.scrollTop = log.scrollHeight; return m;
  }
  function answer(q){
    const t = ' ' + q.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu,' ') + ' ';
    let best = null, score = 0;
    KB.forEach(it=>{ let s = 0; it.k.forEach(k=>{ if(t.includes(' '+k+' ') || (k.length > 4 && t.includes(k))) s += k.includes(' ') ? 2 : 1; }); if(s > score){ score = s; best = it; } });
    return best ? best.a : `I'm not sure about that one. Our team can help directly — call ${CALL} or <a href="${WA_LINK}" target="_blank" rel="noopener">WhatsApp us</a>.`;
  }
  function ask(q){
    q = q.trim(); if(!q) return;
    add(q, 'me');
    const typing = add('<i></i><i></i><i></i>', 'bot typing');
    setTimeout(()=>{ typing.remove(); add(answer(q), 'bot'); }, reduced ? 50 : 650);
  }
  let greeted = false;
  function open(){
    box.hidden = false; fab.setAttribute('aria-expanded', true); fab.querySelector('.dot')?.remove();
    if(!greeted){ greeted = true; add(`Hi! 👋 I'm the <b>ALRANQQY</b> assistant. Ask me about our glass & aluminium services, prices, free site visit, timings or contact details.`, 'bot'); }
    setTimeout(()=>input.focus(), 250);
  }
  function close(){ box.hidden = true; fab.setAttribute('aria-expanded', false); fab.focus(); }
  fab.addEventListener('click', ()=> box.hidden ? open() : close());
  $('#chatClose').addEventListener('click', close);
  addEventListener('keydown', e=>{ if(e.key === 'Escape' && !box.hidden) close(); });
  form.addEventListener('submit', e=>{ e.preventDefault(); ask(input.value); input.value = ''; });
  quick.addEventListener('click', e=>{ const b = e.target.closest('button'); if(b) ask(b.textContent); });
  log.addEventListener('click', e=>{ const a = e.target.closest('[data-go]'); if(!a) return; e.preventDefault(); const t = document.getElementById(a.dataset.go); if(t){ t.scrollIntoView({behavior:'smooth'}); if(innerWidth < 620) close(); } });
})();

/* ============ Form -> WhatsApp ============ */
$('#quoteForm').addEventListener('submit', e=>{
  e.preventDefault();
  const err = $('#formErr'), name = $('#name').value.trim(), phone = $('#phone').value.replace(/\D/g,'');
  if(name.length < 2){ err.textContent = 'Please enter your name.'; $('#name').focus(); return; }
  if(phone.length < 7){ err.textContent = 'Please enter a valid phone or WhatsApp number.'; $('#phone').focus(); return; }
  err.textContent = '';
  const need = $('#need').value, msg = $('#msg').value.trim();
  const url = `https://wa.me/${WA}?text=` + encodeURIComponent(`Hi ALRANQQY, my name is ${name}. I need a quote for: ${need}. ${msg} My number: ${phone}`);
  const w = window.open(url, '_blank'); if(w) try{ w.opener = null; }catch(_){}
  const toast = $('#toast');
  $('#toastMsg').innerHTML = w ? 'Thank you! We will call you back shortly.' : `Almost done — <a href="${url}" target="_blank" rel="noopener">send your request on WhatsApp</a>.`;
  toast.classList.add('show'); setTimeout(()=>toast.classList.remove('show'), w ? 3500 : 9000);
  e.target.reset();
});
})();
