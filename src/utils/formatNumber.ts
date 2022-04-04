export const formatNumber = (number: number, decimal?: number) =>
  number.toFixed(decimal || 2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
