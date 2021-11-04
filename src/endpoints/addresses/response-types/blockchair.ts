import { BlockchairADAData } from "./ADA";

export interface BlockchairResponse {
  data: BlockchairADAData;
  context: {
    code:
      | 200
      | 400
      | 404
      | 402
      | 429
      | 435
      | 436
      | 437
      | 430
      | 434
      | 503
      | 500
      | 503;
    error: string;
    state: number;
    state_layer_2: number;
    results: number;
    limit: number;
    offset: number;
    rows: number;
    total_rows: number;
    api: {
      version: string;
      last_major_update: string;
      next_major_update: string;
      documentation: string;
      notice: string;
    }[];
    cache: {
      live: boolean;
      until: string;
    }[];
    request_cost: number;
  };
}
