type OeeResultCardProps = {
  title: string;
  value: number;
  description: string;
};

function getStatus(value: number) {
  if (value >= 85) return { label: "Bom", color: "#16a34a" };
  if (value >= 60) return { label: "Atenção", color: "#f59e0b" };
  return { label: "Crítico", color: "#dc2626" };
}

export default function OeeResultCard({ title, value, description }: OeeResultCardProps) {
  const status = getStatus(value);
  return (
    <article style={{ background: "#fff", border: "1px solid #dbe2ea", borderRadius: 12, boxShadow: "0 1px 3px rgba(16,24,40,.06)" }}>
      <div style={{ background: "#123a73", color: "#fff", padding: "10px 14px", borderRadius: "12px 12px 0 0", display: "flex", justifyContent: "space-between" }}>
        <h3 style={{ margin: 0 }}>{title}</h3>
        <span style={{ color: status.color, fontWeight: 700, background: "#fff", borderRadius: 999, padding: "2px 10px" }}>{status.label}</span>
      </div>
      <div style={{ padding: 14 }}>
        <p style={{ margin: "0 0 6px", fontSize: 30, fontWeight: 800, color: "#111827" }}>{value.toFixed(1)}%</p>
        <p style={{ margin: 0, color: "#4b5563", fontSize: 13 }}>{description}</p>
      </div>
    </article>
  );
}
