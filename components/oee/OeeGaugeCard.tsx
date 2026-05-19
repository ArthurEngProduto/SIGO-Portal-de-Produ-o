type OeeGaugeCardProps = { label: string; value: number; large?: boolean };

const polarToCartesian = (cx: number, cy: number, r: number, angle: number) => {
  const rad = (angle * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
};

const describeArc = (cx: number, cy: number, r: number, start: number, end: number) => {
  const s = polarToCartesian(cx, cy, r, start);
  const e = polarToCartesian(cx, cy, r, end);
  const largeArc = end - start <= 180 ? 0 : 1;
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${largeArc} 1 ${e.x} ${e.y}`;
};

export default function OeeGaugeCard({ label, value, large }: OeeGaugeCardProps) {
  const safe = Math.max(0, Math.min(100, value));
  const width = large ? 260 : 220;
  const height = large ? 160 : 138;
  const cx = width / 2;
  const cy = height - (large ? 18 : 16);
  const r = large ? 94 : 78;
  const stroke = large ? 24 : 20;
  const pointerAngle = 180 + safe * 1.8;
  const pointerLen = r - stroke * 0.42;
  const tip = polarToCartesian(cx, cy, pointerLen, pointerAngle);
  const tail = polarToCartesian(cx, cy, large ? 13 : 11, pointerAngle + 180);
  const needleWidth = large ? 5 : 4;
  const pointerRad = (pointerAngle * Math.PI) / 180;
  const perpX = Math.cos(pointerRad + Math.PI / 2) * needleWidth;
  const perpY = Math.sin(pointerRad + Math.PI / 2) * needleWidth;
  const needlePath = `${tip.x},${tip.y} ${cx + perpX},${cy + perpY} ${tail.x},${tail.y} ${cx - perpX},${cy - perpY}`;
  const gradientId = `oee-gauge-gradient-${label.replace(/\W+/g, "-").toLowerCase()}`;
  const shadowId = `oee-gauge-shadow-${label.replace(/\W+/g, "-").toLowerCase()}`;

  return (
    <article style={{ background: "#fff", border: "1px solid #dbe2ea", borderRadius: 12, boxShadow: "0 1px 3px rgba(16,24,40,.06)", minHeight: large ? 305 : 275 }}>
      <div style={{ background: "#123a73", color: "#fff", padding: "10px 14px", borderRadius: "12px 12px 0 0", fontWeight: 700 }}>{label}</div>
      <div style={{ padding: large ? "16px 16px 12px" : "14px 14px 10px", display: "grid", justifyItems: "center", alignContent: "start", rowGap: 10 }}>
        <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`${label} ${safe.toFixed(1)} por cento`} style={{ maxWidth: width, display: "block" }}>
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff4d5a" />
              <stop offset="42%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#97c900" />
            </linearGradient>
            <filter id={shadowId} x="-20%" y="-20%" width="140%" height="160%">
              <feDropShadow dx="0" dy="3" stdDeviation="2.2" floodColor="#0f172a" floodOpacity="0.16" />
            </filter>
          </defs>

          <path d={describeArc(cx, cy, r, 180, 360)} stroke="#e7edf5" strokeWidth={stroke} fill="none" strokeLinecap="round" />
          <path d={describeArc(cx, cy, r, 180, 360)} stroke={`url(#${gradientId})`} strokeWidth={stroke} fill="none" strokeLinecap="round" filter={`url(#${shadowId})`} />

          <polygon points={needlePath} fill="#1f2937" opacity="0.96" />
          <circle cx={cx} cy={cy} r={large ? 13 : 11} fill="#f8fafc" stroke="#94a3b8" strokeWidth={2.4} />
          <circle cx={cx} cy={cy} r={large ? 5 : 4.5} fill="#123a73" />
        </svg>
        <p style={{ margin: 0, color: "#111827", fontSize: large ? 30 : 24, fontWeight: 800, lineHeight: 1 }}>{safe.toFixed(1)}%</p>
      </div>
    </article>
  );
}
