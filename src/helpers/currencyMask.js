export const currencyMask = (valor) => {
  let value = valor;
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d)(\d{2})$/, "$1,$2");
  value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");
  
  if (value.length === 0) return ''

  return `R$ ${value}`;
};