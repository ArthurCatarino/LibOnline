/**
 * Converte uma string para lowercase e remove todos os acentos e diacríticos.
 * Exemplo: "Disponível" se torna "disponivel".
 * @param {string | null | undefined} texto - O texto de entrada a ser normalizado.
 * @returns {string} O texto normalizado ou uma string vazia se a entrada for nula.
 */
export function normalizarTexto(texto) {
  // Retorna uma string vazia se a entrada for nula para evitar erros
  if (!texto) return "";

  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
