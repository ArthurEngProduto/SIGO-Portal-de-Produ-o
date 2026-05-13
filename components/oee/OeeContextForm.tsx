export default function OeeContextForm() {
  const campos = [
    "Empresa / Ambiente demo",
    "Unidade / Planta",
    "Setor",
    "Linha",
    "Equipamento",
    "Produto",
    "Ordem de Produção",
    "Turno",
    "Data da coleta",
  ];
  return (
    <section style={{ background: "#111827", border: "1px solid #374151", borderRadius: 12, padding: 16 }}>
      <h3 style={{ marginTop: 0 }}>Contexto da análise</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
        {campos.map((c) => (
          <label key={c} style={{ display: "grid", gap: 6, fontSize: 14 }}>
            <span style={{ color: "#9ca3af" }}>{c}</span>
            <input defaultValue={c === "Empresa / Ambiente demo" ? "Ambiente demo" : ""} style={{ background: "#1f2937", color: "#e5e7eb", border: "1px solid #374151", borderRadius: 8, padding: "8px 10px" }} />
          </label>
        ))}
      </div>
    </section>
  );
}