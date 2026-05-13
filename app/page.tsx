import MetricCard from "../components/dashboard/MetricCard";
import PriorityCard from "../components/dashboard/PriorityCard";
import ToolCard from "../components/dashboard/ToolCard";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";

const ferramentas = [
  {
    nome: "Calculadora OEE",
    descricao: "Disponibilidade, performance e qualidade em um único cálculo.",
  },
  {
    nome: "Indicadores de Produção",
    descricao: "KPIs industriais para acompanhamento diário e tomada de decisão.",
  },
  {
    nome: "Produtividade",
    descricao: "Comparativo de meta x realizado por setor, linha e turno.",
  },
  {
    nome: "Paradas",
    descricao: "Registro e análise de paradas planejadas e não planejadas.",
  },
  {
    nome: "Perdas e Refugos",
    descricao: "Monitoramento de perdas no processo e índice de refugo.",
  },
  {
    nome: "Apontamentos",
    descricao: "Lançamentos operacionais de produção com dados demonstrativos.",
  },
];

const metricas = [
  { titulo: "OEE médio", valor: "83%", detalhe: "Base demonstrativa" },
  { titulo: "Produtividade", valor: "91%", detalhe: "Meta x realizado" },
  { titulo: "Paradas críticas", valor: "4", detalhe: "Últimas 24 horas" },
];

const proximosModulos = [
  "Dashboards industriais avançados",
  "Gestão de setores, máquinas e operadores",
  "Configuração de módulos por empresa (tenant)",
];

export default function HomePage() {
  return (
    <main style={{ minHeight: "100vh", background: "#0f172a", color: "#e5e7eb" }}>
      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", minHeight: "100vh" }}>
        <Sidebar
          ferramentasMenu={[
            "Calculadora OEE",
            "Indicadores de Produção",
            "Produtividade",
            "Paradas",
            "Perdas e Refugos",
          ]}
        />

        <section style={{ padding: "24px" }}>
          <Header />

          <h3 style={{ marginTop: "22px" }}>Resumo Operacional Demonstrativo</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "12px",
            }}
          >
            {metricas.map((item) => (
              <MetricCard
                key={item.titulo}
                titulo={item.titulo}
                valor={item.valor}
                detalhe={item.detalhe}
              />
            ))}
          </div>

          <h3 style={{ marginTop: "22px" }}>Área de Ferramentas</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "12px",
            }}
          >
            {ferramentas.map((item) => (
              <ToolCard key={item.nome} nome={item.nome} descricao={item.descricao} />
            ))}
          </div>

          <PriorityCard titulo="Próximos módulos" itens={proximosModulos} />
        </section>
      </div>
    </main>
  );
}