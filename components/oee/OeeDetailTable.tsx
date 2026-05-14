import { OeeHistoryRow } from "./types";

type Props = { rows: OeeHistoryRow[] };

const pct = (v: number) => `${v.toFixed(1)}%`;

export default function OeeDetailTable({ rows }: Props) {
  return (
    <section style={{ background: "#fff", border: "1px solid #dbe2ea", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 3px rgba(16,24,40,.06)" }}>
      <div style={{ background: "#123a73", color: "#fff", padding: "10px 14px", borderRadius: "12px 12px 0 0", fontWeight: 700 }}>Detalhamento</div>
      <div style={{ padding: 14, overflowX: "auto" }}><table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, color: "#111827" }}>
        <thead>
          <tr style={{ color: "#4b5563", textAlign: "left", background: "#f9fafb" }}>
            {[
              "Data","Equipamento","Produto","OP","Turno","Planejado","Operando","P. planejada","P. não planejada","Prod. total","Prod. boa","Refugo","Disp.","Perf.","Qual.","OEE"
            ].map((h) => <th key={h} style={{ borderBottom: "1px solid #e5e7eb", padding: "8px" }}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={`${r.data}-${r.ordem}`}>
              <td style={{ padding: 8, borderBottom: "1px solid #f3f4f6" }}>{r.data}</td><td style={{ padding: 8, borderBottom: "1px solid #f3f4f6" }}>{r.equipamento}</td><td style={{ padding: 8, borderBottom: "1px solid #f3f4f6" }}>{r.produto}</td><td style={{ padding: 8, borderBottom: "1px solid #f3f4f6" }}>{r.ordem}</td><td style={{ padding: 8, borderBottom: "1px solid #f3f4f6" }}>{r.turno}</td><td style={{ padding: 8, borderBottom: "1px solid #f3f4f6" }}>{r.tempoPlanejado}</td><td style={{ padding: 8, borderBottom: "1px solid #f3f4f6" }}>{r.tempoOperando}</td><td style={{ padding: 8, borderBottom: "1px solid #f3f4f6" }}>{r.paradaPlanejada}</td><td style={{ padding: 8, borderBottom: "1px solid #f3f4f6" }}>{r.paradaNaoPlanejada}</td><td style={{ padding: 8, borderBottom: "1px solid #f3f4f6" }}>{r.producaoTotal}</td><td style={{ padding: 8, borderBottom: "1px solid #f3f4f6" }}>{r.producaoBoa}</td><td style={{ padding: 8, borderBottom: "1px solid #f3f4f6" }}>{r.refugo}</td><td style={{ padding: 8, borderBottom: "1px solid #f3f4f6" }}>{pct(r.disponibilidade)}</td><td style={{ padding: 8, borderBottom: "1px solid #f3f4f6" }}>{pct(r.performance)}</td><td style={{ padding: 8, borderBottom: "1px solid #f3f4f6" }}>{pct(r.qualidade)}</td><td style={{ padding: 8, fontWeight: 700, borderBottom: "1px solid #f3f4f6" }}>{pct(r.oee)}</td>
            </tr>
          ))}
        </tbody>
      </table></div>
    </section>
  );
}
