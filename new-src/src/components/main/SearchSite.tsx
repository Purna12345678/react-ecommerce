// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React, { Component, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { Grid, Segment, Loader } from 'semantic-ui-react';
// @ts-expect-error TS(6142): Module './ProductContainer' was resolved to 'C:/Us... Remove this comment to see the full error message
import ProductContainer from './ProductContainer';
import Scroll from '../scroll/Scroll';
import axios from 'axios';
import 'assets/style/main.scss';

export function SearchSite(props: any) {  return (
(
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <ProductContainer
              location={location}
              // @ts-expect-error TS(2304): Cannot find name 'dataProducts'.
              dataProducts={dataProducts}
              // @ts-expect-error TS(2304): Cannot find name 'searchVal'.
              showcaseHeader={'SEARCH RESULTS FOR : "' + searchVal + '"'}
            />
          )
);
}

export default SearchSite;
