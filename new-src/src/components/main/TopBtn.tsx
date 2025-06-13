// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React, { Component, useCallback, useEffect } from 'react';
import { Button } from 'semantic-ui-react';
import Scroll from '../scroll/Scroll';

export function TopBtn() {

  const handleBackToTop = useCallback(() => Scroll(0,300);, [/* TODO: Add dependencies */]);
  return (
(
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Button
        id='tb-btn'
        icon='chevron up'
        size='large'
        color='black'
        ref='tbBtn'
        // @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
        onClick={this.handleBackToTop}
       />
    )
);
}

export default TopBtn;