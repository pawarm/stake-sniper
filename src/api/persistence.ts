import { sendRequest } from "../utils/request";

export type PersistenceHostZoneData = {}

export const persistenceHostZoneDataRequest = async () => {
  const response = await sendRequest<PersistenceHostZoneData>({
    // url: 'https://lcd.quicksilver.zone/quicksilver/interchainstaking/v1/zones'
    // https://persistence-api.polkachu.com/pstake/liquidstakeibc/v1beta1/exchange_rate/cosmoshub-4
    //https://persistence-api.polkachu.com/pstake/liquidstakeibc/v1beta1/host_chains
  })

  return response.data
}
