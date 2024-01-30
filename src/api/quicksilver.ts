import { sendRequest } from "../utils/request";

export type QuicksilverHostZoneData = {
  zones: {
    connection_id: string;
    chain_id: string;
    deposit_address: {
        address: string;
        balance: {
          denom: string;
          amount: string;
        }[];
        port_name: string;
        withdrawal_address: string;
        balance_waitgroup: number;
    };
    withdrawal_address: {
      address: string;
      balance: {
        denom: string;
        amount: string;
      }[];
      port_name: string;
      withdrawal_address: string;
      balance_waitgroup: number;
    };
    performance_address: {
      address: string;
      balance: {
        denom: string;
        amount: string;
      }[];
      port_name: string;
      withdrawal_address: string;
      balance_waitgroup: number;
    };
    delegation_address: {
      address: string;
      balance: {
          denom: string;
          amount: string;
      }[];
      port_name: string;
      withdrawal_address: string;
      balance_waitgroup: number;
    };
    account_prefix: string;
    local_denom: string;
    base_denom: string;
    redemption_rate: string;
    last_redemption_rate: string;
    validators: never[];
    aggregate_intent: {
        valoper_address: string;
        weight: string;
    }[];
    multi_send: boolean;
    liquidity_module: boolean;
    withdrawal_waitgroup: number;
    ibc_next_validators_hash: string;
    validator_selection_allocation: string;
    holdings_allocation: string;
    last_epoch_height: string;
    tvl: string;
    unbonding_period: string;
    messages_per_tx: string;
    decimals: string;
    unbonding_enabled: boolean;
    deposits_enabled: boolean;
    return_to_sender: boolean;
    is_118: boolean;
    subzoneInfo: null;
  }[];
  stats: {
    chain_id: string;
    deposited: string;
    deposits: string;
    depositors: string;
    delegated: string;
    supply: string;
    distance_to_target: string;
  }[];
  pagination: {
      next_key: null;
      total: string;
  };
}

export const quicksilverHostZoneDataRequest = async () => {
  const response = await sendRequest<QuicksilverHostZoneData>({
    url: 'https://lcd.quicksilver.zone/quicksilver/interchainstaking/v1/zones'
  })
  return response.data
}
