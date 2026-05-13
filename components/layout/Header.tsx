export default function Header() {
  return (
    <header
      style={{
        border: "1px solid #374151",
        borderRadius: "12px",
        background: "#111827",
        padding: "20px",
      }}
    >
      <h2 style={{ margin: "0 0 8px", fontSize: "24px" }}>Dashboard</h2>
      <p style={{ margin: 0, color: "#9ca3af" }}>
        Centralize ferramentas de análise, cálculo e acompanhamento da produção em um único
        ambiente multiempresa.
      </p>
    </header>
  );
}