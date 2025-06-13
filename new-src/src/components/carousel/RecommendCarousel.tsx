// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React, { Component, useEffect } from 'react';
import { Grid, Icon } from 'semantic-ui-react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import Slider from 'react-slick';
// @ts-expect-error TS(6142): Module '../header/ShowcaseHeader' was resolved to ... Remove this comment to see the full error message
import ShowcaseHeader from '../header/ShowcaseHeader';
// @ts-expect-error TS(6142): Module '../main/ProductItem' was resolved to 'C:/U... Remove this comment to see the full error message
import ProductItem from '../main/ProductItem';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'assets/style/carousel.scss';
import axios from 'axios';

export function RecommendCarousel() {  return (
(
        // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        <div key={index}><ProductItem {...item}/></div>
      )
);
}

export default RecommendCarousel;