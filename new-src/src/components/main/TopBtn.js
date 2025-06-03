import React, { Component, useCallback, useEffect } from 'react';
import { Button } from 'semantic-ui-react';
import Scroll from '../scroll/Scroll';

export function TopBtn() {

  const handleBackToTop = useCallback(() => Scroll(0,300);, [/* TODO: Add dependencies */]);
  return (
(
      <Button
        id='tb-btn'
        icon='chevron up'
        size='large'
        color='black'
        ref='tbBtn'
        onClick={this.handleBackToTop}
       />
    )
);
}

export default TopBtn;