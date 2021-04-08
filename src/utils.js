const currencyFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const formatCurrency = (n) => currencyFormat.format(n).slice(0, -3);

// eslint-disable-next-line import/prefer-default-export
export { formatCurrency };
