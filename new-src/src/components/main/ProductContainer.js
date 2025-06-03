import React, { useCallback } from 'react';
import { Header, Dropdown, } from 'semantic-ui-react';
import ProductList from './ProductList';
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

export default function ProductContainer(props) {const handleSelectSort = useCallback((e, { value }) => this.setState({filter: value}), [/* TODO: Add dependencies */]);
const filterHighestPrice = useCallback((arr) => return arr.length <= 1 ? arr : this.filterHighestPrice(arr.slice(1).filter(item => item.price.salePrice >= arr[0].price.salePrice)).concat(arr[0], this.filterHighestPrice(arr.slice(1).filter(item => item.price.salePrice < arr[0].price.salePrice)));, [/* TODO: Add dependencies */]);
const filterLowestPrice = useCallback((arr) => return arr.length <= 1 ? arr : this.filterLowestPrice(arr.slice(1).filter(item => item.price.salePrice <= arr[0].price.salePrice)).concat(arr[0], this.filterLowestPrice(arr.slice(1).filter(item => item.price.salePrice > arr[0].price.salePrice)));, [/* TODO: Add dependencies */]);
return (
(
      <div id='product-showcase'>
        <Header as='h2' textAlign='left' content={showcaseHeader}/>
        <div className='pro-filter-bar'>
          <p className='total-num'>
            <strong>Total</strong> {itemsTotal} Items
          </p>
          <Dropdown className='filter-menu' defaultValue='Best Match' options={options} selection item onChange={handleSelectSort}/>
        </div>
        <ProductList dataProducts={dataDisplay}/>
        <Pagination
          page={page}
          currentPage={currentPage}
        />
      </div>
    )
);
}

export default ProductContainer;