import React from 'react';
import { Avatar, Card, Flex, Space, Statistic, Tooltip } from 'antd';
// import OsmosisLogo from '../assets/osmosis-icon.png'
// import StrideLogo from '../assets/stride-icon.png'
// import { Card, Avatar, Stat, SimpleGrid, Box, StatArrow, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/react'
// import { PoolCard } from '@interchain-ui/react'

export interface PairCardData {
  tokenName: string | undefined;
  tokenUrl: string | undefined;
  tokenAPR: number | undefined;
  lspName: string | undefined;
  lstUrl: string | undefined;
  redemptionRate: number | undefined;
  poolName: string | undefined;
  price: number | undefined;
  profit: number | undefined;
}

const PairCard: React.FC<PairCardData> = ({
  tokenName,
  tokenUrl,
  tokenAPR,
  lspName,
  lstUrl,
  redemptionRate,
  poolName,
  price,
  profit
}) => {
  
  return (
    <Card title={`${tokenName} ${((tokenAPR ?? NaN) * 100).toFixed(2)}%`}>
      <Flex justify="center">
      <Space direction="horizontal" style={{ justifyContent: 'space-evenly', width: '100%'}}>
        <Space direction="horizontal">
        <Tooltip title={lspName} placement="top">
          <Avatar
              shape="square"
              // size='lg'
              src={tokenUrl}
          />
          </Tooltip>
          
          <Statistic
            title="Redemption rate"
                loading={redemptionRate == undefined}
                precision={4}
                value={redemptionRate}
          />
        </Space>
        <Space direction="horizontal">
        <Tooltip title={poolName} placement="top">
          <Avatar
              shape="square"
              // size='lg'
              src={lstUrl}
          />
          </Tooltip>
          <Statistic
            title="Price"
            loading={price == undefined}
            precision={4}
            value={price}
          />
        </Space>
        <Space direction="horizontal">
        <Avatar
              shape="square"
              // size='lg'
              // src={OsmosisLogo}
            />
          <Statistic
              title="APR"
              loading={profit === undefined}
              value={(profit || 0) * 100}
              precision={2}
              suffix={'%'}
            />
        </Space>
      </Space>          
      </Flex>  
    </Card>

  );
};

export default PairCard;