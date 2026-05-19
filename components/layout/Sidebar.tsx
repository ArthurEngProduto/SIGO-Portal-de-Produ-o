"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
type SidebarProps = {
  ferramentasMenu: string[];
};

export default function Sidebar({ ferramentasMenu }: SidebarProps) {
  const pathname = usePathname();
  const [isFerramentasOpen, setIsFerramentasOpen] = useState(() =>
    pathname.startsWith("/ferramentas")
  );

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
          <li>
            <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
              Dashboard
            </Link>
          </li>
          <li style={{ marginTop: 6 }}>
            <button
              type="button"
              onClick={() => setIsFerramentasOpen((open) => !open)}
              style={{
                color: "#dbeafe",
                background: "transparent",
                border: "none",
                padding: 0,
                margin: 0,
                font: "inherit",
                cursor: "pointer",
              }}
              aria-expanded={isFerramentasOpen}
              aria-controls="ferramentas-submenu"
            >
              Ferramentas
            </button>
          </li>
          {isFerramentasOpen && (
            <li>
              <ul
              id="ferramentas-submenu"
              style={{ listStyle: "none", padding: 0, margin: 0 }}
            >
              {ferramentasMenu.map((item) => {
                const itemHref =
                  item === "Calculadora OEE"
                    ? "/ferramentas/oee"
                    : item === "Indicadores de Produção"
                      ? "/ferramentas/indicadores-producao"
                      : item === "Produtividade"
                        ? "/ferramentas/produtividade"
                        : item === "Paradas"
                          ? "/ferramentas/paradas"
                          : item === "Perdas e Refugos"
                            ? "/ferramentas/perdas-refugos"
                            : null;
                return (
                  <li key={item} style={{ paddingLeft: "8px", color: "#eff6ff" }}>
                    {itemHref ? (
                      <Link href={itemHref} style={{ ...ferramentaItemStyle, opacity: 0.95 }}>
                        {item}
                      </Link>
                    ) : (
                      <span style={{ ...ferramentaItemStyle, opacity: 0.95 }}>{item}</span>
                    )}
                  </li>
                );
              })}
            </ul>
            </li>
          )}
          <li style={{ marginTop: 10 }}>Empresas</li>
          <li>Usuários</li>
          <li>Configurações</li>
        </ul>
      </nav>
    </aside>
  );
}
