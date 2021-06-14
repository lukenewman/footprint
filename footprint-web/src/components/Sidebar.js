import React from 'react';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';

const { Sider } = Layout;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.menuItemClicked = this.menuItemClicked.bind(this);
  }

  menuItemClicked({ key }) {
    this.props.onCategoryClicked(this.props.categories[key]);
  }

  render() {
    return (
      <Sider width={'20%'}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['0']}
          style={{ height: '100%', borderRight: 0 }}
          onClick={this.menuItemClicked}
        >
          {this.props.categories.map((category, index) => (
            <Menu.Item key={index}>{category.name}</Menu.Item>
          ))}
        </Menu>
      </Sider>
    );
  }
}

export default Sidebar;