"use client";

import { useMemo, useState } from "react";
import { Activity, BarChart3, Clock3, Download, FolderOpen, PlusCircle, Save, Users } from "lucide-react";
import Sidebar from "../../../components/layout/Sidebar";

type ProductivityContext = {
  empresa: string;
  unidade: string;
  setor: string;
  linha: string;
  equipamento: string;
  produto: string;
  ordemProducao: string;
  turno: string;
  dataAnalise: string;
};

type ProductivityInputs = {
  metaProducao: number;
  quantidadeProduzida: number;
  tempoProdutivoMin: number;
  operadoresEnvolvidos: number;
  tempoDisponivelMin: number;
  paradasMin: number;
};

const emptyContext: ProductivityContext = {
  empresa: "",
  unidade: "",
  setor: "",
  linha: "",
  equipamento: "",
  produto: "",
  ordemProducao: "",
  turno: "",
  dataAnalise: "",
};

const exampleContext: ProductivityContext = {
  empresa: "Ambiente demo",
  unidade: "Planta 1",
  setor: "Produção",
  linha: "Linha A",
  equipamento: "Celula 01",
  produto: "Produto demo",
  ordemProducao: "OP-30520",
  turno: "A",
  dataAnalise: "2026-05-19",
};

const emptyInputs: ProductivityInputs = {
  metaProducao: 0,
  quantidadeProduzida: 0,
  tempoProdutivoMin: 0,
  operadoresEnvolvidos: 0,
  tempoDisponivelMin: 0,
  paradasMin: 0,
};

const exampleInputs: ProductivityInputs = {
  metaProducao: 1200,
  quantidadeProduzida: 1080,
  tempoProdutivoMin: 420,
  operadoresEnvolvidos: 6,
  tempoDisponivelMin: 480,
  paradasMin: 60,
};

const safeDiv = (a: number, b: number) => (b > 0 ? a / b : 0);

function getGoalStatus(value: number) {
  if (value >= 100) return { label: "Bom", color: "#16a34a" };
  if (value >= 85) return { label: "Médio", color: "#f59e0b" };
  return { label: "Crítico", color: "#dc2626" };
}

