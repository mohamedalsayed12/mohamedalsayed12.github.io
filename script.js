const gh='https://github.com/mohamedalsayed12/';
// Main backend projects, shown as large cards.
const featured=[
 {repo:'whitelight-sales-bot',title:'White Light Sales & Lead Desk',kind:'REAL BUSINESS · FASTAPI',
  text:'Sales tool for White Light Trading, the Bahrain wholesale company where I interned. Tally Prime stays the source of truth: stock and invoice CSV imports, orders that reserve stock, PDF quotes, cheque tracking, credit holds, a CEO daily summary and a lead desk for managers and salesmen. Role-based access, Alembic migrations and 90+ pytest tests in GitHub Actions. The demo uses sample data.',
  tags:['Python','FastAPI','PostgreSQL','JavaScript'],demo:'whitelight-lead-bot-demo/'},
 {repo:'gym-social-media',title:'Gym Social Media',kind:'FULL STACK · FASTAPI + REACT',
  text:'A gym social app where people log workouts set by set and personal records are flagged automatically. Cursor-paginated feed with a fixed query count, strength rankings from Postgres window functions, follows, likes and communities, single-use refresh tokens, Docker and 50+ pytest tests in GitHub Actions with automatic deploys.',
  tags:['Python','FastAPI','PostgreSQL','Docker'],img:'images/gym-social-media.jpg',alt:'LiftLog screens: feed, workout logger, profile and login'},
 {repo:'nutrition-tracker',title:'Nutrition Tracker',kind:'FULL STACK · FLASK + REACT',
  text:'Log food and activity against personalised calorie, macro and micronutrient targets. USDA FoodData Central search with ranked results, barcode scanning, logging by Siri and weekly reports, installable on a phone. Layered routes, services and models, 90+ pytest tests in CI, deployed on Heroku.',
  tags:['Python','Flask','PostgreSQL','React'],img:'images/nutrition-tracker.jpg',alt:'Nutrition tracker Today page: calorie ring and macro targets',
  demo:'https://nutrition-tracker-alsayed-90b0d9adaf0f.herokuapp.com/'}
];
// Smaller supporting work, shown as compact cards.
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

const grid=document.getElementById('more-list');
more.forEach(p=>{
 const a=linkTo(gh+p.repo,'');a.className='mini-card';
 a.append(el('small',null,p.kind),el('strong',null,p.title),el('span',null,p.text));
 grid.append(a);
});

document.getElementById('year').textContent=new Date().getFullYear();
