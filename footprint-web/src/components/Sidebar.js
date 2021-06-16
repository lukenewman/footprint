import React from 'react';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';

const { Sider } = Layout;

/* 
  The main navigational component of the app. Clicking on a category
    will switch the app's content to show the selected category's emission types

  Props:
    categories ([Category]): dynamically supplied by the API
    onCategoryClicked ((category) => ()): callback for navigational purposes
*/
class Sidebar extends React.Component {
  menuItemClicked = ({ key }) => {
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