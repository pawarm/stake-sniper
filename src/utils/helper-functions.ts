export const getBalanceByDecimals = (balance: string, decimals: number) => {
  var numBalance = parseFloat(balance);
  for (let i = decimals; i > 0; i--) numBalance /= 10;
  return numBalance;
};

export const getAddressesFromLS = (currency: string) =>
  JSON.parse(localStorage.getItem(currency + 'Addresses') || '[]') as string[];

export const setAddressesInLS = (currency: string, addresses: string[]) =>
  localStorage.setItem(currency + 'Addresses', JSON.stringify(addresses));

export const addAddressToLS = (currency: string, address: string) => {
  const addresses = getAddressesFromLS(currency);
  if (!addresses.includes(address)) {
    addresses.push(address);
    setAddressesInLS(currency, addresses);
  }
};

export const removeAddressFromLS = (currency: string, address: string) => {
  const addresses = getAddressesFromLS(currency);
  setAddressesInLS(
    currency,
    addresses.filter((a) => a !== address)
  );
};
