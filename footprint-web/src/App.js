import { Layout, Typography, InputNumber, Row, Col } from 'antd';
import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar';

const { Title } = Typography;
const { Header, Content, Footer } = Layout;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      categories: [],
      selectedCategory: null
    };

    this.navigateToCategory = this.navigateToCategory.bind(this);
  }

  componentDidMount() {
    fetch("https://lh2lo0.deta.dev/categories")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            categories: result.categories,
            selectedCategory: result.categories[0]
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  navigateToCategory(category) {
    this.setState({
      selectedCategory: category
    });
  }

  render() {
    const { error, isLoaded, categories, selectedCategory } = this.state;

    let content;
    if (error) {
      content = <div>Error: {error}</div>;
    } else if (!isLoaded) {
      content = <div>Loading...</div>;
    } else {
      content = (
        <Layout>
          <Header className="App-header">
            <Title level={2}>footprint</Title>
          </Header>
          <Layout height='100%'>
            <Sidebar 
              categories={categories}
              onCategoryClicked={this.navigateToCategory}
            />
            <Layout style={{ padding: '0 24px 24px' }}>
              <Content 
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 280
                }}
              >
                <Title level={3} style={{padding: 24}}>{selectedCategory.name}</Title>
                {selectedCategory.emission_types.map((emission_type, index) => (
                  <div key={index}>
                    <Row>
                      <Col span={6} offset={4}>
                        <Title level={4}>{emission_type.name}</Title>
                      </Col>
                      <Col span={6}>
                        <InputNumber defaultValue={0}></InputNumber>
                        kgCO2/y
                      </Col>
                    </Row>
                  </div>
                ))}
              </Content>
            </Layout>
          </Layout>
          <Footer>footer</Footer>
        </Layout>
      );
    }

    return <div className="App">{content}</div>
  }
}

export default App;
