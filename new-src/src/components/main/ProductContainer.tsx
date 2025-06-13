// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React, { useCallback } from 'react';
import { Header, Dropdown, } from 'semantic-ui-react';
// @ts-expect-error TS(6142): Module './ProductList' was resolved to 'C:/Users/P... Remove this comment to see the full error message
import ProductList from './ProductList';
// @ts-expect-error TS(6142): Module './Pagination' was resolved to 'C:/Users/PU... Remove this comment to see the full error message
import Pagination from './Pagination';
import axios from 'axios';
import 'assets/style/main.scss';
import 'assets/style/product.scss';
// Product Filter 商品排序
const options = [
  { text: 'Best Match', value: 'Best Match' },
  { text: 'Lowest Price', value: 'Lowest Price' },
  { text: 'Highest Price', value: 'Highest Price' }
];

// @ts-expect-error TS(2528): A module cannot have multiple default exports.
export default function ProductContainer(props) {const handleSelectSort = useCallback((e, { value }) => this.setState({filter: value}), [/* TODO: Add dependencies */]);
// @ts-expect-error TS(7006): Parameter 'arr' implicitly has an 'any' type.
const filterHighestPrice = useCallback((arr) => return arr.length <= 1 ? arr : this.filterHighestPrice(arr.slice(1).filter(item => item.price.salePrice >= arr[0].price.salePrice)).concat(arr[0], this.filterHighestPrice(arr.slice(1).filter(item => item.price.salePrice < arr[0].price.salePrice)));, [/* TODO: Add dependencies */]);
// @ts-expect-error TS(7006): Parameter 'arr' implicitly has an 'any' type.
const filterLowestPrice = useCallback((arr) => return arr.length <= 1 ? arr : this.filterLowestPrice(arr.slice(1).filter(item => item.price.salePrice <= arr[0].price.salePrice)).concat(arr[0], this.filterLowestPrice(arr.slice(1).filter(item => item.price.salePrice > arr[0].price.salePrice)));, [/* TODO: Add dependencies */]);
return (
(
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
          // @ts-expect-error TS(2304): Cannot find name 'page'.
          page={page}
          // @ts-expect-error TS(2304): Cannot find name 'currentPage'.
          currentPage={currentPage}
        />
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      </div>
    )
);
}

// @ts-expect-error TS(2528): A module cannot have multiple default exports.
export default ProductContainer;