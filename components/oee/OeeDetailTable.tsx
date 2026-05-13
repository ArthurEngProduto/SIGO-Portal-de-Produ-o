import { OeeHistoryRow } from "./types";

type Props = { rows: OeeHistoryRow[] };

const pct = (v: number) => `${v.toFixed(1)}%`;

export default function OeeDetailTable({ rows }: Props) {
  return (
    <section style={{ background: "#111827", border: "1px solid #374151", borderRadius: 12, padding: 16, overflowX: "auto" }}>
      <h3 style={{ marginTop: 0 }}>Detalhamento</h3>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ color: "#9ca3af", textAlign: "left" }}>
            {[
              "Data","Equipamento","Produto","OP","Turno","Planejado","Operando","P. planejada","P. não planejada","Prod. total","Prod. boa","Refugo","Disp.","Perf.","Qual.","OEE"
            ].map((h) => <th key={h} style={{ borderBottom: "1px solid #374151", padding: "8px" }}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={`${r.data}-${r.ordem}`}>
              <td style={{ padding: 8 }}>{r.data}</td><td style={{ padding: 8 }}>{r.equipamento}</td><td style={{ padding: 8 }}>{r.produto}</td><td style={{ padding: 8 }}>{r.ordem}</td><td style={{ padding: 8 }}>{r.turno}</td><td style={{ padding: 8 }}>{r.tempoPlanejado}</td><td style={{ padding: 8 }}>{r.tempoOperando}</td><td style={{ padding: 8 }}>{r.paradaPlanejada}</td><td style={{ padding: 8 }}>{r.paradaNaoPlanejada}</td><td style={{ padding: 8 }}>{r.producaoTotal}</td><td style={{ padding: 8 }}>{r.producaoBoa}</td><td style={{ padding: 8 }}>{r.refugo}</td><td style={{ padding: 8 }}>{pct(r.disponibilidade)}</td><td style={{ padding: 8 }}>{pct(r.performance)}</td><td style={{ padding: 8 }}>{pct(r.qualidade)}</td><td style={{ padding: 8, fontWeight: 700 }}>{pct(r.oee)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
