// ---------- Data ----------
const products = [
  {name:"Web Development", cat:"Professional Services", status:"live", desc:"Custom Business Websites, Corporate Websites, Portfolio Websites, Landing Pages, E-Commerce Websites, Admin Dashboards, CMS Development, Progressive Web Apps (PWA).", detail:"Modern web platforms designed to present, convert, and scale your brand online."},
  {name:"Mobile App Development", cat:"Professional Services", status:"live", desc:"Android Applications, iOS Applications, Flutter Apps, React Native Apps, Enterprise Applications, Business Management Apps, E-Commerce Apps.", detail:"Cross-platform and native mobile experiences for business efficiency and customer growth."},
  {name:"AI & Machine Learning", cat:"Professional Services", status:"live", desc:"AI Chatbots, Custom AI Solutions, Large Language Model Integrations, AI Automation, Computer Vision, Recommendation Systems, Predictive Analytics, Generative AI Solutions.", detail:"Intelligent systems that streamline operations and unlock automation opportunities."},
  {name:"Data Analytics", cat:"Professional Services", status:"dev", desc:"Business Intelligence Dashboards, Data Visualization, KPI Reporting, Sales Analytics, Customer Analytics, Data Cleaning, Data Warehousing, Predictive Insights.", detail:"Decision-ready dashboards and reporting pipelines built for actionable insight."},
  {name:"UI/UX Design", cat:"Professional Services", status:"live", desc:"Product Design, Wireframes, Prototypes, User Experience Design, User Interface Design, Mobile UI, Web UI, Design Systems.", detail:"Design systems and user journeys that elevate product clarity and conversion."},
  {name:"Graphic Designing", cat:"Professional Services", status:"research", desc:"Brand Identity, Logo Design, Social Media Creatives, Posters, Flyers, Brochures, Business Cards, Marketing Creatives.", detail:"Premium visual identity and marketing collateral for stronger brand presence."},
  {name:"Video Editing", cat:"Professional Services", status:"live", desc:"Promotional Videos, Corporate Videos, Product Videos, Social Media Reels, YouTube Editing, Motion Graphics, Short-form Content, Brand Advertisements.", detail:"High-impact visual storytelling optimized for digital engagement and brand recall."},
  {name:"Cloud & Deployment", cat:"Professional Services", status:"dev", desc:"AWS Deployment, Azure Deployment, VPS Hosting, CI/CD, Docker, Kubernetes, Server Management, Domain & SSL Setup.", detail:"Reliable cloud delivery and infrastructure management for secure, scalable launches."},
];

const processItems = [
  {title:"Discovery & Planning", desc:"We understand your business goals, users, competitors, and technical requirements before development begins."},
  {title:"UI/UX Design", desc:"Our designers create intuitive, modern interfaces focused on usability and exceptional user experience."},
  {title:"Development", desc:"We build scalable web applications, mobile apps, AI solutions, and cloud-based systems using modern technologies."},
  {title:"Testing & Quality Assurance", desc:"Every feature is tested for performance, security, responsiveness, and reliability before deployment."},
  {title:"Deployment", desc:"We deploy your project using industry-standard DevOps practices with secure hosting and CI/CD pipelines."},
  {title:"Maintenance & Support", desc:"We provide continuous improvements, monitoring, updates, bug fixes, and long-term technical support."},
];

const timeline = [
  {label:"2023", title:"Founded", desc:"Halfwave Platforms incorporated as a holding company.", future:false},
  {label:"2024", title:"Forge launches", desc:"First developer platform ships to early customers.", future:false},
  {label:"2025", title:"Current goes public", desc:"Consumer app crosses one million monthly actives.", future:false},
  {label:"2026", title:"Present", desc:"Halfwave Cloud enters private beta.", future:false},
  {label:"Next", title:"Cloud GA", desc:"General availability of Halfwave Cloud.", future:true},
  {label:"Future Vision", title:"Full ecosystem", desc:"Every vertical operating on one shared platform core.", future:true},
];

const team = [
  {name:"Deepak GM", role:"Founder & Full Stack Developer", bio:"Leads product strategy, software architecture, AI integration, and full-stack development.", image:"deepak-gm.jpg"},
  {name:"Dhyan K", role:"AI/ML Engineer", bio:"Builds intelligent machine learning models, automation systems, and data-driven solutions."},
  {name:"Aneesh Nagesh", role:"Creative Designer", bio:"Designs user experiences, brand identities, graphics, and visual content for digital products."},
  {name:"Tharun Kumar SV", role:"CMO", bio:"Designs user experiences, brand identities, graphics, and visual content for digital products."}
];

