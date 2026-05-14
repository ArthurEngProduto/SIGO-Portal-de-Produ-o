import Link from "next/link";

type ToolCardProps = {
  nome: string;
  descricao: string;
  href?: string;
};

export default function ToolCard({ nome, descricao, href }: ToolCardProps) {
  const content = (
    <article style={{ border: "1px solid #dbe2ea", borderRadius: 12, background: "#fff", boxShadow: "0 1px 3px rgba(16,24,40,.06)", height: "100%" }}>
      <div style={{ background: "#0b5ed7", color: "#fff", padding: "10px 14px", borderRadius: "12px 12px 0 0", fontWeight: 700 }}>{nome}</div>
      <div style={{ padding: 14 }}>
        <p style={{ margin: 0, color: "#374151", fontSize: "14px" }}>{descricao}</p>
      </div>
    </article>
  );

  if (!href) return content;
  return <Link href={href} style={{ textDecoration: "none", color: "inherit" }}>{content}</Link>;
}
