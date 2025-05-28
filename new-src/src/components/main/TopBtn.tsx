// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React, { Component, useState, useEffect } from 'react';
import { Button } from 'semantic-ui-react';
import Scroll from '../scroll/Scroll';

function TopBtn(this: any, props: any) {
  useEffect(() => {
    window.addEventListener('scroll',this.handleFixedMenu);

    return () => {
      window.removeEventListener('scroll', this.handleFixedMenu);
    };
  }, []);

  function handleBackToTop() {
    Scroll(0,300);
  }

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Button
      id='tb-btn'
      icon='chevron up'
      size='large'
      color='black'
      ref='tbBtn'
      onClick={this.handleBackToTop}
     />
  );
}

export default TopBtn;