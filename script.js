const gh='https://github.com/mohamedalsayed12/';
const featured=[
 {repo:'job-application-agent',title:'Job Application Agent',kind:'WORKFLOW AUTOMATION · FASTAPI',text:'I am building an application-management system that collects job listings from external sources, supports applicant profiles and tracks collection runs. Paid scraping is blocked until a budget is configured. An evolving MVP with account access, PostgreSQL models, migrations and tests.',tags:['Python','FastAPI','PostgreSQL','Apify']},
 {repo:'onboarding-playbook-tracker',title:'Onboarding Playbook Tracker',kind:'BACKEND · FASTAPI',
  text:'B2B rollouts can be difficult to track across customer accounts. I built a multi-tenant onboarding API and dashboard with reusable playbooks, stage progression and visibility into stuck users. Behind the interface: tenant isolation, hashed invites, role-based access, Redis cache invalidation and database-backed tests.',
  tags:['Python','FastAPI','PostgreSQL','Redis','Docker'],img:'images/onboarding-playbook-tracker.png',alt:'Rollout dashboard: stage funnel, role matrix and stuck users',demo:'onboarding-demo/'},
 {repo:'whitelight-sales-bot',title:'White Light Sales & Lead Desk',kind:'REAL BUSINESS · FASTAPI',
  text:'Wholesale sales teams need actionable customer, inventory and payment information beyond accounting exports. I built workflows for Tally CSV imports, quotes, orders, cheques, credit holds and manager reporting, with role-based access and a fictional-data demo.',
  tags:['Python','FastAPI','PostgreSQL','JavaScript'],demo:'whitelight-lead-bot-demo/'},
 {repo:'gym-social-media',title:'Gym Social Media',kind:'FULL STACK · FASTAPI + REACT',
  text:'A gym social app where people log workouts set by set and personal records are flagged automatically. Cursor-paginated feed with a fixed query count, strength rankings from Postgres window functions, follows, likes and communities, single-use refresh tokens, Docker and 50+ pytest tests in GitHub Actions with automatic deploys.',
  tags:['Python','FastAPI','PostgreSQL','Docker'],img:'images/gym-social-media.jpg',alt:'LiftLog screens: feed, workout logger, profile and login'},
 {repo:'nutrition-tracker',title:'Nutrition Tracker',kind:'FULL STACK · FLASK + REACT',
  text:'Log food and activity against personalised calorie, macro and micronutrient targets. USDA FoodData Central search with ranked results, barcode scanning, logging by Siri and weekly reports, installable on a phone. Layered routes, services and models, 90+ pytest tests in CI, deployed on Heroku.',
  tags:['Python','Flask','PostgreSQL','React'],img:'images/nutrition-tracker.jpg',alt:'Nutrition tracker Today page: calorie ring and macro targets',
  demo:'https://nutrition-tracker-alsayed-90b0d9adaf0f.herokuapp.com/'}
];
const more=[
 {repo:'neetcode-submissions',title:'NeetCode Solutions',kind:'ALGORITHMS',text:'Data structures and algorithms practice in Python, synced to GitHub.'},
 {repo:'python-for-data-analysis',title:'Netflix Demand Analysis',kind:'PANDAS',text:'Cleaned and merged three datasets and built scoring logic to rank TV shows.'},
 {repo:'sql',title:'SQL Reporting',kind:'SQL',text:'Reporting views and queries that clean, join and aggregate datasets.'},
 {repo:'Power-BI-project',title:'Data Jobs Dashboards',kind:'POWER BI',text:'Interactive reports on data job postings, salaries and skills.'}
];

function el(tag,cls,text){const e=document.createElement(tag);if(cls)e.className=cls;if(text)e.textContent=text;return e}
function linkTo(href,label){const a=el('a',null,label);a.href=href;a.target='_blank';a.rel='noopener noreferrer';return a}
function diagram(i){const flip=i%2===1;return `<svg viewBox="0 0 420 210" aria-hidden="true" focusable="false"><path d="M${flip?345:75} 110 C155 110 145 35 215 35 S295 63 ${flip?75:345} 63"/><path d="M${flip?345:75} 110 C160 110 170 100 235 105 S300 150 ${flip?100:325} 160"/><path d="M215 35 L235 105 L325 160"/><rect class="highlight" x="${flip?313:43}" y="96" width="64" height="27"/><rect x="182" y="22" width="56" height="27"/><rect x="213" y="92" width="55" height="27"/><rect x="${flip?43:313}" y="50" width="65" height="27"/><rect x="${flip?68:295}" y="147" width="65" height="27"/></svg>`}

const list=document.getElementById('project-list');
featured.forEach((p,i)=>{
 const card=el('article','project-card');
 const art=el('div','project-art');
 if(p.img){art.classList.add('has-shot');const img=el('img');img.src=p.img;img.alt=p.alt;img.loading='lazy';img.decoding='async';art.append(img)}else{art.innerHTML=diagram(i)}
 art.append(el('span','art-caption',`PROJECT / ${String(i+1).padStart(2,'0')}`));
 const body=el('div','project-body');
 const tags=el('div','project-tags');p.tags.forEach(t=>tags.append(el('span',null,t)));
 const links=el('div','project-links');if(p.publicSource!==false)links.append(linkTo(gh+p.repo,'Source ↗'));if(p.demo)links.append(linkTo(p.demo,'Live demo ↗'));
 body.append(el('span','project-kind',p.kind),el('h3',null,p.title),el('p',null,p.text),tags,links);
 card.append(art,body);list.append(card);
});

