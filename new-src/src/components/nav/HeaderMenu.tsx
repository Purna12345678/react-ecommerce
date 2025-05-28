// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react'
import 'assets/style/header.scss';

const dataHeaderMenu = ['men', 'ladies', 'kids'];

class HeaderNavigation extends Component {
  setState: any;
  state: any;

  constructor(props: any) {
    super(props);
    this.state = {
      activeItem: 'home'
    }
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(e: any, {
    name
  }: any){
    this.setState({ activeItem: name })
  }

  render() {

    const { activeItem } = this.state;

    const { handleItemClick } = this;

    let listMenu = dataHeaderMenu.map(function(item,index){
      return(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Menu.Item
          as='span'
          key={index}
          className="nav-item"
          active={activeItem === item}
          onClick={handleItemClick} >
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <NavLink
            to={'/' + item}
            activeClassName="active"
            >
            {item.toUpperCase()}
          </NavLink>
        </Menu.Item>
      )
    })

    return (
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Menu as='nav' secondary id="header-nav">
        {listMenu}
      </Menu>
    )
  }
}

export default HeaderNavigation;