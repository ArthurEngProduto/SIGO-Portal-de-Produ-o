type MetricCardProps = {
  titulo: string;
  valor: string;
  detalhe: string;
};

export default function MetricCard({ titulo, valor, detalhe }: MetricCardProps) {
  return (
    <article
      style={{
        border: "1px solid #374151",
        borderRadius: "10px",
        padding: "14px",
        background: "#1f2937",
      }}
    >
      <h4 style={{ margin: "0 0 6px" }}>{titulo}</h4>
      <p style={{ margin: 0, fontSize: "22px", fontWeight: 700 }}>{valor}</p>
      <p style={{ margin: "6px 0 0", color: "#9ca3af", fontSize: "14px" }}>{detalhe}</p>
    </article>
  );
}