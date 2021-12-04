export interface Balance {
  symbol: string;
  balance: number;
  balance_state: 'available';
}

export interface AddresesBalances {
  [address: string]: Balance[];
}

export interface ExchangeBalances {
  [exchange: string]: Balance[];
}

export interface ManualBalances {
  [note: string]: Balance[];
}
export interface AllBalances {
  addresses: AddresesBalances;
  exchanges: ExchangeBalances;
  manual: ManualBalances;
}
