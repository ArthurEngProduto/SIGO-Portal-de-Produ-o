import Link from "next/link";

type SidebarProps = {
  ferramentasMenu: string[];
};

export default function Sidebar({ ferramentasMenu }: SidebarProps) {
  return (
    <aside
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        width: 260,
        borderRight: "1px solid #c8d4e6",
        background: "#123a73",
        padding: "24px",
        color: "#ffffff",
        overflowY: "auto",
      }}
    >
      <nav>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: 1.9 }}>
          <li><Link href="/" style={{ color: "inherit", textDecoration: "none" }}>Dashboard</Link></li>
          <li style={{ color: "#dbeafe", marginTop: 6 }}>Ferramentas</li>
          {ferramentasMenu.map((item) => {
            const active = item === "Calculadora OEE";
            return (
              <li key={item} style={{ paddingLeft: "8px", color: "#eff6ff" }}>
                {active ? (
                  <Link href="/ferramentas/oee" style={{ color: "inherit", textDecoration: "none", fontWeight: 700, display: "block", background: "rgba(255,255,255,0.2)", borderRadius: 8, padding: "2px 8px" }}>
                    {item}
                  </Link>
                ) : (
                  <span style={{ opacity: 0.95 }}>{item}</span>
                )}
              </li>
            );
          })}
          <li style={{ marginTop: 10 }}>Empresas</li>
          <li>Usuários</li>
          <li>Configurações</li>
        </ul>
      </nav>
    </aside>
  );
}
