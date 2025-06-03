import React, { Component, useCallback, useEffect } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import ShowcaseHeader from '../header/ShowcaseHeader.js';
import ProductItem from '../main/ProductItem.js';
import 'assets/style/product.scss';
import axios from 'axios';

export default function HomeProductSection() {const handleReadMoreProduct = useCallback(() => this.setState({
      isReadMore: true
    }), [/* TODO: Add dependencies */]);
return (
(
        <ProductItem
          key={item.id}
          {...item}
        />
      )
);
}

export default HomeProductSection;