export default function ProdutividadePage() {
  const [context, setContext] = useState<ProductivityContext>(exampleContext);
  const [inputs, setInputs] = useState<ProductivityInputs>(exampleInputs);

  const clearAll = () => {
    setContext(emptyContext);
    setInputs(emptyInputs);
  };

  const loadExample = () => {
    setContext(exampleContext);
    setInputs(exampleInputs);
  };

  const calc = useMemo(() => {
    const tempoProdutivoHoras = safeDiv(inputs.tempoProdutivoMin, 60);
    const atingimentoMeta = safeDiv(inputs.quantidadeProduzida, inputs.metaProducao) * 100;
    const variacaoAbsolutaMeta = inputs.quantidadeProduzida - inputs.metaProducao;

    return {
      tempoProdutivoHoras,
      produtividadeHora: safeDiv(inputs.quantidadeProduzida, tempoProdutivoHoras),
      produtividadeOperador: safeDiv(inputs.quantidadeProduzida, inputs.operadoresEnvolvidos),
      produtividadeOperadorHora: safeDiv(inputs.quantidadeProduzida, inputs.operadoresEnvolvidos * tempoProdutivoHoras),
      atingimentoMeta,
      variacaoAbsolutaMeta,
      variacaoPercentualMeta: safeDiv(variacaoAbsolutaMeta, inputs.metaProducao) * 100,
      tempoLiquidoDisponivel: Math.max(0, inputs.tempoDisponivelMin - inputs.paradasMin),
    };
  }, [inputs]);

  const goalStatus = getGoalStatus(calc.atingimentoMeta);

  const indicatorCards = [
    { title: "Produção total", value: inputs.quantidadeProduzida, suffix: " peças", description: "Quantidade produzida no período analisado." },
    { title: "Tempo produtivo", value: inputs.tempoProdutivoMin, suffix: " min", description: "Tempo efetivo dedicado à produção." },
    { title: "Produtividade por hora", value: calc.produtividadeHora, suffix: " peças/h", description: "Volume produzido por hora produtiva." },
    { title: "Prod. por operador", value: calc.produtividadeOperador, suffix: " peças/op", description: "Produção média por operador envolvido." },
    { title: "Prod. operador/hora", value: calc.produtividadeOperadorHora, suffix: " peças/op/h", description: "Produtividade ponderada por equipe e tempo." },
    { title: "Atingimento da meta", value: calc.atingimentoMeta, suffix: "%", description: "Realizado em relação à meta planejada." },
  ];

  const exportToPdf = () => {
    const fallbackOrder = context.ordemProducao?.trim() || "sem-op";
    const safeOrder = fallbackOrder.replace(/[^a-zA-Z0-9-_]/g, "-");
    const previousTitle = document.title;
    document.title = `analise-produtividade-${safeOrder}.pdf`;

    setTimeout(() => {
      window.print();
      setTimeout(() => {
        document.title = previousTitle;
      }, 250);
    }, 0);
  };

  return (
    <main style={{ minHeight: "100vh", background: "#f3f6fb", color: "#111827" }}>
      <div style={{ display: "grid", minHeight: "100vh" }}>
        <Sidebar ferramentasMenu={["Calculadora OEE", "Indicadores de Produção", "Produtividade", "Paradas", "Perdas e Refugos"]} />

        <section className="produtividade-content" style={{ padding: 24, marginLeft: 260, display: "grid", gap: 14 }}>
          <header className="screen-only" style={{ background: "linear-gradient(135deg, #163b75 0%, #1f4f96 100%)", borderRadius: 20, padding: 36, color: "#fff", boxShadow: "0 12px 30px rgba(15, 23, 42, 0.18)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 28, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 18, flex: "1 1 360px", minWidth: 280 }}>
              <div style={{ width: 64, height: 64, borderRadius: 16, background: "rgba(255,255,255,0.16)", display: "grid", placeItems: "center", boxShadow: "inset 0 1px 0 rgba(255,255,255,.26)" }}>
                <Activity size={34} />
              </div>

              <div style={{ display: "grid", gap: 10 }}>
                <h2 style={{ margin: 0, fontSize: 36, lineHeight: 1.1, fontWeight: 700 }}>Produtividade Industrial</h2>
                <p style={{ margin: 0, maxWidth: 700, color: "rgba(255,255,255,.86)", fontSize: 16, lineHeight: 1.5 }}>
                  Analise produção, tempo produtivo, operadores e atingimento da meta em uma visão operacional objetiva.
                </p>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 160px)", gap: 10, justifyContent: "flex-end", flex: "1 1 340px" }}>
              {[
                { t: "Novo cálculo", onClick: clearAll, Icon: PlusCircle, primary: true },
                { t: "Carregar exemplo", onClick: loadExample, Icon: FolderOpen },
                { t: "Exportar PDF", onClick: exportToPdf, Icon: Download },
                { t: "Salvar análise", onClick: () => window.alert("Análise salva localmente (demo)."), Icon: Save },
              ].map((b) => (
                <button key={b.t} onClick={b.onClick} style={{ background: b.primary ? "#ffffff" : "transparent", color: b.primary ? "#123a73" : "#ffffff", border: b.primary ? "1px solid #ffffff" : "1px solid rgba(255,255,255,.5)", borderRadius: 12, width: "160px", height: 44, padding: "0 12px", fontWeight: 600, display: "inline-flex", justifyContent: "center", alignItems: "center", whiteSpace: "nowrap", gap: 8, transition: "all .2s ease", cursor: "pointer" }}>
                  <b.Icon size={18} />
                  {b.t}
                </button>
              ))}
            </div>
          </header>

          <div className="print-only-title">Análise de Produtividade</div>

          <div className="print-area" style={{ display: "grid", gap: 14 }}>
            <section style={{ background: "#fff", border: "1px solid #dbe2ea", borderRadius: 12, boxShadow: "0 1px 3px rgba(16,24,40,.06)" }}>
              <div style={{ background: "#123a73", color: "#fff", padding: "10px 14px", borderRadius: "12px 12px 0 0", fontWeight: 700 }}>Contexto da análise</div>
              <div style={{ padding: 14, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
                {Object.entries({ "Empresa / Ambiente": "empresa", "Unidade / Planta": "unidade", Setor: "setor", Linha: "linha", Equipamento: "equipamento", Produto: "produto", "Ordem de Produção": "ordemProducao", Turno: "turno", "Data da análise": "dataAnalise" } as const).map(([label, key]) => (
                  <label key={key} style={{ display: "grid", gap: 6, fontSize: 14 }}>
                    <span style={{ color: "#374151" }}>{label}</span>
                    <input type={key === "dataAnalise" ? "date" : "text"} value={context[key]} onChange={(e) => setContext((p) => ({ ...p, [key]: e.target.value }))} style={{ background: "#fff", color: "#111827", border: "1px solid #d1d5db", borderRadius: 8, padding: "8px 10px" }} />
                  </label>
                ))}
              </div>
            </section>

            <section style={{ background: "#fff", border: "1px solid #dbe2ea", borderRadius: 12, boxShadow: "0 1px 3px rgba(16,24,40,.06)" }}>
              <div style={{ background: "#123a73", color: "#fff", padding: "10px 14px", borderRadius: "12px 12px 0 0", fontWeight: 700 }}>Entradas de produtividade</div>
              <div style={{ padding: 14, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
                {Object.entries({ "Meta de produção": "metaProducao", "Quantidade produzida": "quantidadeProduzida", "Tempo produtivo (min)": "tempoProdutivoMin", "Operadores envolvidos": "operadoresEnvolvidos", "Tempo disponível (min)": "tempoDisponivelMin", "Paradas (min)": "paradasMin" } as const).map(([label, key]) => (
                  <label key={key} style={{ display: "grid", gap: 6, fontSize: 14 }}>
                    <span style={{ color: "#374151" }}>{label}</span>
                    <input type="number" min={0} value={inputs[key]} onChange={(e) => setInputs((p) => ({ ...p, [key]: Math.max(0, Number(e.target.value || 0)) }))} style={{ background: "#fff", color: "#111827", border: "1px solid #d1d5db", borderRadius: 8, padding: "8px 10px" }} />
                  </label>
                ))}
              </div>
            </section>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
              {indicatorCards.map((card) => {
                const status = card.title === "Atingimento da meta" ? goalStatus : getGoalStatus(calc.atingimentoMeta);

                return (
                  <article key={card.title} style={{ background: "#fff", border: "1px solid #dbe2ea", borderRadius: 12, boxShadow: "0 1px 3px rgba(16,24,40,.06)" }}>
                    <div style={{ background: "#123a73", color: "#fff", padding: "10px 14px", borderRadius: "12px 12px 0 0", display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
                      <h3 style={{ margin: 0, fontSize: 16 }}>{card.title}</h3>
                      <span style={{ color: status.color, fontWeight: 700, background: "#fff", borderRadius: 999, padding: "2px 10px", display: "inline-flex", alignItems: "center", whiteSpace: "nowrap" }}>{status.label}</span>
                    </div>
                    <div style={{ padding: 14, minHeight: 92, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                      <p style={{ margin: "0 0 6px", fontSize: 23, lineHeight: 1.25, fontWeight: 800, color: "#111827" }}>
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
              <div style={{ padding: 14, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 10, color: "#1f2937" }}>
                {[
                  ["Meta planejada", `${inputs.metaProducao.toFixed(0)} peças`],
                  ["Produção realizada", `${inputs.quantidadeProduzida.toFixed(0)} peças`],
                  ["Atingimento da meta", `${calc.atingimentoMeta.toFixed(1)}% (${goalStatus.label})`],
                  ["Variação absoluta", `${calc.variacaoAbsolutaMeta.toFixed(0)} peças`],
                  ["Variação percentual", `${calc.variacaoPercentualMeta.toFixed(1)}%`],
                  ["Tempo líquido disponível", `${calc.tempoLiquidoDisponivel.toFixed(0)} min`],
                ].map(([label, value]) => (
                  <p key={label} style={{ margin: 0 }}>
                    {label}: <strong>{value}</strong>
                  </p>
                ))}
              </div>
            </section>

            <section style={{ background: "#fff", border: "1px solid #dbe2ea", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 3px rgba(16,24,40,.06)" }}>
              <div style={{ background: "#123a73", color: "#fff", padding: "10px 14px", borderRadius: "12px 12px 0 0", fontWeight: 700 }}>Detalhamento</div>
              <div style={{ padding: 14, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 12 }}>
                {[
                  { title: "Contexto", Icon: Activity, rows: [["Data", context.dataAnalise || "-"], ["Equipamento", context.equipamento || "-"], ["Produto", context.produto || "-"], ["OP", context.ordemProducao || "-"]] },
                  { title: "Tempo", Icon: Clock3, rows: [["Produtivo", `${inputs.tempoProdutivoMin} min`], ["Disponível", `${inputs.tempoDisponivelMin} min`], ["Paradas", `${inputs.paradasMin} min`], ["Líquido", `${calc.tempoLiquidoDisponivel.toFixed(0)} min`]] },
                  { title: "Equipe", Icon: Users, rows: [["Operadores", `${inputs.operadoresEnvolvidos}`], ["Prod./operador", `${calc.produtividadeOperador.toFixed(1)} peças/op`], ["Prod./op/h", `${calc.produtividadeOperadorHora.toFixed(1)} peças/op/h`]] },
                  { title: "Indicadores", Icon: BarChart3, rows: [["Produtividade/h", `${calc.produtividadeHora.toFixed(1)} peças/h`], ["Atingimento", `${calc.atingimentoMeta.toFixed(1)}%`], ["Status", goalStatus.label], ["Variação", `${calc.variacaoPercentualMeta.toFixed(1)}%`]] },
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
            </section>
          </div>
        </section>
      </div>

      <style jsx global>{`
        .print-only-title {
          display: none;
        }

        @page {
          size: A4;
          margin: 10mm;
        }

        @media print {
          body {
            background: #fff !important;
          }

          main,
          main > div,
          .produtividade-content {
            background: #fff !important;
          }

          aside,
          nav,
          .screen-only,
          button {
            display: none !important;
          }

          .produtividade-content {
            margin-left: 0 !important;
            padding: 0 !important;
            gap: 8px !important;
          }

          .print-area {
            display: grid !important;
            gap: 8px !important;
            font-size: 11px;
            line-height: 1.25;
          }

          .print-only-title {
            display: block;
            font-size: 28px;
            margin: 4px 0 12px 0;
            font-weight: 700;
            color: #111827;
            opacity: 1 !important;
          }

          .print-area section,
          .print-area article {
            break-inside: avoid;
            page-break-inside: avoid;
            box-shadow: none !important;
            border-radius: 6px !important;
            border-color: #9ca3af !important;
          }

          .print-area section > div:first-child,
          .print-area article > div:first-child {
            padding: 5px 8px !important;
            font-size: 11px !important;
            line-height: 1.2;
            color: #111827 !important;
            opacity: 1 !important;
          }

          .print-area section > div:last-child,
          .print-area article > div:last-child {
            padding: 8px !important;
            gap: 6px !important;
          }

          .print-area p,
          .print-area span,
          .print-area li,
          .print-area strong,
          .print-area label,
          .print-area h3,
          .print-area h4 {
            font-size: 10px !important;
            line-height: 1.2 !important;
            color: #111827 !important;
            opacity: 1 !important;
          }

          .print-area strong {
            font-weight: 700 !important;
          }

          .print-area input {
            border: 0 !important;
            padding: 0 !important;
            background: transparent !important;
            font-size: 10px !important;
            color: #111827 !important;
            font-weight: 700 !important;
            opacity: 1 !important;
            pointer-events: none;
          }

          .print-area [style*="opacity"] {
            opacity: 1 !important;
          }

          .print-area svg {
            max-height: 90px !important;
          }
        }
      `}</style>
    </main>
  );
}
