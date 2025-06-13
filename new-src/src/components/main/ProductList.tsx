// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';
// @ts-expect-error TS(6142): Module './ProductItem' was resolved to 'C:/Users/P... Remove this comment to see the full error message
import ProductItem from './ProductItem';
const ProductList = (props: any) => {

  const itemsProduct = props.dataProducts.map(function(item: any){
    return(
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <ProductItem
        key={item.id}
        id={item.id}
        category={item.category}
        type={item.type}
        name={item.name}
        price={item.price}
        images={item.images}
      />
    )
  })

  return(
    // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    <div id='product-list'>
      {itemsProduct}
    // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    </div>
  )
}
export default ProductList;