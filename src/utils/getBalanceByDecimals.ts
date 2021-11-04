export const getBalanceByDecimals = (balance: string, decimals: number) => {
  var numBalance = parseFloat(balance);
  for (let i = decimals; i > 0; i--) numBalance /= 10;
  return numBalance;
};
