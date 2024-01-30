import { Chain } from '@chain-registry/types'
import { sendRequest } from '../utils/request';

export interface ChainData extends Chain {
    name: string;
    path: string;
    symbol: string;
    display: string;
    denom: string;
    decimals: number;
    coingecko_id: string;
    image: string;
    height: number;
    best_apis: {
      rest: { address: string; provider: string; }[];
      rpc: { address: string; provider: string; }[];
    };
    proxy_status: { rest: boolean; rpc: boolean; };
    versions: object;
    cosmwasm_enabled: boolean;
    params: {
      authz: boolean;
      actual_block_time: number;
      actual_blocks_per_year: number;
      unbonding_time: number;
      max_validators: number;
      minting_epoch_provision: number;
      epoch_duration: number;
      year_minting_provision: number;
      base_inflation: number;
      calculated_apr: number;
      community_tax: number;
      estimated_apr: number;
      staking: {
        unbonding_time: string;
        max_validators: number;
        max_entries: number;
        historical_entries: number;
        bond_denom: string;
        min_commission_rate: string;
      };
      slashing: {
        signed_blocks_window: string;
        min_signed_per_window: string;
        downtime_jail_duration: string;
        slash_fraction_double_sign: string;
        slash_fraction_downtime: string;
      };
      distribution: {
        community_tax: string;
        base_proposer_reward: string;
        bonus_proposer_reward: string;
        withdraw_addr_enabled: boolean;
      };
      mint: {
        mint_denom: string;
        genesis_epoch_provisions: string;
        epoch_identifier: string;
        reduction_period_in_epochs: string;
        reduction_factor: string;
        distribution_proportions: {
          staking: string;
          pool_incentives: string;
          developer_rewards: string;
          community_pool: string;
        };
        weighted_developer_rewards_receivers: {
          address: string;
          weight: string;
        }[];
        minting_rewards_distribution_start_epoch: string;
      };
      current_block_height: string;
      bonded_ratio: number;
      bonded_tokens: string;
      annual_provision: string;
    }
    services: {
      staking_rewards: {
        name: string;
        slug: string;
        symbol: string;
      };
    };
    prices: { coingecko: { [symbol: string]: { usd: number; }; }; };
    assets: {
      name: string;
      description?: string;
      symbol: string;
      denom: string;
      decimals: number;
      coingecko_id?: string;
      base: { denom: string; exponent: number; aliases?: string[]; };
      display?: { denom: string; exponent: number; };
      denom_units: { denom: string; exponent: number; aliases?: string[]; } 
      logo_URIs: { png?: string; svg?: string; };
      image: string;
      prices?: { coingecko: { usd: number; }; };
    }[];
}

export const chainDataRequest = async (chainName: string) => {
  const response = await sendRequest<{ chain: ChainData }>({
    url: `https://chains.cosmos.directory/${chainName}`
  })
  return response.data.chain
}
