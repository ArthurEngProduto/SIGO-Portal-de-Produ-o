"use client";

import { useMemo, useState } from "react";
import { Activity, BarChart3, Clock3, Download, FolderOpen, PlusCircle, Save } from "lucide-react";
import Sidebar from "../../../components/layout/Sidebar";

type StopContext = {
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

type StopInputs = {
  tempoDisponivelMin: number;
  tempoProdutivoMin: number;
  paradaPlanejadaMin: number;
  paradaNaoPlanejadaMin: number;
  quantidadeParadas: number;
  motivoPrincipal: string;
  observacoes: string;
};

const emptyContext: StopContext = {
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

const exampleContext: StopContext = {
  empresa: "Ambiente demo",
  unidade: "Planta 1",
  setor: "Produção",
  linha: "Linha A",
  equipamento: "Prensa 02",
  produto: "Produto demo",
  ordemProducao: "OP-40710",
  turno: "B",
  dataAnalise: "2026-05-19",
};

const emptyInputs: StopInputs = {
  tempoDisponivelMin: 0,
  tempoProdutivoMin: 0,
  paradaPlanejadaMin: 0,
  paradaNaoPlanejadaMin: 0,
  quantidadeParadas: 0,
  motivoPrincipal: "",
  observacoes: "",
};

const exampleInputs: StopInputs = {
  tempoDisponivelMin: 480,
  tempoProdutivoMin: 420,
  paradaPlanejadaMin: 20,
  paradaNaoPlanejadaMin: 40,
  quantidadeParadas: 5,
  motivoPrincipal: "Ajuste de setup e microparadas",
  observacoes: "Maior concentração de paradas no início do turno.",
};

const safeDiv = (a: number, b: number) => (b > 0 ? a / b : 0);

function getStopStatus(value: number) {
  if (value <= 5) return { label: "Bom", color: "#16a34a" };
  if (value <= 15) return { label: "Médio", color: "#f59e0b" };
  return { label: "Crítico", color: "#dc2626" };
}

function getAvailabilityStatus(value: number) {
  if (value >= 90) return { label: "Bom", color: "#16a34a" };
  if (value >= 75) return { label: "Médio", color: "#f59e0b" };
  return { label: "Crítico", color: "#dc2626" };
}

export default function ParadasPage() {
  const [context, setContext] = useState<StopContext>(exampleContext);
  const [inputs, setInputs] = useState<StopInputs>(exampleInputs);

  const clearAll = () => {
    setContext(emptyContext);
    setInputs(emptyInputs);
  };

  const loadExample = () => {
    setContext(exampleContext);
    setInputs(exampleInputs);
  };

  const calc = useMemo(() => {
    const tempoTotalParado = inputs.paradaPlanejadaMin + inputs.paradaNaoPlanejadaMin;
    const percentualTempoParado = safeDiv(tempoTotalParado, inputs.tempoDisponivelMin) * 100;
    const disponibilidade = safeDiv(Math.max(0, inputs.tempoDisponivelMin - tempoTotalParado), inputs.tempoDisponivelMin) * 100;

    return {
      tempoTotalParado,
      percentualTempoParado,
      disponibilidade,
      mediaTempoPorParada: safeDiv(tempoTotalParado, inputs.quantidadeParadas),
      tempoProdutivoLiquido: Math.max(0, inputs.tempoDisponivelMin - tempoTotalParado),
      impactoEstimadoParadas: percentualTempoParado,
    };
  }, [inputs]);

  const stopStatus = getStopStatus(calc.percentualTempoParado);
  const availabilityStatus = getAvailabilityStatus(calc.disponibilidade);

  const indicatorCards = [
    { title: "Tempo total parado", value: calc.tempoTotalParado, suffix: " min", description: "Soma das paradas planejadas e não planejadas.", status: stopStatus },
    { title: "Tempo parado", value: calc.percentualTempoParado, suffix: "%", description: "Percentual do tempo disponível comprometido.", status: stopStatus },
    { title: "Disponibilidade", value: calc.disponibilidade, suffix: "%", description: "Tempo disponível restante após as paradas.", status: availabilityStatus },
    { title: "Média por parada", value: calc.mediaTempoPorParada, suffix: " min", description: "Tempo médio consumido por cada parada.", status: stopStatus },
    { title: "Tempo produtivo líquido", value: calc.tempoProdutivoLiquido, suffix: " min", description: "Tempo disponível descontando paradas totais.", status: availabilityStatus },
    { title: "Impacto das paradas", value: calc.impactoEstimadoParadas, suffix: "%", description: "Impacto estimado das paradas na produtividade.", status: stopStatus },
  ];

  const exportToPdf = () => {
    const fallbackOrder = context.ordemProducao?.trim() || "sem-op";
    const safeOrder = fallbackOrder.replace(/[^a-zA-Z0-9-_]/g, "-");
    const previousTitle = document.title;
    document.title = `analise-paradas-${safeOrder}.pdf`;

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

        <section className="paradas-content" style={{ padding: 24, marginLeft: 260, display: "grid", gap: 14 }}>
          <header className="screen-only" style={{ background: "linear-gradient(135deg, #163b75 0%, #1f4f96 100%)", borderRadius: 20, padding: 36, color: "#fff", boxShadow: "0 12px 30px rgba(15, 23, 42, 0.18)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 28, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 18, flex: "1 1 360px", minWidth: 280 }}>
              <div style={{ width: 64, height: 64, borderRadius: 16, background: "rgba(255,255,255,0.16)", display: "grid", placeItems: "center", boxShadow: "inset 0 1px 0 rgba(255,255,255,.26)" }}>
                <Clock3 size={34} />
              </div>

              <div style={{ display: "grid", gap: 10 }}>
                <h2 style={{ margin: 0, fontSize: 36, lineHeight: 1.1, fontWeight: 700 }}>Análise de Paradas</h2>
                <p style={{ margin: 0, maxWidth: 700, color: "rgba(255,255,255,.86)", fontSize: 16, lineHeight: 1.5 }}>
                  Registre tempos parados, motivos principais e impacto operacional das interrupções produtivas.
                </p>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 160px)", gap: 10, justifyContent: "flex-end", flex: "1 1 340px" }}>
              {[
                { t: "Novo registro", onClick: clearAll, Icon: PlusCircle, primary: true },
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

          <div className="print-only-title">Análise de Paradas</div>

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
              <div style={{ background: "#123a73", color: "#fff", padding: "10px 14px", borderRadius: "12px 12px 0 0", fontWeight: 700 }}>Entradas de paradas</div>
              <div style={{ padding: 14, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
                {Object.entries({ "Tempo disponível (min)": "tempoDisponivelMin", "Tempo produtivo (min)": "tempoProdutivoMin", "Parada planejada (min)": "paradaPlanejadaMin", "Parada não planejada (min)": "paradaNaoPlanejadaMin", "Quantidade de paradas": "quantidadeParadas" } as const).map(([label, key]) => (
                  <label key={key} style={{ display: "grid", gap: 6, fontSize: 14 }}>
                    <span style={{ color: "#374151" }}>{label}</span>
                    <input type="number" min={0} value={inputs[key]} onChange={(e) => setInputs((p) => ({ ...p, [key]: Math.max(0, Number(e.target.value || 0)) }))} style={{ background: "#fff", color: "#111827", border: "1px solid #d1d5db", borderRadius: 8, padding: "8px 10px" }} />
                  </label>
                ))}

                <label style={{ display: "grid", gap: 6, fontSize: 14 }}>
                  <span style={{ color: "#374151" }}>Principal motivo de parada</span>
                  <input value={inputs.motivoPrincipal} onChange={(e) => setInputs((p) => ({ ...p, motivoPrincipal: e.target.value }))} style={{ background: "#fff", color: "#111827", border: "1px solid #d1d5db", borderRadius: 8, padding: "8px 10px" }} />
                </label>

                <label style={{ display: "grid", gap: 6, fontSize: 14, gridColumn: "1 / -1" }}>
                  <span style={{ color: "#374151" }}>Observações</span>
                  <textarea value={inputs.observacoes} onChange={(e) => setInputs((p) => ({ ...p, observacoes: e.target.value }))} rows={3} style={{ background: "#fff", color: "#111827", border: "1px solid #d1d5db", borderRadius: 8, padding: "8px 10px", resize: "vertical", font: "inherit" }} />
                </label>
              </div>
            </section>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
              {indicatorCards.map((card) => (
                <article key={card.title} style={{ background: "#fff", border: "1px solid #dbe2ea", borderRadius: 12, boxShadow: "0 1px 3px rgba(16,24,40,.06)" }}>
                  <div style={{ background: "#123a73", color: "#fff", padding: "10px 14px", borderRadius: "12px 12px 0 0", display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
                    <h3 style={{ margin: 0, fontSize: 16 }}>{card.title}</h3>
                    <span style={{ color: card.status.color, fontWeight: 700, background: "#fff", borderRadius: 999, padding: "2px 10px", display: "inline-flex", alignItems: "center", whiteSpace: "nowrap" }}>{card.status.label}</span>
                  </div>
                  <div style={{ padding: 14, minHeight: 92, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <p style={{ margin: "0 0 6px", fontSize: 23, lineHeight: 1.25, fontWeight: 800, color: "#111827" }}>
                      {card.value.toFixed(1)}
                      {card.suffix}
                    </p>
                    <p style={{ margin: 0, color: "#4b5563", fontSize: 13 }}>{card.description}</p>
                  </div>
                </article>
              ))}
            </div>

            <section style={{ background: "#fff", border: "1px solid #dbe2ea", borderRadius: 12, boxShadow: "0 1px 3px rgba(16,24,40,.06)" }}>
              <div style={{ background: "#123a73", color: "#fff", padding: "10px 14px", borderRadius: "12px 12px 0 0", fontWeight: 700 }}>Resumo operacional</div>
              <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 8, color: "#1f2937" }}>
                {[
                  ["Tempo disponível", `${inputs.tempoDisponivelMin.toFixed(0)} min`],
                  ["Tempo produtivo informado", `${inputs.tempoProdutivoMin.toFixed(0)} min`],
                  ["Tempo total parado", `${calc.tempoTotalParado.toFixed(0)} min`],
                  ["Percentual de tempo parado", `${calc.percentualTempoParado.toFixed(1)}% (${stopStatus.label})`],
                  ["Disponibilidade", `${calc.disponibilidade.toFixed(1)}% (${availabilityStatus.label})`],
                  ["Quantidade de paradas", `${inputs.quantidadeParadas.toFixed(0)}`],
                  ["Principal motivo", inputs.motivoPrincipal || "-"],
                  ["Observações", inputs.observacoes || "-"],
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
                  { title: "Tempos", Icon: Clock3, rows: [["Disponível", `${inputs.tempoDisponivelMin} min`], ["Produtivo", `${inputs.tempoProdutivoMin} min`], ["Parado", `${calc.tempoTotalParado.toFixed(0)} min`], ["Líquido", `${calc.tempoProdutivoLiquido.toFixed(0)} min`]] },
                  { title: "Paradas", Icon: BarChart3, rows: [["Planejada", `${inputs.paradaPlanejadaMin} min`], ["Não planejada", `${inputs.paradaNaoPlanejadaMin} min`], ["Quantidade", `${inputs.quantidadeParadas}`], ["Média", `${calc.mediaTempoPorParada.toFixed(1)} min`]] },
                  { title: "Indicadores", Icon: Activity, rows: [["Tempo parado", `${calc.percentualTempoParado.toFixed(1)}%`], ["Disponibilidade", `${calc.disponibilidade.toFixed(1)}%`], ["Impacto", `${calc.impactoEstimadoParadas.toFixed(1)}%`], ["Status", stopStatus.label]] },
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
          .paradas-content {
            background: #fff !important;
          }

          aside,
          nav,
          .screen-only,
          button {
            display: none !important;
          }

          .paradas-content {
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

          .print-area input,
          .print-area textarea {
            border: 0 !important;
            padding: 0 !important;
            background: transparent !important;
            font-size: 10px !important;
            color: #111827 !important;
            font-weight: 700 !important;
            opacity: 1 !important;
            pointer-events: none;
            resize: none !important;
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
