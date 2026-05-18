import { OeeHistoryRow } from "./types";

type Props = { rows: OeeHistoryRow[] };
type DetailItem = {
  label: string;
  value: string;
  highlight?: boolean;
};
type DetailGroup = {
  title: string;
  items: (r: OeeHistoryRow) => DetailItem[];
};

const pct = (v: number) => `${v.toFixed(1)}%`;

export default function OeeDetailTable({ rows }: Props) {
  const groups: DetailGroup[] = [
    {
      title: "Contexto da produção",
      items: (r: OeeHistoryRow) => [
        { label: "Data", value: r.data },
        { label: "Equipamento", value: r.equipamento },
        { label: "Produto", value: r.produto },
        { label: "OP", value: r.ordem },
        { label: "Turno", value: r.turno },
      ],
    },
    {
      title: "Tempos e paradas",
      items: (r: OeeHistoryRow) => [
        { label: "Tempo planejado", value: `${r.tempoPlanejado} min` },
        { label: "Tempo operando", value: `${r.tempoOperando} min` },
        { label: "Parada planejada", value: `${r.paradaPlanejada} min` },
        { label: "Parada não planejada", value: `${r.paradaNaoPlanejada} min` },
      ],
    },
    {
      title: "Produção e qualidade",
      items: (r: OeeHistoryRow) => [
        { label: "Produção total", value: `${r.producaoTotal} peças` },
        { label: "Produção boa", value: `${r.producaoBoa} peças` },
        { label: "Refugo", value: `${r.refugo} peças` },
      ],
    },
    {
      title: "Indicadores",
      items: (r: OeeHistoryRow) => [
        { label: "Disponibilidade", value: pct(r.disponibilidade) },
        { label: "Performance", value: pct(r.performance) },
        { label: "Qualidade", value: pct(r.qualidade) },
        { label: "OEE", value: pct(r.oee), highlight: true },
      ],
    },
  ];

  return (
    <section style={{ background: "#fff", border: "1px solid #dbe2ea", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 3px rgba(16,24,40,.06)" }}>
      <div style={{ background: "#123a73", color: "#fff", padding: "10px 14px", borderRadius: "12px 12px 0 0", fontWeight: 700 }}>Detalhamento</div>
      <div style={{ padding: 14, display: "grid", gap: 12 }}>
        {rows.map((r) => (
          <article
            key={`${r.data}-${r.ordem}`}
            style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: 12, background: "#fff" }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 12 }}>
              {groups.map((group) => (
                <section key={group.title} style={{ border: "1px solid #eef2f7", borderRadius: 8, padding: 10, background: "#f8fafc" }}>
                  <h4 style={{ margin: "0 0 10px", fontSize: 13, color: "#123a73" }}>{group.title}</h4>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
                    {group.items(r).map((item) => (
                      <li key={item.label} style={{ display: "flex", justifyContent: "space-between", gap: 10, fontSize: 13, color: "#111827" }}>
                        <span style={{ color: "#4b5563" }}>{item.label}</span>
                        <strong style={{ fontWeight: item.highlight ? 700 : 600 }}>{item.value}</strong>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
