export interface BlockchairBTCLikeData {
  [address: string]: {
    address: {
      type:
        | 'pubkey'
        | 'pubkeyhash'
        | 'scripthash'
        | 'multisig'
        | 'nulldata'
        | 'nonstandard'
        | 'witness_v0_scripthash'
        | 'witness_v0_keyhash'
        | 'witness_unknown';
      script_hex: string;
      balance: number;
      balance_usd: number;
      received: number;
      received_usd: number;
      spent: number;
      spent_usd: number;
      output_count: number;
      unspent_output_count: number;
      first_seen_receiving: string;
      last_seen_receiving: string;
      first_seen_spending: string | null;
      last_seen_spending: string | null;
      transaction_count: number;
      scripthash_type: string | null;
    };
    transactions: {
      block_id: number;
      hash: string;
      time: string;
      balance_change: number;
    }[];
    utxo: {
      block_id: number;
      transaction_hash: string;
      index: number;
      value: number;
    }[];
  };
}
