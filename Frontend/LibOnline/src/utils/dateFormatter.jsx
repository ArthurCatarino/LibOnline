/**
 * Converte uma data no formato ISO para o formato brasileiro (dd/mm/aaaa).
 * @param {string} dataISO - A string de data no formato ISO (ex: "2025-06-28T02:59:59.000Z").
 * @returns {string} A data formatada como "dd/mm/aaaa" ou um placeholder se a entrada for nula.
 */
export function formatarData(dataISO) {
  // Retorna um placeholder se a data de entrada for nula, indefinida ou uma string vazia
  if (!dataISO) {
    return "---";
  }

  const data = new Date(dataISO);

  // Verifica se a data é válida após a conversão
  if (isNaN(data.getTime())) {
    return "Data inválida";
  }

  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC", // Importante para tratar a data como ela veio (UTC)
  };

  return data.toLocaleDateString("pt-BR", options);
}
