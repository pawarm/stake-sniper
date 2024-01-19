import { sendRequest } from "../utils/request";

export type StrideHostZoneData = {
  host_zone: {
    chain_id: string;
    bech32prefix: string;
    connection_id: string
    transfer_channel_id: string;
    ibc_denom: string;
    host_denom: string;
    unbonding_period: 21;
    validators:{
      name: string;
      address: string;
      weight: string;
      delegation: string;
      slash_query_progress_tracker: string;
      slash_query_checkpoint: string;
      shares_to_tokens_rate: string;
      delegation_changes_in_progress: string;
      slash_query_in_progress: boolean;
    }[];
    deposit_address: string
    withdrawal_ica_address: string
    fee_ica_address: string
    delegation_ica_address: string
    redemption_ica_address: string;
    community_pool_deposit_ica_address: string
    community_pool_return_ica_address: string
    community_pool_stake_holding_address: string
    community_pool_redeem_holding_address: string
    total_delegations: string
    last_redemption_rate: string
    redemption_rate: string
    min_redemption_rate: string
    max_redemption_rate: string
    min_inner_redemption_rate: string
    max_inner_redemption_rate: string
    lsm_liquid_stake_enabled: boolean
    halted: boolean
  }[];
}

export const strideHostZoneDataRequest = async () => {
  const response = await sendRequest<StrideHostZoneData>({
    url: 'https://stride-api.polkachu.com/Stride-Labs/stride/stakeibc/host_zone'
  })
  return response.data
}

export const getStrideRedemptionRate = (data: StrideHostZoneData, tokenDenom: string) => {
  const zone = data.host_zone.find((zone) => zone.ibc_denom === tokenDenom)
  return Number(zone?.redemption_rate)
}

