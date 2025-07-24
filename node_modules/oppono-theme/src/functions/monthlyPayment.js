export function monthlyPayments(amountBorrowed, rate, months = 300) {
  const newRate = +rate / 100;
  return Math.round((amountBorrowed * newRate / 12 * Math.pow(1 + newRate / 12, months)) / (Math.pow(1 + newRate / 12, months) - 1));
}

