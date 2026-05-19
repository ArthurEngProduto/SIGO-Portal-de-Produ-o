"use client";

import { useMemo, useState } from "react";
import { BarChart3, ClipboardList, Clock3, Download, FolderOpen, Package, PlusCircle, Save } from "lucide-react";
import Sidebar from "../../../components/layout/Sidebar";

type ProductionContext = {
  empresa: string;
  unidade: string;
  setor: string;
  linha: string;
  equipamento: string;
  produto: string;
  ordemProducao: string;
  turno: string;
  dataColeta: string;
};

type ProductionInputs = {
  metaProducao: number;
  quantidadeProduzida: number;
  quantidadeAprovada: number;
  quantidadeReprovada: number;
  horasTrabalhadas: number;
  numeroOperadores: number;
};

const emptyContext: ProductionContext = { empresa: "", unidade: "", setor: "", linha: "", equipamento: "", produto: "", ordemProducao: "", turno: "", dataColeta: "" };
const exampleContext: ProductionContext = { empresa: "Ambiente demo", unidade: "Planta 1", setor: "Produção", linha: "Linha A", equipamento: "Linha de Montagem 01", produto: "Produto demo", ordemProducao: "OP-20480", turno: "A", dataColeta: "2026-05-18" };
const emptyInputs: ProductionInputs = { metaProducao: 0, quantidadeProduzida: 0, quantidadeAprovada: 0, quantidadeReprovada: 0, horasTrabalhadas: 0, numeroOperadores: 0 };
const exampleInputs: ProductionInputs = { metaProducao: 1000, quantidadeProduzida: 920, quantidadeAprovada: 885, quantidadeReprovada: 35, horasTrabalhadas: 8, numeroOperadores: 6 };

const safeDiv = (a: number, b: number) => (b > 0 ? a / b : 0);

function getStatus(value: number) {
  if (value >= 85) return { label: "Bom", color: "#16a34a" };
  if (value >= 60) return { label: "Atenção", color: "#f59e0b" };
  return { label: "Crítico", color: "#dc2626" };
}

