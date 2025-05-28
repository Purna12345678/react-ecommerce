// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React, { Component, useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

// @ts-expect-error TS(6142): Module './ToolBar' was resolved to 'C:/Users/PUYad... Remove this comment to see the full error message
import ToolBar from './ToolBar';
// @ts-expect-error TS(6142): Module './SearchBar' was resolved to 'C:/Users/PUY... Remove this comment to see the full error message
import SearchBar from './SearchBar';
// @ts-expect-error TS(6142): Module '../main/TopBtn' was resolved to 'C:/Users/... Remove this comment to see the full error message
import TopBtn from '../main/TopBtn';

function HeaderToolWrapper(this: any, props: any) {
  const [state, setState] = useState({
    searchVal: ''
  });

  useEffect(() => {
    window.addEventListener('scroll',this.handleFixedMenu);

    return () => {
      window.removeEventListener('scroll', this.handleFixedMenu);
    };
  }, []);

  function handleFixedMenu(this: any) {
    let menuBar = this.refs.headerTool;
    let menuBarTop = menuBar.offsetTop;
    let topBtn = this.refs.tbBtn.refs.tbBtn.ref;
    // 滚动滚动条当菜单贴到顶部的时候让其变成固定定位
    // @ts-expect-error TS(2684): The 'this' context of type 'void' is not assignabl... Remove this comment to see the full error message
    (window.onscroll = function (){
      if(menuBarTop - getScrollTop() <= -30){
        menuBar.style.position = 'fixed';
        menuBar.style.top = '0';
      }else{
        menuBar.style.position = '';
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
    }
  }

  return (
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
  );
}

export default HeaderToolWrapper;