// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React, { Component, useCallback, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

// @ts-expect-error TS(6142): Module './ToolBar' was resolved to 'C:/Users/PUYad... Remove this comment to see the full error message
import ToolBar from './ToolBar';
// @ts-expect-error TS(6142): Module './SearchBar' was resolved to 'C:/Users/PUY... Remove this comment to see the full error message
import SearchBar from './SearchBar';
// @ts-expect-error TS(6142): Module '../main/TopBtn' was resolved to 'C:/Users/... Remove this comment to see the full error message
import TopBtn from '../main/TopBtn';

// @ts-expect-error TS(7006): Parameter 'props' implicitly has an 'any' type.
export function HeaderToolWrapper(props) {

  // @ts-expect-error TS(2304): Cannot find name 'let'.
  const handleFixedMenu = useCallback(() => let menuBar = this.refs.headerTool;
// @ts-expect-error TS(2552): Cannot find name 'menuBar'. Did you mean 'menubar'... Remove this comment to see the full error message
let menuBarTop = menuBar.offsetTop;
// @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
let topBtn = this.refs.tbBtn.refs.tbBtn.ref;
// @ts-expect-error TS(2684): The 'this' context of type 'void' is not assignabl... Remove this comment to see the full error message
(window.onscroll = function (){
      if(menuBarTop - getScrollTop() <= -30){
        // @ts-expect-error TS(2552): Cannot find name 'menuBar'. Did you mean 'menubar'... Remove this comment to see the full error message
        menuBar.style.position = 'fixed';
        // @ts-expect-error TS(2552): Cannot find name 'menuBar'. Did you mean 'menubar'... Remove this comment to see the full error message
        menuBar.style.top = '0';
      }else{
        // @ts-expect-error TS(2552): Cannot find name 'menuBar'. Did you mean 'menubar'... Remove this comment to see the full error message
        menuBar.style.position = '';
        // @ts-expect-error TS(2552): Cannot find name 'menuBar'. Did you mean 'menubar'... Remove this comment to see the full error message
        menuBar.style.top = '';
      }
      if(getScrollTop() > window.innerHeight){
        topBtn.style.display = 'block';
      }else{
        topBtn.style.display = '';
      }
    })();
function getScrollTop() {
      return document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
    }, [/* TODO: Add dependencies */]);
  return (
(
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <div
        id='header-tool-wrap'
        ref='headerTool'
      >
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Menu
          secondary
          className='header-tool'
        >
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <ToolBar cart={this.props.cart} />
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <SearchBar />
        </Menu>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <TopBtn ref='tbBtn'/>
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      </div>
    )
);
}

export default HeaderToolWrapper;