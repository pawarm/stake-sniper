export type SupportedToken = 
| 'ATOM'
| 'OSMO'
| 'JUNO'
| 'STARS'
| 'LUNA'
| 'CMDX'
| 'EVMOS'
| 'INJ'
| 'SOMM'
| 'UMEE';

export type SupportedLSP = 'stride' | 'quicksilver';

export interface Token {
  chainName: string;
  symbol: SupportedToken;
  ibcDenom: string;
}

type SupportedTokenList = {
  [T in SupportedToken]: Token;
}

export interface LST extends Token {
  lstSymbol: string;
  // lstIbcDenom: string;
}

type SupportedLSPList = {
  [LSP in SupportedLSP]: LST[];
}

export const supportedTokens: SupportedTokenList = {
  'ATOM': {
    chainName: 'cosmoshub',
    symbol: 'ATOM',
    ibcDenom: "ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2"
  },
  'OSMO': {
    chainName: 'osmosis',
    symbol: 'OSMO',
    ibcDenom: "ibc/D24B4564BCD51D3D02D9987D92571EAC5915676A9BD6D9B0C1D0254CB8A5EA34"
  },
  'JUNO': {
    chainName: 'juno',
    symbol: 'JUNO',
    ibcDenom: 'ibc/DA356E369C3E5CF6A9F1DCD99CE8ED55FBD595E676A5CF033CE784C060492D5A'
  },
  'STARS': {
    chainName: 'stargaze',
    symbol: 'STARS',
    ibcDenom: 'ibc/7EAE5BEF3A26B64AFBD89828AFDDB1DC7024A0276D22745201632C40E6E634D0'
  },
  'LUNA': {
    chainName: 'terra',
    symbol: 'LUNA',
    ibcDenom: 'ibc/E61BCB1126F42A2ED73B4CEA2221C9635BC2102F0417543C38071779F991942E'
  },
  'CMDX': {
    chainName: 'comdex',
    symbol: 'CMDX',
    ibcDenom: 'ibc/EB66980014602E6BD50A1CB9FFB8FA694DC3EC10A48D2C1C649D732954F88D4A'
  },
  'EVMOS': {
    chainName: 'evmos',
    symbol: 'EVMOS',
    ibcDenom: 'ibc/4B322204B4F59D770680FE4D7A565DDC3F37BFF035474B717476C66A4F83DD72'
  },
  'INJ': {
    chainName: 'injective',
    symbol: 'INJ',
    ibcDenom: 'ibc/A7454562FF29FE068F42F9DE4805ABEF54F599D1720B345D6518D9B5C64EA6D2'
  },
  'SOMM': {
    chainName: 'sommelier',
    symbol: 'SOMM',
    ibcDenom: 'ibc/B86EFF6D227E3E33D7E3B5E65D0C1BB5BD79CCB56D35A9D824F0DD5D52CA43BA'
  },
  'UMEE': {
    chainName: 'umee',
    symbol: 'UMEE',
    ibcDenom: 'ibc/1A2271226209D309902AFF4F21BD21237CB514DD24EA2EE0423BF74C6135D8B8'
  }
}


export const supportedLSPs: SupportedLSPList = {
  'stride': [
    {
      ...supportedTokens['ATOM'],
      lstSymbol: 'stATOM',
      // lstIbcDenom: "ibc/C140AFD542AE77BD7DCC83F13FDD8C5E5BB8C4929785E6EC2F4C636F98F17901"
    },
    {
      ...supportedTokens['OSMO'],
      lstSymbol: 'stOSMO',
      // lstIbcDenom: "ibc/D176154B0C63D1F9C6DCFB4F70349EBF2E2B5A87A05902F57A6AE92B863E9AEC"
    },
    {
      ...supportedTokens['STARS'],
      lstSymbol: 'stSTARS',
    },
    {
      ...supportedTokens['JUNO'],
      lstSymbol: 'stJUNO',
    },
    {
      ...supportedTokens['LUNA'],
      lstSymbol: 'stLUNA',
    },
    {
      ...supportedTokens['EVMOS'],
      lstSymbol: 'stEVMOS',
    },
    {
      ...supportedTokens['INJ'],
      lstSymbol: 'stINJ',
    },
    {
      ...supportedTokens['UMEE'],
      lstSymbol: 'stUMEE',
    },
    {
      ...supportedTokens['CMDX'],
      lstSymbol: 'stCMDX',
    },
    {
      ...supportedTokens['SOMM'],
      lstSymbol: 'stSOMM',
    }
  ],
  'quicksilver': [
    {
      ...supportedTokens['ATOM'],
      lstSymbol: 'qATOM',
      // lstIbcDenom: "ibc/C140AFD542AE77BD7DCC83F13FDD8C5E5BB8C4929785E6EC2F4C636F98F17901"
    },
    {
      ...supportedTokens['OSMO'],
      lstSymbol: 'qOSMO',
    },
    {
      ...supportedTokens['SOMM'],
      lstSymbol: 'qSOMM',
    },
    {
      ...supportedTokens['JUNO'],
      lstSymbol: 'qJUNO',
    },
    {
      ...supportedTokens['STARS'],
      lstSymbol: 'qSTARS',
    }
  ]
}
