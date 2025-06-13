// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
// @ts-expect-error TS(6142): Module './ProductInfo' was resolved to 'C:/Users/P... Remove this comment to see the full error message
import ProductInfo from './ProductInfo';
// @ts-expect-error TS(6142): Module './ProductComment' was resolved to 'C:/User... Remove this comment to see the full error message
import ProductComment from './ProductComment';
// @ts-expect-error TS(6142): Module './ProductAvisory' was resolved to 'C:/User... Remove this comment to see the full error message
import ProductAvisory from './ProductAvisory';
// @ts-expect-error TS(6142): Module '../carousel/RecommendCarousel' was resolve... Remove this comment to see the full error message
import RecommendCarousel from '../carousel/RecommendCarousel';
import Scroll from '../scroll/Scroll';
import 'assets/style/product.scss';
import '../../util/mockAvisory.js';
import axios from 'axios';

// @ts-expect-error TS(2528): A module cannot have multiple default exports.
export default function ProductDetailSite(this: any, props: any) {
  const [dataComments, setDataComments] = useState(null);
  const [dataAvisory, setDataAvisory] = useState(null);
return (
  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  <Grid as='section' textAlign='center'>
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Route children={( {
      location
    }: any )=>{
      return(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <ProductInfo
          location={location}
          handleAddToCart={this.props.handleAddToCart}
        />
      )
    }}/>
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <ProductComment dataComments={this.state.dataComments}/>
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <ProductAvisory dataAvisory={dataAvisory}/>
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <RecommendCarousel/>
  </Grid>
);
}

// @ts-expect-error TS(2528): A module cannot have multiple default exports.
export default ProductDetailSite;