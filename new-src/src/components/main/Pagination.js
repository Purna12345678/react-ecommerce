import React, { Component, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import Scroll from '../scroll/Scroll';

export function Pagination() {

  const handleItemClick = useCallback(() => Scroll(290,300);, [/* TODO: Add dependencies */]);
  return (
(
      <Menu as='ul' className='page-bar' pagination>
        {itemsPagination}
      </Menu>
    )
);
}

export default Pagination;