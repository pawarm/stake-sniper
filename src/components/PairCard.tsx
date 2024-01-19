import React, { useMemo } from 'react';
import { Avatar, Card, Col, Row, Space, Statistic, Tag } from 'antd';
import OsmosisLogo from '../assets/osmosis-icon.png'
import StrideLogo from '../assets/stride-icon.png'

export interface PairCardData {
  redemptionRate: number | undefined;
  price: number | undefined;
}

const PairCard: React.FC<PairCardData> = ({ redemptionRate, price }) => {
  const profit = useMemo(() => {
    if (!redemptionRate || !price) return undefined
    return (redemptionRate / price - 1) * (365/ 24)
  }, [redemptionRate, price])
  return (
    <Card>
      <Row justify="space-around">
        <Col>
          <Space>
            <Avatar size={'large'} src={StrideLogo} />
            <Statistic
              title="Redemption rate"
              loading={redemptionRate == undefined}
              precision={4}
              value={redemptionRate}
            />
          </Space>
        </Col>
        <Col>
          <Space>
            <Avatar size={'large'} src={OsmosisLogo} />
            <Statistic
              title="Price"
              loading={price == undefined}
              precision={4}
              value={price}
            />
          </Space>
        </Col>
        <Col>
          <Space>
            <Avatar size={'large'} src={OsmosisLogo} />
            <Statistic
              title="APY"
              loading={profit === undefined}
              value={(profit || 0) * 100}
              precision={2}
              suffix={'%'}
            />
             <Tag color="green">green</Tag>
          </Space>
        </Col>
      </Row>
    </Card>
  );
};

export default PairCard;