const jobs = [
  {title:"Video Editor", team:"Forge", location:"Remote", },
];

// ---------- Render: ecosystem ----------
const ecoGrid = document.getElementById('ecoGrid');
products.forEach((p,i)=>{
  const card = document.createElement('div');
  card.className = 'glass-card eco-card reveal';
  const statusClass = p.status==='live' ? 'status-live' : p.status==='dev' ? 'status-dev' : 'status-research';
  const statusLabel = p.status==='live' ? 'Live' : p.status==='dev' ? 'In Development' : 'Research';
  card.innerHTML = `
    <div class="top-row">
      <div class="eco-icon">${p.name[0]}</div>
      <span class="status-tag ${statusClass}">${statusLabel}</span>
    </div>
    <h4>${p.name}</h4>
    <p style="color:var(--muted);font-family:var(--font-mono);font-size:0.72rem;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:10px;">${p.cat}</p>
    <p>${p.desc}</p>
    <div class="expand">${p.detail}</div>
  `;
  card.addEventListener('click', ()=> card.classList.toggle('open'));
  ecoGrid.appendChild(card);
});

// ---------- Render: process ----------
const processGrid = document.getElementById('processGrid');
processItems.forEach((item,index)=>{
  const card = document.createElement('div');
  card.className = 'process-card reveal';
  card.innerHTML = `
    <span class="process-badge">${String(index + 1).padStart(2, '0')}</span>
    <h4>${item.title}</h4>
    <p>${item.desc}</p>
  `;
  processGrid.appendChild(card);
});

// ---------- Render: timeline ----------
const timelineRow = document.getElementById('timelineRow');
timeline.forEach(t=>{
  const node = document.createElement('div');
  node.className = 'tl-node reveal' + (t.future ? ' future' : '');
  node.innerHTML = `<div class="tl-marker"></div><span class="tl-label">${t.label}</span><h4>${t.title}</h4><p>${t.desc}</p>`;
  timelineRow.appendChild(node);
});

// ---------- Render: team ----------
const teamGrid = document.getElementById('teamGrid');
team.forEach(m=>{
  const initials = m.name.split(' ').map(w=>w[0]).join('');
  const card = document.createElement('div');
  card.className = 'team-card reveal';
  const avatarContent = m.image ? `<img src="${m.image}" alt="${m.name}" loading="lazy" />` : initials;
  card.innerHTML = `<div class="avatar">${avatarContent}</div><h4>${m.name}</h4><div class="role">${m.role}</div><p class="bio">${m.bio}</p>`;
  teamGrid.appendChild(card);
});

// ---------- Render: jobs ----------
const jobsList = document.getElementById('jobsList');
jobs.forEach(j=>{
  const row = document.createElement('div');
  row.className = 'job-row reveal';
  row.innerHTML = `
    <div class="job-info">
      <h4>${j.title}</h4>
      <div class="job-meta"><span>${j.team}</span><span>${j.location}</span></div>
    </div>
    <a href="#contact" class="btn btn-ghost" style="padding:9px 16px;font-size:0.82rem;">Apply</a>
  `;
  jobsList.appendChild(row);
});

// ---------- Reveal on scroll ----------
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries)=>{
  entries.forEach((e,idx)=>{
    if(e.isIntersecting){
      setTimeout(()=> e.target.classList.add('in'), (idx%6)*70);
      io.unobserve(e.target);
    }
  });
},{threshold:0.12});
revealEls.forEach(el=>io.observe(el));

// ---------- Navbar scroll state ----------
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', ()=>{
  navbar.classList.toggle('scrolled', window.scrollY > 40);
},{passive:true});

// ---------- Mobile drawer ----------
const hamburger = document.getElementById('hamburger');
const drawer = document.getElementById('mobileDrawer');
const closeDrawer = document.getElementById('closeDrawer');
hamburger.addEventListener('click', ()=> drawer.style.display = 'flex');
closeDrawer.addEventListener('click', ()=> drawer.style.display = 'none');
drawer.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=> drawer.style.display='none'));

