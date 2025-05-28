// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React, { Component } from 'react';
import { Menu, Search } from 'semantic-ui-react'
import axios from 'axios';

class SearchBar extends Component {
  setState: any;
  state: any;

  constructor(props: any){
    super(props);
    this.state = {
      isLoading: false,
      loadData: [],
      results: [],
      value: ''
    };
    this.handleResultSelect = this.handleResultSelect.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearching = this.handleSearching.bind(this);
    this.handleReachClear = this.handleReachClear.bind(this);
  }

  componentDidMount() {
    axios
    .get('/src/data/productData/database.json')
    .then(res=>this.setState({loadData: res.data}))
    .catch(err=>console.log(err))
  }

  // 点击搜索结果现在在文本框内
  handleResultSelect(e: any){
    this.setState({ value: e.target.innerHTML })
  }

  handleSearchChange(e: any){
    this.setState({ isLoading: true, value: e.target.value })

    setTimeout(() => {
      // 文本框内容为空，返回
      if (this.state.value.length < 1) return;

      const regSearch = new RegExp(this.state.value,'gim');

      let resultMatch = new Array();

      this.state.loadData.forEach(function(item: any,index: any){
        if (item.name.search(regSearch) !== -1) resultMatch.push({title: item.name});
      })

      resultMatch = resultMatch.length <= 5?resultMatch:resultMatch.slice(0,5);

      this.setState({
        isLoading: false,
        results: resultMatch
      })

    }, 500)
  }

  handleSearching(e: any){
    if (e.keyCode !== 13 ) return;
    if (e.target.value.trim() === '') return;
    window.location.href = '/search?' + e.target.value;
  }

  handleReachClear(e: any){
    this.setState({
      isLoading: false,
      results: [],
      value: ''
    })
  }

  render() {

    const {
      value,
      results,
      isLoading,
    } = this.state;

    const {
      handleResultSelect,
      handleSearchChange,
      handleSearching
    } = this;

    return (
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Menu.Menu position='right'>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
  }
}

export default SearchBar;