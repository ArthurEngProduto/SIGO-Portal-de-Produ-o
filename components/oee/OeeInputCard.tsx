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
    <section style={{ background: "#111827", border: "1px solid #374151", borderRadius: 12, padding: 16 }}>
      <h3 style={{ marginTop: 0 }}>Entradas para cálculo</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
        {fields.map((field) => (
          <label key={field.key} style={{ display: "grid", gap: 6, fontSize: 14 }}>
            <span style={{ color: "#9ca3af" }}>{field.label}</span>
            <input
              type="number"
              value={values[field.key]}
              onChange={(e) => onChange(field.key, Number(e.target.value))}
              style={{ background: "#1f2937", color: "#e5e7eb", border: "1px solid #374151", borderRadius: 8, padding: "8px 10px" }}
            />
          </label>
        ))}
      </div>
    </section>
  );
}