export default function IndicadoresProducaoPage() {
  const [context, setContext] = useState<ProductionContext>(exampleContext);
  const [inputs, setInputs] = useState<ProductionInputs>(exampleInputs);

  const calc = useMemo(() => {
    const atingimentoMeta = safeDiv(inputs.quantidadeProduzida, inputs.metaProducao);

    return {
      atingimentoMeta,
      produtividadeHora: safeDiv(inputs.quantidadeProduzida, inputs.horasTrabalhadas),
      produtividadeOperador: safeDiv(inputs.quantidadeProduzida, inputs.numeroOperadores),
      taxaAprovacao: safeDiv(inputs.quantidadeAprovada, inputs.quantidadeProduzida),
      taxaReprovacao: safeDiv(inputs.quantidadeReprovada, inputs.quantidadeProduzida),
      producaoLiquida: inputs.quantidadeAprovada,
      diferencaMeta: inputs.quantidadeProduzida - inputs.metaProducao,
      eficienciaProdutiva: atingimentoMeta,
    };
  }, [inputs]);

  const indicatorCards = [
    { title: "Atingimento da meta", value: calc.atingimentoMeta * 100, description: "Volume realizado em relação ao planejado.", suffix: "%" },
    { title: "Produtividade por hora", value: calc.produtividadeHora, description: "Peças produzidas por hora trabalhada.", suffix: " peças/h" },
    { title: "Produtividade por operador", value: calc.produtividadeOperador, description: "Produção média por operador no período.", suffix: " peças/operador" },
    { title: "Taxa de aprovação", value: calc.taxaAprovacao * 100, description: "Peças aprovadas sobre o total produzido.", suffix: "%" },
    { title: "Taxa de reprovação", value: calc.taxaReprovacao * 100, description: "Peças reprovadas sobre o total produzido.", suffix: "%" },
    { title: "Produção líquida", value: calc.producaoLiquida, description: "Total efetivo de peças aprovadas.", suffix: " peças" },
  ];

  return (
    <main style={{ minHeight: "100vh", background: "#f3f6fb", color: "#111827" }}>
      <div style={{ display: "grid", minHeight: "100vh" }}>
        <Sidebar ferramentasMenu={["Calculadora OEE", "Indicadores de Produção", "Produtividade", "Paradas", "Perdas e Refugos"]} />

        <section style={{ padding: 24, marginLeft: 260, display: "grid", gap: 14 }}>
          <header className="screen-only" style={{ background: "linear-gradient(135deg, #163b75 0%, #1f4f96 100%)", borderRadius: 20, padding: 36, color: "#fff", boxShadow: "0 12px 30px rgba(15, 23, 42, 0.18)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 28, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 18, flex: "1 1 360px", minWidth: 280 }}>
              <div style={{ width: 64, height: 64, borderRadius: 16, background: "rgba(255,255,255,0.16)", display: "grid", placeItems: "center", boxShadow: "inset 0 1px 0 rgba(255,255,255,.26)" }}>
                <BarChart3 size={34} />
              </div>

              <div style={{ display: "grid", gap: 10 }}>
                <h2 style={{ margin: 0, fontSize: 36, lineHeight: 1.1, fontWeight: 700 }}>Indicadores de Produção</h2>
                <p style={{ margin: 0, maxWidth: 700, color: "rgba(255,255,255,.86)", fontSize: 16, lineHeight: 1.5 }}>
                  Acompanhe volume produzido, metas, produtividade e desempenho operacional em uma visão clara e integrada.
                </p>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 160px)", gap: 10, justifyContent: "flex-end", flex: "1 1 340px" }}>
              {[
                { t: "Novo registro", onClick: () => { setContext(emptyContext); setInputs(emptyInputs); }, Icon: PlusCircle, primary: true },
                { t: "Carregar exemplo", onClick: () => { setContext(exampleContext); setInputs(exampleInputs); }, Icon: FolderOpen },
                { t: "Exportar PDF", onClick: () => window.alert("Exportação PDF será habilitada em breve."), Icon: Download },
                { t: "Salvar análise", onClick: () => window.alert("Análise salva localmente (demo)."), Icon: Save },
              ].map((b) => (
                <button key={b.t} onClick={b.onClick} style={{ background: b.primary ? "#ffffff" : "transparent", color: b.primary ? "#123a73" : "#ffffff", border: b.primary ? "1px solid #ffffff" : "1px solid rgba(255,255,255,.5)", borderRadius: 12, width: "160px", height: 44, padding: "0 12px", fontWeight: 600, display: "inline-flex", justifyContent: "center", alignItems: "center", whiteSpace: "nowrap", gap: 8, transition: "all .2s ease", cursor: "pointer" }}>
                  <b.Icon size={18} />
                  {b.t}
                </button>
              ))}
            </div>
          </header>

          <section style={{ background: "#fff", border: "1px solid #dbe2ea", borderRadius: 12, boxShadow: "0 1px 3px rgba(16,24,40,.06)" }}>
            <div style={{ background: "#123a73", color: "#fff", padding: "10px 14px", borderRadius: "12px 12px 0 0", fontWeight: 700 }}>Contexto da análise</div>
            <div style={{ padding: 14, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
              {Object.entries({ "Empresa / Ambiente": "empresa", "Unidade / Planta": "unidade", Setor: "setor", Linha: "linha", Equipamento: "equipamento", Produto: "produto", "Ordem de Produção": "ordemProducao", Turno: "turno", "Data da coleta": "dataColeta" } as const).map(([label, key]) => (
                <label key={key} style={{ display: "grid", gap: 6, fontSize: 14 }}>
                  <span style={{ color: "#374151" }}>{label}</span>
                  <input value={context[key]} onChange={(e) => setContext((p) => ({ ...p, [key]: e.target.value }))} style={{ background: "#fff", color: "#111827", border: "1px solid #d1d5db", borderRadius: 8, padding: "8px 10px" }} />
                </label>
              ))}
            </div>
          </section>

          <section style={{ background: "#fff", border: "1px solid #dbe2ea", borderRadius: 12, boxShadow: "0 1px 3px rgba(16,24,40,.06)" }}>
            <div style={{ background: "#123a73", color: "#fff", padding: "10px 14px", borderRadius: "12px 12px 0 0", fontWeight: 700 }}>Entradas de produção</div>
            <div style={{ padding: 14, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
              {Object.entries({ "Meta de produção": "metaProducao", "Quantidade produzida": "quantidadeProduzida", "Quantidade aprovada": "quantidadeAprovada", "Quantidade reprovada": "quantidadeReprovada", "Horas trabalhadas": "horasTrabalhadas", "Número de operadores": "numeroOperadores" } as const).map(([label, key]) => (
                <label key={key} style={{ display: "grid", gap: 6, fontSize: 14 }}>
                  <span style={{ color: "#374151" }}>{label}</span>
                  <input type="number" min={0} value={inputs[key]} onChange={(e) => setInputs((p) => ({ ...p, [key]: Math.max(0, Number(e.target.value || 0)) }))} style={{ background: "#fff", color: "#111827", border: "1px solid #d1d5db", borderRadius: 8, padding: "8px 10px" }} />
                </label>
              ))}
            </div>
          </section>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
            {indicatorCards.map((card) => {
              const status = getStatus(card.title === "Produção líquida" ? (inputs.metaProducao > 0 ? (card.value / inputs.metaProducao) * 100 : 0) : card.value);
              return (
                <article key={card.title} style={{ background: "#fff", border: "1px solid #dbe2ea", borderRadius: 12, boxShadow: "0 1px 3px rgba(16,24,40,.06)" }}>
                  <div style={{ background: "#123a73", color: "#fff", padding: "10px 14px", borderRadius: "12px 12px 0 0", display: "flex", justifyContent: "space-between" }}>
                    <h3 style={{ margin: 0 }}>{card.title}</h3>
                    <span style={{ color: status.color, fontWeight: 700, background: "#fff", borderRadius: 999, padding: "2px 10px", display: "inline-flex", alignItems: "center" }}>{status.label}</span>
                  </div>
                  <div
                    style={{
                      padding: card.title === "Produtividade por operador" ? "16px 14px" : 14,
                      minHeight: card.title === "Produtividade por operador" ? 92 : undefined,
                      display: card.title === "Produtividade por operador" ? "flex" : "block",
                      flexDirection: card.title === "Produtividade por operador" ? "column" : undefined,
                      justifyContent: card.title === "Produtividade por operador" ? "center" : undefined,
                    }}
                  >
                    <p
                      style={{
                        margin: "0 0 6px",
                        fontSize: card.title === "Produtividade por operador" ? 18 : 24,
                        lineHeight: card.title === "Produtividade por operador" ? 1.3 : 1.2,  
                        fontWeight: 800,
                        color: "#111827",
                        whiteSpace: card.title === "Produtividade por operador" ? "normal" : "nowrap",
                      }}
                    >
                      {card.value.toFixed(1)}
                      {card.suffix}
                    </p>
                    <p style={{ margin: 0, color: "#4b5563", fontSize: 13 }}>{card.description}</p>
                  </div>
                </article>
              );
            })}
          </div>

          <section style={{ background: "#fff", border: "1px solid #dbe2ea", borderRadius: 12, boxShadow: "0 1px 3px rgba(16,24,40,.06)" }}>
            <div style={{ background: "#123a73", color: "#fff", padding: "10px 14px", borderRadius: "12px 12px 0 0", fontWeight: 700 }}>Resumo operacional</div>
            <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 8, color: "#1f2937" }}>
              {[["Meta planejada", `${inputs.metaProducao} peças`], ["Produção realizada", `${inputs.quantidadeProduzida} peças`], ["Diferença para meta", `${calc.diferencaMeta} peças`], ["Produção aprovada", `${inputs.quantidadeAprovada} peças`], ["Produção reprovada", `${inputs.quantidadeReprovada} peças`], ["Eficiência produtiva", `${(calc.eficienciaProdutiva * 100).toFixed(1)}%`]].map(([label, value]) => (
                <p key={label} style={{ margin: 0 }}>{label}: <strong>{value}</strong></p>
              ))}
            </div>
          </section>

          <section style={{ background: "#fff", border: "1px solid #dbe2ea", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 3px rgba(16,24,40,.06)" }}>
            <div style={{ background: "#123a73", color: "#fff", padding: "10px 14px", borderRadius: "12px 12px 0 0", fontWeight: 700 }}>Detalhamento</div>
            <div style={{ padding: 14, display: "grid", gap: 12 }}>
              <article style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: 12, background: "#fff" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 12 }}>
                  {[
                    { title: "Contexto da produção", Icon: ClipboardList, rows: [["Data", context.dataColeta || "-"], ["Equipamento", context.equipamento || "-"], ["Produto", context.produto || "-"], ["OP", context.ordemProducao || "-"], ["Turno", context.turno || "-"]] },
                    { title: "Tempos e capacidade", Icon: Clock3, rows: [["Horas trabalhadas", `${inputs.horasTrabalhadas} h`], ["Nº operadores", `${inputs.numeroOperadores}`], ["Meta", `${inputs.metaProducao} peças`], ["Produzido", `${inputs.quantidadeProduzida} peças`]] },
                    { title: "Produção e qualidade", Icon: Package, rows: [["Aprovada", `${inputs.quantidadeAprovada} peças`], ["Reprovada", `${inputs.quantidadeReprovada} peças`], ["Produção líquida", `${calc.producaoLiquida} peças`]] },
                    { title: "Indicadores", Icon: BarChart3, rows: [["Atingimento", `${(calc.atingimentoMeta * 100).toFixed(1)}%`], ["Produtividade/h", `${calc.produtividadeHora.toFixed(1)} peças/h`], ["Produtividade/op", `${calc.produtividadeOperador.toFixed(1)} peças/op`], ["Eficiência", `${(calc.eficienciaProdutiva * 100).toFixed(1)}%`]] },
                  ].map((group) => (
                    <section key={group.title} style={{ border: "1px solid #eef2f7", borderRadius: 8, padding: 10, background: "#f8fafc" }}>
                      <h4 style={{ margin: "0 0 10px", fontSize: 13, color: "#123a73", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, textAlign: "center" }}><group.Icon size={16} color="#123a73" /><span>{group.title}</span></h4>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
                        {group.rows.map(([label, value]) => (
                          <li key={label} style={{ display: "flex", justifyContent: "space-between", gap: 10, fontSize: 13, color: "#111827" }}><span style={{ color: "#4b5563" }}>{label}</span><strong style={{ fontWeight: 600 }}>{value}</strong></li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
              </article>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}