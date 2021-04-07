const currencyFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const formatCurrency = (n) => currencyFormat.format(n);

// eslint-disable-next-line import/prefer-default-export
export { formatCurrency };
