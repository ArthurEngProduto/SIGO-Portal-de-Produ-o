"use client";

import { useMemo, useState } from "react";
import { BarChart3, Download, FolderOpen, PlusCircle, Save } from "lucide-react";
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

const emptyContext: ProductionContext = {
  empresa: "",
  unidade: "",
  setor: "",
  linha: "",
  equipamento: "",
  produto: "",
  ordemProducao: "",
  turno: "",
  dataColeta: "",
};

const exampleContext: ProductionContext = {
  empresa: "Ambiente demo",
  unidade: "Planta 1",
  setor: "Produção",
  linha: "Linha A",
  equipamento: "Linha de Montagem 01",
  produto: "Produto demo",
  ordemProducao: "OP-20480",
  turno: "A",
  dataColeta: "2026-05-18",
};

const emptyInputs: ProductionInputs = {
  metaProducao: 0,
  quantidadeProduzida: 0,
  quantidadeAprovada: 0,
  quantidadeReprovada: 0,
  horasTrabalhadas: 0,
  numeroOperadores: 0,
};

const exampleInputs: ProductionInputs = {
  metaProducao: 1000,
  quantidadeProduzida: 920,
  quantidadeAprovada: 885,
  quantidadeReprovada: 35,
  horasTrabalhadas: 8,
  numeroOperadores: 6,
};

