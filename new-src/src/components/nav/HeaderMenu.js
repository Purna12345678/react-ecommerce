import React, { Component, useCallback } from 'react'
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react'
import 'assets/style/header.scss';

const dataHeaderMenu = ['men', 'ladies', 'kids'];

export default function HeaderNavigation() {const handleItemClick = useCallback((e, { name }) => this.setState({ activeItem: name }), [/* TODO: Add dependencies */]);
return (
(
        <Menu.Item
          as='span'
          key={index}
          className="nav-item"
          active={activeItem === item}
          onClick={handleItemClick} >
          <NavLink
            to={'/' + item}
            activeClassName="active"
            >
            {item.toUpperCase()}
          </NavLink>
        </Menu.Item>
      )
);
}

export default HeaderNavigation;