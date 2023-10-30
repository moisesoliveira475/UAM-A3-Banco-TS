export function formatReal(n: number) {
  return "R$ " + n.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+,)/g, "$1.");
}