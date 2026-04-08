// ============================================================
// MarketPulse — app.js
// Main application controller
// ============================================================

// ---- Clock ----
function updateClock() {
  const now  = new Date();
  const ist  = new Date(now.getTime() + 5.5 * 3600000);
  const hh   = String(ist.getUTCHours()).padStart(2, '0');
  const mm   = String(ist.getUTCMinutes()).padStart(2, '0');
  const ss   = String(ist.getUTCSeconds()).padStart(2, '0');
  document.getElementById('clock').textContent = `${hh}:${mm}:${ss} IST`;
}

// ---- Ticker ----
function renderTicker() {
  const all = [...TICKERS, ...TICKERS]; // duplicate for seamless loop
  const html = all.map(t => `
    <span class="ticker-item">
      <span class="ticker-sym">${t.sym}</span>
      <span>${t.price}</span>
      <span class="${t.up ? 'color-up' : 'color-down'}">${t.change}</span>
    </span>`).join('');
  document.getElementById('ticker').innerHTML = html;
}

// ---- Metrics ----
function renderMetrics(tab) {
  const metrics = TAB_DATA[tab].metrics;
  document.getElementById('metricsGrid').innerHTML = metrics.map(m => `
    <div class="metric-card">
      <div class="metric-label">${m.label}</div>
      <div class="metric-value">${m.value}</div>
      ${m.change ? `<div class="metric-change ${m.up ? 'color-up' : 'color-down'}">${m.up ? '▲' : '▼'} ${m.change}</div>` : ''}
    </div>`).join('');
}

// ---- Sentiment bars ----
function renderSentBars() {
  document.getElementById('sentBars').innerHTML = SENT_BARS.map(b => `
    <div class="sent-bar-row">
      <div class="sent-bar-header">
        <span style="font-size:12px;color:var(--text-secondary)">${b.label}</span>
        <span style="font-size:12px;font-weight:600;color:${b.color}">${b.pct}%</span>
      </div>
      <div class="sent-bar-track">
        <div class="sent-bar-fill" style="width:${b.pct}%;background:${b.color}"></div>
      </div>
    </div>`).join('');
}

// ---- News feed ----
function renderNews() {
  document.getElementById('newsCount').textContent = `${NEWS_ARTICLES.length} articles`;

  document.getElementById('newsFeed').innerHTML = NEWS_ARTICLES.map(n => {
    const badgeClass = n.sentiment === 'bull' ? 'badge-bull' : n.sentiment === 'bear' ? 'badge-bear' : 'badge-neut';
    const badgeText  = n.sentiment === 'bull' ? 'Bullish' : n.sentiment === 'bear' ? 'Bearish' : 'Neutral';

    const dots = Array(5).fill(0).map((_, i) => {
      const filled = i < n.impact;
      const cls = filled ? (n.dir === 'up' ? 'on-up' : 'on-down') : '';
      return `<span class="idot ${cls}"></span>`;
    }).join('');

    return `
      <div class="news-item">
        <div class="news-meta">
          <span class="news-source">${n.source}</span>
          <span class="news-age">${n.age} ago</span>
          <span class="badge ${badgeClass}">${badgeText}</span>
        </div>
        <div class="news-headline">${n.headline}</div>
        <div class="news-impact">
          <span class="impact-label">Impact</span>
          <div class="impact-dots">${dots}</div>
        </div>
      </div>`;
  }).join('');
}

// ---- Asset rows ----
function renderAssets() {
  document.getElementById('assetRows').innerHTML = ASSET_SENTIMENT.map(a => `
    <div class="asset-row">
      <span class="asset-sym">${a.sym}</span>
      <div class="asset-track">
        <div class="asset-fill" style="width:${a.pct}%;background:${a.color}"></div>
      </div>
      <span class="asset-pct ${a.dir === 'up' ? 'color-up' : a.dir === 'down' ? 'color-down' : 'color-neut'}">${a.pct}</span>
    </div>`).join('');
}

// ---- Keyword cloud ----
function renderKeywords() {
  document.getElementById('keywordCloud').innerHTML = KEYWORDS.map(k => {
    const sizes = [11, 12, 14];
    const fs = sizes[k.size - 1] || 12;
    return `<span class="kw-pill" style="background:${k.bg};color:${k.color};font-size:${fs}px">${k.word}</span>`;
  }).join('');
}

