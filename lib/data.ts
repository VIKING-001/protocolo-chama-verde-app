export type Objetivo = 'desinchar' | 'reduzir_fome' | 'perder_peso' | 'mais_energia'

export const OBJETIVOS_LABEL: Record<Objetivo, string> = {
  desinchar:    'Desinchar',
  reduzir_fome: 'Reduzir Fome',
  perder_peso:  'Perder Peso',
  mais_energia: 'Mais Energia',
}

export const RECEITAS = {
  desinchar: {
    nome: 'Chá Desinchante',
    emoji: '🌺',
    cor: '#2d8a75',
    melhorHorario: 'Em jejum, pela manhã',
    beneficios: 'Rico em antioxidantes e diurético natural. Reduz retenção de líquidos e inchaço.',
    ingredientes: [
      { item: 'Hibisco seco',              quantidade: '1 colher de sopa' },
      { item: 'Gengibre fresco ralado',    quantidade: '1 cm' },
      { item: 'Suco de limão siciliano',   quantidade: '½ limão' },
      { item: 'Água filtrada quente',      quantidade: '300 ml' },
      { item: 'Mel (opcional)',            quantidade: '1 colher de chá' },
    ],
    preparo: [
      'Ferva 300 ml de água e desligue o fogo.',
      'Adicione o hibisco e o gengibre ralado.',
      'Tampe e deixe em infusão por 8–10 minutos.',
      'Coe com peneira fina.',
      'Adicione o limão e mel a gosto.',
      'Beba morno em jejum.',
    ],
  },
  reduzir_fome: {
    nome: 'Chá Saciante',
    emoji: '🌿',
    cor: '#5a7a3a',
    melhorHorario: '30 min antes das refeições',
    beneficios: 'O psyllium forma gel no estômago prolongando a saciedade e controlando picos de insulina.',
    ingredientes: [
      { item: 'Psyllium',          quantidade: '1 colher de chá' },
      { item: 'Chá verde (sachê)', quantidade: '1 sachê' },
      { item: 'Canela em pó',      quantidade: '½ colher de chá' },
      { item: 'Água quente',       quantidade: '300 ml' },
      { item: 'Gengibre em pó',    quantidade: '1 pitada' },
    ],
    preparo: [
      'Aqueça 300 ml de água a ~80°C.',
      'Adicione o sachê de chá verde por 3 minutos.',
      'Retire o sachê e adicione a canela.',
      'Misture o psyllium mexendo bem.',
      'Adicione o gengibre e beba imediatamente.',
      'Consuma 30 min antes das refeições.',
    ],
  },
  perder_peso: {
    nome: 'Chá Queima Ativa',
    emoji: '🔥',
    cor: '#195f52',
    melhorHorario: 'Pela manhã, antes do treino',
    beneficios: 'A combinação aumenta o metabolismo e potencializa a oxidação de gorduras.',
    ingredientes: [
      { item: 'Chá verde (sachê)',       quantidade: '1 sachê' },
      { item: 'Gengibre fresco ralado',  quantidade: '2 cm' },
      { item: 'Suco de limão',           quantidade: '1 limão' },
      { item: 'Água quente',             quantidade: '300 ml' },
      { item: 'Pimenta caiena',          quantidade: '1 pitadinha' },
    ],
    preparo: [
      'Aqueça a água a 80°C (não ferver).',
      'Coloque o sachê de chá verde por 3–4 min.',
      'Retire o sachê e adicione o gengibre.',
      'Esprema o limão e adicione a pimenta.',
      'Mexa bem e beba logo pela manhã.',
      'Ideal 20 min antes de atividade física.',
    ],
  },
  mais_energia: {
    nome: 'Chá Energia Verde',
    emoji: '⚡',
    cor: '#7a6a1a',
    melhorHorario: 'Pela manhã, ao acordar',
    beneficios: 'Regula o açúcar no sangue evitando picos e quedas de energia ao longo do dia.',
    ingredientes: [
      { item: 'Canela em pau',     quantidade: '1 pedaço pequeno' },
      { item: 'Chá verde (sachê)', quantidade: '1 sachê' },
      { item: 'Psyllium',         quantidade: '1 colher de chá' },
      { item: 'Água quente',       quantidade: '300 ml' },
      { item: 'Mel de abelha',     quantidade: '1 colher de chá' },
    ],
    preparo: [
      'Coloque a canela em pau na água morna 5 min.',
      'Esquente a água com a canela a 80°C.',
      'Adicione o sachê de chá verde por 3 min.',
      'Retire o sachê e a canela.',
      'Adicione o psyllium mexendo rápido.',
      'Finalize com mel e consuma ao acordar.',
    ],
  },
} as const

