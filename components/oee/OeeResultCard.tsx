type OeeResultCardProps = {
  title: string;
  value: number;
  description: string;
};

function getStatus(value: number) {
  if (value >= 85) return { label: "Bom", color: "#22c55e" };
  if (value >= 60) return { label: "Atenção", color: "#f59e0b" };
  return { label: "Crítico", color: "#ef4444" };
}

export default function OeeResultCard({ title, value, description }: OeeResultCardProps) {
  const status = getStatus(value);
  return (
    <article style={{ background: "#111827", border: "1px solid #374151", borderRadius: 12, padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ margin: 0 }}>{title}</h3>
        <span style={{ color: status.color, fontWeight: 700 }}>{status.label}</span>
      </div>
      <p style={{ margin: "10px 0 6px", fontSize: 30, fontWeight: 800 }}>{value.toFixed(1)}%</p>
      <p style={{ margin: 0, color: "#9ca3af", fontSize: 13 }}>{description}</p>
    </article>
  );
}
