import React, { Component, useEffect } from 'react';
import { Grid, Icon } from 'semantic-ui-react';
import Slider from 'react-slick';
import ShowcaseHeader from '../header/ShowcaseHeader';
import ProductItem from '../main/ProductItem';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'assets/style/carousel.scss';
import axios from 'axios';

export function RecommendCarousel() {  return (
(
        <div key={index}><ProductItem {...item}/></div>
      )
);
}

export default RecommendCarousel;