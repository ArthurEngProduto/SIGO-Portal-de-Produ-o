import { OeeContext } from "./types";

type Props = {
  values: OeeContext;
  onChange: (field: keyof OeeContext, value: string) => void;
};

const fields: Array<{ key: keyof OeeContext; label: string }> = [
  { key: "empresa", label: "Empresa / Ambiente demo" },
  { key: "unidade", label: "Unidade / Planta" },
  { key: "setor", label: "Setor" },
  { key: "linha", label: "Linha" },
  { key: "equipamento", label: "Equipamento" },
  { key: "produto", label: "Produto" },
  { key: "ordemProducao", label: "Ordem de Produção" },
  { key: "turno", label: "Turno" },
  { key: "dataColeta", label: "Data da coleta" },
];

export default function OeeContextForm({ values, onChange }: Props) {
  return (
    <section style={{ background: "#fff", border: "1px solid #dbe2ea", borderRadius: 12, boxShadow: "0 1px 3px rgba(16,24,40,.06)" }}>
      <div style={{ background: "#123a73", color: "#fff", padding: "10px 14px", borderRadius: "12px 12px 0 0", fontWeight: 700 }}>Contexto da análise</div>
      <div style={{ padding: 14, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
        {fields.map((f) => (
          <label key={f.key} style={{ display: "grid", gap: 6, fontSize: 14 }}>
            <span style={{ color: "#374151" }}>{f.label}</span>
            <input type={f.key === "dataColeta" ? "date" : "text"} value={values[f.key]} onChange={(e) => onChange(f.key, e.target.value)} style={{ background: "#fff", color: "#111827", border: "1px solid #d1d5db", borderRadius: 8, padding: "8px 10px" }} />
          </label>
        ))}
      </div>
    </section>
  );
}
