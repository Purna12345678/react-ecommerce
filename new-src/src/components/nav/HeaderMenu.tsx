// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React, { Component, useCallback } from 'react'
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react'
import 'assets/style/header.scss';

const dataHeaderMenu = ['men', 'ladies', 'kids'];

// @ts-expect-error TS(2528): A module cannot have multiple default exports.
export default function HeaderNavigation(this: any) {const handleItemClick = useCallback((e: any, {
  name
}: any) => this.setState({ activeItem: name }), [/* TODO: Add dependencies */]);
return (
(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Menu.Item
          as='span'
          // @ts-expect-error TS(2304): Cannot find name 'index'.
          key={index}
          className="nav-item"
          // @ts-expect-error TS(2304): Cannot find name 'activeItem'.
          active={activeItem === item}
          onClick={handleItemClick} >
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <NavLink
            // @ts-expect-error TS(2304): Cannot find name 'item'.
            to={'/' + item}
            activeClassName="active"
            >
            // @ts-expect-error TS(2304): Cannot find name 'item'.
            {item.toUpperCase()}
          </NavLink>
        </Menu.Item>
      )
);
}

// @ts-expect-error TS(2528): A module cannot have multiple default exports.
export default HeaderNavigation;