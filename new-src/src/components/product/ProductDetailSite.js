import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import ProductInfo from './ProductInfo';
import ProductComment from './ProductComment';
import ProductAvisory from './ProductAvisory';
import RecommendCarousel from '../carousel/RecommendCarousel';
import Scroll from '../scroll/Scroll';
import 'assets/style/product.scss';
import '../../util/mockAvisory.js';
import axios from 'axios';

export default function ProductDetailSite(props) {
  const [dataComments, setDataComments] = useState(null);
  const [dataAvisory, setDataAvisory] = useState(null);
return (
(
      <Grid as='section' textAlign='center'>
        <Route children={( { location } )=>{
          return(
            <ProductInfo
              location={location}
              handleAddToCart={this.props.handleAddToCart}
            />
          )
        }}/>
        <ProductComment dataComments={this.state.dataComments}/>
        <ProductAvisory dataAvisory={dataAvisory}/>
        <RecommendCarousel/>
      </Grid>
    )
);
}

export default ProductDetailSite;