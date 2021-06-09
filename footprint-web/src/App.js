import { Layout, Menu, Typography } from 'antd';
import './App.css';
import Sidebar from './components/Sidebar';

const { Title } = Typography;
const { Header, Sider, Content, Footer } = Layout;

function App() {
  return (
    <div className="App">
      <Layout>
        <Header className="App-header">
          <Title level={2}>footprint</Title>
        </Header>
        <Layout height='100%'>
          <Sidebar />
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content 
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280
              }}
            >
              content
            </Content>
          </Layout>
        </Layout>
        <Footer>footer</Footer>
      </Layout>
    </div>
  );
}

export default App;
