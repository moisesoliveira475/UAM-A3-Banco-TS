export function formatCreditCardNumber(number: string) {
  return number.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, "$1 $2 $3 $4");
}