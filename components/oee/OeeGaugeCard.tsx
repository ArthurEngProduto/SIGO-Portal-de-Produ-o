type OeeGaugeCardProps = { label: string; value: number; large?: boolean };

export default function OeeGaugeCard({ label, value, large }: OeeGaugeCardProps) {
  const safe = Math.max(0, Math.min(100, value));
  return (
    <article style={{ background: "#111827", border: "1px solid #374151", borderRadius: 12, padding: 16 }}>
      <p style={{ margin: 0, fontWeight: 700 }}>{label}</p>
      <div style={{ marginTop: 10, background: "#1f2937", height: large ? 16 : 10, borderRadius: 999 }}>
        <div style={{ width: `${safe}%`, height: "100%", borderRadius: 999, background: "#22c55e" }} />
      </div>
      <p style={{ margin: "8px 0 0", color: "#9ca3af" }}>{value.toFixed(1)}%</p>
    </article>
  );
}
