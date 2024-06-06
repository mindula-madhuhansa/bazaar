export const formatCurrency = (price: number) => {
  return new Intl.NumberFormat("US", { currency: "USD" }).format(price);
};
