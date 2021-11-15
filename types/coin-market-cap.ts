import { CoinMarketCapMapItem } from './cryptocurrency-map';

export interface CoinMarketCapResponse {
  data: CoinMarketCapMapItem[];
  status: {
    timestamp: string;
    error_code: 0 | 200 | 400 | 401 | 402 | 403 | 429 | 500;
    error_message: string;
    elapsed: number;
    credit_count: number;
  };
}
