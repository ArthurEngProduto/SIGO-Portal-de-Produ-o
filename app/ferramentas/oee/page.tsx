"use client";

import { useMemo, useState } from "react";
import Sidebar from "../../../components/layout/Sidebar";
import OeeContextForm from "../../../components/oee/OeeContextForm";
import OeeDetailTable from "../../../components/oee/OeeDetailTable";
import OeeGaugeCard from "../../../components/oee/OeeGaugeCard";
import OeeInputCard from "../../../components/oee/OeeInputCard";
import OeeResultCard from "../../../components/oee/OeeResultCard";
import { OeeHistoryRow, OeeInputs } from "../../../components/oee/types";

const initialInputs: OeeInputs = { tempoTotal: 480, paradaPlanejada: 45, paradaNaoPlanejada: 30, quantidadeProduzida: 900, quantidadeBoa: 855, tempoCicloIdeal: 1.5 };
const safeDiv = (a: number, b: number) => (b > 0 ? a / b : 0);
const clampPct = (v: number) => Math.max(0, Math.min(100, v));

export default function OeePage() {
  const [inputs, setInputs] = useState<OeeInputs>(initialInputs);

  const calc = useMemo(() => {
    const tempoPlanejado = Math.max(0, inputs.tempoTotal - inputs.paradaPlanejada);
    const tempoOperando = Math.max(0, tempoPlanejado - inputs.paradaNaoPlanejada);
    const disponibilidade = safeDiv(tempoOperando, tempoPlanejado);
    const performance = safeDiv(inputs.quantidadeProduzida * inputs.tempoCicloIdeal, tempoOperando * 60);
    const qualidade = safeDiv(inputs.quantidadeBoa, inputs.quantidadeProduzida);
    const oee = disponibilidade * performance * qualidade;
    return { tempoPlanejado, tempoOperando, disponibilidade: disponibilidade * 100, performance: performance * 100, qualidade: qualidade * 100, oee: oee * 100, refugo: Math.max(0, inputs.quantidadeProduzida - inputs.quantidadeBoa) };
  }, [inputs]);

  const history: OeeHistoryRow[] = [{ data: "2026-05-13", equipamento: "Linha A - Envase 01", produto: "Produto demo", ordem: "OP-10245", turno: "A", tempoPlanejado: calc.tempoPlanejado, tempoOperando: calc.tempoOperando, paradaPlanejada: inputs.paradaPlanejada, paradaNaoPlanejada: inputs.paradaNaoPlanejada, producaoTotal: inputs.quantidadeProduzida, producaoBoa: inputs.quantidadeBoa, refugo: calc.refugo, disponibilidade: calc.disponibilidade, performance: calc.performance, qualidade: calc.qualidade, oee: calc.oee }];

  return (
    <main style={{ minHeight: "100vh", background: "#0f172a", color: "#e5e7eb" }}>
      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", minHeight: "100vh" }}>
        <Sidebar ferramentasMenu={["Calculadora OEE", "Indicadores de Produção", "Produtividade", "Paradas", "Perdas e Refugos"]} />
        <section style={{ padding: 24, display: "grid", gap: 14 }}>
          <header style={{ background: "#111827", border: "1px solid #374151", borderRadius: 12, padding: 16 }}>
            <h2 style={{ margin: 0 }}>Calculadora OEE</h2>
            <p style={{ margin: "8px 0 14px", color: "#9ca3af" }}>Calcule e analise disponibilidade, performance, qualidade e eficiência global do equipamento.</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[
                { t: "Novo cálculo", onClick: () => setInputs(initialInputs) },
                { t: "Limpar", onClick: () => setInputs({ tempoTotal: 0, paradaPlanejada: 0, paradaNaoPlanejada: 0, quantidadeProduzida: 0, quantidadeBoa: 0, tempoCicloIdeal: 0 }) },
                { t: "Exportar", onClick: () => window.alert("Exportação demo") },
                { t: "Salvar análise", onClick: () => window.alert("Salvo localmente (demo)") },
              ].map((b) => <button key={b.t} onClick={b.onClick} style={{ background: "#1f2937", color: "#e5e7eb", border: "1px solid #374151", borderRadius: 8, padding: "8px 12px" }}>{b.t}</button>)}
            </div>
          </header>

          <OeeContextForm />
          <OeeInputCard values={inputs} onChange={(field, value) => setInputs((p) => ({ ...p, [field]: Number.isFinite(value) ? Math.max(0, value) : 0 }))} />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
            <OeeResultCard title="OEE Total" value={calc.oee} description="Eficiência global do equipamento." />
            <OeeResultCard title="Disponibilidade" value={calc.disponibilidade} description="Tempo operando sobre tempo planejado." />
            <OeeResultCard title="Performance" value={calc.performance} description="Ritmo real versus ritmo ideal." />
            <OeeResultCard title="Qualidade" value={calc.qualidade} description="Peças boas sobre total produzido." />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 12 }}>
            <OeeGaugeCard label="Indicador principal de OEE" value={clampPct(calc.oee)} large />
            <OeeGaugeCard label="Disponibilidade" value={clampPct(calc.disponibilidade)} />
            <OeeGaugeCard label="Performance" value={clampPct(calc.performance)} />
            <OeeGaugeCard label="Qualidade" value={clampPct(calc.qualidade)} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
            {[`Tempo total: ${inputs.tempoTotal} min`,`Tempo planejado: ${calc.tempoPlanejado} min`,`Tempo operando: ${calc.tempoOperando} min`,`Parada planejada: ${inputs.paradaPlanejada} min`,`Parada não planejada: ${inputs.paradaNaoPlanejada} min`,`Produção total: ${inputs.quantidadeProduzida}`,`Produção boa: ${inputs.quantidadeBoa}`,`Refugo: ${calc.refugo}`,`Ciclo ideal: ${inputs.tempoCicloIdeal}s`].map((txt) => <div key={txt} style={{ background: "#111827", border: "1px solid #374151", borderRadius: 10, padding: 12, color: "#9ca3af" }}>{txt}</div>)}
          </div>

          <OeeDetailTable rows={history} />
        </section>
      </div>
    </main>
  );
}
