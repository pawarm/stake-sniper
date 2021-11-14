export interface Balance {
  symbol: 'ADA' | 'BTC';
  origin: 'address';
  origin_details: string;
  balance: number;
  balance_state: 'available';
  last_update: number;
}
