import Link from "next/link";

type ToolCardProps = {
  nome: string;
  descricao: string;
  href?: string;
};

export default function ToolCard({ nome, descricao, href }: ToolCardProps) {
  const content = (
    <article
      style={{
        border: "1px solid #374151",
        borderRadius: "10px",
        padding: "14px",
        background: "#1f2937",
      }}
    >
      <h4 style={{ margin: "0 0 8px" }}>{nome}</h4>
      <p style={{ margin: 0, color: "#9ca3af", fontSize: "14px" }}>{descricao}</p>
    </article>
  );

  if (!href) return content;

  return (
    <Link href={href} style={{ textDecoration: "none", color: "inherit" }}>
      {content}
    </Link>
  );
}
