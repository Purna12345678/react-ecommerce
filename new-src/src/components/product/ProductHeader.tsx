// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';
import { Header } from 'semantic-ui-react';

// 这里应该用变量代替价格，根据数据是否有价格对比而显示
const ProductHeader = (props: any) => {
  const {
    name,
    price:{
      salePrice,
      marketPrice
    }
  } = props;

  let clsPrice = '',originValue,actualValue;

  if (!marketPrice) {//原价
    actualValue = '$' + salePrice;
    originValue = null;
    clsPrice = 'common';
  }else{// 折扣价
    actualValue = '$' + salePrice;
    originValue = '$' + marketPrice;
    clsPrice = 'discount';
  }

  return(
    // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    <hgroup>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Header as='h2' content={name}/>
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <h3 className="product-price">
        // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        <span className={clsPrice}>{actualValue}</span><span>{originValue}</span>
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      </h3>
    // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    </hgroup>
  )
};

export default ProductHeader;