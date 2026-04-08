// ============================================================
// MarketPulse — data.js
// Replace API_KEYS with real keys to enable live data
// ============================================================

const CONFIG = {
  // --- Real API keys (replace with your own) ---
  NEWS_API_KEY:      'YOUR_NEWSAPI_KEY',        // https://newsapi.org
  ALPHA_VANTAGE_KEY: 'YOUR_ALPHA_VANTAGE_KEY',  // https://alphavantage.co
  COINGECKO_URL:     'https://api.coingecko.com/api/v3', // free, no key needed
  REFRESH_INTERVAL:  60000, // ms — how often to refresh (1 min)
};

// Tab data — swapped when user clicks market tabs
const TAB_DATA = {
  all: {
    metrics: [
      { label: 'Global sentiment', value: '73',    change: '+4.2',   up: true  },
      { label: 'News articles',    value: '1,284', change: '+89 today', up: true },
      { label: 'Bullish signals',  value: '61%',   change: '+3%',    up: true  },
      { label: 'Bearish signals',  value: '39%',   change: '-3%',    up: false },
    ],
  },
  us: {
    metrics: [
      { label: 'S&P 500',     value: '5,621',  change: '+0.84%', up: true  },
      { label: 'NASDAQ',      value: '17,803', change: '+1.12%', up: true  },
      { label: 'US sentiment',value: '78',     change: '+5.1',   up: true  },
      { label: 'VIX',         value: '14.3',   change: '-0.9',   up: false },
    ],
  },
  in: {
    metrics: [
      { label: 'NIFTY 50',   value: '22,147',   change: '+0.53%', up: true },
      { label: 'SENSEX',     value: '73,088',   change: '+0.48%', up: true },
      { label: 'IN sentiment',value: '69',       change: '+2.3',   up: true },
      { label: 'FII inflow',  value: '₹2,341Cr', change: '+12%',   up: true },
    ],
  },
  crypto: {
    metrics: [
      { label: 'BTC/USD',        value: '$67,420', change: '+2.14%', up: true  },
      { label: 'ETH/USD',        value: '$3,541',  change: '+1.87%', up: true  },
      { label: 'Crypto sentiment',value: '66',     change: '-1.4',   up: false },
      { label: 'Fear & Greed',   value: '62',      change: 'Greed',  up: true  },
    ],
  },
};

// Ticker symbols
const TICKERS = [
  { sym: 'AAPL',    price: '$189.42',   change: '+1.2%',  up: true  },
  { sym: 'RELIANCE',price: '₹2,941',   change: '+3.2%',  up: true  },
  { sym: 'BTC',     price: '$67,420',   change: '+2.1%',  up: true  },
  { sym: 'TSLA',    price: '$172.18',   change: '-0.8%',  up: false },
  { sym: 'NIFTY',   price: '22,147',    change: '+0.5%',  up: true  },
  { sym: 'ETH',     price: '$3,541',    change: '+1.9%',  up: true  },
  { sym: 'MSFT',    price: '$415.30',   change: '+0.9%',  up: true  },
  { sym: 'TCS',     price: '₹3,872',   change: '-1.1%',  up: false },
  { sym: 'GOLD',    price: '$2,328',    change: '+0.3%',  up: true  },
  { sym: 'SENSEX',  price: '73,088',    change: '+0.5%',  up: true  },
  { sym: 'SOL',     price: '$178.42',   change: '+4.3%',  up: true  },
  { sym: 'INFY',    price: '₹1,482',   change: '-0.7%',  up: false },
  { sym: 'NVDA',    price: '$876.20',   change: '+2.8%',  up: true  },
  { sym: 'BNB',     price: '$584.10',   change: '+1.2%',  up: true  },
];

// News articles (replace with live NewsAPI call)
const NEWS_ARTICLES = [
  {
    source: 'Reuters', age: '3m',
    headline: 'Fed signals potential rate cuts in Q3 amid cooling inflation data',
    sentiment: 'bull', impact: 4, dir: 'up',
    assets: ['SPY', 'QQQ', 'AAPL'],
  },
  {
    source: 'Economic Times', age: '7m',
    headline: 'Reliance Industries Q4 profit beats estimates; stock surges 3.2%',
    sentiment: 'bull', impact: 5, dir: 'up',
    assets: ['RELIANCE', 'NIFTY', 'SENSEX'],
  },
  {
    source: 'Bloomberg', age: '12m',
    headline: 'Bitcoin crosses $67K as institutional buying intensifies ahead of halving',
    sentiment: 'bull', impact: 4, dir: 'up',
    assets: ['BTC', 'ETH', 'SOL'],
  },
  {
    source: 'CNBC', age: '18m',
    headline: 'Tech sector faces headwinds as chip shortage concerns resurface',
    sentiment: 'bear', impact: 3, dir: 'down',
    assets: ['NVDA', 'AMD', 'TSLA'],
  },
  {
    source: 'Mint', age: '24m',
    headline: 'RBI maintains repo rate; governor cites growth-inflation balance',
    sentiment: 'neut', impact: 2, dir: 'neut',
    assets: ['NIFTY', 'SENSEX', 'BANKNIFTY'],
  },
  {
    source: 'WSJ', age: '31m',
    headline: 'Apple reports record services revenue, iPhone demand stabilizes in India',
    sentiment: 'bull', impact: 4, dir: 'up',
    assets: ['AAPL', 'MSFT', 'GOOGL'],
  },
  {
    source: 'CoinDesk', age: '38m',
    headline: 'Ethereum ETF approval odds rise to 65% as SEC deadline approaches',
    sentiment: 'bull', impact: 5, dir: 'up',
    assets: ['ETH', 'BTC'],
  },
  {
    source: 'Moneycontrol', age: '44m',
    headline: 'IT sector outlook cautious; TCS and Infosys flag weak demand in US',
    sentiment: 'bear', impact: 3, dir: 'down',
    assets: ['TCS', 'INFY', 'WIPRO'],
  },
];

