import React, { Component, useCallback, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import ToolBar from './ToolBar';
import SearchBar from './SearchBar';
import TopBtn from '../main/TopBtn';

export function HeaderToolWrapper(props) {

  const handleFixedMenu = useCallback(() => let menuBar = this.refs.headerTool;
let menuBarTop = menuBar.offsetTop;
let topBtn = this.refs.tbBtn.refs.tbBtn.ref;
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
    }, [/* TODO: Add dependencies */]);
  return (
(
      <div
        id='header-tool-wrap'
        ref='headerTool'
      >
        <Menu
          secondary
          className='header-tool'
        >
          <ToolBar cart={this.props.cart} />
          <SearchBar />
        </Menu>
        <TopBtn ref='tbBtn'/>
      </div>
    )
);
}

export default HeaderToolWrapper;