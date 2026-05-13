export type OeeInputs = {
  tempoTotal: number;
  paradaPlanejada: number;
  paradaNaoPlanejada: number;
  quantidadeProduzida: number;
  quantidadeBoa: number;
  tempoCicloIdeal: number;
};

export type OeeHistoryRow = {
  data: string;
  equipamento: string;
  produto: string;
  ordem: string;
  turno: string;
  tempoPlanejado: number;
  tempoOperando: number;
  paradaPlanejada: number;
  paradaNaoPlanejada: number;
  producaoTotal: number;
  producaoBoa: number;
  refugo: number;
  disponibilidade: number;
  performance: number;
  qualidade: number;
  oee: number;
};
