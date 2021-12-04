import { getADABalanceFromAPI } from 'endpoints/addresses/ADA';
import { getBTCLikeBalancesFromAPI } from 'endpoints/addresses/BTCLike';
import { AddresesBalances } from 'types/balance';

export type supportedCurrencyAddressesSymbols =
  | 'BTC'
  | 'BCH'
  | 'LTC'
  | 'BSV'
  | 'DOGE'
  | 'DASH'
  | 'GRS'
  | 'ZEC'
  | 'XEC'
  | 'ADA';

const supportedCurrencyAddresses: {
  label: string;
  value: supportedCurrencyAddressesSymbols;
  balanceFunction: (
    addresses: string[],
    symbol: supportedCurrencyAddressesSymbols
  ) => Promise<AddresesBalances | undefined>;
}[] = [
  {
    label: 'Bitcoin',
    value: 'BTC',
    balanceFunction: getBTCLikeBalancesFromAPI
  },
  {
    label: 'Bitcoin Cash',
    value: 'BCH',
    balanceFunction: getBTCLikeBalancesFromAPI
  },
  {
    label: 'Litecoin',
    value: 'LTC',
    balanceFunction: getBTCLikeBalancesFromAPI
  },
  {
    label: 'Bitcoin SV',
    value: 'BSV',
    balanceFunction: getBTCLikeBalancesFromAPI
  },
  {
    label: 'Dogecoin',
    value: 'DOGE',
    balanceFunction: getBTCLikeBalancesFromAPI
  },
  // { label: "Polkadot", value: "DOT" },
  // { label: "Ripple", value: "XRP" },
  // { label: "Ethereum", value: "ETH" },
  {
    label: 'Groestlcoin',
    value: 'GRS',
    balanceFunction: getBTCLikeBalancesFromAPI
  },
  { label: 'Zcash', value: 'ZEC', balanceFunction: getBTCLikeBalancesFromAPI },
  { label: 'Dash', value: 'DASH', balanceFunction: getBTCLikeBalancesFromAPI },
  // { label: "Stellar", value: "XLM" },
  { label: 'Cardano', value: 'ADA', balanceFunction: getADABalanceFromAPI },
  // { label: "Tezos", value: "XTZ" },
  { label: 'eCash', value: 'XEC', balanceFunction: getBTCLikeBalancesFromAPI }
  // { label: "Algorand", value: "ALGO" },
  // { label: "Tron", value: "TRX" },
  // { label: "Cosmos", value: "ATOM" },
  // { label: "Binance Coin", value: "BNB" },
];

export default supportedCurrencyAddresses;
