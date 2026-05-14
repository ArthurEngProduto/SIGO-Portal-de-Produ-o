import { OeeInputs } from "./types";

type Props = {
  values: OeeInputs;
  onChange: (field: keyof OeeInputs, value: number) => void;
};

const fields: Array<{ key: keyof OeeInputs; label: string }> = [
  { key: "tempoTotal", label: "Tempo total disponível (min)" },
  { key: "paradaPlanejada", label: "Parada planejada (min)" },
  { key: "paradaNaoPlanejada", label: "Parada não planejada (min)" },
  { key: "quantidadeProduzida", label: "Quantidade produzida" },
  { key: "quantidadeBoa", label: "Quantidade boa" },
  { key: "tempoCicloIdeal", label: "Tempo de ciclo ideal (s/peça)" },
];

export default function OeeInputCard({ values, onChange }: Props) {
  return (
    <section style={{ background: "#fff", border: "1px solid #dbe2ea", borderRadius: 12, boxShadow: "0 1px 3px rgba(16,24,40,.06)" }}>
      <div style={{ background: "#123a73", color: "#fff", padding: "10px 14px", borderRadius: "12px 12px 0 0", fontWeight: 700 }}>Entradas para cálculo</div>
      <div style={{ padding: 14, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
        {fields.map((field) => (
          <label key={field.key} style={{ display: "grid", gap: 6, fontSize: 14 }}>
            <span style={{ color: "#374151" }}>{field.label}</span>
            <input type="number" value={values[field.key]} onChange={(e) => onChange(field.key, Number(e.target.value))} style={{ background: "#fff", color: "#111827", border: "1px solid #d1d5db", borderRadius: 8, padding: "8px 10px" }} />
          </label>
        ))}
      </div>
    </section>
  );
}
