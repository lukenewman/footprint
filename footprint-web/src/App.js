import { Layout, Typography } from 'antd';
import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import EmissionRow from './components/EmissionRow';

const { Title } = Typography;
const { Header, Content, Footer } = Layout;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      categories: [],
      selectedCategory: null,
      emissionEntries: {}, // { EmissionType.id: value entered into InputNumber }
      emissionResults: {}  // { EmissionType.id: emissions calculated from API }
    };
  }

  // Load the categories and emission types from the API
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
      );
  }

  // Callback used by Sidebar to navigate between categories
  navigateToCategory = (category) => {
    this.setState({
      selectedCategory: category
    });
  }

  /* 
    Callback used by EmissionRow to capture user input and call the API
      to calculate the emissions.

    Known issue: if a user enters a longer number (3-4 digits), the API
      calls may return at different times and overwrite others. Potential
      fix could be cancelling in-flight calculation requests when
      the value for the same emissionTypeID is updated before the prior
      request returns.
  */
  onInputChanged = (value, emissionTypeID) => {
    let { emissionEntries, emissionResults } = this.state;
    if (value === null) {
      delete emissionEntries[emissionTypeID];
      delete emissionResults[emissionTypeID];
      this.setState({
        emissionEntries: emissionEntries,
        emissionResults: emissionResults
      });
    } else {
      emissionEntries[emissionTypeID] = value;
      fetch(`https://lh2lo0.deta.dev/calculate/${emissionTypeID}?value=${value}`)
        .then(res => res.json())
        .then(
          (result) => {
            emissionResults[emissionTypeID] = result.emissions;
            this.setState({
              emissionEntries: emissionEntries,
              emissionResults: emissionResults
            });
          },
          (error) => {
            console.log('error calculating emissions', error);
          }
        );
    }
  }

  // Used by the footer to display total emissions based on the user's input
  calculateTotalEmissions = () => {
    let { emissionResults } = this.state;
    let sum = 0;
    for (let key in emissionResults) {
      sum += emissionResults[key];
    }
    return sum;
  }

  render() {
    const { error, isLoaded, categories, selectedCategory, emissionEntries } = this.state;

    let content;
    if (error) {
      content = <div>Error: {error}</div>;
    } else if (!isLoaded) {
      content = <div>Loading...</div>;
    } else {
      content = (
        <Layout style={{height: '100%'}}>
          <Header className="App-header">
            <Title level={2}>footprint</Title>
          </Header>
          <Layout>
            <Sidebar 
              categories={categories}
              onCategoryClicked={this.navigateToCategory}
            />
            <Layout style={{ padding: '0 24px 24px' }}>
              <Content 
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: '100%'
                }}
              >
                <Title level={3} style={{padding: 24}}>{selectedCategory.name}</Title>
                {selectedCategory.emission_types.map((emission_type) => (
                  <EmissionRow 
                    key={emission_type.id}
                    emissionType={emission_type}
                    existingInput={emissionEntries[emission_type.id]}
                    onInputChanged={this.onInputChanged}
                  />
                ))}
              </Content>
            </Layout>
          </Layout>
          <Footer style={{ backgroundColor: '#fff' }}>
            <Title level={2}>Total Emissions: {this.calculateTotalEmissions().toLocaleString()} kgCO₂ / year</Title>
          </Footer>
        </Layout>
      );
    }

    return <div className="App">{content}</div>
  }
}

export default App;
