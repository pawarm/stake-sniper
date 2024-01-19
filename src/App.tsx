import React from 'react';
import { Layout } from 'antd';
import Sidebar from './components/Sidebar';
import PairCard from './components/PairCard';
import ListSelect from './components/ListSelect';
import { useAppStateContext } from './contexts/AppStateContext';

const { Content, Footer } = Layout;

const App: React.FC = () => {
  const { cardsData } = useAppStateContext()
  return (
    <Layout hasSider>
      <Sidebar />
      <Layout style={{ marginLeft: 200 }}>
        <Content style={{ margin: '24px' }}>
          {cardsData.map((cardData) => <PairCard {...cardData} />)}
          {/* <ListSelect /> */}

        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;