const safeDiv = (a: number, b: number) => (b > 0 ? a / b : 0);

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

  return (
    <main style={{ minHeight: "100vh", background: "#f3f6fb", color: "#111827" }}>
      <div style={{ display: "grid", minHeight: "100vh" }}>
        <Sidebar ferramentasMenu={["Calculadora OEE", "Indicadores de Produção", "Produtividade", "Paradas", "Perdas e Refugos"]} />

        <section style={{ padding: 24, marginLeft: 260, display: "grid", gap: 14 }}>
          <header style={{ background: "linear-gradient(135deg, #163b75 0%, #1f4f96 100%)", borderRadius: 20, padding: 36, color: "#fff", boxShadow: "0 12px 30px rgba(15, 23, 42, 0.18)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 28, flexWrap: "wrap" }}>
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
                <button key={b.t} onClick={b.onClick} style={{ background: b.primary ? "#ffffff" : "transparent", color: b.primary ? "#123a73" : "#ffffff", border: b.primary ? "1px solid #ffffff" : "1px solid rgba(255,255,255,.5)", borderRadius: 12, width: "160px", height: 44, padding: "0 12px", fontWeight: 600, display: "inline-flex", justifyContent: "center", alignItems: "center", whiteSpace: "nowrap", gap: 8, cursor: "pointer" }}>
                  <b.Icon size={18} />
                  {b.t}
                </button>
              ))}
            </div>
          </header>

          <section style={{ background: "#fff", border: "1px solid #dbe2ea", borderRadius: 12, boxShadow: "0 1px 3px rgba(16,24,40,.06)" }}>
            <div style={{ background: "#123a73", color: "#fff", padding: "10px 14px", borderRadius: "12px 12px 0 0", fontWeight: 700 }}>Contexto da análise</div>
            <div style={{ padding: 14, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
              {Object.entries({ "Empresa / Ambiente": "empresa", "Unidade / Planta": "unidade", Setor: "setor", Linha: "linha", Equipamento: "equipamento", Produto: "produto", "Ordem de Produção": "ordemProducao", Turno: "turno", "Data da coleta": "dataColeta" } as const).map(([label, key]) => (
                <label key={key} style={{ display: "grid", gap: 6, fontSize: 13, color: "#1f2937" }}>
                  {label}
                  <input value={context[key]} onChange={(e) => setContext((p) => ({ ...p, [key]: e.target.value }))} style={{ height: 40, border: "1px solid #cbd5e1", borderRadius: 10, padding: "0 12px", fontSize: 14 }} />
                </label>
              ))}
            </div>
          </section>

          <section style={{ background: "#fff", border: "1px solid #dbe2ea", borderRadius: 12, boxShadow: "0 1px 3px rgba(16,24,40,.06)" }}>
            <div style={{ background: "#123a73", color: "#fff", padding: "10px 14px", borderRadius: "12px 12px 0 0", fontWeight: 700 }}>Entradas de produção</div>
            <div style={{ padding: 14, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
              {Object.entries({ "Meta de produção": "metaProducao", "Quantidade produzida": "quantidadeProduzida", "Quantidade aprovada": "quantidadeAprovada", "Quantidade reprovada": "quantidadeReprovada", "Horas trabalhadas": "horasTrabalhadas", "Número de operadores": "numeroOperadores" } as const).map(([label, key]) => (
                <label key={key} style={{ display: "grid", gap: 6, fontSize: 13, color: "#1f2937" }}>
                  {label}
                  <input type="number" min={0} value={inputs[key]} onChange={(e) => setInputs((p) => ({ ...p, [key]: Math.max(0, Number(e.target.value || 0)) }))} style={{ height: 40, border: "1px solid #cbd5e1", borderRadius: 10, padding: "0 12px", fontSize: 14 }} />
                </label>
              ))}
            </div>
          </section>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
            {[["Atingimento da meta", `${(calc.atingimentoMeta * 100).toFixed(1)}%`], ["Produtividade por hora", `${calc.produtividadeHora.toFixed(1)} peças/h`], ["Produtividade por operador", `${calc.produtividadeOperador.toFixed(1)} peças/operador`], ["Taxa de aprovação", `${(calc.taxaAprovacao * 100).toFixed(1)}%`], ["Taxa de reprovação", `${(calc.taxaReprovacao * 100).toFixed(1)}%`], ["Produção líquida", `${calc.producaoLiquida} peças`]].map(([title, value]) => (
              <article key={title} style={{ background: "#fff", border: "1px solid #dbe2ea", borderRadius: 12, padding: 14, boxShadow: "0 1px 3px rgba(16,24,40,.06)" }}>
                <span style={{ fontSize: 13, color: "#4b5563" }}>{title}</span>
                <strong style={{ display: "block", fontSize: 30, color: "#123a73" }}>{value}</strong>
              </article>
            ))}
          </div>

          <section style={{ background: "#fff", border: "1px solid #dbe2ea", borderRadius: 12, boxShadow: "0 1px 3px rgba(16,24,40,.06)" }}>
            <div style={{ background: "#123a73", color: "#fff", padding: "10px 14px", borderRadius: "12px 12px 0 0", fontWeight: 700 }}>Resumo operacional</div>
            <div style={{ padding: 14, display: "grid", gap: 8, color: "#1f2937" }}>
              {[["Meta planejada", `${inputs.metaProducao} peças`], ["Produção realizada", `${inputs.quantidadeProduzida} peças`], ["Diferença para meta", `${calc.diferencaMeta} peças`], ["Produção aprovada", `${inputs.quantidadeAprovada} peças`], ["Produção reprovada", `${inputs.quantidadeReprovada} peças`], ["Eficiência produtiva", `${(calc.eficienciaProdutiva * 100).toFixed(1)}%`]].map(([label, value]) => (
                <p key={label} style={{ margin: 0 }}>{label}: <strong>{value}</strong></p>
              ))}
            </div>
          </section>

          <section style={{ background: "#fff", border: "1px solid #dbe2ea", borderRadius: 12, boxShadow: "0 1px 3px rgba(16,24,40,.06)" }}>
            <div style={{ background: "#123a73", color: "#fff", padding: "10px 14px", borderRadius: "12px 12px 0 0", fontWeight: 700 }}>Detalhamento</div>
            <div style={{ padding: 14, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 10 }}>
              <article style={{ border: "1px solid #e2e8f0", borderRadius: 10, padding: 12 }}><h4 style={{ margin: "0 0 8px", color: "#123a73" }}>Contexto da produção</h4><p style={{ margin: 0 }}>{context.empresa || "-"} • {context.unidade || "-"} • {context.setor || "-"}</p></article>
              <article style={{ border: "1px solid #e2e8f0", borderRadius: 10, padding: 12 }}><h4 style={{ margin: "0 0 8px", color: "#123a73" }}>Volume produzido</h4><p style={{ margin: 0 }}>Total: {inputs.quantidadeProduzida} | Meta: {inputs.metaProducao} | Diferença: {calc.diferencaMeta}</p></article>
              <article style={{ border: "1px solid #e2e8f0", borderRadius: 10, padding: 12 }}><h4 style={{ margin: "0 0 8px", color: "#123a73" }}>Qualidade da produção</h4><p style={{ margin: 0 }}>Aprovada: {inputs.quantidadeAprovada} | Reprovada: {inputs.quantidadeReprovada} | Aprovação: {(calc.taxaAprovacao * 100).toFixed(1)}%</p></article>
              <article style={{ border: "1px solid #e2e8f0", borderRadius: 10, padding: 12 }}><h4 style={{ margin: "0 0 8px", color: "#123a73" }}>Indicadores</h4><p style={{ margin: 0 }}>Prod/h: {calc.produtividadeHora.toFixed(1)} | Prod/op: {calc.produtividadeOperador.toFixed(1)} | Eficiência: {(calc.eficienciaProdutiva * 100).toFixed(1)}%</p></article>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}