// ---- Region grid ----
function renderRegions() {
  document.getElementById('regionGrid').innerHTML = REGIONS.map(r => `
    <div class="region-card">
      <div class="region-flag">${r.flag}</div>
      <div class="region-name">${r.name}</div>
      <div class="region-score" style="color:${r.color}">${r.score}</div>
    </div>`).join('');
}

// ---- Tabs ----
function initTabs() {
  document.querySelectorAll('.tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      renderMetrics(btn.dataset.tab);
    });
  });
}

// ---- Range buttons ----
function initRangeButtons() {
  document.querySelectorAll('.rbtn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.rbtn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      buildMainChart(btn.dataset.range);
    });
  });
}

// ---- API Modal ----
function initApiModal() {
  const btn = document.getElementById('apiBtn');
  btn.addEventListener('click', () => {
    document.getElementById('apiModal').classList.add('open');
  });
  document.getElementById('cancelModal').addEventListener('click', () => {
    document.getElementById('apiModal').classList.remove('open');
  });
  document.getElementById('saveKeys').addEventListener('click', () => {
    const newsKey  = document.getElementById('newsApiKey').value.trim();
    const alphaKey = document.getElementById('alphaKey').value.trim();
    if (newsKey)  { CONFIG.NEWS_API_KEY = newsKey;      localStorage.setItem('mp_news_key', newsKey); }
    if (alphaKey) { CONFIG.ALPHA_VANTAGE_KEY = alphaKey; localStorage.setItem('mp_alpha_key', alphaKey); }
    document.getElementById('apiModal').classList.remove('open');
    alert('API keys saved! Reload the page to fetch live data.');
  });
}

// ---- Search ----
function initSearch() {
  const inp = document.getElementById('searchInput');
  inp.addEventListener('input', () => {
    const q = inp.value.toLowerCase().trim();
    if (!q) { renderNews(); return; }
    const filtered = NEWS_ARTICLES.filter(n =>
      n.headline.toLowerCase().includes(q) ||
      n.source.toLowerCase().includes(q)   ||
      (n.assets || []).some(a => a.toLowerCase().includes(q))
    );
    renderFilteredNews(filtered, q);
  });
}

function renderFilteredNews(articles, query) {
  document.getElementById('newsCount').textContent = `${articles.length} results for "${query}"`;
  document.getElementById('newsFeed').innerHTML = articles.length === 0
    ? `<div style="text-align:center;padding:24px;color:var(--text-tertiary);font-size:13px">No articles found for "${query}"</div>`
    : articles.map(n => {
        const badgeClass = n.sentiment === 'bull' ? 'badge-bull' : n.sentiment === 'bear' ? 'badge-bear' : 'badge-neut';
        const badgeText  = n.sentiment === 'bull' ? 'Bullish' : n.sentiment === 'bear' ? 'Bearish' : 'Neutral';
        const dots = Array(5).fill(0).map((_, i) => {
          const cls = i < n.impact ? (n.dir === 'up' ? 'on-up' : 'on-down') : '';
          return `<span class="idot ${cls}"></span>`;
        }).join('');
        return `
          <div class="news-item">
            <div class="news-meta">
              <span class="news-source">${n.source}</span>
              <span class="news-age">${n.age} ago</span>
              <span class="badge ${badgeClass}">${badgeText}</span>
            </div>
            <div class="news-headline">${n.headline}</div>
            <div class="news-impact">
              <span class="impact-label">Impact</span>
              <div class="impact-dots">${dots}</div>
            </div>
          </div>`;
      }).join('');
}

// ---- Load saved keys ----
function loadSavedKeys() {
  const newsKey  = localStorage.getItem('mp_news_key');
  const alphaKey = localStorage.getItem('mp_alpha_key');
  if (newsKey)  CONFIG.NEWS_API_KEY = newsKey;
  if (alphaKey) CONFIG.ALPHA_VANTAGE_KEY = alphaKey;
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  loadSavedKeys();
  renderTicker();
  renderMetrics('all');
  renderSentBars();
  renderNews();
  renderAssets();
  renderKeywords();
  renderRegions();
  buildMainChart('7D');
  drawGauge(73);
  initTabs();
  initRangeButtons();
  initApiModal();
  initSearch();
  setInterval(updateClock, 1000);
  updateClock();
});
