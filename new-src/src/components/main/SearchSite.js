import React, { Component, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { Grid, Segment, Loader } from 'semantic-ui-react';
import ProductContainer from './ProductContainer';
import Scroll from '../scroll/Scroll';
import axios from 'axios';
import 'assets/style/main.scss';

export function SearchSite(props) {  return (
(
            <ProductContainer
              location={location}
              dataProducts={dataProducts}
              showcaseHeader={'SEARCH RESULTS FOR : "' + searchVal + '"'}
            />
          )
);
}

export default SearchSite;
