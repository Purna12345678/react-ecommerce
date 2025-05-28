// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';
import { Header, Dropdown, } from 'semantic-ui-react';
// @ts-expect-error TS(6142): Module './ProductList' was resolved to 'C:/Users/P... Remove this comment to see the full error message
import ProductList from './ProductList';
// @ts-expect-error TS(6142): Module './Pagination' was resolved to 'C:/Users/PU... Remove this comment to see the full error message
import Pagination from './Pagination';
import axios from 'axios';
import 'assets/style/main.scss';
import 'assets/style/product.scss';

const propTypes = {
  // @ts-expect-error TS(2304): Cannot find name 'PT'.
  dataProducts: PT.array,
  // @ts-expect-error TS(2304): Cannot find name 'PT'.
  showcaseHeader: PT.string
}

// Product Filter 商品排序
const options = [
  { text: 'Best Match', value: 'Best Match' },
  { text: 'Lowest Price', value: 'Lowest Price' },
  { text: 'Highest Price', value: 'Highest Price' }
];

class ProductContainer extends React.Component{
  props: any;
  setState: any;
  state: any;

  constructor(props: any) {
    super(props);
    this.state = {
      filter: 'Best Match'
    }
    this.handleSelectSort = this.handleSelectSort.bind(this);
    this.filterHighestPrice = this.filterHighestPrice.bind(this);
    this.filterLowestPrice = this.filterLowestPrice.bind(this);
  }

  handleSelectSort(e: any, {
    value
  }: any){
    this.setState({filter: value})
  }

  // @ts-expect-error TS(7023): 'filterHighestPrice' implicitly has return type 'a... Remove this comment to see the full error message
  filterHighestPrice(arr: any){
   return arr.length <= 1 ? arr : this.filterHighestPrice(arr.slice(1).filter((item: any) => item.price.salePrice >= arr[0].price.salePrice)).concat(arr[0], this.filterHighestPrice(arr.slice(1).filter((item: any) => item.price.salePrice < arr[0].price.salePrice)));
  }

  // @ts-expect-error TS(7023): 'filterLowestPrice' implicitly has return type 'an... Remove this comment to see the full error message
  filterLowestPrice(arr: any){
    // 快速排序 Quick Sort
    return arr.length <= 1 ? arr : this.filterLowestPrice(arr.slice(1).filter((item: any) => item.price.salePrice <= arr[0].price.salePrice)).concat(arr[0], this.filterLowestPrice(arr.slice(1).filter((item: any) => item.price.salePrice > arr[0].price.salePrice)));
  }

  render() {
    const {
      location,
      dataProducts,
      showcaseHeader
    } = this.props;

    const {
      filter
    } = this.state;

    const {
      handleSelectSort
    } = this;

    // Total Quantity of Products 商品总数量
    let itemsTotal = dataProducts.length;

    // Total Pages 总页码
    var page = 0;

    if (itemsTotal<=12) {
      page = 1;
    }else if(itemsTotal%12 !== 0){
      page = Math.floor(itemsTotal/12) + 1;
    }else{
      page = itemsTotal/12;
    }

    const currentPage = this.props.location.hash?this.props.location.hash.substr(1)*1:1;

    let dataDisplay = new Array()

    switch(filter){
      case 'Best Match':
        dataDisplay = dataProducts;
        break;
      case 'Lowest Price':
        dataDisplay = this.filterLowestPrice(dataProducts.slice(0))
        console.log(dataDisplay);
        break;
      case 'Highest Price':
        dataDisplay = this.filterHighestPrice(dataProducts.slice(0))
        break;
    }


    dataDisplay = dataDisplay.slice((currentPage-1)*12,currentPage*12);

    return (
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <div id='product-showcase'>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Header as='h2' textAlign='left' content={showcaseHeader}/>
        // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        <div className='pro-filter-bar'>
          // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          <p className='total-num'>
            // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
            <strong>Total</strong> {itemsTotal} Items
          // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          </p>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Dropdown className='filter-menu' defaultValue='Best Match' options={options} selection item onChange={handleSelectSort}/>
        // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        </div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <ProductList dataProducts={dataDisplay}/>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Pagination
          page={page}
          currentPage={currentPage}
        />
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      </div>
    )
  }
}

// @ts-expect-error TS(2339): Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
ProductContainer.propTypes = propTypes;

export default ProductContainer;