import React, { Component, useState, useCallback, useEffect } from 'react';
import { Menu, Search } from 'semantic-ui-react'
import axios from 'axios';

export default function SearchBar() {
  const [value, setValue] = useState(null);
  const [loadData, setLoadData] = useState(null);
const handleResultSelect = useCallback((e) => setValue(e.target.innerHTML), [/* TODO: Add dependencies */]);
const handleSearchChange = useCallback((e) => setValue(e.target.value)
setTimeout(() => {
      // 文本框内容为空，返回
      if (value.length < 1) return;

      const regSearch = new RegExp(value,'gim');

      let resultMatch = new Array();

      loadData.forEach(function(item,index){
        if (item.name.search(regSearch) !== -1) resultMatch.push({title: item.name});
      })

      resultMatch = resultMatch.length <= 5?resultMatch:resultMatch.slice(0,5);

      this.setState({
        isLoading: false,
        results: resultMatch
      })

    }, 500), [/* TODO: Add dependencies */]);
const handleSearching = useCallback((e) => if (e.keyCode !== 13 ) return;
if (e.target.value.trim() === '') return;
window.location.href = '/search?' + e.target.value;, [/* TODO: Add dependencies */]);
const handleReachClear = useCallback((e) => setValue(''), [/* TODO: Add dependencies */]);
return (
(
      <Menu.Menu position='right'>
        <Search
          className='search-bar'
          placeholder='Search Products'
          loading={isLoading}
          onResultSelect={handleResultSelect}
          onSearchChange={handleSearchChange}
          onKeyDown={handleSearching}
          results={results}
          value={value}
        />
      </Menu.Menu>
    )
);
}

export default SearchBar;