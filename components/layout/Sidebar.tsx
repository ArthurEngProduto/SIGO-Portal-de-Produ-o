import Link from "next/link";

type SidebarProps = {
  ferramentasMenu: string[];
};

export default function Sidebar({ ferramentasMenu }: SidebarProps) {
  const ferramentaItemStyle = {
    display: "block",
    color: "inherit",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: 500,
    lineHeight: "20px",
    padding: "6px 8px",
    borderRadius: 8,
  } as const;

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
                  <Link
                    href="/ferramentas/oee"
                    style={{ ...ferramentaItemStyle, opacity: 0.95 }}
                  >
                    {item}
                  </Link>
                ) : (
                  <span style={{ ...ferramentaItemStyle, opacity: 0.95 }}>{item}</span>
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
