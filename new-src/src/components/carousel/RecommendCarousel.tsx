// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React, { Component } from 'react';
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

class RecommendCarousel extends Component {
  setState: any;
  state: any;
  constructor(props: any) {
    super(props);
    this.state = {
      dataCommend: []
    }
  }
  componentDidMount() {
    axios
    .get('/src/data/productData/hotSale.json')
    .then(res=>this.setState({dataCommend: [...res.data]}))
    .catch(err=>console.log(err))
  }
  render(){
    // Carousel Settings 轮播图配置
    var settings = {
      accessibility: false,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1
    };

    const {
      dataCommend
    } = this.state;

    const itemsRecommend = dataCommend.map(function(item: any,index: any){
      return(
        // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        <div key={index}><ProductItem {...item}/></div>
      )
    })

    return(
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Grid.Column id='recommend' width='12'>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <ShowcaseHeader headerMain='RECOMMEND TO BUY'/>
        // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        <span className='change'>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Icon name='refresh'/>
          CHANGE
        // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        </span>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        {dataCommend.length ? <Slider {...settings}>{itemsRecommend}</Slider> : ''}
      </Grid.Column>
    )
  }
}

export default RecommendCarousel;