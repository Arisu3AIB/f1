// ============================================================
// MarketPulse — charts.js
// Chart.js chart builders
// ============================================================

let mainChartInstance = null;

function buildMainChart(range) {
  const d = CHART_DATA[range] || CHART_DATA['7D'];
  const ctx = document.getElementById('mainChart').getContext('2d');
  if (mainChartInstance) mainChartInstance.destroy();

  mainChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: d.labels,
      datasets: [
        {
          label: 'Price index',
          data: d.price,
          borderColor: '#378ADD',
          borderWidth: 2,
          pointRadius: 4,
          pointBackgroundColor: '#378ADD',
          pointBorderColor: '#0d0f14',
          pointBorderWidth: 2,
          tension: 0.4,
          yAxisID: 'y',
          fill: false,
        },
        {
          label: 'Sentiment score',
          data: d.sentiment,
          borderColor: '#1D9E75',
          borderWidth: 2,
          borderDash: [6, 4],
          pointRadius: 4,
          pointBackgroundColor: '#1D9E75',
          pointBorderColor: '#0d0f14',
          pointBorderWidth: 2,
          tension: 0.4,
          yAxisID: 'y2',
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1a1e2a',
          borderColor: 'rgba(255,255,255,0.1)',
          borderWidth: 1,
          titleColor: '#f0f2f8',
          bodyColor: '#8b90a0',
          padding: 10,
          callbacks: {
            label(ctx) {
              const label = ctx.dataset.label || '';
              return ` ${label}: ${ctx.parsed.y.toFixed(1)}`;
            },
          },
        },
      },
      scales: {
        x: {
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: { color: '#565c70', font: { size: 11 } },
          border: { color: 'rgba(255,255,255,0.06)' },
        },
        y: {
          position: 'left',
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: { color: '#8b90a0', font: { size: 11 } },
          border: { color: 'rgba(255,255,255,0.06)' },
        },
        y2: {
          position: 'right',
          grid: { drawOnChartArea: false },
          ticks: { color: '#1D9E75', font: { size: 11 } },
          border: { color: 'rgba(255,255,255,0.06)' },
          min: 0,
          max: 100,
        },
      },
    },
  });
}

function drawGauge(score) {
  const canvas = document.getElementById('gaugeChart');
  const ctx = canvas.getContext('2d');
  const cx = 90, cy = 88, r = 68;

  ctx.clearRect(0, 0, 180, 100);

  // Track
  ctx.beginPath();
  ctx.arc(cx, cy, r, Math.PI, 0);
  ctx.strokeStyle = '#1a1e2a';
  ctx.lineWidth = 14;
  ctx.lineCap = 'round';
  ctx.stroke();

  // Zones: red / amber / green
  const zones = [
    { start: Math.PI,       end: Math.PI * 1.33, color: '#ef4444' },
    { start: Math.PI * 1.33, end: Math.PI * 1.67, color: '#f59e0b' },
    { start: Math.PI * 1.67, end: Math.PI * 2,   color: '#22c55e' },
  ];

  zones.forEach(z => {
    ctx.beginPath();
    ctx.arc(cx, cy, r, z.start, z.end);
    ctx.strokeStyle = z.color + '33';
    ctx.lineWidth = 14;
    ctx.lineCap = 'butt';
    ctx.stroke();
  });

  // Score arc
  const angle = Math.PI + (score / 100) * Math.PI;
  const arcColor = score >= 60 ? '#22c55e' : score >= 40 ? '#f59e0b' : '#ef4444';
  ctx.beginPath();
  ctx.arc(cx, cy, r, Math.PI, angle);
  ctx.strokeStyle = arcColor;
  ctx.lineWidth = 14;
  ctx.lineCap = 'round';
  ctx.stroke();
}
