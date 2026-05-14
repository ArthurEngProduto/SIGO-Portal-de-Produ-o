"use client";

import { useMemo, useState } from "react";
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

  return (
    <main style={{ minHeight: "100vh", background: "#f3f6fb", color: "#111827" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", minHeight: "100vh" }}>
        <Sidebar ferramentasMenu={["Calculadora OEE", "Indicadores de Produção", "Produtividade", "Paradas", "Perdas e Refugos"]} />
        <section style={{ padding: 24, marginLeft: 260, display: "grid", gap: 14 }}>
          <header style={{ background: "#123a73", border: "1px solid #123a73", borderRadius: 12, padding: 18, color: "#fff", boxShadow: "0 1px 3px rgba(16,24,40,.08)" }}>
            <h2 style={{ margin: 0 }}>Calculadora OEE</h2>
            <p style={{ margin: "8px 0 14px", color: "#dbeafe" }}>Calcule e analise disponibilidade, performance, qualidade e eficiência global do equipamento.</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[
                { t: "Novo cálculo", onClick: clearAll, primary: true },
                { t: "Carregar exemplo", onClick: loadExample, primary: true },
                { t: "Exportar", onClick: () => window.alert("Exportação demo") },
                { t: "Salvar análise", onClick: () => window.alert("Salvo localmente (demo)") },
              ].map((b) => (
                <button
                  key={b.t}
                  onClick={b.onClick}
                  style={{
                    background: b.primary ? "#123a73" : "#ffffff",
                    color: b.primary ? "#ffffff" : "#123a73",
                    border: "1px solid #b7c9e6",
                    borderRadius: 8,
                    padding: "8px 12px",
                    fontWeight: 600,
                  }}
                >
                  {b.t}
                </button>
              ))}
            </div>
          </header>

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
            <div style={{ padding: 14, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
              {[`Tempo planejado efetivo: ${calc.tempoPlanejado} min`,`Tempo operando efetivo: ${calc.tempoOperando} min`,`Refugo total: ${calc.refugo} peças`,`Taxa de refugo: ${inputs.quantidadeProduzida > 0 ? ((calc.refugo / inputs.quantidadeProduzida) * 100).toFixed(1) : "0.0"}%`,`Aproveitamento de produção: ${calc.qualidade.toFixed(1)}%`,`Eficiência global atual: ${calc.oee.toFixed(1)}%`].map((txt) => <div key={txt} style={{ background: "#fff", border: "1px solid #dbe2ea", borderRadius: 10, padding: 12, color: "#374151" }}>{txt}</div>)}
            </div>
          </section>

          <OeeDetailTable rows={history} />
        </section>
      </div>
    </main>
  );
}
