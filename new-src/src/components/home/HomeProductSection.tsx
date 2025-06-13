// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React, { Component, useCallback, useEffect } from 'react';
import { Grid, Button } from 'semantic-ui-react';
// @ts-expect-error TS(6142): Module '../header/ShowcaseHeader.js' was resolved ... Remove this comment to see the full error message
import ShowcaseHeader from '../header/ShowcaseHeader.js';
// @ts-expect-error TS(6142): Module '../main/ProductItem.js' was resolved to 'C... Remove this comment to see the full error message
import ProductItem from '../main/ProductItem.js';
import 'assets/style/product.scss';
import axios from 'axios';

// @ts-expect-error TS(2528): A module cannot have multiple default exports.
export default function HomeProductSection(this: any) {const handleReadMoreProduct = useCallback(() => this.setState({
      isReadMore: true
    }), [/* TODO: Add dependencies */]);
return (
(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <ProductItem
          // @ts-expect-error TS(2304): Cannot find name 'item'.
          key={item.id}
          // @ts-expect-error TS(2304): Cannot find name 'item'.
          {...item}
        />
      )
);
}

// @ts-expect-error TS(2528): A module cannot have multiple default exports.
export default HomeProductSection;