// ---------- Theme toggle (optional) ----------
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  const html = document.documentElement;
  const savedTheme = localStorage.getItem('hw-theme');
  if(savedTheme){
    html.setAttribute('data-theme', savedTheme);
    themeToggle.textContent = savedTheme === 'light' ? '◐' : '◑';
  } else {
    html.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '◑';
  }
  themeToggle.addEventListener('click', ()=>{
    const isLight = html.getAttribute('data-theme') === 'light';
    const nextTheme = isLight ? 'dark' : 'light';
    html.setAttribute('data-theme', nextTheme);
    themeToggle.textContent = nextTheme === 'light' ? '◐' : '◑';
    localStorage.setItem('hw-theme', nextTheme);
  });
}

// ---------- Hero logo intro ----------
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
requestAnimationFrame(()=>{
  setTimeout(()=>{
    document.querySelectorAll('.hero-logo img').forEach(img=> img.classList.add('in'));
  }, reducedMotion ? 0 : 150);
});

// ---------- Wave canvas background (disabled) ----------
const canvas = document.getElementById('waveCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let waveW, waveH, waveRunning = !reducedMotion;
  function resizeCanvas(){
    waveW = canvas.width = canvas.offsetWidth;
    waveH = canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  let t = 0;
  function drawWaves(){
    if(!waveRunning) return;
    ctx.clearRect(0,0,waveW,waveH);
    const lines = [
      {amp:26, freq:0.006, speed:0.012, y:0.35, color:'rgba(42,62,245,0.35)'},
      {amp:18, freq:0.009, speed:0.018, y:0.5, color:'rgba(91,114,255,0.22)'},
      {amp:32, freq:0.004, speed:0.008, y:0.65, color:'rgba(143,160,255,0.15)'},
    ];
    lines.forEach(line=>{
      ctx.beginPath();
      for(let x=0;x<=waveW;x+=6){
        const y = waveH*line.y + Math.sin(x*line.freq + t*line.speed)*line.amp;
        if(x===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
      }
      ctx.strokeStyle = line.color;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });
    t += 1;
    requestAnimationFrame(drawWaves);
  }
  if(waveRunning) requestAnimationFrame(drawWaves);
}

// ---------- AI chat demo ----------
const aiMessages = document.getElementById('aiMessages');
const scripted = [
  {who:'user', text:"What does Halfwave Platforms actually build?"},
  {who:'bot', text:"We operate a portfolio: AI products, developer platforms, consumer apps, cloud, and a research lab — all sharing one engineering core."},
  {who:'user', text:"Which product should I try first?"},
  {who:'bot', text:"If you build software, start with Forge. If you're curious about the research, check Signal Labs."},
];
function addMessage(msg){
  return new Promise(resolve=>{
    if(msg.who==='bot'){
      const typing = document.createElement('div');
      typing.className='typing';
      typing.innerHTML='<span></span><span></span><span></span>';
      aiMessages.appendChild(typing);
      aiMessages.scrollTop = aiMessages.scrollHeight;
      setTimeout(()=>{
        typing.remove();
        const el = document.createElement('div');
        el.className='msg bot';
        el.textContent = msg.text;
        aiMessages.appendChild(el);
        aiMessages.scrollTop = aiMessages.scrollHeight;
        resolve();
      }, 900);
    } else {
      const el = document.createElement('div');
      el.className='msg user';
      el.textContent = msg.text;
      aiMessages.appendChild(el);
      aiMessages.scrollTop = aiMessages.scrollHeight;
      setTimeout(resolve, 500);
    }
  });
}
let aiStarted = false;
async function runScript(){
  if(aiStarted) return;
  aiStarted = true;
  for(const m of scripted){
    await addMessage(m);
  }
}
const aiObserver = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ runScript(); aiObserver.disconnect(); } });
},{threshold:0.3});
aiObserver.observe(document.getElementById('ai'));

document.getElementById('aiSend').addEventListener('click', ()=>{
  const input = document.getElementById('aiInput');
  if(!input.value.trim()) return;
  addMessage({who:'user', text: input.value.trim()}).then(()=>{
    addMessage({who:'bot', text:"This concept demo replays a scripted conversation — a live model isn't connected here."});
  });
  input.value = '';
});

// ---------- Contact form ----------
document.getElementById('contactForm').addEventListener('submit', (e)=>{
  e.preventDefault();
  document.getElementById('formNote').classList.add('show');
  e.target.reset();
});