// Asset sentiment scores
const ASSET_SENTIMENT = [
  { sym: 'SPY',   pct: 78, color: '#378ADD', dir: 'up'   },
  { sym: 'NIFTY', pct: 69, color: '#1D9E75', dir: 'up'   },
  { sym: 'BTC',   pct: 66, color: '#EF9F27', dir: 'up'   },
  { sym: 'ETH',   pct: 63, color: '#7F77DD', dir: 'up'   },
  { sym: 'GOLD',  pct: 71, color: '#BA7517', dir: 'up'   },
  { sym: 'INR',   pct: 55, color: '#888780', dir: 'neut' },
];

// Trending keywords from news analysis
const KEYWORDS = [
  { word: 'Fed rates',      size: 3, bg: '#1a2a3a', color: '#378ADD' },
  { word: 'inflation',      size: 2, bg: '#2a1a1a', color: '#f87171' },
  { word: 'RBI',            size: 2, bg: '#0f2a1e', color: '#4ade80' },
  { word: 'Bitcoin halving',size: 3, bg: '#2a1e0a', color: '#fbbf24' },
  { word: 'Reliance',       size: 2, bg: '#1e1a2a', color: '#a78bfa' },
  { word: 'ETF approval',   size: 3, bg: '#1a2a3a', color: '#60a5fa' },
  { word: 'chip shortage',  size: 1, bg: '#2a1a1a', color: '#fca5a5' },
  { word: 'Q4 earnings',    size: 2, bg: '#162510', color: '#86efac' },
  { word: 'FII inflows',    size: 2, bg: '#0f2a1e', color: '#34d399' },
  { word: 'OPEC',           size: 1, bg: '#1e1e1e', color: '#9ca3af' },
];

// Global region sentiment
const REGIONS = [
  { flag: '🇺🇸', name: 'USA',    score: 78, color: '#22c55e' },
  { flag: '🇮🇳', name: 'India',  score: 69, color: '#22c55e' },
  { flag: '🌐',  name: 'Crypto', score: 66, color: '#22c55e' },
  { flag: '🇬🇧', name: 'UK',     score: 61, color: '#22c55e' },
  { flag: '🇯🇵', name: 'Japan',  score: 58, color: '#f59e0b' },
  { flag: '🇨🇳', name: 'China',  score: 44, color: '#ef4444' },
];

// 7-day chart data
const CHART_DATA = {
  '7D': {
    labels:    ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    price:     [100, 102, 101, 104, 103, 106, 107],
    sentiment: [58, 62, 60, 67, 65, 71, 73],
  },
  '1D': {
    labels:    ['9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM'],
    price:     [105, 106.2, 105.8, 107.1, 106.5, 107.8, 108.2, 107.9],
    sentiment: [68, 70, 69, 72, 71, 74, 75, 73],
  },
  '1M': {
    labels:    ['W1','W2','W3','W4'],
    price:     [98, 101, 104, 107],
    sentiment: [55, 60, 67, 73],
  },
  '3M': {
    labels:    ['Jan','Feb','Mar','Apr'],
    price:     [92, 97, 103, 107],
    sentiment: [48, 55, 64, 73],
  },
};

// Sentiment breakdown bars
const SENT_BARS = [
  { label: 'Positive news', pct: 61, color: '#22c55e' },
  { label: 'Neutral news',  pct: 22, color: '#f59e0b' },
  { label: 'Negative news', pct: 17, color: '#ef4444' },
];

// ============================================================
// LIVE DATA HELPERS
// Uncomment and configure these when you have real API keys
// ============================================================

/*
async function fetchLiveNews(query = 'stock market economy') {
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=publishedAt&pageSize=20&apiKey=${CONFIG.NEWS_API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.articles || [];
}

async function fetchCryptoPrices() {
  const url = `${CONFIG.COINGECKO_URL}/simple/price?ids=bitcoin,ethereum,solana,binancecoin&vs_currencies=usd&include_24hr_change=true`;
  const res = await fetch(url);
  return await res.json();
}

async function fetchStockQuote(symbol) {
  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${CONFIG.ALPHA_VANTAGE_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  return data['Global Quote'];
}

// Simple keyword-based sentiment scorer
function scoreSentiment(text) {
  const bull = ['surge','rally','gain','beat','record','growth','rise','profit','up','strong','bullish'];
  const bear = ['fall','drop','crash','miss','loss','decline','weak','down','bearish','risk','warning'];
  let score = 0;
  const lower = text.toLowerCase();
  bull.forEach(w => { if (lower.includes(w)) score += 1; });
  bear.forEach(w => { if (lower.includes(w)) score -= 1; });
  return score;
}
*/
