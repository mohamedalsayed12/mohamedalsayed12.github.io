// Public preview: every name and figure is generic example data.
const leads = [
  { id: 1, company: "Example Hotel", sector: "Hotel", area: "Area A", score: 85, status: "new", detail: "Opening soon", reasons: [[40, "Hotel opening"], [25, "Large site"], [20, "Good sector fit"]] },
  { id: 2, company: "Example Contractor", sector: "Contractor", area: "Area B", score: 78, status: "new", detail: "New project", reasons: [[35, "Project activity"], [25, "Sector fit"], [18, "Local delivery area"]] },
  { id: 3, company: "Example Restaurant", sector: "Restaurant", area: "Area C", score: 64, status: "contacted", detail: "New venue", reasons: [[25, "Restaurant"], [24, "New venue"], [15, "Local delivery area"]] },
  { id: 4, company: "Example Facilities Firm", sector: "Facilities", area: "Area D", score: 58, status: "new", detail: "Facilities contract", reasons: [[20, "Facilities company"], [20, "Contract activity"], [18, "Local delivery area"]] },
];
const state = { view: "leads", selectedId: 1, showDetail: false };
const label = { new: "New", contacted: "Contacted" };
const esc = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

function badge(score, size = "") {
  return `<span class="score ${score >= 70 ? "high" : score >= 50 ? "mid" : "low"} ${size}"><b>${score}</b><small>SCORE</small></span>`;
}

function header() {
  return `<header class="app-header"><div class="brand"><span class="mark" aria-hidden="true"></span> WHITE LIGHT · LEADS</div>
    <nav class="nav"><button data-action="view" data-view="leads" ${state.view === "leads" ? 'aria-current="page"' : ""}>My leads</button><button data-action="view" data-view="overview" ${state.view === "overview" ? 'aria-current="page"' : ""}>Weekly overview</button></nav>
    <span class="sample-chip">PORTFOLIO DEMO · GENERIC DATA</span><a class="primary" href="../">Back to portfolio</a></header>`;
}

function leadCard(lead) {
  return `<button class="lead-card ${lead.id === state.selectedId ? "selected" : ""}" data-action="select" data-id="${lead.id}">${badge(lead.score)}
    <span class="lead-text"><strong>${esc(lead.company)}</strong><span class="meta">${esc(lead.sector)} · ${esc(lead.area)}</span><span class="meta dark">${esc(lead.detail)}</span><span class="status-line"><span class="pill ${lead.status}">${label[lead.status]}</span><span class="follow">Example only</span></span></span><span class="chevron" aria-hidden="true">›</span></button>`;
}

function leadsView() {
  const lead = leads.find((item) => item.id === state.selectedId) || leads[0];
  return `<main class="page leads-layout ${state.showDetail ? "show-detail" : ""}"><section class="panel list-panel"><div class="list-head"><h1>My leads</h1><p>Example sales team · ${leads.length} sample leads</p></div><div class="lead-list">${leads.map(leadCard).join("")}</div></section>
    <section class="panel detail-panel"><div class="detail-head"><button class="back" data-action="back">‹ My leads</button><div class="detail-title">${badge(lead.score, "large")}<div><h2>${esc(lead.company)}</h2><p class="meta">${esc(lead.sector)} · ${esc(lead.area)}</p></div></div><p class="status-line"><span class="pill ${lead.status}">${label[lead.status]}</span></p></div>
    <div class="detail-body"><div class="box"><p class="kicker">WHY THIS LEAD SCORES ${lead.score}</p>${lead.reasons.map(([points, reason]) => `<div class="reason"><b>+${points}</b><span>${esc(reason)}</span></div>`).join("")}<p class="source">Generic demonstration data</p></div>
    <div class="box message-card"><header><p class="kicker">FIRST MESSAGE</p></header><p class="draft">A draft message would appear here for a salesperson to review before sending.</p><p class="note">This public demo has no customer contacts, import access or messaging actions.</p></div></div></section></main>`;
}

function overviewView() {
  const funnel = [["New leads", "new", 24, "", 100], ["Contacted", "contacted", 12, "50%", 50], ["Quote sent", "quote", 4, "33%", 17], ["Won", "won", 1, "25%", 4]];
  return `<main class="page overview"><h1>Example weekly overview</h1><p class="caption">Generic figures that show the manager screen layout</p>
    <section class="card funnel"><p class="kicker">FROM LEAD TO SALE</p>${funnel.map(([name, kind, count, rate, width]) => `<div class="funnel-row"><span class="funnel-label">${name}</span><span class="track"><span class="bar ${kind}" style="width:${width}%"></span></span><span class="funnel-value">${count}<small>${rate}</small></span></div>`).join("")}</section>
    <div class="split"><article class="card"><p class="kicker">BY SALESPERSON</p><div class="table-wrap"><table><thead><tr><th>Salesperson</th><th class="num">Assigned</th><th class="num">Contacted</th><th class="num">Quotes</th><th class="num">Won</th></tr></thead><tbody><tr><td>Team member A</td><td class="num">12</td><td class="num">7</td><td class="num">3</td><td class="num">1</td></tr><tr><td>Team member B</td><td class="num">12</td><td class="num">5</td><td class="num">1</td><td class="num">0</td></tr></tbody></table></div></article>
    <article class="card"><p class="kicker">WHICH SOURCES WORK</p><div class="table-wrap"><table><thead><tr><th>Source</th><th class="num">Leads</th><th class="num">Quotes</th><th class="num">Won</th></tr></thead><tbody><tr><td>Example CSV source</td><td class="num">16</td><td class="num">3</td><td class="num">1</td></tr><tr><td>Manual entry</td><td class="num">8</td><td class="num">1</td><td class="num">0</td></tr></tbody></table></div></article></div>
    <section class="card imports"><div class="section-label"><p class="kicker">SAMPLE IMPORT QUEUE</p><span class="muted">Preview only</span></div><p class="muted">The private app saves CSV imports to PostgreSQL. This public preview contains no business contact records.</p></section></main>`;
}

function render() { document.getElementById("app").innerHTML = header() + (state.view === "leads" ? leadsView() : overviewView()); }
document.getElementById("app").addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");
  if (!target) return;
  if (target.dataset.action === "view") { state.view = target.dataset.view; state.showDetail = false; }
  if (target.dataset.action === "select") { state.selectedId = Number(target.dataset.id); state.showDetail = true; }
  if (target.dataset.action === "back") state.showDetail = false;
  render();
});
render();
