export interface BlockchairADAData {
  [address: string]: {
    address: {
      caAddress: {
        unCAddress: string;
      };
      caType: 'CPubKeyAddress';
      caChainTip: {
        ctBlockNo: number;
        ctSlotNo: number;
        ctBlockHash: string;
      };
      caTxNum: number;
      caBalance: {
        getCoin: string;
      };
      caTotalInput: {
        getCoin: string;
      };
      caTotalOutput: {
        getCoin: string;
      };
      caTotalFee: {
        getCoin: string;
      };
      caTxList: {
        ctbId: string;
        ctbTimeIssued: number;
        ctbInputs: {
          ctaAddress: {
            unCAddress: string;
          };
          ctaAmount: {
            getCoin: string;
          };
          ctaTxHash: string;
          ctaTxIndex: number;
        }[];
        ctbOutputs: {
          ctaAddress: {
            unCAddress: string;
          };
          ctaAmount: {
            getCoin: string;
          };
          ctaTxHash: string;
          ctaTxIndex: number;
        }[];
        ctbInputSum: {
          getCoin: string;
        };
        ctbOutputSum: {
          getCoin: string;
        };
        ctbFees: {
          getCoin: string;
        };
      }[];
    };
  };
}
