export interface Balance {
  symbol:
    | 'ADA'
    | 'BTC'
    | 'BCH'
    | 'LTC'
    | 'BSV'
    | 'DOGE'
    | 'DASH'
    | 'GRS'
    | 'ZEC'
    | 'XEC';
  origin: 'address';
  origin_details: string;
  balance: number;
  balance_state: 'available';
  last_update: number;
}
