type MetricCardProps = {
  titulo: string;
  valor: string;
  detalhe: string;
};

export default function MetricCard({ titulo, valor, detalhe }: MetricCardProps) {
  return (
    <article style={{ border: "1px solid #dbe2ea", borderRadius: 12, background: "#fff", boxShadow: "0 1px 3px rgba(16,24,40,.06)" }}>
      <div style={{ background: "#123a73", color: "#fff", padding: "10px 14px", borderRadius: "12px 12px 0 0", fontWeight: 700 }}>{titulo}</div>
      <div style={{ padding: "14px" }}>
        <p style={{ margin: 0, fontSize: "24px", fontWeight: 700, color: "#111827" }}>{valor}</p>
        <p style={{ margin: "6px 0 0", color: "#4b5563", fontSize: "14px" }}>{detalhe}</p>
      </div>
    </article>
  );
}
