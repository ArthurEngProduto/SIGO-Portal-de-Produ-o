export default function Header() {
  return (
    <header style={{ background: "#fff", border: "1px solid #dbe2ea", borderRadius: 12, boxShadow: "0 1px 3px rgba(16,24,40,.06)" }}>
      <div style={{ background: "#0b5ed7", color: "#fff", padding: "12px 16px", borderRadius: "12px 12px 0 0" }}>
        <h2 style={{ margin: 0, fontSize: "22px" }}>Dashboard</h2>
      </div>
      <div style={{ padding: "14px 16px" }}>
        <p style={{ margin: 0, color: "#374151" }}>
          Centralize ferramentas de análise, cálculo e acompanhamento da produção em um único
          ambiente multiempresa.
        </p>
      </div>
    </header>
  );
}
