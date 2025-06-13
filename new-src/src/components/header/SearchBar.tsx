// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React, { Component, useState, useCallback, useEffect } from 'react';
import { Menu, Search } from 'semantic-ui-react'
import axios from 'axios';

// @ts-expect-error TS(2528): A module cannot have multiple default exports.
export default function SearchBar() {
  const [value, setValue] = useState(null);
  const [loadData, setLoadData] = useState(null);
// @ts-expect-error TS(7006): Parameter 'e' implicitly has an 'any' type.
const handleResultSelect = useCallback((e) => setValue(e.target.innerHTML), [/* TODO: Add dependencies */]);
// @ts-expect-error TS(7006): Parameter 'e' implicitly has an 'any' type.
const handleSearchChange = useCallback((e) => setValue(e.target.value)
setTimeout(() => {
      // 文本框内容为空，返回
      if (value.length < 1) return;

      const regSearch = new RegExp(value,'gim');

      let resultMatch = new Array();

      // @ts-expect-error TS(7006): Parameter 'item' implicitly has an 'any' type.
      loadData.forEach(function(item,index){
        if (item.name.search(regSearch) !== -1) resultMatch.push({title: item.name});
      })

      resultMatch = resultMatch.length <= 5?resultMatch:resultMatch.slice(0,5);

      // @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
      this.setState({
        isLoading: false,
        results: resultMatch
      })

    }, 500), [/* TODO: Add dependencies */]);
// @ts-expect-error TS(7006): Parameter 'e' implicitly has an 'any' type.
const handleSearching = useCallback((e) => if (e.keyCode !== 13 ) return;
if (e.target.value.trim() === '') return;
window.location.href = '/search?' + e.target.value;, [/* TODO: Add dependencies */]);
// @ts-expect-error TS(7006): Parameter 'e' implicitly has an 'any' type.
const handleReachClear = useCallback((e) => setValue(''), [/* TODO: Add dependencies */]);
return (
(
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Menu.Menu position='right'>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Search
          className='search-bar'
          placeholder='Search Products'
          // @ts-expect-error TS(2304): Cannot find name 'isLoading'.
          loading={isLoading}
          onResultSelect={handleResultSelect}
          onSearchChange={handleSearchChange}
          onKeyDown={handleSearching}
          // @ts-expect-error TS(2304): Cannot find name 'results'.
          results={results}
          value={value}
        />
      </Menu.Menu>
    )
);
}

// @ts-expect-error TS(2528): A module cannot have multiple default exports.
export default SearchBar;