const user='mohamedalsayed12';
const info={
 'gym-social-media':['Gym Social Media API','BACKEND · REST API','A gym focused social backend where users can register, publish posts, and vote. JWT authentication and ownership checks protect user content.',['Python','FastAPI','PostgreSQL','SQLAlchemy']],
 'nutrition-tracker':['Nutrition Tracker API','BACKEND · HEALTH TOOL','An API for food and activity logs, personal goals, USDA food lookup, and daily and weekly reports.',['Python','Flask','PostgreSQL','Docker']],
 'whitelight-sales-bot':['White Light Sales Bot','BACKEND · BUSINESS TOOL','An early stage wholesale sales backend with role based accounts, authentication, and PostgreSQL migrations.',['Python','FastAPI','PostgreSQL','Alembic']],
 'Power-BI-project':['Data Jobs Dashboards','DATA · VISUALISATION','Interactive Power BI reports exploring data job postings, salary trends, and skills across roles and countries.',['Power BI','DAX','Data analysis']],
 'python-for-data-analysis':['Netflix Content Demand Analysis','DATA · PYTHON','A reproducible notebook that combines viewing and ratings data to explore demand, reliability, and illustrative acquisition scenarios.',['Python','Pandas','Jupyter']],
 'sql':['SQL Analysis & Reporting','DATA · QUERYING','Reporting views and exploratory SQL that clean, join, and aggregate warehouse and media datasets.',['SQL','CTEs','Reporting']],
 'neetcode-submissions':['NeetCode Solutions','LEARNING · ALGORITHMS','Automatically synced coding practice submissions organised by topic and problem.',['Python','Algorithms']],
 'excel':['Excel','DATA · SPREADSHEETS','Excel project repository on GitHub.',['Excel']],
 'whitelight-lead-bot':['White Light Lead Bot','BUSINESS · AUTOMATION','Lead bot project repository for White Light Trading.',['Project repository']]
};
const names=Object.keys(info);
const saved=names.map(name=>({name,html_url:`https://github.com/${user}/${name}`}));
const list=document.getElementById('project-list'),status=document.getElementById('project-status');
function diagram(i){const flip=i%2===1;return `<svg viewBox="0 0 420 210" aria-hidden="true" focusable="false"><path d="M${flip?345:75} 110 C155 110 145 35 215 35 S295 63 ${flip?75:345} 63"/><path d="M${flip?345:75} 110 C160 110 170 100 235 105 S300 150 ${flip?100:325} 160"/><path d="M215 35 L235 105 L325 160"/><rect class="highlight" x="${flip?313:43}" y="96" width="64" height="27"/><rect x="182" y="22" width="56" height="27"/><rect x="213" y="92" width="55" height="27"/><rect x="${flip?43:313}" y="50" width="65" height="27"/><rect x="${flip?68:295}" y="147" width="65" height="27"/></svg>`}
function render(repos){
 list.replaceChildren();document.getElementById('project-count').textContent=`${repos.length} PUBLIC REPOS`;
 repos.forEach((repo,i)=>{
  const data=info[repo.name]||[repo.name.replace(/[-_]/g,' ').replace(/\b\w/g,c=>c.toUpperCase()),'GITHUB · PROJECT',repo.description||'Explore this project and its source on GitHub.',repo.language?[repo.language]:[]];
  const card=document.createElement('article');card.className='project-card';
  const art=document.createElement('div');art.className='project-art';art.innerHTML=diagram(i);const caption=document.createElement('span');caption.className='art-caption';caption.textContent=`PROJECT / ${String(i+1).padStart(2,'0')}`;art.append(caption);
  const body=document.createElement('div');body.className='project-body';const kind=document.createElement('span');kind.className='project-kind';kind.textContent=data[1];
  const h=document.createElement('h3');h.textContent=data[0];const p=document.createElement('p');p.textContent=data[2];
  const tags=document.createElement('div');tags.className='project-tags';data[3].forEach(t=>{const s=document.createElement('span');s.textContent=t;tags.append(s)});
  const links=document.createElement('div');links.className='project-links';const a=document.createElement('a');a.href=repo.html_url;a.target='_blank';a.rel='noopener noreferrer';a.textContent='Source ↗';links.append(a);
  body.append(kind,h,p,tags,links);card.append(art,body);list.append(card);
 });
}
document.getElementById('year').textContent=new Date().getFullYear();render(saved);
fetch(`https://api.github.com/users/${user}/repos?type=owner&sort=updated&per_page=100`,{headers:{Accept:'application/vnd.github+json'}})
 .then(r=>{if(!r.ok)throw Error(`GitHub ${r.status}`);return r.json()})
 .then(data=>{if(!Array.isArray(data))throw Error('Invalid GitHub data');const repos=data.filter(r=>!r.private&&!r.fork&&!r.archived&&r.name!==`${user}.github.io`);const order=new Map(names.map((n,i)=>[n,i]));repos.sort((a,b)=>(order.get(a.name)??999)-(order.get(b.name)??999));render(repos);status.textContent='Project list updated from GitHub.'})
 .catch(()=>{status.textContent='Showing the saved public project list. Visit GitHub for the latest updates.'});

