import React, { useCallback, useEffect } from 'react';
import { Grid,  } from 'semantic-ui-react';
import ProductImages from './ProductImages';
import ProductHeader from './ProductHeader';
import ProductColor from './ProductColor';
import ProductSize from './ProductSize';
import ProductCount from './ProductCount';
import ProductDetail from './ProductDetail';
import axios from 'axios';

export default function ProductInfo(props) {const handleSelectColor = useCallback((value) => value = value.replace(/^[a-z]?/,function($0){
        return $0.toUpperCase();
      })
this.setState({
      selectedColor: value
    }), [/* TODO: Add dependencies */]);
const handleSelectSize = useCallback((value) => this.setState({
      selectedSize: value.toUpperCase()
    }), [/* TODO: Add dependencies */]);
const handleAddOnceToCart = useCallback(() => this.setState({canAddToCart: false}), [/* TODO: Add dependencies */]);
return (
(
      <Grid.Row>
        <Grid.Column width={6}>
            <ProductImages img={dataProInfo.images.imgProduct}/>
        </Grid.Column>
        <Grid.Column id="product-info" width={6} textAlign='left'>
            <ProductHeader
              name={dataProInfo.name}
              price={dataProInfo.price}
            />
            <ProductColor
              dataColor={dataProInfo.detail.color}
              selectedColor={selectedColor}
              handleSelectColor={handleSelectColor}
            />
            <ProductSize
              dataSize={dataProInfo.detail.size}
              selectedSize={selectedSize}
              handleSelectSize={handleSelectSize}
            />
            <ProductDetail
              dataDes={dataProInfo.detail.des}
              canAddToCart={canAddToCart}
              hasSelected={hasSelected}
              handleAddToCart={this.props.handleAddToCart}
              handleAddOnceToCart={handleAddOnceToCart}
              proInfo={proInfo}
            />
        </Grid.Column>
      </Grid.Row>
    )
);
}

export default ProductInfo;