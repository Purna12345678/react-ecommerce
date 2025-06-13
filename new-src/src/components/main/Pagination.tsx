// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React, { Component, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import Scroll from '../scroll/Scroll';

export function Pagination() {

  const handleItemClick = useCallback(() => Scroll(290,300);, [/* TODO: Add dependencies */]);
  return (
(
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Menu as='ul' className='page-bar' pagination>
        // @ts-expect-error TS(2304): Cannot find name 'itemsPagination'.
        {itemsPagination}
      </Menu>
    )
);
}

export default Pagination;