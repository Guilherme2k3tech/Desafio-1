import React from 'react';
import { Layout, Menu } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Container } from './styles';
import VaultContent from '../ContentInfo/conteudo';
  

const { Header, Content, Footer, Sider } = Layout;

const LayoutPage: React.FC = () => {
  return(

    <Container>

<Layout>
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
        <Menu.Item key="1" icon={<UserOutlined />}>
          nav 1
        </Menu.Item>
      </Menu>
    <Layout>
      <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
      <Content style={{ margin: '24px 16px 0' }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        <VaultContent/>
        </div>
      </Content>
    </Layout>
  </Layout>
    </Container>

  );




}

export default LayoutPage;