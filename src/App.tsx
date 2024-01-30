import React from 'react';
// import Sidebar from './components/Sidebar';
import PairCard from './components/PairCard';
// import ListSelect from './components/ListSelect';
import { useAppStateContext } from './contexts/AppStateContext';
import { Breadcrumb, Layout, Menu, Space, theme } from 'antd'
// import { Header, Content, Footer } from 'antd/es/layout/layout';
// const { Content, Footer } = Layout;
const { Header, Content, Footer } = Layout;

const items = new Array(15).fill(null).map((_, index) => ({
  key: index + 1,
  label: `nav ${index + 1}`,
}));
const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { cardsData } = useAppStateContext()
  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: '0 48px' }}>
        <Breadcrumb items={[{ title: 'Sample' }, { title: 'App' }]} style={{ margin: '16px 0' }} />
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <Space direction="vertical" size={'middle'} style={{ width: '100%' }}>
         {cardsData.map((cardData) => <PairCard {...cardData} />)}
         </Space>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Unstake Cycle {new Date().getFullYear()} Created by Paweł Armatys with Ant Design
      </Footer>
    </Layout>
  //   <Layout>

  //   {/* <Box> */}
      
  //   {/* </Box> */}
  //  </Layout>

  );
};

export default App;