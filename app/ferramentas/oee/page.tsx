"use client";

import { useMemo, useState } from "react";
import { Download, FolderOpen, Gauge, PlusCircle, Save } from "lucide-react";
import Sidebar from "../../../components/layout/Sidebar";
import OeeContextForm from "../../../components/oee/OeeContextForm";
import OeeDetailTable from "../../../components/oee/OeeDetailTable";
import OeeGaugeCard from "../../../components/oee/OeeGaugeCard";
import OeeInputCard from "../../../components/oee/OeeInputCard";
import OeeResultCard from "../../../components/oee/OeeResultCard";
import { OeeContext, OeeHistoryRow, OeeInputs } from "../../../components/oee/types";

const emptyInputs: OeeInputs = { tempoTotal: 0, paradaPlanejada: 0, paradaNaoPlanejada: 0, quantidadeProduzida: 0, quantidadeBoa: 0, tempoCicloIdeal: 0 };
const exampleInputs: OeeInputs = { tempoTotal: 480, paradaPlanejada: 45, paradaNaoPlanejada: 30, quantidadeProduzida: 900, quantidadeBoa: 855, tempoCicloIdeal: 1.5 };

const emptyContext: OeeContext = { empresa: "", unidade: "", setor: "", linha: "", equipamento: "", produto: "", ordemProducao: "", turno: "", dataColeta: "" };
const exampleContext: OeeContext = { empresa: "Ambiente demo", unidade: "Planta 1", setor: "Envase", linha: "Linha A", equipamento: "Envase 01", produto: "Produto demo", ordemProducao: "OP-10245", turno: "A", dataColeta: "2026-05-14" };

const safeDiv = (a: number, b: number) => (b > 0 ? a / b : 0);
const clampPct = (v: number) => Math.max(0, Math.min(100, v));

