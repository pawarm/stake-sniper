export const CMCMapSelect = (CMCCurrencyMap: any[]) => {
  return CMCCurrencyMap.map((currency) => {
    return {
      label: currency.name + "(" + currency.symbol + ")",
      value: currency.id,
    };
  });
};