export const PLANO_7_DIAS = [
  { dia: 1, titulo: 'Detox e Início',           foco: 'Preparar o organismo',       receitaKey: 'desinchar'    as Objetivo, dica: 'Hoje é sobre preparar seu corpo. Beba bastante água e evite alimentos processados.' },
  { dia: 2, titulo: 'Hidratação Profunda',       foco: 'Células hidratadas',         receitaKey: 'desinchar'    as Objetivo, dica: 'Adicione uma fatia de limão na sua água para potencializar o detox.' },
  { dia: 3, titulo: 'Aceleração do Metabolismo', foco: 'Ativar a queima',            receitaKey: 'perder_peso'  as Objetivo, dica: 'Se possível faça 20 min de caminhada após o chá. A combinação é poderosa.' },
  { dia: 4, titulo: 'Controle da Fome',          foco: 'Saciedade duradoura',        receitaKey: 'reduzir_fome' as Objetivo, dica: 'Beba o chá 30 min antes do almoço e observe como você come menos.' },
  { dia: 5, titulo: 'Energia Sustentada',        foco: 'Sem picos de cansaço',       receitaKey: 'mais_energia' as Objetivo, dica: 'Observe seus níveis de energia. Evite açúcar à tarde para potencializar.' },
  { dia: 6, titulo: 'Consolidação',              foco: 'Manter o ritmo',             receitaKey: 'perder_peso'  as Objetivo, dica: 'Hoje é sobre consolidar os hábitos. Compare como se sente com o dia 1.' },
  { dia: 7, titulo: 'Celebração e Renovação',   foco: 'Avaliar e continuar',        receitaKey: 'reduzir_fome' as Objetivo, dica: 'Parabéns! Escreva 3 melhorias que notou e defina sua meta para a próxima semana.' },
]

export const COMPRAS_30_DIAS = [
  { ingrediente: 'Hibisco seco',        quantidade: '150g',          custo: 'R$ 12–18' },
  { ingrediente: 'Chá verde (sachês)',  quantidade: '60 sachês',     custo: 'R$ 16–24' },
  { ingrediente: 'Gengibre fresco',     quantidade: '500g',          custo: 'R$ 8–14' },
  { ingrediente: 'Limão siciliano',     quantidade: '30 unidades',   custo: 'R$ 18–25' },
  { ingrediente: 'Canela em pó',        quantidade: '100g',          custo: 'R$ 8–12' },
  { ingrediente: 'Canela em pau',       quantidade: '50g',           custo: 'R$ 6–10' },
  { ingrediente: 'Psyllium',           quantidade: '200g',          custo: 'R$ 25–40' },
  { ingrediente: 'Mel de abelha puro',  quantidade: '250g',          custo: 'R$ 18–28' },
  { ingrediente: 'Pimenta caiena',      quantidade: '50g',           custo: 'R$ 6–10' },
]

export const ERROS = [
  { erro: 'Pular o café da manhã',          explicacao: 'Aumenta o cortisol que favorece acúmulo de gordura abdominal.',           solucao: 'Tome o chá em jejum e 30 min depois faça um café leve com proteína.' },
  { erro: 'Beber pouca água',               explicacao: 'Com menos de 1,5L/dia o fígado não consegue queimar gordura eficientemente.', solucao: 'Mantenha uma garrafa de 500ml à vista. Meta: esvaziar 4× ao dia.' },
  { erro: 'Dormir menos de 7 horas',        explicacao: 'Eleva grelina (fome) em até 24% e reduz leptina (saciedade).',            solucao: 'Estabeleça horário fixo para dormir. Chá de hibisco ajuda no relaxamento.' },
  { erro: 'Comer rápido demais',            explicacao: 'O sinal de saciedade leva 20 min. Quem come rápido consome 30% a mais.',   solucao: 'Mastigue cada garfada 20 vezes. Coloque o garfo entre as mordidas.' },
  { erro: 'Usar adoçantes artificiais',     explicacao: 'Alteram a microbiota e aumentam desejo por doces enganando o cérebro.',    solucao: 'Prefira mel puro ou tâmaras. Reduza gradualmente a necessidade do doce.' },
  { erro: 'Treinar em jejum prolongado',    explicacao: 'Acima de 1h eleva cortisol, cataboliza músculo e desacelera metabolismo.', solucao: 'O chá é ideal 20 min antes de atividades leves. Para intensos, coma algo leve.' },
  { erro: 'Focar só no peso da balança',    explicacao: 'O peso flutua 1–3 kg ao dia. Confiança nele causa frustração e abandono.', solucao: 'Meça inchaço, energia, sono e como as roupas ficam — são mais honestos.' },
]

export const HORARIOS_REC = [
  { objetivo: 'Desinchar',     horario: '6h–7h',    freq: 'Em jejum, antes de qualquer alimento', obs: 'Aguardar 20–30 min antes de comer' },
  { objetivo: 'Reduzir Fome',  horario: '11h30',    freq: 'Antes do almoço (refeição principal)',  obs: 'Beber devagar em 5 minutos' },
  { objetivo: 'Perder Peso',   horario: '6h30–7h30', freq: 'Antes de caminhada ou treino',         obs: 'Ideal com 15–20 min de atividade' },
  { objetivo: 'Mais Energia',  horario: '7h–8h',    freq: 'Logo ao acordar, no lugar do café',     obs: 'Evite cafeína por 2h depois' },
]

// ── helpers ─────────────────────────────────────────────────────────────────

export function getSaudacao(nome: string) {
  const h = new Date().getHours()
  const p = h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite'
  return `${p}, ${nome}`
}

export function getDiaDoProtocolo(createdAt: string) {
  const start = new Date(createdAt); start.setHours(0,0,0,0)
  const today = new Date();          today.setHours(0,0,0,0)
  return Math.max(1, Math.floor((today.getTime() - start.getTime()) / 86400000) + 1)
}

export function calcularStreak(logs: { date: string; bebida_feita: boolean }[]) {
  const feitos = new Set(logs.filter(l => l.bebida_feita).map(l => l.date.slice(0,10)))
  let streak = 0
  const d = new Date(); d.setHours(0,0,0,0)
  while (feitos.has(d.toISOString().slice(0,10))) {
    streak++
    d.setDate(d.getDate() - 1)
  }
  return streak
}

export function getUltimos7Dias() {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i))
    return d.toISOString().slice(0,10)
  })
}
