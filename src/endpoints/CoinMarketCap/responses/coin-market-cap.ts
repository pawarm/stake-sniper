export interface CoinMarketCapResponse {
  data: any;
  status: {
    timestamp: string;
    error_code: 200 | 400 | 401 | 402 | 403 | 429 | 500;
    error_message: string;
    elapsed: number;
    credit_count: number;
  };
}