// Searchable live repository catalogue inspired by 2KAbhishek/projects.
// Featured case studies above are deliberately curated for hiring relevance.
const explorer=document.getElementById('explorer-list');
const status=document.getElementById('project-status');
const search=document.getElementById('project-search');
const filters=document.getElementById('project-filters');
const fallback=[
 ...featured.map(p=>({name:p.repo,html_url:gh+p.repo,description:p.text,language:p.tags?.[0]})),
 ...more.map(p=>({name:p.repo,html_url:gh+p.repo,description:p.text,language:p.kind}))
];
const overrides={
 'job-application-agent':'business','onboarding-playbook-tracker':'business',
 'conduct-playbook-builder':'business','whitelight-sales-bot':'business',
 'gym-social-media':'fullstack','nutrition-tracker':'fullstack',
 'python-for-data-analysis':'data','Power-BI-project':'data','sql':'data',
 'neetcode-submissions':'learning'
};
let catalog=fallback,activeCategory='all',usedFallback=true;
const hidden=new Set(['mohamedalsayed12','mohamedalsayed12.github.io']);
function category(repo){
 if(overrides[repo.name])return overrides[repo.name];
 const s=(repo.name+' '+(repo.description||'')+' '+(repo.language||'')).toLowerCase();
 if(/sales|customer|crm|onboard|application|playbook|workflow/.test(s))return 'business';
 if(/data|sql|analytics|power.bi|dashboard/.test(s))return 'data';
 if(/gym|nutrition|react|social|flask/.test(s))return 'fullstack';
 return 'learning';
}
function renderExplorer(){
 const q=search.value.trim().toLowerCase();
 const items=catalog.filter(r=>!r.fork&&!r.private&&!hidden.has(r.name))
 .filter(r=>activeCategory==='all'||category(r)===activeCategory)
 .filter(r=>[r.name,r.description||'',r.language||'',...(r.topics||[])].join(' ').toLowerCase().includes(q))
 .sort((a,b)=>{
  const priority=['job-application-agent','onboarding-playbook-tracker','whitelight-sales-bot','conduct-playbook-builder','nutrition-tracker','gym-social-media'];
  const ai=priority.indexOf(a.name),bi=priority.indexOf(b.name);
  if(ai!==-1||bi!==-1)return (ai===-1?999:ai)-(bi===-1?999:bi);
  return a.name.localeCompare(b.name);
 });
 explorer.replaceChildren();
 for(const repo of items){
  const card=el('article','explorer-card');
  const top=el('div','explorer-top');
  top.append(el('span','explorer-category',category(repo).replace('fullstack','full stack')),el('span','explorer-language',repo.language||'Project'));
  const title=el('h4',null,repo.name.replaceAll('-',' '));
  const desc=el('p',null,repo.description||'Explore this repository to see the implementation and documentation.');
  const actions=el('div','explorer-actions');
  actions.append(linkTo(repo.html_url||gh+repo.name,'View repository ↗'));
  const demos={'onboarding-playbook-tracker':'onboarding-demo/','whitelight-sales-bot':'whitelight-lead-bot-demo/','nutrition-tracker':'https://nutrition-tracker-alsayed-90b0d9adaf0f.herokuapp.com/'};
  if(demos[repo.name])actions.append(linkTo(demos[repo.name],'Try demo ↗'));
  card.append(top,title,desc,actions);explorer.append(card);
 }
 status.textContent=items.length+' project'+(items.length===1?'':'s')+(usedFallback?' · curated catalogue (live GitHub unavailable)':' · loaded from public GitHub');
 if(!items.length)explorer.append(el('p','empty-state','No matching projects. Try another search or category.'));
}
search.addEventListener('input',renderExplorer);
filters.addEventListener('click',e=>{
 const b=e.target.closest('button[data-filter]');if(!b)return;
 activeCategory=b.dataset.filter;
 for(const button of filters.querySelectorAll('button')){const selected=button===b;button.classList.toggle('active',selected);button.setAttribute('aria-pressed',String(selected));}
 renderExplorer();
});
renderExplorer();
(async()=>{
 try{
  const response=await fetch('https://api.github.com/users/mohamedalsayed12/repos?per_page=100&type=owner&sort=updated',{headers:{Accept:'application/vnd.github+json'}});
  if(!response.ok)throw new Error('GitHub unavailable');
  const data=await response.json();
  if(!Array.isArray(data))throw new Error('Unexpected GitHub response');
  catalog=data.filter(r=>!r.fork&&!r.private).map(r=>({...r,description:r.description||fallback.find(f=>f.name===r.name)?.description||''}));
  usedFallback=false;renderExplorer();
 }catch(err){console.warn('Using curated repository fallback',err);renderExplorer();}
})();


document.getElementById('year').textContent=new Date().getFullYear();
