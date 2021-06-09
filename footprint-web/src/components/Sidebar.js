import React from 'react';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';

const { Sider } = Layout;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      categories: []
    };

    this.menuItemClicked = this.menuItemClicked.bind(this);
  }

  componentDidMount() {
    fetch("https://lh2lo0.deta.dev/categories")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            categories: result.categories
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

  menuItemClicked({ item, key, keyPath, domEvent }) {
    const { categories } = this.state;
    console.log("category " + categories[key] + " clicked");
  }

  render() {
    const { error, isLoaded, categories } = this.state;

    let content;
    if (error) {
      content = <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      content = <div>Loading...</div>;
    } else {
      content = (
        <Menu
          mode="inline"
          defaultSelectedKeys={['0']}
          style={{ height: '100%', borderRight: 0 }}
          onClick={this.menuItemClicked}
        >
          {categories.map((category, index) => (
            <Menu.Item key={index}>{category}</Menu.Item>
          ))}
        </Menu>
      );
    }

    return <Sider width={'20%'}>{content}</Sider>;
  }
}

export default Sidebar;