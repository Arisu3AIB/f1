<<<<<<< HEAD
# MarketPulse — Global News Sentiment Dashboard

A rich, real-time dashboard that gathers world news and shows its **sentiment impact** on stocks, indices, and crypto across US, Indian, and global markets.

![MarketPulse Screenshot](assets/preview.png)

## Features

- **Live ticker** — scrolling prices for US stocks, Indian stocks, and crypto
- **Market tabs** — switch between All / US / Indian / Crypto views
- **Sentiment vs Price chart** — overlays news sentiment score with price index (1D / 7D / 1M / 3M)
- **Live news feed** — articles tagged Bullish / Bearish / Neutral with impact scores
- **Asset sentiment bars** — SPY, NIFTY, BTC, ETH, GOLD, INR at a glance
- **Trending keywords** — extracted from news headlines
- **Global market pulse** — sentiment by region (USA, India, UK, Japan, China, Crypto)
- **API key manager** — plug in real keys via the UI, stored in localStorage
- **Search** — filter news by stock name, keyword, or source

## Getting Started

### 1. Clone & open
```bash
git clone https://github.com/YOUR_USERNAME/f1.git
cd f1/marketpulse
# Open index.html in any browser — no build step needed
```

### 2. Connect live data (optional)
Click **Connect API** in the top-right and enter your keys:

| API | Free tier | What it powers |
|-----|-----------|----------------|
| [NewsAPI](https://newsapi.org) | 100 req/day | Live news headlines |
| [Alpha Vantage](https://alphavantage.co) | 25 req/day | US stock quotes |
| [CoinGecko](https://coingecko.com/api) | Free, no key | Crypto prices |

Keys are saved to `localStorage` — never sent to any server.

### 3. Enable live data in code
In `js/data.js`, uncomment the `fetchLiveNews`, `fetchCryptoPrices`, and `fetchStockQuote` functions, then call them from `app.js` on a timer.

## Project Structure

```
marketpulse/
├── index.html          # Main page
├── css/
│   └── style.css       # Dark theme, responsive layout
├── js/
│   ├── data.js         # All data + API config + live fetch helpers
│   ├── charts.js       # Chart.js builders (main chart + gauge)
│   └── app.js          # Rendering logic, event handlers, init
└── assets/
    └── preview.png     # Screenshot
```

## Sentiment Scoring Logic

The current version uses keyword-based scoring (see `scoreSentiment()` in `data.js`). Words like *surge, rally, record, profit* add +1; *crash, fall, miss, warning* subtract −1. The final score is normalized to 0–100.

For production use, replace with a proper NLP model or a sentiment API like [VADER](https://github.com/cjhutto/vaderSentiment) (Python) or [Sentiment](https://www.npmjs.com/package/sentiment) (Node.js).

## Roadmap

- [ ] WebSocket ticker with real prices
- [ ] Backend proxy for NewsAPI (to hide key from browser)
- [ ] Python FastAPI backend with VADER sentiment
- [ ] Email/SMS alerts for high-impact news
- [ ] Portfolio tracker — enter your holdings and see personalized impact

## Tech Stack

- Vanilla HTML / CSS / JavaScript — zero dependencies, no build step
- [Chart.js 4.4](https://chartjs.org) — price + sentiment charts
- Data APIs: NewsAPI · Alpha Vantage · CoinGecko

---

Built as a first open-source project. PRs and issues welcome!
=======
# f1
>>>>>>> 56672e07e893d76abddc37d35b4447ec8ea7003c
