type PriorityCardProps = {
  titulo: string;
  itens: string[];
};

export default function PriorityCard({ titulo, itens }: PriorityCardProps) {
  return (
    <section style={{ marginTop: "22px", border: "1px solid #dbe2ea", borderRadius: 12, background: "#fff", boxShadow: "0 1px 3px rgba(16,24,40,.06)" }}>
      <div style={{ background: "#123a73", color: "#fff", padding: "10px 14px", borderRadius: "12px 12px 0 0", fontWeight: 700 }}>{titulo}</div>
      <ul style={{ color: "#374151", margin: 0, padding: "14px 28px" }}>
        {itens.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
