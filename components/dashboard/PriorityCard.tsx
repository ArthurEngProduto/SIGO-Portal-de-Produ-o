type PriorityCardProps = {
  titulo: string;
  itens: string[];
};

export default function PriorityCard({ titulo, itens }: PriorityCardProps) {
  return (
    <section>
      <h3 style={{ marginTop: "22px" }}>{titulo}</h3>
      <ul style={{ color: "#9ca3af" }}>
        {itens.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