export default function OeePage() {
  const [inputs, setInputs] = useState<OeeInputs>(exampleInputs);
  const [context, setContext] = useState<OeeContext>(exampleContext);

  const clearAll = () => {
    setInputs(emptyInputs);
    setContext(emptyContext);
  };

  const loadExample = () => {
    setInputs(exampleInputs);
    setContext(exampleContext);
  };

  const calc = useMemo(() => {
    const tempoPlanejado = Math.max(0, inputs.tempoTotal - inputs.paradaPlanejada);
    const tempoOperando = Math.max(0, tempoPlanejado - inputs.paradaNaoPlanejada);
    const disponibilidade = safeDiv(tempoOperando, tempoPlanejado);
    const performance = safeDiv(inputs.quantidadeProduzida * inputs.tempoCicloIdeal, tempoOperando * 60);
    const qualidade = safeDiv(inputs.quantidadeBoa, inputs.quantidadeProduzida);
    const oee = disponibilidade * performance * qualidade;
    return { tempoPlanejado, tempoOperando, disponibilidade: disponibilidade * 100, performance: performance * 100, qualidade: qualidade * 100, oee: oee * 100, refugo: Math.max(0, inputs.quantidadeProduzida - inputs.quantidadeBoa) };
  }, [inputs]);

  const history: OeeHistoryRow[] = [{ data: context.dataColeta || "-", equipamento: context.equipamento || "-", produto: context.produto || "-", ordem: context.ordemProducao || "-", turno: context.turno || "-", tempoPlanejado: calc.tempoPlanejado, tempoOperando: calc.tempoOperando, paradaPlanejada: inputs.paradaPlanejada, paradaNaoPlanejada: inputs.paradaNaoPlanejada, producaoTotal: inputs.quantidadeProduzida, producaoBoa: inputs.quantidadeBoa, refugo: calc.refugo, disponibilidade: calc.disponibilidade, performance: calc.performance, qualidade: calc.qualidade, oee: calc.oee }];

  const exportToPdf = () => {
    const fallbackOrder = context.ordemProducao?.trim() || "sem-op";
    const safeOrder = fallbackOrder.replace(/[^a-zA-Z0-9-_]/g, "-");
    const previousTitle = document.title;
    document.title = `analise-oee-${safeOrder}.pdf`;

    setTimeout(() => {
      window.print();
      setTimeout(() => {
        document.title = previousTitle;
      }, 250);
    }, 0);
  };

  return (
    <main style={{ minHeight: "100vh", background: "#f3f6fb", color: "#111827" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", minHeight: "100vh" }}>
        <Sidebar ferramentasMenu={["Calculadora OEE", "Indicadores de Produção", "Produtividade", "Paradas", "Perdas e Refugos"]} />
        <section style={{ padding: 24, marginLeft: 260, display: "grid", gap: 14 }}>
          <header
            style={{
              background: "linear-gradient(135deg, #163b75 0%, #1f4f96 100%)",
              borderRadius: 20,
              padding: 36,
              color: "#fff",
              boxShadow: "0 12px 30px rgba(15, 23, 42, 0.18)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 28,
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 18, flex: "1 1 360px", minWidth: 280 }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 16,
                  background: "rgba(255,255,255,0.16)",
                  display: "grid",
                  placeItems: "center",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,.26)",
                }}
              >
                <Gauge size={34} />
              </div>
              <div style={{ display: "grid", gap: 10 }}>
                <h2 style={{ margin: 0, fontSize: 36, lineHeight: 1.1, fontWeight: 700 }}>Calculadora OEE</h2>
                <p style={{ margin: 0, maxWidth: 700, color: "rgba(255,255,255,.86)", fontSize: 16, lineHeight: 1.5 }}>
                  Monitore eficiência operacional em tempo real com indicadores inteligentes de disponibilidade, performance e qualidade.
                </p>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 160px)", gap: 10, justifyContent: "flex-end", flex: "1 1 340px" }}>
              {[
                { t: "Novo cálculo", onClick: clearAll, Icon: PlusCircle, primary: true },
                { t: "Carregar exemplo", onClick: loadExample, Icon: FolderOpen },
                { t: "Exportar PDF", onClick: exportToPdf, Icon: Download },
                { t: "Salvar análise", onClick: () => window.alert("Salvo localmente (demo)"), Icon: Save },
              ].map((b) => (
                <button
                  key={b.t}
                  onClick={b.onClick}
                  style={{
                    background: b.primary ? "#ffffff" : "transparent",
                    color: b.primary ? "#123a73" : "#ffffff",
                    border: b.primary ? "1px solid #ffffff" : "1px solid rgba(255,255,255,.5)",
                    borderRadius: 12,
                    width: "160px",
                    height: 44,
                    padding: "0 12px",
                    fontWeight: 600,
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    whiteSpace: "nowrap",
                    gap: 8,
                    transition: "all .2s ease",
                    cursor: "pointer",
                  }}
                >
                  <b.Icon size={18} />
                  {b.t}
                </button>
              ))}
            </div>
          </header>

          <div className="print-only-title">Análise OEE</div>

          <OeeContextForm values={context} onChange={(field, value) => setContext((p) => ({ ...p, [field]: value }))} />
          <OeeInputCard values={inputs} onChange={(field, value) => setInputs((p) => ({ ...p, [field]: Number.isFinite(value) ? Math.max(0, value) : 0 }))} />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
            <OeeResultCard title="OEE Total" value={calc.oee} description="Eficiência global do equipamento." />
            <OeeResultCard title="Disponibilidade" value={calc.disponibilidade} description="Tempo operando sobre tempo planejado." />
            <OeeResultCard title="Performance" value={calc.performance} description="Ritmo real versus ritmo ideal." />
            <OeeResultCard title="Qualidade" value={calc.qualidade} description="Peças boas sobre total produzido." />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
            <OeeGaugeCard label="Indicador principal de OEE" value={clampPct(calc.oee)} large />
            <OeeGaugeCard label="Disponibilidade" value={clampPct(calc.disponibilidade)} />
            <OeeGaugeCard label="Performance" value={clampPct(calc.performance)} />
            <OeeGaugeCard label="Qualidade" value={clampPct(calc.qualidade)} />
          </div>

          <section style={{ background: "#fff", border: "1px solid #dbe2ea", borderRadius: 12, boxShadow: "0 1px 3px rgba(16,24,40,.06)" }}>
            <div style={{ background: "#123a73", color: "#fff", padding: "10px 14px", borderRadius: "12px 12px 0 0", fontWeight: 700 }}>Resumo operacional</div>
            <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 8, color: "#1f2937" }}>
              {[
                { label: "Tempo planejado efetivo:", value: `${calc.tempoPlanejado} min` },
                { label: "Tempo operando efetivo:", value: `${calc.tempoOperando} min` },
                { label: "Refugo total:", value: `${calc.refugo} peças` },
                { label: "Taxa de refugo:", value: `${inputs.quantidadeProduzida > 0 ? ((calc.refugo / inputs.quantidadeProduzida) * 100).toFixed(1) : "0.0"}%` },
                { label: "Aproveitamento de produção:", value: `${calc.qualidade.toFixed(1)}%` },
                { label: "Eficiência global atual:", value: `${calc.oee.toFixed(1)}%` },
              ].map((item) => (
                <p key={item.label} style={{ margin: 0 }}>
                  {item.label} <strong>{item.value}</strong>
                </p>
              ))}
            </div>
          </section>

          <OeeDetailTable rows={history} />
        </section>
      </div>
      
      <style jsx global>{`
        .print-only-title {
          display: none;
        }

        @media print {
          .print-only-title {
            display: block;
            font-size: 28px;
            font-weight: 700;
            margin: 4px 0 12px 0;
            color: #111827;
          }
        }
      `}</style>
    </main>
  );
}
