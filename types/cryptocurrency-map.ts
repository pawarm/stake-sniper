export interface CoinMarketCapMapItem {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  is_active: 0 | 1;
  status: 'active' | 'inactive' | 'untracked';
  first_historical_data: string;
  last_historical_data: string;
  platform: {
    id: number;
    name: string;
    symbol: string;
    slug: string;
    token_address: string;
  };
}
