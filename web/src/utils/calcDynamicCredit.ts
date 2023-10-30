export function calcDynamicCredit(createdAt: Date, balance: number): number {
  const nowDate = new Date();
  const mesesDesdeCriacao = (nowDate.getFullYear() - createdAt.getFullYear()) * 12 + (nowDate.getMonth() - createdAt.getMonth());
  const limiteCreditoBase = 1000; // Limite de crédito base
  const aumentoPorMes = 100; // Aumento de crédito por mês
  const aumentoPorSaldo = 0.1; // Aumento de crédito percentual com base no saldo

  if (balance === 0 && nowDate.toDateString() === createdAt.toDateString()) {
    return limiteCreditoBase; // Retorna 1000 se o saldo for 0 e a data for hoje
  } else {
    // Calcula o aumento com base no tempo de criação
    const aumentoPorTempo = aumentoPorMes * mesesDesdeCriacao;

    // Calcula o aumento proporcional ao saldo
    const aumentoProporcional = aumentoPorSaldo * balance;

    // Calcula o limite de crédito total
    const limiteCredito = limiteCreditoBase + aumentoPorTempo + aumentoProporcional;

    return limiteCredito;
  }
}