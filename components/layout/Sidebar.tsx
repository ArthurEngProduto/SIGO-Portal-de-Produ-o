import Link from "next/link";

type SidebarProps = {
  ferramentasMenu: string[];
};

export default function Sidebar({ ferramentasMenu }: SidebarProps) {
  return (
    <aside
      style={{
        borderRight: "1px solid #374151",
        background: "#111827",
        padding: "24px",
      }}
    >
      <h1 style={{ margin: 0, fontSize: "22px" }}>Plataforma SaaS Industrial</h1>
      <p style={{ color: "#9ca3af", marginTop: "8px" }}>
        Hub de ferramentas para produção, produtividade e gestão operacional.
      </p>
      <div
        style={{
          margin: "20px 0",
          border: "1px solid #374151",
          borderRadius: "8px",
          padding: "10px 12px",
          background: "#0b1220",
          fontWeight: 600,
        }}
      >
        Ambiente demo
      </div>
      <nav>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: 1.9 }}>
          <li><Link href="/" style={{ color: "inherit", textDecoration: "none" }}>Dashboard</Link></li>
          <li>Ferramentas</li>
          {ferramentasMenu.map((item) => (
            <li key={item} style={{ paddingLeft: "14px", color: "#9ca3af" }}>
              {item === "Calculadora OEE" ? (
                <Link href="/ferramentas/oee" style={{ color: "inherit", textDecoration: "none" }}>
                  • {item}
                </Link>
              ) : (
                <>• {item}</>
              )}
            </li>
          ))}
          <li>Empresas</li>
          <li>Usuários</li>
          <li>Configurações</li>
        </ul>
      </nav>
    </aside>
  );
}