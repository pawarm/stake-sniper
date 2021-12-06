export interface CoinMarketCapPlatform {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  token_address: string;
}

export interface CoinMarketCapQuotes {
  [id: number]: {
    id: number;
    name: string;
    symbol: string;
    slug: string;
    is_active: 0 | 1;
    is_fiat: 0 | 1;
    cmc_rank: number;
    num_market_pairs: number;
    circulating_supply: number;
    total_supply: number;
    market_cap_by_total_supply: number;
    max_supply: number;
    date_added: string;
    tags: [] | ['mineable'];
    platform: null | CoinMarketCapPlatform;
    last_updated: string;
    quote: {
      [fiat_symbol: string]: {
        price: number;
        volume_24h: number;
        volume_change_24h: number;
        volume_24h_reported: number;
        volume_7d: number;
        volume_7d_reported: number;
        volume_30d: number;
        volume_30d_reported: number;
        market_cap: number;
        market_cap_dominance: number;
        fully_diluted_market_cap: number;
        percent_change_1h: number;
        percent_change_24h: number;
        percent_change_7d: number;
        percent_change_30d: number;
        last_updated: string;
      };
    };
  };
}

export interface CoinMarketCapMapItem {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  is_active: 0 | 1;
  status: 'active' | 'inactive' | 'untracked';
  first_historical_data: string;
  last_historical_data: string;
  platform: null | CoinMarketCapPlatform;
}

export interface CoinMarketCapResponse {
  data: CoinMarketCapMapItem[] | CoinMarketCapQuotes;
  status: {
    timestamp: string;
    error_code: 0 | 200 | 400 | 401 | 402 | 403 | 429 | 500;
    error_message: string;
    elapsed: number;
    credit_count: number;
  };
}
