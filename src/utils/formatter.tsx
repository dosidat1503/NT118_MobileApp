export const formatCurrency = (value: number) => {
  // Format the value using the Vietnamese locale
  const formattedValue = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);

  // Remove the currency symbol and add it manually
  return formattedValue.replace('₫', 'VNĐ').replace('.', ',');
};