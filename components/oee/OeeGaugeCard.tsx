type OeeGaugeCardProps = { label: string; value: number; large?: boolean };

const SEGMENT_COLORS = ["#ff4d5a", "#ff6b3a", "#ff8a1f", "#e0b400", "#a9c400", "#97c900"];

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
  const stroke = large ? 20 : 16;
  const segmentAngle = 180 / SEGMENT_COLORS.length;
  const gap = 1.5;
  const pointerAngle = 180 + safe * 1.8;
  const pointerLen = r - stroke / 2;
  const tip = polarToCartesian(cx, cy, pointerLen, pointerAngle);

  return (
    <article style={{ background: "#fff", border: "1px solid #dbe2ea", borderRadius: 12, boxShadow: "0 1px 3px rgba(16,24,40,.06)", minHeight: large ? 305 : 275 }}>
      <div style={{ background: "#123a73", color: "#fff", padding: "10px 14px", borderRadius: "12px 12px 0 0", fontWeight: 700 }}>{label}</div>
      <div style={{ padding: large ? "16px 16px 12px" : "14px 14px 10px", display: "grid", justifyItems: "center", alignContent: "start", rowGap: 10 }}>
        <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`${label} ${safe.toFixed(1)} por cento`} style={{ maxWidth: width, display: "block" }}>
          {SEGMENT_COLORS.map((color, i) => {
            const start = 180 + i * segmentAngle + gap;
            const end = 180 + (i + 1) * segmentAngle - gap;
            return <path key={color} d={describeArc(cx, cy, r, start, end)} stroke={color} strokeWidth={stroke} fill="none" strokeLinecap="round" />;
          })}

          <line x1={cx} y1={cy} x2={tip.x} y2={tip.y} stroke="#374151" strokeWidth={2.8} strokeLinecap="round" />
          <circle cx={cx} cy={cy} r={9} fill="#e5e7eb" stroke="#6b7280" strokeWidth={2.6} />
        </svg>
        <p style={{ margin: 0, color: "#111827", fontSize: large ? 30 : 24, fontWeight: 800, lineHeight: 1 }}>{safe.toFixed(1)}%</p>
      </div>
    </article>
  );
}