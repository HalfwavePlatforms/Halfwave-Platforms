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
const productIcons = {
  "Web Development": `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
  "Mobile App Development": `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>`,
  "AI & Machine Learning": `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path><circle cx="12" cy="12" r="3"></circle></svg>`,
  "Data Analytics": `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>`,
  "UI/UX Design": `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><path d="M3 9h18M9 21V9"></path></svg>`,
  "Graphic Designing": `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C22 6.5 17.5 2 12 2z"></path></svg>`,
  "Video Editing": `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>`,
  "Cloud & Deployment": `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>`,
};

const ecoGrid = document.getElementById('ecoGrid');
products.forEach((p, i) => {
  const card = document.createElement('div');
  card.className = 'eco-card reveal';
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
  card.setAttribute('aria-expanded', 'false');

  const statusClass = p.status === 'live' ? 'status-live' : p.status === 'dev' ? 'status-dev' : 'status-research';
  const statusLabel = p.status === 'live' ? 'Live' : p.status === 'dev' ? 'In Development' : 'Research';
  const iconSvg = productIcons[p.name] || `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`;

  card.innerHTML = `
    <div class="eco-top-row">
      <div class="eco-icon-box" aria-hidden="true">${iconSvg}</div>
      <span class="status-tag ${statusClass}">
        <span class="status-dot"></span>
        ${statusLabel}
      </span>
    </div>
    <div class="eco-cat">${p.cat}</div>
    <h4>${p.name}</h4>
    <p class="eco-desc">${p.desc}</p>
    <div class="eco-detail">${p.detail}</div>
    <div class="eco-expand-row">
      <span class="eco-expand-label">Platform details</span>
      <svg class="eco-expand-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </div>
  `;

  const toggleOpen = () => {
    const isOpen = card.classList.toggle('open');
    card.setAttribute('aria-expanded', String(isOpen));
    const label = card.querySelector('.eco-expand-label');
    if (label) {
      label.textContent = isOpen ? 'Hide details' : 'Platform details';
    }
  };

  card.addEventListener('click', toggleOpen);
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleOpen();
    }
  });

  ecoGrid.appendChild(card);
});

// ---------- Render: process ----------
const processIcons = [
  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>`,
  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>`,
  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path></svg>`,
  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path></svg>`
];

const processGrid = document.getElementById('processGrid');
processItems.forEach((item, index) => {
  const card = document.createElement('div');
  card.className = 'process-card reveal';
  const stepNum = String(index + 1).padStart(2, '0');
  const icon = processIcons[index] || processIcons[0];

  card.innerHTML = `
    <div class="process-card-top">
      <span class="process-step-badge">
        <span class="process-step-dot"></span>
        STEP ${stepNum}
      </span>
      <div class="process-icon-box" aria-hidden="true">${icon}</div>
    </div>
    <div class="process-phase-tag">Phase ${stepNum} / 06</div>
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

function getBotResponse(userText) {
  const query = userText.toLowerCase();
  if (query.includes('what') || query.includes('build') || query.includes('service') || query.includes('ecosystem')) {
    return "Halfwave Platforms builds web, mobile, AI, data analytics, UI/UX, video, and cloud deployment solutions for startups and modern enterprises.";
  }
  if (query.includes('try') || query.includes('first') || query.includes('start') || query.includes('product')) {
    return "Explore our Web & Mobile platforms for rapid product rollout, or test Halfwave AI integrations to automate your business operations.";
  }
  if (query.includes('cloud') || query.includes('ai') || query.includes('deploy')) {
    return "Our Cloud & AI stack combines automated LLM orchestration, Docker/Kubernetes containerization, and enterprise AWS/Azure CI/CD delivery.";
  }
  if (query.includes('team') || query.includes('founder') || query.includes('deepak')) {
    return "Halfwave Platforms is founded by Deepak GM (Software Architect & Lead Full Stack Developer) alongside AI engineers and creative designers.";
  }
  return "Halfwave Platforms combines engineering rigor with modern AI to build measurable digital products. Feel free to reach out via our contact section!";
}

const handleAiSend = () => {
  const input = document.getElementById('aiInput');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  addMessage({who:'user', text}).then(() => {
    const reply = getBotResponse(text);
    addMessage({who:'bot', text: reply});
  });
};

const aiSendBtn = document.getElementById('aiSend');
if (aiSendBtn) {
  aiSendBtn.addEventListener('click', handleAiSend);
}

const aiInputEl = document.getElementById('aiInput');
if (aiInputEl) {
  aiInputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAiSend();
    }
  });
}

document.querySelectorAll('.ai-pill').forEach(pill => {
  pill.addEventListener('click', () => {
    const input = document.getElementById('aiInput');
    if (input) {
      input.value = pill.textContent.trim();
      handleAiSend();
    }
  });
});

// ---------- Contact form ----------
document.getElementById('contactForm').addEventListener('submit', (e)=>{
  e.preventDefault();
  document.getElementById('formNote').classList.add('show');
  e.target.reset();
});
